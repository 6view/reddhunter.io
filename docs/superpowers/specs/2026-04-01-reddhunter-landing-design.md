# Reddhunter.io Landing Page — Design Spec

**Date:** 2026-04-01  
**Project:** `/Users/teomanaras/reddhunter.io`  
**GitHub:** Private repo `reddhunter.io` (to be created via `gh repo create`)

---

## 1. Project Setup

| Item | Value |
|------|-------|
| Framework | Next.js 14 with App Router |
| Styling | Tailwind CSS + `cn()` (clsx + tailwind-merge) |
| Components | Shadcn/ui (Badge, Card, Accordion, Button, Separator, Sheet) |
| Animation | Framer Motion — scroll-triggered `whileInView` |
| Icons | Lucide React only |
| Language | TypeScript strict, no `any` |
| Package manager | npm |
| Repo visibility | Private |

**Scaffold command:**
```bash
npx create-next-app@14 reddhunter.io \
  --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

---

## 2. Typography

| Role | Font | Weight | Size | Notes |
|------|------|--------|------|-------|
| H1 (hero) | Instrument Serif | 400 | 64px | `letter-spacing: -0.01em`, `line-height: 1.05` |
| H2 (sections) | Instrument Serif | 400 | 42px | `letter-spacing: -0.01em` |
| H3 (cards) | Geist Sans | 600 | 20px | |
| Body | Geist Sans | 400 | 16px | `leading-relaxed`, `text-zinc-400` |
| Labels / badges | Geist Sans | 500–600 | 12px | `uppercase tracking-wider` |
| Nav links | Geist Sans | 500 | 14px | |

Both fonts loaded via `next/font/google` — zero layout shift.

```ts
import { Geist } from 'next/font/google'
import { Instrument_Serif } from 'next/font/google'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-serif'
})
```

---

## 3. Color System (Full Dark Mode)

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-base` | `#0a0a0a` | Page background, hero, sections |
| `bg-surface` | `#111113` | Cards, dashboard mockup, pricing cards |
| `bg-elevated` | `#0f0f11` | Dashboard header, navbar bg |
| `border` | `#27272a` | All borders (0.5px) |
| `border-subtle` | `#1c1c1e` | Section dividers |
| `text-primary` | `#ffffff` | Headings |
| `text-secondary` | `#a1a1aa` | Body copy |
| `text-muted` | `#52525b` | Labels, metadata, stats |
| `text-dimmed` | `#3f3f46` | Trust line, disabled states |
| `accent` | `#FF4500` | CTAs, viral badges, highlights |
| `accent-hover` | `#CC3700` | Hover state for orange elements |
| `accent-muted-bg` | `rgba(255,69,0,0.10)` | Badge backgrounds |
| `accent-muted-border` | `rgba(255,69,0,0.25)` | Badge borders |

**Dot grid background** (hero + alternating sections):
```css
background-image: radial-gradient(circle, #1c1c1e 1px, transparent 1px);
background-size: 24px 24px;
```

---

## 4. Architecture

### File structure
```
app/
  layout.tsx              ← fonts, metadata, global CSS
  page.tsx                ← Server Component, all 13 sections
  globals.css             ← Tailwind base + CSS variables
components/
  motion-section.tsx      ← "use client" — reusable animated wrapper
  motion-grid.tsx         ← "use client" — staggered grid wrapper
  animated-counters.tsx   ← "use client" — useCountUp hook + IntersectionObserver
  faq-accordion.tsx       ← "use client" — Shadcn Accordion
  navbar-mobile.tsx       ← "use client" — Sheet-based mobile menu
```

### Why client wrapper components
`page.tsx` is a Server Component and cannot import `framer-motion` directly. Every animated section is wrapped in `<MotionSection>` or `<MotionGrid>` (client components), which accept `children` and apply the `fadeUp` / `stagger` variants. `page.tsx` itself contains zero `framer-motion` imports — only the wrapper components do.

