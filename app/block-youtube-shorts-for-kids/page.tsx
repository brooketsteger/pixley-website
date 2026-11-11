import type { Metadata } from "next";
import AnswerPage, { Section, type Faq } from "@/components/AnswerPage";

const PATH = "/block-youtube-shorts-for-kids";
const URL = `https://usepixley.com${PATH}`;
const DESCRIPTION =
  "Ways to block or limit YouTube Shorts for kids: YouTube's own Shorts timer for supervised teen accounts, iPhone Screen Time, and Pixley, where you can turn Shorts off and approve every channel.";

export const metadata: Metadata = {
  title: "How to Block YouTube Shorts for Kids",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: "How to Block YouTube Shorts for Kids", description: DESCRIPTION, url: URL },
};

const FAQS: Faq[] = [
  {
    q: "Can you turn off YouTube Shorts completely in the YouTube app?",
    a: "In January 2026 YouTube added a Shorts time limit that parents can set on supervised teen accounts, and said an option to set it to zero was coming soon. Check Family Center in YouTube for what your child's account supports today. Without a supervised account, there's no setting in the main YouTube app that removes Shorts.",
  },
  {
    q: "Can iPhone Screen Time block only YouTube Shorts?",
    a: "No. Screen Time can limit or block the whole YouTube app or website, but it can't tell Shorts apart from regular videos.",
  },
  {
    q: "How do I block YouTube Shorts but keep regular YouTube videos?",
    a: "In Pixley you can switch Shorts off and keep long-form videos from the YouTube channels you've approved. You can also keep Shorts and set a daily time limit instead.",
  },
  {
    q: "Is it bad to let kids watch Shorts at all?",
    a: "That's a family decision. Some parents want Shorts gone, others are happy with a short daily limit from channels they trust. Pixley supports both.",
  },
];

export default function Page() {
  return (
    <AnswerPage
      path={PATH}
      eyebrow="Guide for parents"
      title="How to block YouTube Shorts for kids"
      updated="November 2026"
      faqs={FAQS}
      answer={
        <p>
          The main YouTube app gives parents limited control over Shorts.
          Supervised teen accounts can get a daily Shorts time limit, and
          iPhone Screen Time can only block YouTube as a whole. To turn Shorts
          off while keeping regular videos, and to choose exactly which
          channels your child can watch, use an app like Pixley.
        </p>
      }
    >
      <Section id="option-youtube" title="Option 1: YouTube's own Shorts timer">
        <p>
          In January 2026, YouTube added a daily Shorts time limit that
          parents can set on supervised teen accounts, through YouTube&rsquo;s
          Family Center. YouTube said an option to set the limit to zero,
          which would turn the Shorts feed off, was coming soon.
        </p>
        <p>
          This works if your child already uses a supervised account in the
          main YouTube app. It doesn&rsquo;t change which channels they see:
          the regular recommendations and autoplay still apply.
        </p>
      </Section>

      <Section id="option-screen-time" title="Option 2: iPhone and iPad Screen Time">
        <p>
          Apple&rsquo;s Screen Time can set an app limit on YouTube or block
          it entirely. It can&rsquo;t separate Shorts from regular videos, so
          blocking Shorts this way means blocking YouTube.
        </p>
      </Section>

      <Section id="option-pixley" title="Option 3: Use Pixley">
        <p>
          Pixley is an app where kids watch YouTube videos and Shorts only
          from channels their parent has approved. Shorts are their own tab,
          so you can:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Turn Shorts off completely and keep long-form videos.</li>
          <li>Keep Shorts but set a daily time limit.</li>
          <li>Set separate limits for regular videos.</li>
          <li>Lock the settings with a parent PIN.</li>
        </ul>
        <p>
          Because every Short comes from a channel you approved, there&rsquo;s
          no algorithm deciding what comes next.
        </p>
      </Section>

      <Section id="steps" title="How to turn off Shorts in Pixley">
        <ol className="list-decimal space-y-2 pl-6">
          <li>Download Pixley from the App Store and sign in with Apple or Google.</li>
          <li>Open the Parents tab and approve channels, or turn on a Pixley List like Science or LEGO.</li>
          <li>In the parent controls, turn Shorts off, or set a daily Shorts time limit.</li>
          <li>Set a parent PIN so the settings stay in your hands.</li>
        </ol>
      </Section>
    </AnswerPage>
  );
}
