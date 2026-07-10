import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog | Insights on Coworking and Future of Work",
  description: "Read the latest articles, insights, and news about coworking spaces, startup culture, and the future of work from Covai Tech Park.",
  alternates: {
    canonical: "https://covaitechpark.com/blog",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
