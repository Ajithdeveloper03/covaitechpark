import type { Metadata } from 'next';
import Script from 'next/script';

const PAGE_URL = 'https://covaitechpark.com/coworking-space-in-coimbatore';
const BASE_URL = 'https://covaitechpark.com';

export const metadata: Metadata = {
  title: 'Coworking Space in Coimbatore | Flexible Desks & Offices | Covai Tech Park',
  description:
    'Find premium coworking spaces in Coimbatore at Covai Tech Park. Flexible hot desks, dedicated desks, private cabins, high-speed Wi-Fi, 24/7 access & a thriving professional community. Join 100+ companies today.',
  keywords: [
    'coworking space in coimbatore',
    'coworking space coimbatore',
    'shared office space coimbatore',
    'hot desk coimbatore',
    'dedicated desk coimbatore',
    'flexible office coimbatore',
    'day office coimbatore',
    'coworking nehru nagar coimbatore',
    'coworking space near me coimbatore',
    'best coworking space coimbatore',
    'affordable coworking coimbatore',
    'startup office coimbatore',
    'freelancer workspace coimbatore',
    'Covai Tech Park coworking',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Coworking Space in Coimbatore | Covai Tech Park',
    description:
      'Premium coworking spaces with hot desks, dedicated desks & private offices at Covai Tech Park, Coimbatore. 100+ companies, 500+ seats, 4.9★ on Google.',
    url: PAGE_URL,
    siteName: 'Covai Tech Park',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Coworking Space in Coimbatore — Covai Tech Park',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coworking Space in Coimbatore | Covai Tech Park',
    description:
      'Flexible coworking desks, private offices & hot desks at Covai Tech Park, Coimbatore. 100+ companies. Book a tour today.',
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
};

const coworkingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CoworkingSpace',
  name: 'Covai Tech Park — Coworking Space in Coimbatore',
  url: PAGE_URL,
  logo: `${BASE_URL}/covai-tech-park-logo.png`,
  image: `${BASE_URL}/og-image.png`,
  description:
    'Premium coworking space in Coimbatore offering hot desks, dedicated desks, private cabin suites, and virtual office addresses at Nehru Nagar East, Coimbatore.',
  telephone: '+91-9876543210',
  email: 'hello@covaitechpark.com',
  priceRange: '₹₹',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '85',
    bestRating: '5',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Nehru Nagar East',
    addressLocality: 'Coimbatore',
    addressRegion: 'Tamil Nadu',
    postalCode: '641006',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '11.0168',
    longitude: '76.9558',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'High-Speed Wi-Fi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Power Backup', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'CCTV Surveillance', value: true },
    { '@type': 'LocationFeatureSpecification', name: '24/7 Building Security', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Front Desk Support', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Dining Area', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Break-Out Area', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Mail & Package Handling', value: true },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Coworking Plans',
    itemListElement: [
      { '@type': 'Offer', name: 'Hot Desk', description: 'Flexible daily or monthly shared desk — no fixed seat.' },
      { '@type': 'Offer', name: 'Dedicated Desk', description: 'Your own permanent desk in our shared coworking floor.' },
      { '@type': 'Offer', name: 'Private Cabin Suite', description: 'Lockable, soundproof private office room for teams.' },
      { '@type': 'Offer', name: 'Virtual Office & GST Address', description: 'Prestige business address for GST & company registration.' },
    ],
  },
  sameAs: [BASE_URL],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Coworking Space in Coimbatore', item: PAGE_URL },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is there an option to book a coworking space for one day in Coimbatore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, the shared workspace can be booked for a day in Coimbatore. The terms for using the workspace are highly flexible to meet your short-term and long-term office space needs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is dedicated desk different from hot desk plan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With a dedicated desk plan, you get a specific spot to work during your membership period. With a hot desk, you get a work desk in an unreserved spot.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the types of workspace available at Covai Tech Park in Coimbatore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dedicated desk, hot desk, private office space, virtual office, managed office, and meeting rooms are available at Covai Tech Park, Coimbatore.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there 24/7 access to the coworking space facility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, Covai Tech Park's coworking space facility is accessible 24/7.",
      },
    },
    {
      '@type': 'Question',
      name: 'Who can benefit from coworking space?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Coworking spaces in Coimbatore are best suited for entrepreneurs, remote workers, freelancers, small-medium enterprises, startups, and professionals who want to be part of a dynamic community.',
      },
    },
  ],
};

export default function CoworkingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="json-ld-coworking"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coworkingJsonLd) }}
        strategy="beforeInteractive"
      />
      <Script
        id="json-ld-breadcrumb-coworking"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        strategy="beforeInteractive"
      />
      <Script
        id="json-ld-faq-coworking"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
}
