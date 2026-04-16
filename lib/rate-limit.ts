import { prisma } from '@/lib/prisma'
import { LIMITS } from '@/lib/plan-check'
import type { Plan } from '@prisma/client'

type Feature = 'viralScore' | 'commentStarter'

export async function checkRateLimit(userId: string, plan: Plan, feature: Feature): Promise<{
  allowed: boolean
  used: number
  limit: number
}> {
  const limit = LIMITS[feature][plan]

  // Unlimited
  if (!isFinite(limit)) return { allowed: true, used: 0, limit: Infinity }

  const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
  const key = `${feature}:${today}`

  const usage = await prisma.dailyUsage.upsert({
    where: { userId_date: { userId, date: key } },
    create: { userId, date: key, count: 0 },
    update: {},
    select: { count: true },
  })

  return {
    allowed: usage.count < limit,
    used: usage.count,
    limit,
  }
}

export async function incrementUsage(userId: string, feature: Feature): Promise<void> {
  const today = new Date().toISOString().slice(0, 10)
  const key = `${feature}:${today}`

  await prisma.dailyUsage.upsert({
    where: { userId_date: { userId, date: key } },
    create: { userId, date: key, count: 1 },
    update: { count: { increment: 1 } },
  })
}
