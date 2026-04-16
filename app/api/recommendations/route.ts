import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'
import fs from 'fs'
import path from 'path'
import type { ScrapeResult, RedditPost } from '@/scraper/types'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function loadPosts(): RedditPost[] {
  const outputDir = path.join(process.cwd(), 'scraper', 'output')
  if (!fs.existsSync(outputDir)) return []
  const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.json')).sort().reverse()
  if (files.length === 0) return []
  const data = JSON.parse(fs.readFileSync(path.join(outputDir, files[0]), 'utf-8')) as ScrapeResult
  return data.posts
}

// Fast keyword pre-filter before sending to Claude (saves tokens)
function prefilter(posts: RedditPost[], keywords: string): RedditPost[] {
  const kws = keywords.toLowerCase().split(',').map(k => k.trim()).filter(Boolean)
  if (kws.length === 0) return posts.slice(0, 80)

  const scored = posts.map(p => {
    const text = `${p.title} ${p.selftext ?? ''} ${p.subreddit}`.toLowerCase()
    const hits = kws.filter(k => text.includes(k)).length
    return { post: p, hits }
  })

  // Top 60 by keyword hits, then fill up to 80 with highest engagement
  const withHits = scored.filter(s => s.hits > 0).sort((a, b) => b.hits - a.hits).slice(0, 60)
  const withoutHits = scored.filter(s => s.hits === 0)
    .sort((a, b) => b.post.engagement_score - a.post.engagement_score)
    .slice(0, 80 - withHits.length)

  return [...withHits, ...withoutHits].map(s => s.post)
}

export async function POST() {
  try {
    const { userId: clerkId } = auth()
    if (!clerkId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: {
        plan: true,
        businessName: true,
        businessDescription: true,
        targetAudience: true,
        keywords: true,
      },
    })

    if (!user) return NextResponse.json({ error: 'no_profile' }, { status: 400 })

    const { hasAI } = await import('@/lib/plan-check')
    if (!hasAI(user.plan)) {
      return NextResponse.json({ error: 'upgrade_required' }, { status: 403 })
    }

    if (!user.businessName) {
      return NextResponse.json({ error: 'no_profile' }, { status: 400 })
    }

    const posts = loadPosts()
    if (posts.length === 0) return NextResponse.json({ error: 'no_data' }, { status: 400 })

    const candidates = prefilter(posts, user.keywords ?? '')

    // Build a compact list for Claude (title + subreddit + score)
    const postList = candidates.slice(0, 80).map((p, i) =>
      `${i}|${p.id}|r/${p.subreddit}|${p.score}up/${p.num_comments}c|${p.title.slice(0, 120)}`
    ).join('\n')

    const prompt = `You are a Reddit growth expert. Given a SaaS business profile and a list of Reddit posts, identify the 12 most relevant posts where this founder should engage.

Business profile:
- Product: ${user.businessName}
${user.businessDescription ? `- Description: ${user.businessDescription}` : ''}
${user.targetAudience ? `- Target audience: ${user.targetAudience}` : ''}
${user.keywords ? `- Keywords/niche: ${user.keywords}` : ''}

Reddit posts (format: index|id|subreddit|engagement|title):
${postList}

Select the 12 best posts to engage with. Score each 0-100 for relevance to this specific business. Focus on:
- Posts where this founder can genuinely contribute and subtly build awareness
- Discussions their target audience is in
- Posts matching their niche keywords
- High engagement posts (more visibility)

Respond ONLY with valid JSON, no markdown:
{
  "recommendations": [
    {
      "id": "<post id>",
      "relevance": <0-100>,
      "reason": "<1 short sentence why this post is relevant>",
      "angle": "<suggested engagement angle in 5 words max>"
    }
  ]
}`

    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = (message.content[0] as { type: string; text: string }).text.trim()
    const jsonStr = text.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim()
    const { recommendations } = JSON.parse(jsonStr) as {
      recommendations: { id: string; relevance: number; reason: string; angle: string }[]
    }

    // Merge AI scores back with full post data
    const postMap = new Map(posts.map(p => [p.id, p]))
    const result = recommendations
      .filter(r => postMap.has(r.id))
      .map(r => ({
        ...postMap.get(r.id)!,
        relevance: r.relevance,
        reason: r.reason,
        angle: r.angle,
      }))
      .sort((a, b) => b.relevance - a.relevance)

    return NextResponse.json({ recommendations: result })
  } catch (err) {
    console.error('[recommendations]', err)
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
