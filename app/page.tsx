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

    </main>
  )
}
