export function CTALink({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <a href="/sign-up" className={className}>
      {children}
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
