import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usepixley.com"),
  title: {
    default: "Pixley — Parental Controls for Shorts & Reels",
    template: "%s | Pixley",
  },
  description:
    "Pixley is a kid-safe streaming app where parents approve every channel and creator. No algorithm, no suggested content — just the videos you've said yes to.",
  keywords: [
    "parental controls",
    "kid safe shorts",
    "kid safe reels",
    "youtube for kids",
    "screen time",
    "parent approved content",
    "child safe streaming",
    "no algorithm",
    "Pixley",
  ],
  authors: [{ name: "Pixley" }],
  creator: "Pixley",
  publisher: "Pixley",
  category: "Family & Parenting",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://usepixley.com",
    siteName: "Pixley",
    title: "Pixley — Parental Controls for Shorts & Reels",
    description:
      "A kid-safe streaming app where parents approve every channel and creator. No algorithm, no suggested content.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pixley — Parental Controls for Shorts & Reels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixley — Parental Controls for Shorts & Reels",
    description:
      "A kid-safe streaming app where parents approve every channel and creator.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://usepixley.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD structured data — improves AEO (Answer Engine Optimization)
  // so AI search tools (ChatGPT, Perplexity, Google AI Overviews, etc.)
  // can describe Pixley accurately when asked about parental control apps.
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pixley",
    url: "https://usepixley.com",
    logo: "https://usepixley.com/logo.png",
    description:
      "Pixley is a kid-safe streaming platform where parents control every channel and content source available to their children.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@usepixley.com",
      contactType: "customer support",
    },
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "Pixley",
    operatingSystem: "iOS",
    applicationCategory: "FamilyApplication",
    description:
      "Parental controls for short-form video. Parents approve every creator. No algorithm, no suggested content.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    audience: {
      "@type": "PeopleAudience",
      suggestedMinAge: 4,
      suggestedMaxAge: 12,
    },
  };

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </head>
      <body className="font-sans bg-cream text-cocoa antialiased">
        {children}
      </body>
    </html>
  );
}
