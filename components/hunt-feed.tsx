'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { Search, X, ArrowUp, ArrowDown, ExternalLink, Bookmark, Zap, ChevronDown } from 'lucide-react'
import type { RedditPost, ScrapeResult } from '@/scraper/types'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SUB_COLORS: Record<string, string> = {
  indiehackers:  '#FF4500',
  SaaS:          '#0dd3bb',
  startups:      '#ff585b',
  Entrepreneur:  '#46d160',
  buildinpublic: '#ff4081',
  growthhacking: '#ffb300',
  sidehustle:    '#00b0ff',
}
function subColor(sub: string) { return SUB_COLORS[sub] ?? '#818384' }

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

// ─── Viral Score ──────────────────────────────────────────────────────────────

type ScoreState = { status: 'idle' } | { status: 'loading' } | { status: 'done'; score: number; reason: string } | { status: 'error' }

function ViralBtn({ state, onClick }: { state: ScoreState; onClick: () => void }) {
  if (state.status === 'done') {
    const color = state.score >= 80 ? '#FF4500' : state.score >= 60 ? '#FF8040' : '#818384'
    return (
      <span className="flex items-center gap-1 px-2.5 py-1 rounded text-[12px] font-bold cursor-default"
        style={{ color, backgroundColor: `${color}12` }} title={state.reason}>
        <Zap size={12} /> {state.score}/100
      </span>
    )
  }
  if (state.status === 'loading') {
    return <span className="flex items-center gap-1 px-2.5 py-1 text-[12px] text-zinc-500">
      <Zap size={12} className="animate-pulse text-[#FF4500]" /> Analyse…
    </span>
  }
  return (
    <button onClick={onClick}
      className="flex items-center gap-1 px-2.5 py-1 rounded text-[12px] font-medium text-[#878a8c] hover:bg-[#f6f7f8] hover:text-[#FF4500] transition-colors">
      <Zap size={12} /> Viral Score
    </button>
  )
}

// ─── Post card ────────────────────────────────────────────────────────────────

