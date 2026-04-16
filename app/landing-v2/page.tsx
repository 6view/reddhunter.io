'use client'

import { useState } from 'react'

// ── Logo ─────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
        <rect width="32" height="32" rx="7" fill="#111113"/>
        <rect x="1.5"  y="23"   width="3.5" height="7.5"  rx="0.5" fill="#7A2800"/>
        <rect x="6"    y="19.5" width="3.5" height="11"   rx="0.5" fill="#A33500"/>
        <rect x="10.5" y="15.5" width="3.5" height="15"   rx="0.5" fill="#CC4400"/>
        <rect x="15"   y="11.5" width="3.5" height="19"   rx="0.5" fill="#E85000"/>
        <rect x="19.5" y="7.5"  width="3.5" height="23"   rx="0.5" fill="#FF5500"/>
        <rect x="24"   y="4"    width="4"   height="26.5" rx="0.5" fill="#FF7835"/>
        <path d="M2 25 Q8 19 16 13 Q22 9 28.5 3.5" stroke="#FF4500" strokeWidth="1.2" strokeDasharray="1.5,2" fill="none" strokeLinecap="round"/>
        <path d="M27 2.5 L30.5 4 L28 6.5" stroke="#FF4500" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 8 L12 18 L16.5 18 L13 27 L22 16 L17.5 16 Z" fill="white" stroke="#111113" strokeWidth="0.5"/>
      </svg>
      <span className="font-semibold text-white text-[15px] tracking-tight">Reddhunter</span>
    </div>
  )
}

// ── Smoke bg ──────────────────────────────────────────────────────────────────
function SmokeBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute rounded-full" style={{
        width: 750, height: 750, top: -200, left: -180,
        background: 'radial-gradient(circle, rgba(90,90,90,0.35) 0%, transparent 70%)',
        filter: 'blur(100px)',
      }} />
      <div className="absolute rounded-full" style={{
        width: 600, height: 600, top: 80, right: -120,
        background: 'radial-gradient(circle, rgba(60,60,60,0.3) 0%, transparent 70%)',
        filter: 'blur(90px)',
      }} />
      <div className="absolute rounded-full" style={{
        width: 500, height: 500, bottom: -80, left: '35%',
        background: 'radial-gradient(circle, rgba(50,50,50,0.25) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />
    </div>
  )
}

// ── Pill ──────────────────────────────────────────────────────────────────────
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-700 text-zinc-400 text-xs font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 flex-shrink-0" />
      {children}
    </span>
  )
}

