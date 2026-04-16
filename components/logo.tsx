export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="32" height="32" rx="7" fill="#111113" />

      {/* Stem — vertical bar */}
      <rect x="7" y="6" width="4.5" height="20" rx="1" fill="white" />

      {/* Bowl with counter cutout (evenodd) */}
      <path
        fillRule="evenodd"
        fill="white"
        d="
          M 11.5 6 L 19.5 6 Q 26.5 6 26.5 12 Q 26.5 18 19.5 18 L 11.5 18 Z
          M 11.5 9.5 L 18.5 9.5 Q 22.5 9.5 22.5 12 Q 22.5 15 18.5 15 L 11.5 15 Z
        "
      />

      {/* Leg — orange accent */}
      <path fill="#FF4500" d="M 16 18 L 20.5 18 L 27.5 26 L 23 26 Z" />
    </svg>
  )
}
