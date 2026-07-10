import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Hot Desk & Shared Coworking Workspace in Coimbatore | Covai Tech Park",
  description: "Discover flexible hot desks and one day office spaces in Coimbatore at Covai Tech Park. Join our coworking network with premium amenities.",
  alternates: {
    canonical: "https://covaitechpark.com/hot-desk",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
