import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full border-b border-sand bg-cream">
      <div className="mx-auto flex max-w-page items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Pixley home">
          <Image
            src="/logo.png"
            alt="Pixley"
            width={400}
            height={165}
            priority
            className="h-10 w-auto md:h-12"
          />
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            href="/contact"
            className="rounded-full px-4 py-2 text-sm font-medium text-cocoa hover:bg-sand/60 transition-colors"
          >
            Contact
          </Link>
          <a
            href="#download"
            className="rounded-full bg-coral px-5 py-2 text-sm font-bold text-cream hover:opacity-90 transition-opacity"
          >
            Download
          </a>
        </nav>
      </div>
    </header>
  );
}
