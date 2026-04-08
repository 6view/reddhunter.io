import { getOrCreateUser } from '@/lib/get-or-create-user'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const user = await getOrCreateUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const saved = await prisma.savedPost.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(saved)
}
