import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Space For Rent in Coimbatore | CovaiTech Park",
  description: "Find the ideal commercial office space in Coimbatore. Fully furnished, flexible contracts, prime location, and managed services for startups and enterprises.",
  alternates: {
    canonical: "https://covaitechpark.com/covaitechpark/commercial-space-for-rent",
  }
};

export default function CommercialSpaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
