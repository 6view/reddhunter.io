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
    <a href={`/checkout?priceId=${priceId}`} className={className}>
      {children}
    </a>
  )
}
