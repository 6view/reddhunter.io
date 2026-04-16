import { NextResponse } from 'next/server'
import { stripe, isAIPriceId, isAnnualPriceId } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import type Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId
    if (userId) {
      const sub = await stripe.subscriptions.retrieve(session.subscription as string)
      const priceId = sub.items.data[0]?.price.id ?? ''
      const isAI = isAIPriceId(priceId)
      const isAnnual = isAnnualPriceId(priceId)

      let plan: 'PRO' | 'PRO_ANNUAL' | 'PRO_AI' | 'PRO_AI_ANNUAL'
      if (isAI && isAnnual) plan = 'PRO_AI_ANNUAL'
      else if (isAI) plan = 'PRO_AI'
      else if (isAnnual) plan = 'PRO_ANNUAL'
      else plan = 'PRO'

      await prisma.user.update({
        where: { id: userId },
        data: {
          plan,
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
        },
      })
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription
    // Downgrade to base PRO (no free plan anymore)
    await prisma.user.updateMany({
      where: { stripeSubscriptionId: sub.id },
      data: { plan: 'PRO', stripeSubscriptionId: null },
    })
  }

  return NextResponse.json({ received: true })
}
