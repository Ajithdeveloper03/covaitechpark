"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BASE_PATH = "";
const prefix = (url: string) => `${BASE_PATH}${url}`;
const getImgUrl = (img: string) => img.startsWith("http") || img.startsWith("/") ? img : prefix(img);

const CATEGORIES = ["All", "Coworking Insights", "Workspace Tips", "Business Growth", "Event Highlights", "Community Stories", "Industry News"];

const categoryColors: Record<string, string> = {
  "Coworking Insights": "bg-[#f37021]/10 text-[#f37021] border-[#f37021]/20",
  "Workspace Tips": "bg-[#0a0f1a]/10 text-[#0a0f1a] border-[#0a0f1a]/20",
  "Business Growth": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Event Highlights": "bg-purple-50 text-purple-700 border-purple-200",
  "Community Stories": "bg-blue-50 text-blue-700 border-blue-200",
  "Industry News": "bg-slate-100 text-slate-700 border-slate-200",
  "Tech & Innovation": "bg-cyan-50 text-cyan-700 border-cyan-200",
  "Announcements": "bg-rose-50 text-rose-700 border-rose-200",
};

export default function BlogArchivePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const mapped = data.map((blog: any, i: number) => {
              const rawImg = blog.image;
              let resolvedImg = "/workspace-lounge.png";
              if (rawImg) {
                if (rawImg.startsWith("http") || rawImg.startsWith("/")) {
                  resolvedImg = rawImg;
                } else {
                  resolvedImg = `${process.env.NEXT_PUBLIC_STORAGE_URL}/${rawImg}`;
                }
              }
              return {
                id: blog.id,
                slug: blog.slug,
                title: blog.title,
                category: blog.category || "Coworking Insights",
                date: new Date(blog.published_at || blog.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                }),
                readTime: `${Math.max(3, Math.ceil(JSON.stringify(blog.content || "").length / 1000))} min read`,
                img: resolvedImg,
                featured: i === 0,
                snippet: blog.excerpt ?? "",
                author: "Covai Tech Park Team",
                authorImg: prefix("/favicon.png")
              };
            });
            setArticles(mapped);
          }
        }
      } catch (e) {
        console.error("Error fetching blogs from API", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filtered = activeCategory === "All"
    ? articles
    : articles.filter(a => a.category === activeCategory);

  const featured = filtered.find(a => a.featured) || filtered[0];
  const rest = filtered.filter(a => a.slug !== featured?.slug);

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 flex flex-col font-sans relative select-none antialiased">
      <Header />

      {/* ── LIGHT CLEAN HERO WITH BG IMAGE ── */}
      <section id="hero" className="relative min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] flex flex-col justify-end items-center pt-28 sm:pt-36 md:pt-40 pb-10 sm:pb-16 overflow-hidden bg-slate-900 border-b border-slate-800">
        <div className="absolute inset-0">
          <Image src={prefix("/workspace-lounge.png")} alt="Blog background" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow */}
          <div className="flex justify-center items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-[10px] font-bold tracking-[0.2em] ">
              Covai Tech Journal
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-bold tracking-tight text-white leading-[1.05] mb-4 sm:mb-6">
            Workspace <span className="text-[#f37021] font-medium">Insights</span> & Ideas
          </h1>
          <p className="text-white/70 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            Explore modern office design trends, startup strategies, remote infrastructure advice, and workspace management expertise from our team.
          </p>


        </div>
      </section>

      {/* ── ARTICLES ── */}
      <section id="articles" className="py-12 sm:py-16 md:py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 xl:px-16 space-y-10 sm:space-y-16">

          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[13px] sm:text-sm font-bold tracking-wide transition-all duration-300 ${activeCategory === cat
                  ? "bg-[#f37021] text-white shadow-lg shadow-[#f37021]/30 -translate-y-0.5"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:border-[#f37021]/50 hover:text-[#f37021] hover:bg-white"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f37021]"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">No blogs found</h2>
              <p className="text-slate-500">There are no articles available in this category yet.</p>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featured && (
                <Link
                  href={`/blog/article?slug=${featured.slug}`}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white border border-slate-200/80 rounded-[2rem] overflow-hidden hover:border-[#f37021]/30 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 block"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
                    <Image
                      src={getImgUrl(featured.img)}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060d17]/30 via-transparent to-transparent" />
                    <span className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-[#f37021] text-white text-[10px] font-bold tracking-widest shadow">
                      Featured
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 lg:p-14 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider border ${categoryColors[featured.category] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
                          {featured.category}
                        </span>
                        <span className="text-slate-400 text-xs font-medium">{featured.readTime}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight group-hover:text-[#f37021] transition-colors duration-300 mb-5">
                        {featured.title}
                      </h2>
                      <p className="text-slate-500 text-base leading-relaxed font-normal">
                        {featured.snippet}
                      </p>
                    </div>

                    <div className="mt-10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden relative border-2 border-slate-100">
                          <Image src={featured.authorImg} alt={featured.author} fill className="object-contain" sizes="40px" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-700">{featured.author}</p>
                          <p className="text-[11px] text-slate-400">{featured.date}</p>
                        </div>
                      </div>
                      <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#f37021] group-hover:gap-3 transition-all">
                        Read Article
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid cards */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                  {rest.map(article => (
                    <Link
                      key={article.slug}
                      href={`/blog/article?slug=${article.slug}`}
                      className="group bg-white border border-slate-200/80 rounded-[1.5rem] overflow-hidden hover:border-[#f37021]/30 hover:shadow-xl hover:shadow-slate-200 hover:-translate-y-1.5 transition-all duration-400 flex flex-col"
                    >
                      {/* Image */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden">
                        <Image
                          src={getImgUrl(article.img)}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060d17]/20 to-transparent" />
                      </div>

                      <div className="p-7 flex flex-col flex-1 justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border ${categoryColors[article.category] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
                              {article.category}
                            </span>
                            <span className="text-slate-400 text-[11px]">{article.readTime}</span>
                          </div>
                          <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-[#f37021] transition-colors duration-300">
                            {article.title}
                          </h3>
                          <p className="text-slate-500 text-sm leading-relaxed font-normal">
                            {article.snippet}
                          </p>
                        </div>

                        <div className="mt-7 pt-5 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full overflow-hidden relative border border-slate-100">
                              <Image src={article.authorImg} alt={article.author} fill className="object-contain" sizes="30px" />
                            </div>
                            <p className="text-[11px] text-slate-400">{article.date}</p>
                          </div>
                          <span className="text-[#f37021] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 group-hover:gap-2 transition-all">
                            Read
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER STRIP ── */}

      <Footer />
    </div>
  );
}
