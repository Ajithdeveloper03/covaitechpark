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
export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
    if (!res.ok) throw new Error("Fetch failed");
    const blogs = await res.json();
    return blogs.map((b: any) => ({ slug: b.slug }));
  } catch (error) {
    return [
      { slug: "future-of-coworking-spaces-in-coimbatore" },
      { slug: "maximizing-productivity-in-private-office-cabins" },
      { slug: "why-virtual-offices-are-essential-for-startups" },
    ];
  }
}
