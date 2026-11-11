import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppStoreButton from "@/components/AppStoreButton";
import { APP_STORE_URL } from "@/lib/appstore";

const ONE_LINER =
  "Pixley is an app where kids watch YouTube videos and Shorts only from channels their parent has approved, with time limits, the ability to disable Shorts and no algorithm.";

export const metadata: Metadata = {
  title: "About Pixley",
  description: ONE_LINER,
  alternates: { canonical: "https://usepixley.com/about" },
  openGraph: {
    title: "About Pixley",
    description: ONE_LINER,
    url: "https://usepixley.com/about",
  },
};

const FACTS: { label: string; value: React.ReactNode }[] = [
  { label: "What it is", value: "A kids' video app with parental controls" },
  {
    label: "Founder",
    value: (
      <a
        href="https://www.linkedin.com/in/brookesteger/"
        target="_blank"
        rel="noopener"
        className="text-coral hover:underline"
      >
        Brooke Steger
      </a>
    ),
  },
  { label: "Where videos come from", value: "YouTube channels a parent has approved" },
  { label: "Devices", value: "iPhone and iPad" },
  {
    label: "Price",
    value: "Free 7-day trial, then $1.99 a month or $14.99 a year",
  },
  { label: "Sign in", value: "Apple or Google" },
  { label: "Ads and tracking", value: "No targeted ads and no behavioral tracking of your child" },
  {
    label: "Contact",
    value: (
      <a href="mailto:support@usepixley.com" className="text-coral hover:underline">
        support@usepixley.com
      </a>
    ),
  },
];

export default function AboutPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: "https://usepixley.com/about",
    name: "About Pixley",
    description: ONE_LINER,
    mainEntity: {
      "@type": "Organization",
      name: "Pixley",
      url: "https://usepixley.com",
      logo: "https://usepixley.com/logo.png",
      description: ONE_LINER,
      email: "support@usepixley.com",
      sameAs: [APP_STORE_URL],
      founder: {
        "@type": "Person",
        name: "Brooke Steger",
        jobTitle: "Founder",
        url: "https://www.linkedin.com/in/brookesteger/",
        sameAs: ["https://www.linkedin.com/in/brookesteger/"],
        description:
          "Technology operator, founder and investor with more than 15 years of experience building and scaling consumer tech companies, including as one of Uber's earliest General Managers.",
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "University of Washington",
        },
      },
    },
  };

  return (
    <>
      <Header />
      <main className="mx-auto max-w-page px-6 py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
        />

        {/* Intro: the one-line answer first, for people and AI tools alike */}
        <section className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wide text-warmbrown">
            About Pixley
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-cocoa md:text-5xl">
            Where the parent controls the content
          </h1>
          <p className="mt-6 text-xl text-cocoa">{ONE_LINER}</p>
        </section>

        {/* Quick facts */}
        <section aria-labelledby="facts-heading" className="mt-12 max-w-3xl">
          <h2 id="facts-heading" className="sr-only">
            Pixley at a glance
          </h2>
          <dl className="divide-y divide-sand rounded-card border border-sand bg-cream">
            {FACTS.map((f) => (
              <div
                key={f.label}
                className="grid gap-1 px-6 py-4 sm:grid-cols-[200px_1fr] sm:gap-6"
              >
                <dt className="text-sm font-medium text-warmbrown">{f.label}</dt>
                <dd className="text-base text-cocoa">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-16 grid max-w-3xl gap-14">
          <section aria-labelledby="why-heading">
            <h2 id="why-heading" className="text-2xl font-bold text-cocoa md:text-3xl">
              Why we built it
            </h2>
            <div className="mt-4 space-y-4 text-lg text-warmbrown">
              <p>
                We&rsquo;re parents, and our kids have screen time. Some of
                what they find online is wonderful: videos that answer their
                &ldquo;but how?&rdquo; questions and feed real curiosity.
              </p>
              <p>
                The problem is the apps those videos live in. They&rsquo;re
                built to keep kids watching, so a great explainer is often
                followed by autoplay, recommendations or comments we&rsquo;d
                never choose. There was no way to say yes to this channel and
                no to everything else.
              </p>
              <p>
                So we built Pixley for parents in the middle: families who
                have chosen to allow screen time but want full control over
                what&rsquo;s on the screen.{" "}
                <Link href="/blog/why-we-created-pixley" className="text-coral hover:underline">
                  Read the full story
                </Link>
                .
              </p>
            </div>
          </section>

          <section aria-labelledby="founder-heading">
            <h2 id="founder-heading" className="text-2xl font-bold text-cocoa md:text-3xl">
              Meet the founder
            </h2>
            <div className="mt-4 space-y-4 text-lg text-warmbrown">
              <p>
                Pixley was founded by{" "}
                <strong className="text-cocoa">Brooke Steger</strong>, a
                technology operator, founder and investor with more than 15
                years of experience building and scaling consumer tech
                companies.
              </p>
              <p>
                Brooke launched UberX in Seattle as one of Uber&rsquo;s
                earliest General Managers, then led the Pacific Northwest
                through the company&rsquo;s hypergrowth, overseeing seven
                states, a $1B+ P&amp;L and a large team. She has since
                co-founded and led venture-backed startups, including an
                AI-powered real estate marketplace, and has served on startup
                and nonprofit boards. She holds a B.S. in Physics from the
                University of Washington.
              </p>
              <p>
                She built Pixley as a parent, because she wanted it for her
                own family.
              </p>
              <p>
                <a
                  href="https://www.linkedin.com/in/brookesteger/"
                  target="_blank"
                  rel="noopener"
                  className="text-coral hover:underline"
                >
                  Brooke on LinkedIn
                </a>
              </p>
            </div>
          </section>

          <section aria-labelledby="how-heading">
            <h2 id="how-heading" className="text-2xl font-bold text-cocoa md:text-3xl">
              How it works
            </h2>
            <ul className="mt-4 space-y-3 text-lg text-warmbrown">
              <li>
                <strong className="text-cocoa">You approve every channel.</strong>{" "}
                Turn on Pixley&rsquo;s curated lists, like Science, Travel or
                LEGO, or search for the specific YouTube channels you trust.
              </li>
              <li>
                <strong className="text-cocoa">Your child sees only those channels.</strong>{" "}
                Their Videos and Shorts tabs show nothing else.
              </li>
              <li>
                <strong className="text-cocoa">You set the limits.</strong>{" "}
                Set daily time limits for Videos and Shorts, or turn Shorts off
                completely. A parent PIN keeps the settings in your hands.
              </li>
            </ul>
          </section>

          <section aria-labelledby="not-heading">
            <h2 id="not-heading" className="text-2xl font-bold text-cocoa md:text-3xl">
              What you won&rsquo;t find in Pixley
            </h2>
            <ul className="mt-4 grid gap-3 text-lg text-warmbrown sm:grid-cols-2">
              <li>No algorithm or recommended videos</li>
              <li>No targeted ads</li>
              <li>No behavioral tracking of your child</li>
              <li>No comments or messages from strangers</li>
            </ul>
          </section>

          <section className="rounded-card bg-coraltint p-8 text-center">
            <p className="text-xl font-bold text-cocoa">
              Try Pixley free for 7 days
            </p>
            <p className="mt-2 text-warmbrown">For iPhone and iPad.</p>
            <div className="mt-6 flex justify-center">
              <AppStoreButton />
            </div>
          </section>

          <p className="text-sm text-warmbrown">
            Pixley is not affiliated with other apps or companies named
            Pixley. Pixley is not affiliated with or endorsed by YouTube or
            Google.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
