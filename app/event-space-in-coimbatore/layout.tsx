import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Event Spaces & Corporate Venues in Coimbatore | Covai Tech Park",
  description: "Host your next corporate event, workshop, or seminar in our premium event spaces in Coimbatore. Flexible layouts and state-of-the-art facilities.",
  alternates: {
    canonical: "https://covaitechpark.com/covaitechpark/event-space-in-coimbatore",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
