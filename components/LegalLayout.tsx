import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LegalLayout({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold text-cocoa md:text-5xl">{title}</h1>
        <p className="mt-2 text-sm text-warmbrown">
          Effective date: {effectiveDate}
        </p>
        <div className="prose-pixley mt-10 space-y-6 text-cocoa">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
