import Link from "next/link";
import { APP_STORE_URL } from "@/lib/appstore";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-sand bg-cream">
      <div className="mx-auto max-w-page px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <Link href="/" aria-label="Pixley home">
              <img
                src="/logo.png"
                alt="Pixley"
                width={400}
                height={165}
                className="mx-auto h-14 w-auto md:mx-0"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-warmbrown">
              Where the parent controls the content
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm"
          >
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener"
              className="font-medium text-coral hover:underline"
            >
              Download on the App Store
            </a>
            <Link
              href="/blog"
              className="text-cocoa hover:text-coral transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-cocoa hover:text-coral transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-cocoa hover:text-coral transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/faq"
              className="text-cocoa hover:text-coral transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/privacypolicy"
              className="text-cocoa hover:text-coral transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/tos"
              className="text-cocoa hover:text-coral transition-colors"
            >
              Terms of Service
            </Link>
          </nav>
        </div>

        <nav
          aria-label="Guides"
          className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:justify-start"
        >
          <Link href="/block-youtube-shorts-for-kids" className="text-warmbrown hover:text-coral transition-colors">
            Block YouTube Shorts for kids
          </Link>
          <Link href="/youtube-kids-alternative" className="text-warmbrown hover:text-coral transition-colors">
            YouTube Kids alternative
          </Link>
          <Link href="/pixley-vs-youtube-kids" className="text-warmbrown hover:text-coral transition-colors">
            Pixley vs YouTube Kids
          </Link>
          <Link href="/pixley-vs-bark-qustodio" className="text-warmbrown hover:text-coral transition-colors">
            Pixley vs Bark and Qustodio
          </Link>
        </nav>

        <div className="mt-10 border-t border-sand pt-6 text-center text-xs text-warmbrown">
          © {new Date().getFullYear()} Pixley. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
