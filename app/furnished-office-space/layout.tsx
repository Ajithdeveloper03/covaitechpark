import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flexible Furnished Office Space in Coimbatore - Covaitechpark",
  // You can add a description here later if needed
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