function PostCard({ post, query, isFav, onToggleFav }: {
  post: RedditPost
  query: string
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
        body: JSON.stringify({ title: post.title, score: post.score, num_comments: post.num_comments, upvote_ratio: post.upvote_ratio, subreddit: post.subreddit, selftext: post.selftext }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json() as { score: number; reason: string }
      setScore({ status: 'done', score: data.score, reason: data.reason })
    } catch { setScore({ status: 'error' }) }
  }

  const scoreDisplay = votes >= 1000 ? `${(votes / 1000).toFixed(1)}k` : String(votes)

  return (
    <article className="flex bg-white border border-[#e5e5e5] rounded-xl hover:border-[#d4d4d4] transition-all overflow-hidden group">
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
        {/* Meta */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#878a8c] mb-2 flex-wrap">
          <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: subColor(post.subreddit) }} />
          <span className="font-semibold text-[#1c1c1c]">r/{post.subreddit}</span>
          <span>·</span>
          <span>u/{post.author}</span>
          <span>·</span>
          <span>{timeAgo(post.created_at)}</span>
          {post.flair && (
            <span className="bg-[#e9f5fd] text-[#0079d3] px-1.5 py-0.5 rounded text-[10px] border border-[#c8e6f9]">{post.flair}</span>
          )}
          <span className="ml-auto text-[10px]">💬 {post.num_comments.toLocaleString()}</span>
        </div>

        {/* Title with highlight */}
        <h3 className="text-[18px] font-medium text-[#1c1c1c] leading-snug mb-2">
          {highlight(post.title, query)}
        </h3>

        {/* Selftext with highlight */}
        {post.selftext && post.selftext.length > 20 && (
          <p className="text-[13px] text-[#878a8c] leading-relaxed mb-3 line-clamp-2">
            {highlight(post.selftext, query)}
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
              isFav ? 'text-yellow-600 bg-yellow-50' : 'text-[#878a8c] hover:bg-[#f6f7f8] hover:text-[#1c1c1c]'
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

// ─── Keyword ranking ──────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  'the','a','an','and','or','but','in','on','at','to','for','of','with','by',
  'from','is','it','its','this','that','these','those','was','are','were','be',
  'been','being','have','has','had','do','does','did','will','would','could',
  'should','may','might','can','not','no','so','if','as','up','out','about',
  'into','than','then','when','where','who','what','how','my','your','our',
  'their','his','her','we','they','you','i','me','us','him','them','all','just',
  'more','also','after','before','new','like','get','use','make','need','want',
  'know','think','see','one','two','three','any','some','most','only','over',
  'even','much','same','good','great','best','really','very','here','there',
  've','re','ll','t','s','m','d','am','im','ive','dont','doesnt','cant',
  'it\'s','don\'t','i\'ve','i\'m','can\'t','didn\'t','doesn\'t','won\'t',
])

function computeTopKeywords(posts: RedditPost[], topN = 20): { word: string; count: number }[] {
  const freq: Record<string, number> = {}
  for (const post of posts) {
    const text = (post.title + ' ' + (post.selftext ?? '')).toLowerCase()
    const words = text.match(/\b[a-z][a-z'-]{2,}\b/g) ?? []
    for (const w of words) {
      if (!STOP_WORDS.has(w)) freq[w] = (freq[w] ?? 0) + 1
    }
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([word, count]) => ({ word, count }))
}

// ─── Suggestions ──────────────────────────────────────────────────────────────

const SUGGESTIONS = [
  'AI tool', 'SaaS pricing', 'landing page', 'churn rate',
  'cold email', 'product hunt', 'B2B sales', 'SEO strategy',
  'no-code', 'indie hacker', 'side project', 'MRR growth',
]

// ─── Main ─────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 20

export function HuntFeed({ data }: { data: ScrapeResult }) {
  const [query, setQuery]         = useState('')
  const [submitted, setSubmitted] = useState('')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [page, setPage]           = useState(1)

  const topKeywords = useMemo(() => computeTopKeywords(data.posts), [data.posts])

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

  const results = useMemo(() => {
    if (!submitted.trim()) return []
    const q = submitted.toLowerCase()
    return data.posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.selftext && p.selftext.toLowerCase().includes(q))
    )
  }, [data.posts, submitted])

  const visible = results.slice(0, page * PAGE_SIZE)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setSubmitted(query.trim())
    setPage(1)
  }

  function handleSuggestion(s: string) {
    setQuery(s)
    setSubmitted(s)
    setPage(1)
  }

  function handleClear() {
    setQuery('')
    setSubmitted('')
    setPage(1)
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-[36px] text-white leading-tight mb-2">Hunt</h1>
        <p className="text-zinc-500 text-[13px] leading-relaxed max-w-lg">
          Cherche un mot-clé dans tous les posts scrappés.<br />
          Trouve exactement ce dont ton audience parle.
        </p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ex: pricing strategy, cold email, AI tool..."
              className="w-full bg-[#111113] border border-[#27272a] text-white placeholder-zinc-600 rounded-xl pl-10 pr-10 py-3 text-[14px] focus:outline-none focus:border-[#FF4500] transition-colors"
            />
            {query && (
              <button type="button" onClick={handleClear}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors">
                <X size={15} />
              </button>
            )}
          </div>
          <button type="submit"
            className="px-5 py-3 bg-[#FF4500] hover:bg-[#CC3700] text-white text-[13px] font-semibold rounded-xl transition-colors flex-shrink-0">
            Hunt →
          </button>
        </div>
      </form>

      {/* Suggestions + Keyword ranking — show when no search */}
      {!submitted && (
        <div className="flex flex-col gap-8">

          {/* Suggestions */}
          <div>
            <p className="text-[11px] text-zinc-600 uppercase tracking-wider mb-3">Suggestions</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => handleSuggestion(s)}
                  className="px-3 py-1.5 rounded-full text-[12px] font-medium text-zinc-400 border border-[#27272a] hover:border-[#FF4500]/40 hover:text-[#FF4500] transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Top keywords ranking */}
          <div>
            <p className="text-[11px] text-zinc-600 uppercase tracking-wider mb-4">
              Mots-clés les plus cités — {data.total_posts} posts analysés
            </p>
            <div className="bg-[#111113] border border-[#1c1c1e] rounded-xl overflow-hidden">
              {topKeywords.map(({ word, count }, i) => {
                const max = topKeywords[0].count
                const pct = Math.round((count / max) * 100)
                return (
                  <button
                    key={word}
                    onClick={() => handleSuggestion(word)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#1c1c1e] transition-colors border-b border-[#1c1c1e] last:border-0 group text-left"
                  >
                    {/* Rank */}
                    <span className="text-[11px] font-mono text-zinc-700 w-5 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Bar */}
                    <div className="flex-1 flex items-center gap-3 min-w-0">
                      <span className="text-[13px] font-medium text-zinc-300 group-hover:text-white transition-colors w-32 flex-shrink-0 truncate">
                        {word}
                      </span>
                      <div className="flex-1 h-1.5 bg-[#27272a] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: pct > 66 ? '#FF4500' : pct > 33 ? '#FF8040' : '#52525b',
                          }}
                        />
                      </div>
                    </div>

                    {/* Count */}
                    <span className="text-[11px] text-zinc-600 flex-shrink-0 w-12 text-right">
                      {count}×
                    </span>
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
          {/* Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-[13px] text-zinc-400">
              <span className="text-white font-medium">{results.length}</span> résultat{results.length !== 1 ? 's' : ''} pour{' '}
              <span className="text-[#FF4500] font-medium">&quot;{submitted}&quot;</span>
            </p>
            <button onClick={handleClear} className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors">
              Effacer
            </button>
          </div>

          {/* Empty */}
          {results.length === 0 && (
            <div className="text-center py-16 bg-[#111113] border border-[#1c1c1e] rounded-xl">
              <Search size={28} className="text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-500 text-[14px] mb-1">Aucun post trouvé pour &quot;{submitted}&quot;</p>
              <p className="text-zinc-700 text-[12px]">Essaie un autre mot-clé ou relance le scraper.</p>
            </div>
          )}

          {/* Feed */}
          <div className="flex flex-col gap-3">
            {visible.map(post => (
              <PostCard
                key={post.id}
                post={post}
                query={submitted}
                isFav={favorites.has(post.id)}
                onToggleFav={toggleFav}
              />
            ))}

            {visible.length < results.length && (
              <button onClick={() => setPage(p => p + 1)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#1c1c1e] text-zinc-500 hover:text-zinc-300 hover:border-[#27272a] text-[12px] font-medium transition-colors">
                <ChevronDown size={14} />
                Charger plus ({results.length - visible.length} restants)
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
