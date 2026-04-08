import Stripe from 'stripe'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-03-31.basil' })

async function main() {
  const product = await stripe.products.create({
    name: 'Reddhunter Pro',
    description: 'Accès complet à Reddhunter — analyse Reddit, Viral Score IA, commentaires GEO',
  })
  console.log('Product ID:', product.id)

  const monthly = await stripe.prices.create({
    product: product.id,
    unit_amount: 500,
    currency: 'eur',
    recurring: { interval: 'month' },
  })
  console.log('STRIPE_PRICE_MONTHLY=', monthly.id)

  const annual = await stripe.prices.create({
    product: product.id,
    unit_amount: 5000,
    currency: 'eur',
    recurring: { interval: 'year' },
  })
  console.log('STRIPE_PRICE_ANNUAL=', annual.id)
}

main().catch(console.error)
