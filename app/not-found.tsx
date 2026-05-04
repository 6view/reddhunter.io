import Link from 'next/link'
import { Logo } from '@/components/logo'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07080a] flex flex-col items-center justify-center px-6 text-center">

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(255,69,0,0.08),transparent_70%)] pointer-events-none" />

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-16 text-zinc-600 hover:text-white transition-colors">
        <Logo size={22} />
        <span className="text-[14px] font-semibold">Reddhunter</span>
      </Link>

      {/* 404 */}
      <div className="relative mb-6">
        <p className="text-[120px] font-bold text-white/[0.04] leading-none select-none tracking-tight">404</p>
        <p className="absolute inset-0 flex items-center justify-center text-[22px] font-semibold text-white tracking-tight">
          Page introuvable
        </p>
      </div>

      <p className="text-zinc-500 text-[14px] mb-10 max-w-sm leading-relaxed">
        Cette page n&apos;existe pas ou a été déplacée.
      </p>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="px-5 py-2.5 text-[13px] font-medium border border-white/[0.08] rounded-xl text-zinc-400 hover:text-white hover:border-white/[0.18] transition-colors"
        >
          Landing page
        </Link>
        <Link
          href="/dashboard/explore"
          className="px-5 py-2.5 text-[13px] font-semibold bg-[#FF4500] hover:bg-[#CC3700] text-white rounded-xl transition-colors"
        >
          Dashboard →
        </Link>
      </div>
    </div>
  )
}