### MotionSection — reusable animated wrapper
```tsx
// components/motion-section.tsx
'use client'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export function MotionSection({ children, className }: { children: React.ReactNode, className?: string }) {
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

### MotionGrid — staggered children
```tsx
// components/motion-grid.tsx
'use client'
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }
// wraps grids of cards, applies stagger to direct children via motion.div
```

All animated sections in `page.tsx` use: `<MotionSection>...</MotionSection>` or `<MotionGrid>...</MotionGrid>`.

---

## 5. Sections (13 total)

### 1 — Navbar (sticky)
- `sticky top-0 z-50 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-[#1c1c1e]`
- Logo: `🎯 Reddhunter` (Geist Bold, CSS pulse on emoji)
- Center links: `#features #how-it-works #pricing #faq`
- Right: `Sign in` outline + `Get Started — $5/mo` orange primary
- Mobile: `<Sheet>` from Shadcn triggered by hamburger (`Menu` icon from Lucide)

### 2 — Hero
- Layout: 2-column grid (text left, dashboard mockup right), collapses to 1 col on mobile
- Badge: orange-tinted pill — "⚡ GummySearch a fermé — prenez leur place 🚀"
- H1 (Instrument Serif 64px): "Trouve ce qui convertit sur **Reddit** en 5 min" — "Reddit" in `#FF4500`
- Subtitle (Geist 16px, zinc-400): full copy from spec
- CTAs: orange primary + text link "Voir une démo ↓"
- Trust line: "✓ 3 recherches gratuites/jour · ✓ Sans carte bancaire · ✓ Setup en 2 min" (zinc-600)
- Dashboard mockup: `bg-[#111113]` card with 3 fake posts, subreddit badges (orange/green/blue), viral score badges

### 3 — Logo Marquee
- Label: "Utilisé par des founders qui construisent sur" (zinc-600, uppercase, 10px)
- CSS infinite scroll: `animation: marquee 30s linear infinite`, `-50%` translateX
- 7 subreddit pills × 2 (duplicate for seamless loop): `bg-[#111113] border-[#27272a]`

### 4 — Stat Counters *(AnimatedCounters client component)*
- 3-column grid → 1 col mobile
- Cards: `bg-[#111113] border-[#27272a] rounded-xl`
- Numbers animate 0→target with `useCountUp(target, 1500)` + IntersectionObserver
- Stat numbers in **Instrument Serif** (not Geist) for visual weight
- Values: `135 000+` / `6h` / `$5/mois`

### 5 — Why Now (GEO Opportunity)
- `bg-[#0a0a0a]` with dot grid
- Badge, H2 (Instrument Serif), 3-column grid of feature cards
- Cards: `bg-[#111113]`, Lucide icons (TrendingUp, Globe, Zap) in orange

### 6 — Feature: Explore (text left, mockup right)
- `id="features"`, alternating layout
- Left: badge "Feature 01 · Explore", H3, description, orange checkmark list
- Right: 3 post cards with viral scores (same style as hero mockup)

### 7 — Feature: Hunt (mockup left, text right)
- Inverted layout
- Left: fake search input + orange "Hunt →" button + 3 subreddit results
- Right: badge "Feature 02 · Hunt", H3, description, checkmarks

### 8 — Feature: AI (Viral Score + Comment Starter)
- Background: `bg-[#070707]` (deepest dark, distinct from page bg)
- Badge, H2 in white (Instrument Serif)
- 2 side-by-side cards on `bg-[#111113] border-[#27272a]`:
  - **Viral Score**: BarChart2 icon, score widget "92/100" in orange, explanation text
  - **Comment Starter**: MessageSquare icon, fake terminal-style comment draft
- CTA: white outline button

### 9 — How It Works (`id="how-it-works"`)
- 3 steps in horizontal row with dashed connector line between them
- Step number "01/02/03" in Instrument Serif, orange
- Icons: Search, Flame, Send
- Stagger animation on the 3 steps

### 10 — Pricing (`id="pricing"`)
- Badge, H2 (Instrument Serif)
- 3 cards:
  - **Free**: `bg-[#111113]`, outline CTA
  - **Pro**: `border-[#FF4500] bg-[#0f0a08]`, "Most Popular" badge, filled orange CTA
  - **Done For You**: `bg-[#111113]`, outline CTA
- Guarantee line under Pro card: "✓ Annulation en 1 clic · ✓ Sans engagement"

### 11 — FAQ (`id="faq"`) *(FaqAccordion client component)*
- `<Accordion type="multiple">` from Shadcn, dark-themed
- 8 items from spec

### 12 — CTA Final
- Centered, `bg-[#0a0a0a]`
- H2 (Instrument Serif), subtitle (Geist)
- Two buttons: orange primary + outline
- Trust line + logo marquee repeat

### 13 — Footer
- 4-column grid → 2 col tablet → 1 col mobile
- `border-t border-[#1c1c1e]`
- Copyright: "© 2026 Reddhunter.io — Built in public 🚀"

---

## 6. Responsive Breakpoints

| Breakpoint | Change |
|------------|--------|
| `< md` | Navbar hamburger + Sheet |
| `< md` | Hero 2-col → 1-col (mockup below text) |
| `< md` | All 3-col grids → 1-col |
| `< md` | Feature sections stack vertically |
| `< md` | How It Works steps stack vertically |
| `< md` | Pricing cards stack vertically |
| `< md` | Footer 4-col → 1-col |

---

## 7. Key Implementation Notes

- **No external images** — all mockups are HTML/Tailwind divs
- **No `any` in TypeScript** — strict mode enforced
- **CTA links** use `href="#"` as placeholders (signup URL + Calendly TBD)
- **`useCountUp` hook**: takes `(target: number, duration: number)` + `ref` for IntersectionObserver trigger
- **Shadcn components needed**: `npx shadcn@latest add badge card accordion button separator sheet`
- **`cn()` utility**: install `clsx` + `tailwind-merge`, create `lib/utils.ts`
- **Framer Motion isolation**: `page.tsx` has zero framer-motion imports. All animation lives in `MotionSection` / `MotionGrid` client wrappers. This is the correct RSC pattern.
- **Mobile nav**: `NavbarMobile` is its own client component (needs `useState` for open/close) imported into the navbar section of `page.tsx`

---

## 8. Out of Scope

- Authentication / real signup flow
- Backend / API routes
- i18n (copy stays in French as spec'd)
- Analytics integration
- Actual Reddit API calls
