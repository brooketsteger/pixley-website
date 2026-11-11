import type { Metadata } from "next";
import AnswerPage, { type Faq } from "@/components/AnswerPage";

const PATH = "/faq";
const URL = `https://usepixley.com${PATH}`;
const ONE_LINER =
  "Pixley is an app where kids watch YouTube videos and Shorts only from channels their parent has approved, with time limits, the ability to disable Shorts and no algorithm.";

export const metadata: Metadata = {
  title: "Pixley FAQ",
  description:
    "Answers about Pixley: what it is, price, devices, ages, Shorts controls, privacy and how it compares to other apps.",
  alternates: { canonical: URL },
};

const FAQS: Faq[] = [
  { q: "What is Pixley?", a: ONE_LINER },
  {
    q: "How much does Pixley cost?",
    a: "Pixley has a free 7-day trial. After that it's $1.99 a month or $14.99 a year. Both are Pixley Unlimited and unlock everything in the app.",
  },
  {
    q: "What devices does Pixley work on?",
    a: "Pixley is available for iPhone and iPad from the App Store.",
  },
  {
    q: "What ages is Pixley for?",
    a: "Pixley works for kids of any age, from preschoolers to teens, because you choose every channel they can watch.",
  },
  {
    q: "Where do the videos come from?",
    a: "From YouTube channels that you approve. You can search for specific channels or turn on Pixley Lists, like Science, Travel, Minecraft or LEGO.",
  },
  {
    q: "Can I turn off YouTube Shorts?",
    a: "Yes. You can turn Shorts off completely or set a daily time limit for them. You can also set a separate time limit for regular videos.",
  },
  {
    q: "Is there an algorithm or recommended videos?",
    a: "No. Your child only sees videos from channels you've approved. There are no recommended videos and no comments.",
  },
  {
    q: "Does Pixley show ads or track my child?",
    a: "Pixley shows no targeted ads and doesn't track your child's behavior. It collects only what's needed to run your account, such as your sign-in email.",
  },
  {
    q: "How do I sign in?",
    a: "With your Apple or Google account.",
  },
  {
    q: "How do I stop my child from changing the settings?",
    a: "Set a parent PIN. The parent controls stay locked without it.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "Subscriptions are managed by Apple. On your iPhone or iPad, open Settings, tap your name, then Subscriptions, and choose Pixley.",
  },
  {
    q: "How do I delete my account?",
    a: "You can delete your account from inside the app. Your data is removed after a 7-day grace period, during which you can change your mind.",
  },
  {
    q: "Is Pixley affiliated with YouTube?",
    a: "No. Pixley is not affiliated with or endorsed by YouTube or Google.",
  },
  {
    q: "Is Pixley related to other apps named Pixley?",
    a: "No. Pixley at usepixley.com is not affiliated with other apps or companies named Pixley.",
  },
  {
    q: "How do I contact Pixley?",
    a: "Email support@usepixley.com.",
  },
];

export default function Page() {
  return (
    <AnswerPage
      path={PATH}
      eyebrow="Help"
      title="Pixley FAQ"
      answer={<p>{ONE_LINER}</p>}
      faqs={FAQS}
    />
  );
}
