export interface RedditPost {
  id: string
  title: string
  score: number
  upvote_ratio: number
  num_comments: number
  author: string
  created_utc: number        // unix timestamp
  created_at: string         // ISO string
  url: string                // external link or reddit post url
  permalink: string          // full reddit.com link
  selftext: string           // post body (trimmed to 1000 chars)
  subreddit: string
  is_self: boolean           // text post vs link post
  flair: string | null
  thumbnail: string | null
  // computed
  engagement_score: number   // score + (num_comments * 3)
}

export interface SubredditMeta {
  name: string
  subscribers: number
  active_users: number
  description: string
  created_utc: number
}

export interface ScrapeResult {
  scraped_at: string
  subreddits: string[]
  total_posts: number
  posts: RedditPost[]
  meta: Record<string, SubredditMeta>
}

export interface RedditApiChild {
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

export interface RedditListingResponse {
  data: {
    children: RedditApiChild[]
    after: string | null
    before: string | null
  }
}

export interface RedditAboutResponse {
  data: {
    display_name: string
    subscribers: number
    accounts_active: number
    public_description: string
    created_utc: number
  }
}
