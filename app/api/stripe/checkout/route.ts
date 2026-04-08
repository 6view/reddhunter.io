import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { stripe } from '@/lib/stripe'
import { getOrCreateUser } from '@/lib/get-or-create-user'

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { priceId } = await req.json()
  if (!priceId) return NextResponse.json({ error: 'Missing priceId' }, { status: 400 })

  const user = await getOrCreateUser()
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/explore?upgraded=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/#pricing`,
    metadata: { userId: user.id, clerkId: userId },
    customer_email: user.email,
  })

  return NextResponse.json({ url: session.url })
}
