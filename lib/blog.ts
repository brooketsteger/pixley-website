import Parser from "rss-parser";

/**
 * Blog data layer.
 *
 * Posts are authored in Substack and pulled into the website via Substack's
 * RSS feed. When you publish (or update) a post in Substack, it appears here
 * on the next page rebuild (we revalidate hourly — see REVALIDATE_SECONDS).
 *
 * The publication is hardcoded below (DEFAULT_SUBSTACK_BASE) so the blog works
 * without any environment setup. To point at a different publication (e.g. a
 * custom domain), set NEXT_PUBLIC_SUBSTACK_URL to its base URL — no trailing
 * slash, no /feed — and it overrides the default. On Vercel:
 * Project → Settings → Environment Variables.
 */

// Pixley's Substack publication. If your publication actually lives at a
// different address (custom domain, or a subdomain other than this), update
// this value or set NEXT_PUBLIC_SUBSTACK_URL.
const DEFAULT_SUBSTACK_BASE = "https://usepixley.substack.com";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  date: string; // ISO 8601
  author: string;
  coverImage?: string;
  /** Original Substack URL. */
  canonicalUrl?: string;
  source: "substack";
};

export const REVALIDATE_SECONDS = 3600; // re-fetch the Substack feed hourly

const SUBSTACK_BASE = (
  process.env.NEXT_PUBLIC_SUBSTACK_URL || DEFAULT_SUBSTACK_BASE
).replace(/\/+$/, "");

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
    // Network/parse error — render an empty blog rather than crashing.
    return [];
  }
}

/** All posts from the Substack feed, newest first. */
export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await fetchSubstackPosts();
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
