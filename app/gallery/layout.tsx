import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Gallery | CovaiTech Park Workspaces",
  description: "Take a tour of CovaiTech Park's premium workspaces, meeting rooms, and private cabins in Coimbatore and Trichy.",
  alternates: {
    canonical: "https://covaitechpark.com/covaitechpark/gallery",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
