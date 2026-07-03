import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Workspace Advice | Blog - CovaiTech Park",
  // You can add a description here later if needed
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
