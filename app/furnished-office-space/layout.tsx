import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Furnished Office Space for Rent in Coimbatore | Covai Tech Park",
  description: "Move-in ready furnished office spaces for rent in Coimbatore. Zero setup hassle, premium ergonomic furniture, and instant plug-and-play access.",
  alternates: {
    canonical: "https://covaitechpark.com/covaitechpark/furnished-office-space",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
