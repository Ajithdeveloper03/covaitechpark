import React, { Suspense } from "react";
import BlogDetailContent from "./BlogDetailContent";

export default function BlogArticlePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f37021]"></div>
      </div>
    }>
      <BlogDetailContent />
    </Suspense>
  );
}
