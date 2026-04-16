export function CTALink({
  children,
  className,
  shine = false,
}: {
  children: React.ReactNode
  className?: string
  shine?: boolean
}) {
  return (
    <a href="/sign-up" className={`relative overflow-hidden ${className ?? ''}`}>
      {children}
      {shine && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
    </a>
  )
}

export function SignInLink({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <a href="/sign-in" className={className}>
      {children}
    </a>
  )
}
