import { auth, currentUser } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'

export async function getOrCreateUser() {
  const { userId: clerkId } = auth()
  if (!clerkId) return null

  // Check if user exists
  let user = await prisma.user.findUnique({ where: { clerkId } })
  if (user) return user

  // First time — create from Clerk data
  const clerkUser = await currentUser()
  if (!clerkUser) return null

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? ''

  user = await prisma.user.create({
    data: { clerkId, email },
  })

  return user
}
