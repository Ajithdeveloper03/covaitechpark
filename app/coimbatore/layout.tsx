import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Shared Office For Rent in Coimbatore | Coworking Space",
  // You can add a description here later if needed
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
