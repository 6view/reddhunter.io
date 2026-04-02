# Reddhunter.io Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready dark-mode landing page for Reddhunter.io using Next.js 14, Instrument Serif + Geist Sans typography, and Framer Motion scroll animations across 13 sections.

**Architecture:** `app/page.tsx` is a Server Component containing all 13 sections. Framer Motion is isolated to `MotionSection`/`MotionGrid` client wrapper components so `page.tsx` makes zero framer-motion imports. Three other client components handle animated counters, FAQ accordion, and mobile nav sheet.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS v3, Shadcn/ui, Framer Motion 11, Lucide React, TypeScript strict, Instrument Serif + Geist Sans via `next/font/google`

---

## File Map

| File | Type | Responsibility |
|------|------|----------------|
| `app/layout.tsx` | Server | Font CSS vars, metadata, `<html class="dark">` |
| `app/globals.css` | CSS | Tailwind base, Shadcn dark CSS vars, marquee keyframe, dot-grid util |
| `app/page.tsx` | Server Component | All 13 sections — imports client wrappers only |
| `tailwind.config.ts` | Config | Font family variables, custom accent colors |
| `lib/utils.ts` | Util | `cn()` (clsx + tailwind-merge) |
| `components/motion-section.tsx` | `"use client"` | `fadeUp` animated div wrapper |
| `components/motion-grid.tsx` | `"use client"` | Staggered grid wrapper + `MotionGridItem` |
| `components/animated-counters.tsx` | `"use client"` | `useCountUp` hook + IntersectionObserver, 3 stat cards |
| `components/faq-accordion.tsx` | `"use client"` | Shadcn `<Accordion>` with all 8 FAQ items |
| `components/navbar-mobile.tsx` | `"use client"` | Shadcn `<Sheet>` hamburger menu |

---

## Task 1: Project Scaffold + Dependencies

**Files:**
- Create: `/Users/teomanaras/reddhunter.io/` (Next.js scaffold copied in)
- Create: `lib/utils.ts`
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Scaffold Next.js 14 in /tmp and copy to project**

The `reddhunter.io` directory already exists (git repo + docs). We scaffold in /tmp to avoid conflicts, then copy generated files in.

```bash
cd /tmp
npx create-next-app@14 rh-scaffold \
  --typescript --tailwind --app --no-src-dir \
  --import-alias "@/*" --use-npm --no-git
cp -r /tmp/rh-scaffold/. /Users/teomanaras/reddhunter.io/
rm -rf /tmp/rh-scaffold
```

Expected: `/Users/teomanaras/reddhunter.io/package.json` exists with `"next": "14.x.x"`.

- [ ] **Step 2: Install additional dependencies**

```bash
cd /Users/teomanaras/reddhunter.io
npm install framer-motion lucide-react clsx tailwind-merge
```

Expected: `node_modules/framer-motion` and `node_modules/lucide-react` exist.

- [ ] **Step 3: Initialize Shadcn**

```bash
cd /Users/teomanaras/reddhunter.io
npx shadcn@latest init --defaults
```

If it prompts: style → **Default**, base color → **Zinc**, CSS variables → **Yes**.

Expected: `components/ui/` directory created, `globals.css` updated with Shadcn CSS variable block.

- [ ] **Step 4: Add required Shadcn components**

```bash
cd /Users/teomanaras/reddhunter.io
npx shadcn@latest add badge card accordion button separator sheet
```

Expected: `components/ui/accordion.tsx`, `components/ui/button.tsx`, `components/ui/sheet.tsx` (and others) created.

- [ ] **Step 5: Create GitHub private repo and push**

```bash
cd /Users/teomanaras/reddhunter.io
gh repo create reddhunter.io --private --source=. --push
```

Expected: `git remote -v` shows `origin https://github.com/<user>/reddhunter.io`.

- [ ] **Step 6: Write `lib/utils.ts`**

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 7: Replace `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      colors: {
        rh: {
          base: '#0a0a0a',
          surface: '#111113',
          elevated: '#0f0f11',
          border: '#27272a',
          subtle: '#1c1c1e',
          accent: '#FF4500',
          'accent-hover': '#CC3700',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

- [ ] **Step 8: Replace `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  .dark {
    --background: 0 0% 4%;
    --foreground: 0 0% 100%;
    --card: 240 4% 7%;
    --card-foreground: 0 0% 100%;
    --popover: 240 4% 7%;
    --popover-foreground: 0 0% 100%;
    --primary: 16 100% 50%;
    --primary-foreground: 0 0% 100%;
    --secondary: 240 4% 16%;
    --secondary-foreground: 0 0% 100%;
    --muted: 240 4% 16%;
    --muted-foreground: 240 5% 45%;
    --accent: 16 100% 50%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 63% 31%;
    --destructive-foreground: 0 0% 100%;
    --border: 240 4% 16%;
    --input: 240 4% 16%;
    --ring: 16 100% 50%;
    --radius: 0.75rem;
  }
}

