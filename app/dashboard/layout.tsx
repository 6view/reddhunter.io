import Link from 'next/link'
import { Flame, Compass, Search, Bookmark, Settings } from 'lucide-react'
import { SignOutButton } from '@/components/sign-out-button'

const NAV = [
  { href: '/dashboard/explore', icon: Compass,  label: 'Explore' },
  { href: '/dashboard/hunt',    icon: Search,   label: 'Hunt' },
  { href: '/dashboard/saved',   icon: Bookmark, label: 'Favoris' },
  { href: '/dashboard/settings',icon: Settings, label: 'Paramètres' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 flex-shrink-0 border-r border-[#1c1c1e] bg-[#0a0a0a] sticky top-0 h-screen">

        {/* Logo */}
        <div className="h-14 flex items-center gap-2.5 px-5 border-b border-[#1c1c1e]">
          <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
            <rect width="32" height="32" rx="7" fill="#111113"/>
            <rect x="1.5"  y="23"  width="3.5" height="7.5"  rx="0.5" fill="#7A2800"/>
            <rect x="6"    y="19.5" width="3.5" height="11"   rx="0.5" fill="#A33500"/>
            <rect x="10.5" y="15.5" width="3.5" height="15"   rx="0.5" fill="#CC4400"/>
            <rect x="15"   y="11.5" width="3.5" height="19"   rx="0.5" fill="#E85000"/>
            <rect x="19.5" y="7.5"  width="3.5" height="23"   rx="0.5" fill="#FF5500"/>
            <rect x="24"   y="4"    width="4"   height="26.5" rx="0.5" fill="#FF7835"/>
            <path d="M2 25 Q8 19 16 13 Q22 9 28.5 3.5" stroke="#FF4500" strokeWidth="1.2" strokeDasharray="1.5,2" fill="none" strokeLinecap="round"/>
            <path d="M27 2.5 L30.5 4 L28 6.5" stroke="#FF4500" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 8 L12 18 L16.5 18 L13 27 L22 16 L17.5 16 Z" fill="white" stroke="#111113" strokeWidth="0.5"/>
            <circle cx="16.5" cy="4.5" r="2.8" fill="white"/>
          </svg>
          <span className="font-bold text-white text-[15px]">Reddhunter</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-zinc-400 hover:text-white hover:bg-[#111113] transition-colors group"
            >
              <Icon size={16} className="flex-shrink-0 group-hover:text-[#FF4500] transition-colors" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-[#1c1c1e] flex flex-col gap-1">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-7 h-7 rounded-full bg-[#FF4500]/20 flex items-center justify-center">
              <Flame size={13} className="text-[#FF4500]" />
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-zinc-300 truncate">Free plan</p>
              <p className="text-[10px] text-zinc-600">3 recherches/jour</p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  )
}
