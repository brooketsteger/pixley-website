import type { Metadata } from "next";
import Link from "next/link";
import AnswerPage, { Section, type Faq } from "@/components/AnswerPage";

const PATH = "/youtube-kids-alternative";
const URL = `https://usepixley.com${PATH}`;
const DESCRIPTION =
  "Looking for a YouTube Kids alternative? Pixley lets parents approve every YouTube channel their child can watch, with time limits, the option to turn off Shorts and no algorithm.";

export const metadata: Metadata = {
  title: "A YouTube Kids Alternative Where Parents Approve Every Channel",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: "A YouTube Kids Alternative", description: DESCRIPTION, url: URL },
};

const FAQS: Faq[] = [
  {
    q: "What is the best YouTube Kids alternative for parents who want full control?",
    a: "If you want your child to see only channels you've chosen, look for an app built around parent approval. Pixley shows kids YouTube videos and Shorts only from channels their parent has approved, with time limits and the option to turn Shorts off.",
  },
  {
    q: "Does Pixley work with any YouTube channel?",
    a: "You can search for the specific YouTube channels you trust and add them, or turn on Pixley's curated lists, like Science, Travel or LEGO.",
  },
  {
    q: "How much does Pixley cost?",
    a: "Pixley has a free 7-day trial, then costs $1.99 a month or $14.99 a year. Both plans unlock everything.",
  },
  {
    q: "What devices does Pixley work on?",
    a: "Pixley is available for iPhone and iPad from the App Store.",
  },
];

export default function Page() {
  return (
    <AnswerPage
      path={PATH}
      eyebrow="For parents"
      title="A YouTube Kids alternative where parents approve every channel"
      faqs={FAQS}
      answer={
        <p>
          Pixley is an app where kids watch YouTube videos and Shorts only
          from channels their parent has approved, with time limits, the
          ability to disable Shorts and no algorithm. It&rsquo;s built for
          parents who want to choose every channel themselves instead of
          relying on automatic filters.
        </p>
      }
    >
      <Section id="why" title="Why parents look for an alternative">
        <p>
          Many kids&rsquo; video apps decide what to show next. Even when the
          content is filtered for age, a recommendation system is still
          choosing, and parents don&rsquo;t always agree with its choices.
        </p>
        <p>
          Pixley takes the opposite approach. Nothing appears unless you
          approved the channel it comes from.
        </p>
      </Section>

      <Section id="how" title="How Pixley works">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-cocoa">You pick the channels.</strong>{" "}
            Search for the YouTube channels you trust, or turn on Pixley Lists
            like Science, Travel, Minecraft or LEGO.
          </li>
          <li>
            <strong className="text-cocoa">Your child sees only those channels</strong>{" "}
            in their Videos and Shorts tabs.
          </li>
          <li>
            <strong className="text-cocoa">You set the limits.</strong> Daily
            time limits for Videos and Shorts, or turn Shorts off completely.
          </li>
          <li>
            <strong className="text-cocoa">A parent PIN</strong> keeps the
            settings locked.
          </li>
          <li>
            <strong className="text-cocoa">No algorithm.</strong> No
            recommended videos, no comments and no targeted ads.
          </li>
        </ul>
      </Section>

      <Section id="compare" title="Comparing your options">
        <p>
          For a side-by-side look, see{" "}
          <Link href="/pixley-vs-youtube-kids" className="text-coral hover:underline">
            Pixley vs YouTube Kids
          </Link>{" "}
          and{" "}
          <Link href="/pixley-vs-bark-qustodio" className="text-coral hover:underline">
            Pixley vs Bark and Qustodio
          </Link>
          .
        </p>
      </Section>
    </AnswerPage>
  );
}
