import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { prisma } from '@/lib/prisma'

interface ClerkUserEvent {
  type: 'user.created' | 'user.deleted'
  data: {
    id: string
    email_addresses: { email_address: string; id: string }[]
    primary_email_address_id: string
  }
}

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET
  if (!secret) return new Response('Missing webhook secret', { status: 500 })

  const headersList = headers()
  const svixId        = headersList.get('svix-id')
  const svixTimestamp = headersList.get('svix-timestamp')
  const svixSignature = headersList.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing svix headers', { status: 400 })
  }

  const body = await req.text()
  const wh = new Webhook(secret)

  let event: ClerkUserEvent
  try {
    event = wh.verify(body, {
      'svix-id':        svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as ClerkUserEvent
  } catch {
    return new Response('Invalid signature', { status: 400 })
  }

  if (event.type === 'user.created') {
    const primaryEmail = event.data.email_addresses.find(
      e => e.id === event.data.primary_email_address_id
    )?.email_address ?? ''

    await prisma.user.create({
      data: {
        clerkId: event.data.id,
        email:   primaryEmail,
      },
    })
  }

  if (event.type === 'user.deleted') {
    await prisma.user.deleteMany({
      where: { clerkId: event.data.id },
    })
  }

  return new Response('OK', { status: 200 })
}
