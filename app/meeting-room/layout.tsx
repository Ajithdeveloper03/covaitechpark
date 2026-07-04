import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Book Meeting Rooms & Conference Spaces in Coimbatore | CovaiTech",
  description: "Professional meeting rooms and conference spaces in Coimbatore. Equipped with high-speed Wi-Fi, projectors, and premium amenities.",
  alternates: {
    canonical: "https://covaitechpark.com/covaitechpark/meeting-room",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
