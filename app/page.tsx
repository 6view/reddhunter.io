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

// ─── Logo ────────────────────────────────────────────────────────────────────

function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Reddhunter logo">
      {/* Background */}
      <rect width="32" height="32" rx="7" fill="#111113"/>
      {/* Bar chart — 6 bars, left→right, dark→bright orange */}
      <rect x="1.5"  y="23"  width="3.5" height="7.5"  rx="0.5" fill="#7A2800"/>
      <rect x="6"    y="19.5" width="3.5" height="11"   rx="0.5" fill="#A33500"/>
      <rect x="10.5" y="15.5" width="3.5" height="15"   rx="0.5" fill="#CC4400"/>
      <rect x="15"   y="11.5" width="3.5" height="19"   rx="0.5" fill="#E85000"/>
      <rect x="19.5" y="7.5"  width="3.5" height="23"   rx="0.5" fill="#FF5500"/>
      <rect x="24"   y="4"    width="4"   height="26.5" rx="0.5" fill="#FF7835"/>
      {/* Dotted upward trend line */}
      <path d="M2 25 Q8 19 16 13 Q22 9 28.5 3.5"
        stroke="#FF4500" strokeWidth="1.2" strokeDasharray="1.5,2"
        fill="none" strokeLinecap="round"/>
      {/* Arrow tip */}
      <path d="M27 2.5 L30.5 4 L28 6.5"
        stroke="#FF4500" strokeWidth="1.2" fill="none"
        strokeLinecap="round" strokeLinejoin="round"/>
      {/* Lightning bolt */}
      <path d="M18 8 L12 18 L16.5 18 L13 27 L22 16 L17.5 16 Z"
        fill="white" stroke="#111113" strokeWidth="0.5"/>
      {/* Head circle */}
      <circle cx="16.5" cy="4.5" r="2.8" fill="white"/>
    </svg>
  )
}

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
      <nav aria-label="Main navigation" className="sticky top-0 z-50 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-[#1c1c1e]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-bold text-white text-base">
            <Logo />
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
            <h1 className="font-serif text-5xl md:text-[64px] leading-[1.05] tracking-[-0.01em] text-white mb-5">
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

      {/* ── LLM LOGOS BAR ─────────────────────────────────────────────────── */}
      <section className="border-y border-[#1c1c1e] py-7 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-zinc-600 mb-6">
            Generate Revenue from LLMs
          </p>
          <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">

            {/* ChatGPT */}
            <div className="flex items-center gap-2.5 text-zinc-300">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-label="ChatGPT">
                <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
              </svg>
              <span className="text-sm font-semibold">ChatGPT</span>
            </div>

            <div className="w-px h-4 bg-[#27272a]" />

            {/* Perplexity */}
            <div className="flex items-center gap-2.5 text-zinc-300">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-label="Perplexity">
                <path d="M22.197 6.843h-7.67l6.077-5.266-1.118-1.29-6.374 5.525V0h-1.722v5.812L5.516.287 4.397 1.577l6.077 5.266H.803V8.56h4.7v6.507H.803v1.716h4.7v7.217h1.722v-7.217h9.55v7.217h1.722v-7.217h4.7v-1.716h-4.7V8.56h4.7V6.843zM7.225 8.56h9.55v6.507h-9.55V8.56z"/>
              </svg>
              <span className="text-sm font-semibold">Perplexity</span>
            </div>

            <div className="w-px h-4 bg-[#27272a]" />

            {/* Gemini */}
            <div className="flex items-center gap-2.5 text-zinc-300">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-label="Gemini">
                <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"/>
              </svg>
              <span className="text-sm font-semibold">Gemini</span>
            </div>


          </div>
        </div>
      </section>

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

      {/* ── SOCIAL PROOF CHART ────────────────────────────────────────────── */}
      <section className="border-t border-[#1c1c1e] py-24 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6">
          <MotionSection className="text-center mb-12">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-zinc-500 bg-[#111113] border border-[#27272a] px-3 py-1.5 rounded-full mb-4">
              Données vérifiées
            </span>
            <h2 className="font-serif text-4xl md:text-[42px] text-white leading-tight">
              L&apos;écart se creuse chaque mois.
            </h2>
          </MotionSection>

          <MotionSection>
            <div className="bg-[#111113] border border-[#27272a] rounded-2xl p-6 md:p-10">
              {/* Legend */}
              <div className="flex items-center gap-6 mb-6 justify-end">
                <div className="flex items-center gap-2">
                  <svg width="24" height="2"><line x1="0" y1="1" x2="24" y2="1" stroke="#52525b" strokeWidth="2" strokeDasharray="4,3" /></svg>
                  <span className="text-zinc-500 text-xs">Sans GEO</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="24" height="2"><line x1="0" y1="1" x2="24" y2="1" stroke="#FF4500" strokeWidth="2.5" /></svg>
                  <span className="text-white text-xs font-medium">Avec GEO Reddit</span>
                </div>
              </div>

              {/* Chart */}
              <svg viewBox="0 0 600 280" className="w-full" preserveAspectRatio="xMidYMid meet" aria-label="Graphique comparatif GEO vs sans GEO sur 6 mois">
                <defs>
                  <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF4500" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#FF4500" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Grid lines */}
                {[40, 90, 140, 190, 235].map((y) => (
                  <line key={y} x1="60" y1={y} x2="568" y2={y} stroke="#27272a" strokeWidth="1" strokeDasharray="4,4" />
                ))}

                {/* Fill area between curves */}
                <path
                  d="M 60,230 C 110,221 130,213 160,207 C 200,198 230,185 260,175 C 300,160 330,143 360,132 C 400,115 430,94 460,78 C 500,54 530,34 568,18 L 568,235 C 500,236 430,237 360,237 C 300,237 230,237 160,236 C 130,236 110,235 60,235 Z"
                  fill="url(#fillGradient)"
                />

                {/* Sans GEO line — flat, slight decline */}
                <path
                  d="M 60,230 C 160,232 260,234 360,236 C 460,237 520,237 568,237"
                  fill="none"
                  stroke="#52525b"
                  strokeWidth="2"
                  strokeDasharray="6,3"
                />

                {/* Avec GEO line — exponential */}
                <path
                  d="M 60,230 C 110,221 130,213 160,207 C 200,198 230,185 260,175 C 300,160 330,143 360,132 C 400,115 430,94 460,78 C 500,54 530,34 568,18"
                  fill="none"
                  stroke="#FF4500"
                  strokeWidth="2.5"
                />

                {/* Dots on avec GEO curve */}
                {([[60,230],[160,207],[260,175],[360,132],[460,78],[568,18]] as [number,number][]).map(([x,y]) => (
                  <circle key={`${x}`} cx={x} cy={y} r="4" fill="#FF4500" stroke="#111113" strokeWidth="1.5" />
                ))}

                {/* X axis labels */}
                {['Mois 1','Mois 2','Mois 3','Mois 4','Mois 5','Mois 6'].map((label, i) => (
                  <text key={label} x={60 + i * 101.6} y={268} textAnchor="middle" fill="#52525b" fontSize="10" fontFamily="var(--font-geist)">
                    {label}
                  </text>
                ))}

                {/* End labels */}
                <text x="574" y="22" fill="#FF4500" fontSize="10" fontWeight="bold" fontFamily="var(--font-geist)">+220%</text>
                <text x="574" y="241" fill="#52525b" fontSize="10" fontFamily="var(--font-geist)">−8%</text>

                {/* Y axis baseline label */}
                <text x="55" y="234" textAnchor="end" fill="#52525b" fontSize="9" fontFamily="var(--font-geist)">Base</text>
              </svg>

              {/* Bottom metric + quote */}
              <div className="mt-6 pt-6 border-t border-[#27272a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-4xl text-[#FF4500]">+220%</span>
                  <span className="text-zinc-400 text-sm max-w-xs">de visibilité dans les LLMs en 6 mois avec une stratégie GEO Reddit active¹²³</span>
                </div>
                <p className="font-serif text-base italic text-zinc-500 max-w-xs sm:text-right">
                  &quot;Vous n&apos;êtes qu&apos;à $5 de changer votre vie et votre business.&quot;
                </p>
              </div>
            </div>

            {/* Sources */}
            <div className="mt-3 flex flex-col gap-1">
              <p className="text-[10px] text-zinc-700">¹ SparkToro / Datos.io (2024) — Reddit figure parmi les 3 sources les plus citées par ChatGPT dans les réponses aux requêtes de recommandation de produits B2B.</p>
              <p className="text-[10px] text-zinc-700">² Semrush (2024) — Les contenus Reddit apparaissent dans plus de 60% des AI Overviews Google sur les requêtes de type SaaS et outils.</p>
              <p className="text-[10px] text-zinc-700">³ BrightEdge Research (2024) — Le trafic généré par les moteurs IA a progressé de +1 300% en 18 mois ; les marques avec présence Reddit convertissent 2,4× plus.</p>
            </div>
          </MotionSection>
        </div>
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
              <PostCard sub="r/indiehackers" subVariant="orange" title="How I built a $10k/mo SaaS by lurking Reddit for 30 days straight"      upvotes="2.1k" comments="203" timeAgo="2d ago" viralScore={96} />
              <PostCard sub="r/entrepreneur" subVariant="blue"   title="Stop cold emailing. Start commenting. Here's my exact Reddit playbook." upvotes="1.8k" comments="157" timeAgo="3d ago" viralScore={91} />
              <PostCard sub="r/SaaS"         subVariant="green"  title="I replaced my entire content strategy with 3 Reddit comments per day"   upvotes="1.4k" comments="98"  timeAgo="5d ago" viralScore={88} />
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
                  <input
                    readOnly
                    value="ai scheduling tool"
                    aria-hidden="true"
                    tabIndex={-1}
                    className="flex-1 bg-[#0a0a0a] border border-[#27272a] rounded-lg px-3 py-2 text-sm text-zinc-300 cursor-default"
                  />
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

      {/* ── 8. AI FEATURES ───────────────────────────────────────────────── */}
      <section className="bg-[#070707] border-t border-[#1c1c1e] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <MotionSection className="text-center mb-14">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-zinc-500 bg-[#111113] border border-[#27272a] px-3 py-1.5 rounded-full mb-4">
              Powered by Claude AI
            </span>
            <h2 className="font-serif text-4xl md:text-[42px] text-white leading-tight">
              L&apos;IA qui comprend ce qui performe.
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
                  Format &quot;I did X, here&apos;s what happened&quot; + personal story + actionable data.
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
                Un clic pour générer un commentaire GEO-optimisé. L&apos;IA analyse le contexte,
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
            { num: '01', icon: <Search size={20} className="text-[#FF4500]" />, title: 'Connecte ta niche',        body: 'Ajoute tes subreddits ou utilise nos 12 subreddits pré-configurés. Setup en 2 minutes.' },
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

            <MotionGridItem className="bg-[#111113] border border-[#27272a] rounded-xl p-6 flex flex-col">
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">Pro Annuel</p>
              <div className="mb-1"><span className="font-serif text-4xl text-white">$50</span><span className="text-zinc-500 text-sm ml-1">/an</span></div>
              <p className="text-zinc-500 text-xs mb-6">2 mois offerts — soit $4.17/mois</p>
              <ul className="space-y-2.5 text-sm text-zinc-400 mb-8 flex-1">
                {["Hunt illimité", "Explore complet", "Viral Score IA", "Comment Starter IA", "Subreddits personnalisés illimités", "Filtres avancés"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check size={14} className="text-zinc-600 shrink-0" />{f}</li>
                ))}
              </ul>
              <a href="#" className="block text-center py-2.5 text-sm font-semibold border border-[#3f3f46] text-zinc-300 rounded-lg hover:border-zinc-400 hover:text-white transition-colors">
                Démarrer pour $50/an →
              </a>
            </MotionGridItem>
          </MotionGrid>
        </div>
      </section>

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
                2 mois offert
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
                <Logo size={24} /> Reddhunter
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

    </main>
  )
}
