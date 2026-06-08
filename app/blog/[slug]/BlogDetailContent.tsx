"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

const ARTICLES_CONTENT: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  img: string;
  content: Array<{ heading: string; text: string; img: string }>;
}> = {
  "future-of-coworking-spaces-in-coimbatore": {
    title: "The Future of Managed Coworking Spaces in Coimbatore",
    category: "Workspace",
    date: "June 4, 2026",
    readTime: "5 min read",
    img: "/workspace-lounge.png",
    content: [
      { 
        heading: "The Shift in Workspace Dynamics", 
        text: "Managed coworking spaces are no longer just for freelancers and small teams. Today, premium tech coworking parks like CovaiTech Park are housing mid-size enterprises and fast-growing startups in Coimbatore's thriving tech corridors. The rise of hybrid work models has dramatically accelerated this shift, requiring adaptable environments.", 
        img: "/workspace-lounge.png"
      },
      { 
        heading: "Financial Flexibility", 
        text: "As Coimbatore continues to emerge as a Tier-II powerhouse, the demand for flexible infrastructure is skyrocketing. Fitting out a custom office requires heavy capital expenditure (CapEx) and months of layout planning. Managed private suites completely bypass this, offering move-in ready private cabins at the best price with zero setup headaches.", 
        img: "/workspace-cabin.png"
      },
      { 
        heading: "Focusing on Growth", 
        text: "With modern integrations like dual high-speed SLA-backed fiber connectivity, sound-insulated glass dividers, and dedicated reception desk presence, businesses can focus 100% of their energy on engineering, building products, and driving growth. Operational burdens are entirely lifted off the shoulders of founders.", 
        img: "/workspace-meeting.png"
      },
      { 
        heading: "The Ecosystem Advantage", 
        text: "Furthermore, the shared ecosystem provides access to professional board rooms, breakout zones, fully stocked cafeterias, and health spaces like gym studios, offering employees an excellent work-life balance while facilitating organic networking opportunities with other innovative companies.", 
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
    content: [
      { 
        heading: "The Need for Acoustic Privacy", 
        text: "Acoustic privacy is the single biggest productivity differentiator in modern open-office design layouts. While hot desks are fantastic for networking and collaboration, deep focused work requires distraction-free isolation, especially for engineering, legal, or finance teams dealing with sensitive tasks.", 
        img: "/workspace-cabin.png"
      },
      { 
        heading: "Engineering Isolation", 
        text: "Dedicated soundproof private cabins are engineered to address this specific need. By dampening sound waves and visually isolating the team, private offices allow software development or critical analysis to occur with zero interruptions, leading to faster sprint deliveries and lower error rates.", 
        img: "/workspace-meeting.png"
      },
      { 
        heading: "Customizable Environments", 
        text: "Every cabin suite at CovaiTech Park is fully customized with ergonomic seating, modular storage, and individual smart air conditioning control units. It allows teams to set their own workspace environment parameters according to their workflows, enhancing comfort over long hours.", 
        img: "/workspace-event.png"
      },
      { 
        heading: "Operational Zero-Downtime", 
        text: "Operational details like high-speed connectivity, housekeeping, electrical backup systems, and reception presence are taken care of by the management team. This ensures zero operational downtime for your staff, keeping momentum intact throughout the work week.", 
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
    content: [
      { 
        heading: "Capital Efficiency", 
        text: "Starting a new technology venture is a capital-intensive journey. Spending on physical office leases before validating a product or building a team can severely restrict cash flow runway. A virtual setup minimizes fixed overheads completely.", 
        img: "/workspace-hotdesk.png"
      },
      { 
        heading: "Prestigious Presence", 
        text: "A virtual office address solves this by providing a highly prestigious commercial address in premium hubs (like Nehru Nagar East in Coimbatore or Thillai Nagar in Trichy) at a fraction of the cost, instantly building trust with initial clients and investors.", 
        img: "/workspace-cafe.png"
      },
      { 
        heading: "Compliance Ready", 
        text: "These plans are fully compliant with government rules for GST registration, company filings, and bank account creation, complete with legal agreements and property documentation required for statutory audits.", 
        img: "/workspace-meeting.png"
      },
      { 
        heading: "On-Demand Infrastructure", 
        text: "Additionally, startups benefit from mailbox management, mail scanning, courier receipt, and the ability to book premium meeting rooms and boardrooms on-demand when client sessions require physical meetings, projecting a professional image at all times.", 
        img: "/workspace-lounge.png"
      }
    ]
  }
};

interface BlogDetailContentProps {
  slug: string;
}

export default function BlogDetailContent({ slug }: BlogDetailContentProps) {
  const article = ARTICLES_CONTENT[slug] || ARTICLES_CONTENT["future-of-coworking-spaces-in-coimbatore"];

  useEffect(() => {
    document.title = `${article.title} | Blog - CovaiTech Park`;
  }, [article.title]);

  const [bookingFirstName, setBookingFirstName] = React.useState("");
  const [bookingLastName, setBookingLastName] = React.useState("");
  const [bookingPhone, setBookingPhone] = React.useState("");
  const [bookingSuccess, setBookingSuccess] = React.useState(false);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingFirstName && bookingLastName && bookingPhone) {
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingFirstName("");
        setBookingLastName("");
        setBookingPhone("");
        setBookingSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans relative select-none antialiased">
      
      <Header ctaText="Write Message" />

      {/* ── HERO BANNER ── */}
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
            {article.category} &bull; {article.readTime}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-white leading-[1.2] max-w-3xl">
            {article.title}
          </h1>
          <p className="text-slate-400 text-xs font-normal">
            Published on {article.date} &middot; CovaiTech Park
          </p>
        </div>
      </section>

      {/* ── ARTICLE DETAILS & SIDEBAR ── */}
      <section className="py-20 w-full section-x relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Article Content */}
          <article className="lg:col-span-8 space-y-8 text-left">
            <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-slate-200 shadow-md">
              <Image 
                src={prefix(article.img)} 
                alt={article.title} 
                fill 
                className="object-cover" 
                sizes="(max-width: 768px) 100vw, 800px" 
                priority 
              />
            </div>

            <div className="space-y-12 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              {article.content.map((section, index) => (
                <div key={index} id={`section-${index}`} className="scroll-mt-28 flex flex-col gap-5">
                  <h2 className="text-2xl font-bold text-slate-900">{section.heading}</h2>
                  <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                    <Image 
                      src={prefix(section.img)} 
                      alt={section.heading} 
                      fill 
                      className="object-cover transition-transform duration-700 hover:scale-105" 
                      sizes="(max-width: 1024px) 100vw, 800px" 
                    />
                  </div>
                  <p className="text-slate-600 leading-relaxed text-base">{section.text}</p>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
              <a 
                href={prefix("/blog")}
                className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1.5"
              >
                &larr; Back to Articles
              </a>
              <span className="text-[10px] text-slate-400 font-medium">Category: {article.category}</span>
            </div>
          </article>

          {/* Sidebar Inquiry Card & TOC */}
          <aside className="lg:col-span-4 space-y-8 text-left">
            
            {/* Table of Contents */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <h3 className="font-sans font-bold text-base text-slate-900 mb-4">Table of Contents</h3>
              <ul className="space-y-3">
                {article.content.map((section, index) => (
                  <li key={index}>
                    <a 
                      href={`#section-${index}`}
                      className="text-sm text-slate-600 hover:text-brand-orange font-medium leading-snug block transition-colors"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <h3 className="font-sans font-bold text-base text-slate-900 mb-2">Request callback</h3>
              <p className="text-slate-500 text-xs font-normal leading-relaxed mb-4">
                Interested in our workspaces? Drop your details and our local team will call you within 2 hours.
              </p>

              {bookingSuccess ? (
                <div className="text-center py-8 space-y-3 bg-white border border-slate-100 rounded-xl">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-sans font-bold text-xs text-slate-900">Request Sent!</h4>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={bookingFirstName}
                    onChange={(e) => setBookingFirstName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-orange"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={bookingLastName}
                    onChange={(e) => setBookingLastName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-orange"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-orange"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-orange hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 cursor-pointer"
                  >
                    Get Call Back
                  </button>
                </form>
              )}
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
              <h4 className="font-sans font-bold text-sm text-slate-800 mb-3">Other Articles</h4>
              <ul className="space-y-3">
                {Object.entries(ARTICLES_CONTENT)
                  .filter(([key]) => key !== slug)
                  .map(([key, item]) => (
                    <li key={key}>
                      <a 
                        href={prefix(`/blog/${key}`)}
                        className="text-xs text-slate-600 hover:text-brand-orange font-medium leading-snug block transition-colors"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>

        </div>
      </section>

      {/* ── BLOG FAQS ── */}
      <section className="w-full bg-[#f8fafc] py-16 relative overflow-hidden border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-slate-900 mb-8">Related Questions</h2>
          <div className="space-y-4 text-left">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-sans font-bold text-lg text-slate-900 mb-2">Can I customize my private cabin space?</h3>
              <p className="text-slate-600 text-sm">Absolutely. We offer complete custom fit-outs including branding, specialized network infrastructure, and ergonomic furniture arrangements tailored for your team's workflow.</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-sans font-bold text-lg text-slate-900 mb-2">Are meeting rooms included in the membership?</h3>
              <p className="text-slate-600 text-sm">Yes, all our memberships come with complimentary meeting room credits every month, allowing you to host clients and team syncs in professional boardrooms.</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-sans font-bold text-lg text-slate-900 mb-2">Is the internet connection reliable?</h3>
              <p className="text-slate-600 text-sm">We provide high-speed, dual-fiber enterprise internet with SLA-backed 99.9% uptime, ensuring your operations never skip a beat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG CTA ── */}
      <section className="w-full bg-brand-navy py-20 relative overflow-hidden text-center text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-sans font-bold mb-6">Ready to elevate your workspace?</h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">Join hundreds of growing companies at CovaiTech Park and experience a premium ecosystem designed for scale.</p>
          <a href={prefix("/private-office-space")} className="inline-block px-8 py-4 bg-brand-orange hover:bg-white hover:text-brand-navy text-white text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl cursor-pointer">
            Explore Memberships
          </a>
        </div>
      </section>

      <Footer />

    </div>
  );
}
