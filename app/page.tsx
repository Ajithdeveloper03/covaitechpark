"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Header from "./components/Header";
import dynamic from "next/dynamic";
import { contactInfo } from "./config/contactInfo";
import useEmblaCarousel from "embla-carousel-react";
import { TESTIMONIALS } from "./config/testimonials";

const HomeGallery = dynamic(() => import("./components/HomeGallery"), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-50 animate-pulse rounded-2xl flex items-center justify-center text-sm font-medium text-slate-400">Loading Gallery...</div>
});

const Footer = dynamic(() => import("./components/Footer"), {
  ssr: false,
  loading: () => <div className="h-60 bg-[#060c10] animate-pulse" />
});

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;



const HERO_SLIDES = [
  {
    id: 0,
    title: "Enterprise Ready",
    subtitle: "Office Solutions.",
    image: prefix("/hero1.jpg"),
    label: "MANAGED OFFICE SPACE",
    description: "Move into fully managed office spaces equipped with premium infrastructure, business support services, and scalable solutions designed for growing organizations.",
    meta: "SEAMLESS BUSINESS OPERATIONS"
  },
  {
    id: 1,
    title: "Flexible Spaces",
    subtitle: "For Growth.",
    image: prefix("/hero2.jpg"),
    label: "COWORKING SPACE",
    description: "Work from vibrant coworking spaces that foster collaboration, networking, and productivity while offering the flexibility modern professionals need.",
    meta: "CONNECT • COLLABORATE • GROW"
  },
  {
    id: 2,
    title: "Work Your",
    subtitle: "Way Today.",
    image: prefix("/hero3.jpg"),
    label: "DAY PASS",
    description: "Access professional workspaces on demand with high-speed internet, comfortable seating, and all essential amenities for a productive day.",
    meta: "ACCESS ON YOUR TERMS"
  },
  {
    id: 3,
    title: "Private Spaces",
    subtitle: "For Success.",
    image: prefix("/hero13.jpg"),
    label: "PRIVATE OFFICE SPACE",
    description: "Enjoy secure, fully furnished private offices that provide the focus, privacy, and professionalism required by ambitious teams and businesses.",
    meta: "FOCUS WITHOUT DISTRACTIONS"
  },
  {
    id: 4,
    title: "Meetings Designed",
    subtitle: "For Impact.",
    image: prefix("/workspace-meeting.png"),
    label: "MEETING ROOM",
    description: "Host client presentations, team discussions, and strategic meetings in professionally equipped spaces built to make every interaction productive.",
    meta: "WHERE DECISIONS HAPPEN"
  }
];


const SERVICES_TAILORED = [
  {
    id: "01",
    title: "Private Office Space",
    description: "Secure, dedicated cabins designed for teams of all sizes.",
    image: "https://images.pexels.com/photos/386150/pexels-photo-386150.jpeg",
    linkText: "Learn More"
  },
  {
    id: "02",
    title: "Managed Office Solutions",
    description: "End-to-end custom workspace solutions built for enterprise.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80",
    linkText: "Learn More"
  },
  {
    id: "03",
    title: "Virtual Office & GST Address",
    description: "Professional business address and mail handling services.",
    image: "https://images.pexels.com/photos/36713181/pexels-photo-36713181.jpeg",
    linkText: "Learn More"
  },
  {
    id: "04",
    title: "Meeting & Conference Rooms",
    description: "High-tech conference spaces for interviews, pitches, and more.",
    image: "https://images.pexels.com/photos/20101490/pexels-photo-20101490.jpeg",
    linkText: "Learn More"
  },
  {
    id: "05",
    title: "Coworking Spaces",
    description: "Flexible, dynamic shared spaces perfect for networking.",
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=600&q=80",
    linkText: "Learn More"
  },
  {
    id: "06",
    title: "Hot Desks",
    description: "On-demand access to premium workspaces at any of our locations.",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=600&q=80",
    linkText: "Learn More"
  }
];

const DEPLOYMENT_PHASES = [
  {
    id: "01",
    subtitle: "PREMIUM INFRASTRUCTURE",
    title: "Premium Office Infrastructure",
    description: "Thoughtfully designed workspaces with modern interiors, ergonomic furniture, and spacious layouts that create a productive and professional environment.",
    image: prefix("/workspace-cabin.png"),
    accent: "#f37021",
    icon: "office",
    points: [
      { label: "Ergonomic Workstations", desc: "Designed for comfort and productivity" },
      { label: "Premium Interiors", desc: "Modern and professional office ambiance" },
      { label: "Spacious Layouts", desc: "Optimized for collaboration and efficiency" }
    ]
  },
  {
    id: "02",
    subtitle: "CUSTOM SOLUTIONS",
    title: "Tailored Workspace Solutions",
    description: "Customizable office environments designed around your team's operational, branding, and workspace requirements.",
    image: prefix("/workspace-meeting.png"),
    accent: "#f37021",
    icon: "support",
    points: [
      { label: "Custom Cabin Layouts", desc: "Configured to your team size" },
      { label: "Branding Opportunities", desc: "Reflect your corporate identity" },
      { label: "Personalized Setup", desc: "Built around your workflow needs" }
    ]
  },
  {
    id: "03",
    subtitle: "SCALABILITY",
    title: "Flexible Growth Options",
    description: "Scale your workspace effortlessly as your business grows, without the constraints of traditional office leases.",
    image: prefix("/workspace-lounge.png"),
    accent: "#f37021",
    icon: "access",
    points: [
      { label: "Easy Team Expansion", desc: "Add seats as you grow" },
      { label: "Flexible Terms", desc: "Solutions that adapt to your business" },
      { label: "Future-Ready Spaces", desc: "Designed for evolving requirements" }
    ]
  },
  {
    id: "04",
    subtitle: "CUSTOMER FIRST",
    title: "Proactive Customer-Centric Approach",
    description: "A customer-first approach backed by responsive facility management, seamless onboarding, and continuous service improvement.",
    image: prefix("/workspace-cafe.png"),
    accent: "#f37021",
    icon: "reception",
    points: [
      { label: "On-Site Facility Team", desc: "Immediate support when needed" },
      { label: "Seamless Onboarding", desc: "Quick and hassle-free setup" },
      { label: "Responsive Assistance", desc: "Fast resolution and proactive service" }
    ]
  }
];

type DeploymentPhase = (typeof DEPLOYMENT_PHASES)[number];

const FacilitiesIcon = ({ name, className }: { name: string; className?: string }) => {
  const cls = className || "w-6 h-6";
  switch (name) {
    case "office":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 21V5.25A2.25 2.25 0 0017.25 3h-10.5A2.25 2.25 0 004.5 5.25V21m15 0h-15M19.5 21h-3v-3A2.25 2.25 0 0014.25 15h-4.5A2.25 2.25 0 007.5 17.25v3h-3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6h.008v.008H9V6zm0 3h.008v.008H9V9zm0 3h.008v.008H9V12zm3-6h.008v.008H12V6zm0 3h.008v.008H12V9zm0 3h.008v.008H12V12zm3-6h.008v.008H15V6zm0 3h.008v.008H15V9zm0 3h.008v.008H15V12z" />
        </svg>
      );
    case "support":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728A9 9 0 015.636 5.636" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 100-12 6 6 0 000 12z" />
        </svg>
      );
    case "access":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
      );
    case "reception":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
        </svg>
      );
    default:
      return null;
  }
};

