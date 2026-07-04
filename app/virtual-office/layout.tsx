import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Virtual Office & GST Registration Address in Coimbatore | CovaiTech",
  description: "Get a prestigious business address in Coimbatore for GST and company registration. Mail handling and professional virtual office services.",
  alternates: {
    canonical: "https://covaitechpark.com/covaitechpark/virtual-office",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
