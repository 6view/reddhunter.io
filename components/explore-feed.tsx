'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { Bookmark, ExternalLink, Zap, ChevronDown, ArrowUp, ArrowDown } from 'lucide-react'
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
function subColor(sub: string) {
  return SUB_COLORS[sub] ?? '#818384'
}

// ─── Viral Score badge ────────────────────────────────────────────────────────

type ScoreState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'done'; score: number; reason: string }
  | { status: 'error' }

function ViralBtn({ state, onClick }: { state: ScoreState; onClick: () => void }) {
  if (state.status === 'done') {
    const color = state.score >= 80 ? '#FF4500' : state.score >= 60 ? '#FF8040' : '#818384'
    return (
      <span
        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border"
        style={{ color, borderColor: `${color}40`, backgroundColor: `${color}12` }}
        title={state.reason}
      >
        <Zap size={11} /> {state.score}/100
      </span>
    )
  }
  if (state.status === 'loading') {
    return (
      <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] text-zinc-500">
        <Zap size={11} className="animate-pulse text-[#FF4500]" /> Analyse…
      </span>
    )
  }
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-2.5 py-1 rounded text-[12px] font-medium text-[#878a8c] hover:bg-[#f6f7f8] hover:text-[#FF4500] transition-colors"
    >
      <Zap size={12} /> Viral Score
    </button>
  )
}

// ─── Post card ────────────────────────────────────────────────────────────────

