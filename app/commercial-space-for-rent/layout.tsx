import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Commercial Space for Rent in Coimbatore | CovaiTech Park",
  description: "Prime commercial spaces for rent in Coimbatore. Ideal for businesses looking for flexible, well-connected, and premium workspace solutions.",
  alternates: {
    canonical: "https://covaitechpark.com/covaitechpark/commercial-space-for-rent",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
