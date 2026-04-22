import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'
import { checkRateLimit, incrementUsage } from '@/lib/rate-limit'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      title: string
      subreddit: string
      selftext?: string
      score: number
      num_comments: number
      productContext?: string
    }

    const { title, subreddit, selftext, score, num_comments } = body

    // Fetch user business profile
    let productName = 'my tool'
    let productDesc = ''
    let targetAudience = ''
    let tone = 'neutral'
    let remaining: number | null = null
    let usageLimit: number | null = null

    const { userId: clerkId } = auth()
    if (clerkId) {
      const user = await prisma.user.findUnique({
        where: { clerkId },
        select: { id: true, plan: true, businessName: true, businessDescription: true, targetAudience: true, keywords: true, tone: true },
      })
      if (user) {
        const { allowed, used, limit } = await checkRateLimit(user.id, user.plan, 'commentStarter')
        if (!allowed) {
          return NextResponse.json({
            error: 'rate_limit',
            used,
            limit,
            plan: user.plan,
            message: limit === 1
              ? `Limite atteinte (${used}/${limit} aujourd'hui). Passez à Pro pour 5 commentaires/jour.`
              : `Limite atteinte (${used}/${limit} aujourd'hui). Upgrade vers Pro AI pour 50 commentaires/jour.`,
          }, { status: 429 })
        }
        await incrementUsage(user.id, 'commentStarter')
        remaining = isFinite(limit) ? Math.max(0, limit - used - 1) : null
        usageLimit = isFinite(limit) ? limit : null
        if (user.businessName) productName = user.businessName
        if (user.businessDescription) productDesc = user.businessDescription
        if (user.targetAudience) targetAudience = user.targetAudience
        if (user.tone) tone = user.tone
      }
    }

    const toneInstruction: Record<string, string> = {
      neutral:  'Write in a balanced, professional but approachable way.',
      casual:   'Write very casually, like texting a friend. Short sentences, contractions, real talk.',
      expert:   'Write as a domain expert sharing hard-won knowledge. Authoritative but not arrogant.',
      founder:  'Write as a founder building in public. Transparent, honest, sharing real numbers or struggles.',
    }

    const prompt = `You are a real Reddit user. You're also the founder of ${productName}${productDesc ? ` (${productDesc})` : ''}.${targetAudience ? ` Your target users are: ${targetAudience}.` : ''}

Write 3 different Reddit comments for this post. Rules:
- Sound like a real human, NOT an AI. No em dashes, no hyphens as punctuation, no bullet points, no numbered lists, no bold, no headers
- ${toneInstruction[tone] ?? toneInstruction.neutral}
- 2 to 4 sentences max each
- Add genuine value to the discussion, don't pitch
- Only mention your product if it fits very naturally, max once and indirectly (e.g. "something I built", "a tool I've been working on"). Never say the product name directly
- English only

Reddit post:
Title: "${title}"
Subreddit: r/${subreddit}
Score: ${score} upvotes, ${num_comments} comments
${selftext ? `Body: "${selftext.slice(0, 500)}"` : ''}

Respond ONLY with valid JSON, no markdown:
{
  "comments": [
    {"tone": "Experience", "text": "<comment 1>", "angle": "<1-3 word angle used>"},
    {"tone": "Question", "text": "<comment 2>", "angle": "<1-3 word angle used>"},
    {"tone": "Insight", "text": "<comment 3>", "angle": "<1-3 word angle used>"}
  ],
  "bestTime": "<best time to post, 1 short sentence>",
  "expectedEngagement": "<realistic estimate e.g. 10-25 upvotes>"
}`

    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = (message.content[0] as { type: string; text: string }).text.trim()
    const jsonStr = text.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim()
    const result = JSON.parse(jsonStr)

    return NextResponse.json({ ...result, remaining, limit: usageLimit })
  } catch (err) {
    console.error('[comment-starter]', err)
    return NextResponse.json({ error: 'Génération échouée' }, { status: 500 })
  }
}