// ── FAQ data ──────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "C'est quoi exactement Reddhunter ?",
    a: "Reddhunter est un SaaS qui scrape Reddit automatiquement pour te montrer les posts les plus viraux de ta niche, analyser les tendances par mots-clés, et générer des commentaires optimisés pour le référencement sur les LLMs.",
  },
  {
    q: "Comment fonctionne le Viral Score ?",
    a: "Le Viral Score est calculé par Claude Haiku (IA d'Anthropic). Il analyse le contenu du post, son engagement (upvotes + commentaires), et son potentiel de conversion. Un score 80+ signifie un fort potentiel viral.",
  },
  {
    q: "Ai-je besoin d'un compte Reddit ou d'une clé API ?",
    a: "Non. Reddhunter utilise l'API publique de Reddit — aucune clé API ou compte Reddit n'est nécessaire. Tu te connectes uniquement avec ton compte Reddhunter.",
  },
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui. L'abonnement est sans engagement, annulable en 1 clic depuis ton espace Stripe. Pas de frais cachés.",
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LandingV2() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="bg-black text-white min-h-screen" style={{ fontFamily: 'var(--font-geist, system-ui, sans-serif)' }}>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 h-[60px] border-b border-white/5 bg-black/70 backdrop-blur-md">
        <Logo />
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          {['Features', 'Process', 'Tarifs', 'FAQ'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <a href="/sign-up" className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-sm text-white hover:bg-zinc-800 transition-colors">
          <span className="text-[10px]">✦</span> Commencer gratuitement
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-16">
        <SmokeBg />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Pill>Intelligence Reddit pour Fondateurs</Pill>
          <h1 className="mt-8 text-[clamp(3rem,9vw,6rem)] font-light leading-[0.92] tracking-tight">
            Reddit Intelligence<br />that Converts
          </h1>
          <p className="mt-8 text-zinc-400 text-lg max-w-md mx-auto leading-relaxed">
            Trouve les posts viraux de ta niche, génère des Viral Scores IA, et rédige tes commentaires GEO-optimisés — pour $5/mois.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="/sign-up" className="px-7 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-100 transition-colors">
              Commencer gratuitement →
            </a>
            <a href="#features" className="px-7 py-3.5 rounded-full border border-white/20 text-white text-sm hover:bg-white/5 transition-colors">
              Voir les features
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600 text-sm animate-bounce select-none">↓</div>
      </section>

      {/* ── Feature cards ── */}
      <section id="features" className="px-6 pb-32 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: 'Explore',
              desc: 'Feed Reddit-style avec les posts les plus viraux',
              visual: (
                <div className="space-y-3 w-full">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex-shrink-0 flex items-center justify-center text-[#FF4500] text-xs font-bold">r/</div>
                      <div className="flex-1 space-y-1.5">
                        <div className="h-2 bg-zinc-700 rounded-full" style={{ width: `${75 - i * 8}%` }} />
                        <div className="h-1.5 bg-zinc-800 rounded-full" style={{ width: `${55 - i * 5}%` }} />
                        <div className="flex gap-2 mt-2">
                          <div className="h-1.5 bg-zinc-800 rounded-full w-8" />
                          <div className="h-1.5 bg-zinc-800 rounded-full w-6" />
                          <span className="ml-auto text-[#FF4500] text-[10px] font-bold">{88 - i * 6}/100</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              label: 'Hunt',
              desc: 'Recherche par mots-clés avec ranking des termes',
              visual: (
                <div className="space-y-3 w-full">
                  <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900 rounded-xl border border-zinc-700">
                    <span className="text-zinc-500 text-sm">🔍</span>
                    <div className="h-1.5 bg-zinc-700 rounded-full w-2/3" />
                  </div>
                  {['founder', 'saas', 'growth', 'reddit'].map((kw, i) => (
                    <div key={kw} className="flex items-center gap-3">
                      <span className="text-zinc-600 text-[10px] w-3">{i + 1}</span>
                      <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF4500] rounded-full transition-all" style={{ width: `${90 - i * 15}%` }} />
                      </div>
                      <span className="text-zinc-500 text-[10px] w-14">{kw}</span>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              label: 'Viral Score IA',
              desc: 'Score calculé par Claude Haiku pour chaque post',
              visual: (
                <div className="flex flex-col items-center justify-center gap-4 w-full">
                  <div className="relative w-24 h-24">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="38" stroke="#27272a" strokeWidth="10" fill="none" />
                      <circle cx="50" cy="50" r="38" stroke="#FF4500" strokeWidth="10" fill="none"
                        strokeDasharray="239" strokeDashoffset="48" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-semibold">87</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-white text-sm font-medium">Viral Score</p>
                    <p className="text-zinc-500 text-xs mt-0.5">Très fort potentiel</p>
                  </div>
                </div>
              ),
            },
          ].map(({ label, desc, visual }) => (
            <div key={label} className="bg-zinc-950 border border-zinc-800/50 rounded-2xl overflow-hidden group cursor-pointer">
              <div className="h-52 p-6 flex items-center justify-center border-b border-zinc-800/40">
                {visual}
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium text-sm">{label}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{desc}</p>
                </div>
                <span className="text-zinc-600 group-hover:text-white transition-colors text-lg">↗</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-10">
          <a href="/dashboard/explore" className="text-zinc-400 text-sm underline underline-offset-4 hover:text-white transition-colors">Voir le dashboard</a>
          <a href="/sign-up" className="px-7 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-100 transition-colors">Commencer gratuitement</a>
        </div>
      </section>

      {/* ── About card ── */}
      <section className="px-6 pb-32 max-w-6xl mx-auto">
        <div className="bg-zinc-950 border border-zinc-800/50 rounded-3xl p-10 md:p-14 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <Pill>Pourquoi Reddhunter</Pill>
            <h2 className="mt-6 text-5xl md:text-6xl font-light leading-[1.05] tracking-tight">
              Ton audience<br />est déjà sur<br />Reddit.
            </h2>
            <p className="mt-6 text-zinc-400 leading-relaxed text-sm">
              Les fondateurs qui dominent ChatGPT, Perplexity et Gemini ne le font pas par hasard. Ils identifient les bons posts, répondent avec précision, et créent des mentions organiques. Reddhunter automatise ça.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {['Explore', 'Hunt', 'Viral Score', 'Comment Starter', 'GEO', 'Favoris'].map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-full border border-zinc-700/80 text-zinc-400 text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 border-t border-zinc-800 pt-6 space-y-4">
              {[
                { a: 'Scraping automatique', b: '7 subreddits ciblés', c: 'Toutes les 6h' },
                { a: 'Analyse IA', b: 'Claude Haiku', c: 'À la demande' },
                { a: 'GEO Optimisé', b: 'ChatGPT, Perplexity', c: 'Stratégique' },
              ].map(row => (
                <div key={row.a} className="grid grid-cols-3 text-xs text-zinc-500 gap-2">
                  <span>{row.a}</span><span>{row.b}</span><span>{row.c}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Mockup illustration */}
          <div className="aspect-square rounded-2xl bg-zinc-900 overflow-hidden relative">
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse at 55% 35%, rgba(255,69,0,0.1) 0%, transparent 55%), radial-gradient(ellipse at 30% 70%, rgba(80,80,80,0.2) 0%, transparent 50%)',
            }} />
            <div className="absolute inset-5 flex flex-col gap-3">
              {[
                { title: 'How I grew my SaaS to $10k MRR using Reddit', score: 94, sub: 'r/SaaS' },
                { title: 'Best tools for founder-led growth in 2026', score: 81, sub: 'r/startups' },
                { title: 'Reddit is the most underrated B2B channel', score: 76, sub: 'r/marketing' },
              ].map(({ title, score, sub }, i) => (
                <div key={i} className="bg-black/60 rounded-xl p-4 border border-zinc-800/60 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#FF4500]/10 flex-shrink-0 flex items-center justify-center text-[#FF4500] text-[10px] font-bold">r/</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium leading-tight line-clamp-2">{title}</p>
                      <p className="text-zinc-600 text-[10px] mt-1">{sub}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[#FF4500] text-[10px] font-bold">{score}/100</span>
                        <span className="text-zinc-600 text-[10px]">Viral Score</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process" className="px-6 pb-32 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left sticky visual */}
          <div className="md:sticky md:top-24 aspect-[3/4] rounded-2xl bg-zinc-950 border border-zinc-800/50 overflow-hidden">
            <div className="w-full h-full relative">
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse at 40% 35%, rgba(70,70,70,0.4) 0%, transparent 60%), linear-gradient(180deg, #111 0%, #050505 100%)',
              }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 p-8">
                <div className="text-center">
                  <div className="text-6xl mb-3">⚡</div>
                  <p className="text-zinc-500 text-sm">De Reddit à tes mentions</p>
                  <p className="text-zinc-600 text-xs mt-1">Automatisé · IA · GEO</p>
                </div>
                <div className="w-full space-y-2">
                  {['Scraping', 'Viral Score IA', 'Comment GEO'].map((step, i) => (
                    <div key={step} className="flex items-center gap-3 bg-black/40 rounded-xl px-4 py-3 border border-zinc-800/40">
                      <span className="w-5 h-5 rounded-full bg-[#FF4500]/20 text-[#FF4500] text-[10px] flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                      <span className="text-zinc-300 text-xs">{step}</span>
                      <span className="ml-auto text-[#FF4500] text-[10px]">✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Right */}
          <div>
            <Pill>Notre Process</Pill>
            <h2 className="mt-6 text-[clamp(3rem,7vw,5rem)] font-light leading-[0.95] tracking-tight">
              Comment<br />ça marche
            </h2>
            <p className="mt-6 text-zinc-400 text-sm leading-relaxed">
              De la collecte des données Reddit à la publication de ton commentaire, tout est automatisé et optimisé pour le référencement sur les LLMs.
            </p>
            <div className="mt-6 flex gap-4 flex-wrap">
              <a href="/sign-up" className="px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-100 transition-colors">
                Commencer maintenant
              </a>
              <a href="#features" className="px-6 py-3 rounded-full border border-zinc-700 text-white text-sm hover:bg-white/5 transition-colors">
                Voir les features
              </a>
            </div>
            <div className="mt-10 space-y-4">
              {[
                { n: '1', icon: '🔍', title: 'Scraping automatique', desc: 'Reddhunter scrape les 7 subreddits ciblés toutes les 6h et extrait les 100 posts les plus engagés. Aucune clé API requise.' },
                { n: '2', icon: '🧠', title: 'Viral Score IA', desc: "Claude Haiku calcule un score de 0 à 100 basé sur l'engagement, le contenu et le potentiel de conversion. Pre-calculé sur les 50 meilleurs posts." },
                { n: '3', icon: '💬', title: 'Comment Starter GEO', desc: 'Génère un commentaire optimisé pour être cité par ChatGPT, Perplexity et Gemini. Copie et publie directement sur Reddit.' },
              ].map(({ n, icon, title, desc }) => (
                <div key={n} className="bg-zinc-950 border border-zinc-800/50 rounded-2xl p-6 relative">
                  <span className="absolute top-5 right-5 text-zinc-700 font-light">{n}</span>
                  <div className="text-2xl mb-4">{icon}</div>
                  <h3 className="text-white font-medium mb-2">{title}</h3>
                  <div className="w-full h-px bg-zinc-800 mb-4" />
                  <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services / Features ── */}
      <section className="px-6 pb-32 max-w-6xl mx-auto border-t border-zinc-800/50 pt-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <Pill>Nos Features</Pill>
            <h2 className="mt-6 text-[clamp(3.5rem,8vw,6rem)] font-light leading-[0.95] tracking-tight">Features</h2>
            <p className="mt-6 text-zinc-400 text-sm leading-relaxed max-w-sm">
              Tout ce dont tu as besoin pour transformer Reddit en machine à mentions organiques.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {['Explore', 'Hunt', 'Favoris', 'Viral Score', 'Comment Starter', 'GEO Optimisé', 'Subreddits custom', 'Filtres avancés'].map(t => (
                <span key={t} className="px-3 py-1.5 rounded-full border border-zinc-700/80 text-zinc-400 text-xs">{t}</span>
              ))}
            </div>
            <div className="mt-8">
              {[
                { f: 'Feed Explore', d: 'Scroll et découvre les posts viraux en temps réel' },
                { f: 'Hunt par mots-clés', d: 'Cherche dans 700+ posts analysés chaque semaine' },
                { f: 'Viral Score IA', d: 'Claude Haiku note chaque post de 0 à 100' },
                { f: 'Comment Starter', d: 'Génère des commentaires GEO-optimisés en 1 clic' },
              ].map(({ f, d }) => (
                <div key={f} className="flex items-center justify-between py-4 border-b border-zinc-800/50 group cursor-pointer">
                  <div>
                    <p className="text-white text-sm font-medium">{f}</p>
                    <p className="text-zinc-600 text-xs mt-0.5">{d}</p>
                  </div>
                  <span className="text-zinc-700 group-hover:text-white transition-colors">↗</span>
                </div>
              ))}
            </div>
          </div>
          {/* Mockup */}
          <div className="aspect-square rounded-2xl bg-zinc-950 border border-zinc-800/50 overflow-hidden relative">
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse at 50% 40%, rgba(255,69,0,0.07) 0%, transparent 65%), linear-gradient(135deg, #111 0%, #080808 100%)',
            }} />
            <div className="absolute inset-5 flex flex-col gap-2.5">
              {[
                { title: 'r/startups • Hot this week', body: 'How I got 500 signups from one Reddit comment', score: 94 },
                { title: 'r/SaaS • Rising', body: 'My tool went from 0 to $5k MRR — here\'s the playbook', score: 88 },
                { title: 'r/marketing • Top', body: 'Why Reddit is the best B2B channel nobody talks about', score: 79 },
              ].map(({ title, body, score }, i) => (
                <div key={i} className="bg-black/60 rounded-xl p-4 border border-zinc-800/60 backdrop-blur-sm flex-1">
                  <p className="text-zinc-600 text-[9px] mb-1.5">{title}</p>
                  <p className="text-zinc-300 text-xs font-medium leading-snug">{body}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF4500] rounded-full" style={{ width: `${score}%` }} />
                      </div>
                      <span className="text-[#FF4500] text-[9px] font-bold">{score}/100</span>
                    </div>
                    <button className="ml-auto text-[9px] px-2 py-0.5 rounded border border-zinc-700 text-zinc-500">
                      Générer commentaire
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="px-6 pb-32 max-w-6xl mx-auto border-t border-zinc-800/50 pt-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left image area */}
          <div className="aspect-[4/5] rounded-2xl bg-zinc-950 border border-zinc-800/50 overflow-hidden relative">
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(160deg, #1c1c1c 0%, #050505 70%)',
            }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-10">
                <div className="text-6xl mb-6">💬</div>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Des fondateurs qui utilisent<br />Reddhunter pour générer<br />des mentions organiques.
                </p>
              </div>
            </div>
          </div>
          {/* Right */}
          <div>
            <Pill>Témoignages</Pill>
            <h2 className="mt-6 text-[clamp(3rem,7vw,5.5rem)] font-light leading-[0.95] tracking-tight">
              Client<br />Reviews
            </h2>
            <p className="mt-6 text-zinc-400 text-sm leading-relaxed">
              Retours réels de fondateurs qui ont transformé leur présence Reddit avec Reddhunter.
            </p>
            <div className="mt-10 space-y-4">
              {[
                {
                  name: 'Thomas B.',
                  role: 'Fondateur SaaS B2B',
                  text: 'Reddhunter m\'a permis de trouver exactement les discussions où mon produit était la réponse. J\'ai doublé mes mentions sur ChatGPT en moins de 3 semaines.',
                  stars: 5,
                },
                {
                  name: 'Sarah M.',
                  role: 'Growth Marketer',
                  text: 'Le Hunt feature est incroyable. En 30 secondes je trouve tous les posts de ma niche et je génère un commentaire GEO-optimisé. Le ROI est immédiat.',
                  stars: 5,
                },
              ].map(({ name, role, text, stars }) => (
                <div key={name} className="bg-zinc-950 border border-zinc-800/50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 text-sm font-semibold flex-shrink-0">
                      {name[0]}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{name}</p>
                      <p className="text-zinc-500 text-xs">{role}</p>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">{text}</p>
                  <div className="mt-3 flex gap-0.5">
                    {Array.from({ length: stars }).map((_, i) => (
                      <span key={i} className="text-[#FF4500] text-xs">★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="px-6 pb-32 max-w-6xl mx-auto">
        <div className="bg-zinc-950 border border-zinc-800/50 rounded-2xl grid grid-cols-3 divide-x divide-zinc-800/50">
          {[
            { n: '700+', label: 'Posts analysés' },
            { n: '96%', label: 'Taux de satisfaction' },
            { n: '$5', label: 'Par mois seulement' },
          ].map(({ n, label }) => (
            <div key={label} className="py-14 text-center">
              <p className="text-[clamp(2.5rem,6vw,4rem)] font-light text-white">{n}</p>
              <p className="mt-3 text-zinc-500 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="px-6 pb-32 max-w-6xl mx-auto border-t border-zinc-800/50 pt-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <Pill>FAQ</Pill>
            <h2 className="mt-6 text-[clamp(3.5rem,8vw,6rem)] font-light leading-[0.95] tracking-tight">Réponses</h2>
            <p className="mt-6 text-zinc-400 text-sm leading-relaxed max-w-sm">
              Tout ce que tu dois savoir avant de commencer avec Reddhunter.
            </p>
            <div className="mt-10 aspect-square rounded-2xl bg-zinc-950 border border-zinc-800/50 overflow-hidden relative">
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, #111 0%, #080808 100%)',
              }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-4">🔥</div>
                  <p className="text-zinc-600 text-sm">Toujours des questions ?</p>
                  <a href="mailto:contact@reddhunter.io" className="mt-3 inline-block text-zinc-400 text-xs underline underline-offset-4 hover:text-white transition-colors">
                    Contacte-nous
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="bg-zinc-950 border border-zinc-800/50 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left text-sm text-white hover:bg-zinc-900/50 transition-colors"
                >
                  <span>{q}</span>
                  <span className="text-zinc-500 ml-4 flex-shrink-0 text-lg">{openFaq === i ? '×' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800/50 pt-4">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative px-6 py-48 overflow-hidden text-center">
        <SmokeBg />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Pill>Accès Gratuit</Pill>
          <h2 className="mt-8 text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[0.95] tracking-tight">
            Prêt à générer du revenu<br />depuis Reddit ?
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/sign-up" className="px-8 py-4 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-100 transition-colors">
              Commencer gratuitement →
            </a>
          </div>
          <div className="mt-10 flex items-center justify-center gap-6 text-zinc-600 text-sm">
            <span>Twitter</span>
            <span>·</span>
            <span>ProductHunt</span>
            <span>·</span>
            <span>GitHub</span>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-800/50 px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-600 text-xs">
        <span>contact@reddhunter.io</span>
        <Logo />
        <span>© 2026 Reddhunter — Tous droits réservés</span>
      </footer>

    </div>
  )
}
