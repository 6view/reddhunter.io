import fs from 'fs'
import path from 'path'
import type {
  RedditPost,
  SubredditMeta,
  ScrapeResult,
  RedditListingResponse,
  RedditAboutResponse,
} from './types.js'

// ─── Config ──────────────────────────────────────────────────────────────────

const CONFIG = {
  subreddits: [
    'indiehackers',
    'SaaS',
    'startups',
    'entrepreneur',
    'buildinpublic',
    'growthhacking',
    'sidehustle',
  ],
  sort: 'top' as const,           // top | hot | new | rising
  timeframe: 'week' as const,     // hour | day | week | month | year | all
  postsPerSubreddit: 100,         // max 100 per request (Reddit limit)
  delayBetweenRequests: 2000,     // ms — be respectful
  outputDir: path.join(process.cwd(), 'scraper', 'output'),
}

const BASE = 'https://www.reddit.com'
const HEADERS = {
  'User-Agent': 'Reddhunter-Scraper/1.0 (educational project; contact via github.com/6view/reddhunter.io)',
  'Accept': 'application/json',
}

// ─── Utils ───────────────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const log = {
  info:    (msg: string) => console.log(`  \x1b[36mℹ\x1b[0m  ${msg}`),
  success: (msg: string) => console.log(`  \x1b[32m✓\x1b[0m  ${msg}`),
  warn:    (msg: string) => console.log(`  \x1b[33m⚠\x1b[0m  ${msg}`),
  error:   (msg: string) => console.log(`  \x1b[31m✗\x1b[0m  ${msg}`),
  title:   (msg: string) => console.log(`\n\x1b[1m${msg}\x1b[0m`),
}

function computeEngagementScore(score: number, numComments: number): number {
  // Comments weighted 3× — high comment count = debate = viral potential
  return score + numComments * 3
}

function mapPost(child: RedditListingResponse['data']['children'][0]): RedditPost {
  const p = child.data
  return {
    id:               p.id,
    title:            p.title,
    score:            p.score,
    upvote_ratio:     p.upvote_ratio,
    num_comments:     p.num_comments,
    author:           p.author,
    created_utc:      p.created_utc,
    created_at:       new Date(p.created_utc * 1000).toISOString(),
    url:              p.url,
    permalink:        `https://reddit.com${p.permalink}`,
    selftext:         (p.selftext ?? '').slice(0, 1000),
    subreddit:        p.subreddit,
    is_self:          p.is_self,
    flair:            p.link_flair_text ?? null,
    thumbnail:        p.thumbnail && !['self', 'default', 'nsfw', ''].includes(p.thumbnail)
                        ? p.thumbnail
                        : null,
    engagement_score: computeEngagementScore(p.score, p.num_comments),
  }
}

// ─── Reddit Fetchers ─────────────────────────────────────────────────────────

async function fetchPosts(subreddit: string): Promise<RedditPost[]> {
  const { sort, timeframe, postsPerSubreddit } = CONFIG
  const url = `${BASE}/r/${subreddit}/${sort}.json?limit=${postsPerSubreddit}&t=${timeframe}&raw_json=1`

  const res = await fetch(url, { headers: HEADERS })

  if (res.status === 429) {
    log.warn(`Rate limited on r/${subreddit} — waiting 10s...`)
    await sleep(10_000)
    return fetchPosts(subreddit)
  }

  if (res.status === 404) {
    log.warn(`r/${subreddit} not found or private — skipping`)
    return []
  }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} on r/${subreddit}`)
  }

  const json = (await res.json()) as RedditListingResponse
  return json.data.children.map(mapPost)
}

async function fetchSubredditMeta(subreddit: string): Promise<SubredditMeta | null> {
  const url = `${BASE}/r/${subreddit}/about.json?raw_json=1`
  const res = await fetch(url, { headers: HEADERS })

  if (!res.ok) return null

  const json = (await res.json()) as RedditAboutResponse
  const d = json.data
  return {
    name:         d.display_name,
    subscribers:  d.subscribers,
    active_users: d.accounts_active,
    description:  (d.public_description ?? '').slice(0, 300),
    created_utc:  d.created_utc,
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  log.title('🔴 Reddhunter Scraper')
  log.info(`Subreddits : ${CONFIG.subreddits.map(s => `r/${s}`).join(', ')}`)
  log.info(`Sort       : ${CONFIG.sort} / ${CONFIG.timeframe}`)
  log.info(`Limit      : ${CONFIG.postsPerSubreddit} posts/subreddit\n`)

  const allPosts: RedditPost[] = []
  const meta: Record<string, SubredditMeta> = {}

  for (let i = 0; i < CONFIG.subreddits.length; i++) {
    const subreddit = CONFIG.subreddits[i]
    process.stdout.write(`  Fetching r/${subreddit}...`)

    try {
      const [posts, subredditMeta] = await Promise.all([
        fetchPosts(subreddit),
        fetchSubredditMeta(subreddit),
      ])

      allPosts.push(...posts)
      if (subredditMeta) meta[subreddit] = subredditMeta

      process.stdout.write(`\r`)
      log.success(`r/${subreddit.padEnd(20)} ${posts.length} posts  (top: ${posts[0]?.score ?? 0} pts)`)
    } catch (err) {
      process.stdout.write(`\r`)
      log.error(`r/${subreddit} — ${(err as Error).message}`)
    }

    // Delay between requests (skip after last)
    if (i < CONFIG.subreddits.length - 1) {
      await sleep(CONFIG.delayBetweenRequests)
    }
  }

  // Sort all posts by engagement score descending
  allPosts.sort((a, b) => b.engagement_score - a.engagement_score)

  // Build output
  const result: ScrapeResult = {
    scraped_at:   new Date().toISOString(),
    subreddits:   CONFIG.subreddits,
    total_posts:  allPosts.length,
    posts:        allPosts,
    meta,
  }

  // Save JSON
  fs.mkdirSync(CONFIG.outputDir, { recursive: true })
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const outputPath = path.join(CONFIG.outputDir, `posts-${timestamp}.json`)
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8')

  // Summary
  log.title('Summary')
  log.success(`${allPosts.length} posts scraped across ${CONFIG.subreddits.length} subreddits`)
  log.success(`Output → ${outputPath}`)

  log.title('Top 5 posts by engagement')
  allPosts.slice(0, 5).forEach((p, i) => {
    console.log(`  ${i + 1}. [${p.subreddit}] ${p.title.slice(0, 70)}`)
    console.log(`     Score: ${p.score} | Comments: ${p.num_comments} | Engagement: ${p.engagement_score}`)
    console.log(`     ${p.permalink}\n`)
  })
}

main().catch(err => {
  log.error(`Fatal: ${err.message}`)
  process.exit(1)
})
