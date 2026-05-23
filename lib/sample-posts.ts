import type { BlogPost } from "./blog";

/**
 * On-brand starter posts.
 *
 * These render when the Substack feed isn't connected yet (or is empty) so the
 * blog looks complete from day one. Once your Substack returns at least one
 * real post, these are dropped automatically (see lib/blog.ts).
 *
 * Want these live in Substack too? Paste-ready Markdown versions live in
 * `content/blog-drafts/`.
 */
export const samplePosts: BlogPost[] = [
  {
    slug: "why-we-built-pixley-without-an-algorithm",
    title: "Why we built Pixley without an algorithm",
    author: "Pixley",
    date: "2026-05-12T09:00:00.000Z",
    source: "sample",
    excerpt:
      "Most kids' apps are built to maximize watch time. We built Pixley to do the opposite — show only the videos a parent has already said yes to.",
    contentHtml: `
<p>If you've ever handed your phone to a child for "just one video," you know what happens next. One clip becomes ten. The autoplay queue keeps rolling. The suggested videos drift somewhere you never intended. None of that is an accident — most kids' video apps are engineered to keep watch time climbing.</p>
<p>Pixley is built on the opposite idea. There is no recommendation engine, no autoplay rabbit hole, and no "you might also like." A child only ever sees videos from channels a parent has explicitly approved.</p>
<h2>The problem with "kid-safe" algorithms</h2>
<p>Plenty of apps promise kid-safe content, then quietly rely on an algorithm to decide what's appropriate. Algorithms are good at one thing: predicting what will hold attention. That is not the same as predicting what's good for a child, and the gap between the two is exactly where parents get burned.</p>
<p>Filters help, but they're reactive. Something slips through, you report it, and the system learns — after your kid has already seen it. We didn't want to play defense.</p>
<h2>How Pixley works instead</h2>
<p>In Pixley, the parent is the algorithm. You choose the channels and creators. Your child sees those, and nothing else.</p>
<ul>
<li><strong>You approve every channel.</strong> Content comes only from sources you've added.</li>
<li><strong>No suggestions, ever.</strong> There's no discovery feed nudging kids toward the next thing.</li>
<li><strong>No autoplay surprises.</strong> When a video ends, it ends.</li>
</ul>
<p>The result is calmer for kids and far less stressful for parents. You're not auditing a feed — you're curating a small, trusted library.</p>
<h2>Less, on purpose</h2>
<p>We think the best thing a kids' app can do is get out of the way. Pixley isn't trying to be the place your child spends the most time. It's trying to be the place where the time they do spend is on things you'd happily watch alongside them.</p>
<p>That's the whole idea: where the parent controls the content.</p>
`,
  },
  {
    slug: "a-saner-approach-to-screen-time",
    title: "A saner approach to screen time",
    author: "Pixley",
    date: "2026-05-06T09:00:00.000Z",
    source: "sample",
    excerpt:
      "Screen time fights usually aren't about minutes — they're about trust. Here's how to make the time your kids spend watching feel intentional.",
    contentHtml: `
<p>The screen time conversation tends to collapse into a number. Two hours? One? None on weekdays? But most parents we talk to aren't really worried about the clock. They're worried about what's <em>on</em> the screen, and whether they can trust it when they're not looking over a shoulder.</p>
<h2>Quality changes the math</h2>
<p>Twenty minutes of a science channel you love is not the same as twenty minutes of an autoplay feed you've never vetted. When you trust the content, the minutes stop feeling like something to ration and start feeling like something you chose.</p>
<p>That's the shift we care about: from <em>limiting</em> screen time to <em>shaping</em> it.</p>
<h2>A few things that help</h2>
<ul>
<li><strong>Decide the library, not the limit.</strong> Curate a small set of channels you're genuinely glad your child watches. The boundaries take care of themselves.</li>
<li><strong>Watch together when you can.</strong> Co-viewing turns passive time into a conversation.</li>
<li><strong>Make endings predictable.</strong> Apps that just stop — no next-video pull — make "all done" a lot easier to enforce.</li>
<li><strong>Let them have favorites.</strong> Kids returning to a few trusted creators is a feature, not a problem.</li>
</ul>
<h2>Trust beats tracking</h2>
<p>You can monitor every minute, or you can build an environment you don't have to police. We're firmly in the second camp. When the content is already something you approved, screen time stops being a battle and starts being just... time.</p>
<p class="note">This post shares general thoughts, not medical or developmental advice. Every family is different — do what works for yours.</p>
`,
  },
  {
    slug: "what-parent-approved-actually-means",
    title: "What “parent-approved” actually means in Pixley",
    author: "Pixley",
    date: "2026-04-28T09:00:00.000Z",
    source: "sample",
    excerpt:
      "A quick tour of how approving channels works, why it's at the creator level, and what your child sees as a result.",
    contentHtml: `
<p>"Parent-approved" gets used loosely across kids' apps, so here's exactly what it means inside Pixley — no marketing gloss.</p>
<h2>You approve at the channel level</h2>
<p>Instead of approving individual videos one at a time (exhausting) or trusting a category filter (too blunt), Pixley works at the channel and creator level. You add a creator you trust, and their videos become available to your child.</p>
<p>This hits the sweet spot: it's fast to set up, and it gives you a real, human unit of trust — a creator whose work you actually know.</p>
<h2>What your child sees</h2>
<p>Your child opens Pixley to a library built entirely from the channels you've added. There's no search bar surfacing the wider internet, no recommended row, and no path out to content you didn't choose.</p>
<ul>
<li>Only approved channels appear.</li>
<li>Remove a channel and it disappears for your child immediately.</li>
<li>No account your child can use to wander off on their own.</li>
</ul>
<h2>You stay in control as things change</h2>
<p>Creators evolve, and a channel that was perfect last year might drift. Because approval lives with you, adjusting is simple — add what you love, remove what no longer fits. You're never locked into a decision.</p>
<p>That's the promise in one line: in Pixley, the content your child sees is the content you chose. Nothing more.</p>
`,
  },
];
