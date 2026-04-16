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
      score: number
      num_comments: number
      upvote_ratio?: number
      subreddit: string
      selftext?: string
    }

    const { title, score, num_comments, upvote_ratio, subreddit, selftext } = body

    let businessContext = ''
    const { userId: clerkId } = auth()

    if (clerkId) {
      const user = await prisma.user.findUnique({
        where: { clerkId },
        select: { id: true, plan: true, businessName: true, businessDescription: true, targetAudience: true, keywords: true },
      })

      if (user) {
        // Rate limit check
        const { allowed, used, limit } = await checkRateLimit(user.id, user.plan, 'viralScore')
        if (!allowed) {
          return NextResponse.json({
            error: 'rate_limit',
            message: `Limite atteinte (${used}/${limit} aujourd'hui). Upgrade vers Pro AI pour un accès illimité.`,
          }, { status: 429 })
        }
        await incrementUsage(user.id, 'viralScore')

        // Business context
        if (user.businessName) {
          businessContext = `
Context produit de l'utilisateur :
- Produit : ${user.businessName}
${user.businessDescription ? `- Description : ${user.businessDescription}` : ''}
${user.targetAudience ? `- Audience cible : ${user.targetAudience}` : ''}
${user.keywords ? `- Mots-clés niche : ${user.keywords}` : ''}

Tiens compte de cette niche pour évaluer la pertinence du post.`
        }
      }
    }

    const prompt = `Tu es un expert en marketing viral et en analyse Reddit. Analyse ce post Reddit et donne-lui un Viral Score de 0 à 100.

POST REDDIT :
- Titre : "${title}"
- Subreddit : r/${subreddit}
- Score (upvotes) : ${score}
- Commentaires : ${num_comments}
- Ratio upvotes : ${upvote_ratio ? Math.round(upvote_ratio * 100) + '%' : 'N/A'}
${selftext ? `- Contenu : "${selftext.slice(0, 400)}"` : ''}
${businessContext}

Critères de scoring :
- Engagement réel (upvotes + commentaires pondérés)
- Potentiel de viralité du titre (curiosité, émotion, utilité)
- Pertinence pour les fondateurs / entrepreneurs SaaS${businessContext ? ' et pour le produit de l\'utilisateur' : ''}
- Qualité du contenu si disponible

Réponds UNIQUEMENT avec un JSON valide, sans markdown :
{"score": <0-100>, "reason": "<explication courte 1 phrase max 120 chars>", "tags": ["<tag1>", "<tag2>", "<tag3>"]}`

    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 256,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = (message.content[0] as { type: string; text: string }).text.trim()
    const jsonStr = text.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim()
    const result = JSON.parse(jsonStr) as { score: number; reason: string; tags: string[] }

    return NextResponse.json(result)
  } catch (err) {
    console.error('[viral-score]', err)
    return NextResponse.json({ error: 'Analyse échouée' }, { status: 500 })
  }
}
