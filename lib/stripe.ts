import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

export const PLANS = {
  PRO_MONTHLY: {
    name: 'Pro Mensuel',
    price: 500, // centimes
    interval: 'month' as const,
    priceId: process.env.STRIPE_PRICE_MONTHLY!,
  },
  PRO_ANNUAL: {
    name: 'Pro Annuel',
    price: 5000, // centimes
    interval: 'year' as const,
    priceId: process.env.STRIPE_PRICE_ANNUAL!,
  },
}