@layer utilities {
  .dot-grid {
    background-image: radial-gradient(circle, #1c1c1e 1px, transparent 1px);
    background-size: 24px 24px;
  }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

@keyframes pulse-emoji {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

.animate-pulse-emoji {
  animation: pulse-emoji 2s ease-in-out infinite;
}
```

- [ ] **Step 9: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Instrument_Serif } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Reddhunter — Reddit Intelligence for Founders',
  description:
    'Trouve les posts viraux de ta niche, génère des Viral Scores IA, et rédige tes commentaires GEO-optimisés — pour $5/mois.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={cn('dark', geist.variable, instrumentSerif.variable)}
    >
      <body className="bg-[#0a0a0a] text-white antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 10: Type-check**

```bash
cd /Users/teomanaras/reddhunter.io
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 11: Commit**

```bash
cd /Users/teomanaras/reddhunter.io
git add -A
git commit -m "scaffold: Next.js 14, Shadcn, Framer Motion, fonts, dark theme"
git push
```

---

## Task 2: Client Wrapper Components

**Files:**
- Create: `components/motion-section.tsx`
- Create: `components/motion-grid.tsx`
- Create: `components/navbar-mobile.tsx`

- [ ] **Step 1: Create `components/motion-section.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

interface Props {
  children: React.ReactNode
  className?: string
}

export function MotionSection({ children, className }: Props) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create `components/motion-grid.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

interface Props {
  children: React.ReactNode
  className?: string
}

export function MotionGrid({ children, className }: Props) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function MotionGridItem({ children, className }: Props) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Create `components/navbar-mobile.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  { href: '#features',    label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#pricing',     label: 'Pricing' },
  { href: '#faq',         label: 'FAQ' },
]

export function NavbarMobile() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="md:hidden text-zinc-400 hover:text-white"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-[#111113] border-[#27272a] w-72">
        <nav className="flex flex-col gap-6 mt-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-zinc-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4 border-t border-[#27272a] pt-6">
            <Button
              variant="outline"
              className="border-[#3f3f46] text-zinc-300 bg-transparent hover:bg-[#1c1c1e] hover:text-white"
              asChild
            >
              <a href="#">Sign in</a>
            </Button>
            <Button className="bg-[#FF4500] hover:bg-[#CC3700] text-white" asChild>
              <a href="#">Get Started — $5/mo</a>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
```

- [ ] **Step 4: Type-check**

```bash
cd /Users/teomanaras/reddhunter.io
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
cd /Users/teomanaras/reddhunter.io
git add components/motion-section.tsx components/motion-grid.tsx components/navbar-mobile.tsx
git commit -m "feat: motion wrappers and mobile nav client components"
git push
```

---

## Task 3: AnimatedCounters + FaqAccordion

**Files:**
- Create: `components/animated-counters.tsx`
- Create: `components/faq-accordion.tsx`

- [ ] **Step 1: Create `components/animated-counters.tsx`**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'

function useCountUp(target: number, duration: number, triggered: boolean): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!triggered) return
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [triggered, target, duration])

  return count
}

