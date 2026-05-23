import Parser from "rss-parser";
import { samplePosts } from "./sample-posts";

/**
 * Blog data layer.
 *
 * Posts are authored in Substack and pulled into the website via Substack's
 * RSS feed. When you publish (or update) a post in Substack, it appears here
 * on the next page rebuild (we revalidate hourly — see REVALIDATE_SECONDS).
 *
 * Until the Substack feed is configured (or while it's empty), we render the
 * on-brand sample posts in `lib/sample-posts.ts` so the blog still looks
 * complete. As soon as the feed returns at least one real post, the samples
 * are dropped automatically.
 *
 * To connect Substack: set NEXT_PUBLIC_SUBSTACK_URL in your environment to
 * your publication's base URL, e.g. https://pixley.substack.com
 * (no trailing slash, no /feed). On Vercel: Project → Settings → Environment
 * Variables.
 */

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  date: string; // ISO 8601
  author: string;
  coverImage?: string;
  /** Original Substack URL, if this post came from Substack. */
  canonicalUrl?: string;
  source: "substack" | "sample";
};

export const REVALIDATE_SECONDS = 3600; // re-fetch the Substack feed hourly

const SUBSTACK_BASE = (process.env.NEXT_PUBLIC_SUBSTACK_URL || "").replace(
  /\/+$/,
  ""
);

// Only `content:encoded` needs a custom mapping; rss-parser provides the rest
// (title, link, pubDate, isoDate, creator, content, contentSnippet, enclosure)
// on its built-in Item type.
type SubstackItemExtras = {
  contentEncoded?: string;
};

const parser: Parser<unknown, SubstackItemExtras> = new Parser({
  customFields: {
    item: [["content:encoded", "contentEncoded"]],
  },
});

function slugFromLink(link: string): string {
  try {
    const path = new URL(link).pathname; // e.g. /p/the-post-slug
    const last = path.split("/").filter(Boolean).pop();
    return last || link;
  } catch {
    return link;
  }
}

function makeExcerpt(snippet: string | undefined, html: string): string {
  const text =
    (snippet && snippet.trim()) ||
    html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= 200) return text;
  return text.slice(0, 197).trimEnd() + "…";
}

function firstImageFromHtml(html: string): string | undefined {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1];
}

async function fetchSubstackPosts(): Promise<BlogPost[]> {
  if (!SUBSTACK_BASE) return [];

  try {
    const res = await fetch(`${SUBSTACK_BASE}/feed`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { "User-Agent": "PixleyWebsite/1.0 (+https://usepixley.com)" },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const feed = await parser.parseString(xml);

    const posts: BlogPost[] = (feed.items || [])
      .filter((item) => item.link && item.title)
      .map((item) => {
        const html = item.contentEncoded || item.content || "";
        const link = item.link as string;
        return {
          slug: slugFromLink(link),
          title: (item.title as string).trim(),
          excerpt: makeExcerpt(item.contentSnippet, html),
          contentHtml: html,
          date: item.isoDate || item.pubDate || new Date().toISOString(),
          author: item.creator || "Pixley",
          coverImage: item.enclosure?.url || firstImageFromHtml(html),
          canonicalUrl: link,
          source: "substack" as const,
        };
      });

    return posts;
  } catch {
    // Network/parse error — fall back to samples.
    return [];
  }
}

/** All posts, newest first. Prefers Substack; falls back to samples. */
export async function getAllPosts(): Promise<BlogPost[]> {
  const substack = await fetchSubstackPosts();
  const posts = substack.length > 0 ? substack : samplePosts;
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug);
}
