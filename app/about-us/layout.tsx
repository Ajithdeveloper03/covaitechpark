import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us | CovaiTech Park & Max Office",
  description: "Learn about CovaiTech Park, Coimbatore's premier tech park and coworking space provider. Discover our mission to empower startups and enterprises.",
  alternates: {
    canonical: "https://covaitechpark.com/covaitechpark/about-us",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
