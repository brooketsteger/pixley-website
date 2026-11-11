import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppStoreButton from "@/components/AppStoreButton";

export type Faq = { q: string; a: string };

const RELATED = [
  { href: "/block-youtube-shorts-for-kids", label: "How to block YouTube Shorts for kids" },
  { href: "/youtube-kids-alternative", label: "A YouTube Kids alternative" },
  { href: "/pixley-vs-youtube-kids", label: "Pixley vs YouTube Kids" },
  { href: "/pixley-vs-bark-qustodio", label: "Pixley vs Bark and Qustodio" },
  { href: "/faq", label: "Pixley FAQ" },
];

/**
 * Shared layout for the answer-first SEO/AEO pages: a direct answer at the
 * top, the body, optional FAQs (with FAQPage schema), related links and a CTA.
 */
export default function AnswerPage({
  path,
  eyebrow,
  title,
  answer,
  updated,
  faqs,
  children,
}: {
  path: string;
  eyebrow: string;
  title: string;
  answer: React.ReactNode;
  updated?: string;
  faqs?: Faq[];
  children?: React.ReactNode;
}) {
  const faqJsonLd =
    faqs && faqs.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-page px-6 py-16">
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}

        <article className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wide text-warmbrown">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-cocoa md:text-5xl">
            {title}
          </h1>
          {updated && (
            <p className="mt-3 text-sm text-warmbrown">Updated {updated}</p>
          )}

          <div className="mt-8 rounded-card border border-sand bg-cream p-6 text-lg text-cocoa">
            <p className="text-sm font-medium uppercase tracking-wide text-coral">
              Short answer
            </p>
            <div className="mt-2">{answer}</div>
          </div>

          {children && <div className="answer-body mt-12 space-y-12">{children}</div>}

          {faqs && faqs.length > 0 && (
            <section aria-labelledby="faq-heading" className="mt-16">
              <h2 id="faq-heading" className="text-2xl font-bold text-cocoa md:text-3xl">
                Common questions
              </h2>
              <dl className="mt-6 divide-y divide-sand border-y border-sand">
                {faqs.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="text-lg font-bold text-cocoa">{f.q}</dt>
                    <dd className="mt-2 text-base text-warmbrown">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section className="mt-16 rounded-card bg-coraltint p-8 text-center">
            <p className="text-xl font-bold text-cocoa">Try Pixley free for 7 days</p>
            <p className="mt-2 text-warmbrown">For iPhone and iPad.</p>
            <div className="mt-6 flex justify-center">
              <AppStoreButton />
            </div>
          </section>

          <nav aria-label="Related" className="mt-12">
            <p className="text-sm font-medium uppercase tracking-wide text-warmbrown">
              Related
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {RELATED.filter((r) => r.href !== path).map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="text-coral hover:underline">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-2xl font-bold text-cocoa md:text-3xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-lg text-warmbrown">{children}</div>
    </section>
  );
}

export function CompareTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-card border border-sand">
      <table className="w-full min-w-[560px] border-collapse text-left text-base">
        <thead className="bg-cream">
          <tr>
            {columns.map((c, i) => (
              <th
                key={c || i}
                scope="col"
                className={`border-b border-sand px-4 py-3 font-bold text-cocoa ${
                  i === 1 ? "text-coral" : ""
                }`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="border-b border-sand last:border-b-0">
              {r.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="px-4 py-3 font-medium text-cocoa">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="px-4 py-3 text-warmbrown">
                    {cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
