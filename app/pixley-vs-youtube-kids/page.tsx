import type { Metadata } from "next";
import AnswerPage, { Section, CompareTable, type Faq } from "@/components/AnswerPage";

const PATH = "/pixley-vs-youtube-kids";
const URL = `https://usepixley.com${PATH}`;
const DESCRIPTION =
  "Pixley vs YouTube Kids: how the two compare on channel approval, Shorts controls, time limits, ads and price.";

export const metadata: Metadata = {
  title: "Pixley vs YouTube Kids",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: "Pixley vs YouTube Kids", description: DESCRIPTION, url: URL },
};

const FAQS: Faq[] = [
  {
    q: "Is Pixley better than YouTube Kids?",
    a: "It depends on what you want. YouTube Kids is free and filters content automatically by age. Pixley is a paid app built around parents approving every channel, with a separate Shorts tab you can limit or turn off.",
  },
  {
    q: "Can YouTube Kids show only content I approve?",
    a: "Yes. YouTube Kids has an Approve content only setting where you hand-pick videos, channels and collections, and search is turned off. Its other content levels (Preschool, Younger and Older) use automated filters.",
  },
  {
    q: "Does YouTube Kids have ads?",
    a: "YouTube Kids is free and shows ads. YouTube Premium members can watch YouTube Kids without paid ads.",
  },
  {
    q: "Can I use Pixley instead of YouTube Kids for an older child?",
    a: "Yes. Because you choose every channel, Pixley works for younger kids and for older kids who've outgrown YouTube Kids content.",
  },
];

export default function Page() {
  return (
    <AnswerPage
      path={PATH}
      eyebrow="Comparison"
      title="Pixley vs YouTube Kids"
      updated="November 2026"
      faqs={FAQS}
      answer={
        <p>
          YouTube Kids is free and uses automated age filters by default, with
          an optional mode where parents hand-pick content. Pixley is a paid
          app where parents approve every channel, with separate time limits
          for Videos and Shorts and the option to turn Shorts off.
        </p>
      }
    >
      <Section id="table" title="Side by side">
        <CompareTable
          columns={["", "Pixley", "YouTube Kids"]}
          rows={[
            ["Who decides what's shown", "The parent approves every channel", "Automated age filters, or parent-approved content in Approve content only mode"],
            ["Recommendations", "None", "Yes, except in Approve content only mode"],
            ["Shorts", "Own tab: limit it or turn it off", "No separate Shorts setting"],
            ["Time limits", "Separate limits for Videos and Shorts", "Overall timer"],
            ["Ready-made lists", "Pixley Lists (Science, Travel, LEGO and more)", "Collections picked by YouTube Kids or partners"],
            ["Ads", "No targeted ads", "Ads, unless you have YouTube Premium"],
            ["Price", "$1.99/month or $14.99/year, 7-day free trial", "Free"],
            ["Devices", "iPhone and iPad", "Phones, tablets, TVs and the web"],
          ]}
        />
      </Section>

      <Section id="youtube-kids" title="When YouTube Kids is the right choice">
        <p>
          YouTube Kids is free, runs on many devices and doesn&rsquo;t need
          much setup. If automated age filters are enough for your family, or
          you&rsquo;re happy hand-picking individual videos in Approve content
          only mode, it&rsquo;s a reasonable option.
        </p>
      </Section>

      <Section id="pixley" title="When Pixley is the right choice">
        <p>
          Pixley fits parents who want to choose channels rather than rely on
          filters, and who want real control over Shorts. You can turn on a
          Pixley List to get started quickly, add your own channels, set a
          daily Shorts limit or switch Shorts off, and lock it all with a
          parent PIN.
        </p>
      </Section>

      <p className="text-sm">
        YouTube Kids details are from Google&rsquo;s YouTube Kids Help Center
        as of November 2026 and may change.
      </p>
    </AnswerPage>
  );
}
