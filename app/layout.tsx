import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const BASE_URL = "https://covaitechpark.com/covaitechpark";

export const metadata: Metadata = {
  metadataBase: new URL("https://covaitechpark.com"),
  icons: {
    icon: "/covai-tech-park-logo.png",
    shortcut: "/covai-tech-park-logo.png",
    apple: "/covai-tech-park-logo.png",
  },
  title: {
    default: "CovaiTech Park | Premium Coworking Space & Offices in Coimbatore",
    template: "%s | CovaiTech Park",
  },
  description:
    "CovaiTech Park offers premium coworking spaces, private cabin suites, hot desks, meeting rooms, and virtual office addresses in Coimbatore (Nehru Nagar) and Trichy (Thillai Nagar). Join 100+ companies thriving at India's best tech coworking park.",
  keywords: [
    "coworking space coimbatore",
    "office space for rent coimbatore",
    "private cabin coimbatore",
    "shared office space coimbatore",
    "hot desk coimbatore",
    "virtual office coimbatore gst address",
    "meeting rooms coimbatore",
    "coworking trichy",
    "managed office space",
    "tech park coimbatore",
    "CovaiTech Park",
    "Max Office Coimbatore",
    "startup office coimbatore",
    "dedicated desk nehru nagar",
    "coworking space thillai nagar",
  ],
  authors: [{ name: "CovaiTech Park" }],
  creator: "CovaiTech Park",
  publisher: "CovaiTech Park",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "CovaiTech Park | Premium Coworking & Managed Offices — Coimbatore",
    description:
      "State-of-the-art coworking spaces, private cabins, and managed meeting rooms in Coimbatore & Trichy. Flexible plans for startups and enterprises.",
    type: "website",
    url: BASE_URL,
    siteName: "CovaiTech Park",
    locale: "en_IN",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "CovaiTech Park — Premium Coworking Space Coimbatore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CovaiTech Park | Premium Coworking in Coimbatore",
    description:
      "Premium managed coworking spaces, private cabins & virtual offices in Coimbatore and Trichy. Join CovaiTech Park today.",
    images: [`${BASE_URL}/og-image.png`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "CoworkingSpace"],
  name: "CovaiTech Park",
  alternateName: "Max Office Coimbatore",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/og-image.png`,
  description:
    "Premium managed coworking spaces, private cabins, hot desks, meeting rooms and virtual office in Coimbatore and Trichy.",
  telephone: "+919360780768",
  email: "info@covaitechpark.com",
  priceRange: "₹₹",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Nehru Nagar East",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      postalCode: "641006",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Thillai Nagar",
      addressLocality: "Trichy",
      addressRegion: "Tamil Nadu",
      postalCode: "620018",
      addressCountry: "IN",
    },
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: "11.0168",
    longitude: "76.9558",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "22:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Workspace Plans",
    itemListElement: [
      { "@type": "Offer", name: "Hot Desk", description: "Flexible daily/monthly hot desk access" },
      { "@type": "Offer", name: "Dedicated Desk", description: "Your own permanent desk in shared space" },
      { "@type": "Offer", name: "Private Cabin Suite", description: "Lockable, soundproof private office room" },
      { "@type": "Offer", name: "Virtual Office & GST Address", description: "Business address for company registration" },
    ],
  },
  sameAs: [
    "https://covaitechpark.com",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <Script
          id="json-ld-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-brand-navy" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
