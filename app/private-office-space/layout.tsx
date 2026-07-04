import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Private Office Space & Cabin Suites in Coimbatore | CovaiTech",
  description: "Rent lockable, fully furnished private office suites in Coimbatore. Secure, private cabins tailored for growing teams and startups at CovaiTech Park.",
  alternates: {
    canonical: "https://covaitechpark.com/covaitechpark/private-office-space",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