export function AnimatedCounters() {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true) },
      { threshold: 0.3 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const count135 = useCountUp(135, 1500, triggered)

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-[#111113] border border-[#27272a] rounded-xl p-8 text-center">
        <div className="font-serif text-5xl text-[#FF4500] mb-3">
          {triggered ? `${count135}k+` : '0'}
        </div>
        <p className="text-[#52525b] text-sm leading-relaxed">
          utilisateurs laissés orphelins par GummySearch
        </p>
      </div>
      <div className="bg-[#111113] border border-[#27272a] rounded-xl p-8 text-center">
        <div className="font-serif text-5xl text-[#FF4500] mb-3">6h</div>
        <p className="text-[#52525b] text-sm leading-relaxed">
          fréquence de mise à jour des posts
        </p>
      </div>
      <div className="bg-[#111113] border border-[#27272a] rounded-xl p-8 text-center">
        <div className="font-serif text-5xl text-[#FF4500] mb-3">$5/mo</div>
        <p className="text-[#52525b] text-sm leading-relaxed">
          pour remplacer des heures de veille manuelle
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `components/faq-accordion.tsx`**

```tsx
'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const FAQ_ITEMS = [
  {
    q: "Qu'est-ce que le GEO et pourquoi Reddit ?",
    a: "Le GEO (Generative Engine Optimization) consiste à apparaître dans les réponses des LLMs comme ChatGPT et Perplexity. Reddit est sur-indexé dans leurs sources de données — un commentaire bien placé sur un subreddit actif peut apparaître dans des milliers de réponses IA.",
  },
  {
    q: "En quoi Reddhunter est différent de GummySearch ?",
    a: "GummySearch a fermé en novembre 2025, laissant 135 000 utilisateurs sans outil. Reddhunter combine Explore (feed automatique), Hunt (recherche temps réel), et un moteur IA pour le Viral Score et les Comment Starters — le tout à $5/mois.",
  },
  {
    q: "Comment fonctionne le Viral Score IA ?",
    a: "Claude Haiku analyse chaque post : engagement ratio, format du titre, heure de publication, type de contenu. Il génère un score 0-100 avec une explication des patterns qui ont contribué à la performance.",
  },
  {
    q: "Est-ce que ça viole les CGU de Reddit ?",
    a: "Non. Reddhunter utilise l'API officielle Reddit (OAuth 2.0) pour récupérer les posts publics, dans les limites de taux autorisées. Aucun scraping raw, aucune automatisation de publication.",
  },
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui. L'abonnement Pro est mensuel, sans engagement. Un clic depuis le dashboard suffit pour annuler — aucun email requis.",
  },
  {
    q: "Quels subreddits sont couverts ?",
    a: "12 subreddits pré-configurés inclus dès le plan Free : r/indiehackers, r/SaaS, r/startups, r/entrepreneur, r/buildinpublic, r/growthhacking, r/sidehustle, r/smallbusiness, r/digitalnomad, r/Entrepreneur, r/marketing, r/growmybusiness. Le plan Pro permet d'en ajouter autant que vous voulez.",
  },
  {
    q: "Le Comment Starter publie-t-il pour moi ?",
    a: "Non. L'IA génère un draft de commentaire contextualisé que vous copiez-collez vous-même sur Reddit. C'est intentionnel : ça garantit un ton authentique et évite tout risque de spam automatisé.",
  },
  {
    q: "Quand sortent les nouvelles features ?",
    a: "Reddhunter est construit en public. La roadmap est publique et mise à jour chaque semaine. Les updates sont annoncées sur X (Twitter) @reddhunter_io.",
  },
] as const

export function FaqAccordion() {
  return (
    <Accordion type="multiple" className="w-full space-y-2">
      {FAQ_ITEMS.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="bg-[#111113] border border-[#27272a] rounded-xl px-6 data-[state=open]:border-[#FF4500]/30"
        >
          <AccordionTrigger className="text-white text-sm font-medium text-left hover:no-underline py-5">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-[#71717a] text-sm leading-relaxed pb-5">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
```

- [ ] **Step 3: Type-check**

```bash
cd /Users/teomanaras/reddhunter.io
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/teomanaras/reddhunter.io
git add components/animated-counters.tsx components/faq-accordion.tsx
git commit -m "feat: animated counters and FAQ accordion"
git push
```

---

## Task 4: page.tsx — Shell + Sections 1–2 (Navbar + Hero)

**Files:**
- Replace: `app/page.tsx`

This task replaces the default Next.js `page.tsx` with the landing page shell containing all imports and sections 1–2. Sections 3–13 are added as `{/* TODO */}` placeholders that later tasks fill in.

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { NavbarMobile } from '@/components/navbar-mobile'
import { MotionSection } from '@/components/motion-section'
import { MotionGrid, MotionGridItem } from '@/components/motion-grid'
import { AnimatedCounters } from '@/components/animated-counters'
import { FaqAccordion } from '@/components/faq-accordion'
import {
  Zap, TrendingUp, Globe, BarChart2,
  MessageSquare, Search, Flame, Send,
  Check, Twitter, Mail,
} from 'lucide-react'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SubBadge({
  sub,
  variant,
}: {
  sub: string
  variant: 'orange' | 'green' | 'blue'
}) {
  const styles = {
    orange: 'bg-[rgba(255,69,0,0.12)] text-[#FF6B35] border border-[rgba(255,69,0,0.25)]',
    green:  'bg-[rgba(22,163,74,0.1)] text-[#4ade80] border border-[rgba(22,163,74,0.2)]',
    blue:   'bg-[rgba(37,99,235,0.1)] text-[#60a5fa] border border-[rgba(37,99,235,0.2)]',
  }
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${styles[variant]}`}>
      {sub}
    </span>
  )
}

function PostCard({
  sub, subVariant, title, upvotes, comments, timeAgo, viralScore,
}: {
  sub: string
  subVariant: 'orange' | 'green' | 'blue'
  title: string
  upvotes: string
  comments: string
  timeAgo: string
  viralScore: number
}) {
  return (
    <div className="px-4 py-3 border-b border-[#1a1a1c] last:border-0">
      <div className="mb-1.5">
        <SubBadge sub={sub} variant={subVariant} />
      </div>
      <p className="text-[#e4e4e7] text-xs font-medium leading-snug mb-2">{title}</p>
      <div className="flex items-center gap-2 text-[10px] text-[#52525b]">
        <span>🔺 {upvotes}</span>
        <span>💬 {comments}</span>
        <span>⏱ {timeAgo}</span>
        <span className="ml-auto text-[#FF6B35] font-bold bg-[rgba(255,69,0,0.1)] border border-[rgba(255,69,0,0.25)] px-2 py-0.5 rounded-full">
          {viralScore}/100
        </span>
      </div>
    </div>
  )
}

function WindowChrome({ title }: { title: string }) {
  return (
    <div className="bg-[#0f0f11] border-b border-[#1c1c1e] px-4 py-2.5 flex items-center gap-1.5">
      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      <span className="ml-3 text-[11px] text-zinc-500 font-medium">{title}</span>
    </div>
  )
}

const SUBREDDITS = [
  'r/indiehackers', 'r/SaaS', 'r/startups', 'r/entrepreneur',
  'r/buildinpublic', 'r/growthhacking', 'r/sidehustle',
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">

      {/* ── 1. NAVBAR ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-[#1c1c1e]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-bold text-white text-base">
            <span className="animate-pulse-emoji">🎯</span>
            Reddhunter
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#features"     className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#pricing"      className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq"          className="hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <a href="#" className="px-4 py-1.5 text-sm font-medium border border-[#3f3f46] rounded-md text-zinc-300 hover:text-white hover:border-zinc-400 transition-colors">
              Sign in
            </a>
            <a href="#" className="px-4 py-1.5 text-sm font-semibold bg-[#FF4500] hover:bg-[#CC3700] text-white rounded-md transition-colors">
              Get Started — $5/mo
            </a>
          </div>
          <NavbarMobile />
        </div>
      </nav>

      {/* ── 2. HERO ───────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <MotionSection>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF6B35] bg-[rgba(255,69,0,0.1)] border border-[rgba(255,69,0,0.25)] px-3 py-1.5 rounded-full mb-6">
              <Zap size={12} />
              GummySearch a fermé — prenez leur place 🚀
            </div>
            <h1 className="font-serif text-5xl md:text-[64px] leading-[1.05] tracking-tight text-white mb-5">
              Trouve ce qui convertit sur{' '}
              <span className="text-[#FF4500]">Reddit</span> en 5 min
            </h1>
            <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-lg">
              Reddhunter scrape automatiquement les posts viraux de ta niche,
              génère des Viral Scores IA, et rédige tes commentaires
              GEO-optimisés — pour $5/mois.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <a href="#" className="px-5 py-2.5 text-sm font-semibold bg-[#FF4500] hover:bg-[#CC3700] text-white rounded-lg transition-colors">
                Commencer gratuitement →
              </a>
              <a href="#how-it-works" className="text-sm text-zinc-400 underline underline-offset-4 hover:text-white transition-colors">
                Voir une démo ↓
              </a>
            </div>
            <p className="text-xs text-zinc-600">
              ✓ 3 recherches gratuites/jour · ✓ Sans carte bancaire · ✓ Setup en 2 min
            </p>
          </MotionSection>

          <MotionSection>
            <div className="bg-[#111113] border border-[#27272a] rounded-xl overflow-hidden shadow-2xl">
              <WindowChrome title="Reddhunter · Explore" />
              <PostCard sub="r/indiehackers" subVariant="orange" title="How I got my first 100 paying customers using Reddit comments (no paid ads)" upvotes="1.2k" comments="89"  timeAgo="4h ago"  viralScore={92} />
              <PostCard sub="r/SaaS"         subVariant="green"  title="Launched my scheduling tool 3 weeks ago — here's what actually moved the needle"      upvotes="847"  comments="134" timeAgo="8h ago"  viralScore={87} />
              <PostCard sub="r/startups"     subVariant="blue"   title="Why most B2B founders ignore Reddit and leave money on the table"                       upvotes="503"  comments="61"  timeAgo="12h ago" viralScore={74} />
            </div>
          </MotionSection>
        </div>
      </section>

      {/* TODO: sections 3–13 added in subsequent tasks */}

    </main>
  )
}
```

- [ ] **Step 2: Start dev server and visually verify**

```bash
cd /Users/teomanaras/reddhunter.io
npm run dev
```

Open http://localhost:3000. Expected: dark navbar with logo + links + CTA buttons, hero with Instrument Serif heading, orange "Reddit" highlight, and dashboard mockup card with 3 posts. No console errors.

- [ ] **Step 3: Type-check**

```bash
cd /Users/teomanaras/reddhunter.io
npx tsc --noEmit
```

Expected: 0 errors. (Unused imports are OK at this stage — they'll be used in later tasks.)

- [ ] **Step 4: Commit**

```bash
cd /Users/teomanaras/reddhunter.io
git add app/page.tsx
git commit -m "feat: sections 1-2 navbar and hero"
git push
```

---

## Task 5: Sections 3–5 (Marquee + Stats + Why Now)

**Files:**
- Modify: `app/page.tsx` — replace `{/* TODO: sections 3–13 */}` with sections 3–5 + new TODO

- [ ] **Step 1: Replace the TODO comment in `page.tsx`**

Find this line in `page.tsx`:
```tsx
      {/* TODO: sections 3–13 added in subsequent tasks */}
```

Replace it with:

```tsx
      {/* ── 3. MARQUEE ───────────────────────────────────────────────────── */}
      <section className="border-y border-[#1c1c1e] py-4 overflow-hidden bg-[#0a0a0a]">
        <p className="text-center text-[10px] font-medium uppercase tracking-widest text-zinc-600 mb-3">
          Utilisé par des founders qui construisent sur
        </p>
        <div className="overflow-hidden">
          <div className="flex gap-3 animate-marquee whitespace-nowrap w-max">
            {[...SUBREDDITS, ...SUBREDDITS].map((sub, i) => (
              <span key={i} className="bg-[#111113] border border-[#27272a] text-zinc-500 text-xs font-medium px-3 py-1.5 rounded-full">
                {sub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. STAT COUNTERS ──────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <MotionSection>
          <AnimatedCounters />
        </MotionSection>
      </section>

      {/* ── 5. WHY NOW — GEO OPPORTUNITY ─────────────────────────────────── */}
      <section className="bg-[#0a0a0a] dot-grid border-t border-[#1c1c1e] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <MotionSection className="text-center mb-14">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-zinc-500 bg-[#111113] border border-[#27272a] px-3 py-1.5 rounded-full mb-4">
              The Reddit × AI opportunity
            </span>
            <h2 className="font-serif text-4xl md:text-[42px] text-white leading-tight">
              Reddit est devenu le meilleur canal<br className="hidden md:block" /> de croissance pour les SaaS.
            </h2>
          </MotionSection>
          <MotionGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingUp size={20} className="text-[#FF4500]" />,
                title: 'GummySearch a fermé',
                body: '135 000 utilisateurs sans outil depuis novembre 2025. La demande est là, le concurrent direct est parti.',
              },
              {
                icon: <Globe size={20} className="text-[#FF4500]" />,
                title: 'Reddit remonte dans les LLMs',
                body: "ChatGPT, Perplexity, Google AI Overviews — Reddit est sur-indexé. Se positionner maintenant, c'est du compound.",
              },
              {
                icon: <Zap size={20} className="text-[#FF4500]" />,
                title: 'Aucun concurrent à $5/mo',
                body: "Aucun outil ne combine Explore + Hunt + IA à ce prix. C'est le créneau le plus sous-exploité du moment.",
              },
            ].map((card) => (
              <MotionGridItem key={card.title} className="bg-[#111113] border border-[#27272a] rounded-xl p-6">
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-white font-semibold text-base mb-2">{card.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{card.body}</p>
              </MotionGridItem>
            ))}
          </MotionGrid>
        </div>
      </section>

      {/* TODO: sections 6–13 */}
```

- [ ] **Step 2: Type-check + visual verify**

```bash
cd /Users/teomanaras/reddhunter.io
npx tsc --noEmit
```

Open http://localhost:3000 and scroll down. Expected: subreddit marquee animates, stat cards visible (counter triggers when scrolled into view), 3 GEO opportunity cards fade up with stagger.

- [ ] **Step 3: Commit**

```bash
cd /Users/teomanaras/reddhunter.io
git add app/page.tsx
git commit -m "feat: sections 3-5 marquee, stats, geo opportunity"
git push
```

---

## Task 6: Sections 6–7 (Explore + Hunt Features)

**Files:**
- Modify: `app/page.tsx` — replace `{/* TODO: sections 6–13 */}`

- [ ] **Step 1: Replace TODO in `page.tsx`**

Find `{/* TODO: sections 6–13 */}` and replace with:

```tsx
      {/* ── 6. FEATURE: EXPLORE ──────────────────────────────────────────── */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24 border-t border-[#1c1c1e]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <MotionSection className="lg:col-span-5">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-zinc-500 bg-[#111113] border border-[#27272a] px-3 py-1.5 rounded-full mb-5">
              Feature 01 · Explore
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 leading-tight">
              Ton feed de posts viraux, automatiquement.
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Reddhunter scrape toutes les 6 heures les subreddits de ta niche :
              r/indiehackers, r/SaaS, r/startups et 6 autres. Tu arrives et tu as
              directement les posts qui ont le plus performé — sans rien faire.
            </p>
            <ul className="space-y-2.5 text-sm text-zinc-300">
              {["Filtres 24h / 7j / 30j", "Score d'upvotes + upvote ratio", "Subreddits personnalisés", "Recherche par mots-clés", "Mise à jour toutes les 6h"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-[#FF4500] font-bold">✓</span> {f}
                </li>
              ))}
            </ul>
          </MotionSection>
          <MotionSection className="lg:col-span-7">
            <div className="bg-[#111113] border border-[#27272a] rounded-xl overflow-hidden shadow-2xl">
              <WindowChrome title="Explore · Last 7 days" />
              <PostCard sub="r/indiehackers" subVariant="orange" title="How I built a $10k/mo SaaS by lurking Reddit for 30 days straight"             upvotes="2.1k" comments="203" timeAgo="2d ago" viralScore={96} />
              <PostCard sub="r/entrepreneur" subVariant="blue"   title="Stop cold emailing. Start commenting. Here's my exact Reddit playbook."        upvotes="1.8k" comments="157" timeAgo="3d ago" viralScore={91} />
              <PostCard sub="r/SaaS"         subVariant="green"  title="I replaced my entire content strategy with 3 Reddit comments per day"          upvotes="1.4k" comments="98"  timeAgo="5d ago" viralScore={88} />
            </div>
          </MotionSection>
        </div>
      </section>

      {/* ── 7. FEATURE: HUNT ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-t border-[#1c1c1e]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <MotionSection className="lg:col-span-7 order-last lg:order-first">
            <div className="bg-[#111113] border border-[#27272a] rounded-xl overflow-hidden shadow-2xl">
              <WindowChrome title="Hunt · Find your audience" />
              <div className="p-4">
                <div className="flex gap-2 mb-4">
                  <input readOnly value="ai scheduling tool" className="flex-1 bg-[#0a0a0a] border border-[#27272a] rounded-lg px-3 py-2 text-sm text-zinc-300 cursor-default" />
                  <button className="bg-[#FF4500] text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-default">Hunt →</button>
                </div>
                {[
                  { sub: 'r/productivity', members: '2.3M members', activity: 'Très actif' },
                  { sub: 'r/sideprojects', members: '328k members', activity: 'Actif' },
                  { sub: 'r/Entrepreneur', members: '1.8M members', activity: 'Très actif' },
                ].map((r) => (
                  <div key={r.sub} className="flex items-center justify-between py-3 border-b border-[#1a1a1c] last:border-0">
                    <div>
                      <p className="text-white text-sm font-medium">{r.sub}</p>
                      <p className="text-zinc-500 text-xs">{r.members} · {r.activity}</p>
                    </div>
                    <a href="#" className="text-[#FF4500] text-xs font-semibold hover:underline">Go comment →</a>
                  </div>
                ))}
              </div>
            </div>
          </MotionSection>
          <MotionSection className="lg:col-span-5">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-zinc-500 bg-[#111113] border border-[#27272a] px-3 py-1.5 rounded-full mb-5">
              Feature 02 · Hunt
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 leading-tight">
              Trouve exactement où est ton audience.
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Entre les mots-clés de ton produit. Reddhunter interroge Reddit en temps réel
              et te retourne les subreddits les plus actifs avec leurs stats.
              Un clic pour aller commenter.
            </p>
            <ul className="space-y-2.5 text-sm text-zinc-300">
              {["Recherche temps réel via l'API Reddit", "Nombre de membres + activité", "Top posts récents par subreddit", "Lien direct vers le subreddit"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-[#FF4500] font-bold">✓</span> {f}
                </li>
              ))}
            </ul>
          </MotionSection>
        </div>
      </section>

      {/* TODO: sections 8–13 */}
```

- [ ] **Step 2: Type-check + visual verify**

```bash
cd /Users/teomanaras/reddhunter.io
npx tsc --noEmit
```

Scroll to features section. Expected: Explore is text-left/mockup-right, Hunt is mockup-left/text-right. On mobile both stack to single column.

- [ ] **Step 3: Commit**

```bash
cd /Users/teomanaras/reddhunter.io
git add app/page.tsx
git commit -m "feat: sections 6-7 explore and hunt features"
git push
```

---

## Task 7: Section 8 — AI Features (Viral Score + Comment Starter)

**Files:**
- Modify: `app/page.tsx` — replace `{/* TODO: sections 8–13 */}`

- [ ] **Step 1: Replace TODO in `page.tsx`**

Find `{/* TODO: sections 8–13 */}` and replace with:

```tsx
      {/* ── 8. AI FEATURES ───────────────────────────────────────────────── */}
      <section className="bg-[#070707] border-t border-[#1c1c1e] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <MotionSection className="text-center mb-14">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-zinc-500 bg-[#111113] border border-[#27272a] px-3 py-1.5 rounded-full mb-4">
              Powered by Claude AI
            </span>
            <h2 className="font-serif text-4xl md:text-[42px] text-white leading-tight">
              L'IA qui comprend ce qui performe.
            </h2>
          </MotionSection>

          <MotionGrid className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <MotionGridItem className="bg-[#111113] border border-[#27272a] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-[rgba(255,69,0,0.1)] rounded-lg">
                  <BarChart2 size={18} className="text-[#FF4500]" />
                </div>
                <h3 className="text-white font-semibold text-base">Viral Score IA</h3>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                Chaque post reçoit un score 0–100 avec une explication : pourquoi ça a performé,
                quel format, quelle accroche. Tu apprends les patterns de ta niche.
              </p>
              <div className="bg-[#0a0a0a] border border-[#27272a] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-zinc-500 text-xs font-medium">Viral Score</span>
                  <span className="font-serif text-3xl text-[#FF4500]">92/100</span>
                </div>
                <div className="w-full bg-[#1c1c1e] rounded-full h-1.5 mb-3">
                  <div className="bg-[#FF4500] h-1.5 rounded-full" style={{ width: '92%' }} />
                </div>
                <p className="text-zinc-600 text-[11px] leading-relaxed">
                  Format "I did X, here&apos;s what happened" + personal story + actionable data.
                  Timing optimal (Tuesday 9AM EST). Ratio engagement/views exceptionnel.
                </p>
              </div>
            </MotionGridItem>

            <MotionGridItem className="bg-[#111113] border border-[#27272a] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-[rgba(255,69,0,0.1)] rounded-lg">
                  <MessageSquare size={18} className="text-[#FF4500]" />
                </div>
                <h3 className="text-white font-semibold text-base">Comment Starter</h3>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                Un clic pour générer un commentaire GEO-optimisé. L'IA analyse le contexte,
                le ton du subreddit, et positionne ton produit naturellement.
              </p>
              <div className="bg-[#0a0a0a] border border-[#27272a] rounded-lg p-4 font-mono text-xs text-zinc-400 leading-relaxed">
                <span className="text-zinc-600">// Generated comment draft</span>
                <br /><br />
                <span className="text-[#4ade80]">Great breakdown.</span>{' '}
                I&apos;ve been doing something similar with{' '}
                <span className="text-[#60a5fa]">Reddhunter</span> — it surfaces exactly these
                kinds of posts automatically so I can jump in early. The{' '}
                <span className="text-[#FF6B35]">Viral Score</span> feature helped me understand
                why certain formats crush it here. Have you noticed the &quot;story + data&quot; combo
                consistently outperforms pure how-to content?
              </div>
            </MotionGridItem>
          </MotionGrid>

          <MotionSection className="text-center">
            <a href="#" className="inline-block px-6 py-3 text-sm font-semibold border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors">
              Essayer gratuitement →
            </a>
          </MotionSection>
        </div>
      </section>

      {/* TODO: sections 9–13 */}
```

- [ ] **Step 2: Type-check + visual verify**

```bash
cd /Users/teomanaras/reddhunter.io
npx tsc --noEmit
```

Scroll to AI section. Expected: deepest dark background `#070707`, two cards side by side, orange score progress bar renders, mono comment draft with syntax-colored spans.

- [ ] **Step 3: Commit**

```bash
cd /Users/teomanaras/reddhunter.io
git add app/page.tsx
git commit -m "feat: section 8 AI features viral score and comment starter"
git push
```

---

## Task 8: Sections 9–10 (How It Works + Pricing)

**Files:**
- Modify: `app/page.tsx` — replace `{/* TODO: sections 9–13 */}`

- [ ] **Step 1: Replace TODO in `page.tsx`**

Find `{/* TODO: sections 9–13 */}` and replace with:

```tsx
      {/* ── 9. HOW IT WORKS ──────────────────────────────────────────────── */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24 border-t border-[#1c1c1e]">
        <MotionSection className="text-center mb-16">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-zinc-500 bg-[#111113] border border-[#27272a] px-3 py-1.5 rounded-full mb-4">
            Simple comme bonjour
          </span>
          <h2 className="font-serif text-4xl md:text-[42px] text-white leading-tight">
            Opérationnel en 3 minutes.
          </h2>
        </MotionSection>
        <MotionGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px border-t border-dashed border-[#27272a] z-0" />
          {[
            { num: '01', icon: <Search size={20} className="text-[#FF4500]" />, title: 'Connecte ta niche',       body: 'Ajoute tes subreddits ou utilise nos 12 subreddits pré-configurés. Setup en 2 minutes.' },
            { num: '02', icon: <Flame  size={20} className="text-[#FF4500]" />, title: 'Explore les posts viraux', body: 'Filtre par période, upvotes, ratio. Le Viral Score IA classe automatiquement ce qui performe.' },
            { num: '03', icon: <Send   size={20} className="text-[#FF4500]" />, title: 'Engage et croît',          body: "Génère ton commentaire GEO, copie-colle sur Reddit, et build ta présence qui compound." },
          ].map((step) => (
            <MotionGridItem key={step.num} className="bg-[#111113] border border-[#27272a] rounded-xl p-6 relative z-10">
              <div className="font-serif text-4xl text-[#FF4500] mb-4">{step.num}</div>
              <div className="mb-3">{step.icon}</div>
              <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{step.body}</p>
            </MotionGridItem>
          ))}
        </MotionGrid>
      </section>

      {/* ── 10. PRICING ───────────────────────────────────────────────────── */}
      <section id="pricing" className="bg-[#0a0a0a] dot-grid border-t border-[#1c1c1e] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <MotionSection className="text-center mb-14">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-zinc-500 bg-[#111113] border border-[#27272a] px-3 py-1.5 rounded-full mb-4">
              Tarification simple
            </span>
            <h2 className="font-serif text-4xl md:text-[42px] text-white leading-tight">
              Rentable dès le premier jour.
            </h2>
          </MotionSection>
          <MotionGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <MotionGridItem className="bg-[#111113] border border-[#27272a] rounded-xl p-6 flex flex-col">
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">Free</p>
              <div className="mb-1"><span className="font-serif text-4xl text-white">$0</span><span className="text-zinc-500 text-sm ml-1">/mois</span></div>
              <p className="text-zinc-500 text-sm mb-6">Pour tester sans risque</p>
              <ul className="space-y-2.5 text-sm text-zinc-400 mb-8 flex-1">
                {["3 recherches Hunt/jour", "Feed de base", "Accès limité IA"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check size={14} className="text-zinc-600 shrink-0" />{f}</li>
                ))}
              </ul>
              <a href="#" className="block text-center py-2.5 text-sm font-semibold border border-[#3f3f46] text-zinc-300 rounded-lg hover:border-zinc-400 hover:text-white transition-colors">
                Commencer gratuitement
              </a>
            </MotionGridItem>

            {/* Pro */}
            <MotionGridItem className="bg-[#0f0a08] border-2 border-[#FF4500] rounded-xl p-6 flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[#FF4500] text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">Most Popular</span>
              </div>
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">Pro</p>
              <div className="mb-1"><span className="font-serif text-4xl text-white">$5</span><span className="text-zinc-500 text-sm ml-1">/mois</span></div>
              <p className="text-zinc-500 text-xs mb-6">soit $0.17/jour</p>
              <ul className="space-y-2.5 text-sm text-zinc-300 mb-8 flex-1">
                {["Hunt illimité", "Explore complet", "Viral Score IA", "Comment Starter IA", "Subreddits personnalisés illimités", "Filtres avancés"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check size={14} className="text-[#FF4500] shrink-0" />{f}</li>
                ))}
              </ul>
              <a href="#" className="block text-center py-2.5 text-sm font-semibold bg-[#FF4500] hover:bg-[#CC3700] text-white rounded-lg transition-colors mb-3">
                Démarrer pour $5/mois →
              </a>
              <p className="text-center text-xs text-zinc-600">✓ Annulation en 1 clic · ✓ Sans engagement</p>
            </MotionGridItem>

            {/* Done For You */}
            <MotionGridItem className="bg-[#111113] border border-[#27272a] rounded-xl p-6 flex flex-col">
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">Done For You</p>
              <div className="mb-1"><span className="font-serif text-3xl text-white">$200–500</span></div>
              <p className="text-zinc-500 text-sm mb-6">par campagne</p>
              <ul className="space-y-2.5 text-sm text-zinc-400 mb-8 flex-1">
                {["Stratégie Reddit", "Rédaction des commentaires", "Publication", "Reporting mensuel"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check size={14} className="text-zinc-600 shrink-0" />{f}</li>
                ))}
              </ul>
              <a href="#" className="block text-center py-2.5 text-sm font-semibold border border-[#3f3f46] text-zinc-300 rounded-lg hover:border-zinc-400 hover:text-white transition-colors">
                Réserver un appel →
              </a>
            </MotionGridItem>
          </MotionGrid>
        </div>
      </section>

      {/* TODO: sections 11–13 */}
```

- [ ] **Step 2: Type-check + visual verify**

```bash
cd /Users/teomanaras/reddhunter.io
npx tsc --noEmit
```

Scroll to How It Works: 3 steps with dashed connector line, step numbers in Instrument Serif. Scroll to Pricing: Pro card has orange border and floated "Most Popular" badge above it.

- [ ] **Step 3: Commit**

```bash
cd /Users/teomanaras/reddhunter.io
git add app/page.tsx
git commit -m "feat: sections 9-10 how it works and pricing"
git push
```

---

## Task 9: Sections 11–13 (FAQ + CTA Final + Footer)

**Files:**
- Modify: `app/page.tsx` — replace `{/* TODO: sections 11–13 */}`

- [ ] **Step 1: Replace final TODO in `page.tsx`**

Find `{/* TODO: sections 11–13 */}` and replace with:

```tsx
      {/* ── 11. FAQ ───────────────────────────────────────────────────────── */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-24 border-t border-[#1c1c1e]">
        <MotionSection className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-[42px] text-white leading-tight">
            Questions fréquentes
          </h2>
        </MotionSection>
        <MotionSection>
          <FaqAccordion />
        </MotionSection>
      </section>

      {/* ── 12. CTA FINAL ─────────────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] border-t border-[#1c1c1e] py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <MotionSection>
            <h2 className="font-serif text-4xl md:text-[42px] text-white leading-tight mb-4">
              Commence à construire ta présence<br className="hidden md:block" /> Reddit aujourd&apos;hui.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Rejoins les founders qui utilisent Reddhunter pour trouver et engager
              leur audience — en moins de 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <a href="#" className="px-6 py-3 text-sm font-semibold bg-[#FF4500] hover:bg-[#CC3700] text-white rounded-lg transition-colors">
                Démarrer gratuitement →
              </a>
              <a href="#" className="px-6 py-3 text-sm font-semibold border border-[#3f3f46] text-zinc-300 rounded-lg hover:border-zinc-400 hover:text-white transition-colors">
                Réserver un appel
              </a>
            </div>
            <p className="text-xs text-zinc-600 mb-16">3 recherches gratuites par jour · Sans carte bancaire</p>
          </MotionSection>
          <div className="overflow-hidden">
            <div className="flex gap-3 animate-marquee whitespace-nowrap w-max">
              {[...SUBREDDITS, ...SUBREDDITS].map((sub, i) => (
                <span key={i} className="bg-[#111113] border border-[#27272a] text-zinc-500 text-xs font-medium px-3 py-1.5 rounded-full">
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. FOOTER ────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#1c1c1e] py-12 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 font-bold text-white text-base mb-3">
                <span>🎯</span> Reddhunter
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed">Reddit intelligence for founders and indie hackers.</p>
            </div>
            <div>
              <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-4">Produit</p>
              <ul className="space-y-2.5 text-sm text-zinc-600">
                {['Features', 'Pricing', 'Changelog'].map((l) => (
                  <li key={l}><a href="#" className="hover:text-zinc-300 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-4">Ressources</p>
              <ul className="space-y-2.5 text-sm text-zinc-600">
                {['Blog', 'Subreddits Guide', 'GEO Guide'].map((l) => (
                  <li key={l}><a href="#" className="hover:text-zinc-300 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-4">Contact</p>
              <ul className="space-y-2.5 text-sm text-zinc-600">
                <li>
                  <a href="https://x.com/reddhunter_io" className="hover:text-zinc-300 transition-colors flex items-center gap-2">
                    <Twitter size={14} /> Twitter / X
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@reddhunter.io" className="hover:text-zinc-300 transition-colors flex items-center gap-2">
                    <Mail size={14} /> hello@reddhunter.io
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#1c1c1e] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-zinc-600 text-xs">© 2026 Reddhunter.io — Built in public 🚀</p>
            <p className="text-zinc-700 text-xs">Made for founders who build on Reddit</p>
          </div>
        </div>
      </footer>
```

- [ ] **Step 2: Type-check + visual verify**

```bash
cd /Users/teomanaras/reddhunter.io
npx tsc --noEmit
```

Scroll to bottom. Expected: FAQ accordion opens/closes (8 items), CTA section with two buttons, marquee repeats, footer with 4 columns collapsing to 1 on mobile.

- [ ] **Step 3: Commit**

```bash
cd /Users/teomanaras/reddhunter.io
git add app/page.tsx
git commit -m "feat: sections 11-13 FAQ, CTA final, footer — all 13 sections complete"
git push
```

---

## Task 10: Responsive Polish + Production Build

**Files:**
- Modify: `app/page.tsx` (responsive fixes as needed)

- [ ] **Step 1: Audit mobile layout at 375px**

In browser DevTools (F12 → responsive mode → 375px width), scroll through every section and check:

| Section | Expected on mobile |
|---------|-------------------|
| Navbar | hamburger icon visible, desktop links/CTAs hidden |
| Hero | single column, mockup stacks below text |
| Stats | single column (3 cards stacked) |
| Why Now | single column (3 cards stacked) |
| Features Explore | text stacks above mockup |
| Features Hunt | mockup stacks above text |
| How It Works | 3 steps stacked, dashed line hidden |
| Pricing | 3 cards stacked, Pro "Most Popular" badge still centered |
| Footer | 1 column |

Fix any broken layouts by adjusting Tailwind responsive classes in `page.tsx`.

- [ ] **Step 2: Run production build**

```bash
cd /Users/teomanaras/reddhunter.io
npm run build
```

Expected final output:
```
✓ Compiled successfully
Route (app) ...
○ / ...
```

Zero TypeScript errors, zero missing module errors.

- [ ] **Step 3: Fix any build warnings**

Common issues and fixes:
- `<a>` nested inside `<Button asChild>` triggering hydration warning → replace with a plain styled `<a>` tag
- Unescaped `'` or `"` in JSX → use `&apos;` and `&quot;` (already handled in the code above)
- Missing `key` props → add `key` to all `.map()` results (already present)

Re-run `npm run build` after any fixes until it passes cleanly.

- [ ] **Step 4: Final type-check**

```bash
cd /Users/teomanaras/reddhunter.io
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 5: Final commit + push**

```bash
cd /Users/teomanaras/reddhunter.io
git add -A
git commit -m "feat: responsive polish and production build verified"
git push
```

Expected: All 10 tasks committed, GitHub private repo up to date, `npm run build` passes locally.
