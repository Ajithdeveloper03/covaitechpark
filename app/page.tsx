"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

// Section coordinates for vertical scroll tracker timeline
const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "locations", label: "Locations" },
  { id: "benefits-organic", label: "About" },
  { id: "services-dark", label: "Services" },
  { id: "deployment-track", label: "Facilities" },
  { id: "booking", label: "Book a Space" }
];

const HERO_SLIDES = [
  {
    id: 0,
    title: "Work Smarter,",
    subtitle: "Scale Faster.",
    image: prefix("/hero1.jpg"),
    label: "PREMIUM OFFICES",
    description: "Enterprise-grade managed tech park offices in Coimbatore and Trichy. Built for high-performance software teams.",
    meta: "SEAMLESS BUSINESS OPERATIONS"
  },
  {
    id: 1,
    title: "Fully Equipped",
    subtitle: "Meeting Rooms.",
    image: prefix("/hero2.jpg"),
    label: "MEETING ROOMS",
    description: "Corporate-ready conference halls and boardrooms built with high-fidelity acoustic isolation and smart screens.",
    meta: "CONNECT • COLLABORATE • GROW"
  },
  {
    id: 2,
    title: "Lockable Private",
    subtitle: "Cabin Suites.",
    image: prefix("/hero3.jpg"),
    label: "PRIVATE CABINS",
    description: "Fully soundproofed lockable offices optimized for growing tech organizations and software teams.",
    meta: "ACCESS ON YOUR TERMS"
  },
  {
    id: 3,
    title: "Coworking &",
    subtitle: "Hot Desk Plans.",
    image: prefix("/hero13.jpg"),
    label: "COWORKING SPACES",
    description: "Flexible shared workspaces with dedicated community seating designed for freelancers, remote teams, and fast-scaling startups.",
    meta: "COLLABORATE • CONNECT • GROW"
  },
  {
    id: 4,
    title: "Virtual Office &",
    subtitle: "GST Address.",
    image: prefix("/workspace-meeting.png"),
    label: "VIRTUAL OFFICE",
    description: "Establish your business presence with a prime Coimbatore address for GST registration and professional mail handling.",
    meta: "PROFESSIONAL BUSINESS ADDRESS"
  }
];



// 7 Main Services Grid (Detailed offerings from covaitechpark.com)
const SERVICES_TAILORED = [
  {
    id: "01",
    title: "Private Office Space",
    description: "Lockable and fully furnished office suites designed for security, team focus, and scalability.",
    image: "https://images.pexels.com/photos/386150/pexels-photo-386150.jpeg",
    linkText: "EXPLORE CABINS"
  },
  {
    id: "02",
    title: "Managed Office Solutions",
    description: "Bespoke corporate floor setups with custom branding and complete IT infrastructure.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80",
    linkText: "REQUEST DESIGN"
  },
  {
    id: "03",
    title: "Virtual Office & GST Address",
    description: "Professional business address, official GST registration support, and secure digital mail handling.",
    image: "https://images.pexels.com/photos/36713181/pexels-photo-36713181.jpeg",
    linkText: "REGISTER NOW"
  },
  {
    id: "04",
    title: "Meeting & Conference Rooms",
    description: "Soundproof boardrooms with smart 4K screens, video conference setups, and catering options.",
    image: "https://images.pexels.com/photos/20101490/pexels-photo-20101490.jpeg",
    linkText: "BOOK ROOM"
  },
  {
    id: "05",
    title: "Event Space & Presentation Halls",
    description: "Spacious hosting halls for product launches, tech meetups, and seminars with full AV support.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
    linkText: "BOOK VENUE"
  },
  {
    id: "06",
    title: "Training & Seminar Rooms",
    description: "Fully equipped classroom setups, whiteboard installations, and boot camp training layouts.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
    linkText: "RESERVE SPACE"
  },
  {
    id: "07",
    title: "Coworking Spaces",
    description: "Open-plan shared workspace community seating in prime business districts, designed for collaboration and networking.",
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=600&q=80",
    linkText: "JOIN NOW"
  },
  {
    id: "08",
    title: "Hot Desks",
    description: "Flexible day-pass or monthly drop-in desk access — perfect for freelancers, remote workers, and startup founders.",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=600&q=80",
    linkText: "GET PASS"
  }
];

