import Link from 'next/link'
import { Flame, Compass, Search, Bookmark, Settings, FlaskConical, Zap } from 'lucide-react'
import { SignOutButton } from '@/components/sign-out-button'
import { Logo } from '@/components/logo'
import { OnboardingBanner } from '@/components/onboarding-banner'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'

async function getUserPlan() {
  const { userId: clerkId } = auth()
  if (!clerkId) return null
  const user = await prisma.user.findUnique({ where: { clerkId }, select: { plan: true } })
  return user?.plan ?? null
}

const PLAN_LABELS: Record<string, { label: string; color: string }> = {
  FREE:         { label: 'Free',       color: '#52525b' },
  PRO:          { label: 'Pro',        color: '#FF4500' },
  PRO_ANNUAL:   { label: 'Pro Annual', color: '#FF4500' },
  PRO_AI:       { label: 'Pro AI',     color: '#a855f7' },
  PRO_AI_ANNUAL:{ label: 'Pro AI Annual', color: '#a855f7' },
}

const NAV = [
  { href: '/dashboard/explore',icon: Compass,       label: 'Explore' },
  { href: '/dashboard/hunt',   icon: Search,        label: 'Hunt' },
  { href: '/dashboard/saved',  icon: Bookmark,      label: 'Favoris' },
  { href: '/dashboard/ia-lab', icon: FlaskConical,  label: 'IA Lab', highlight: true },
  { href: '/dashboard/settings',icon: Settings,     label: 'Paramètres' },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const plan = await getUserPlan()
  const planInfo = plan ? PLAN_LABELS[plan] : null
  const isAI   = plan === 'PRO_AI' || plan === 'PRO_AI_ANNUAL'
  const isFree = plan === 'FREE'
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 flex-shrink-0 border-r border-[#1c1c1e] bg-[#0a0a0a] sticky top-0 h-screen">

        {/* Logo */}
        <div className="h-14 flex items-center gap-2.5 px-5 border-b border-[#1c1c1e]">
          <Logo size={26} />
          <span className="font-bold text-white text-[15px] tracking-tight">Reddhunter</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV.map(({ href, icon: Icon, label, highlight }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors group ${
                highlight
                  ? 'text-[#FF4500] hover:bg-[#FF4500]/10 hover:text-[#FF6B35]'
                  : 'text-zinc-400 hover:text-white hover:bg-[#111113]'
              }`}
            >
              <Icon size={16} className={`flex-shrink-0 transition-colors ${highlight ? 'text-[#FF4500]' : 'group-hover:text-[#FF4500]'}`} />
              {label}
              {highlight && (
                <span className="ml-auto text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-[#FF4500]/15 text-[#FF4500]">New</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-[#1c1c1e] flex flex-col gap-2">
          {/* Plan badge */}
          {planInfo && (
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.02]">
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${planInfo.color}20` }}>
                {isAI
                  ? <Zap size={13} style={{ color: planInfo.color }} />
                  : <Flame size={13} style={{ color: planInfo.color }} />
                }
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-zinc-300 truncate">{planInfo.label}</p>
                {isFree && (
                  <Link href="/#pricing" className="text-[10px] text-[#FF4500]/70 hover:text-[#FF4500] transition-colors">
                    Passer à Pro →
                  </Link>
                )}
                {!isAI && !isFree && (
                  <Link href="/#pricing" className="text-[10px] text-[#FF4500]/70 hover:text-[#FF4500] transition-colors">
                    Upgrade to Pro AI →
                  </Link>
                )}
              </div>
            </div>
          )}
          <SignOutButton />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <OnboardingBanner />
        {children}
      </main>
    </div>
  )
}