function PostCard({
  post, isFav, onToggleFav,
}: {
  post: RedditPost
  isFav: boolean
  onToggleFav: (post: RedditPost) => void
}) {
  const [votes, setVotes]       = useState(post.score)
  const [voted, setVoted]       = useState<'up' | 'down' | null>(null)
  const [score, setScore]       = useState<ScoreState>({ status: 'idle' })

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

  return (
    <article className="flex gap-0 bg-white border border-[#e5e5e5] rounded-xl hover:border-[#d4d4d4] transition-all overflow-hidden group">

      {/* Vote col */}
      <div className="flex flex-col items-center gap-1 px-2.5 py-3 w-10 flex-shrink-0 bg-[#f6f7f8]">
        <button onClick={() => handleVote('up')}
          className={`p-0.5 rounded transition-colors ${voted === 'up' ? 'text-[#FF4500]' : 'text-[#878a8c] hover:text-[#FF4500]'}`}>
          <ArrowUp size={16} />
        </button>
        <span className={`text-[11px] font-bold ${voted === 'up' ? 'text-[#FF4500]' : voted === 'down' ? 'text-[#7193ff]' : 'text-[#1c1c1c]'}`}>
          {scoreDisplay}
        </span>
        <button onClick={() => handleVote('down')}
          className={`p-0.5 rounded transition-colors ${voted === 'down' ? 'text-[#7193ff]' : 'text-[#878a8c] hover:text-[#7193ff]'}`}>
          <ArrowDown size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 py-3 pr-4">

        {/* Meta row */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#878a8c] mb-2 flex-wrap">
          <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: subColor(post.subreddit) }} />
          <span className="font-semibold text-[#1c1c1c]">r/{post.subreddit}</span>
          <span>·</span>
          <span>u/{post.author}</span>
          <span>·</span>
          <span>{timeAgo(post.created_at)}</span>
          {isNew(post.created_at) && (
            <span className="bg-[#FF4500]/15 text-[#FF4500] text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide">New</span>
          )}
          {post.flair && (
            <span className="bg-[#e9f5fd] text-[#0079d3] px-1.5 py-0.5 rounded text-[10px] border border-[#c8e6f9]">{post.flair}</span>
          )}
          <span className="ml-auto text-[10px] text-[#878a8c]">💬 {post.num_comments.toLocaleString()}</span>
        </div>

        {/* Title */}
        <h3 className="text-[18px] font-medium text-[#1c1c1c] leading-snug mb-2">
          {post.title}
        </h3>

        {/* Selftext */}
        {post.selftext && post.selftext.length > 20 && (
          <p className="text-[13px] text-[#878a8c] leading-relaxed mb-3 line-clamp-2">
            {post.selftext}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <a href={post.permalink} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded text-[12px] font-medium text-[#878a8c] hover:bg-[#f6f7f8] hover:text-[#1c1c1c] transition-colors">
            <ExternalLink size={12} /> Voir sur Reddit
          </a>

          <button onClick={() => onToggleFav(post)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[12px] font-medium transition-colors ${
              isFav
                ? 'text-yellow-600 bg-yellow-50'
                : 'text-[#878a8c] hover:bg-[#f6f7f8] hover:text-[#1c1c1c]'
            }`}>
            <Bookmark size={12} className={isFav ? 'fill-yellow-500' : ''} />
            {isFav ? 'Sauvegardé' : 'Sauvegarder'}
          </button>

          <ViralBtn state={score} onClick={handleViralScore} />

          <a href={`/dashboard/post/${post.id}`}
            className="ml-auto flex items-center gap-1 px-3 py-1 rounded text-[12px] font-semibold text-[#FF4500] hover:bg-[#FF4500]/10 transition-colors">
            Inspecter →
          </a>
        </div>
      </div>
    </article>
  )
}

// ─── Filter pills ─────────────────────────────────────────────────────────────

function FilterPill({ active, onClick, children }: {
  active: boolean; onClick: () => void; children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-colors border ${
        active
          ? 'bg-[#FF4500] text-white border-[#FF4500]'
          : 'text-zinc-400 border-[#27272a] hover:border-zinc-500 hover:text-zinc-200 bg-transparent'
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
    all:  0,
    today: now - 86_400_000,
    '7d': now - 7 * 86_400_000,
    '30d': now - 30 * 86_400_000,
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

  // Load saved posts from DB on mount
  useEffect(() => {
    fetch('/api/saved')
      .then(r => r.ok ? r.json() : [])
      .then((ids: string[]) => setFavorites(new Set(ids)))
      .catch(() => {})
  }, [])

  const toggleFav = useCallback(async (post: RedditPost) => {
    // Optimistic update
    setFavorites(prev => {
      const next = new Set(prev)
      next.has(post.id) ? next.delete(post.id) : next.add(post.id)
      return next
    })
    // Persist to DB
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
    return posts
  }, [data.posts, timeFilt, activeSubs])

  const visible = filtered.slice(0, page * PAGE_SIZE)

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-[36px] text-white leading-tight mb-2">Explore</h1>
        <p className="text-zinc-500 text-[13px] leading-relaxed max-w-lg">
          Découvre les posts viraux de ta niche Reddit en temps réel.<br />
          Filtre par période et subreddit, sauvegarde ce qui t&apos;inspire.
        </p>
      </div>

      {/* Time filters */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {([['all','Tous'], ['today','Aujourd\'hui'], ['7d','7 jours'], ['30d','30 jours']] as [TimeFilter, string][]).map(([val, label]) => (
          <FilterPill key={val} active={timeFilt === val} onClick={() => { setTimeFilt(val); setPage(1) }}>
            {label}
          </FilterPill>
        ))}
        <span className="ml-auto text-[11px] text-zinc-600">{filtered.length} posts</span>
      </div>

      {/* Subreddit filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        <FilterPill active={activeSubs.has('all')} onClick={() => toggleSub('all')}>
          Tous
        </FilterPill>
        {allSubs.map(sub => (
          <FilterPill key={sub} active={activeSubs.has(sub) || activeSubs.has(sub.toLowerCase())} onClick={() => toggleSub(sub)}>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: subColor(sub) }} />
              r/{sub}
            </span>
          </FilterPill>
        ))}
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-3">
        {visible.length === 0 ? (
          <div className="text-center py-16 text-zinc-600 text-sm">
            Aucun post pour cette période.
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
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#1c1c1e] text-zinc-500 hover:text-zinc-300 hover:border-[#27272a] text-[12px] font-medium transition-colors"
          >
            <ChevronDown size={14} />
            Charger plus ({filtered.length - visible.length} restants)
          </button>
        )}
      </div>
    </div>
  )
}
