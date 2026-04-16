import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

export const PLANS = {
  PRO_MONTHLY: {
    name: 'Pro',
    price: 500,
    interval: 'month' as const,
    priceId: process.env.STRIPE_PRICE_MONTHLY!,
    features: [
      'Unlimited Hunt',
      'Full Explore feed',
      'Viral Score AI (20/day)',
      'Comment Starter AI (5/day)',
      'Advanced filters',
    ],
  },
  PRO_ANNUAL: {
    name: 'Pro Annual',
    price: 5000,
    interval: 'year' as const,
    priceId: process.env.STRIPE_PRICE_ANNUAL!,
    features: [
      'Everything in Pro',
      '2 months free ($4.17/mo)',
    ],
  },
  PRO_AI_MONTHLY: {
    name: 'Pro AI',
    price: 1500,
    interval: 'month' as const,
    priceId: process.env.STRIPE_PRICE_AI_MONTHLY!,
    features: [
      'Everything in Pro',
      'IA Lab (posts recommandés)',
      'Viral Score AI illimité',
      'Comment Starter AI (50/day)',
      'Profil business personnalisé',
      'Recommandations IA hebdo',
    ],
  },
  PRO_AI_ANNUAL: {
    name: 'Pro AI Annual',
    price: 12000,
    interval: 'year' as const,
    priceId: process.env.STRIPE_PRICE_AI_ANNUAL!,
    features: [
      'Everything in Pro AI',
      '2 months free ($10/mo)',
    ],
  },
}

// Helper: is this priceId an AI plan?
export function isAIPriceId(priceId: string): boolean {
  return (
    priceId === process.env.STRIPE_PRICE_AI_MONTHLY ||
    priceId === process.env.STRIPE_PRICE_AI_ANNUAL
  )
}

// Helper: is this priceId annual?
export function isAnnualPriceId(priceId: string): boolean {
  return (
    priceId === process.env.STRIPE_PRICE_ANNUAL ||
    priceId === process.env.STRIPE_PRICE_AI_ANNUAL
  )
}
