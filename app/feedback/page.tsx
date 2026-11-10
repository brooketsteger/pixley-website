import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BugReportForm from "@/components/BugReportForm";
import FeatureRequests from "@/components/FeatureRequests";
import { getFeatureRequests } from "@/lib/feedback";

// Votes change often and each visitor sees their own votes highlighted.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Report a bug in the Pixley app, or suggest and vote on new features. See what other parents want most.",
  alternates: { canonical: "https://usepixley.com/feedback" },
  openGraph: {
    type: "website",
    url: "https://usepixley.com/feedback",
    title: "Pixley feedback — report a bug or vote on features",
    description: "Report a bug in the Pixley app, or suggest and vote on new features.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Pixley" }],
  },
};

export default async function FeedbackPage() {
  const { features, myVotes } = await getFeatureRequests();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold text-cocoa md:text-5xl">Feedback</h1>
        <p className="mt-4 max-w-xl text-lg text-warmbrown">
          Help us make Pixley better for your family. Tell us what&rsquo;s broken, or vote on
          what we build next.
        </p>

        <section aria-labelledby="bug-heading" className="mt-12">
          <div className="rounded-card border border-sand bg-cream p-6 md:p-8">
            <h2 id="bug-heading" className="text-2xl font-bold text-cocoa md:text-3xl">
              Report a bug
            </h2>
            <p className="mt-2 mb-6 text-sm text-warmbrown">
              Something not working right? Let us know and we&rsquo;ll look into it.
            </p>
            <BugReportForm />
          </div>
        </section>

        <section aria-labelledby="features-heading" className="mt-16">
          <h2 id="features-heading" className="text-2xl font-bold text-cocoa md:text-3xl">
            Feature requests
          </h2>
          <div className="mt-3">
            <FeatureRequests initialFeatures={features} initialVotes={myVotes} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
