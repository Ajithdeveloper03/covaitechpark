import type { Metadata, Viewport } from "next";
import Script from "next/script";
import FloatingNav from "./components/FloatingNav";
import "./globals.css";
import { contactInfo } from "./config/contactInfo";

const BASE_URL = "https://covaitechpark.com";

export const metadata: Metadata = {
  metadataBase: new URL("https://covaitechpark.com"),

  title: {
    default: "Covai Tech Park | Premium Coworking Space & Offices in Coimbatore",
    template: "%s | Covai Tech Park",
  },
  description:
    "Covai Tech Park offers premium coworking spaces, private cabin suites, hot desks, meeting rooms, and virtual office addresses in Coimbatore (Nehru Nagar) and Trichy (Thillai Nagar). Join 100+ companies thriving at India's best tech coworking park.",
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
    "Covai Tech Park",
    "Max Office Coimbatore",
    "startup office coimbatore",
    "dedicated desk nehru nagar",
    "coworking space thillai nagar",
  ],
  authors: [{ name: "Covai Tech Park" }],
  creator: "Covai Tech Park",
  publisher: "Covai Tech Park",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [
      { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
    other: [
      { rel: "mask-icon", url: "/favicon.png", color: "#f03a17" },
    ],
  },
  category: "Business",
  classification: "Coworking Space, Office Space, Real Estate",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Covai Tech Park | Premium Coworking & Managed Offices — Coimbatore",
    description:
      "State-of-the-art coworking spaces, private cabins, and managed meeting rooms in Coimbatore & Trichy. Flexible plans for startups and enterprises.",
    type: "website",
    url: BASE_URL,
    siteName: "Covai Tech Park",
    locale: "en_IN",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Covai Tech Park — Premium Coworking Space Coimbatore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Covai Tech Park | Premium Coworking in Coimbatore",
    description:
      "Premium managed coworking spaces, private cabins & virtual offices in Coimbatore and Trichy. Join Covai Tech Park today.",
    images: [`${BASE_URL}/og-image.png`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1c" },
  ],
  colorScheme: "light dark",
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "CoworkingSpace"],
  name: "Covai Tech Park",
  alternateName: "Max Office Coimbatore",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/og-image.png`,
  description:
    "Premium managed coworking spaces, private cabins, hot desks, meeting rooms and virtual office in Coimbatore and Trichy.",
  telephone: contactInfo.phone1.raw,
  email: contactInfo.email,
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
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N72BS53');`,
          }}
        />
        <Script
          id="json-ld-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-brand-navy pb-[76px] md:pb-0" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N72BS53"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <FloatingNav />
        {children}
        {/* Sticky Mobile Call Button */}
        <div className="fixed bottom-0 left-0 w-full z-[100] md:hidden p-2.5 bg-white/85 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-2 gap-3">
            <a href="/contact" className="flex items-center justify-center w-full gap-2 py-3 bg-slate-800 text-white font-medium text-[13px] tracking-wider rounded-lg shadow-md transition-transform active:scale-[0.98]" >
              Get Quote
            </a>
            <a href={`tel:${contactInfo.phone1.raw}`} className="flex items-center justify-center w-full gap-2 py-3 bg-brand-orange text-white font-medium text-[13px] tracking-wider rounded-lg shadow-lg shadow-brand-orange/30 transition-transform active:scale-[0.98]" >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
