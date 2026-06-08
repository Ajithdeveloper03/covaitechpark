import React from "react";
import BlogDetailContent from "./BlogDetailContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <BlogDetailContent slug={slug} />;
}

// Generate static params for output: export
export function generateStaticParams() {
  return [
    { slug: "future-of-coworking-spaces-in-coimbatore" },
    { slug: "maximizing-productivity-in-private-office-cabins" },
    { slug: "why-virtual-offices-are-essential-for-startups" },
  ];
}
