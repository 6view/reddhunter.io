import { CTALink, SignInLink } from '@/components/cta-link'
import { CheckoutButton } from '@/components/checkout-button'
import { Navbar } from '@/components/navbar'
import { HeroBackground } from '@/components/hero-background'
import { MotionSection } from '@/components/motion-section'
import { MotionGrid, MotionGridItem } from '@/components/motion-grid'
import { AnimatedCounters } from '@/components/animated-counters'
import { FaqAccordion } from '@/components/faq-accordion'
import { Logo } from '@/components/logo'
import {
  Zap, TrendingUp, Globe, BarChart2, MessageSquare,
  Search, Flame, Send, Check, Twitter, Mail,
  ArrowRight, Rss, Sparkles, Target, Clock,
  ArrowUpRight, ChevronRight,
} from 'lucide-react'


// ─── Badge pill ──────────────────────────────────────────────────────────────
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FF4500]/25 bg-[#FF4500]/[0.06] text-[#FF4500] text-[11px] font-semibold tracking-wide mb-7">
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse" />
      {children}
    </div>
  )
}

// ─── Command Palette Mockup ──────────────────────────────────────────────────
function CommandPalette() {
  const posts = [
    { sub: 'r/indiehackers', title: 'How I got my first 100 paying customers using Reddit (no paid ads)', upvotes: '1.2k', time: '4h ago', score: 92 },
    { sub: 'r/SaaS', title: "Launched my scheduling tool 3 weeks ago — here's what actually moved the needle", upvotes: '847', time: '8h ago', score: 87 },
    { sub: 'r/startups', title: 'Why most B2B founders ignore Reddit and leave money on the table', upvotes: '503', time: '12h ago', score: 74 },
  ]

  const subColors: Record<string, string> = {
    'r/indiehackers': '#FF4500',
    'r/SaaS': '#0dd3bb',
    'r/startups': '#a855f7',
  }

  return (
    <div className="w-full max-w-xl mx-auto animate-float">
      <div className="relative">
        {/* Glow behind window */}
        <div className="absolute -inset-4 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(255,69,0,0.08),transparent)] pointer-events-none" />

        <div className="relative bg-[#0e0e11]/95 backdrop-blur-xl rounded-2xl border border-white/[0.09] shadow-[0_48px_100px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)] overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-black/20">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex items-center gap-2 ml-2 bg-white/[0.04] rounded-lg px-3 py-1.5 border border-white/[0.05]">
              <Search size={12} className="text-white/25" />
              <span className="text-white/35 text-[11px]">Explore Reddit intelligence…</span>
              <span className="ml-auto text-[10px] text-white/20 bg-white/[0.05] px-1.5 py-0.5 rounded border border-white/[0.08] font-mono">⌘K</span>
            </div>
          </div>

          {/* Posts */}
          <div className="divide-y divide-white/[0.04]">
            {posts.map((post, i) => (
              <div key={i} className={`px-4 py-3.5 flex items-start gap-3 transition-colors duration-150 ${i === 0 ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}>
                <div className="mt-0.5 flex-shrink-0">
                  <span
                    className="text-[9px] font-bold px-2 py-0.5 rounded-full border"
                    style={{
                      color: subColors[post.sub],
                      borderColor: `${subColors[post.sub]}30`,
                      backgroundColor: `${subColors[post.sub]}12`,
                    }}
                  >
                    {post.sub}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/75 text-[12px] font-medium leading-snug mb-1.5 line-clamp-1">{post.title}</p>
                  <div className="flex items-center gap-2 text-[10px] text-white/20">
                    <span>▲ {post.upvotes}</span>
                    <span>·</span>
                    <span>{post.time}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div
                    className="text-[13px] font-bold tabular-nums"
                    style={{ color: post.score >= 80 ? '#FF4500' : post.score >= 60 ? '#FF8040' : '#71717a' }}
                  >
                    {post.score}
                  </div>
                  <div className="text-[9px] text-white/20 uppercase tracking-wide">viral</div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="px-4 py-2.5 border-t border-white/[0.05] bg-black/20 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] text-white/15 font-mono">
              <span><span className="bg-white/[0.06] px-1 py-0.5 rounded">↑↓</span> navigate</span>
              <span><span className="bg-white/[0.06] px-1 py-0.5 rounded">↵</span> open</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#46d160] animate-pulse" />
              Live feed
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Feature card ────────────────────────────────────────────────────────────
function FeatureCard({ icon, color, title, desc, num }: {
  icon: React.ReactNode; color: string; title: string; desc: string; num: string
}) {
  return (
    <div className="group relative bg-white/[0.02] hover:bg-white/[0.045] border border-white/[0.07] hover:border-white/[0.13] rounded-2xl p-6 transition-all duration-300 cursor-default overflow-hidden">
      {/* Spotlight glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 30% 30%, ${color}10, transparent 65%)` }} />

      <div className="flex items-start justify-between mb-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${color}18`, border: `1px solid ${color}25` }}>
          <span style={{ color }}>{icon}</span>
        </div>
        <span className="text-[11px] font-mono text-white/10 tabular-nums">{num}</span>
      </div>
      <h3 className="text-white text-[13px] font-semibold mb-2 tracking-tight">{title}</h3>
      <p className="text-white/35 text-[12px] leading-relaxed">{desc}</p>
    </div>
  )
}

// ─── Subreddit chips ─────────────────────────────────────────────────────────
const SUBREDDITS = ['r/indiehackers','r/SaaS','r/startups','r/entrepreneur','r/buildinpublic','r/growthhacking','r/sidehustle','r/digitalnomad','r/productivity','r/webdev']

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="min-h-screen bg-[#07080a]">

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ── 1. HERO ────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center text-center px-6 pt-36 pb-16 md:pt-48 md:pb-24 overflow-hidden">
        <HeroBackground />

        {/* Radial glow behind text */}
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,69,0,0.10),transparent_70%)]" />

        <MotionSection className="relative z-10 flex flex-col items-center">

          {/* Badge */}
          <Badge>Reddit intelligence for founders · From $5/mo</Badge>

          {/* Headline */}
          <h1 className="text-[clamp(2.6rem,7vw,5rem)] font-semibold tracking-[-0.035em] leading-[1.04] text-white mb-6 max-w-4xl mx-auto">
            Your shortcut to{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF4500] to-[#CC3700] bg-clip-text text-transparent">
                Reddit growth.
              </span>
              {/* Underline glow */}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF4500]/50 to-transparent" />
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-[16px] md:text-[18px] text-white/40 max-w-md mx-auto mb-10 leading-relaxed font-normal">
            Find viral posts, score their potential, generate GEO-optimized comments — all in one interface.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <CTALink
              shine
              className="relative overflow-hidden inline-flex items-center gap-2 px-7 py-3 text-[14px] font-semibold bg-[#FF4500] hover:bg-[#e63d00] text-white rounded-xl transition-all duration-200 hover:shadow-[0_0_32px_rgba(255,69,0,0.45)]"
            >
              Start for free
              <ArrowRight size={15} />
            </CTALink>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-7 py-3 text-[14px] font-medium text-white/40 hover:text-white/75 rounded-xl border border-white/[0.08] hover:border-white/[0.16] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200"
            >
              See how it works
            </a>
          </div>

          {/* Trust */}
          <div className="flex items-center justify-center gap-5 text-[11px] text-white/20">
            <span className="flex items-center gap-1.5"><Check size={10} className="text-[#46d160]" /> No credit card</span>
            <span className="w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1.5"><Check size={10} className="text-[#46d160]" /> Cancel anytime</span>
            <span className="w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1.5"><Check size={10} className="text-[#46d160]" /> 2-minute setup</span>
          </div>

        </MotionSection>

        {/* Product mockup */}
        <MotionSection className="relative z-10 w-full max-w-xl mx-auto px-4 mt-16">
          <CommandPalette />
        </MotionSection>
      </section>

      {/* ── 2. LOGOS BAR ───────────────────────────────────────────────────── */}
      <section className="py-12 px-4 flex flex-col items-center gap-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/15">
          Your Reddit comments get cited by
        </p>

        <div className="w-full max-w-2xl rounded-2xl border border-white/[0.06] bg-white/[0.015] overflow-hidden py-5 relative">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#07080a] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#07080a] to-transparent z-10" />

          <div className="flex animate-marquee-reverse whitespace-nowrap w-max gap-12 px-6">
            {[
              { name: 'ChatGPT', icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg> },
              { name: 'Claude', icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-1.235-.072L1 12.514l.057-.326.562-.57.692-.17 1.809.121 2.389.17 1.747.17h.146l-.195-.389-1.867-3.39-1.39-2.687-.733-1.56-.032-.472.276-.44.48-.196.648.066.42.284.838 1.43 1.36 2.39 1.504 2.687.243.45.042-.065-.018-.331-.309-2.095-.37-2.461-.162-1.52.162-.39.337-.31.657.049.645.34.293.42.226 1.748.258 1.665.307 1.924.097.742-.065.6-.178.456-.439.236-.634.123-.839-.146-1.019-.42-1.634-.68-2.866-1.01-3.25.13-.472.47-.351.494-.171.632.034.548.244 1.146 2.157 1.26 2.606.58 1.312.274.582.097.339.195-.227.727-.971 1.114-1.39 1.343-1.665 1.682-1.277 1.488-.889 1.01L17.83 5.4l.131-.017.285.082.374.3.08.487-.194.43-1.553 1.812-1.456 1.764-1.114 1.52-.678 1.022-.276.527.42-.017 1.374-.21 2.405-.307 1.763-.194.986.05.51.26.293.504-.016.487-.26.39-.873.098-2.014.178-2.746.243-1.325.105h-.163l.066.146.952 1.65.841 1.326.678 1.13.21.617-.12.529-.37.317-.53.033-.661-.236-1.2-1.877-.954-1.65-.516-.971-.13-.236-.033.05-.468 2.318-.354 1.78-.435 1.618-.27.52-.452.244-.58-.163-.42-.39-.065-.577.306-1.504.5-2.17.468-2.12.08-.439-.048-.033-.276.244-1.601 1.504-1.763 1.585-1.423 1.22-.873.59-.759.29-.63-.123-.384-.44v-.49l.332-.43.743-.374.938-.735 1.326-1.15 1.747-1.601 1.26-1.22.21-.227h-.05l-.353.13-2.55.825-2.761.889-1.293.34-.613-.05-.45-.34-.162-.5.13-.48.42-.38.953-.245z"/></svg> },
              { name: 'Gemini', icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"/></svg> },
              { name: 'Perplexity', icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22.197 6.843h-7.67l6.077-5.266-1.118-1.29-6.374 5.525V0h-1.722v5.812L5.516.287 4.397 1.577l6.077 5.266H.803V8.56h4.7v6.507H.803v1.716h4.7v7.217h1.722v-7.217h9.55v7.217h1.722v-7.217h4.7v-1.716h-4.7V8.56h4.7V6.843zM7.225 8.56h9.55v6.507h-9.55V8.56z"/></svg> },
              { name: 'Grok', icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
              { name: 'Mistral', icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M0 0h4v4H0zm6.667 0h4v4h-4zM0 6.667h4v4H0zm6.667 0h4v4h-4zm6.666 0h4v4h-4zm3.334-6.667h4v4h-4zM13.333 0h4v4h-4zM0 13.333h4v4H0zm6.667 0h4v4h-4zm6.666 0h4v4h-4zM0 20h4v4H0zm13.333 0h4v4h-4zm6.667 0h4v4h-4zm0-6.667h4v4h-4z"/></svg> },
            ].concat([
              { name: 'ChatGPT', icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg> },
              { name: 'Claude', icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-1.235-.072L1 12.514l.057-.326.562-.57.692-.17 1.809.121 2.389.17 1.747.17h.146l-.195-.389-1.867-3.39-1.39-2.687-.733-1.56-.032-.472.276-.44.48-.196.648.066.42.284.838 1.43 1.36 2.39 1.504 2.687.243.45.042-.065-.018-.331-.309-2.095-.37-2.461-.162-1.52.162-.39.337-.31.657.049.645.34.293.42.226 1.748.258 1.665.307 1.924.097.742-.065.6-.178.456-.439.236-.634.123-.839-.146-1.019-.42-1.634-.68-2.866-1.01-3.25.13-.472.47-.351.494-.171.632.034.548.244 1.146 2.157 1.26 2.606.58 1.312.274.582.097.339.195-.227.727-.971 1.114-1.39 1.343-1.665 1.682-1.277 1.488-.889 1.01L17.83 5.4l.131-.017.285.082.374.3.08.487-.194.43-1.553 1.812-1.456 1.764-1.114 1.52-.678 1.022-.276.527.42-.017 1.374-.21 2.405-.307 1.763-.194.986.05.51.26.293.504-.016.487-.26.39-.873.098-2.014.178-2.746.243-1.325.105h-.163l.066.146.952 1.65.841 1.326.678 1.13.21.617-.12.529-.37.317-.53.033-.661-.236-1.2-1.877-.954-1.65-.516-.971-.13-.236-.033.05-.468 2.318-.354 1.78-.435 1.618-.27.52-.452.244-.58-.163-.42-.39-.065-.577.306-1.504.5-2.17.468-2.12.08-.439-.048-.033-.276.244-1.601 1.504-1.763 1.585-1.423 1.22-.873.59-.759.29-.63-.123-.384-.44v-.49l.332-.43.743-.374.938-.735 1.326-1.15 1.747-1.601 1.26-1.22.21-.227h-.05l-.353.13-2.55.825-2.761.889-1.293.34-.613-.05-.45-.34-.162-.5.13-.48.42-.38.953-.245z"/></svg> },
              { name: 'Gemini', icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"/></svg> },
              { name: 'Perplexity', icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22.197 6.843h-7.67l6.077-5.266-1.118-1.29-6.374 5.525V0h-1.722v5.812L5.516.287 4.397 1.577l6.077 5.266H.803V8.56h4.7v6.507H.803v1.716h4.7v7.217h1.722v-7.217h9.55v7.217h1.722v-7.217h4.7v-1.716h-4.7V8.56h4.7V6.843zM7.225 8.56h9.55v6.507h-9.55V8.56z"/></svg> },
              { name: 'Grok', icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
              { name: 'Mistral', icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M0 0h4v4H0zm6.667 0h4v4h-4zM0 6.667h4v4H0zm6.667 0h4v4h-4zm6.666 0h4v4h-4zm3.334-6.667h4v4h-4zM13.333 0h4v4h-4zM0 13.333h4v4H0zm6.667 0h4v4h-4zm6.666 0h4v4h-4zM0 20h4v4H0zm13.333 0h4v4h-4zm6.667 0h4v4h-4zm0-6.667h4v4h-4z"/></svg> },
            ]).map(({ name, icon }, i) => (
              <div key={`${name}-${i}`} className="relative overflow-hidden inline-flex items-center gap-2.5 text-white/40 cursor-default select-none group hover:text-white/65 transition-colors duration-200">
                <span className="text-white/35 group-hover:text-white/55 transition-colors">{icon}</span>
                <span className="text-[12px] font-semibold tracking-tight">{name}</span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/8 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. STATS ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <MotionSection className="text-center mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/20 mb-3">The numbers</p>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold tracking-[-0.025em] text-white leading-tight">
              Why Reddit. Why now.
            </h2>
          </MotionSection>
          <MotionSection>
            <AnimatedCounters />
          </MotionSection>
        </div>
      </section>

      {/* ── 4. FEATURES GRID ───────────────────────────────────────────────── */}
      <section id="features" className="border-t border-white/[0.05] py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <MotionSection className="mb-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FF4500]/60 mb-4">Everything you need</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.03em] text-white leading-[1.08] max-w-xs">
                One tool.<br />Zero guesswork.
              </h2>
              <p className="text-white/35 text-[13px] max-w-xs leading-relaxed">
                Stop scrolling Reddit for hours. Every feature is built around one goal: converting Reddit traffic into customers.
              </p>
            </div>
          </MotionSection>

          <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { icon: <Rss size={15} />,         color: '#FF4500', num: '01', title: 'Viral Posts Feed',     desc: 'Auto-curated posts from your niche subreddits, refreshed every 24 hours. No noise, just signal.' },
              { icon: <Target size={15} />,       color: '#3b82f6', num: '02', title: 'Audience Hunter',      desc: 'Find exactly where your potential customers hang out. Type a keyword, get ranked communities.' },
              { icon: <BarChart2 size={15} />,    color: '#a855f7', num: '03', title: 'Viral Score AI',       desc: 'Every post scored 0–100 with a one-sentence AI explanation of why it performed.' },
              { icon: <MessageSquare size={15} />,color: '#10b981', num: '04', title: 'Comment Starter',      desc: 'Three AI-generated comments per post, tone-matched to your brand, GEO-optimized for LLMs.' },
              { icon: <Globe size={15} />,        color: '#ec4899', num: '05', title: 'GEO Optimization',     desc: 'Build a Reddit presence that gets cited by ChatGPT, Perplexity, and Gemini when users ask about your niche.' },
              { icon: <Clock size={15} />,        color: '#f59e0b', num: '06', title: 'Daily Intel',          desc: 'Fresh Reddit intelligence every 24 hours. Know what your audience is talking about before your competitors.' },
            ].map((f) => (
              <MotionGridItem key={f.title}>
                <FeatureCard {...f} />
              </MotionGridItem>
            ))}
          </MotionGrid>
        </div>
      </section>

      {/* ── 5. FEATURE DETAIL: HUNT ────────────────────────────────────────── */}
      <section id="how-it-works" className="border-t border-white/[0.05] py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <MotionSection>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FF4500]/60 mb-5">Step 1 · Hunt</p>
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.03em] text-white leading-[1.08] mb-5">
                Know exactly where your customers are.
              </h2>
              <p className="text-white/35 text-[13px] leading-relaxed mb-8 max-w-sm">
                Type any keyword. Reddhunter searches Reddit in real time and returns the most active subreddits with member counts and activity levels.
              </p>
              <ul className="space-y-3.5">
                {['Real-time Reddit search', 'Member count + activity score', 'Top recent posts per community', 'One-click follow + track'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[13px] text-white/50">
                    <div className="w-5 h-5 rounded-full bg-[#FF4500]/12 border border-[#FF4500]/20 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-[#FF4500]" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </MotionSection>

            <MotionSection>
              <div className="relative">
                <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(255,69,0,0.06),transparent_70%)] pointer-events-none" />
                <div className="relative bg-[#0e0e11]/90 border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05] bg-black/20">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                      <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                      <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="text-[11px] text-white/20 ml-2 font-medium">Hunt · Find your audience</span>
                  </div>
                  <div className="p-5">
                    <div className="flex gap-2 mb-5">
                      <div className="flex-1 bg-white/[0.03] border border-white/[0.07] rounded-xl px-3 py-2.5 flex items-center gap-2">
                        <Search size={12} className="text-white/20" />
                        <span className="text-[12px] text-white/40">ai scheduling tool</span>
                        <span className="ml-auto text-[10px] text-white/15 animate-pulse">|</span>
                      </div>
                      <div className="bg-[#FF4500] text-white text-[12px] font-bold px-4 py-2.5 rounded-xl flex items-center gap-1 whitespace-nowrap">
                        Hunt <ArrowRight size={11} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { sub: 'r/productivity', members: '2.3M', score: 94, hot: true },
                        { sub: 'r/sideprojects', members: '328k', score: 82, hot: false },
                        { sub: 'r/Entrepreneur', members: '1.8M', score: 78, hot: true },
                        { sub: 'r/indiehackers',  members: '420k', score: 71, hot: false },
                      ].map((r, i) => (
                        <div key={r.sub} className={`flex items-center justify-between px-3.5 py-3 rounded-xl border transition-all ${i === 0 ? 'bg-white/[0.05] border-white/[0.08]' : 'border-transparent hover:bg-white/[0.03]'}`}>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="text-white/85 text-[13px] font-semibold">{r.sub}</p>
                              {r.hot && <span className="text-[8px] font-bold text-[#FF4500] bg-[#FF4500]/10 px-1.5 py-0.5 rounded-full tracking-wider">HOT</span>}
                            </div>
                            <p className="text-white/20 text-[10px]">{r.members} members</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-[13px] font-bold" style={{ color: r.score >= 90 ? '#FF4500' : r.score >= 75 ? '#FF8040' : '#71717a' }}>{r.score}</p>
                              <p className="text-[9px] text-white/15">score</p>
                            </div>
                            <ChevronRight size={13} className="text-white/15" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* ── 6. FEATURE DETAIL: AI ──────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <MotionSection className="order-last lg:order-first">
              <div className="space-y-3">
                {/* Viral Score */}
                <div className="bg-[#0e0e11]/90 border border-white/[0.08] rounded-2xl p-5 shadow-[0_24px_48px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF4500] to-[#CC3700] flex items-center justify-center">
                        <BarChart2 size={13} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white text-[13px] font-semibold">Viral Score AI</p>
                        <p className="text-white/25 text-[10px]">r/indiehackers · 1.2k upvotes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[28px] font-bold text-[#FF4500] tracking-tight tabular-nums leading-none">92</span>
                      <p className="text-[9px] text-white/20 uppercase tracking-wider">/100</p>
                    </div>
                  </div>
                  <div className="w-full bg-white/[0.05] rounded-full h-1.5 mb-4 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#FF4500] to-[#FF6B35] h-1.5 rounded-full shadow-[0_0_8px_rgba(255,69,0,0.5)]" style={{ width: '92%' }} />
                  </div>
                  <p className="text-white/30 text-[11px] leading-relaxed border-l-2 border-[#FF4500]/30 pl-3">
                    "I did X" personal story + actionable data. Tue 9AM EST optimal timing. Exceptional upvote/comment ratio.
                  </p>
                </div>

                {/* Comment Starter */}
                <div className="bg-[#0e0e11]/90 border border-white/[0.08] rounded-2xl p-5 shadow-[0_24px_48px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                      <MessageSquare size={13} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white text-[13px] font-semibold">Comment Starter</p>
                      <p className="text-white/25 text-[10px]">3 drafts generated</p>
                    </div>
                    <span className="ml-auto text-[9px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full uppercase tracking-wider">GEO</span>
                  </div>
                  <div className="bg-black/30 rounded-xl p-3.5 border border-white/[0.04]">
                    <p className="text-[11px] text-white/20 font-mono mb-2">// founder tone · angle: Experience</p>
                    <p className="text-[12px] text-white/50 leading-relaxed">
                      Great breakdown. I&apos;ve been tracking this exact pattern with{' '}
                      <span className="text-[#FF4500]/70">a tool I built</span> — posts with personal data + specific numbers consistently outperform generic advice by 3-4x on this sub.
                    </p>
                  </div>
                </div>
              </div>
            </MotionSection>

            <MotionSection>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FF4500]/60 mb-5">Step 2 · Analyze</p>
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.03em] text-white leading-[1.08] mb-5">
                The AI that understands what makes Reddit tick.
              </h2>
              <p className="text-white/35 text-[13px] leading-relaxed mb-8 max-w-sm">
                Every post analyzed, every pattern decoded. Know not just what performed — but why, and how to replicate it for your product.
              </p>
              <CTALink
                shine
                className="inline-flex items-center gap-2 px-6 py-2.5 text-[13px] font-semibold bg-[#FF4500] hover:bg-[#e63d00] text-white rounded-xl transition-all hover:shadow-[0_0_24px_rgba(255,69,0,0.4)]"
              >
                Try it free <ArrowRight size={13} />
              </CTALink>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* ── 7. SOCIAL PROOF ────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <MotionSection className="text-center mb-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/20 mb-4">The opportunity</p>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.03em] text-white leading-[1.08]">
              The gap widens every month.
            </h2>
            <p className="text-white/30 text-[13px] mt-3">Brands with active Reddit presence get cited 2.4× more by AI assistants.</p>
          </MotionSection>

          <MotionSection>
            <div className="bg-[#0e0e11]/80 border border-white/[0.07] rounded-2xl p-7 md:p-10 shadow-[0_32px_64px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-5 mb-6 justify-end">
                <div className="flex items-center gap-2">
                  <svg width="18" height="2"><line x1="0" y1="1" x2="18" y2="1" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4,3" /></svg>
                  <span className="text-white/25 text-[11px]">Without GEO strategy</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="18" height="2"><line x1="0" y1="1" x2="18" y2="1" stroke="#FF4500" strokeWidth="2.5" /></svg>
                  <span className="text-white/60 text-[11px] font-medium">With Reddhunter</span>
                </div>
              </div>
              <svg viewBox="0 0 600 260" className="w-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="rh-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF4500" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[40,85,130,175,215].map((y) => (
                  <line key={y} x1="60" y1={y} x2="568" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                ))}
                <path d="M60,215 C110,207 130,199 160,193 C200,184 230,171 260,161 C300,146 330,129 360,118 C400,101 430,80 460,64 C500,40 530,20 568,4 L568,222 C500,222 430,222 360,222 C300,222 230,222 160,221 C130,221 110,220 60,220Z" fill="url(#rh-grad)" />
                <path d="M60,215 C160,217 260,219 360,221 C460,222 520,222 568,222" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="5,3" />
                <path d="M60,215 C110,207 130,199 160,193 C200,184 230,171 260,161 C300,146 330,129 360,118 C400,101 430,80 460,64 C500,40 530,20 568,4" fill="none" stroke="#FF4500" strokeWidth="2.5" />
                {([[60,215],[160,193],[260,161],[360,118],[460,64],[568,4]] as [number,number][]).map(([x,y]) => (
                  <circle key={x} cx={x} cy={y} r="4" fill="#FF4500" stroke="#0e0e11" strokeWidth="2.5" />
                ))}
                {['M1','M2','M3','M4','M5','M6'].map((l,i) => (
                  <text key={l} x={60+i*101.6} y={245} textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="9" fontFamily="var(--font-geist)">{l}</text>
                ))}
                <text x="574" y="8" fill="#FF4500" fontSize="10" fontWeight="700" fontFamily="var(--font-geist)">+220%</text>
                <text x="574" y="226" fill="rgba(255,255,255,0.15)" fontSize="9" fontFamily="var(--font-geist)">−8%</text>
              </svg>
              <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-semibold text-[42px] text-[#FF4500] tracking-tight leading-none">+220%</span>
                  <span className="text-white/30 text-[13px] max-w-xs leading-relaxed">LLM visibility in 6 months with an active Reddit GEO strategy</span>
                </div>
                <p className="text-[12px] italic text-white/20 max-w-xs sm:text-right leading-relaxed">
                  &quot;You&apos;re $5 away from changing your business.&quot;
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-[10px] text-white/12">¹ SparkToro / Datos.io (2024) — Reddit is among the top 3 sources cited by ChatGPT for B2B product recommendations.</p>
              <p className="text-[10px] text-white/12">² Semrush (2024) — Reddit content appears in 60%+ of Google AI Overviews for SaaS-related queries.</p>
              <p className="text-[10px] text-white/12">³ BrightEdge Research (2024) — AI-generated traffic grew +1,300% in 18 months; brands with Reddit presence convert 2.4× better.</p>
            </div>
          </MotionSection>
        </div>
      </section>

      {/* ── 8. SUBREDDITS MARQUEE ──────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05] py-8 overflow-hidden">
        <p className="text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-white/12 mb-4">
          Covering the communities that matter
        </p>
        <div className="overflow-hidden">
          <div className="flex gap-2.5 animate-marquee whitespace-nowrap w-max">
            {[...SUBREDDITS, ...SUBREDDITS].map((sub, i) => (
              <span key={i} className="bg-white/[0.025] border border-white/[0.05] text-white/25 text-[11px] font-medium px-3.5 py-1.5 rounded-full hover:text-white/40 hover:border-white/[0.09] transition-colors">
                {sub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. PRICING ─────────────────────────────────────────────────────── */}
      <section id="pricing" className="border-t border-white/[0.05] py-24 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <MotionSection className="text-center mb-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/20 mb-4">Simple pricing</p>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.03em] text-white leading-[1.08] mb-3">
              Profitable from day one.
            </h2>
            <p className="text-white/30 text-[13px]">One customer acquired via Reddit pays for years of Reddhunter.</p>
          </MotionSection>

          <MotionGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">

            {/* Pro Monthly */}
            <MotionGridItem className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6 flex flex-col hover:border-white/[0.12] transition-colors">
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-6">Pro</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[40px] font-semibold text-white tracking-tight leading-none">$5</span>
                <span className="text-white/25 text-[13px]">/mo</span>
              </div>
              <p className="text-white/20 text-[11px] mb-8">Less than a coffee per day.</p>
              <ul className="space-y-3 text-[12px] text-white/45 mb-8 flex-1">
                {["Unlimited Hunt", "Full Explore feed", "Viral Score (20/day)", "Comment Starter (5/day)", "Advanced filters"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check size={11} className="text-[#FF4500]/50 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <CheckoutButton
                priceId="price_1TJt9DASvSAsZiKVURsmnVg6"
                className="block w-full text-center py-2.5 text-[13px] font-semibold border border-white/[0.09] text-white/45 rounded-xl hover:border-white/[0.18] hover:text-white/75 transition-all"
              >
                Start for $5/mo →
              </CheckoutButton>
            </MotionGridItem>

            {/* Pro Annual */}
            <MotionGridItem className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6 flex flex-col hover:border-white/[0.12] transition-colors">
              <div className="flex items-center justify-between mb-6">
                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Pro Annual</p>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-white/35 border border-white/[0.06]">−17%</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[40px] font-semibold text-white tracking-tight leading-none">$50</span>
                <span className="text-white/25 text-[13px]">/yr</span>
              </div>
              <p className="text-white/20 text-[11px] mb-8">2 months free — $4.17/month.</p>
              <ul className="space-y-3 text-[12px] text-white/45 mb-8 flex-1">
                {["Everything in Pro", "2 months free", "Annual invoice"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check size={11} className="text-[#FF4500]/50 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <CheckoutButton
                priceId="price_1TJt9DASvSAsZiKVi9yVM5EO"
                className="block w-full text-center py-2.5 text-[13px] font-semibold border border-white/[0.09] text-white/45 rounded-xl hover:border-white/[0.18] hover:text-white/75 transition-all"
              >
                Save 2 months →
              </CheckoutButton>
            </MotionGridItem>

            {/* Pro AI — BEST VALUE */}
            <MotionGridItem className="relative bg-[#0f0906] border border-[#FF4500]/35 rounded-2xl p-6 flex flex-col shadow-[0_0_60px_rgba(255,69,0,0.10)] animate-glow-pulse">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="bg-gradient-to-r from-[#FF4500] to-[#CC3700] text-white text-[9px] font-bold px-3.5 py-1 rounded-full tracking-widest uppercase shadow-[0_4px_16px_rgba(255,69,0,0.4)]">
                  Most Popular
                </span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-[#FF4500]/60 text-[10px] font-bold uppercase tracking-widest">Pro AI</p>
                <Sparkles size={12} className="text-[#FF4500]/40" />
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[40px] font-semibold text-white tracking-tight leading-none">$15</span>
                <span className="text-white/25 text-[13px]">/mo</span>
              </div>
              <p className="text-white/25 text-[11px] mb-8">Full AI stack — $0.50/day.</p>
              <ul className="space-y-3 text-[12px] text-white/65 mb-8 flex-1">
                {["Everything in Pro", "IA Lab (smart recommendations)", "Viral Score illimité", "Comment Starter (50/day)", "Business profile AI", "Weekly AI digest"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check size={11} className="text-[#FF4500] flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <CheckoutButton
                priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_AI_MONTHLY ?? ''}
                className="block w-full text-center py-2.5 text-[13px] font-bold bg-[#FF4500] hover:bg-[#e63d00] text-white rounded-xl transition-all mb-3 hover:shadow-[0_0_24px_rgba(255,69,0,0.45)]"
              >
                Start Pro AI →
              </CheckoutButton>
              <p className="text-center text-[10px] text-white/18">Cancel anytime · No commitment</p>
            </MotionGridItem>

            {/* Pro AI Annual */}
            <MotionGridItem className="bg-[#0c0906] border border-[#FF4500]/18 rounded-2xl p-6 flex flex-col hover:border-[#FF4500]/30 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[#FF4500]/45 text-[10px] font-bold uppercase tracking-widest">Pro AI Annual</p>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#FF4500]/10 text-[#FF4500]/55 border border-[#FF4500]/15">−33%</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[40px] font-semibold text-white tracking-tight leading-none">$120</span>
                <span className="text-white/25 text-[13px]">/yr</span>
              </div>
              <p className="text-white/20 text-[11px] mb-8">$10/month — save $60/year.</p>
              <ul className="space-y-3 text-[12px] text-white/45 mb-8 flex-1">
                {["Everything in Pro AI", "2 months free", "Priority support"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check size={11} className="text-[#FF4500]/45 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <CheckoutButton
                priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_AI_ANNUAL ?? ''}
                className="block w-full text-center py-2.5 text-[13px] font-semibold border border-[#FF4500]/22 text-[#FF4500]/55 rounded-xl hover:border-[#FF4500]/45 hover:text-[#FF4500]/80 transition-all"
              >
                Save $60/year →
              </CheckoutButton>
            </MotionGridItem>

          </MotionGrid>
        </div>
      </section>

      {/* ── 10. FAQ ────────────────────────────────────────────────────────── */}
      <section id="faq" className="border-t border-white/[0.05] py-24 px-6 scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <MotionSection className="text-center mb-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/20 mb-4">FAQ</p>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.03em] text-white leading-[1.08]">
              Common questions.
            </h2>
          </MotionSection>
          <MotionSection><FaqAccordion /></MotionSection>
        </div>
      </section>

      {/* ── 11. FINAL CTA ──────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05] py-36 px-6 relative overflow-hidden">
        {/* Multi-layer radial glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,69,0,0.09),transparent_65%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(255,69,0,0.06),transparent_70%)]" />
        </div>

        <div className="max-w-2xl mx-auto text-center relative">
          <MotionSection>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FF4500]/20 bg-[#FF4500]/[0.04] text-white/30 text-[11px] font-medium mb-7">
              <Flame size={11} className="text-[#FF4500]" />
              Join founders building on Reddit
            </div>
            <h2 className="text-[clamp(2.2rem,5.5vw,4rem)] font-semibold tracking-[-0.035em] text-white leading-[1.04] mb-6">
              Your audience is on Reddit.<br className="hidden sm:block" />
              <span className="text-white/50">Go find them.</span>
            </h2>
            <p className="text-white/30 text-[15px] mb-12 leading-relaxed max-w-sm mx-auto">
              Start free, upgrade when you&apos;re ready. One Reddit comment can bring 50 signups.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <CTALink
                shine
                className="flex items-center gap-2 px-8 py-3.5 text-[15px] font-semibold bg-[#FF4500] hover:bg-[#e63d00] text-white rounded-xl transition-all hover:shadow-[0_0_40px_rgba(255,69,0,0.5)]"
              >
                Start for free <ArrowRight size={16} />
              </CTALink>
              <CTALink className="flex items-center gap-2 px-8 py-3.5 text-[15px] font-medium border border-white/[0.08] text-white/40 rounded-xl hover:border-white/[0.15] hover:text-white/65 bg-white/[0.02] transition-all">
                See plans <ChevronRight size={14} />
              </CTALink>
            </div>
            <p className="text-[11px] text-white/18">3 free analyses per day · No credit card required</p>
          </MotionSection>
        </div>
      </section>

      {/* ── 12. FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] py-14 px-6 bg-[#07080a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 font-semibold text-white text-[14px] mb-3">
                <Logo size={22} />
                <span className="tracking-tight">Reddhunter</span>
              </div>
              <p className="text-white/20 text-[12px] leading-relaxed">Reddit intelligence for founders and indie hackers.</p>
            </div>
            <div>
              <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.16em] mb-5">Product</p>
              <ul className="space-y-3 text-[12px] text-white/22">
                <li><a href="#features" className="hover:text-white/55 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white/55 transition-colors">Pricing</a></li>
                <li><a href="#faq" className="hover:text-white/55 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.16em] mb-5">Legal</p>
              <ul className="space-y-3 text-[12px] text-white/22">
                <li><a href="/privacy" className="hover:text-white/55 transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white/55 transition-colors">Terms of Service</a></li>
                <li><a href="mailto:reddhuntersoftware@gmail.com" className="hover:text-white/55 transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.16em] mb-5">Contact</p>
              <ul className="space-y-3 text-[12px] text-white/22">
                <li><a href="https://x.com/reddhunter_io" className="hover:text-white/55 transition-colors flex items-center gap-2"><Twitter size={11} /> Twitter / X</a></li>
                <li><a href="mailto:reddhuntersoftware@gmail.com" className="hover:text-white/55 transition-colors flex items-center gap-2"><Mail size={11} /> reddhuntersoftware@gmail.com</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/14 text-[11px]">© 2026 Reddhunter.io — Built in public</p>
            <p className="text-white/10 text-[11px]">Made for founders who build on Reddit</p>
          </div>
        </div>
      </footer>

    </main>
  )
}
