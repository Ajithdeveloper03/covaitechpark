"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;
const getImgUrl = (img: string) => img.startsWith("http") || img.startsWith("/") ? img : prefix(img);

const ARTICLES_CONTENT: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  img: string;
  excerpt: string;
  content: Array<{ heading: string; text: string; img: string }>;
}> = {
  "future-of-coworking-spaces-in-coimbatore": {
    title: "The Future of Managed Coworking Spaces in Coimbatore",
    category: "Workspace",
    date: "June 4, 2026",
    readTime: "5 min read",
    img: "/workspace-lounge.png",
    excerpt: "How hybrid models, premium modular cabins, and smart tech parks are reshaping the corporate ecosystem in Coimbatore's thriving tech corridors.",
    content: [
      {
        heading: "The Shift in Workspace Dynamics",
        text: "Managed coworking spaces are no longer just for freelancers and small teams. Today, premium tech coworking parks like CovaiTech Park are housing mid-size enterprises and fast-growing startups in Coimbatore's thriving tech corridors. The rise of hybrid work models has dramatically accelerated this shift, requiring adaptable environments that scale with business needs while maintaining operational excellence.",
        img: "/workspace-lounge.png"
      },
      {
        heading: "Financial Flexibility",
        text: "As Coimbatore continues to emerge as a Tier-II powerhouse, the demand for flexible infrastructure is skyrocketing. Fitting out a custom office requires heavy capital expenditure (CapEx) and months of layout planning. Managed private suites completely bypass this, offering move-in ready private cabins at the best price with zero setup headaches—allowing founders to invest capital where it truly matters.",
        img: "/workspace-cabin.png"
      },
      {
        heading: "Focusing on Growth",
        text: "With modern integrations like dual high-speed SLA-backed fiber connectivity, sound-insulated glass dividers, and dedicated reception desk presence, businesses can focus 100% of their energy on engineering, building products, and driving growth. Operational burdens are entirely lifted off the shoulders of founders, creating an environment where innovation thrives.",
        img: "/workspace-meeting.png"
      },
      {
        heading: "The Ecosystem Advantage",
        text: "Furthermore, the shared ecosystem provides access to professional board rooms, breakout zones, fully stocked cafeterias, and health spaces like gym studios, offering employees an excellent work-life balance while facilitating organic networking opportunities with other innovative companies sharing the same high-performance infrastructure.",
        img: "/workspace-cafe.png"
      }
    ]
  },
  "maximizing-productivity-in-private-office-cabins": {
    title: "Maximizing Productivity in Soundproof Private Cabins",
    category: "Productivity",
    date: "May 28, 2026",
    readTime: "4 min read",
    img: "/workspace-cabin.png",
    excerpt: "A deep dive into UX-driven workspace ergonomics, acoustic privacy, and how dedicated cabin structures accelerate business outputs.",
    content: [
      {
        heading: "The Need for Acoustic Privacy",
        text: "Acoustic privacy is the single biggest productivity differentiator in modern open-office design layouts. While hot desks are fantastic for networking and collaboration, deep focused work requires distraction-free isolation—especially for engineering, legal, or finance teams dealing with sensitive tasks that demand complete concentration.",
        img: "/workspace-cabin.png"
      },
      {
        heading: "Engineering Isolation",
        text: "Dedicated soundproof private cabins are engineered to address this specific need. By dampening sound waves and visually isolating the team, private offices allow software development or critical analysis to occur with zero interruptions, leading to faster sprint deliveries and measurably lower error rates across all operational workflows.",
        img: "/workspace-meeting.png"
      },
      {
        heading: "Customizable Environments",
        text: "Every cabin suite at CovaiTech Park is fully customized with ergonomic seating, modular storage, and individual smart air conditioning control units. It allows teams to set their own workspace environment parameters according to their workflows, enhancing comfort over long hours and improving overall team retention metrics.",
        img: "/workspace-event.png"
      },
      {
        heading: "Operational Zero-Downtime",
        text: "Operational details like high-speed connectivity, housekeeping, electrical backup systems, and reception presence are taken care of by the management team. This ensures zero operational downtime for your staff, keeping momentum intact throughout the work week and enabling your team to stay laser-focused on delivering results.",
        img: "/workspace-lounge.png"
      }
    ]
  },
  "why-virtual-offices-are-essential-for-startups": {
    title: "Why Virtual Offices are Essential for Modern Startups",
    category: "Business",
    date: "May 15, 2026",
    readTime: "3 min read",
    img: "/workspace-meeting.png",
    excerpt: "How virtual mailing addresses and professional phone handling help companies register for GST and build credibility remotely.",
    content: [
      {
        heading: "Capital Efficiency",
        text: "Starting a new technology venture is a capital-intensive journey. Spending on physical office leases before validating a product or building a team can severely restrict cash flow runway. A virtual setup minimizes fixed overheads completely, allowing founders to focus every rupee on product development and customer acquisition.",
        img: "/workspace-hotdesk.png"
      },
      {
        heading: "Prestigious Presence",
        text: "A virtual office address solves the credibility problem by providing a highly prestigious commercial address in premium hubs—like Nehru Nagar East in Coimbatore or Thillai Nagar in Trichy—at a fraction of the cost, instantly building trust with initial clients and investors who judge companies by their registered addresses.",
        img: "/workspace-cafe.png"
      },
      {
        heading: "Compliance Ready",
        text: "These plans are fully compliant with government rules for GST registration, company filings, and bank account creation, complete with legal agreements and property documentation required for statutory audits. Our compliance team handles all paperwork so you can focus on operations.",
        img: "/workspace-meeting.png"
      },
      {
        heading: "On-Demand Infrastructure",
        text: "Additionally, startups benefit from mailbox management, mail scanning, courier receipt, and the ability to book premium meeting rooms and boardrooms on-demand when client sessions require physical meetings. This projects a professional image at all times while keeping operational costs fully variable.",
        img: "/workspace-lounge.png"
      }
    ]
  }
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Coworking Insights": { bg: "bg-[#f37021]/10", text: "text-[#f37021]", border: "border-[#f37021]/20" },
  "Workspace Tips":     { bg: "bg-[#0a0f1a]/10", text: "text-[#0a0f1a]", border: "border-[#0a0f1a]/20" },
  "Business Growth":    { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Event Highlights":   { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "Community Stories":  { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "Industry News":      { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200" },
  "Tech & Innovation":  { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
  "Announcements":      { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  // Fallbacks
  Workspace: { bg: "bg-[#f37021]/10", text: "text-[#f37021]", border: "border-[#f37021]/20" },
  Productivity: { bg: "bg-[#0a0f1a]/10", text: "text-[#0a0f1a]", border: "border-[#0a0f1a]/20" },
  Business: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200" },
};

interface BlogDetailContentProps {
  slug: string;
}

export default function BlogDetailContent({ slug }: BlogDetailContentProps) {
  const fallbackArticle = ARTICLES_CONTENT[slug] || ARTICLES_CONTENT["future-of-coworking-spaces-in-coimbatore"];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`);
        if (response.ok) {
          const data = await response.json();
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
                : (data.image.includes("/")
                  ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${data.image}`
                  : `/${data.image}`))
              : "/workspace-lounge.png",
            excerpt: data.excerpt ?? "",
            content: (data.content || []).map((sec: any) => {
              const rawImg = sec.img;
              let resolvedImg = "/workspace-lounge.png";
              if (rawImg) {
                if (rawImg.startsWith("http") || rawImg.startsWith("/")) {
                  resolvedImg = rawImg;
                } else if (rawImg.includes("/")) {
                  resolvedImg = `${process.env.NEXT_PUBLIC_STORAGE_URL}/${rawImg}`;
                } else {
                  resolvedImg = `/${rawImg}`;
                }
              }
              return {
                heading: sec.heading,
                text: sec.text,
                img: resolvedImg,
                bullets: sec.bullets || []
              };
            }),
            faqs: data.faqs || []
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

  const currentArticle = article || fallbackArticle;
  const catColor = categoryColors[currentArticle.category] || { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" };

  const [bookingFirstName, setBookingFirstName] = useState("");
  const [bookingLastName, setBookingLastName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    document.title = `${currentArticle.title} | Blog - CovaiTech Park`;
  }, [currentArticle.title]);

  // Read progress bar
  useEffect(() => {
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
  }, [currentArticle.content.length]);

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingFirstName && bookingLastName && bookingPhone) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: `${bookingFirstName} ${bookingLastName}`,
            email: "N/A", // Not provided in callback form
            phone: bookingPhone,
            company: "",
            message: `Callback Request from Blog: ${currentArticle.heading}`,
            source: "popup",
          }),
        });

        if (response.ok) {
          setBookingSuccess(true);
          setTimeout(() => {
            setBookingFirstName("");
            setBookingLastName("");
            setBookingPhone("");
            setBookingSuccess(false);
          }, 3000);
        }
      } catch (error) {
        console.error("Submission error:", error);
      }
    }
  };

  const otherArticles = Object.entries(ARTICLES_CONTENT).filter(([key]) => key !== slug);

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 flex flex-col font-sans relative select-none antialiased">

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
              <span className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${catColor.bg} ${catColor.text} ${catColor.border}`}>
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
                {currentArticle.content.map((section: any, index: number) => (
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

                    {/* Section text */}
                    <p className="text-slate-600 text-base sm:text-lg leading-[1.85] font-normal pl-0 sm:pl-15">
                      {section.text}
                    </p>

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
                ))}
              </div>

              {/* FAQs Accordion */}
              {currentArticle.faqs && currentArticle.faqs.length > 0 && (
                <div className="mt-20 pt-10 border-t border-slate-200 space-y-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#f37021] uppercase tracking-widest block">
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
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${
                              isOpen ? "max-h-[300px] border-t border-slate-200" : "max-h-0"
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
                <span className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${catColor.bg} ${catColor.text} ${catColor.border}`}>
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
                        className={`flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-medium leading-snug transition-all duration-200 group ${
                          activeSection === index
                            ? "bg-[#f37021]/8 text-[#f37021] border border-[#f37021]/20"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent"
                        }`}
                      >
                        <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          activeSection === index ? "bg-[#f37021] text-white" : "bg-slate-100 text-slate-400"
                        }`}>
                          {index + 1}
                        </span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Callback Form */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-7 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-[#f37021]/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#f37021]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Request a Callback</h3>
                    <p className="text-xs text-slate-400 font-normal">We&apos;ll call you within 2 hours</p>
                  </div>
                </div>

                {bookingSuccess ? (
                  <div className="py-10 flex flex-col items-center gap-3 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">Request Sent!</p>
                    <p className="text-xs text-slate-400 font-normal">Our team will reach out shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCallbackSubmit} className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="First Name"
                      value={bookingFirstName}
                      onChange={(e) => setBookingFirstName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f37021]/50 focus:bg-white transition-all"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Last Name"
                      value={bookingLastName}
                      onChange={(e) => setBookingLastName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f37021]/50 focus:bg-white transition-all"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f37021]/50 focus:bg-white transition-all"
                    />
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#f37021] hover:bg-[#060d17] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-[#f37021]/20"
                    >
                      Get Callback
                    </button>
                  </form>
                )}
              </div>

              {/* Other Articles */}
              {otherArticles.length > 0 && (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-7 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">More Articles</h3>
                  <div className="space-y-4">
                    {otherArticles.map(([key, item]) => {
                      const c = categoryColors[item.category] || { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" };
                      return (
                        <a
                          key={key}
                          href={prefix(`/blog/${key}`)}
                          className="group flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all"
                        >
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                            <Image src={prefix(item.img)} alt={item.title} fill className="object-cover" sizes="56px" />
                          </div>
                          <div className="space-y-1.5 min-w-0">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${c.bg} ${c.text} ${c.border}`}>
                              {item.category}
                            </span>
                            <p className="text-sm font-semibold text-slate-700 leading-snug group-hover:text-[#f37021] transition-colors line-clamp-2">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-slate-400">{item.readTime}</p>
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

      {/* ── CTA SECTION ── */}
      <section className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#f37021]/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-16 relative z-10">
          <div className="relative rounded-[2rem] bg-[#060d17] overflow-hidden p-12 md:p-16 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#f37021]/12 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f37021] block">Ready to get started?</span>
              <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
                Elevate your workspace experience
              </h2>
              <p className="text-slate-400 text-base font-normal leading-relaxed">
                Join hundreds of growing companies at CovaiTech Park and experience a premium ecosystem designed for scale, collaboration, and success.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <a
                  href={prefix("/private-office-space")}
                  className="px-8 py-4 bg-[#f37021] hover:bg-white hover:text-[#f37021] text-white text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-[#f37021]/20"
                >
                  Explore Memberships
                </a>
                <a
                  href={prefix("/contact")}
                  className="px-8 py-4 border border-white/15 hover:border-white/30 text-white hover:bg-white/5 text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
