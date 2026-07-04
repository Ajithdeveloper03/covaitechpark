import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CovaiTech Park Branches in Coimbatore | Nehru Nagar & More",
  description: "Explore CovaiTech Park's premium workspace locations across Coimbatore, including Nehru Nagar (SITRA), Saravanampatti, and Broadview.",
  alternates: {
    canonical: "https://covaitechpark.com/covaitechpark/coimbatore",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
