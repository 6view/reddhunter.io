'use client'

export function CheckoutButton({
  priceId,
  children,
  className,
}: {
  priceId: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a href={`/checkout?priceId=${priceId}`} className={`relative overflow-hidden ${className ?? ''}`}>
      {children}
      <span className="pointer-events-none absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </a>
  )
}
