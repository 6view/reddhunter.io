import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'
import { getOrCreateUser } from '@/lib/get-or-create-user'

// GET — liste des subreddits suivis
export async function GET() {
  const { userId: clerkId } = auth()
  if (!clerkId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { followedSubs: { select: { name: true }, orderBy: { createdAt: 'desc' } } },
  })

  return NextResponse.json(user?.followedSubs.map(s => s.name) ?? [])
}

// POST — ajouter un subreddit
export async function POST(req: NextRequest) {
  const { userId: clerkId } = auth()
  if (!clerkId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name } = await req.json() as { name: string }
  if (!name?.trim()) return NextResponse.json({ error: 'Missing name' }, { status: 400 })

  const user = await getOrCreateUser()
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const clean = name.trim().replace(/^r\//, '')

  await prisma.followedSubreddit.upsert({
    where: { userId_name: { userId: user.id, name: clean } },
    create: { userId: user.id, name: clean },
    update: {},
  })

  return NextResponse.json({ ok: true })
}

// DELETE — retirer un subreddit
export async function DELETE(req: NextRequest) {
  const { userId: clerkId } = auth()
  if (!clerkId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name } = await req.json() as { name: string }
  if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 })

  const user = await prisma.user.findUnique({ where: { clerkId }, select: { id: true } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  await prisma.followedSubreddit.deleteMany({
    where: { userId: user.id, name },
  })

  return NextResponse.json({ ok: true })
}
