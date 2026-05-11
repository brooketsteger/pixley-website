import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-page px-6 pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-warmbrown">
                Never wonder what your child is watching
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-cocoa md:text-6xl">
                Parental controls for{" "}
                <span className="text-coral">Shorts &amp; Reels</span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-warmbrown">
                A kid-safe streaming app where you approve every channel.
                No algorithm. No suggested content. Just the videos
                you&rsquo;ve said yes to.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  id="download"
                  href="#download"
                  className="rounded-full bg-coral px-6 py-3 text-base font-bold text-cream hover:opacity-90 transition-opacity"
                >
                  Download Now
                </a>
                <a
                  href="#features"
                  className="rounded-full border-2 border-coral px-6 py-3 text-base font-bold text-coral hover:bg-coraltint transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="relative flex justify-center md:justify-end">
              <PhoneFrame
                src="/screenshots/02-videos.png"
                alt="The Pixley Videos library on a phone, showing parent-approved videos from Flying The Nest and Nat Geo Kids"
                priority
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          aria-labelledby="features-heading"
          className="mx-auto max-w-page px-6 py-16"
        >
          <h2 id="features-heading" className="sr-only">
            Features
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="Approved content only"
              body="Parents approve all content creators."
              tint="bg-coraltint"
              icon="✓"
            />
            <FeatureCard
              title="Make &amp; share lists"
              body="Save different lists for different interests, share them with other parents."
              tint="bg-greentint"
              icon="✦"
            />
            <FeatureCard
              title="No suggested content"
              body="Algorithms will no longer surface related content. You have 100% control."
              tint="bg-bluetint"
              icon="✕"
            />
          </div>
        </section>

        {/* Screenshot gallery */}
        <section
          id="screenshots"
          aria-labelledby="screenshots-heading"
          className="mx-auto max-w-page px-6 py-16"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="screenshots-heading"
              className="text-3xl font-bold text-cocoa md:text-4xl"
            >
              See it in action
            </h2>
            <p className="mt-4 text-lg text-warmbrown">
              A calm, kid-safe streaming app where every channel was chosen
              by you.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <ScreenshotTile
              src="/screenshots/01-shorts-lions.png"
              alt="A National Geographic Kids short about lion moms playing in the Pixley app"
              caption="Kid-safe Shorts"
              note="Only creators you&rsquo;ve approved"
            />
            <ScreenshotTile
              src="/screenshots/05-parents-lists.png"
              alt="The Pixley Parents control panel showing My Lists and Pixley Lists with toggles for Science, Travel, Minecraft, and LEGO"
              caption="Parent controls"
              note="Toggle whole lists on or off"
            />
            <ScreenshotTile
              src="/screenshots/03-shorts-travel.png"
              alt="A Luxury Family Travel short about a Geneva chocolate pass in the Pixley app"
              caption="Approved channels"
              note="Travel, science, hobbies — your call"
            />
            <ScreenshotTile
              src="/screenshots/04-parent-tour.png"
              alt="The Pixley parent tour onboarding screen welcoming a new parent"
              caption="Quick parent tour"
              note="Set up in minutes"
            />
          </div>
        </section>

        {/* Tagline */}
        <section className="mx-auto max-w-page px-6 py-16 text-center">
          <p className="text-3xl font-bold tracking-wide text-coral md:text-4xl">
            PIXLEY
          </p>
          <p className="mt-4 text-xl text-cocoa md:text-2xl">
            Where the parent controls the content
          </p>
          <div className="mt-8">
            <Link
              href="#features"
              className="text-base font-medium text-coral hover:underline"
            >
              Learn more →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function FeatureCard({
  title,
  body,
  tint,
  icon,
}: {
  title: string;
  body: string;
  tint: string;
  icon: string;
}) {
  return (
    <article className="rounded-card border border-sand bg-cream p-6 text-center">
      <div
        className={`mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full ${tint}`}
        aria-hidden="true"
      >
        <span className="text-5xl font-bold text-coral">{icon}</span>
      </div>
      <h3
        className="text-lg font-bold text-cocoa"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p className="mt-2 text-sm text-warmbrown">{body}</p>
    </article>
  );
}

/**
 * iPhone-style frame for app screenshots. Pure CSS — no external image
 * needed for the frame itself. The `src` should be a portrait phone
 * screenshot (roughly 3:6.5 aspect or similar).
 */
function PhoneFrame({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative">
      <div className="relative w-[280px] rounded-[44px] border-[12px] border-cocoa bg-cocoa shadow-xl md:w-[320px]">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-cocoa" />
        <div className="overflow-hidden rounded-[32px] bg-cocoa">
          <Image
            src={src}
            alt={alt}
            width={400}
            height={870}
            priority={priority}
            className="block h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}

function ScreenshotTile({
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
      <div className="relative w-[200px] rounded-[28px] border-[8px] border-cocoa bg-cocoa shadow-lg">
        <div className="absolute left-1/2 top-0 z-10 h-3.5 w-20 -translate-x-1/2 rounded-b-xl bg-cocoa" />
        <div className="overflow-hidden rounded-[20px] bg-cocoa">
          <Image
            src={src}
            alt={alt}
            width={400}
            height={870}
            className="block h-auto w-full"
          />
        </div>
      </div>
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
