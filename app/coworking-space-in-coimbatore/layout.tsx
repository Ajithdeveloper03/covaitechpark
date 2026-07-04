import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Premium Coworking Space in Coimbatore | CovaiTech Park",
  description: "Discover vibrant, fully managed coworking spaces in Coimbatore. Flexible hot desks, high-speed internet, and a thriving community at CovaiTech Park.",
  alternates: {
    canonical: "https://covaitechpark.com/covaitechpark/coworking-space-in-coimbatore",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