/* ─────────────────────────────────────────────────────────────────────────
   GSAP ScrollTrigger — Stacked Cards Section
   One full-width card visible at a time; cards stack smoothly on scroll.
   The section is pinned while scrolling through all cards.
───────────────────────────────────────────────────────────────────────── */
function StackedCardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    let ctx: { revert?: () => void } = {};

    const initGSAP = async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".stacked-card");
      if (!cards || cards.length === 0) return;

      ctx = gsap.context(() => {
        const totalCards = cards.length;
        
        // Ensure cards have correct initial state
        cards.forEach((card, i) => {
          gsap.set(card, {
            y: i === 0 ? 0 : "150%", // First card is visible at y=0, others are offscreen below
            zIndex: i, // New cards must have higher zIndex to slide OVER previous cards
          });
        });

        // Pin the trigger container while we scroll through all cards
        ScrollTrigger.create({
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${totalCards * 100}%`,
          pin: sectionRef.current,
          pinSpacing: true,
          anticipatePin: 1,
        });

        // Animate each card in sequence
        cards.forEach((card, i) => {
          if (i === 0) return;

          ScrollTrigger.create({
            trigger: triggerRef.current,
            start: `${(i / totalCards) * 100}% top`,
            end: `${((i + 1) / totalCards) * 100}% top`,
            scrub: 0.6,
            onEnter: () => {
              // Slide new card up into view, landing lower to create a tab effect
              gsap.to(card, { y: i * 20, duration: 0.6, ease: "power3.out" });
            },
            onLeaveBack: () => {
              // Slide it back down
              gsap.to(card, { y: "150%", duration: 0.5, ease: "power3.in" });
            },
          });
        });
      }, sectionRef);
    };

    initGSAP();

    return () => {
      if (ctx.revert) ctx.revert();
    };
  }, []);

  return (
    <div ref={triggerRef} id="deployment-section" style={{ height: `${(DEPLOYMENT_PHASES.length + 1) * 100}vh` }}>
      {/* Pinned sticky frame */}
      <div ref={sectionRef} className="w-full h-[100dvh] overflow-hidden relative bg-[#f0f3f6] flex flex-col py-6 lg:py-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between">

        {/* Section Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto shrink-0 z-50 relative mb-4 lg:mb-6">
          <span className="text-[10px] font-medium text-brand-orange tracking-widest block border border-brand-orange/30 text-brand-orange w-max px-3 py-1 rounded-sm mx-auto">
            FACILITIES INCLUDED
          </span>
          {/* <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-medium text-slate-900 tracking-tight leading-[1.1]">
            Facilities
          </h2> */}
          <h3 className="text-black  text-4xl font-bold ">
            Premium amenities designed to support modern businesses and teams.
          </h3>
        </div>

        {/* Card stack area */}
        <div className="relative flex-1 w-full mx-auto my-4 lg:my-6">
          {DEPLOYMENT_PHASES.map((phase, idx) => {
            return (
              <div
                key={phase.id}
                className="stacked-card absolute inset-0 mx-auto rounded-2xl md:rounded-3xl overflow-hidden bg-white shadow-[0_15px_50px_rgba(0,0,0,0.1)] border border-slate-100 will-change-transform"
              >
                {/* Full-width card: left image, right content */}
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Image half */}
                  <div className="relative w-full lg:w-[40%] h-32 lg:h-full overflow-hidden shrink-0">
                    <Image priority={true}
                      src={phase.image}
                      alt={phase.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                     
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/5" />
                  </div>

                  {/* Content half */}
                  <div className="flex-1 flex flex-col justify-center px-5 sm:px-8 lg:px-10 py-4 lg:py-6 gap-3 overflow-y-auto bg-white">
                    {/* Yellow Circular Icon Header */}
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#ffb700] flex items-center justify-center shrink-0 shadow-lg shadow-[#ffb700]/30 mb-1">
                      <FacilitiesIcon name={phase.icon} className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>

                    <div>
                      <h3 className="font-outfit font-semibold text-xl sm:text-2xl lg:text-3xl text-slate-900 leading-tight mb-1 lg:mb-2">
                        {phase.title}
                      </h3>
                      <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl">
                        {phase.description}
                      </p>
                    </div>

                    <ul className="flex flex-col gap-2 mt-1">
                      {phase.points.map((point) => (
                        <li key={point.label} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#ffb700] shrink-0 mt-2" />
                          <div>
                            <span className="text-[13px] sm:text-[14px] lg:text-base font-medium text-slate-800 block">{point.label}</span>
                            <span className="text-[12px] sm:text-[13px] lg:text-sm text-slate-500 leading-relaxed hidden sm:block">{point.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
}


// TESTIMONIALS now imported from config

// Gallery Showcase Images
const GALLERY_ITEMS = [
  { image: prefix("/workspace-lounge.png"), title: "Lounge Area", tags: ["SHARED", "LOUNGE"], location: "Coimbatore, India", year: "2026", category: "Lounges" },
  { image: prefix("/workspace-cabin.png"), title: "Private Cabins", tags: ["CABIN", "PRIVATE"], location: "Coimbatore, India", year: "2026", category: "Cabins" },
  { image: prefix("/workspace-meeting.png"), title: "Smart Meeting Room", tags: ["MEETING", "COLLABORATION"], location: "Coimbatore, India", year: "2026", category: "Meetings" },
  { image: prefix("/workspace-hotdesk.png"), title: "Dedicated Desks", tags: ["DESK", "RESERVED"], location: "Coimbatore, India", year: "2026", category: "Desks" },
  { image: prefix("/workspace-cafe.png"), title: "Breakout Cafe", tags: ["CAFE", "BREAKOUT"], location: "Coimbatore, India", year: "2026", category: "Lounges" },
  { image: prefix("/workspace-event.png"), title: "Event Spaces", tags: ["EVENT", "VENUE"], location: "Coimbatore, India", year: "2026", category: "Meetings" },
  { image: prefix("/amenities-community.png"), title: "Active Community", tags: ["COMMUNITY", "NETWORKING"], location: "Coimbatore, India", year: "2026", category: "Lounges" },
  { image: prefix("/hero-bg.png"), title: "CovaiTech Park Hub", tags: ["CAMPUS", "OVERVIEW"], location: "Coimbatore, India", year: "2026", category: "Cabins" },
];

// FAQ Data
const FAQS = [
  {
    question: "Why should I choose a flexible workspace over a traditional office?",
    answer: "A flexible workspace eliminates the hassle of setting up and managing an office. With fully furnished spaces, business amenities, and flexible lease terms, you can focus on growing your business while we take care of the infrastructure."
  },
  {
    question: "Can I customize my office to match my brand?",
    answer: "Yes. Depending on the workspace selected, branding, cabin layouts, seating arrangements, and office configurations can be customized to reflect your company's identity and operational needs."
  },
  {
    question: "What amenities are included in your workspace solutions?",
    answer: "Our workspaces include high-speed internet, power backup, air conditioning, housekeeping, security, reception services, pantry access, meeting room facilities, and ample parking, ensuring a productive work environment."
  },
  {
    question: "How quickly can we move into a ready to use office?",
    answer: "Ready to use office spaces can typically be occupied shortly after the documentation is completed. For customized managed office spaces, the fit-out and handover process generally takes 20–30 working days, depending on the scope of customization and infrastructure requirements."
  },
  {
    question: "Can your workspace support our business as it expands?",
    answer: "Yes. Our flexible office solutions are designed to accommodate business growth. Whether you need additional workstations, a larger office, or multiple office units, we can help you scale with minimal disruption."
  }
];

const CITIES = [
  // Coimbatore sub-locations
  { name: "Nehru Nagar (SITRA)", icon: "office-block", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" },
  { name: "Kalapatti", icon: "tech-hub", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80" },
  { name: "Saravanampatti", icon: "airport-city", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80" },
  // Trichy sub-locations
  { name: "Thillai Nagar", icon: "residential-biz", image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80" },
  { name: "Kattur", icon: "heritage-zone", image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1200&q=80" }
];

const CityIcon = ({ icon, className }: { icon: string; className?: string }) => {
  const cls = className ?? "w-6 h-6 text-slate-500 fill-none";
  switch (icon) {
    case "skyscrapers":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="44" cy="20" r="7" fill="#ffe066" className="opacity-90" />
          <path d="M12 52V20h12v32M24 52V28h12v24M36 52V14h12v38M8 52h48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 26v4m0 4v4m0 4v4M30 34v4m0 4v4M42 20v4m0 4v4m0 4v4m0 4v4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "gateway":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="24" r="8" fill="#ffe066" className="opacity-90" />
          <path d="M14 52h36M18 52V26l4-4h20l4 4v26M22 52V34c0-5.5 4.5-10 10-10s10 4.5 10 10v18M26 22V14h12v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 26h24" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "vidhana-soudha":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="18" r="7" fill="#ffe066" className="opacity-90" />
          <path d="M8 52h48M14 52V36h36v16M22 36l3-12h14l3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 24c4.4 0 8-3.6 8-8s-8-8-8-8-8 3.6-8 8 3.6 8 8 8zM32 8V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18 36v16M24 36v16M40 36v16M46 36v16" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "charminar":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="8" fill="#ffe066" className="opacity-90" />
          <path d="M16 52h32M18 52V18h4v34M42 52V18h4v34M22 28h20M22 46h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 34c0-5.5 4.5-10 10-10s10 4.5 10 10v12H22V34z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 18c0-2 2-4 4-4s4 2 4 4v0M40 18c0-2 2-4 4-4s4 2 4 4v0" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "chennai-central":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="42" cy="24" r="7" fill="#ffe066" className="opacity-90" />
          <path d="M8 52h48M28 52V16l4-4 4 4v36M12 52V36h16M36 52V38h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="24" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M32 10V4M18 36l5-6 5 6M41 38l5-6 5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "bara-imambara":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="22" r="7" fill="#ffe066" className="opacity-90" />
          <path d="M8 52h48M12 52V38c0-3 3-5 6-5s6 2 6 5v14M24 52V32c0-4 4-7 8-7s8 3 8 7v20M40 52V38c0-3 3-5 6-5s6 2 6 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 33v-3M32 25v-4M46 33v-3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "shaniwar-wada":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="22" r="7" fill="#ffe066" className="opacity-90" />
          <path d="M10 52h44M14 52V24l6-4h24l6 4v28M26 52V38c0-3.3 2.7-6 6-6s6 2.7 6 6v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 28h36M20 20v4M44 20v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "skyscrapers-alt":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="20" cy="20" r="7" fill="#ffe066" className="opacity-90" />
          <path d="M14 52V24l10-8v36M24 52V18l12-6v40M36 52V28l14-6v30M8 52h48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M29 20v3M29 27v3M29 34v3M29 41v3M41 32v3M41 39v3M41 46v3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "india-gate":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="34" r="8" fill="#ffe066" className="opacity-90" />
          <path d="M14 52h36M20 52V24h6v-4h12v4h6v28M26 52V38c0-3.3 2.7-6 6-6s6 2.7 6 6v14M22 24h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 20h16M28 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "rajwada":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="44" cy="24" r="7" fill="#ffe066" className="opacity-90" />
          <path d="M12 52h40M18 52V14h28v38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 52V42c0-2.2 1.8-4 4-4h8c2.2 0 4 1.8 4 4v10M18 20h28M18 28h28M18 36h28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M26 14v4M38 14v4" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "teen-darwaza":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="22" r="7" fill="#ffe066" className="opacity-90" />
          <path d="M8 52h48M10 52V38c0-2.8 2.2-5 5-5s5 2.2 5 5v14M24 52V32c0-3.3 2.7-6 6-6s6 2.7 6 6v20M44 52V38c0-2.8 2.2-5 5-5s5 2.2 5 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "hawa-mahal":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="28" r="8" fill="#ffe066" className="opacity-90" />
          <path d="M12 52h40M16 52l4-34h24l4 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 44h24M22 36h20M24 28h16M26 20h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M32 18V12M26 20l6-8 6 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "fishing-net":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="44" cy="24" r="7" fill="#ffe066" className="opacity-90" />
          <path d="M12 52h40M16 52l12-32 8 16M28 20l20 18M32 30h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 44s8-4 16-4 16 4 16 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "open-hand":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="20" cy="24" r="7" fill="#ffe066" className="opacity-90" />
          <path d="M32 52V36M24 52h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M32 36c4 0 10-6 10-12 0-3.3-2.7-6-6-6-2.2 0-4 1.5-5 3.5-1-2-2.8-3.5-5-3.5-3.3 0-6 2.7-6 6 0 6 6 12 12 12z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "howrah-bridge":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="20" r="7" fill="#ffe066" className="opacity-90" />
          <path d="M8 50h48M16 50l4-28 4 28M40 50l4-28 4 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 32c12-8 24-8 48 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 22h24M16 32v18M44 32v18M32 30v20" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "gopuram":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="20" r="7" fill="#ffe066" className="opacity-90" />
          <path d="M12 52h40M16 52l6-32h20l6 32M18 44h28M20 36h24M22 28h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 20V12M28 12c0-2 2-3 4-3s4 1 4 3v0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M26 52v-8M38 52v-8M32 52v-8" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "goa-church":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="28" cy="20" r="7" fill="#ffe066" className="opacity-90" />
          <path d="M8 52h24M16 52V24l4-4 4 4v28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 20V12M18 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M38 52c0-8 6-12 6-12M44 40c0 8-4 12-4 12M44 40v12M40 44c1.5-.5 3 0 4 .5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "kalinga-temple":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="20" r="7" fill="#ffe066" className="opacity-90" />
          <path d="M12 52h40M22 52V30l10-18 10 18v22M20 46h24M21 38h22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 12V6M30 6h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "office-block":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="48" cy="18" r="7" fill="#ffe066" className="opacity-90" />
          <path d="M8 52h48M14 52V18h22v34M36 52V26h14v26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 24v4m0 6v4m0 6v4M28 24v4m0 6v4m0 6v4M40 32v4m0 6v4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "tech-hub":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="14" r="6" fill="#ffe066" className="opacity-90" />
          <path d="M10 52h44M16 52V30l6-6h20l6 6v22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 52V40h6v12M34 52V40h6v12M32 24v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M20 34h6m12 0h6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M28 8l4-4 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "airport-city":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="44" cy="14" r="6" fill="#ffe066" className="opacity-90" />
          <path d="M8 52h48M12 52V34h16v18M32 52V22h18v30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 38h8M16 44h8M36 28h10M36 36h10M36 44h10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M28 34V22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "boulevard":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="16" r="6" fill="#ffe066" className="opacity-90" />
          <path d="M8 52h48M18 52V28l5-6h18l5 6v24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 52V40c0-2.8 2.2-5 5-5h10c2.8 0 5 2.2 5 5v12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M18 34h28M22 28h20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "city-center":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="12" r="6" fill="#ffe066" className="opacity-90" />
          <path d="M10 52h44M14 52V22h10v30M28 52V16h8v36M40 52V22h10v30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 28v4m0 5v4m0 5v4M32 22v4m0 5v4m0 5v4M44 28v4m0 5v4m0 5v4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "residential-biz":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="40" cy="18" r="6" fill="#ffe066" className="opacity-90" />
          <path d="M8 52h48M14 52V28l8-10 8 10v24M38 52V24h16v28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 34v4m0 5v4M22 34v4m0 5v4M42 30v4m0 5v4m5-13v4m0 5v4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M26 52V40h8v12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "heritage-zone":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="18" r="6" fill="#ffe066" className="opacity-90" />
          <path d="M10 52h44M16 52V30l16-18 16 18v22M22 52V36h8v16M34 52V36h8v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 12V6M20 30h24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "industry-park":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="50" cy="20" r="6" fill="#ffe066" className="opacity-90" />
          <path d="M8 52h48M14 52V32l10-8v8l10-8v8l10-8v28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M36 36v4m0 5v4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M42 44h10M42 48h10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "smart-zone":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="20" r="6" fill="#ffe066" className="opacity-90" />
          <path d="M12 52h40M18 52V28h6v-6h16v6h6v24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 34h6m8 0h6M22 42h6m8 0h6M28 52V42h8v10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M24 22h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "temple-city":
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="16" r="6" fill="#ffe066" className="opacity-90" />
          <path d="M12 52h40M20 52l4-36h16l4 36M22 44h20M24 36h16M26 28h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 16V8M29 8c0-1.7 1.3-3 3-3s3 1.3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M28 52v-6M36 52v-6M32 52v-6" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 64 64">
          <circle cx="32" cy="18" r="6" fill="#ffe066" className="opacity-90" />
          <path d="M10 52h44M16 52V28l16-18 16 18v24M24 52V38h16v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 12V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
};

const BRANDS = [
  {
    name: "wework",
    element: (
      <span className="font-outfit font-medium text-2xl tracking-tighter text-slate-800 uppercase">
        we<span className="text-slate-400">work</span>
      </span>
    )
  },
  {
    name: "awfis",
    element: (
      <span className="font-sans font-medium text-2xl tracking-tight text-red-500">
        aw<span className="text-orange-500">fis</span>
      </span>
    )
  },
  {
    name: "innov8",
    element: (
      <span className="font-sans font-medium text-xl tracking-wider text-orange-600 uppercase">
        INNOV<span className="text-orange-400">8</span>
      </span>
    )
  },
  {
    name: "91springboard",
    element: (
      <span className="font-mono font-medium text-base tracking-wider text-slate-700 uppercase">
        91<span className="text-slate-400 font-normal">springboard</span>
      </span>
    )
  },
  {
    name: "instaoffice",
    element: (
      <span className="font-outfit font-medium text-xl tracking-tight text-slate-800">
        Insta<span className="text-orange-500">Office</span>
      </span>
    )
  },
  {
    name: "indiqube",
    element: (
      <div className="flex items-center gap-1">
        <div className="w-5 h-5 bg-teal-500 rounded-sm transform rotate-45 flex items-center justify-center">
          <span className="text-[10px] text-white font-medium transform -rotate-45">I</span>
        </div>
        <span className="font-sans font-medium text-lg tracking-wider text-teal-800 uppercase">
          indiqube
        </span>
      </div>
    )
  }
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCity, setActiveCity] = useState("Coimbatore");

  // Hero carousel slider variables
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [heroSlides, setHeroSlides] = useState(HERO_SLIDES);

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero-slides`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const mapped = data.map((slide: any) => ({
              id: slide.id,
              title: slide.title,
              subtitle: slide.subtitle ?? "",
              image: slide.image 
                ? (slide.image.startsWith("http") || slide.image.startsWith("/")
                  ? slide.image
                  : `${process.env.NEXT_PUBLIC_STORAGE_URL}/${slide.image}`)
                : prefix("/hero1.jpg"),
              label: slide.label ?? "",
              description: slide.description ?? "",
              meta: slide.meta ?? ""
            }));
            setHeroSlides(mapped);
          }
        }
      } catch (error) {
        console.error("Error fetching hero slides", error);
      }
    };
    fetchHeroSlides();
  }, []);



  // Testimonials slider variables
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testifierTransition, setTestifierTransition] = useState(false);

  // Contact form states
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactPhoneCode, setContactPhoneCode] = useState("+91");
  const [contactLookingFor, setContactLookingFor] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);
  const [botField, setBotField] = useState("");

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  const handleNextTestimonial = () => {
    setTestifierTransition(true);
    setTimeout(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
      setTestifierTransition(false);
    }, 200);
  };
  
  const handlePrevTestimonial = () => {
    setTestifierTransition(true);
    setTimeout(() => {
      setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      setTestifierTransition(false);
    }, 200);
  };

  // Auto-play testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestifierTransition(true);
      setTimeout(() => {
        setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
        setTestifierTransition(false);
      }, 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Booking states
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [bookingFirstName, setBookingFirstName] = useState("");
  const [bookingLastName, setBookingLastName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingPhoneCode, setBookingPhoneCode] = useState("+91");
  const [bookingLookingFor, setBookingLookingFor] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Carousel slider auto-play
  useEffect(() => {
    if (!isAutoPlay || heroSlides.length === 0) return;
    const interval = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlay, heroSlides.length]);

  // Auto-scroll thumbnails on mobile when active slide changes
  const thumbContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (thumbContainerRef.current) {
      const activeThumb = thumbContainerRef.current.children[activeHeroSlide] as HTMLElement;
      if (activeThumb) {
        const container = thumbContainerRef.current;
        const scrollLeft = activeThumb.offsetLeft - (container.clientWidth / 2) + (activeThumb.clientWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeHeroSlide]);

  // IntersectionObserver to sync vertical dot navigation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -45% 0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Keep gallery-works as active ID during its scroll scroll track
          if (entry.target.id === "gallery-works") {
            setActiveSection("gallery-works");
          } else {
            setActiveSection(entry.target.id);
          }
        }
      });
    }, observerOptions);

    const HOME_SECTION_IDS = [
      "hero", "benefits-organic", "locations", "services-dark",
      "gallery-works", "testimonials", "faqs", "booking"
    ];

    HOME_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);




  // Scroll reveal IntersectionObserver (handles fade-in animation triggers once)
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Keep it visible once triggered
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleOpenBooking = (plan: string) => {
    setSelectedPlan(plan);
    setBookingLookingFor(plan);
    setBookingOpen(true);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingFirstName && bookingLastName && bookingEmail && bookingPhone) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: `${bookingFirstName} ${bookingLastName}`,
            email: bookingEmail,
            phone: `${bookingPhoneCode} ${bookingPhone}`,
            company: "",
            message: `Booking Inquiry for: ${bookingLookingFor || selectedPlan}`,
            source: "popup",
            bot_field: botField
          }),
        });

        if (response.ok) {
          setBookingSuccess(true);
          setTimeout(() => {
            setBookingFirstName("");
            setBookingLastName("");
            setSelectedPlan("");
            setBookingLookingFor("");
            setBookingEmail("");
            setBookingPhone("");
            setBookingPhoneCode("+91");
            setBookingOpen(false);
            setBookingSuccess(false);
          }, 3000);
        }
      } catch (error) {
        console.error("Form submission error", error);
      }
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactFirstName && contactLastName && contactEmail && contactPhone) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: `${contactFirstName} ${contactLastName}`,
            email: contactEmail,
            phone: `${contactPhoneCode} ${contactPhone}`,
            company: "",
            message: `Contact Inquiry for: ${contactLookingFor}\nFrom footer form`,
            source: "contact_page",
            bot_field: botField
          }),
        });

        if (response.ok) {
          setContactSuccess(true);
          setTimeout(() => {
            setContactFirstName("");
            setContactLastName("");
            setContactEmail("");
            setContactPhone("");
            setContactPhoneCode("+91");
            setContactLookingFor("");
            setContactSuccess(false);
          }, 3000);
        }
      } catch (error) {
        console.error("Form submission error", error);
      }
    }
  };





  return (
    <div className="min-h-screen bg-white text-brand-navy flex flex-col font-inter relative select-none font-medium text-base">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CoworkingSpace",
            "name": "CovaiTech Park",
            "image": "https://covaitechpark.com/covaitechpark/covai-tech-park-logo.png",
            "@id": "https://covaitechpark.com/covaitechpark/#coworkingspace",
            "url": "https://covaitechpark.com/covaitechpark",
            "telephone": contactInfo.phone1.raw,
            "priceRange": "₹1499 - ₹14999",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Nehru Nagar East",
              "addressLocality": "Coimbatore",
              "addressRegion": "Tamil Nadu",
              "postalCode": "641014",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 11.0267,
              "longitude": 77.0142
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "00:00",
              "closes": "23:59"
            },
            "sameAs": [
              "https://covaitechpark.com"
            ]
          })
        }}
      />
      

      <Header ctaAction={() => handleOpenBooking("Get Quote")} />

      {/* HERO SECTION DESIGN CAROUSEL (100vh) */}
      <section id="hero" className="relative min-h-[100dvh] sm:h-screen w-full flex flex-col justify-center lg:justify-center pt-[3.5rem] sm:pt-16 md:pt-20 pb-5 sm:pb-8 lg:pb-0 overflow-hidden bg-brand-navy text-white herosmall" >
        
        {/* Dynamic sliding backgrounds */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="flex h-full transition-transform duration-1000 ease-in-out"
            style={{ 
              width: `${heroSlides.length * 100}%`,
              transform: `translateX(-${activeHeroSlide * (100 / heroSlides.length)}%)` 
            }}
          >
            {heroSlides.map((slide) => (
              <div
                key={slide.id}
                className="relative h-full flex-shrink-0"
                style={{ width: `${100 / heroSlides.length}%` }}
              >
                <Image
                  src={slide.image}
                  alt={slide.label}
                  fill
                  priority={slide.id === 0}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            ))}
          </div>
          {/* Vignette dark overlay for text contrast (left 80% opacity to right fully transparent) */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/95 via-brand-navy/80 to-brand-navy/40 z-10 pointer-events-none lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/80 to-brand-navy/20 z-10 pointer-events-none hidden lg:block" />
          
          {/* Elegant transparent architectural floor plan blueprint (coworking desks layout) */}
          <div className="absolute bottom-10 left-10 w-80 h-80 opacity-[0.02] text-white pointer-events-none select-none z-10 hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
              <rect x="5" y="15" width="26" height="18" rx="1.5" />
              <rect x="9" y="19" width="18" height="10" rx="0.5" />
              <circle cx="18" cy="10" r="2.5" />
              <line x1="14" y1="21" x2="22" y2="21" />
              <line x1="18" y1="21" x2="18" y2="25" />
              <line x1="16" y1="25" x2="20" y2="25" />

              <rect x="37" y="15" width="26" height="18" rx="1.5" />
              <rect x="41" y="19" width="18" height="10" rx="0.5" />
              <circle cx="50" cy="10" r="2.5" />
              <line x1="46" y1="21" x2="54" y2="21" />
              <line x1="50" y1="21" x2="50" y2="25" />
              
              <rect x="69" y="15" width="26" height="18" rx="1.5" />
              <rect x="73" y="19" width="18" height="10" rx="0.5" />
              <circle cx="82" cy="10" r="2.5" />
              <line x1="78" y1="21" x2="86" y2="21" />
              <line x1="82" y1="21" x2="82" y2="25" />

              <path d="M2 45h96v1H2zM15 55h12v12H15zM45 55h12v12H45zM75 55h12v12H75z" />
              <path d="M5 80h90v1H5zM20 74h8v12h-8zM50 74h8v12h-8zM80 74h8v12h-8z" />
            </svg>
          </div>
        </div>

        {/* Backdrop outlined watermark text */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[15vw] font-medium leading-none text-outline-white opacity-[0.05] z-10 font-outfit tracking-widest uppercase pointer-events-none text-center w-full">
          COVAITECHPARK
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-5 md:gap-8 lg:gap-12 items-center relative z-20 lg:flex-1">
          
          {/* Left info column */}
          <div className="lg:col-span-7 text-left space-y-4 mb-6 sm:mb-12 md:mb-0 sm:space-y-5 lg:space-y-7 max-w-2xl relative z-20 w-full">
            <div className="absolute -top-1/4 -left-4 sm:-left-12 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-brand-orange/15 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/95 shadow-xl max-w-full">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse shrink-0" />
              <span className="text-[10px] font-normal tracking-widest leading-none ">
                {heroSlides[activeHeroSlide]?.meta}
              </span>
            </div>

            <h1 className="text-[2.25rem] min-[400px]:text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-outfit font-bold tracking-tight text-white leading-[1.08] relative">
              {heroSlides[activeHeroSlide]?.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ffaa66]">
                {heroSlides[activeHeroSlide]?.subtitle}
              </span>
              {/* Short horizontal line accent */}
              <span className="block w-16 h-[3px] bg-brand-orange mt-6 rounded-full" />
            </h1>

            <div className="flex flex-col gap-5 pt-1 text-left">
              <p className="text-sm sm:text-base md:text-lg text-white/80 font-normal leading-relaxed max-w-xl">
                {heroSlides[activeHeroSlide]?.description}
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-5 pt-2 w-full sm:w-auto">
                <button
                  onClick={() => handleOpenBooking("Get Quote (Hero)")}
                  className="w-full sm:w-auto justify-center px-6 py-3.5 sm:px-8 sm:py-4 bg-brand-orange text-white hover:bg-white hover:text-brand-navy font-medium text-sm tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-orange-500/10 hover:scale-[1.03] cursor-pointer flex items-center gap-2"
                >
                  Get Quote
                  <span className="text-sm font-medium">&rarr;</span>
                </button>
                <a href="#locations" className="w-full sm:w-auto justify-center px-6 py-3.5 sm:px-8 sm:py-4 border border-white/35 text-white hover:bg-white hover:text-brand-navy font-medium text-sm tracking-widest rounded-full transition-all duration-300 hover:scale-[1.03] cursor-pointer flex items-center gap-2 text-center decoration-transparent" >
                  Learn More
                </a>
              </div>
            </div>
          </div>

          {/* Slide thumbnails — vertical list with vertical dot line on desktop */}
          <div className="lg:col-span-5 w-full z-20 flex justify-center lg:justify-end items-center mt-4 sm:mt-6 lg:mt-0">
            <div className="relative flex items-stretch gap-6 w-full lg:max-w-[320px] xl:max-w-[360px]">
              
              {/* Vertical Timeline Dot Connector (Desktop only) */}
              <div className="absolute left-1.5 top-[15%] bottom-[15%] w-[1px] bg-white/15 hidden lg:block z-0 pointer-events-none" />

              <div ref={thumbContainerRef} className="w-full flex flex-row lg:flex-col gap-2 sm:gap-4 lg:gap-5 justify-start md:justify-center lg:justify-center items-center relative z-10 overflow-x-auto lg:overflow-visible no-scrollbar pb-2 lg:pb-0 px-4 lg:px-0 scroll-smooth">
                {heroSlides.map((slide, i) => {
                  const isActive = activeHeroSlide === i;

                  return (
                    <div 
                      key={slide.id} 
                      className="flex-shrink-0 transition-all duration-700 ease-in-out w-[130px] sm:w-[150px] lg:w-full flex items-center gap-4 justify-center"
                    >
                      {/* Timeline Dot (Desktop only) */}
                      <div className="relative flex items-center justify-center shrink-0 w-4 h-4 hidden lg:flex">
                        <div className={`rounded-full transition-all duration-500 ${
                          isActive 
                            ? "w-2.5 h-2.5 bg-brand-orange ring-4 ring-brand-orange/30 scale-125" 
                            : "w-1.5 h-1.5 bg-white/45"
                        }`} />
                      </div>

                      {/* Thumbnail Card Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveHeroSlide(i);
                          setIsAutoPlay(false);
                        }}
                        className={`group relative rounded-xl sm:rounded-2xl border font-medium transition-all duration-700 cursor-pointer overflow-hidden bg-white/60 backdrop-blur-md ${
                          isActive
                            ? "border-brand-orange ring-2 ring-brand-orange/40 shadow-lg shadow-brand-orange/20 opacity-100 scale-100 h-[65px] sm:h-[80px] lg:h-[100px] w-full"
                            : "border-white/10 opacity-45 scale-90 h-[55px] sm:h-[70px] lg:h-[80px] w-[80%] lg:w-[70%]"
                        }`}
                        title={slide.label}
                        aria-label={`View slide: ${slide.label}`}
                        aria-pressed={isActive}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={slide.image}
                            alt={slide.label}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 33vw, 360px"
                            priority
                          />
                          <div className={`absolute inset-0 transition-colors duration-500 ${
                            isActive 
                              ? "bg-black/20" 
                              : "bg-black/50"
                          }`} />
                          
                          {/* Label overlay aligned bottom left */}
                          <div className={`absolute inset-0 flex items-center justify-start pl-3 sm:pl-5 transition-opacity duration-500 ${
                            isActive ? "opacity-100" : "opacity-60"
                          }`}>
                            <span className="text-[9px] sm:text-[10px] font-normal tracking-widest text-white drop-shadow-md text-left leading-tight">
                              {slide.label}
                            </span>
                          </div>
                        </div>
                      </button>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* TRUSTED BRANDS PARTNERS SECTION (AUTOMATIC INFINITE MARQUEE DRAG-SLIDER) */}
      <section className="py-12 bg-white border-t border-slate-100 overflow-hidden w-full section-x">
        <div className="w-full text-center">
          {/* Marquee Wrapper with Drag Support */}
          <div className="w-full overflow-x-auto no-scrollbar py-2 cursor-grab active:cursor-grabbing select-none">
            <div className="animate-marquee flex gap-8 md:gap-8 items-center">
              {/* Loop logos twice for infinite marquee effect */}
              {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((num, idx) => (
                <div 
                  key={`logo-${idx}`} 
                  className="flex-shrink-0 opacity-100 hover:opacity-100 transition-all duration-350 px-6 pointer-events-none"
                >
                  <div className="relative w-24 h-22 md:w-32 md:h-26">
                    <Image src={prefix(`/logo${num}.jpg`)} alt={`Partner ${num}`} fill className="object-contain transition-all duration-300" sizes="128px" loading="lazy" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* LOCATIONS SECTION — Reference Image Style */}
      <section id="benefits-organic" className="py-10 sm:py-16 section-x w-full bg-[#ffffff] text-brand-navy relative overflow-hidden">

        {/* Subtle ambient orbs behind the card */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-orange/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[80px] pointer-events-none" />
        
        {/* Elegant transparent office chair & desk outline */}
        <div className="absolute right-4 top-12 w-64 h-64 opacity-[0.04] text-brand-navy pointer-events-none select-none z-0 hidden lg:block">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
            <path d="M30 70h40M50 70V50M35 30h30v20H35zm0 15h30M40 50l-5 12h30l-5-12M50 70l-8 10M50 70l8 10" />
            <circle cx="72" cy="40" r="3" />
            <path d="M72 40l-5-8h10l-5 8zm-5-8h10v-2a5 5 0 00-10 0v2z" />
          </svg>
        </div>

        {/* Natural Layout (No Box) */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="reveal reveal-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-6 md:gap-12 lg:gap-20 items-center">

              {/* Left: Image styled naturally */}
              <div className="relative w-full aspect-square sm:aspect-video lg:aspect-square rounded-[2rem] lg:rounded-[3rem] overflow-hidden">
                <Image
                  src={prefix("/hero13.jpg")}
                  alt="CovaiTech Park premium workspace lounge"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                 loading="lazy"/>
              </div>

              {/* Right: Text Content */}
              <div className="flex flex-col justify-center space-y-4 sm:space-y-6">
                <span className="text-sm font-normal tracking-light text-brand-orange   block leading-none">
                  About Covai Tech Park (Unit of MAX OFFICE)
                </span>

                <h2 className="text-4xl sm:text-5xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight leading-[1.05]">
                  Business Ecosystem for<br />Collaboration & Growth
                </h2>

                <p className="text-slate-600 text-base sm:text-lg text-justify leading-relaxed max-w-lg">
                  Covai Tech Park® and Trichy Coworks, brands under MAX OFFICE, have enabled the growth of 650+ businesses across Tamil Nadu through premium managed offices, coworking spaces, and flexible workspace solutions. Today, we manage over 1,50,000 sq. ft. of office infrastructure across multiple locations, serving startups, enterprises, and global brands alike.
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2 border-t border-slate-100">
                  {[
                    { val: "4,500+", label: "Seats", color: "text-brand-orange" },
                    { val: "650+", label: "Clients Served", color: "text-teal-500" },
                    { val: "8", label: "Locations", color: "text-brand-orange" },
                    { val: "2", label: "Cities", color: "text-teal-500" },
                  ].map(stat => (
                    <div key={stat.label} className="space-y-1">
                      <p className={`font-outfit font-medium text-2xl ${stat.color} leading-none`}>{stat.val}</p>
                      <p className="text-[10px] font-medium text-slate-500 tracking-widest ">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <a href={prefix("/about-us")} className="inline-block px-8 py-3.5 bg-brand-orange hover:bg-brand-navy text-white font-medium text-[11px] tracking-widest rounded-full transition-all duration-300 shadow-lg cursor-pointer hover:scale-[1.02] text-center" >
                    Know More About Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AWARDS & RECOGNITION SECTION — Prestigious Centerpiece Design */}
      <section className="relative w-full overflow-hidden bg-[#060c10] py-14 sm:py-14 border-t border-b border-white/5">
        {/* Background Image Layout */}
        <div className="absolute inset-0 z-0">
          <Image
            src={prefix("/awards-bg.jpg")}
            alt="Accolades Background"
            fill
            className="object-cover opacity-70 object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060c10]/80 via-[#060c10]/50 to-[#060c10]/80" />
        </div>
        
        {/* Ambient background glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(243,112,33,0.08),transparent)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
          {/* Tag */}
          <span className="text-[10px] font-bold text-[#f37021] tracking-[0.35em] block mb-8">
            ★ HONORARY ACCOLADE ★
          </span>

          {/* Golden Badge Showcase Container */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-10 group">
            {/* Outer spinning dashed ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-amber-500/40 animate-[spin_40s_linear_infinite]" />
            {/* Inner pulsing border */}
            <div className="absolute inset-4 rounded-full border border-amber-500/20 group-hover:border-amber-500/40 transition-colors duration-500 animate-pulse" />
            
            {/* Glowing orb */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-amber-500/10 to-transparent blur-md group-hover:scale-110 transition-transform duration-500" />
            {/* The Badge Image in a circular frame */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-amber-500/40 shadow-2xl z-10">
              <Image
                src={prefix("/awards.png")}
                alt="Times Business Awards Badge"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="150px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 to-transparent" />
            </div>
            
            {/* Decorative gold dots */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 rounded-full bg-amber-500 shadow-lg" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-2 rounded-full bg-amber-500 shadow-lg" />
          </div>

          {/* Award Info */}
          <div className="space-y-4 max-w-2xl">
            <h3 className="font-outfit font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Times Business Awards
            </h3>
            
            <p className="text-slate-400 text-sm sm:text-base font-normal leading-relaxed">
              Recognized as the premier provider of state-of-the-art office spaces, managed corporate suites, and premium workspace ecosystems.
            </p>
          </div>

          {/* Interactive Accolade Link */}
          <div className="mt-10">
            <a href="https://timesofindia.indiatimes.com/life-style/events/first-ever-times-business-awards-madurai-2023-honouring-the-best-in-business-in-tamil-nadus-southern-districts/articleshow/98014003.cms" target="_blank" rel="noopener noreferrer" className="group/btn relative px-8 py-3 bg-transparent text-xs font-bold tracking-widest text-amber-500 hover:text-white transition-colors duration-300 rounded-full border border-amber-500/30 hover:border-amber-500 overflow-hidden inline-block" >
              <span className="absolute inset-0 bg-amber-500 -translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out -z-10" />
              View Award &rarr;
            </a>
          </div>
        </div>
      </section>
{/* SERVICES GRID (Image 4 Style - 100vh) */}
      <section id="locations" className="section-container w-full min-h-[auto] lg:min-h-[auto] flex bg-white border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          {/* LEFT: Heading + Dropdowns + City Grid */}
          <div className="col-span-1 lg:col-span-7 xl:col-span-7 py-10 sm:py-14 lg:py-16 pr-4 sm:pr-6 md:pr-10 lg:pr-12 xl:pr-16 space-y-8 relative z-10">
            {/* Heading block with yellow circle decoration */}
            <div className="space-y-4 relative">
              {/* Yellow decorative accent circle */}
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-[#ffe066]/80 -z-10" />
              <span className="text-sm font-medium text-brand-orange uppercase tracking-[0.3em] block leading-none relative z-10">OUR LOCATIONS</span>
              <h2 className="font-outfit font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-slate-900 tracking-tight leading-[1.05] relative z-10">
                Find the Ideal Workspace <span className="text-brand-orange">for Your Business</span>
              </h2>
              <p className="text-slate-500 text-md leading-relaxed max-w-md relative z-10 font-normal">
                Choose from a range of workspace solutions across our centers, designed to support startups, growing teams, and established businesses with flexible office options.
              </p>
            </div>
            {/* City Icon Grid — Side by Side with vertical divider */}
            <div className="flex flex-row gap-0 pt-4 divide-x divide-slate-200">
              {/* Coimbatore Hub */}
              <div className="flex-1 space-y-3 pr-6">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-3.5 h-3.5 text-brand-orange shrink-0" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="8"/></svg>
                  <span className="text-[10px] font-bold text-brand-orange tracking-wider leading-none">Coimbatore Hub</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-5">
                  {CITIES.slice(0, 3).map((city) => {
                    const isActive = activeCity === city.name;
                    return (
                      <button
                        key={city.name}
                        onClick={() => {
                          window.location.href = prefix("/coimbatore");
                        }}
                        className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none w-[70px] sm:w-[80px]"
                      >
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 relative shadow-sm ${
                            isActive
                              ? "bg-slate-800 border-2 border-slate-800 scale-105 shadow-md"
                              : "bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:scale-105"
                          }`}
                        >
                          <CityIcon
                            icon={city.icon}
                            className={`w-7 h-7 sm:w-9 sm:h-9 fill-none transition-colors duration-300 ${
                              isActive
                                ? "text-white"
                                : "text-slate-600 group-hover:text-brand-orange"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-[11px] sm:text-[12px] tracking-wide text-center leading-tight transition-colors duration-300  ${
                            isActive
                              ? "text-brand-orange font-normal"
                              : "text-slate-500 group-hover:text-brand-orange font-normal"
                          }`}
                        >
                          {city.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* Trichy Hub */}
              <div className="flex-1 space-y-3 pl-6">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-3.5 h-3.5 text-teal-500 shrink-0" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="8"/></svg>
                  <span className="text-[10px] font-bold text-teal-600 tracking-wider leading-none">Trichy Hub</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-5">
                  {CITIES.slice(3, 5).map((city) => {
                    const isActive = activeCity === city.name;
                    return (
                      <button
                        key={city.name}
                        onClick={() => {
                          window.location.href = prefix("/trichy");
                        }}
                        className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none w-[70px] sm:w-[80px]"
                      >
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 relative shadow-sm ${
                            isActive
                              ? "bg-slate-800 border-2 border-slate-800 scale-105 shadow-md"
                              : "bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:scale-105"
                          }`}
                        >
                          <CityIcon
                            icon={city.icon}
                            className={`w-7 h-7 sm:w-9 sm:h-9 fill-none transition-colors duration-300 ${
                              isActive
                                ? "text-white"
                                : "text-slate-600 group-hover:text-brand-orange"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-[11px] sm:text-[12px] tracking-wide text-center leading-tight transition-colors duration-300  ${
                            isActive
                              ? "text-brand-orange font-normal"
                              : "text-slate-500 group-hover:text-brand-orange font-normal"
                          }`}
                        >
                          {city.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT: Large full-height image with round bottom-left corner */}
          <div className="col-span-1 lg:col-span-5 xl:col-span-5 relative w-full min-h-[200px] sm:min-h-[300px] lg:min-h-0 lg:h-full">
            <div className="relative w-full h-full lg:absolute lg:inset-0 overflow-hidden ">
              <Image
                src={CITIES.find(c => c.name === activeCity)?.image || "https://images.pexels.com/photos/7651627/pexels-photo-7651627.jpeg"}
                alt={`${activeCity} Coworking Office`}
                fill
                className="object-cover transition-all duration-700 rounded-bl-[6rem] sm:rounded-bl-[10rem] lg:rounded-bl-[12rem] lg:rounded-tl-none lg:rounded-tr-none lg:rounded-br-none"
              />
            </div>
          </div>
        </div>
      </section>
      {/* ABOUT COMPANY SECTION — NATURAL LAYOUT */}
      <section id="services-dark" className="section-container h-auto min-h-0 py-12 sm:py-16 section-x bg-[#060c10] text-white w-full">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative">
          
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-orange/5 rounded-full ambient-glow pointer-events-none" />
          <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-brand-navy/5 rounded-full ambient-glow pointer-events-none" />
          
          {/* Transparent abstract tech/office architectural grid */}
          <div className="absolute left-8 top-1/3 w-80 h-80 opacity-[0.015] text-white pointer-events-none select-none z-0 hidden xl:block">
            <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="0.5">
              <line x1="10" y1="10" x2="110" y2="10" />
              <line x1="10" y1="30" x2="110" y2="30" />
              <line x1="10" y1="50" x2="110" y2="50" />
              <line x1="10" y1="70" x2="110" y2="70" />
              <line x1="10" y1="90" x2="110" y2="90" />
              <line x1="10" y1="110" x2="110" y2="110" />
              
              <line x1="10" y1="10" x2="10" y2="110" />
              <line x1="30" y1="10" x2="30" y2="110" />
              <line x1="50" y1="10" x2="50" y2="110" />
              <line x1="70" y1="10" x2="70" y2="110" />
              <line x1="90" y1="10" x2="90" y2="110" />
              <line x1="110" y1="10" x2="110" y2="110" />
              
              <circle cx="50" cy="50" r="15" />
              <circle cx="50" cy="50" r="30" />
            </svg>
          </div>
  
          <div className="space-y-10 sm:space-y-12 relative z-10 w-full">
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-white/10 pb-8 reveal reveal-up">
              <div className="space-y-3 text-left">
                <span className="text-[11px] font-medium text-brand-orange uppercase tracking-[0.25em] block leading-none">
                  OUR SERVICES
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-orange">
                  Our Services. Built for Teams.
                </h2>
              </div>
             
            </div>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-12">
              {SERVICES_TAILORED.map((service, idx) => {
                const serviceLinks: Record<string, string> = {
                  "01": prefix("/private-office-space"),
                  "02": prefix("/managed-office"),
                  "03": prefix("/virtual-office"),
                  "04": prefix("/meeting-room"),
                  "05": prefix("/coworking-space-in-coimbatore"),
                  "06": prefix("/coworking-space-in-coimbatore"),
                };
                return (
                  <a
                    href={serviceLinks[service.id] || "#"}
                    key={service.id}
                    className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-brand-orange/45 transition-all duration-500 flex flex-col justify-end text-left p-6 sm:p-8 cursor-pointer reveal reveal-up h-64 sm:h-72 block"
                    style={{ transitionDelay: `${idx * 60}ms` }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-75 group-hover:opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2b3748]/90 via-[#2b3748]/30 to-transparent z-10" />
  
                    <div className="relative z-20 space-y-3">
                      <h4 className="font-outfit font-medium text-lg sm:text-xl text-white tracking-tight leading-tight group-hover:text-brand-orange transition-colors duration-300">
                        {service.title}
                      </h4>
                      <div className="pt-1.5 shrink-0">
                        <span className="text-[10px] sm:text-sm font-medium text-brand-orange  flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform">
                          {service.linkText} <span className="text-sm sm:text-sm">&rarr;</span>
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
  
            <div className="flex justify-center pt-10 sm:pt-14 reveal reveal-up">
              <button
                onClick={() => handleOpenBooking("Custom Workspace Consultation")}
                className="px-8 py-4 sm:px-10 sm:py-4.5 bg-brand-orange text-white hover:bg-white hover:text-brand-navy font-medium text-sm tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-brand-orange/25 hover:scale-[1.03] cursor-pointer flex items-center gap-2"
              >
                Request Custom Office Solution
                <span className="text-sm font-medium">&rarr;</span>
              </button>
            </div>
  
          </div>
        </div>
      </section>


 

      {/* FACILITIES — GSAP ScrollTrigger Stacked Cards */}
      <StackedCardsSection />

      <HomeGallery />   
 {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="section-container w-full flex flex-col justify-center py-10 sm:py-16 relative overflow-hidden bg-[#06090f]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80"
            alt="Client Testimonials Background showing architectural office details"
            fill
            priority={false}
            className="object-cover scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#06090f]/88" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06090f]/40 via-transparent to-[#06090f]/90" />
        </div>
        
        {/* Ambient accent orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none z-[1]" />
        
        <div className="relative z-10 box-container w-full flex flex-col items-center justify-center gap-0">
          <div className="text-center mb-6 reveal reveal-up">
            <span className="text-[10px] font-medium text-brand-orange tracking-[0.25em] block leading-none mb-3">TESTIMONIALS</span>
            <h2 className="font-outfit font-medium text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none">
              Trusted by Teams.
            </h2>
          </div>

          <div className="w-full max-w-4xl p-2 sm:p-4 reveal reveal-up">
            <div className="relative flex items-center justify-center gap-3 mb-6">
              <button onClick={handlePrevTestimonial} className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-brand-orange/20 text-white flex items-center justify-center mr-2 cursor-pointer">
                &larr;
              </button>
              
              <div className="flex items-center -space-x-6">
                {TESTIMONIALS.map((t, i) => {
                  const isActive = i === activeTestimonial;
                  const order = [(activeTestimonial + TESTIMONIALS.length - 1) % TESTIMONIALS.length, activeTestimonial, (activeTestimonial + 1) % TESTIMONIALS.length];
                  const pos = order.indexOf(i);
                  if (pos === -1) return null; // Only show 3 images

                  const bgColors = ["bg-[#f37021]", "bg-[#3b82f6]", "bg-[#10b981]", "bg-[#8b5cf6]", "bg-[#ec4899]", "bg-[#14b8a6]", "bg-[#eab308]", "bg-[#f43f5e]"];
                  const bgColor = bgColors[i % bgColors.length];

                  return (
                    <button key={t.id} onClick={() => setActiveTestimonial(i)} className={`relative rounded-full overflow-hidden border-4 transition-all duration-500 flex-shrink-0 cursor-pointer ${isActive ? "w-20 h-20 sm:w-28 sm:h-28 border-brand-orange z-20 scale-110" : "w-14 h-14 sm:w-20 sm:h-20 border-white/15 z-10 opacity-50 hover:opacity-80"}`} style={{ order: pos }}>
                      <div className={`w-full h-full flex items-center justify-center text-white text-2xl sm:text-4xl font-outfit font-medium ${bgColor}`}>{t.name.charAt(0)}</div>
                    </button>
                  );
                })}
              </div>

              <button onClick={handleNextTestimonial} className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-brand-orange/20 text-white flex items-center justify-center ml-2 cursor-pointer">
                &rarr;
              </button>
            </div>

            <div className={`text-center transition-all duration-400 ease-in-out ${testifierTransition ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
              <span className="font-outfit font-medium text-4xl text-brand-orange/30 leading-none block -mb-3">&ldquo;</span>
              <p className="font-outfit font-medium text-sm sm:text-lg md:text-xl lg:text-2xl text-white tracking-tight leading-snug px-1">
                {TESTIMONIALS[activeTestimonial].quote}
              </p>
              <div className="mt-4 flex flex-col items-center gap-1">
                <div className="w-6 h-0.5 bg-brand-orange rounded-full mb-2" />
                <span className="text-xs font-medium text-white uppercase tracking-[0.15em]">{TESTIMONIALS[activeTestimonial].name}</span>
                <span className="text-[10px] font-medium text-white/45 tracking-[0.2em]">{TESTIMONIALS[activeTestimonial].role}</span>
              </div>
            </div>
            
            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className="rounded-full transition-all duration-300 cursor-pointer"
                  style={{ width: i === activeTestimonial ? "20px" : "6px", height: "6px", background: i === activeTestimonial ? "#f37021" : "rgba(255,255,255,0.20)" }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section id="faqs" className="w-full bg-[#f8fafc] py-12 sm:py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12 reveal reveal-up">
            <span className="text-[11px] font-medium text-brand-orange uppercase tracking-[0.25em] block leading-none mb-4">FAQS</span>
            <h2 className="font-outfit font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-navy tracking-tight leading-none">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300">
                  <button onClick={() => setOpenFaq(isOpen ? null : idx)} className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none cursor-pointer">
                    <span className="font-outfit font-medium text-lg text-brand-navy capitalize">{faq.question}</span>
                    <span className={`text-brand-orange transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </span>
                  </button>
                  <div className={`px-6 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="text-brand-slate text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    

      {/* BOOKING/CONTACT SECTION */}
      <section id="booking" className="section-container h-auto py-12 sm:py-16 section-x bg-[#f8fafc] border-t border-b border-brand-orange/15 text-brand-navy relative overflow-hidden reveal reveal-up">
        
        {/* Floating transparent element */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.02] text-brand-navy pointer-events-none select-none z-0">
          <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
            <rect x="20" y="80" width="160" height="40" rx="5" />
            <rect x="40" y="120" width="10" height="60" />
            <rect x="150" y="120" width="10" height="60" />
            <circle cx="100" cy="40" r="20" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center w-full relative z-10">
          
          {/* Left Side: Campus Locations & Details */}
          <div className="lg:col-span-6 text-left space-y-6 reveal reveal-left">
            <span className="text-sm font-medium text-brand-orange uppercase tracking-[0.25em] block leading-none">
              CONNECT WITH US
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight leading-[1.05]">
              Establish your business at Coimbatore or Trichy
            </h2>
            <p className="text-sm sm:text-base text-brand-slate font-medium leading-relaxed">
              We look forward to hosting your team. Reach out to coordinate custom site layouts, schedule live walkthroughs, or get instant lease pricing details.
            </p>
            
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0 mt-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div className="text-left">
                  <h4 className="font-outfit font-medium text-base text-brand-navy">Address</h4>
                  <p className="text-sm sm:text-sm text-slate-500 font-medium">Covai Tech Park, 4th South Cross St, Kovai Thirunagar, Nehru Nagar East, Coimbatore- 641 014.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0 mt-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div className="text-left">
                  <h4 className="font-outfit font-medium text-base text-brand-navy">Registered Address</h4>
                  <p className="text-sm sm:text-sm text-slate-500 font-medium">Max Office<br/>2nd Floor, Old No. C-63, New No. C-50, Bloom Plaza, 6th Cross North East Extension, Near to Isha Yoga Center, Thillai Nagar, Tiruchirappalli, Tamil Nadu, 620018</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Minimal Contact Form */}
          <div className="lg:col-span-6 reveal reveal-right">
            <div className="bg-white text-brand-navy rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-xl relative border border-slate-100 flex flex-col gap-6 w-full max-w-lg ml-auto">
              
              <div className="text-left space-y-1">
                <h3 className="font-outfit font-medium text-2xl text-brand-navy leading-none">
                  Get in Touch
                </h3>
                <p className="text-sm text-brand-slate font-medium">
                  Leave your details and we&apos;ll reach out shortly.
                </p>
              </div>

              {contactSuccess ? (
                <div className="py-10 text-center space-y-4 w-full">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-brand-orange">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </div>
                  <h4 className="font-outfit font-medium text-lg text-brand-navy leading-none">Tour Request Submitted!</h4>
                  <p className="text-sm text-brand-slate font-medium leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong>{contactFirstName} {contactLastName}</strong>. Your tour request has been received. We will contact you at <strong>{contactEmail}</strong> or <strong>{contactPhoneCode} {contactPhone}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-left font-medium text-sm w-full">
                  <input
                    type="text"
                    name="bot_field"
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                    className="hidden"
                    style={{ display: "none" }}
                    autoComplete="off"
                  />
                  {/* Name Row */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-brand-navy">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          required
                          value={contactFirstName}
                          onChange={(e) => setContactFirstName(e.target.value)}
                          placeholder=""
                          className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-medium shadow-sm"
                        />
                        <span className="text-[10px] text-slate-400 font-medium mt-1 block">First</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          value={contactLastName}
                          onChange={(e) => setContactLastName(e.target.value)}
                          placeholder=""
                          className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-medium shadow-sm"
                        />
                        <span className="text-[10px] text-slate-400 font-medium mt-1 block">Last</span>
                      </div>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-brand-navy">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="flex border border-brand-navy/15 rounded-xl overflow-hidden focus-within:border-brand-orange shadow-sm">
                      <select
                        value={contactPhoneCode}
                        onChange={(e) => setContactPhoneCode(e.target.value)}
                        className="bg-slate-50 border-r border-slate-200/80 px-3 py-3 text-sm text-slate-800 focus:outline-none cursor-pointer font-medium shrink-0"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+65">🇸🇬 +65</option>
                      </select>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder=""
                        className="w-full bg-white px-4 py-3 text-sm text-brand-navy focus:outline-none font-medium"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-brand-navy">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder=""
                      className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-medium shadow-sm"
                    />
                  </div>

                  {/* What are you looking for? */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-brand-navy">
                      What are you looking for?
                    </label>
                    <select
                      value={contactLookingFor}
                      onChange={(e) => setContactLookingFor(e.target.value)}
                      className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-medium cursor-pointer shadow-sm"
                      required
                    >
                      <option value="">-Select-</option>
                      <option value="Coworking & Hot Desks">Coworking & Hot Desks</option>
                      <option value="Dedicated Desks">Dedicated Desks</option>
                      <option value="Private Cabins">Private Cabins</option>
                      <option value="Meeting Rooms">Meeting Rooms</option>
                      <option value="Custom Office Solutions">Custom Office Solutions</option>
                    </select>
                  </div>

                  <button type="submit" className="w-full py-4 bg-brand-orange hover:bg-brand-navy text-white text-sm font-medium tracking-widest rounded-xl transition-all duration-300 shadow cursor-pointer mt-4" >
                    Request Tour Schedule
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════
           RICH BRANDED FOOTER
      ═══════════════════════════════════════════════════════ */}
      <Footer onCtaClick={() => handleOpenBooking("General Inquiry")} />

      {/* FLOATING IN-PAGE RESERVATION MODAL */}
      {bookingOpen && (
        <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-[2rem] overflow-hidden w-full max-w-4xl shadow-2xl relative border border-brand-navy/10 flex flex-col md:flex-row">
            
            {/* Modal Image (Hidden on small screens) */}
            <div className="relative w-full md:w-5/12 hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80"
                alt="CovaiTech Park Premium Workspace"
                fill
                className="object-cover"
               sizes="(max-width: 768px) 100vw, 800px" loading="lazy"/>
              <div className="absolute inset-0 bg-brand-navy/20" />
            </div>

            {/* Form Container */}
            <div className="w-full md:w-7/12 p-8 sm:p-10 relative bg-white">
              <button
                onClick={() => setBookingOpen(false)}
                className="absolute top-5 right-5 text-brand-navy/55 hover:text-brand-navy hover:bg-brand-navy/5 p-2 rounded-full transition-all cursor-pointer animate-float-delayed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="mb-6 space-y-1 text-left">
                <h3 className="font-outfit font-medium text-2xl text-brand-navy">
                  Request Quote
                </h3>
              </div>

              {bookingSuccess ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-brand-orange">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </div>
                  <h4 className="font-outfit font-medium text-lg text-brand-navy leading-none">Request Submitted Successfully!</h4>
                  <p className="text-sm text-brand-slate font-medium leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong>{bookingFirstName} {bookingLastName}</strong>. Your inquiry for <strong>{bookingLookingFor || selectedPlan}</strong> has been logged. We will contact you at <strong>{bookingEmail}</strong> or <strong>{bookingPhoneCode} {bookingPhone}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-5 text-left font-medium text-sm">
                  <input
                    type="text"
                    name="bot_field"
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                    className="hidden"
                    style={{ display: "none" }}
                    autoComplete="off"
                  />
                
                {/* Name Row */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-800">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        required
                        value={bookingFirstName}
                        onChange={(e) => setBookingFirstName(e.target.value)}
                        placeholder=""
                        className="w-full bg-white border border-slate-200/80 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-orange font-medium shadow-sm"
                      />
                      <span className="text-[10px] text-slate-400 font-medium mt-1 block">First</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        value={bookingLastName}
                        onChange={(e) => setBookingLastName(e.target.value)}
                        placeholder=""
                        className="w-full bg-white border border-slate-200/80 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-orange font-medium shadow-sm"
                      />
                      <span className="text-[10px] text-slate-400 font-medium mt-1 block">Last</span>
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-800">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="flex border border-slate-200/80 rounded-lg overflow-hidden focus-within:border-brand-orange shadow-sm">
                    <select
                      value={bookingPhoneCode}
                      onChange={(e) => setBookingPhoneCode(e.target.value)}
                      className="bg-slate-50 border-r border-slate-200/80 px-3 py-3 text-sm text-slate-800 focus:outline-none cursor-pointer font-medium shrink-0"
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+65">🇸🇬 +65</option>
                    </select>
                    <input
                      type="tel"
                      required
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      placeholder=""
                      className="w-full bg-white px-4 py-3 text-sm text-slate-800 focus:outline-none font-medium"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-800">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    placeholder=""
                    className="w-full bg-white border border-slate-200/80 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-orange font-medium shadow-sm"
                  />
                </div>

                {/* What are you looking for? */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-800">
                    What are you looking for?
                  </label>
                  <select
                    value={bookingLookingFor}
                    onChange={(e) => setBookingLookingFor(e.target.value)}
                    className="w-full bg-white border border-slate-200/80 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-orange font-medium cursor-pointer shadow-sm"
                    required
                  >
                    <option value="">-Select-</option>
                    <option value="Coworking & Hot Desks">Coworking & Hot Desks</option>
                    <option value="Dedicated Desks">Dedicated Desks</option>
                    <option value="Private Cabins">Private Cabins</option>
                    <option value="Meeting Rooms">Meeting Rooms</option>
                    <option value="Custom Office Solutions">Custom Office Solutions</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-3.5 bg-brand-orange hover:bg-brand-navy text-white text-sm font-medium tracking-widest rounded-lg transition-all duration-300 shadow-md shadow-brand-orange/20 cursor-pointer text-center" >
                  Submit
                </button>
              </form>
            )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
