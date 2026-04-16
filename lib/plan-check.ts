import type { Plan } from '@prisma/client'

export function hasAI(plan: Plan): boolean {
  return plan === 'PRO_AI' || plan === 'PRO_AI_ANNUAL'
}

export function hasPro(plan: Plan): boolean {
  return plan === 'PRO' || plan === 'PRO_ANNUAL' || hasAI(plan)
}

export const LIMITS = {
  viralScore: {
    PRO: 20,
    PRO_ANNUAL: 20,
    PRO_AI: Infinity,
    PRO_AI_ANNUAL: Infinity,
  } as Record<Plan, number>,
  commentStarter: {
    PRO: 5,
    PRO_ANNUAL: 5,
    PRO_AI: 50,
    PRO_AI_ANNUAL: 50,
  } as Record<Plan, number>,
}
