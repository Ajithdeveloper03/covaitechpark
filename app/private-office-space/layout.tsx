import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Private Office Space & Cabin Suites in Coimbatore | Covai Tech",
  description: "Rent lockable, fully furnished private office suites in Coimbatore. Secure, private cabins tailored for growing teams and startups at Covai Tech Park.",
  alternates: {
    canonical: "https://covaitechpark.com/covaitechpark/private-office-space",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
