import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const { userId: clerkId } = auth()
  if (!clerkId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: {
      businessName: true,
      businessUrl: true,
      businessDescription: true,
      targetAudience: true,
      keywords: true,
      tone: true,
    },
  })

  return NextResponse.json(user ?? {})
}

export async function POST(req: NextRequest) {
  const { userId: clerkId } = auth()
  if (!clerkId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json() as {
    businessName?: string
    businessUrl?: string
    businessDescription?: string
    targetAudience?: string
    keywords?: string
    tone?: string
  }

  const user = await prisma.user.update({
    where: { clerkId },
    data: {
      businessName: body.businessName ?? null,
      businessUrl: body.businessUrl ?? null,
      businessDescription: body.businessDescription ?? null,
      targetAudience: body.targetAudience ?? null,
      keywords: body.keywords ?? null,
      tone: body.tone ?? 'neutral',
    },
    select: {
      businessName: true,
      businessUrl: true,
      businessDescription: true,
      targetAudience: true,
      keywords: true,
      tone: true,
    },
  })

  return NextResponse.json(user)
}
