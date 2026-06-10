"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

const ARTICLES = [
  {
    slug: "future-of-coworking-spaces-in-coimbatore",
    title: "The Future of Managed Coworking Spaces in Coimbatore",
    category: "Workspace",
    date: "June 4, 2026",
    readTime: "5 min read",
    img: "/workspace-lounge.png",
    featured: true,
    snippet: "How hybrid models, premium modular cabins, and smart tech parks are reshaping the corporate ecosystem in Coimbatore's thriving tech corridors.",
    author: "CovaiTech Team",
    authorImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
  },
  {
    slug: "maximizing-productivity-in-private-office-cabins",
    title: "Maximizing Productivity in Soundproof Private Cabins",
    category: "Productivity",
    date: "May 28, 2026",
    readTime: "4 min read",
    img: "/workspace-cabin.png",
    featured: false,
    snippet: "A deep dive into UX-driven workspace ergonomics, acoustic privacy, and how dedicated cabin structures accelerate business outputs.",
    author: "CovaiTech Team",
    authorImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80"
  },
  {
    slug: "why-virtual-offices-are-essential-for-startups",
    title: "Why Virtual Offices are Essential for Modern Startups",
    category: "Business",
    date: "May 15, 2026",
    readTime: "3 min read",
    img: "/workspace-meeting.png",
    featured: false,
    snippet: "How virtual mailing addresses and professional phone handling help companies register for GST and build credibility remotely.",
    author: "CovaiTech Team",
    authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
  }
];

const CATEGORIES = ["All", "Workspace", "Productivity", "Business"];

const categoryColors: Record<string, string> = {
  Workspace: "bg-sky-50 text-sky-700 border-sky-200",
  Productivity: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Business: "bg-violet-50 text-violet-700 border-violet-200",
};

export default function BlogArchivePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    document.title = "Insights & Workspace Advice | Blog - CovaiTech Park";
  }, []);

  const filtered = activeCategory === "All"
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  const featured = filtered.find(a => a.featured) || filtered[0];
  const rest = filtered.filter(a => a.slug !== featured?.slug);

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 flex flex-col font-sans relative select-none antialiased">
      <Header ctaText="Write Message" />

                  {/* ── LIGHT CLEAN HERO WITH BG IMAGE ── */}
      <section className="relative min-h-[50vh] flex flex-col justify-end items-center pt-40 pb-16 overflow-hidden bg-slate-900 border-b border-slate-800">
        <div className="absolute inset-0">
          <Image src={prefix("/workspace-lounge.png")} alt="Blog background" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <div className="flex justify-center items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase">
              CovaiTech Journal
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-white leading-[1.05] mb-6">
            Workspace <span className="italic font-serif text-[#f37021] font-medium">Insights</span> & Ideas
          </h1>
          <p className="text-white/70 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            Explore modern office design trends, startup strategies, remote infrastructure advice, and workspace management expertise from our team.
          </p>

          {/* Category filter pills */}
          <div className="flex items-center justify-center gap-3 mt-12 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#f37021] border-[#f37021] text-white shadow-lg shadow-[#f37021]/20"
                    : "bg-white/10 border-white/20 text-white hover:border-white hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLES ── */}
      <section className="py-20 w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-16 space-y-16">

          {filtered.length === 0 && (
            <p className="text-slate-400 text-center py-24 text-sm">No articles in this category yet.</p>
          )}

          {featured && (
            <a
              href={prefix(`/blog/${featured.slug}`)}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white border border-slate-200/80 rounded-[2rem] overflow-hidden hover:border-[#f37021]/30 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 block"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
                <Image
                  src={prefix(featured.img)}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060d17]/30 via-transparent to-transparent" />
                <span className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-[#f37021] text-white text-[10px] font-bold uppercase tracking-widest shadow">
                  Featured
                </span>
              </div>

              {/* Content */}
              <div className="p-10 lg:p-14 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${categoryColors[featured.category] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
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
                      <Image src={featured.authorImg} alt={featured.author} fill className="object-cover" sizes="40px" />
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
            </a>
          )}

          {/* Grid cards */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map(article => (
                <a
                  key={article.slug}
                  href={prefix(`/blog/${article.slug}`)}
                  className="group bg-white border border-slate-200/80 rounded-[1.5rem] overflow-hidden hover:border-[#f37021]/30 hover:shadow-xl hover:shadow-slate-200 hover:-translate-y-1.5 transition-all duration-400 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                      src={prefix(article.img)}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060d17]/20 to-transparent" />
                  </div>

                  <div className="p-7 flex flex-col flex-1 justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${categoryColors[article.category] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
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
                          <Image src={article.authorImg} alt={article.author} fill className="object-cover" sizes="30px" />
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
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER STRIP ── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-16">
          <div className="relative rounded-[2rem] bg-gradient-to-br from-[#060d17] via-[#0c1928] to-[#060d17] overflow-hidden p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#f37021]/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sky-500/8 blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-lg">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f37021] mb-3 block">Stay in the know</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
                Get the latest workspace insights delivered to your inbox.
              </h2>
              <p className="text-slate-400 text-sm font-normal leading-relaxed">
                Join 2,000+ founders and enterprise leaders reading CovaiTech Park insights.
              </p>
            </div>

            <div className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-72 px-5 py-4 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#f37021]/60 focus:bg-white/15 transition-all"
              />
              <button className="px-7 py-4 bg-[#f37021] hover:bg-white hover:text-[#f37021] text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-300 whitespace-nowrap shadow-xl shadow-[#f37021]/20">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
