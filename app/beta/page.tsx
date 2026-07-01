import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import { WaitlistProvider } from "@/components/WaitlistContext";

export const metadata: Metadata = {
  title: "Join the Pixley beta",
  description:
    "Get early access to Pixley — the kid-safe Shorts and Reels app where parents approve every channel. Join the beta waitlist and we'll let you know when it opens.",
  alternates: { canonical: "https://usepixley.com/beta" },
  openGraph: {
    type: "website",
    url: "https://usepixley.com/beta",
    title: "Join the Pixley beta",
    description:
      "Get early access to Pixley — the kid-safe Shorts and Reels app where parents approve every channel.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Pixley" }],
  },
};

export default function BetaPage() {
  return (
    <WaitlistProvider>
      <Header />

      <main>
        {/* Hero with primary CTA */}
        <section className="mx-auto max-w-page px-6 pt-12 pb-20 md:pt-20 md:pb-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-block rounded-full bg-coraltint px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-coral">
              Now in private beta
            </p>
            <h1 className="mt-6 text-5xl font-bold leading-tight text-cocoa md:text-6xl">
              Join the{" "}
              <span className="text-coral">Pixley waitlist</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-warmbrown md:text-xl">
              Be among the first parents to try Pixley — a streaming app
              where you approve every channel. No algorithm. No fear. Just the
              videos you&rsquo;ve said yes to.
            </p>

            <div className="mx-auto mt-10 max-w-lg">
              <WaitlistForm size="large" id="waitlist-hero" />
            </div>
          </div>
        </section>

        {/* Value props */}
        <section
          aria-labelledby="why-heading"
          className="mx-auto max-w-page px-6 py-16"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="why-heading"
              className="text-3xl font-bold text-cocoa md:text-4xl"
            >
              Why parents are joining
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <ValueProp
              tint="bg-coraltint"
              icon="✓"
              title="Approved content only"
              body="Parents approve every creator. Nothing slips through that you haven&rsquo;t said yes to."
            />
            <ValueProp
              tint="bg-greentint"
              icon="⏱"
              title="Set time limits"
              body="Set daily limits for Videos and Shorts, or turn Shorts off all together."
            />
            <ValueProp
              tint="bg-bluetint"
              icon="✕"
              title="Disable YouTube Shorts"
              body="Switch YouTube Shorts off entirely. Leave only the long-form videos you&rsquo;ve approved."
            />
          </div>
        </section>

        {/* Screenshot showcase */}
        <section
          aria-labelledby="see-it-heading"
          className="mx-auto max-w-page px-6 py-16"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="see-it-heading"
              className="text-3xl font-bold text-cocoa md:text-4xl"
            >
              A peek at the beta
            </h2>
            <p className="mt-4 text-lg text-warmbrown">
              Real screens from the app you&rsquo;ll get early access to.
            </p>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <ShotTile
              src="/screenshots/shorts.png"
              alt="Pixley showing a Nat Geo Kids short about lion moms"
              caption="Kid-safe Shorts"
              note="Only creators you&rsquo;ve approved"
            />
            <ShotTile
              src="/screenshots/parents-lists.png"
              alt="The Pixley Parents control panel with curated channel lists"
              caption="Curated lists"
              note="Use Pixley&rsquo;s Lists, create your own, toggle categories on and off."
            />
            <ShotTile
              src="/screenshots/parent-timer.png"
              alt="Pixley daily Shorts time limit and parent PIN controls"
              caption="Daily time limits"
              note="Set a Shorts cap and a parent PIN"
            />
            <ShotTile
              src="/screenshots/parent-tour.png"
              alt="The Pixley parent tour welcoming a new parent"
              caption="Quick parent tour"
              note="Set up in minutes"
            />
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-page px-6 py-20">
          <div className="mx-auto max-w-2xl rounded-card border-2 border-coral bg-coraltint/40 p-8 text-center md:p-12">
            <h2 className="text-3xl font-bold text-cocoa md:text-4xl">
              Ready to take back the algorithm?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-warmbrown md:text-lg">
              Join the waitlist and we&rsquo;ll let you know the moment the beta
              opens for your family.
            </p>
            <div className="mx-auto mt-8 max-w-lg">
              <WaitlistForm size="default" id="waitlist-footer" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </WaitlistProvider>
  );
}

function ValueProp({
  tint,
  icon,
  title,
  body,
}: {
  tint: string;
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-card border border-sand bg-cream p-6 text-center">
      <div
        className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full ${tint}`}
        aria-hidden="true"
      >
        <span className="text-4xl font-bold text-coral">{icon}</span>
      </div>
      <h3 className="text-lg font-bold text-cocoa">{title}</h3>
      <p className="mt-2 text-sm text-warmbrown">{body}</p>
    </article>
  );
}

function ShotTile({
  src,
  alt,
  caption,
  note,
}: {
  src: string;
  alt: string;
  caption: string;
  note: string;
}) {
  return (
    <figure className="flex flex-col items-center text-center">
      <Image
        src={src}
        alt={alt}
        width={620}
        height={1286}
        className="h-auto w-[200px] drop-shadow-xl"
      />
      <figcaption className="mt-5">
        <p className="text-base font-bold text-cocoa">{caption}</p>
        <p
          className="mt-1 text-sm text-warmbrown"
          dangerouslySetInnerHTML={{ __html: note }}
        />
      </figcaption>
    </figure>
  );
}
