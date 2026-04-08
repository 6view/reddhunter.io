import { getOrCreateUser } from '@/lib/get-or-create-user'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  _req: Request,
  { params }: { params: { redditId: string } }
) {
  const user = await getOrCreateUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  await prisma.savedPost.deleteMany({
    where: { userId: user.id, redditId: params.redditId },
  })

  return new Response('OK', { status: 200 })
}
