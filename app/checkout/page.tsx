'use client'

import { useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'

export default function CheckoutPage() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const priceId = searchParams.get('priceId')

  useEffect(() => {
    if (!isLoaded) return
    if (!isSignedIn) {
      router.replace(`/sign-up?redirect_url=/checkout?priceId=${priceId}`)
      return
    }
    if (!priceId) {
      router.replace('/#pricing')
      return
    }

    fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.url) window.location.href = data.url
        else router.replace('/#pricing')
      })
  }, [isLoaded, isSignedIn, priceId, router])

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#FF4500] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-zinc-400 text-sm">Préparation du paiement...</p>
      </div>
    </div>
  )
}
