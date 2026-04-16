'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { Bookmark, ExternalLink, Zap, ChevronDown, ArrowUp, ArrowDown, Search } from 'lucide-react'
import Link from 'next/link'
import type { RedditPost, ScrapeResult } from '@/scraper/types'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const h = Math.floor(diff / 3_600_000)
  const d = Math.floor(h / 24)
  if (d > 0) return `il y a ${d}j`
  if (h > 0) return `il y a ${h}h`
  return 'à l\'instant'
}

function isNew(isoDate: string): boolean {
  return Date.now() - new Date(isoDate).getTime() < 6 * 3_600_000
}

const SUB_COLORS: Record<string, string> = {
  indiehackers:  '#FF4500',
  SaaS:          '#0dd3bb',
  startups:      '#ff585b',
  Entrepreneur:  '#46d160',
  buildinpublic: '#ff4081',
  growthhacking: '#ffb300',
  sidehustle:    '#00b0ff',
}
function subColor(sub: string) { return SUB_COLORS[sub] ?? '#52525b' }

// ─── Viral Score ──────────────────────────────────────────────────────────────

type ScoreState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'done'; score: number; reason: string }
  | { status: 'error' }

function ViralBtn({ state, onClick }: { state: ScoreState; onClick: () => void }) {
  if (state.status === 'done') {
    const color = state.score >= 80 ? '#FF4500' : state.score >= 60 ? '#FF8040' : '#52525b'
    return (
      <span
        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border cursor-default"
        style={{ color, borderColor: `${color}40`, backgroundColor: `${color}12` }}
        title={state.reason}
      >
        <Zap size={10} fill={color} /> {state.score}/100
      </span>
    )
  }
  if (state.status === 'loading') {
    return (
      <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] text-zinc-600">
        <Zap size={10} className="animate-pulse text-[#FF4500]" /> Analyse…
      </span>
    )
  }
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium text-zinc-600 hover:text-[#FF4500] hover:bg-[#FF4500]/10 border border-transparent hover:border-[#FF4500]/20 transition-all"
    >
      <Zap size={10} /> Viral Score
    </button>
  )
}

// ─── Post card ────────────────────────────────────────────────────────────────

function PostCard({ post, isFav, onToggleFav }: {
  post: RedditPost
  isFav: boolean
  onToggleFav: (post: RedditPost) => void
}) {
  const [votes, setVotes]   = useState(post.score)
  const [voted, setVoted]   = useState<'up' | 'down' | null>(null)
  const [score, setScore]   = useState<ScoreState>({ status: 'idle' })

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
        body: JSON.stringify({
          title: post.title, score: post.score,
          num_comments: post.num_comments, upvote_ratio: post.upvote_ratio,
          subreddit: post.subreddit, selftext: post.selftext,
        }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json() as { score: number; reason: string }
      setScore({ status: 'done', score: data.score, reason: data.reason })
    } catch {
      setScore({ status: 'error' })
    }
  }

  const scoreDisplay = votes >= 1000 ? `${(votes / 1000).toFixed(1)}k` : String(votes)
  const color = subColor(post.subreddit)

  return (
    <article className="flex gap-0 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.035] hover:border-white/[0.1] transition-all overflow-hidden group">

      {/* Vote col */}
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

      {/* Content */}
      <div className="flex-1 min-w-0 py-3.5 pr-4 pl-4">

        {/* Meta */}
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-600 mb-2 flex-wrap">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
          <span className="font-semibold text-zinc-400">r/{post.subreddit}</span>
          <span>·</span>
          <span>u/{post.author}</span>
          <span>·</span>
          <span>{timeAgo(post.created_at)}</span>
          {isNew(post.created_at) && (
            <span className="bg-[#FF4500]/15 text-[#FF4500] text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide">New</span>
          )}
          {post.flair && (
            <span className="px-1.5 py-0.5 rounded text-[10px] border border-white/[0.08] text-zinc-600 bg-white/[0.03]">{post.flair}</span>
          )}
          <span className="ml-auto text-[10px] text-zinc-700">💬 {post.num_comments.toLocaleString()}</span>
        </div>

        {/* Title */}
        <h3 className="text-[16px] font-medium text-zinc-100 leading-snug mb-2 group-hover:text-white transition-colors">
          {post.title}
        </h3>

        {/* Selftext */}
        {post.selftext && post.selftext.length > 20 && (
          <p className="text-[12px] text-zinc-600 leading-relaxed mb-3 line-clamp-2">
            {post.selftext}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 flex-wrap">
          <a href={post.permalink} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.05] transition-all">
            <ExternalLink size={10} /> Reddit
          </a>

          <button onClick={() => onToggleFav(post)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              isFav
                ? 'text-[#FFB300] bg-[#FFB300]/10 border border-[#FFB300]/20'
                : 'text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.05]'
            }`}>
            <Bookmark size={10} className={isFav ? 'fill-[#FFB300]' : ''} />
            {isFav ? 'Sauvegardé' : 'Sauvegarder'}
          </button>

          <ViralBtn state={score} onClick={handleViralScore} />

          <Link href={`/dashboard/post/${post.id}`}
            className="ml-auto flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-semibold text-[#FF4500] hover:bg-[#FF4500]/10 hover:text-[#FF6B35] transition-all border border-transparent hover:border-[#FF4500]/20">
            Inspecter →
          </Link>
        </div>
      </div>
    </article>
  )
}

// ─── Filter pill ──────────────────────────────────────────────────────────────

function FilterPill({ active, onClick, children }: {
  active: boolean; onClick: () => void; children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-medium transition-all border ${
        active
          ? 'bg-[#FF4500] text-white border-[#FF4500] shadow-[0_0_12px_rgba(255,69,0,0.3)]'
          : 'text-zinc-500 border-white/[0.08] hover:border-white/[0.15] hover:text-zinc-300 bg-white/[0.02]'
      }`}
    >
      {children}
    </button>
  )
}

