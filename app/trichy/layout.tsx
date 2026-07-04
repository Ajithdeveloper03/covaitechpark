import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Trichy Coworks by Max Office | Premium Coworking in Trichy",
  description: "Premium coworking space, private cabins, and virtual offices in Thillai Nagar, Trichy. A unit of Max Office offering top-tier workspace solutions.",
  alternates: {
    canonical: "https://covaitechpark.com/covaitechpark/trichy",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
