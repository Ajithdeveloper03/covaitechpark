import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Covai Tech Park | Book Your Workspace Today",
  description: "Get in touch with Covai Tech Park to book your coworking space, private cabin, or managed office in Coimbatore and Trichy.",
  alternates: {
    canonical: "https://covaitechpark.com/covaitechpark/contact",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
