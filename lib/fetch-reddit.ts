import type { RedditPost, SubredditMeta, ScrapeResult } from '@/scraper/types'

const SUBREDDITS = [
  'indiehackers',
  'SaaS',
  'startups',
  'Entrepreneur',
  'buildinpublic',
  'growthhacking',
  'sidehustle',
]

const HEADERS = {
  'User-Agent': 'Reddhunter/2.0 (saas tool)',
  'Accept': 'application/json',
}

type RedditChild = {
  data: {
    id: string
    title: string
    score: number
    upvote_ratio: number
    num_comments: number
    author: string
    created_utc: number
    url: string
    permalink: string
    selftext: string
    subreddit: string
    is_self: boolean
    link_flair_text: string | null
    thumbnail: string | null
  }
}

function mapPost(child: RedditChild): RedditPost {
  const p = child.data
  return {
    id: p.id,
    title: p.title,
    score: p.score,
    upvote_ratio: p.upvote_ratio,
    num_comments: p.num_comments,
    author: p.author,
    created_utc: p.created_utc,
    created_at: new Date(p.created_utc * 1000).toISOString(),
    url: p.url,
    permalink: `https://reddit.com${p.permalink}`,
    selftext: (p.selftext ?? '').slice(0, 1000),
    subreddit: p.subreddit,
    is_self: p.is_self,
    flair: p.link_flair_text ?? null,
    thumbnail:
      p.thumbnail && !['self', 'default', 'nsfw', ''].includes(p.thumbnail ?? '')
        ? p.thumbnail
        : null,
    engagement_score: p.score + p.num_comments * 3,
  }
}

async function fetchSubreddit(sub: string): Promise<RedditPost[]> {
  try {
    // hot = posts trending RIGHT NOW — always fresh & high engagement
    const url = `https://www.reddit.com/r/${sub}/hot.json?limit=100&raw_json=1`
    const res = await fetch(url, {
      headers: HEADERS,
      next: { revalidate: 86400 }, // cache 24h — un seul scrape par jour
    })
    if (!res.ok) return []
    const json = await res.json() as { data: { children: RedditChild[] } }
    return json.data.children.map(mapPost)
  } catch {
    return []
  }
}

// Fetches all subreddits in parallel, cached 24h by Vercel
export async function fetchRedditPosts(): Promise<ScrapeResult> {
  const results = await Promise.all(SUBREDDITS.map(fetchSubreddit))

  const allPosts: RedditPost[] = []
  for (const posts of results) allPosts.push(...posts)

  // Deduplicate by id
  const seen = new Set<string>()
  const unique = allPosts.filter(p => {
    if (seen.has(p.id)) return false
    seen.add(p.id)
    return true
  })

  // Sort by engagement score
  unique.sort((a, b) => b.engagement_score - a.engagement_score)

  return {
    scraped_at: new Date().toISOString(),
    subreddits: SUBREDDITS,
    total_posts: unique.length,
    posts: unique,
    meta: {} as Record<string, SubredditMeta>,
  }
}
