import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Managed Office Space for Rent in Coimbatore | CovaiTech Park",
  description: "Customizable, enterprise-grade managed office spaces in Coimbatore. Let CovaiTech Park handle your workspace setup, IT, and maintenance.",
  alternates: {
    canonical: "https://covaitechpark.com/covaitechpark/managed-office",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