const DEPLOYMENT_PHASES = [
  {
    id: "01",
    subtitle: "PREMIUM INFRASTRUCTURE",
    title: "Premium Office Infrastructure",
    description: "Thoughtfully designed workspaces with modern interiors, ergonomic furniture, and spacious layouts that create a productive and professional environment.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.pexels.com/photos/17155842/pexels-photo-17155842.jpeg",
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
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
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
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

function DeploymentPhaseContent({
  phase,
  onInquire,
  compact = false,
}: {
  phase: DeploymentPhase;
  onInquire: (title: string) => void;
  compact?: boolean;
}) {
  return (
    <div className={`flex flex-col ${compact ? "gap-2.5" : "gap-3 sm:gap-4"}`}>
      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] leading-none text-brand-orange">
        {phase.subtitle}
      </span>
      <h3
        className={`font-outfit font-bold text-brand-navy tracking-tight leading-[1.05] ${
          compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
        }`}
      >
        {phase.title}
      </h3>
      <p className="text-brand-slate text-sm sm:text-base leading-relaxed max-w-md font-normal">
        {phase.description}
      </p>
      <div className={`border-t border-slate-100 ${compact ? "space-y-2 pt-2" : "space-y-3 pt-3"}`}>
        {phase.points.map((pt) => (
          <div key={pt.label} className="flex gap-2.5 items-center">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 text-white text-[9px] sm:text-[10px] font-bold bg-brand-orange">
              ✓
            </span>
            <div className="flex gap-1.5 items-baseline flex-wrap min-w-0">
              <span className="font-bold text-xs sm:text-sm text-brand-navy">{pt.label}</span>
              <span className="text-[11px] sm:text-xs text-brand-slate font-normal">{pt.desc}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={compact ? "pt-0.5" : "pt-1"}>
        <button
          type="button"
          onClick={() => onInquire(phase.title)}
          className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer shadow-lg hover:scale-[1.03] bg-brand-orange"
        >
          Inquire Now
          <span className="text-sm">→</span>
        </button>
      </div>
    </div>
  );
}


// Interactive testimonial data
const TESTIMONIALS = [
  {
    id: 1,
    quote: "CovaiTech Park transformed our team's productivity. The infrastructure, community, and 24/7 support are second to none.",
    name: "Desirae Culhane",
    role: "Content Creator",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    quote: "We scaled from 4 to 24 developers in weeks with zero capital expenditure. The private cabins gave us exactly the privacy we needed.",
    name: "Adhithya Sen",
    role: "CTO, Covaitech Solutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    quote: "Operating from Nehru Nagar East with lockable soundproof rooms was an absolute game-changer for our product launch.",
    name: "K. Raghavan",
    role: "Co-Founder, Inymart Group",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  }
];

// Gallery Showcase Images
const GALLERY_ITEMS = [
  { image: prefix("/workspace-lounge.png"), title: "Lounge Area", tags: ["SHARED", "LOUNGE"], location: "Coimbatore, India", year: "2026" },
  { image: prefix("/workspace-cabin.png"), title: "Private Cabins", tags: ["CABIN", "PRIVATE"], location: "Coimbatore, India", year: "2026" },
  { image: prefix("/workspace-meeting.png"), title: "Smart Meeting Room", tags: ["MEETING", "COLLABORATION"], location: "Coimbatore, India", year: "2026" },
  { image: prefix("/workspace-hotdesk.png"), title: "Dedicated Desks", tags: ["DESK", "RESERVED"], location: "Coimbatore, India", year: "2026" },
  { image: prefix("/workspace-cafe.png"), title: "Breakout Cafe", tags: ["CAFE", "BREAKOUT"], location: "Coimbatore, India", year: "2026" },
  { image: prefix("/workspace-event.png"), title: "Event Spaces", tags: ["EVENT", "VENUE"], location: "Coimbatore, India", year: "2026" },
  { image: prefix("/amenities-community.png"), title: "Active Community", tags: ["COMMUNITY", "NETWORKING"], location: "Coimbatore, India", year: "2026" },
  { image: prefix("/hero-bg.png"), title: "CovaiTech Park Hub", tags: ["CAMPUS", "OVERVIEW"], location: "Coimbatore, India", year: "2026" },
];

// FAQ Data
const FAQS = [
  {
    question: "What are your operating hours?",
    answer: "Our workspaces are accessible 24/7 for dedicated desk and private cabin members. Day pass users and visitors can access the space from 8:00 AM to 8:00 PM on weekdays."
  },
  {
    question: "Is high-speed internet included?",
    answer: "Yes! All our workspaces come with enterprise-grade, high-speed dual-fiber SLA backup internet to ensure uninterrupted connectivity."
  },
  {
    question: "Can I upgrade my workspace as my team grows?",
    answer: "Absolutely. We offer flexible scalability, allowing you to transition from hot desks to private cabins or even managed enterprise suites as your team expands."
  },
  {
    question: "Do you provide business registration (GST) services?",
    answer: "Yes, our Virtual Office plans include an official business address which can be used for company registration and GST purposes."
  }
];

const CITIES = [
  // Coimbatore hub + sub-locations
  { name: "Coimbatore", icon: "gopuram", image: "https://images.pexels.com/photos/13219418/pexels-photo-13219418.jpeg" },
  { name: "Nehru Nagar", icon: "office-block", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" },
  { name: "Saravanampatti", icon: "tech-hub", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80" },
  { name: "Peelamedu", icon: "airport-city", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80" },
  { name: "RS Puram", icon: "boulevard", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80" },
  { name: "Gandhipuram", icon: "city-center", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80" },
  // Trichy hub + sub-locations
  { name: "Trichy", icon: "gopuram", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80" },
  { name: "Thillai Nagar", icon: "residential-biz", image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80" },
  { name: "Cantonment", icon: "heritage-zone", image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1200&q=80" },
  { name: "Woraiyur", icon: "industry-park", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80" },
  { name: "KK Nagar", icon: "smart-zone", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80" },
  { name: "Srirangam", icon: "temple-city", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80" }
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
      <span className="font-outfit font-bold text-2xl tracking-tighter text-slate-800 uppercase">
        we<span className="text-slate-400">work</span>
      </span>
    )
  },
  {
    name: "awfis",
    element: (
      <span className="font-sans font-bold text-2xl tracking-tight text-red-500">
        aw<span className="text-orange-500">fis</span>
      </span>
    )
  },
  {
    name: "innov8",
    element: (
      <span className="font-sans font-bold text-xl tracking-wider text-orange-600 uppercase">
        INNOV<span className="text-orange-400">8</span>
      </span>
    )
  },
  {
    name: "91springboard",
    element: (
      <span className="font-mono font-bold text-base tracking-wider text-slate-700 uppercase">
        91<span className="text-slate-400 font-normal">springboard</span>
      </span>
    )
  },
  {
    name: "instaoffice",
    element: (
      <span className="font-outfit font-bold text-xl tracking-tight text-slate-800">
        Insta<span className="text-orange-500">Office</span>
      </span>
    )
  },
  {
    name: "indiqube",
    element: (
      <div className="flex items-center gap-1">
        <div className="w-5 h-5 bg-teal-500 rounded-sm transform rotate-45 flex items-center justify-center">
          <span className="text-[10px] text-white font-bold transform -rotate-45">I</span>
        </div>
        <span className="font-sans font-bold text-lg tracking-wider text-teal-800 uppercase">
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

  // Phases stacked scroll — active slide index
  const [activePhase, setActivePhase] = useState(0);




  // Testimonials slider variables
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testifierTransition, setTestifierTransition] = useState(false);

  // Embla Carousel setup for gallery
  const [galleryRef, galleryApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1
  });
  const scrollGalleryPrev = useCallback(() => {
    if (galleryApi) galleryApi.scrollPrev();
  }, [galleryApi]);
  const scrollGalleryNext = useCallback(() => {
    if (galleryApi) galleryApi.scrollNext();
  }, [galleryApi]);

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

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
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
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

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
          // Keep deployment track as active ID during its scroll scroll track
          if (entry.target.id === "deployment-track") {
            setActiveSection("deployment-track");
          } else {
            setActiveSection(entry.target.id);
          }
        }
      });
    }, observerOptions);

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Stacked card scroll tracker for phases section (desktop only)
  useEffect(() => {
    const handlePhaseScroll = () => {
      if (window.innerWidth < 1024) return;
      const section = document.getElementById("deployment-track-desktop");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
      const newIndex = Math.min(
        Math.floor(progress * DEPLOYMENT_PHASES.length),
        DEPLOYMENT_PHASES.length - 1
      );
      setActivePhase(newIndex);
    };
    window.addEventListener("scroll", handlePhaseScroll, { passive: true });
    window.addEventListener("resize", handlePhaseScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handlePhaseScroll);
      window.removeEventListener("resize", handlePhaseScroll);
    };
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

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingFirstName && bookingLastName && bookingEmail && bookingPhone) {
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
  };





  return (
    <div className="min-h-screen bg-white text-brand-navy flex flex-col font-inter relative select-none font-bold text-base">
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
            "telephone": "+919360780768",
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
      
      {/* VERTICAL SCROLL NAVIGATION TIMELINE — hidden on hero, visible from 2nd section */}
      <div
        className="fixed right-3 sm:right-6 xl:right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-50 p-2.5 sm:p-3 bg-[#091b29]/95 backdrop-blur-md rounded-full border border-white/10 shadow-xl transition-all duration-500"
        style={{
          opacity: activeSection === "hero" ? 0 : 1,
          transform: `translateY(-50%) translateX(${activeSection === "hero" ? "24px" : "0px"})`,
          pointerEvents: activeSection === "hero" ? "none" : "auto",
        }}
      >
        <div className="relative flex flex-col items-center gap-4 py-2">
          <div className="dot-timeline-line bg-white/10" />
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                title={sec.label}
                className="w-3.5 h-3.5 rounded-full transition-all duration-300 relative group flex items-center justify-center animate-float-delayed"
              >
                <span className={`rounded-full transition-all duration-500 ${
                  isActive 
                    ? "w-3.5 h-3.5 bg-brand-orange scale-110 shadow-lg shadow-brand-orange/40" 
                    : "w-2.5 h-2.5 bg-white/35 hover:bg-white"
                }`} />
                <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-brand-navy text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg pointer-events-none whitespace-nowrap translate-x-2 group-hover:translate-x-0 border border-white/10">
                  {sec.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      <header
        className={`left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "fixed top-0 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-2.5 lg:py-3.5"
            : "absolute top-0 bg-white shadow-sm border-b border-slate-100 py-3 lg:py-4"
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 xl:px-12 flex justify-between items-center gap-2 sm:gap-3 lg:gap-4">
          
          {/* Logo Card (Left) */}
          <a
            href="#"
            className="flex items-center shrink-0 transition-all duration-300 hover:scale-[1.02] p-1.5 sm:p-2 bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-100 min-w-0"
          >
            <Image
              src={prefix("/covai-tech-park-logo.png")}
              alt="Covai Tech Park"
              width={180}
              height={85}
              priority
              className="object-contain h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] xl:max-w-[200px]"
            />
          </a>

          {/* Centered Desktop Navigation Menus */}
          <nav
            className="hidden xl:flex items-center gap-8 text-[12px] font-medium tracking-widest uppercase mx-auto transition-colors duration-300 text-slate-700"
          >
            
            <div className="relative group cursor-pointer">
              <a href="#locations" className="hover:text-brand-orange transition-colors flex items-center gap-1">Locations <span className="text-[8px]">▼</span></a>
              <div className="absolute top-full left-0 mt-4 w-52 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 flex flex-col p-2 text-sm normal-case tracking-normal font-medium z-50">
                <a href={prefix("/coimbatore")} className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Coimbatore</a>
                <a href="https://trichycoworks.com/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Trichy</a>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <a href="#services-dark" className="hover:text-brand-orange transition-colors flex items-center gap-1">Services <span className="text-[8px]">▼</span></a>
              <div className="absolute top-full left-0 mt-4 w-52 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 flex flex-col p-2 text-sm normal-case tracking-normal font-medium z-50">
                <a href="#services-dark" className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Private Office</a>
                <a href="#services-dark" className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Managed Office</a>
                <a href="#services-dark" className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Virtual Office</a>
                <a href="#services-dark" className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Meeting Rooms</a>
                <a href="#services-dark" className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Event Space</a>
              </div>
            </div>
            <a href="#" className="hover:text-brand-orange transition-colors">Blog</a>
            <a href="#contact" className="hover:text-brand-orange transition-colors">Contact</a>
          </nav>

          {/* CTAs (Right) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
            {/* WhatsApp Highlighted Button */}
            <a
              href="https://wa.me/919042065360"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 rounded-full text-[10px] sm:text-[11px] font-normal uppercase tracking-wider sm:tracking-widest bg-[#25d366] text-white hover:bg-[#1da851] transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 32 32" fill="white">
                <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.828 1.781 6.858L2 30l7.352-1.758A13.918 13.918 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.46 11.46 0 01-5.844-1.598l-.42-.25-4.36 1.043 1.074-4.248-.277-.438A11.46 11.46 0 014.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.524c-.344-.172-2.035-1.004-2.349-1.118-.314-.115-.543-.172-.771.172-.229.344-.88 1.118-1.079 1.347-.199.229-.397.257-.741.086-.344-.172-1.453-.535-2.766-1.707-1.022-.913-1.713-2.04-1.912-2.384-.199-.344-.021-.53.15-.7.154-.153.344-.4.516-.6.172-.2.229-.344.344-.572.114-.229.057-.43-.029-.601-.086-.172-.771-1.858-1.057-2.546-.278-.668-.56-.578-.771-.588l-.657-.011c-.229 0-.6.086-.914.43-.314.344-1.2 1.176-1.2 2.865s1.228 3.325 1.4 3.554c.171.229 2.42 3.695 5.863 5.182.82.354 1.46.566 1.959.724.824.262 1.574.225 2.167.136.66-.098 2.035-.831 2.32-1.634.286-.803.286-1.49.2-1.634-.086-.143-.314-.229-.657-.4z" />
              </svg>
              <span className="hidden lg:inline">+91 90420 65360</span>
              <span className="hidden sm:inline lg:hidden">WhatsApp</span>
              <span className="sm:hidden sr-only">WhatsApp</span>
            </a>

            <button
              onClick={() => handleOpenBooking("Book Space")}
              className="hidden md:flex px-4 py-2.5 lg:px-6 lg:py-3 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest bg-gradient-to-r from-brand-orange to-[#ffaa66] text-white hover:scale-103 transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap items-center gap-2"
            >
              Book Space
              <span className="text-sm font-bold">&rarr;</span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-350 cursor-pointer shrink-0 text-slate-800 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer — side drawer layout */}
        <div className={`fixed inset-y-0 right-0 w-full max-w-xs bg-brand-navy/98 backdrop-blur-2xl z-50 flex flex-col justify-center items-center gap-6 xl:hidden transition-transform duration-500 shadow-2xl ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          {/* Close button inside drawer */}
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white cursor-pointer transition-colors duration-250"
            aria-label="Close Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav className="flex flex-col items-center gap-6 text-[15px] font-bold text-white uppercase tracking-widest w-full px-8">
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/45 text-[10px] tracking-widest uppercase">Locations</span>
              <a href={prefix("/coimbatore")} onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors text-sm normal-case tracking-normal">Coimbatore</a>
              <a href="https://trichycoworks.com/" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors text-sm normal-case tracking-normal">Trichy</a>
            </div>
            <a href="#services-dark" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Services</a>
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Blog</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Contact</a>
            
            <div className="w-full h-px bg-white/10 max-w-[160px] my-3 shrink-0" />
            
            {/* WhatsApp Link in Mobile Drawer */}
            <a
              href="https://wa.me/919042065360"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#25d366] text-white hover:bg-[#1da851] transition-all duration-300 w-full justify-center max-w-[220px] shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 32 32" fill="white">
                <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.828 1.781 6.858L2 30l7.352-1.758A13.918 13.918 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.46 11.46 0 01-5.844-1.598l-.42-.25-4.36 1.043 1.074-4.248-.277-.438A11.46 11.46 0 014.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.524c-.344-.172-2.035-1.004-2.349-1.118-.314-.115-.543-.172-.771.172-.229.344-.88 1.118-1.079 1.347-.199.229-.397.257-.741.086-.344-.172-1.453-.535-2.766-1.707-1.022-.913-1.713-2.04-1.912-2.384-.199-.344-.021-.53.15-.7.154-.153.344-.4.516-.6.172-.2.229-.344.344-.572.114-.229.057-.43-.029-.601-.086-.172-.771-1.858-1.057-2.546-.278-.668-.56-.578-.771-.588l-.657-.011c-.229 0-.6.086-.914.43-.314.344-1.2 1.176-1.2 2.865s1.228 3.325 1.4 3.554c.171.229 2.42 3.695 5.863 5.182.82.354 1.46.566 1.959.724.824.262 1.574.225 2.167.136.66-.098 2.035-.831 2.32-1.634.286-.803.286-1.49.2-1.634-.086-.143-.314-.229-.657-.4z" />
              </svg>
              +91 90420 65360
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenBooking("Schedule a Tour");
              }}
              className="mt-2 px-8 py-3.5 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg w-full max-w-[220px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              Book Space Now
            </button>
          </nav>
        </div>
      </header>

      {/* HERO SECTION DESIGN CAROUSEL (100vh) */}
      <section id="hero" className="relative min-h-[100dvh] sm:h-screen w-full flex flex-col justify-center lg:justify-center pt-[3.5rem] sm:pt-16 md:pt-20 pb-5 sm:pb-8 lg:pb-0 overflow-hidden bg-brand-navy text-white herosmall" >
        
        {/* Dynamic sliding backgrounds */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="flex w-[500%] h-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${activeHeroSlide * 20}%)` }}
          >
            {HERO_SLIDES.map((slide) => (
              <div
                key={slide.id}
                className="relative w-1/5 h-full flex-shrink-0"
              >
                <Image
                  src={slide.image}
                  alt={slide.label}
                  fill
                  priority={slide.id === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          {/* Vignette dark overlay for text contrast (left 80% opacity to right fully transparent) */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/70 to-brand-navy/50 z-10 pointer-events-none lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent z-10 pointer-events-none hidden lg:block" />
          
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
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[15vw] font-bold leading-none text-outline-white opacity-[0.05] z-10 font-outfit tracking-widest uppercase pointer-events-none text-center w-full">
          COVAITECH
        </div>

        <div className="w-full section-x grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-20 lg:flex-1">
          
          {/* Left info column */}
          <div className="lg:col-span-7 text-left space-y-4 sm:mb-20 md:mb-0 sm:space-y-5 lg:space-y-7 max-w-2xl relative z-20 w-full">
            <div className="absolute -top-1/4 -left-4 sm:-left-12 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-brand-orange/15 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/95 shadow-xl max-w-full">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse shrink-0" />
              <span className="text-[10px] font-normal tracking-widest leading-none uppercase">
                {HERO_SLIDES[activeHeroSlide].meta}
              </span>
            </div>

            <h1 className="text-[2.25rem] min-[400px]:text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-outfit font-bold tracking-tight text-white leading-[1.08] relative">
              {HERO_SLIDES[activeHeroSlide].title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ffaa66]">
                {HERO_SLIDES[activeHeroSlide].subtitle}
              </span>
              {/* Short horizontal line accent */}
              <span className="block w-16 h-[3px] bg-brand-orange mt-6 rounded-full" />
            </h1>

            <div className="flex flex-col gap-5 pt-1 text-left">
              <p className="text-sm sm:text-base md:text-lg text-white/80 font-normal leading-relaxed max-w-xl">
                {HERO_SLIDES[activeHeroSlide].description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
                <button
                  onClick={() => handleOpenBooking("Get Quote (Hero)")}
                  className="px-6 py-3.5 sm:px-8 sm:py-4 bg-brand-orange text-white hover:bg-white hover:text-brand-navy font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-orange-500/10 hover:scale-[1.03] cursor-pointer flex items-center gap-2"
                >
                  Get Quote
                  <span className="text-sm font-bold">&rarr;</span>
                </button>
                <a
                  href="#locations"
                  className="px-6 py-3.5 sm:px-8 sm:py-4 border border-white/35 text-white hover:bg-white hover:text-brand-navy font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-[1.03] cursor-pointer flex items-center gap-2 text-center decoration-transparent"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>

          {/* Slide thumbnails — vertical list with vertical dot line on desktop */}
          <div className="lg:col-span-5 w-full z-20 flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
            <div className="relative flex items-stretch gap-6 w-full lg:max-w-[320px] xl:max-w-[360px]">
              
              {/* Vertical Timeline Dot Connector (Desktop only) */}
              <div className="absolute left-1.5 top-[15%] bottom-[15%] w-[1px] bg-white/15 hidden lg:block z-0 pointer-events-none" />

              <div className="w-full flex flex-row lg:flex-col gap-3 sm:gap-4 lg:gap-5 justify-center items-center relative z-10 overflow-x-auto lg:overflow-visible no-scrollbar pb-4 lg:pb-0 px-4 lg:px-0 snap-x">
                {HERO_SLIDES.map((slide, i) => {
                  const isActive = activeHeroSlide === i;

                  return (
                    <div 
                      key={slide.id} 
                      className="flex-shrink-0 transition-all duration-700 ease-in-out snap-center w-[140px] sm:w-[160px] lg:w-full flex items-center gap-4 justify-center"
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
                        className={`relative rounded-xl sm:rounded-2xl border font-bold transition-all duration-700 cursor-pointer overflow-hidden bg-white/60 backdrop-blur-md ${
                          isActive
                            ? "border-brand-orange ring-2 ring-brand-orange/40 shadow-lg shadow-brand-orange/20 opacity-100 scale-100 lg:h-[100px] w-full"
                            : "border-white/10 opacity-45 scale-90 lg:h-[80px] w-[70%]"
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
                            <span className="text-[9px] sm:text-[10px] font-normal tracking-widest text-white uppercase drop-shadow-md text-left leading-tight">
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
          
          {/* <div className="relative inline-block mb-2">
            <span className="absolute -top-3 -left-3 w-10 h-10 bg-yellow-200/60 rounded-full -z-10 blur-[1px]" />
            <h3 className="font-outfit font-bold text-2xl md:text-3xl text-slate-800 tracking-tight">
              Our CoWorking Partners
            </h3>
          </div> */}
          {/* <div className="w-16 h-0.5 bg-blue-500 mx-auto mb-10" /> */}

          {/* Marquee Wrapper with Drag Support */}
          <div className="w-full overflow-x-auto no-scrollbar py-2 cursor-grab active:cursor-grabbing select-none">
            <div className="animate-marquee flex gap-12 md:gap-16 items-center">
              {/* Loop logos twice for infinite marquee effect */}
              {[...BRANDS, ...BRANDS].map((brand, idx) => (
                <div 
                  key={`${brand.name}-${idx}`} 
                  className="flex-shrink-0  opacity-60 hover:opacity-100 transition-all duration-350 px-6 pointer-events-none"
                >
                  {brand.element}
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Left: Image styled naturally */}
              <div className="relative w-full aspect-square sm:aspect-video lg:aspect-square rounded-[2rem] lg:rounded-[3rem] overflow-hidden">
                <Image
                  src={prefix("/hero13.jpg")}
                  alt="CovaiTech Park premium workspace lounge"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Right: Text Content */}
              <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
                <span className="text-xs font-bold text-brand-orange uppercase tracking-[0.28em] block leading-none">
                  About Covai Tech Park (Unit of MAX OFFICE)
                </span>

                <h2 className="text-4xl sm:text-5xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight leading-[1.05]">
                  Business Ecosystem for<br />Collaboration & Growth
                </h2>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-lg">
                  Covai Tech Park® and Trichy Coworks, brands under MAX OFFICE, have enabled the growth of 650+ businesses across Tamil Nadu through premium managed offices, coworking spaces, and flexible workspace solutions. Today, we manage over 1,50,000 sq. ft. of office infrastructure across multiple locations, serving startups, enterprises, and global brands alike.
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
                  {[
                    { val: "4,500+", label: "Seats", color: "text-brand-orange" },
                    { val: "650+", label: "Clients Served", color: "text-teal-500" },
                    { val: "8", label: "Locations", color: "text-brand-orange" },
                    { val: "2", label: "Cities", color: "text-teal-500" },
                  ].map(stat => (
                    <div key={stat.label} className="space-y-1">
                      <p className={`font-outfit font-bold text-2xl ${stat.color} leading-none`}>{stat.val}</p>
                      <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <button
                    onClick={() => handleOpenBooking("About Section Inquiry")}
                    className="inline-block px-8 py-3.5 bg-brand-orange hover:bg-brand-navy text-white font-bold text-[11px] uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg cursor-pointer hover:scale-[1.02]"
                  >
                    Inquire About Spaces
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AWARDS & RECOGNITION SECTION — 2x2 Dark Card Grid with Wreath Icons */}
      <section className="relative w-full overflow-hidden bg-[#060c10] py-24 sm:py-32 border-t border-b border-white/5">
        {/* Background elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(243,112,33,0.10),transparent_60%)]" />
        </div>
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-[5%] right-[5%] w-[350px] h-[350px] bg-brand-orange/4 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto section-x">
          {/* Header */}
          <div className="text-center mb-14 sm:mb-20 reveal reveal-up">
            <span className="text-[11px] font-bold text-brand-orange uppercase tracking-[0.3em] block leading-none mb-5">
              AWARDS &amp; RECOGNITION
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold tracking-tight text-white leading-tight">
              Recognized for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ffaa66]">Excellence</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-normal leading-relaxed max-w-2xl mx-auto mt-5">
              MAX OFFICE — Covai Tech Park &amp; Trichy Coworks — is committed to setting new benchmarks in workspace design, IT infrastructure, and corporate hospitality.
            </p>
          </div>

          {/* 2×2 Award Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 reveal reveal-up">

            {/* Card 1 — Workspace Accelerator */}
            <div className="group relative bg-gradient-to-br from-[#0d1520] to-[#091016] rounded-3xl border border-white/8 p-8 sm:p-10 flex flex-col gap-6 hover:border-brand-orange/40 hover:-translate-y-1 transition-all duration-500 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-brand-orange/5 rounded-full blur-3xl group-hover:bg-brand-orange/10 transition-all duration-700" />
              {/* Wreath trophy icon */}
              <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange group-hover:scale-110 group-hover:bg-brand-orange/20 transition-all duration-300 shadow-lg shadow-brand-orange/10">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                </svg>
              </div>
              <div className="text-left space-y-2">
                <span className="text-[9px] font-bold text-brand-orange/80 uppercase tracking-[0.22em]">SOUTH INDIA ECOSYSTEM — 2024</span>
                <h3 className="font-outfit font-bold text-xl sm:text-2xl text-white group-hover:text-brand-orange transition-colors duration-300 leading-snug">Workspace Accelerator Award</h3>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">
                  Awarded for outstanding ecosystem growth and flexible workspace delivery across South India — redefining high-compliance office infrastructure standards.
                </p>
              </div>
              <div className="pt-4 border-t border-white/8 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1">
                    {["#f37021", "#ffaa66", "#f37021"].map((c, i) => (
                      <div key={i} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.6 + i * 0.2 }} />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-brand-orange/70 uppercase tracking-widest">South India Award</span>
                </div>
              </div>
            </div>

            {/* Card 2 — Elite Workplace */}
            <div className="group relative bg-gradient-to-br from-[#0d1520] to-[#091016] rounded-3xl border border-white/8 p-8 sm:p-10 flex flex-col gap-6 hover:border-brand-orange/40 hover:-translate-y-1 transition-all duration-500 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-brand-orange/5 rounded-full blur-3xl group-hover:bg-brand-orange/10 transition-all duration-700" />
              {/* Medal icon */}
              <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange group-hover:scale-110 group-hover:bg-brand-orange/20 transition-all duration-300 shadow-lg shadow-brand-orange/10">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <div className="text-left space-y-2">
                <span className="text-[9px] font-bold text-brand-orange/80 uppercase tracking-[0.22em]">REALTY LEADERSHIP FORUM — 2024</span>
                <h3 className="font-outfit font-bold text-xl sm:text-2xl text-white group-hover:text-brand-orange transition-colors duration-300 leading-snug">Elite Workplace Excellence</h3>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">
                  Honored for architectural design, ergonomic amenities, and premium corporate hospitality — delivering high-performance office ecosystems for modern teams.
                </p>
              </div>
              <div className="pt-4 border-t border-white/8 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1">
                    {["#f37021", "#ffaa66", "#f37021"].map((c, i) => (
                      <div key={i} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.6 + i * 0.2 }} />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-brand-orange/70 uppercase tracking-widest">Realty Leadership</span>
                </div>
              </div>
            </div>

            {/* Card 3 — ISO Certified */}
            <div className="group relative bg-gradient-to-br from-[#0d1520] to-[#091016] rounded-3xl border border-white/8 p-8 sm:p-10 flex flex-col gap-6 hover:border-brand-orange/40 hover:-translate-y-1 transition-all duration-500 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-brand-orange/5 rounded-full blur-3xl group-hover:bg-brand-orange/10 transition-all duration-700" />
              {/* Shield/certified icon */}
              <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange group-hover:scale-110 group-hover:bg-brand-orange/20 transition-all duration-300 shadow-lg shadow-brand-orange/10">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div className="text-left space-y-2">
                <span className="text-[9px] font-bold text-brand-orange/80 uppercase tracking-[0.22em]">QUALITY CERTIFICATION — 2023</span>
                <h3 className="font-outfit font-bold text-xl sm:text-2xl text-white group-hover:text-brand-orange transition-colors duration-300 leading-snug">ISO 9001:2015 Certified</h3>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">
                  Certified for operational excellence and high compliance across all workspace facilities — ensuring consistent quality in every interaction.
                </p>
              </div>
              <div className="pt-4 border-t border-white/8 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1">
                    {["#f37021", "#ffaa66", "#f37021"].map((c, i) => (
                      <div key={i} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.6 + i * 0.2 }} />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-brand-orange/70 uppercase tracking-widest">Certified Excellence</span>
                </div>
              </div>
            </div>

            {/* Card 4 — Member Satisfaction */}
            <div className="group relative bg-gradient-to-br from-[#0d1520] to-[#091016] rounded-3xl border border-white/8 p-8 sm:p-10 flex flex-col gap-6 hover:border-brand-orange/40 hover:-translate-y-1 transition-all duration-500 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-brand-orange/5 rounded-full blur-3xl group-hover:bg-brand-orange/10 transition-all duration-700" />
              {/* Heart/community icon */}
              <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange group-hover:scale-110 group-hover:bg-brand-orange/20 transition-all duration-300 shadow-lg shadow-brand-orange/10">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <div className="text-left space-y-2">
                <span className="text-[9px] font-bold text-brand-orange/80 uppercase tracking-[0.22em]">MEMBER SATISFACTION — 2024</span>
                <h3 className="font-outfit font-bold text-xl sm:text-2xl text-white group-hover:text-brand-orange transition-colors duration-300 leading-snug">98% Member Retention</h3>
                <p className="text-slate-400 text-sm font-normal leading-relaxed">
                  Recognized for exceptional service quality, community building, and member satisfaction — trusted by 650+ businesses across Tamil Nadu.
                </p>
              </div>
              <div className="pt-4 border-t border-white/8 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1">
                    {["#f37021", "#ffaa66", "#f37021"].map((c, i) => (
                      <div key={i} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.6 + i * 0.2 }} />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-brand-orange/70 uppercase tracking-widest">Top Rated Workspace</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


 {/* SERVICES GRID (Image 4 Style - 100vh) */}
      <section id="locations" className="w-full min-h-[100vh] flex bg-white border-t border-slate-100 overflow-hidden">
        <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">

          {/* LEFT: Heading + Dropdowns + City Grid */}
          <div className="col-span-1 lg:col-span-7 xl:col-span-7 pl-4 sm:pl-6 md:pl-10 lg:pl-12 xl:pl-16 pr-4 sm:pr-6 md:pr-10 lg:pr-12 xl:pr-16 py-10 sm:py-14 lg:py-16 space-y-8 relative z-10">

            {/* Heading block with yellow circle decoration */}
            <div className="space-y-4 relative">
              {/* Yellow decorative accent circle */}
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-[#ffe066]/80 -z-10" />
              <span className="text-xs font-bold text-brand-orange uppercase tracking-[0.3em] block leading-none relative z-10">OUR LOCATIONS</span>
              <h2 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.05] relative z-10">
                Choose from <span className="text-brand-orange">100,000+</span><br />spaces to Work &amp; Live
              </h2>
              <p className="text-slate-500 text-md leading-relaxed max-w-md relative z-10 font-normal">
                Explore tech-ready coworking hubs in prime business districts across major Indian cities.
              </p>
            </div>

            {/* Dropdown Filters (Mockup style from reference image) */}
            {/* <div className="flex flex-wrap gap-4 items-center z-10 relative">
              <div className="relative min-w-[160px] sm:min-w-[180px]">
                <select className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 pr-10 appearance-none focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange cursor-pointer font-normal shadow-sm">
                  <option>Looking For</option>
                  <option>Coworking Space</option>
                  <option>Private Office</option>
                  <option>Meeting Room</option>
                  <option>Managed Suite</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative min-w-[160px] sm:min-w-[180px]">
                <select 
                  value={activeCity}
                  onChange={(e) => {
                    if (e.target.value) {
                      setActiveCity(e.target.value);
                    }
                  }}
                  className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 pr-10 appearance-none focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange cursor-pointer font-normal shadow-sm"
                >
                  <option value="">Select City</option>
                  {CITIES.map(c => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div> */}

            {/* City Icon Grid — reference style with circular borders & realistic icons */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-3 gap-y-5 pt-4">
              {CITIES.map((city) => {
                const isActive = activeCity === city.name;
                return (
                  <button
                    key={city.name}
                    onClick={() => {
                      if (city.name === "Coimbatore" || city.name === "Nehru Nagar" || city.name === "Saravanampatti" || city.name === "Peelamedu" || city.name === "RS Puram" || city.name === "Gandhipuram") {
                        window.location.href = prefix("/coimbatore");
                      } else if (city.name === "Trichy" || city.name === "Thillai Nagar" || city.name === "Cantonment" || city.name === "Woraiyur" || city.name === "KK Nagar" || city.name === "Srirangam") {
                        window.open("https://trichycoworks.com/", "_blank");
                      } else {
                        setActiveCity(city.name);
                      }
                    }}
                    className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
                  >
                    {/* Circle Container */}
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 relative shadow-sm ${
                        isActive
                          ? "bg-slate-800 border-2 border-slate-800 scale-105 shadow-md"
                          : "bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:scale-105"
                      }`}
                    >
                      <CityIcon
                        icon={city.icon}
                        className={`w-9 h-9 fill-none transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-slate-600 group-hover:text-brand-orange"
                        }`}
                      />
                    </div>

                    {/* City name — normal weight, bold only when active */}
                    <span
                      className={`text-[12px] tracking-wide text-center leading-none transition-colors duration-300  ${
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

          {/* RIGHT: Large full-height image with round bottom-left corner */}
          <div className="col-span-1 lg:col-span-5 xl:col-span-5 relative w-full min-h-[400px] sm:min-h-[500px] lg:min-h-0 lg:h-full">
            <div className="relative w-full h-full lg:absolute lg:inset-0 overflow-hidden ">
              <Image
                src={CITIES.find(c => c.name === activeCity)?.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"}
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
        
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-orange/5 rounded-full ambient-glow" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-brand-navy/5 rounded-full ambient-glow" />
        
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
              <span className="text-[11px] font-bold text-brand-orange uppercase tracking-[0.25em] block leading-none">
                CORE OFFERINGS
              </span>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-outfit font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-orange">
                Our Services. Built for Teams.
              </h2>
            </div>
            <p className="text-white/75 text-base max-w-sm leading-relaxed text-left">
              We certify and handle all logistics for high-compliance enterprise offices, so that your tech organization handles nothing but actual coding tasks.
            </p>
          </div>

          {/* Large Services Grid — 4-col on xl, 3-col on lg, 2-col on tablet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mt-12">
            {SERVICES_TAILORED.map((service, idx) => {
              return (
                <div
                  key={service.id}
                  className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-brand-orange/45 transition-all duration-500 flex flex-col justify-end text-left p-6 sm:p-8 cursor-pointer reveal reveal-up h-64 sm:h-72"
                  style={{ transitionDelay: `${idx * 60}ms` }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-75 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2b3748]/90 via-[#2b3748]/30 to-transparent z-10" />

                  <div className="relative z-20 space-y-3">
                    <h4 className="font-outfit font-bold text-lg sm:text-xl text-white tracking-tight leading-tight group-hover:text-brand-orange transition-colors duration-300">
                      {service.title}
                    </h4>
                    <div className="pt-1.5 shrink-0">
                      <span className="text-[10px] sm:text-xs font-bold text-brand-orange tracking-widest uppercase flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform">
                        {service.linkText} <span className="text-xs sm:text-sm">&rarr;</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA for Services */}
          <div className="flex justify-center pt-10 sm:pt-14 reveal reveal-up">
            <button
              onClick={() => handleOpenBooking("Custom Workspace Consultation")}
              className="px-8 py-4 sm:px-10 sm:py-4.5 bg-brand-orange text-white hover:bg-white hover:text-brand-navy font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-brand-orange/25 hover:scale-[1.03] cursor-pointer flex items-center gap-2"
            >
              Request Custom Office Solution
              <span className="text-sm font-bold">&rarr;</span>
            </button>
          </div>

        </div>
      </section>


      {/* FACILITIES — ScrollTrigger Stacked Card Layout */}
      <section id="deployment-track" className="relative w-full bg-[#f8fafc] section-x py-16 sm:py-24">
        {/* Transparent Coworking Shapes (Floating) */}
        <div className="absolute bottom-10 right-10 w-80 h-80 opacity-[0.03] text-slate-800 pointer-events-none select-none z-10 hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
            <rect x="10" y="20" width="30" height="20" rx="2" />
            <rect x="15" y="25" width="20" height="10" rx="1" />
            <circle cx="25" cy="15" r="4" />
            <line x1="20" y1="28" x2="30" y2="28" />
            <rect x="60" y="50" width="30" height="20" rx="2" />
            <rect x="65" y="55" width="20" height="10" rx="1" />
            <circle cx="75" cy="45" r="4" />
            <line x1="70" y1="58" x2="80" y2="58" />
            <path d="M5 80h90v1H5z" />
          </svg>
        </div>
        
        {/* Additional Floating Shape */}
        <div className="absolute top-20 left-10 w-40 h-40 opacity-[0.03] text-slate-800 pointer-events-none select-none z-10 hidden lg:block">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
            <path d="M20 80 L50 20 L80 80 Z" strokeDasharray="2 2"/>
            <circle cx="50" cy="50" r="30" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Mobile / tablet: natural height so image + content are fully visible */}
        <div className="lg:hidden">
          <div className="text-center mb-8 sm:mb-10 reveal reveal-up">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] block">
              OUR FACILITIES
            </span>
            <h2 className="font-outfit font-bold text-2xl sm:text-3xl text-slate-800 leading-tight tracking-tight mt-1">
              Premium facilities for modern teams.
            </h2>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8 max-w-2xl mx-auto z-20 relative reveal reveal-up delay-100">
            {DEPLOYMENT_PHASES.map((phase) => (
              <article
                key={phase.id}
                className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white"
              >
                <div className="relative w-full aspect-[16/10] sm:aspect-[5/3]">
                  <Image
                    src={phase.image}
                    alt={phase.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 drop-shadow-md">
                    {phase.subtitle}
                  </span>
                </div>
                <div className="bg-slate-50 p-5 sm:p-6">
                  <DeploymentPhaseContent
                    phase={phase}
                    onInquire={handleOpenBooking}
                    compact
                  />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Desktop: sticky scroll stacked cards */}
        <div
          id="deployment-track-desktop"
          style={{ height: `${DEPLOYMENT_PHASES.length * 100}vh` }}
          className="hidden lg:block relative w-full"
        >
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#f8fafc]">
            <div className="absolute top-10 left-0 right-0 flex flex-col items-center text-center section-x z-20 pointer-events-none">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em] block">
                OUR FACILITIES
              </span>
              <h2 className="font-outfit font-bold text-3xl md:text-5xl text-slate-800 leading-none tracking-tight mt-2">
                Premium facilities for modern teams.
              </h2>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
              {DEPLOYMENT_PHASES.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: i === activePhase ? "32px" : "8px",
                    height: "8px",
                    background: i === activePhase ? "#f37021" : "rgba(15,23,42,0.15)",
                  }}
                />
              ))}
            </div>

            <div className="relative w-full max-w-6xl mt-24 mx-auto section-x deployment-card-stack h-[65vh]">
              {DEPLOYMENT_PHASES.map((phase, idx) => {
                const diff = idx - activePhase;
                const isActive = diff === 0;
                const isBehind = diff < 0;
                const absDiff = Math.abs(diff);
                const scale = isActive ? 1 : isBehind ? Math.max(1 - absDiff * 0.05, 0.85) : 0.95;
                const opacity = isActive ? 1 : isBehind ? Math.max(0.6 - absDiff * 0.18, 0.08) : 0;
                const translateY = isActive ? 0 : isBehind ? -(absDiff * 25) : 80;
                const zIndex = isActive ? 20 : isBehind ? 20 - absDiff : 0;

                return (
                  <div
                    key={phase.id}
                    className="absolute inset-0 rounded-[2.5rem] overflow-hidden grid grid-cols-2 shadow-2xl bg-white border border-slate-100"
                    style={{
                      transform: `scale(${scale}) translateY(${translateY}px)`,
                      opacity,
                      zIndex,
                      transition:
                        "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                      pointerEvents: isActive ? "auto" : "none",
                      transformOrigin: "center top",
                    }}
                  >
                    <div className="relative min-h-0 overflow-hidden h-full">
                      <Image
                        src={phase.image}
                        alt={phase.title}
                        fill
                        sizes="50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/10" />
                    </div>
                    <div className="bg-slate-50 p-10 lg:p-14 flex flex-col justify-center overflow-y-auto h-full relative">
                      {/* Subtle watermark shape inside the card */}
                      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                         <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
                           <rect x="20" y="20" width="60" height="60" rx="10" />
                         </svg>
                      </div>
                      <DeploymentPhaseContent phase={phase} onInquire={handleOpenBooking} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-12 bg-white border-t border-slate-100 overflow-hidden w-full section-x reveal reveal-up">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          
          <div className="flex -space-x-3 sm:-space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-md relative overflow-hidden bg-slate-100">
                <Image
                  src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80`}
                  alt={`Member ${i}`}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            ))}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-md bg-slate-50 flex items-center justify-center relative z-10">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-600">+1.5K</span>
            </div>
          </div>

          <div className="text-center md:text-left flex-1">
            <h3 className="font-outfit font-bold text-lg sm:text-xl text-slate-800 leading-tight">
              Join 1,500+ Innovators &amp; Tech Leaders
            </h3>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Trusted by fast-growing startups and global enterprises.
            </p>
          </div>

          <div className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
            <div className="text-center md:text-right">
              <span className="block font-outfit font-black text-2xl sm:text-3xl text-brand-orange leading-none">4.9/5</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">Member Rating</span>
            </div>
          </div>

        </div>
      </section> */}


    

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="section-container w-full flex flex-col justify-center py-16 sm:py-24 relative overflow-hidden bg-[#06090f]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80"
            alt=""
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
          <div className="text-center mb-10 reveal reveal-up">
            <span className="text-[11px] font-bold text-brand-orange uppercase tracking-[0.25em] block leading-none mb-4">TESTIMONIALS</span>
            <h2 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
              Trusted by Teams.
            </h2>
          </div>

          <div className="w-full max-w-4xl p-4 sm:p-8 reveal reveal-up">
            <div className="relative flex items-center justify-center gap-4 mb-10">
              <button onClick={handlePrevTestimonial} className="w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-brand-orange/20 text-white flex items-center justify-center mr-2 cursor-pointer">
                &larr;
              </button>
              
              <div className="flex items-center -space-x-6">
                {TESTIMONIALS.map((t, i) => {
                  const isActive = i === activeTestimonial;
                  const order = [(activeTestimonial + TESTIMONIALS.length - 1) % TESTIMONIALS.length, activeTestimonial, (activeTestimonial + 1) % TESTIMONIALS.length];
                  const pos = order.indexOf(i);
                  return (
                    <button key={t.id} onClick={() => setActiveTestimonial(i)} className={`relative rounded-full overflow-hidden border-4 transition-all duration-500 flex-shrink-0 cursor-pointer ${isActive ? "w-28 h-28 sm:w-36 sm:h-36 border-brand-orange z-20 scale-110" : "w-20 h-20 sm:w-24 sm:h-24 border-white/15 z-10 opacity-50 hover:opacity-80"}`} style={{ order: pos }}>
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                    </button>
                  );
                })}
              </div>

              <button onClick={handleNextTestimonial} className="w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-brand-orange/20 text-white flex items-center justify-center ml-2 cursor-pointer">
                &rarr;
              </button>
            </div>

            <div className={`text-center transition-all duration-400 ease-in-out ${testifierTransition ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
              <span className="font-outfit font-bold text-6xl text-brand-orange/30 leading-none block -mb-4">&ldquo;</span>
              <p className="font-outfit font-bold text-base sm:text-xl md:text-2xl lg:text-3xl text-white tracking-tight leading-snug px-1">
                {TESTIMONIALS[activeTestimonial].quote}
              </p>
              <div className="mt-6 flex flex-col items-center gap-1">
                <div className="w-8 h-0.5 bg-brand-orange rounded-full mb-3" />
                <span className="text-sm font-bold text-white uppercase tracking-[0.15em]">{TESTIMONIALS[activeTestimonial].name}</span>
                <span className="text-xs font-bold text-white/45 uppercase tracking-[0.2em]">{TESTIMONIALS[activeTestimonial].role}</span>
              </div>
            </div>
            
            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className="rounded-full transition-all duration-300 cursor-pointer"
                  style={{ width: i === activeTestimonial ? "28px" : "8px", height: "8px", background: i === activeTestimonial ? "#f37021" : "rgba(255,255,255,0.20)" }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery-works" className="section-container bg-white py-16 sm:py-24 w-full overflow-hidden text-brand-navy relative">
        <div className="w-full flex flex-col items-center relative z-10">
          
          {/* Header block with side-by-side style */}
          <div className="box-container flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16 px-4 w-full">
            <div className="space-y-4 text-left max-w-2xl">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-[0.25em] block">
                - OUR GALLERY
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold tracking-tight leading-none text-slate-800">
                Creative Workspaces That <span className="text-brand-orange">Define Our Style</span>
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row lg:items-end gap-6 w-full lg:w-auto">
              <p className="text-slate-500 text-sm sm:text-base font-normal max-w-md leading-relaxed text-left">
                Explore our beautifully configured spaces — from acoustic private cabins to premium collaborative lounges designed for high-performance software teams.
              </p>
              
              {/* Embla Slider Buttons */}
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={scrollGalleryPrev}
                  className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-brand-orange hover:border-brand-orange hover:text-white text-brand-navy flex items-center justify-center shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
                  aria-label="Previous Slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button
                  onClick={scrollGalleryNext}
                  className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-brand-orange hover:border-brand-orange hover:text-white text-brand-navy flex items-center justify-center shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
                  aria-label="Next Slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Embla Slider Container */}
          <div className="overflow-hidden w-full px-4" ref={galleryRef}>
            <div className="flex gap-6">
              {GALLERY_ITEMS.map((item, index) => (
                <div key={index} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_28%] min-w-0">
                  <div className="group relative flex flex-col text-left">
                    {/* Image Container with rounded-[2rem] exactly like Image 1 */}
                    <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-100 shadow-md">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      
                      {/* Black overlay with circular "View" button in the center on hover */}
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                        <div className="w-16 h-16 rounded-full bg-brand-orange text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg">
                          View
                        </div>
                      </div>

                      {/* White borderless pill tags on top left */}
                      <div className="absolute top-6 left-6 z-10 flex gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-[9px] font-black tracking-wider text-slate-800 uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metadata text below the card */}
                    <div className="mt-5 px-2">
                      <h3 className="font-outfit font-bold text-xl text-slate-900 group-hover:text-brand-orange transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex justify-between items-center mt-1 text-slate-400 text-xs font-normal">
                        <span>{item.location}</span>
                        <span>{item.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-12">
            <button onClick={() => handleOpenBooking("Book a Tour (Gallery Section)")} className="inline-block px-10 py-4 bg-brand-orange text-white hover:bg-brand-navy font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-orange-500/10 hover:scale-[1.03] cursor-pointer text-center">
              Book a Tour Now
            </button>
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section id="faqs" className="w-full bg-[#f8fafc] py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12 reveal reveal-up">
            <span className="text-[11px] font-bold text-brand-orange uppercase tracking-[0.25em] block leading-none mb-4">FAQS</span>
            <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-navy tracking-tight leading-none">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300">
                  <button onClick={() => setOpenFaq(isOpen ? null : idx)} className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none cursor-pointer">
                    <span className="font-outfit font-bold text-lg text-brand-navy">{faq.question}</span>
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
            <span className="text-xs font-bold text-brand-orange uppercase tracking-[0.25em] block leading-none">
              CONNECT WITH US
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight leading-[1.05]">
              Establish your business at Coimbatore or Trichy
            </h2>
            <p className="text-sm sm:text-base text-brand-slate font-bold leading-relaxed">
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
                  <h4 className="font-outfit font-bold text-base text-brand-navy">Coimbatore Main Hub</h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-bold">Nehru Nagar East, Near Saravanampatti Road, Civil Aerodrome Post, Coimbatore - 641014</p>
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
                  <h4 className="font-outfit font-bold text-base text-brand-navy">Trichy Satellite Campus</h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-bold">Thillai Nagar Main Road, West Boulevard, Trichy - 620018</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Minimal Contact Form */}
          <div className="lg:col-span-6 reveal reveal-right">
            <div className="bg-white text-brand-navy rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-xl relative border border-slate-100 flex flex-col gap-6 w-full max-w-lg ml-auto">
              
              <div className="text-left space-y-1">
                <h3 className="font-outfit font-bold text-2xl text-brand-navy leading-none">
                  Get in Touch
                </h3>
                <p className="text-xs text-brand-slate font-medium">
                  Leave your details and we'll reach out shortly.
                </p>
              </div>

              <form className="flex flex-col gap-5 w-full" onSubmit={(e) => { e.preventDefault(); handleOpenBooking("Contact Form"); setBookingOpen(false); }}>
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-1">
                    <input type="text" placeholder="Name" required className="w-full  border-b-2 border-slate-200 px-0 py-3 text-sm text-brand-navy font-normal focus:outline-none focus:border-brand-orange transition-colors rounded-none placeholder:text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <input type="email" placeholder="Email" required className="w-full  border-b-2 border-slate-200 px-0 py-3 text-sm text-brand-navy font-normal focus:outline-none focus:border-brand-orange transition-colors rounded-none placeholder:text-slate-400" />
                  </div>
                </div>
                
                <div>
                  <input type="tel" placeholder="Phone Number" required className="w-full  border-b-2 border-slate-200 px-0 py-3 text-sm text-brand-navy font-normal focus:outline-none focus:border-brand-orange transition-colors rounded-none placeholder:text-slate-400" />
                </div>

                <div>
                  <textarea placeholder="How can we help?" rows={2} required className="w-full  border-b-2 border-slate-200 px-0 py-3 text-sm text-brand-navy font-normal focus:outline-none focus:border-brand-orange transition-colors rounded-none placeholder:text-slate-400 resize-none"></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-brand-orange hover:bg-[#091b29] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer mt-2"
                >
                  Send Message
                </button>
              </form>

            </div>
          </div>

        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════
           RICH BRANDED FOOTER
      ═══════════════════════════════════════════════════════ */}
      <footer className="w-full bg-[#060c10] text-white border-t border-white/5">
        
        {/* Top CTA Strip */}
        <div className="border-b border-white/35 py-6 sm:py-8">
          <div className="box-container flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-left space-y-1 ">
              <p className="font-outfit font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Ready to grow your team?
              </p>
              <p className="text-white/45 text-xs font-bold">Flexible tech workspaces in Coimbatore &amp; Trichy</p>
            </div>
            <button
              onClick={() => handleOpenBooking("General Inquiry")}
              className="px-8 py-3.5 bg-brand-orange hover:bg-white hover:text-brand-navy text-white font-bold text-[11px] uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer shadow-lg shrink-0"
            >
              Book a Free Tour →
            </button>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="box-container py-14 grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Column 1 — Brand (Covai Tech Park + Addresses) */}
          <div className="space-y-6 md:col-span-6 text-left">
            <div className="flex items-center">
              <a href="#" className="inline-block p-2 bg-white rounded-xl shadow-md border border-slate-200 hover:scale-[1.01] transition-transform">
                <Image
                  src={prefix("/covai-tech-park-logo.png")}
                  alt="Covai Tech Park"
                  width={140}
                  height={45}
                  className="object-contain h-8 w-auto"
                />
              </a>
            </div>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-outfit font-bold text-xs text-white uppercase tracking-[0.2em] mb-1">Registered Address</h5>
                <p className="text-white/70 font-bold text-xs uppercase tracking-wider mb-0.5">Max Office</p>
                <p className="text-white/45 text-xs font-normal leading-relaxed max-w-md">
                  2nd Floor, Old No. C-63, New No. C-50, Bloom Plaza, 6th Cross North East Extension, Near to Isha Yoga Center, Thillai Nagar, Tiruchirappalli, Tamil Nadu, 620018
                </p>
              </div>

              <div>
                <h5 className="font-outfit font-bold text-xs text-white uppercase tracking-[0.2em] mb-1">Address</h5>
                <p className="text-white/45 text-xs font-normal leading-relaxed max-w-md">
                  Covai Tech Park, 4th South Cross St, Kovai Thirunagar, Nehru Nagar East, Coimbatore- 641 014.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-outfit font-bold text-xs text-white uppercase tracking-[0.2em] mb-1">Email</h5>
                  <a href="mailto:info@covaitechpark.com" className="text-white/45 hover:text-brand-orange text-xs font-normal transition-colors">
                    info@covaitechpark.com
                  </a>
                </div>
                <div>
                  <h5 className="font-outfit font-bold text-xs text-white uppercase tracking-[0.2em] mb-1">Mobile</h5>
                  <div className="flex flex-col gap-1 text-white/45 text-xs font-normal">
                    <a href="tel:+919360780768" className="hover:text-brand-orange transition-colors">+91 93607 80768</a>
                    <a href="tel:+919003550455" className="hover:text-brand-orange transition-colors">+91 900 355 0455</a>
                    <a href="tel:+919688992210" className="hover:text-brand-orange transition-colors">+91 968 899 2210</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 — Workspace Solutions */}
          <div className="space-y-5 md:col-span-3 text-left">
            <h5 className="font-outfit font-bold text-xs text-white uppercase tracking-[0.2em]">Workspace Solutions</h5>
            <ul className="space-y-3 text-xs font-normal text-white/45">
              {[
                "Coworking Space",
                "Private Office Space",
                "Managed Office",
                "Virtual Office",
                "Meeting Room",
                "Event Space",
                "Training Room"
              ].map(item => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-brand-orange text-[10px]">&rsaquo;</span>
                  <a href="#services-dark" className="hover:text-brand-orange transition-colors duration-200 cursor-pointer">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Useful Links, Socials & Other Sites */}
          <div className="space-y-6 md:col-span-3 text-left">
            <div className="space-y-4">
              <h5 className="font-outfit font-bold text-xs text-white uppercase tracking-[0.2em]">Useful Links</h5>
              <ul className="space-y-3 text-xs font-normal text-white/45">
                {[
                  { name: "Furnished Office Space in Coimbatore", link: prefix("/coimbatore") },
                  { name: "Commercial Office Space in Coimbatore", link: prefix("/coimbatore") },
                  { name: "Locations", link: "#locations" },
                  { name: "Refer and Earn Program", link: "#contact" }
                ].map(item => (
                  <li key={item.name} className="flex items-center gap-2">
                    <span className="text-brand-orange text-[10px]">&rsaquo;</span>
                    <a href={item.link} className="hover:text-brand-orange transition-colors duration-200 cursor-pointer">{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="font-outfit font-bold text-xs text-white uppercase tracking-[0.2em]">Social Links</h5>
              <div className="flex gap-3">
                {[
                  { label: "Facebook", link: "https://www.facebook.com/coworkingspaceincoimbatore/", path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" },
                  { label: "LinkedIn", link: "https://www.linkedin.com/company/covai-tech-park/", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
                  { label: "Instagram", link: "https://www.instagram.com/covaitechpark/", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" }
                ].map(({ label, link, path }) => (
                  <a
                    key={label}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-brand-orange hover:border-brand-orange flex items-center justify-center transition-all duration-300 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d={path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-outfit font-bold text-xs text-white uppercase tracking-[0.2em]">Other Site</h5>
              <div className="flex flex-col gap-1.5 text-xs text-white/45 font-normal">
                <a href="https://trichycoworks.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors flex items-center gap-1">
                  <span className="text-brand-orange">&#9679;</span> trichycoworks.com
                </a>
                <a href="https://maxoffice.co.in" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors flex items-center gap-1">
                  <span className="text-brand-orange">&#9679;</span> maxoffice.co.in
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Strip */}
        <div className="border-t border-white/5 py-5">
          <div className="box-container flex items-center justify-center text-center text-xs sm:text-sm font-bold text-white/60 px-2">
            <span>© {new Date().getFullYear()} Covai Tech Park — MAX OFFICE. All rights reserved.</span>
          </div>
        </div>

      </footer>

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
              />
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
                <h3 className="font-outfit font-bold text-2xl text-brand-navy">
                  Request Quote
                </h3>
              </div>

              {bookingSuccess ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-brand-orange">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </div>
                  <h4 className="font-outfit font-bold text-lg text-brand-navy leading-none">Request Submitted Successfully!</h4>
                  <p className="text-xs text-brand-slate font-bold leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong>{bookingFirstName} {bookingLastName}</strong>. Your inquiry for <strong>{bookingLookingFor || selectedPlan}</strong> has been logged. We will contact you at <strong>{bookingEmail}</strong> or <strong>{bookingPhoneCode} {bookingPhone}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-5 text-left font-bold text-sm">
                
                {/* Name Row */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">
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
                        className="w-full bg-white border border-slate-200/80 rounded-lg px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-brand-orange font-bold shadow-sm"
                      />
                      <span className="text-[10px] text-slate-400 font-medium italic mt-1 block">First</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        value={bookingLastName}
                        onChange={(e) => setBookingLastName(e.target.value)}
                        placeholder=""
                        className="w-full bg-white border border-slate-200/80 rounded-lg px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-brand-orange font-bold shadow-sm"
                      />
                      <span className="text-[10px] text-slate-400 font-medium italic mt-1 block">Last</span>
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="flex border border-slate-200/80 rounded-lg overflow-hidden focus-within:border-brand-orange shadow-sm">
                    <select
                      value={bookingPhoneCode}
                      onChange={(e) => setBookingPhoneCode(e.target.value)}
                      className="bg-slate-50 border-r border-slate-200/80 px-3 py-3 text-xs text-slate-800 focus:outline-none cursor-pointer font-bold shrink-0"
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
                      className="w-full bg-white px-4 py-3 text-xs text-slate-800 focus:outline-none font-bold"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    placeholder=""
                    className="w-full bg-white border border-slate-200/80 rounded-lg px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-brand-orange font-bold shadow-sm"
                  />
                </div>

                {/* What are you looking for? */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">
                    What are you looking for?
                  </label>
                  <select
                    value={bookingLookingFor}
                    onChange={(e) => setBookingLookingFor(e.target.value)}
                    className="w-full bg-white border border-slate-200/80 rounded-lg px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-brand-orange font-bold cursor-pointer shadow-sm"
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

                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-orange hover:bg-brand-navy text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300 shadow-md shadow-brand-orange/20 cursor-pointer text-center"
                >
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
