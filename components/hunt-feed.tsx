'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { Search, X, ArrowUp, ArrowDown, ExternalLink, Bookmark, Zap, ChevronDown, Plus, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import type { RedditPost, ScrapeResult } from '@/scraper/types'

const SUB_COLORS: Record<string, string> = {
  indiehackers: '#FF4500', SaaS: '#0dd3bb', startups: '#ff585b',
  Entrepreneur: '#46d160', buildinpublic: '#ff4081',
  growthhacking: '#ffb300', sidehustle: '#00b0ff',
}
function subColor(sub: string) { return SUB_COLORS[sub] ?? '#52525b' }

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const h = Math.floor(diff / 3_600_000)
  const d = Math.floor(h / 24)
  if (d > 0) return `il y a ${d}j`
  if (h > 0) return `il y a ${h}h`
  return 'à l\'instant'
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="bg-[#FF4500]/20 text-[#FF4500] rounded px-0.5 not-italic">{part}</mark>
      : part
  )
}

type ScoreState = { status: 'idle' } | { status: 'loading' } | { status: 'done'; score: number; reason: string; remaining: number | null; limit: number | null } | { status: 'rate_limit'; message: string } | { status: 'error' }

function ViralBtn({ state, onClick }: { state: ScoreState; onClick: () => void }) {
  if (state.status === 'done') {
    const color = state.score >= 80 ? '#FF4500' : state.score >= 60 ? '#FF8040' : '#52525b'
    return (
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border cursor-default"
          style={{ color, borderColor: `${color}40`, backgroundColor: `${color}12` }} title={state.reason}>
          <Zap size={10} fill={color} /> {state.score}/100
        </span>
        {state.remaining !== null && state.limit !== null && (
          <span className="text-[10px] text-zinc-700">{state.remaining}/{state.limit} restants</span>
        )}
      </div>
    )
  }
  if (state.status === 'loading') return (
    <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] text-zinc-600">
      <Zap size={10} className="animate-pulse text-[#FF4500]" /> Analyse…
    </span>
  )
  if (state.status === 'rate_limit') return (
    <Link href="/#pricing"
      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium text-[#FF4500] bg-[#FF4500]/10 border border-[#FF4500]/20 hover:bg-[#FF4500]/20 transition-all"
      title={state.message}>
      <TrendingUp size={10} /> Limite — Upgrade
    </Link>
  )
  return (
    <button onClick={onClick}
      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium text-zinc-600 hover:text-[#FF4500] hover:bg-[#FF4500]/10 border border-transparent hover:border-[#FF4500]/20 transition-all">
      <Zap size={10} /> Viral Score
    </button>
  )
}

function PostCard({ post, query, isFav, onToggleFav }: {
  post: RedditPost; query: string; isFav: boolean; onToggleFav: (post: RedditPost) => void
}) {
  const [votes, setVotes] = useState(post.score)
  const [voted, setVoted] = useState<'up' | 'down' | null>(null)
  const [score, setScore] = useState<ScoreState>({ status: 'idle' })

  function handleVote(dir: 'up' | 'down') {
    if (voted === dir) { setVotes(post.score); setVoted(null) }
    else { setVotes(post.score + (dir === 'up' ? 1 : -1)); setVoted(dir) }
  }

  async function handleViralScore() {
    setScore({ status: 'loading' })
    try {
      const res = await fetch('/api/viral-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: post.title, score: post.score, num_comments: post.num_comments, upvote_ratio: post.upvote_ratio, subreddit: post.subreddit, selftext: post.selftext }),
      })
      const data = await res.json()
      if (res.status === 429) { setScore({ status: 'rate_limit', message: data.message }); return }
      if (!res.ok) throw new Error()
      setScore({ status: 'done', score: data.score, reason: data.reason, remaining: data.remaining ?? null, limit: data.limit ?? null })
    } catch { setScore({ status: 'error' }) }
  }

  const scoreDisplay = votes >= 1000 ? `${(votes / 1000).toFixed(1)}k` : String(votes)
  const color = subColor(post.subreddit)

  return (
    <article className="flex rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all overflow-hidden group">
      <div className="flex flex-col items-center gap-1 px-2.5 py-4 w-11 flex-shrink-0 bg-white/[0.02] border-r border-white/[0.05]">
        <button onClick={() => handleVote('up')}
          className={`p-0.5 rounded transition-colors ${voted === 'up' ? 'text-[#FF4500]' : 'text-zinc-700 hover:text-[#FF4500]'}`}>
          <ArrowUp size={15} />
        </button>
        <span className={`text-[11px] font-bold ${voted === 'up' ? 'text-[#FF4500]' : voted === 'down' ? 'text-[#7193ff]' : 'text-zinc-400'}`}>
          {scoreDisplay}
        </span>
        <button onClick={() => handleVote('down')}
          className={`p-0.5 rounded transition-colors ${voted === 'down' ? 'text-[#7193ff]' : 'text-zinc-700 hover:text-[#7193ff]'}`}>
          <ArrowDown size={15} />
        </button>
      </div>

      <div className="flex-1 min-w-0 py-3.5 pr-4 pl-4">
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-600 mb-2 flex-wrap">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
          <span className="font-semibold text-zinc-400">r/{post.subreddit}</span>
          <span>·</span><span>u/{post.author}</span>
          <span>·</span><span>{timeAgo(post.created_at)}</span>
          {post.flair && <span className="px-1.5 py-0.5 rounded text-[10px] border border-white/[0.08] text-zinc-600 bg-white/[0.03]">{post.flair}</span>}
          <span className="ml-auto text-[10px] text-zinc-700">💬 {post.num_comments.toLocaleString()}</span>
        </div>

        <h3 className="text-[15px] font-medium text-zinc-200 leading-snug mb-2 group-hover:text-white transition-colors">
          {highlight(post.title, query)}
        </h3>

        {post.selftext && post.selftext.length > 20 && (
          <p className="text-[12px] text-zinc-600 leading-relaxed mb-3 line-clamp-2">
            {highlight(post.selftext, query)}
          </p>
        )}

        <div className="flex items-center gap-1 flex-wrap">
          <a href={post.permalink} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.05] transition-all">
            <ExternalLink size={10} /> Reddit
          </a>
          <button onClick={() => onToggleFav(post)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              isFav ? 'text-[#FFB300] bg-[#FFB300]/10 border border-[#FFB300]/20' : 'text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.05]'
            }`}>
            <Bookmark size={10} className={isFav ? 'fill-[#FFB300]' : ''} />
            {isFav ? 'Sauvegardé' : 'Sauvegarder'}
          </button>
          <ViralBtn state={score} onClick={handleViralScore} />
          <Link href={`/dashboard/post/${post.id}`}
            className="ml-auto flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-semibold text-[#FF4500] hover:bg-[#FF4500]/10 border border-transparent hover:border-[#FF4500]/20 transition-all">
            Inspecter →
          </Link>
        </div>
      </div>
    </article>
  )
}

const STOP_WORDS = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','is','it','its','this','that','these','those','was','are','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','can','not','no','so','if','as','up','out','about','into','than','then','when','where','who','what','how','my','your','our','their','his','her','we','they','you','i','me','us','him','them','all','just','more','also','after','before','new','like','get','use','make','need','want','know','think','see','one','two','three','any','some','most','only','over','even','much','same','good','great','best','really','very','here','there'])

function computeTopKeywords(posts: RedditPost[], topN = 20): { word: string; count: number }[] {
  const freq: Record<string, number> = {}
  for (const post of posts) {
    const text = (post.title + ' ' + (post.selftext ?? '')).toLowerCase()
    const words = text.match(/\b[a-z][a-z'-]{2,}\b/g) ?? []
    for (const w of words) {
      if (!STOP_WORDS.has(w)) freq[w] = (freq[w] ?? 0) + 1
    }
  }
  return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, topN).map(([word, count]) => ({ word, count }))
}

const SUGGESTIONS = ['AI tool','SaaS pricing','landing page','churn rate','cold email','product hunt','B2B sales','SEO strategy','no-code','indie hacker','side project','MRR growth']

const PAGE_SIZE = 20

export function HuntFeed({ data }: { data: ScrapeResult }) {
  const [query, setQuery]               = useState('')
  const [submitted, setSubmitted]       = useState('')
  const [favorites, setFavorites]       = useState<Set<string>>(new Set())
  const [page, setPage]                 = useState(1)
  const [followedSubs, setFollowedSubs] = useState<string[]>([])
  const [newSub, setNewSub]             = useState('')

  const topKeywords = useMemo(() => computeTopKeywords(data.posts), [data.posts])

  useEffect(() => {
    fetch('/api/saved').then(r => r.ok ? r.json() : []).then((ids: string[]) => setFavorites(new Set(ids))).catch(() => {})
    fetch('/api/subreddits').then(r => r.ok ? r.json() : []).then((subs: string[]) => setFollowedSubs(subs)).catch(() => {})
  }, [])

  async function addSub() {
    const name = newSub.trim().replace(/^r\//, '')
    if (!name) return
    await fetch('/api/subreddits', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) })
    setFollowedSubs(prev => prev.includes(name) ? prev : [name, ...prev])
    setNewSub('')
  }

  async function removeSub(name: string) {
    await fetch('/api/subreddits', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) })
    setFollowedSubs(prev => prev.filter(s => s !== name))
  }

  const toggleFav = useCallback(async (post: RedditPost) => {
    setFavorites(prev => { const next = new Set(prev); next.has(post.id) ? next.delete(post.id) : next.add(post.id); return next })
    await fetch('/api/saved', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(post) })
  }, [])

  const results = useMemo(() => {
    if (!submitted.trim()) return []
    const q = submitted.toLowerCase()
    return data.posts.filter(p => p.title.toLowerCase().includes(q) || (p.selftext && p.selftext.toLowerCase().includes(q)))
  }, [data.posts, submitted])

  const visible = results.slice(0, page * PAGE_SIZE)

  function handleSearch(e: React.FormEvent) { e.preventDefault(); if (!query.trim()) return; setSubmitted(query.trim()); setPage(1) }
  function handleSuggestion(s: string) { setQuery(s); setSubmitted(s); setPage(1) }
  function handleClear() { setQuery(''); setSubmitted(''); setPage(1) }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600">Dashboard</span>
          <span className="text-zinc-700">/</span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#FF4500]">Hunt</span>
        </div>
        <h1 className="text-[32px] font-semibold text-white tracking-[-0.02em] leading-tight mb-2">Hunt</h1>
        <p className="text-zinc-600 text-[13px] leading-relaxed">
          Cherche un mot-clé dans tous les posts — trouve ce dont ton audience parle vraiment.
        </p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
            <input
              type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Ex: pricing strategy, cold email, AI tool..."
              className="w-full bg-white/[0.03] border border-white/[0.08] text-white placeholder-zinc-700 rounded-xl pl-9 pr-10 py-3 text-[13px] focus:outline-none focus:border-[#FF4500]/40 focus:bg-white/[0.05] transition-all"
            />
            {query && (
              <button type="button" onClick={handleClear}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors">
                <X size={13} />
              </button>
            )}
          </div>
          <button type="submit"
            className="relative overflow-hidden px-5 py-3 bg-[#FF4500] hover:bg-[#CC3700] text-white text-[13px] font-semibold rounded-xl transition-colors flex-shrink-0 group">
            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            Hunt →
          </button>
        </div>
      </form>

      {/* Default state */}
      {!submitted && (
        <div className="flex flex-col gap-7">

          {/* Subreddits suivis */}
          <div>
            <p className="text-[10px] text-zinc-700 uppercase tracking-widest font-semibold mb-3">Subreddits suivis</p>
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSub}
                  onChange={e => setNewSub(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addSub()}
                  placeholder="r/indiehackers, SaaS…"
                  className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-[#FF4500]/40 transition-all"
                />
                <button
                  onClick={addSub}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#FF4500]/15 hover:bg-[#FF4500]/25 text-[#FF4500] text-[12px] font-semibold transition-all border border-[#FF4500]/20"
                >
                  <Plus size={12} /> Suivre
                </button>
              </div>
              {followedSubs.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {followedSubs.map(sub => (
                    <span key={sub} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border border-white/[0.10] bg-white/[0.03] text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: SUB_COLORS[sub] ?? '#52525b' }} />
                      r/{sub}
                      <button onClick={() => removeSub(sub)} className="text-zinc-700 hover:text-zinc-400 ml-0.5 transition-colors">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-zinc-700">Aucun subreddit suivi pour l&apos;instant.</p>
              )}
            </div>
          </div>

          <div>
            <p className="text-[10px] text-zinc-700 uppercase tracking-widest font-semibold mb-3">Suggestions</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => handleSuggestion(s)}
                  className="px-3 py-1.5 rounded-full text-[11px] font-medium text-zinc-500 border border-white/[0.08] hover:border-[#FF4500]/30 hover:text-[#FF4500] transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] text-zinc-700 uppercase tracking-widest font-semibold mb-3">
              Trending keywords — {data.total_posts} posts analysés
            </p>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              {topKeywords.map(({ word, count }, i) => {
                const max = topKeywords[0].count
                const pct = Math.round((count / max) * 100)
                return (
                  <button key={word} onClick={() => handleSuggestion(word)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.03] transition-colors border-b border-white/[0.04] last:border-0 group text-left">
                    <span className="text-[10px] font-mono text-zinc-700 w-5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <div className="flex-1 flex items-center gap-3 min-w-0">
                      <span className="text-[12px] font-medium text-zinc-400 group-hover:text-white transition-colors w-28 flex-shrink-0 truncate">{word}</span>
                      <div className="flex-1 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: pct > 66 ? '#FF4500' : pct > 33 ? '#FF8040' : '#3f3f46' }} />
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-700 flex-shrink-0 w-10 text-right">{count}×</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {submitted && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[12px] text-zinc-500">
              <span className="text-white font-semibold">{results.length}</span> résultat{results.length !== 1 ? 's' : ''} pour{' '}
              <span className="text-[#FF4500] font-medium">&ldquo;{submitted}&rdquo;</span>
            </p>
            <button onClick={handleClear} className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors">Effacer</button>
          </div>

          {results.length === 0 && (
            <div className="text-center py-16 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <Search size={24} className="text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-500 text-[13px] mb-1">Aucun résultat pour &ldquo;{submitted}&rdquo;</p>
              <p className="text-zinc-700 text-[11px]">Essaie un autre mot-clé ou relance le scraper.</p>
            </div>
          )}

          <div className="flex flex-col gap-2.5">
            {visible.map(post => (
              <PostCard key={post.id} post={post} query={submitted} isFav={favorites.has(post.id)} onToggleFav={toggleFav} />
            ))}
            {visible.length < results.length && (
              <button onClick={() => setPage(p => p + 1)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/[0.06] text-zinc-600 hover:text-zinc-400 hover:border-white/[0.1] text-[11px] font-medium transition-all">
                <ChevronDown size={13} />
                Charger plus ({results.length - visible.length} restants)
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
