import { getOrCreateUser } from '@/lib/get-or-create-user'
import { prisma } from '@/lib/prisma'
import type { RedditPost } from '@/scraper/types'

// GET — IDs des posts sauvegardés
export async function GET() {
  const user = await getOrCreateUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const saved = await prisma.savedPost.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(saved.map(s => s.redditId))
}

// POST — toggle save/unsave
export async function POST(req: Request) {
  const user = await getOrCreateUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const post = await req.json() as RedditPost

  const existing = await prisma.savedPost.findUnique({
    where: { userId_redditId: { userId: user.id, redditId: post.id } },
  })

  if (existing) {
    await prisma.savedPost.delete({ where: { id: existing.id } })
    return Response.json({ saved: false })
  }

  await prisma.savedPost.create({
    data: {
      userId:      user.id,
      redditId:    post.id,
      title:       post.title,
      subreddit:   post.subreddit,
      permalink:   post.permalink,
      score:       post.score,
      numComments: post.num_comments,
    },
  })

  return Response.json({ saved: true })
}
