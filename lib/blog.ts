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

/**
 * Remove a `<div>` (and all its nested children) whose class contains the
 * given prefix. Used to strip Substack's injected widget wrappers — these
 * can't be matched with a plain regex because they nest other `<div>`s.
 */
function stripNestedDivByClass(html: string, classPrefix: string): string {
  const openRe = new RegExp(
    `<div[^>]*class=["'][^"']*${classPrefix}[^"']*["'][^>]*>`,
    "i"
  );
  let result = html;
  // Cap iterations defensively — a malformed feed shouldn't loop forever.
  for (let iter = 0; iter < 50; iter++) {
    const openMatch = openRe.exec(result);
    if (!openMatch) break;
    const start = openMatch.index;
    let i = start + openMatch[0].length;
    let depth = 1;
    while (i < result.length && depth > 0) {
      const nextOpen = result.indexOf("<div", i);
      const nextClose = result.indexOf("</div>", i);
      if (nextClose === -1) break;
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        i = nextOpen + 4;
      } else {
        depth--;
        i = nextClose + 6;
      }
    }
    if (depth === 0) {
      result = result.slice(0, start) + result.slice(i);
    } else {
      // Couldn't find a matching close — stop rather than risk corrupting HTML.
      break;
    }
  }
  return result;
}

/**
 * Strip Substack's injected subscribe widgets, share buttons, and
 * "Thanks for reading..." footers from post HTML so the website's blog
 * pages render only the author's content. Substack emits these via RSS as
 * recognizable wrapper classes — we remove the wrappers and any trailing
 * empty paragraphs left behind.
 *
 * Conservative on purpose: we only remove patterns we're confident are
 * Substack chrome (specific class names, the exact "Thanks for reading"
 * sentence), so author-written links and images survive.
 */
function stripSubstackChrome(html: string): string {
  if (!html) return html;
  let out = html;

  // Subscribe widget wrappers (the embedded email-signup boxes).
  out = stripNestedDivByClass(out, "subscription-widget-wrap");
  out = stripNestedDivByClass(out, "subscription-widget");
  // "Share Pixley" / pledge / comment CTA wrappers.
  out = stripNestedDivByClass(out, "button-wrapper");
  out = stripNestedDivByClass(out, "subscribe-widget");
  out = stripNestedDivByClass(out, "pledge-button-wrap");
  out = stripNestedDivByClass(out, "comments-link");

  // The standard "Thanks for reading [Publication]! Subscribe for free..."
  // paragraph Substack appends to every post.
  out = out.replace(
    /<p[^>]*>\s*(?:<strong>)?\s*Thanks for reading\b[\s\S]*?<\/p>/gi,
    ""
  );
  // Standalone "Subscribe now" / "Share" anchor buttons left behind, in case
  // the surrounding wrapper had an unfamiliar class.
  out = out.replace(
    /<p[^>]*>\s*<a[^>]*class=["'][^"']*\bbutton\b[^"']*["'][^>]*>[\s\S]*?<\/a>\s*<\/p>/gi,
    ""
  );

  // Clean up any empty paragraphs / whitespace runs we may have created.
  out = out.replace(/<p[^>]*>\s*<\/p>/gi, "");
  out = out.replace(/(\s*\n){3,}/g, "\n\n");

  return out.trim();
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
        const rawHtml = item.contentEncoded || item.content || "";
        const html = stripSubstackChrome(rawHtml);
        const link = item.link as string;
        return {
          slug: slugFromLink(link),
          title: (item.title as string).trim(),
          excerpt: makeExcerpt(item.contentSnippet, html),
          contentHtml: html,
          date: item.isoDate || item.pubDate || new Date().toISOString(),
          author: item.creator || "Pixley",
          // Only treat an image as a "cover" if the author actually placed
          // one in the post body. We intentionally ignore the RSS enclosure,
          // because Substack uses the publication avatar (our app icon) as
          // the enclosure when no real hero image is set, and we don't want
          // that rendered as a giant square at the top of every post.
          coverImage: firstImageFromHtml(html),
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
