import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Gallery | Covai Tech Park Workspaces",
  description: "Take a tour of Covai Tech Park's premium workspaces, meeting rooms, and private cabins in Coimbatore and Trichy.",
  alternates: {
    canonical: "https://covaitechpark.com/gallery",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
