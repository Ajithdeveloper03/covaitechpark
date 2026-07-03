import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ready-to-use Private Office Cabin Space for Rent - Covai Tech Park",
  // You can add a description here later if needed
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
