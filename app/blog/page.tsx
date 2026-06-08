"use client";

import React, { useEffect } from "react";
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
    snippet: "How hybrid models, premium modular cabins, and smart tech parks are reshaping the corporate ecosystem in Coimbatore's thriving tech corridors."
  },
  {
    slug: "maximizing-productivity-in-private-office-cabins",
    title: "Maximizing Productivity in Soundproof Private Cabins",
    category: "Productivity",
    date: "May 28, 2026",
    readTime: "4 min read",
    img: "/workspace-cabin.png",
    snippet: "A deep dive into UX-driven workspace ergonomics, acoustic privacy, and how dedicated cabin structures accelerate business outputs."
  },
  {
    slug: "why-virtual-offices-are-essential-for-startups",
    title: "Why Virtual Offices are Essential for Modern Startups",
    category: "Business",
    date: "May 15, 2026",
    readTime: "3 min read",
    img: "/workspace-meeting.png",
    snippet: "How virtual mailing addresses and professional phone handling help companies register for GST and build credibility remotely."
  }
];

export default function BlogArchivePage() {
  useEffect(() => {
    document.title = "Insights & Workspace Advice | Blog - CovaiTech Park";
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 flex flex-col font-sans relative select-none antialiased">
      
      <Header ctaText="Write Message" />

      {/* ── HERO SECTION ── */}
      <section 
        className="relative min-h-[50vh] flex flex-col justify-center items-center text-center pt-32 pb-16 section-x bg-slate-950"
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image 
            src={prefix("/hero-bg.png")} 
            alt="Hero Background" 
            fill 
            className="object-cover" 
            sizes="100vw"
            priority 
          />
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/20 rounded-full border border-brand-orange/30 text-brand-orange text-[10px] font-bold tracking-[0.15em] uppercase">
            CovaiTech Journals
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-white leading-[1.15]">
            Insights &amp; <span className="text-brand-orange">Workspace Advice</span>
          </h1>
          <p className="text-slate-300 text-sm max-w-xl font-normal leading-relaxed">
            Stay updated with modern office design trends, startup hacks, remote infrastructure strategy, and corporate updates.
          </p>
        </div>
      </section>

      {/* ── ARCHIVE GRID ── */}
      <section className="py-24 w-full section-x relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((article) => (
              <a 
                key={article.slug}
                href={prefix(`/blog/${article.slug}`)}
                className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden hover:border-brand-orange/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-slate-100 bg-slate-100">
                    <Image 
                      src={prefix(article.img)} 
                      alt={article.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      sizes="(max-width: 768px) 100vw, 800px" 
                      loading="lazy" 
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-brand-orange uppercase tracking-wider">
                      <span>{article.category}</span>
                      <span className="text-slate-300">&bull;</span>
                      <span className="text-slate-400 font-normal">{article.readTime}</span>
                    </div>

                    <h3 className="font-sans font-bold text-lg text-slate-800 leading-snug group-hover:text-brand-orange transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-slate-500 text-sm leading-relaxed font-normal">
                      {article.snippet}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex items-center justify-between text-sm font-bold text-slate-400 group-hover:text-brand-orange transition-colors">
                  <span>{article.date}</span>
                  <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                    Read Article &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      <Footer />

    </div>
  );
}