// ─── Feed ─────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 20
type TimeFilter = 'all' | 'today' | '7d' | '30d'

function filterByTime(posts: RedditPost[], tf: TimeFilter): RedditPost[] {
  const now = Date.now()
  const cutoffs: Record<TimeFilter, number> = {
    all: 0, today: now - 86_400_000, '7d': now - 7 * 86_400_000, '30d': now - 30 * 86_400_000,
  }
  const cutoff = cutoffs[tf]
  return cutoff === 0 ? posts : posts.filter(p => new Date(p.created_at).getTime() > cutoff)
}

export function ExploreFeed({ data }: { data: ScrapeResult }) {
  const allSubs = data.subreddits

  const [timeFilt, setTimeFilt]     = useState<TimeFilter>('all')
  const [activeSubs, setActiveSubs] = useState<Set<string>>(new Set(['all']))
  const [favorites, setFavorites]   = useState<Set<string>>(new Set())
  const [page, setPage]             = useState(1)
  const [search, setSearch]         = useState('')

  useEffect(() => {
    fetch('/api/saved')
      .then(r => r.ok ? r.json() : [])
      .then((ids: string[]) => setFavorites(new Set(ids)))
      .catch(() => {})
  }, [])

  const toggleFav = useCallback(async (post: RedditPost) => {
    setFavorites(prev => {
      const next = new Set(prev)
      next.has(post.id) ? next.delete(post.id) : next.add(post.id)
      return next
    })
    await fetch('/api/saved', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    })
  }, [])

  function toggleSub(sub: string) {
    if (sub === 'all') { setActiveSubs(new Set(['all'])); setPage(1); return }
    setActiveSubs(prev => {
      const next = new Set(prev)
      next.delete('all')
      next.has(sub) ? next.delete(sub) : next.add(sub)
      if (next.size === 0) next.add('all')
      return next
    })
    setPage(1)
  }

  const filtered = useMemo(() => {
    let posts = filterByTime(data.posts, timeFilt)
    if (!activeSubs.has('all')) {
      posts = posts.filter(p => activeSubs.has(p.subreddit.toLowerCase()) || activeSubs.has(p.subreddit))
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.selftext?.toLowerCase().includes(q) ||
        p.subreddit.toLowerCase().includes(q)
      )
    }
    return posts
  }, [data.posts, timeFilt, activeSubs, search])

  const visible = filtered.slice(0, page * PAGE_SIZE)

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600">Dashboard</span>
          <span className="text-zinc-700">/</span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#FF4500]">Explore</span>
        </div>
        <h1 className="text-[32px] font-semibold text-white tracking-[-0.02em] leading-tight mb-2">
          Reddit Feed
        </h1>
        <p className="text-zinc-600 text-[13px] leading-relaxed">
          Posts viraux de ta niche — filtre, sauvegarde, inspecte.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
        <input
          type="text"
          placeholder="Rechercher dans les posts…"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-[13px] text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-[#FF4500]/40 focus:bg-white/[0.05] transition-all"
        />
      </div>

      {/* Time filters */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {([['all', 'Tous'], ['today', "Aujourd'hui"], ['7d', '7 jours'], ['30d', '30 jours']] as [TimeFilter, string][]).map(([val, label]) => (
          <FilterPill key={val} active={timeFilt === val} onClick={() => { setTimeFilt(val); setPage(1) }}>
            {label}
          </FilterPill>
        ))}
        <span className="ml-auto text-[11px] text-zinc-700">{filtered.length} posts</span>
      </div>

      {/* Subreddit filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        <FilterPill active={activeSubs.has('all')} onClick={() => toggleSub('all')}>Tous</FilterPill>
        {allSubs.map(sub => (
          <FilterPill key={sub} active={activeSubs.has(sub) || activeSubs.has(sub.toLowerCase())} onClick={() => toggleSub(sub)}>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: subColor(sub) }} />
              r/{sub}
            </span>
          </FilterPill>
        ))}
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-2.5">
        {visible.length === 0 ? (
          <div className="text-center py-16 text-zinc-700 text-sm">
            Aucun post pour cette sélection.
          </div>
        ) : (
          visible.map(post => (
            <PostCard
              key={post.id}
              post={post}
              isFav={favorites.has(post.id)}
              onToggleFav={() => toggleFav(post)}
            />
          ))
        )}

        {visible.length < filtered.length && (
          <button
            onClick={() => setPage(p => p + 1)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/[0.06] text-zinc-600 hover:text-zinc-400 hover:border-white/[0.1] text-[11px] font-medium transition-all mt-1"
          >
            <ChevronDown size={13} />
            Charger plus ({filtered.length - visible.length} restants)
          </button>
        )}
      </div>
    </div>
  )
}
