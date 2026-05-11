import Link from "next/link";

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
            {/* Inactive placeholder items — kept for layout parity with Figma Sites */}
            <span className="text-warmbrown/70">Blog</span>
            <span className="text-warmbrown/70">About Us</span>
            <Link
              href="/contact"
              className="text-cocoa hover:text-coral transition-colors"
            >
              Contact
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

        <div className="mt-10 border-t border-sand pt-6 text-center text-xs text-warmbrown">
          © {new Date().getFullYear()} Pixley. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
