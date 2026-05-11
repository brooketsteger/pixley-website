import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Pixley team. Email support@usepixley.com for help, or privacy@usepixley.com for privacy questions.",
  alternates: { canonical: "https://usepixley.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-page px-6 py-16">
        <h1 className="text-4xl font-bold text-cocoa md:text-5xl">Contact</h1>
        <p className="mt-4 max-w-xl text-lg text-warmbrown">
          We&rsquo;d love to hear from you. Reach out with questions, feedback,
          or partnership ideas.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <ContactCard
            label="General support"
            email="support@usepixley.com"
            blurb="Account help, technical issues, or anything else."
          />
          <ContactCard
            label="Privacy"
            email="privacy@usepixley.com"
            blurb="Questions about how we handle your or your child&rsquo;s data."
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

function ContactCard({
  label,
  email,
  blurb,
}: {
  label: string;
  email: string;
  blurb: string;
}) {
  return (
    <article className="rounded-card border border-sand bg-cream p-6">
      <p className="text-sm font-medium uppercase tracking-wide text-warmbrown">
        {label}
      </p>
      <a
        href={`mailto:${email}`}
        className="mt-2 block text-2xl font-bold text-coral hover:underline"
      >
        {email}
      </a>
      <p
        className="mt-3 text-sm text-warmbrown"
        dangerouslySetInnerHTML={{ __html: blurb }}
      />
    </article>
  );
}
