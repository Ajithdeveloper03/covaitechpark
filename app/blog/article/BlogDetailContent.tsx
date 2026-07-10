"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const BASE_PATH = "";
const prefix = (url: string) => `${BASE_PATH}${url}`;
const getImgUrl = (img: string) => img.startsWith("http") || img.startsWith("/") ? img : prefix(img);



const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Coworking Insights": { bg: "bg-[#f37021]/10", text: "text-[#f37021]", border: "border-[#f37021]/20" },
  "Workspace Tips": { bg: "bg-[#0a0f1a]/10", text: "text-[#0a0f1a]", border: "border-[#0a0f1a]/20" },
  "Business Growth": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Event Highlights": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "Community Stories": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "Industry News": { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200" },
  "Tech & Innovation": { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
  "Announcements": { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  // Fallbacks
  Workspace: { bg: "bg-[#f37021]/10", text: "text-[#f37021]", border: "border-[#f37021]/20" },
  Productivity: { bg: "bg-[#0a0f1a]/10", text: "text-[#0a0f1a]", border: "border-[#0a0f1a]/20" },
  Business: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200" },
};

export default function BlogDetailContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liveBlogs, setLiveBlogs] = useState<any[]>([]);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        const [articleRes, allBlogsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`)
        ]);

        if (allBlogsRes.ok) {
          const allBlogsData = await allBlogsRes.json();
          setLiveBlogs(allBlogsData.filter((b: any) => b.slug !== slug));
        }

        if (articleRes.ok) {
          const data = await articleRes.json();
          // Use data.category from database first; fall back to slug mapping if not present
          const category = data.category || (slug === "future-of-coworking-spaces-in-coimbatore"
            ? "Workspace Insights"
            : (slug === "maximizing-productivity-in-private-office-cabins" ? "Workspace Tips" : "Business Growth"));

          setArticle({
            title: data.title,
            category: category,
            date: new Date(data.published_at || data.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            }),
            readTime: `${Math.max(3, Math.ceil(JSON.stringify(data.content || "").length / 1000))} min read`,
            img: data.image
              ? (data.image.startsWith("http") || data.image.startsWith("/")
                ? data.image
                : `${process.env.NEXT_PUBLIC_STORAGE_URL}/${data.image}`)
              : "/workspace-lounge.png",
            excerpt: data.excerpt ?? "",
            content: (data.content || []).map((sec: any) => {
              const rawImg = sec.img;
              let resolvedImg = "/workspace-lounge.png";
              if (rawImg) {
                if (rawImg.startsWith("http") || rawImg.startsWith("/")) {
                  resolvedImg = rawImg;
                } else {
                  resolvedImg = `${process.env.NEXT_PUBLIC_STORAGE_URL}/${rawImg}`;
                }
              }
              return {
                heading: sec.heading,
                text: sec.text,
                img: resolvedImg,
                imgCaption: sec.imgCaption || "",
                bullets: Array.isArray(sec.bullets) ? sec.bullets.map((b: any) => typeof b === 'string' ? b : (b?.text ?? b?.toString() ?? "")) : []
              };
            }),
            faqs: data.faqs || [],
            schema: data.schema || ""
          });
        }
      } catch (e) {
        console.error("Error fetching article details", e);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  const currentArticle = article;
  const catColor = currentArticle ? (categoryColors[currentArticle.category] || { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" }) : { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" };


  const [activeSection, setActiveSection] = useState(0);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    if (currentArticle) {
      document.title = `${currentArticle.title} | Blog - Covai Tech Park`;
    }
  }, [currentArticle?.title]);

  useEffect(() => {
    if (!currentArticle) return;
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setReadProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);

      // Update active section
      for (let i = currentArticle.content.length - 1; i >= 0; i--) {
        const sec = document.getElementById(`section-${i}`);
        if (sec && sec.getBoundingClientRect().top <= 160) {
          setActiveSection(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentArticle?.content?.length]);



  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f37021]"></div>
      </div>
    );
  }

  if (!currentArticle) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Article Not Found</h1>
        <p className="text-slate-600 mb-8">The blog article you are looking for does not exist or has been removed.</p>
        <a href={prefix("/blog")} className="px-6 py-3 bg-[#f37021] text-white rounded-full font-medium hover:bg-[#e06015] transition-colors">
          Back to Blogs
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 flex flex-col font-sans relative select-none antialiased">
      {currentArticle.schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: currentArticle.schema }} />
      )}
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 z-[200] h-[3px] bg-[#f37021] transition-all duration-100 ease-out rounded-r-full" style={{ width: `${readProgress}%` }} />
      <Header ctaText="Book a Tour" />
      {/* ── EDITORIAL MAGAZINE HERO ── */}
      <section className="relative w-full pt-32 pb-16 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={getImgUrl(currentArticle.img)} alt="Blog Details background" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-sm" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end relative z-10">
          {/* Typography side */}
          <div className="lg:col-span-6 space-y-8 relative z-20">
            {/* Back link */}
            <a
              href={prefix("/blog")}
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#f37021] text-xs font-bold uppercase tracking-widest mb-4 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              All Articles
            </a>
            <div className="flex items-center flex-wrap gap-3">
              <span className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider border ${catColor.bg} ${catColor.text} ${catColor.border}`}>
                {currentArticle.category}
              </span>
              <span className="text-white/30 text-xs">·</span>
              <span className="text-white/60 text-xs font-medium">{currentArticle.readTime}</span>
              <span className="text-white/30 text-xs">·</span>
              <span className="text-white/60 text-xs font-medium">{currentArticle.date}</span>
            </div>
            {/* REDUCED FONT SIZE: changed from text-5xl sm:text-6xl md:text-7xl to text-4xl sm:text-5xl md:text-5xl */}
            <h1 className="text-4xl sm:text-5xl md:text-5xl font-sans font-bold tracking-tight text-white leading-[1.1]">
              {currentArticle.title}
            </h1>
            <p className="text-white/70 text-base sm:text-lg font-normal leading-relaxed max-w-lg">
              {currentArticle.excerpt}
            </p>
          </div>
          {/* Image side - Large and overlapping */}
          <div className="lg:col-span-6 relative z-10 w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
            <Image
              src={getImgUrl(currentArticle.img)}
              alt={currentArticle.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>
      {/* ── ARTICLE + SIDEBAR ── */}
      <section className="py-16 w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
            {/* ── MAIN ARTICLE ── */}
            <article className="lg:col-span-8 space-y-0">
              {/* Hero image */}
              <div className="relative w-full aspect-[16/9] rounded-[1.5rem] overflow-hidden border border-slate-200/80 shadow-xl shadow-slate-200/50 mb-14">
                <Image
                  src={getImgUrl(currentArticle.img)}
                  alt={currentArticle.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
              </div>
              {/* Content sections */}
              <div className="space-y-20">
                {currentArticle.content.map((section: any, index: number) => {
                  if (section.heading === "_CLASSIC_TEXT_") {
                    return (
                      <div key={index} id={`section-${index}`} className="scroll-mt-28 prose prose-lg max-w-none prose-slate prose-img:rounded-xl prose-a:text-[#f37021] prose-headings:font-outfit prose-headings:font-bold prose-headings:text-slate-900" dangerouslySetInnerHTML={{ __html: section.text }} />
                    );
                  }

                  if (section.heading === "_CLASSIC_IMAGE_") {
                    return (
                      <div key={index} id={`section-${index}`} className="scroll-mt-28 my-10">
                        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-md border border-slate-100">
                          <Image src={getImgUrl(section.img)} alt="Blog Image" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 800px" />
                        </div>
                        {section.imgCaption && <p className="text-center text-sm text-slate-500 italic mt-3">{section.imgCaption}</p>}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={index}
                      id={`section-${index}`}
                      className="scroll-mt-28 space-y-7"
                    >
                      {/* Section number + heading */}
                      <div className="flex items-start gap-5">
                        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f37021]/10 border border-[#f37021]/20 flex items-center justify-center text-[#f37021] text-sm font-bold mt-1">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug pt-1.5">
                          {section.heading}
                        </h2>
                      </div>
                      {/* Section image */}
                      {section.img && (
                        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-md border border-slate-100">
                          <Image
                            src={getImgUrl(section.img)}
                            alt={section.heading}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 800px"
                            loading="lazy"
                          />
                        </div>
                      )}
                      {section.imgCaption && (
                        <p className="text-center text-sm text-slate-500 italic mt-2">
                          {section.imgCaption}
                        </p>
                      )}
                      {/* Section text */}
                      {section.text && (
                        <p className="text-slate-600 text-base sm:text-lg leading-[1.85] font-normal pl-0 sm:pl-15">
                          {section.text}
                        </p>
                      )}
                      {/* Section bullets */}
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="space-y-3 pl-0 sm:pl-15 mt-5 list-none">
                          {section.bullets.map((bullet: string, bIdx: number) => (
                            <li key={bIdx} className="flex items-start gap-3.5 text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
                              <span className="w-5.5 h-5.5 rounded-full bg-[#f37021]/10 text-[#f37021] flex items-center justify-center text-xs shrink-0 mt-1 font-bold">
                                ✓
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {index < currentArticle.content.length - 1 && (
                        <div className="w-full h-px bg-slate-100 mt-4" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* FAQs Accordion */}
              {currentArticle.faqs && currentArticle.faqs.length > 0 && (
                <div className="mt-20 pt-10 border-t border-slate-200 space-y-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#f37021] tracking-widest block">
                      Common Questions
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans tracking-tight">
                      Frequently Asked Questions
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {currentArticle.faqs.map((faq: any, idx: number) => {
                      const isOpen = openFaq === idx;
                      return (
                        <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">
                          <button
                            type="button"
                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                            className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 transition-colors text-left font-medium text-slate-800 text-sm sm:text-base font-sans cursor-pointer"
                          >
                            <span>{faq.question}</span>
                            <span className="text-[#f37021] text-lg font-light leading-none">{isOpen ? "−" : "+"}</span>
                          </button>
                          <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[300px] border-t border-slate-200" : "max-h-0"
                              }`}
                          >
                            <p className="p-5 text-slate-500 text-sm leading-relaxed font-normal bg-white">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Article footer */}
              <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
                <a
                  href={prefix("/blog")}
                  className="inline-flex items-center gap-2 text-[#f37021] text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Back to Articles
                </a>
                <span className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider border ${catColor.bg} ${catColor.text} ${catColor.border}`}>
                  {currentArticle.category}
                </span>
              </div>
            </article>

            {/* ── SIDEBAR ── */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">

              {/* Table of Contents */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-7 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">In this Article</h3>
                <ul className="space-y-1">
                  {currentArticle.content.map((section: any, index: number) => (
                    <li key={index}>
                      <a
                        href={`#section-${index}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-medium leading-snug transition-all duration-200 group ${activeSection === index
                            ? "bg-[#f37021]/8 text-[#f37021] border border-[#f37021]/20"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent"
                          }`}
                      >
                        <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${activeSection === index ? "bg-[#f37021] text-white" : "bg-slate-100 text-slate-400"
                          }`}>
                          {index + 1}
                        </span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>


              {/* Other Articles */}
              {liveBlogs.length > 0 && (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-7 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">More Articles</h3>
                  <div className="space-y-4">
                    {liveBlogs.map((blog) => {
                      const category = blog.category || "Workspace";
                      const c = categoryColors[category] || { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" };
                      const readTime = `${Math.max(3, Math.ceil(JSON.stringify(blog.content || "").length / 1000))} min read`;
                      const rawImg = blog.image;
                      let resolvedImg = "/workspace-lounge.png";
                      if (rawImg) {
                        if (rawImg.startsWith("http") || rawImg.startsWith("/")) resolvedImg = rawImg;
                        else resolvedImg = `${process.env.NEXT_PUBLIC_STORAGE_URL}/${rawImg}`;
                      }

                      return (
                        <a
                          key={blog.slug}
                          href={prefix(`/blog/${blog.slug}`)}
                          className="group flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all"
                        >
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                            <Image src={getImgUrl(resolvedImg)} alt={blog.title} fill className="object-cover" sizes="56px" />
                          </div>
                          <div className="space-y-1.5 min-w-0">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${c.bg} ${c.text} ${c.border}`}>
                              {category}
                            </span>
                            <p className="text-sm font-semibold text-slate-700 leading-snug group-hover:text-[#f37021] transition-colors line-clamp-2">
                              {blog.title}
                            </p>
                            <p className="text-[11px] text-slate-400">{readTime}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
