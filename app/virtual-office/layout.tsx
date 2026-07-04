import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Office Address for GST & Company Registration | CovaiTech Park",
  description: "Get a premium virtual office address in Coimbatore for GST and company registration. Enjoy mail handling, prime location, and meeting room access.",
  alternates: {
    canonical: "https://covaitechpark.com/covaitechpark/virtual-office-space",
  }
};

export default function VirtualOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
