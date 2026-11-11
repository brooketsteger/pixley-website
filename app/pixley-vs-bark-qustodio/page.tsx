import type { Metadata } from "next";
import AnswerPage, { Section, CompareTable, type Faq } from "@/components/AnswerPage";

const PATH = "/pixley-vs-bark-qustodio";
const URL = `https://usepixley.com${PATH}`;
const DESCRIPTION =
  "Pixley vs Bark and Qustodio: monitoring apps watch what kids do across YouTube and other apps; Pixley controls which YouTube channels they can watch.";

export const metadata: Metadata = {
  title: "Pixley vs Bark and Qustodio",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: "Pixley vs Bark and Qustodio", description: DESCRIPTION, url: URL },
};

const FAQS: Faq[] = [
  {
    q: "Can Bark or Qustodio block YouTube Shorts?",
    a: "Their published features cover monitoring YouTube and limiting or blocking the YouTube app as a whole. Neither lists a way to block only Shorts or to allow only specific channels.",
  },
  {
    q: "Should I use Pixley instead of Bark or Qustodio?",
    a: "They do different jobs. Bark and Qustodio cover a whole device: many apps, websites and screen time. Pixley replaces the YouTube app itself with one where your child sees only channels you've approved. Some families use both.",
  },
  {
    q: "Does Pixley monitor my child's messages or other apps?",
    a: "No. Pixley only controls what your child watches inside Pixley.",
  },
];

export default function Page() {
  return (
    <AnswerPage
      path={PATH}
      eyebrow="Comparison"
      title="Pixley vs Bark and Qustodio"
      updated="November 2026"
      faqs={FAQS}
      answer={
        <p>
          Bark and Qustodio are monitoring apps: they show you what your child
          does across YouTube and other apps, and can limit or block YouTube
          as a whole. Pixley works differently. It&rsquo;s a video app where
          your child sees only the YouTube channels you&rsquo;ve approved, with
          its own controls for Shorts.
        </p>
      }
    >
      <Section id="table" title="Side by side">
        <CompareTable
          columns={["", "Pixley", "Bark", "Qustodio"]}
          rows={[
            ["What it is", "A kids' video app", "Monitoring and screen-time app", "Monitoring and screen-time app"],
            ["YouTube approach", "Only parent-approved channels appear", "Monitors YouTube activity (Premium plan)", "Shows YouTube searches and videos watched (Complete plan)"],
            ["Block just Shorts", "Yes, or set a daily Shorts limit", "Not a listed feature", "Not a listed feature"],
            ["Block all of YouTube", "Not needed: it replaces the YouTube app", "Through screen-time tools (more limited on iPhone)", "Yes, or set app time limits"],
            ["Covers other apps", "No", "Yes, 30+ apps and platforms", "Yes, apps, websites and screen time"],
            ["Price", "$1.99/month or $14.99/year", "Bark Jr $49/year, Bark Premium $99/year", "Basic $54.95/year, Complete $99.95/year"],
          ]}
        />
      </Section>

      <Section id="difference" title="Monitoring vs choosing">
        <p>
          Monitoring apps tell you what happened. That&rsquo;s useful across a
          whole device, but with YouTube it means finding out after your child
          has already watched something.
        </p>
        <p>
          Pixley decides in advance. You approve the channels, and nothing
          else reaches your child&rsquo;s feed. There&rsquo;s no algorithm,
          no comments and no recommended videos.
        </p>
      </Section>

      <Section id="together" title="Using them together">
        <p>
          Some families use a monitoring app for the whole device and Pixley
          for video. For example, you can use Bark or Qustodio to block the
          main YouTube app, and give your child Pixley instead.
        </p>
      </Section>

      <p className="text-sm">
        Bark and Qustodio details are from their published plans and help
        pages as of November 2026, and may change. Prices shown are annual
        list prices in USD.
      </p>
    </AnswerPage>
  );
}
