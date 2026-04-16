'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CTALink, SignInLink } from '@/components/cta-link'
import { NavbarMobile } from '@/components/navbar-mobile'
import { Logo } from '@/components/logo'

const NAV_LINKS = [
  { href: '#features',     label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#pricing',      label: 'Pricing' },
  { href: '#faq',          label: 'FAQ' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <motion.nav
        aria-label="Main navigation"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-auto w-full max-w-5xl flex items-center justify-between px-5 h-12 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? 'bg-[#0d0d0f]/90 border-white/[0.10] shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
            : 'bg-[#0d0d0f]/70 border-white/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 font-bold text-white text-base group">
          <motion.div
            whileHover={{ scale: 1.08, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            <Logo size={26} />
          </motion.div>
          <span className="tracking-tight text-[15px]">Reddhunter</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7 text-[13px] text-zinc-500">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 hover:text-white transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#FF4500] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          <SignInLink className="px-3.5 py-1.5 text-[12px] font-medium border border-white/[0.08] rounded-xl text-zinc-400 hover:text-white hover:border-white/[0.18] transition-colors">
            Sign in
          </SignInLink>
          <CTALink
            shine
            className="px-3.5 py-1.5 text-[12px] font-semibold bg-[#FF4500] hover:bg-[#CC3700] text-white rounded-xl transition-colors duration-200 hover:shadow-[0_0_16px_rgba(255,69,0,0.4)]"
          >
            Get Started — $5/mo
          </CTALink>
        </div>

        <NavbarMobile />
      </motion.nav>
    </div>
  )
}
