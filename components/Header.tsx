import Link from "next/link";
import Image from "next/image";
import AppStoreButton from "@/components/AppStoreButton";

export default function Header() {
  return (
    <header className="w-full border-b border-sand bg-cream">
      <div className="mx-auto flex max-w-page items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Pixley home">
          <Image
            src="/logo.png"
            alt="Pixley"
            width={400}
            height={165}
            priority
            className="h-9 w-auto sm:h-12 md:h-16"
          />
        </Link>
        <nav className="flex items-center gap-1.5 sm:gap-3">
          <Link
            href="/blog"
            className="rounded-full px-3 py-2 text-sm font-medium text-cocoa hover:bg-sand/60 transition-colors sm:px-4"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="rounded-full px-3 py-2 text-sm font-medium text-cocoa hover:bg-sand/60 transition-colors sm:px-4"
          >
            Contact
          </Link>
          <AppStoreButton label="Download" variant="small" />
        </nav>
      </div>
    </header>
  );
}
