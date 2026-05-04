'use client'

import { useState, useEffect } from 'react'
import { X, Sparkles, Search, Zap, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const STEPS = [
  { icon: Search,    label: 'Explore les posts viraux',     href: '/dashboard/explore',  desc: 'Filtre par subreddit, sauvegarde les meilleurs' },
  { icon: Zap,       label: 'Score un post avec l\'IA',     href: '/dashboard/explore',  desc: 'Clique "Viral Score" sur n\'importe quel post' },
  { icon: Sparkles,  label: 'Configure ton profil IA',      href: '/dashboard/ia-lab',   desc: 'IA Lab → Mon Business → sauvegarde ton produit' },
]

export function OnboardingBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Affiche seulement si jamais dismissé
    const dismissed = localStorage.getItem('rh_onboarding_dismissed')
    if (!dismissed) setVisible(true)
  }, [])

  function dismiss() {
    localStorage.setItem('rh_onboarding_dismissed', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="mx-6 mt-6 rounded-2xl border border-[#FF4500]/20 bg-[#FF4500]/[0.04] p-5 relative">
      <button
        onClick={dismiss}
        className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-300 transition-colors"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>

      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-[#FF4500]/15 flex items-center justify-center">
          <Sparkles size={12} className="text-[#FF4500]" />
        </div>
        <p className="text-[13px] font-semibold text-white">Bienvenue sur Reddhunter 👋</p>
        <span className="ml-auto text-[10px] text-zinc-600">3 étapes pour démarrer</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {STEPS.map(({ icon: Icon, label, href, desc }, i) => (
          <Link
            key={i}
            href={href}
            onClick={dismiss}
            className="flex items-start gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.10] transition-all group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#FF4500]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon size={13} className="text-[#FF4500]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-[#FF4500]/60 mr-1">0{i + 1}</span>
                <p className="text-[12px] font-semibold text-zinc-200 group-hover:text-white transition-colors truncate">{label}</p>
              </div>
              <p className="text-[11px] text-zinc-600 mt-0.5 leading-relaxed">{desc}</p>
            </div>
            <ChevronRight size={12} className="text-zinc-700 group-hover:text-zinc-400 flex-shrink-0 mt-1 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  )
}
