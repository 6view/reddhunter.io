'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Compass, Search, Bookmark, FlaskConical, Settings } from 'lucide-react'

const NAV = [
  { href: '/dashboard/explore',  icon: Compass,      label: 'Explore' },
  { href: '/dashboard/hunt',     icon: Search,       label: 'Hunt' },
  { href: '/dashboard/saved',    icon: Bookmark,     label: 'Favoris' },
  { href: '/dashboard/ia-lab',   icon: FlaskConical, label: 'IA Lab', highlight: true },
  { href: '/dashboard/settings', icon: Settings,     label: 'Plus' },
]

export function DashboardMobileNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-[#1c1c1e]">
      <div className="flex items-center justify-around px-2 h-16 safe-bottom">
        {NAV.map(({ href, icon: Icon, label, highlight }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 flex-1 py-2 relative group"
            >
              {/* Active indicator */}
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-[#FF4500]" />
              )}

              <Icon
                size={20}
                className={`transition-colors ${
                  active
                    ? 'text-[#FF4500]'
                    : highlight
                    ? 'text-[#FF4500]/50 group-hover:text-[#FF4500]'
                    : 'text-zinc-600 group-hover:text-zinc-300'
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  active ? 'text-[#FF4500]' : 'text-zinc-600'
                }`}
              >
                {label}
              </span>

              {/* IA Lab dot */}
              {highlight && !active && (
                <span className="absolute top-2 right-[calc(50%-14px)] w-1.5 h-1.5 rounded-full bg-[#FF4500]" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
