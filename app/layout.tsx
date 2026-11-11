import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { APP_STORE_ID, APP_STORE_URL } from "@/lib/appstore";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usepixley.com"),
  title: {
    default: "Pixley — Parental Controls for YouTube Shorts",
    template: "%s | Pixley",
  },
  description:
    "Pixley is an app where kids watch YouTube videos and Shorts only from channels their parent has approved, with time limits, the ability to disable Shorts and no algorithm.",
  keywords: [
    "parental controls",
    "kid safe shorts",
    "block youtube shorts",
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
    title: "Pixley — Parental Controls for YouTube Shorts",
    description:
      "Pixley is an app where kids watch YouTube videos and Shorts only from channels their parent has approved, with time limits, the ability to disable Shorts and no algorithm.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pixley — Parental Controls for YouTube Shorts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixley — Parental Controls for YouTube Shorts",
    description:
      "Pixley is an app where kids watch YouTube videos and Shorts only from channels their parent has approved, with time limits, the ability to disable Shorts and no algorithm.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://usepixley.com",
  },
  // Smart App Banner: Safari on iPhone/iPad shows an "Open" / "Get" bar for Pixley.
  itunes: {
    appId: APP_STORE_ID,
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
      "Pixley is an app where kids watch YouTube videos and Shorts only from channels their parent has approved, with time limits, the ability to disable Shorts and no algorithm.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@usepixley.com",
      contactType: "customer support",
    },
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "Pixley - Parent Controls",
    alternateName: "Pixley",
    operatingSystem: "iOS, iPadOS",
    applicationCategory: "EducationalApplication",
    downloadUrl: APP_STORE_URL,
    installUrl: APP_STORE_URL,
    description:
      "Pixley is an app where kids watch YouTube videos and Shorts only from channels their parent has approved, with time limits, the ability to disable Shorts and no algorithm.",
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
        {/* Google tag (gtag.js) — loads on every page via root layout.
            Loads once, then configures both Google Ads (AW-) and GA4 (G-). */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18168714092"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18168714092');
            gtag('config', 'G-D1WSEMMHGF');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
