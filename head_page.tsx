"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

// Section coordinates for vertical scroll tracker timeline
const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "locations", label: "Locations" },
  { id: "benefits-organic", label: "About" },
  { id: "services-dark", label: "Services" },
  { id: "deployment-track", label: "Spaces" },
  { id: "testimonials", label: "Testimonials" },
  { id: "booking", label: "Book a Space" }
];

// Carousel Slides definitions for Hero Section background (3 Slides)
const HERO_SLIDES = [
  {
    id: 0,
    title: "Work Smarter,",
    subtitle: "Scale Faster.",
    image: prefix("/hero1.jpg"),
    label: "PREMIUM OFFICES",
    description: "Enterprise-grade managed tech park offices in Coimbatore and Trichy. Built for high-performance software teams.",
    priceTag: "Hub Overview"
  },
  {
    id: 1,
    title: "Fully Equipped",
    subtitle: "Meeting Rooms.",
    image: prefix("/hero2.jpg"),
    label: "MEETING ROOMS",
    description: "Corporate-ready conference halls and boardrooms built with high-fidelity acoustic isolation and smart screens.",
    priceTag: "From GÈ¶14,999/mo"
  },
  {
    id: 2,
    title: "Lockable Private",
    subtitle: "Cabin Suites.",
    image: prefix("/hero3.jpg"),
    label: "PRIVATE CABINS",
    description: "Fully soundproofed lockable offices optimized for growing tech organizations and software teams.",
    priceTag: "From GÈ¶8,999/mo"
  }
];

// Interactive testimonial data (Minimal Content)
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

// Dual feature cards G«ˆ image overlay layout (reference: solar showcase)
const FEATURE_SHOWCASE_CARDS = [
  {
    id: "01",
    title: "Premium Lounge Ecosystem",
    description:
      "Collaborative lounges, cafe breakouts, and event spaces create a campus where teams connect, pitch, and scale without leaving the building.",
    image: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "02",
    title: "Private + Open Desks",
    description:
      "Lockable cabin suites and hot desks on one campus G«ˆ use the same address for GST, meetings, and day-to-day engineering under one roof.",
    image: "https://images.pexels.com/photos/34887638/pexels-photo-34887638.jpeg",
  },
];

// Gallery Showcase Images (tilted deck)
const GALLERY_ITEMS = [
  { image: prefix("/workspace-lounge.png"), title: "Lounge Area" },
  { image: prefix("/workspace-cabin.png"), title: "Private Cabins" },
  { image: prefix("/workspace-meeting.png"), title: "Smart Meeting Room" },
  { image: prefix("/workspace-hotdesk.png"), title: "Dedicated Desks" },
  { image: prefix("/workspace-cafe.png"), title: "Breakout Cafe" },
  { image: prefix("/workspace-event.png"), title: "Event Spaces" },
  { image: prefix("/amenities-community.png"), title: "Active Community" },
  { image: prefix("/hero-bg.png"), title: "CovaiTech Park Hub" },
];

// 12-Card Services Grid (Detailed offerings from covaitechpark.com)
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
    title: "Coworking & Hot Desks",
    description: "Flexible, shared community seating in prime business districts built for remote talent and startups.",
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=600&q=80",
    linkText: "GET PASS"
  },
  {
    id: "08",
    title: "Secure Business-Class Wi-Fi",
    description: "High-speed dual-fiber SLA backup internet and dedicated LAN firewall compliance setups.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
    linkText: "LEARN MORE"
  },
  {
    id: "09",
    title: "24/7 Biometric Access",
    description: "Secure round-the-clock office building entry with continuous front desk and receptionist support.",
    image: "https://images.pexels.com/photos/17155842/pexels-photo-17155842.jpeg",
    linkText: "VIEW SECURITY"
  },
  {
    id: "10",
    title: "DG Power Backup & Server Racks",
    description: "100% generator power backup, secure server rack cooling, and full IT cabinet options.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    linkText: "REQUEST QUOTE"
  },
  {
    id: "11",
    title: "Housekeeping & Facility Support",
    description: "On-site housekeeping, daily professional sanitization, print hubs, and property managers.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    linkText: "VIEW SERVICES"
  },
  {
    id: "12",
    title: "Breakout Lounges & Cafeterias",
    description: "Collaborative seating areas with premium espresso bars and food court dining zones.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80",
    linkText: "EXPLORE AMENITIES"
  }
];

// 6-Slide stacked scroll workspace showcase data
const DEPLOYMENT_PHASES = [
  {
    id: "01",
    subtitle: "FLEXIBLE MEMBERSHIPS",
    title: "Coworking Desks",
    description: "Vibrant shared professional workspaces built for freelancers, remote professionals, and agile tech teams.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    accent: "#f37021",
    points: [
      { label: "High-Speed WiFi", desc: "Dual-fiber SLA backup" },
      { label: "Ergonomic Desks", desc: "Premium comfort seating" },
      { label: "Active Community", desc: "Daily networking events" }
    ]
  },
  {
    id: "02",
    subtitle: "SECURE PRIVATE SUITES",
    title: "Private Cabins",
    description: "Secure, lockable, and fully furnished private cabins optimized for focused software development teams.",
    image: "https://images.pexels.com/photos/12973795/pexels-photo-12973795.jpeg",
    accent: "#0ea5e9",
    points: [
      { label: "Lockable Units", desc: "Complete physical privacy" },
      { label: "Custom Partition", desc: "Personalized brand options" },
      { label: "Scalable Desks", desc: "Grow teams instantly" }
    ]
  },
  {
    id: "03",
    subtitle: "ENTERPRISE WORKSPACES",
    title: "Managed Enterprise",
    description: "Bespoke corporate setups built to your exact specifications with custom branding and IT infrastructure.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    accent: "#8b5cf6",
    points: [
      { label: "Custom Layouts", desc: "Tailored floor planning" },
      { label: "Server Racks", desc: "Secure backup power" },
      { label: "Biometric Access", desc: "24/7 front desk support" }
    ]
  },
  {
    id: "04",
    subtitle: "BUSINESS COMPLIANCE",
    title: "Virtual Offices",
    description: "Establish a professional corporate presence with business registration and official GST address solutions.",
    image: "https://images.pexels.com/photos/21405533/pexels-photo-21405533.jpeg",
    accent: "#10b981",
    points: [
      { label: "GST Ready", desc: "Utility bills & NOC" },
      { label: "Mail Services", desc: "Digital mail forwarding" },
      { label: "Meeting Rooms", desc: "Executive boardroom access" }
    ]
  },
  {
    id: "05",
    subtitle: "PREMIUM BOARDROOMS",
    title: "Meeting Rooms",
    description: "Fully-equipped, high-tech boardrooms tailored for presentation pitches, seminars, and client meetings.",
    image: "https://images.pexels.com/photos/6794920/pexels-photo-6794920.jpeg",
    accent: "#f59e0b",
    points: [
      { label: "Smart Displays", desc: "4K screens & HDMI" },
      { label: "Lounge Cafe", desc: "Premium coffee & snacks" },
      { label: "IT Assistance", desc: "On-site video support" }
    ]
  },
  {
    id: "06",
    subtitle: "COMMUNITY & EVENTS",
    title: "Event Spaces",
    description: "Host product launches, tech meetups, training sessions, and large-scale corporate events with full AV support.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    accent: "#ec4899",
    points: [
      { label: "300+ Capacity", desc: "Flexible venue layouts" },
      { label: "Full AV Setup", desc: "Pro sound & projection" },
      { label: "Catering Options", desc: "On-demand refreshments" }
    ]
  }
];

type DeploymentPhase = (typeof DEPLOYMENT_PHASES)[number];

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
      <span className="text-[10px] sm:text-sm font-bold uppercase tracking-[0.22em] leading-none text-brand-orange">
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
              G£Ù
            </span>
            <div className="flex gap-1.5 items-baseline flex-wrap min-w-0">
              <span className="font-bold text-sm sm:text-sm text-brand-navy">{pt.label}</span>
              <span className="text-[11px] sm:text-sm text-brand-slate font-normal">{pt.desc}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={compact ? "pt-0.5" : "pt-1"}>
        <button
          type="button"
          onClick={() => onInquire(phase.title)}
          className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-white font-extrabold text-[10px] sm:text-sm uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer shadow-lg hover:scale-[1.03] bg-brand-orange"
        >
          Inquire Now
          <span className="text-sm">GÂ∆</span>
        </button>
      </div>
    </div>
  );
}

const CITIES = [
  { name: "Chennai", icon: "chennai-central", image: prefix("/hero11.jpg") },
  { name: "Mumbai", icon: "gateway", image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80" },
  { name: "Bangalore", icon: "vidhana-soudha", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80" },
  { name: "Hyderabad", icon: "charminar", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80" },
  
  { name: "Lucknow", icon: "bara-imambara", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80" },
  { name: "Pune", icon: "shaniwar-wada", image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1200&q=80" },
 
  { name: "Delhi", icon: "india-gate", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" },
  { name: "Indore", icon: "rajwada", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80" },
  { name: "Ahmedabad", icon: "teen-darwaza", image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=1200&q=80" },
  { name: "Jaipur", icon: "hawa-mahal", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80" },
  { name: "Kochi", icon: "fishing-net", image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80" },
  { name: "Chandigarh", icon: "open-hand", image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1200&q=80" },
  { name: "Kolkata", icon: "howrah-bridge", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80" },
  { name: "Coimbatore", icon: "gopuram", image: "https://images.unsplash.com/photo-1564069114553-742ee2c3bcbe?auto=format&fit=crop&w=1200&q=80" },
  { name: "Goa", icon: "goa-church", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80" },
 
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
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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
      <span className="font-outfit font-extrabold text-xl tracking-tight text-slate-800">
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
        <span className="font-sans font-extrabold text-lg tracking-wider text-teal-800 uppercase">
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
  const [activeCity, setActiveCity] = useState("Chennai");

  // Hero carousel slider variables
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Phases stacked scroll G«ˆ active slide index
  const [activePhase, setActivePhase] = useState(0);


  // Testimonials slider variables
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testifierTransition, setTestifierTransition] = useState(false);

  // Booking states
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Carousel slider auto-play
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
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
    setBookingOpen(true);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingName && bookingEmail && bookingPhone) {
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingName("");
        setSelectedPlan("");
        setBookingEmail("");
        setBookingPhone("");
        setBookingOpen(false);
        setBookingSuccess(false);
      }, 3000);
    }
  };

  const handleNextTestimonial = () => {
    setTestifierTransition(true);
    setTimeout(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
      setTestifierTransition(false);
    }, 350);
  };

  const handlePrevTestimonial = () => {
    setTestifierTransition(true);
    setTimeout(() => {
      setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      setTestifierTransition(false);
    }, 350);
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
            "priceRange": "GÈ¶1499 - GÈ¶14999",
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
      
      {/* VERTICAL SCROLL NAVIGATION TIMELINE G«ˆ hidden on hero, visible from 2nd section */}
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
        className={`left-0 w-full z-45 transition-all duration-300 ${
          isScrolled
            ? "fixed top-0 bg-white backdrop-blur-md shadow-md border-b border-slate-100 py-2 sm:py-3"
            : "absolute top-4 sm:top-6 bg-transparent border-none py-2"
        }`}
      >
        <div className="w-full section-x flex justify-between items-center gap-3 sm:gap-4">
          
          {/* Logo Card (Left) */}
          <a
            href="#"
            className={`flex items-center shrink-0 transition-all duration-300 hover:scale-[1.01] max-w-[80%] sm:max-w-none ${
              isScrolled
                ? "p-1.5 sm:p-2 bg-white rounded-lg sm:rounded-xl "
                : "p-0 bg-transparent border-none"
            }`}
          >
            <Image
              src={prefix(isScrolled ? "/covai-tech-park-logo.png" : "/covai-tech-park-logo-white.png")}
              alt="Covai Tech Park"
              width={180}
              height={85}
              priority
              className="object-contain h-12 sm:h-14 w-auto max-w-full"
            />
          </a>

          {/* Centered Desktop Navigation Menus */}
          <nav
            className={`hidden xl:flex items-center gap-8 text-[11px] font-normal tracking-widest uppercase mx-auto transition-colors duration-300 ${
              isScrolled ? "text-slate-700" : "text-white/80"
            }`}
          >
            <div className="relative group cursor-pointer">
              <a href="#services-dark" className="hover:text-brand-orange transition-colors flex items-center gap-1">Services <span className="text-[8px]">G˚+</span></a>
              <div className="absolute top-full left-0 mt-4 w-52 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 flex flex-col p-2 text-sm normal-case tracking-normal font-medium z-50">
                <a href="#services-dark" className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Private Office</a>
                <a href="#services-dark" className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Managed Office</a>
                <a href="#services-dark" className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Virtual Office</a>
                <a href="#services-dark" className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Meeting Rooms</a>
                <a href="#services-dark" className="px-4 py-2 hover:bg-slate-50 hover:text-brand-orange rounded-lg transition-colors">Event Space</a>
              </div>
            </div>
            <a href="#benefits-organic" className="hover:text-brand-orange transition-colors">About</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Blog</a>
            <a href="#contact" className="hover:text-brand-orange transition-colors">Contact</a>
          </nav>

          {/* CTAs (Right) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => handleOpenBooking("Book Space")}
              className="hidden sm:flex px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-[11px] font-normal uppercase tracking-widest bg-gradient-to-r from-brand-orange to-[#ffaa66] text-white hover:scale-103 transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap items-center gap-2"
            >
              Book Space
              <span className="text-sm font-bold">&rarr;</span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`xl:hidden p-2 rounded-xl transition-all duration-350 cursor-pointer shrink-0 ${
                isScrolled ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer G«ˆ side drawer layout */}
        <div className={`fixed inset-y-0 right-0 w-full max-w-xs bg-brand-navy/98 backdrop-blur-2xl z-50 flex flex-col justify-center items-center gap-8 xl:hidden transition-transform duration-500 shadow-2xl ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          {/* Close button inside drawer */}
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white cursor-pointer"
            aria-label="Close Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav className="flex flex-col items-center gap-6 text-[18px] font-bold text-white">
            <a href="#services-dark" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Services</a>
            <a href="#benefits-organic" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">About</a>
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Blog</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Contact</a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenBooking("Schedule a Tour");
              }}
              className="mt-6 px-8 py-4 bg-brand-orange text-white text-sm font-bold uppercase tracking-wider rounded-full shadow-lg"
            >
              Book Space Now
            </button>
          </nav>
        </div>
      </header>

      {/* HERO SECTION DESIGN CAROUSEL (100vh) */}
      <section id="hero" className="relative min-h-[100dvh] sm:h-screen w-full flex flex-col justify-center lg:justify-center pt-[4.5rem] sm:pt-20 pb-5 sm:pb-8 lg:pb-0 overflow-hidden bg-brand-navy text-white herosmall" >
        
        {/* Dynamic sliding backgrounds */}
        <div className="absolute inset-0 z-0">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = activeHeroSlide === idx;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
                  isActive ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.label}
                  fill
                  priority={idx === 0}
                  className={`object-cover transition-transform duration-1000 ${
                    isActive ? "animate-ken-burns" : ""
                  }`}
                />
              </div>
            );
          })}
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
                24/7 BIOMETRIC SUITES ACTIVE
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
              
              <div className="flex flex-wrap items-center gap-5 sm:gap-6 pt-2">
                <button
                  onClick={() => handleOpenBooking(HERO_SLIDES[activeHeroSlide].label)}
                  className="px-6 py-3.5 sm:px-8 sm:py-4 bg-brand-orange text-white hover:bg-white hover:text-brand-navy font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-orange-500/10 hover:scale-[1.03] cursor-pointer flex items-center gap-2.5"
                >
                  Explore Workspaces
                  <span className="text-sm font-bold">&rarr;</span>
                </button>
                
                <button
                  onClick={() => handleOpenBooking("Virtual Tour Request")}
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors cursor-pointer group"
                >
                  <span className="w-10 h-10 rounded-full border border-white/25 bg-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/40 transition-all duration-300 shrink-0">
                    <svg className="w-3.5 h-3.5 fill-current text-white translate-x-[1px]" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="text-sm sm:text-sm font-normal tracking-wider ">Virtual Tour</span>
                </button>
              </div>
            </div>
          </div>

          {/* Slide thumbnails G«ˆ vertical list with vertical dot line on desktop */}
          <div className="lg:col-span-5 w-full z-20 flex justify-center lg:justify-end items-center">
            <div className="relative flex items-stretch gap-6 w-full lg:max-w-[320px] xl:max-w-[360px]">
              
              {/* Vertical Timeline Dot Connector (Desktop only) */}
              <div className="absolute left-1.5 top-[15%] bottom-[15%] w-[1px] bg-white/15 hidden lg:block z-0 pointer-events-none" />

              <div className="w-full flex flex-row lg:flex-col gap-3 sm:gap-4 lg:gap-5 justify-between items-center relative z-10">
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = activeHeroSlide === idx;
                  return (
                    <div key={slide.id} className="flex items-center gap-4 sm:gap-5 w-full group justify-center lg:justify-end">
                      
                      {/* Timeline Dot (Desktop only) */}
                      <div className="relative flex items-center justify-center shrink-0 w-4 h-4 hidden lg:flex">
                        <div className={`rounded-full transition-all duration-500 ${
                          isActive 
                            ? "w-2.5 h-2.5 bg-brand-orange ring-4 ring-brand-orange/30 scale-125" 
                            : "w-1.5 h-1.5 bg-white/45 group-hover:bg-white"
                        }`} />
                      </div>

                      {/* Thumbnail Card Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveHeroSlide(idx);
                          setIsAutoPlay(false);
                        }}
                        className={`relative w-full aspect-[16/10] lg:aspect-auto lg:h-[100px] xl:h-[110px] rounded-xl sm:rounded-2xl border font-bold transition-all duration-500 cursor-pointer overflow-hidden bg-white/60 backdrop-blur-md ${
                          isActive
                            ? "border-brand-orange ring-2 ring-brand-orange/40 shadow-lg shadow-brand-orange/20 scale-102 lg:scale-105 z-10"
                            : "border-white/15 font-bold opacity-100 hover:opacity-100 hover:border-white/30"
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
                          <div className="absolute inset-0 bg-[black]/55 group-hover:bg-[#2b3748]/30 transition-colors duration-300" />
                          
                          {/* Label overlay aligned bottom left */}
                          <div className="absolute inset-0 flex items-center justify-start pl-4 sm:pl-5">
                            <span className="text-[10px] sm:text-sm font-normal tracking-widest text-white uppercase drop-shadow-md">
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


      {/* LOCATIONS SECTION G«ˆ Reference Image Style */}
      <section id="locations" className="w-full bg-white border-t border-slate-100 overflow-hidden">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">

          {/* LEFT: Heading + Dropdowns + City Grid */}
          <div className="col-span-1 lg:col-span-7 xl:col-span-7 pl-4 sm:pl-6 md:pl-10 lg:pl-12 xl:pl-16 pr-4 sm:pr-6 md:pr-10 lg:pr-12 xl:pr-16 py-16 sm:py-20 lg:py-24 space-y-8 relative z-10">

            {/* Heading block with yellow circle decoration */}
            <div className="space-y-4 relative">
              {/* Yellow decorative accent circle */}
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-[#ffe066]/80 -z-10" />
              <span className="text-sm font-bold text-brand-orange uppercase tracking-[0.3em] block leading-none relative z-10">OUR LOCATIONS</span>
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

            {/* City Icon Grid G«ˆ reference style with circular borders & realistic icons */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-6 pt-4">
              {CITIES.map((city) => {
                const isActive = activeCity === city.name;
                return (
                  <button
                    key={city.name}
                    onClick={() => setActiveCity(city.name)}
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

                    {/* City name G«ˆ normal weight, bold only when active */}
                    <span
                      className={`text-[10px] tracking-wide text-center leading-none transition-colors duration-300 uppercase ${
                        isActive
                          ? "text-brand-orange font-bold"
                          : "text-slate-500 group-hover:text-brand-orange font-medium"
                      }`}
                    >
                      {city.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View all CTA */}
            <button
              onClick={() => handleOpenBooking("All Locations Enquiry")}
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-navy transition-colors uppercase tracking-widest cursor-pointer pt-4"
            >
              View All Locations <span className="text-base">GÂ∆</span>
            </button>
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
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" /> */}

              {/* Active city badge G«ˆ top left */}
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-lg">
                <p className="text-[9px] font-bold text-brand-orange uppercase tracking-widest leading-none">ACTIVE LOCATION</p>
                <p className="font-outfit font-bold text-sm text-brand-navy leading-tight mt-0.5">{activeCity} Hub</p>
              </div>

              {/* Call/enquiry floating button G«ˆ bottom right */}
              <button
                onClick={() => handleOpenBooking(`Enquiry G«ˆ ${activeCity}`)}
                className="absolute bottom-5 right-5 w-14 h-14 bg-brand-orange hover:bg-brand-navy text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-[1.06] cursor-pointer"
                aria-label={`Call for ${activeCity} enquiry`}
              >
                <svg className="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.117-6.942-6.942l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </section>


  {/* WE ARE HERE G«ˆ Minimal neon gradient + feature cards */}
  <section
        id="feature-showcase"
        className="neon-we-are-here relative w-full section-x py-12 sm:py-16 lg:py-24 overflow-hidden"
      >
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-14 reveal reveal-up px-1">
            <span className="text-[10px] sm:text-[11px] font-bold text-brand-orange uppercase tracking-[0.28em] block mb-3 sm:mb-4">
              We Are Here
            </span>
            <h2 className="font-outfit font-bold text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] text-white/95 text-center leading-[1.2] tracking-tight max-w-3xl mx-auto">
              Supporting your workspace ambitions G«ˆ from your first desk to a full tech floor.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-7">
            {FEATURE_SHOWCASE_CARDS.map((card, idx) => (
              <article
                key={card.id}
                className={`relative w-full h-[300px] sm:h-[360px] lg:h-[400px] rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border border-white/[0.08] shadow-2xl shadow-[#2b3748]/50 reveal reveal-up ${idx === 0 ? "delay-100" : "delay-200"}`}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a]/90 via-[#0a0f1a]/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 rounded-xl sm:rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/10 p-4 sm:p-5">
                  <h3 className="font-outfit font-bold text-lg sm:text-xl text-white tracking-tight leading-tight mb-1.5 sm:mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-sm font-normal text-white/65 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* ABOUT COMPANY SECTION G«ˆ NATURAL LAYOUT */}
      <section id="benefits-organic" className="py-16 sm:py-24 section-x w-full bg-[#ffffff] text-brand-navy relative overflow-hidden">

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
              <div className="relative w-full aspect-square sm:aspect-video lg:aspect-square rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl">
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
                <span className="text-sm font-bold text-brand-orange uppercase tracking-[0.28em] block leading-none">
                  ABOUT COVAITECH PARK
                </span>

                <h2 className="text-4xl sm:text-5xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight leading-[1.05]">
                  Empowering Teams<br />with Serviced Infrastructure
                </h2>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-lg">
                  Founded in 2017, CovaiTech Park bridges the gap between high-cost commercial offices and flexible shared suites G«ˆ operating in Saravanampatti &amp; Nehru Nagar East, Coimbatore and Thillai Nagar, Trichy.
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
                  {[
                    { val: "2017", label: "Established", color: "text-brand-orange" },
                    { val: "1.5K+", label: "Members", color: "text-teal-500" },
                    { val: "90%", label: "CapEx Saved", color: "text-brand-orange" },
                    { val: "100%", label: "Power Backup", color: "text-teal-500" },
                  ].map(stat => (
                    <div key={stat.label} className="space-y-1">
                      <p className={`font-outfit font-black text-2xl ${stat.color} leading-none`}>{stat.val}</p>
                      <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <button
                    onClick={() => handleOpenBooking("About Section Inquiry")}
                    className="inline-block px-8 py-3.5 bg-brand-orange hover:bg-brand-navy text-white font-extrabold text-[11px] uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg cursor-pointer hover:scale-[1.02]"
                  >
                    Inquire About Spaces
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


 {/* SERVICES GRID (Image 4 Style - 100vh) */}
      <section id="services-dark" className="section-container h-auto min-h-0 py-16 sm:py-24 section-x bg-[#060c10] text-white w-full">
        
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
                TAILOR-MADE SOLUTIONS
              </span>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-outfit font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-orange">
                10+ Services. Unlimited Impact.
              </h2>
            </div>
            <p className="text-white/75 text-base max-w-sm leading-relaxed text-left">
              We certify and handle all logistics for high-compliance enterprise offices, so that your tech organization handles nothing but actual coding tasks.
            </p>
          </div>

          {/* Large Services Grid (Compact & responsive optimized) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mt-12">
            {SERVICES_TAILORED.map((service, idx) => (
              <div
                key={service.id}
                className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-white/10 hover:border-brand-orange/45 transition-all duration-500 flex flex-col justify-end text-left p-6 sm:p-8 cursor-pointer reveal reveal-up"
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-75 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2b3748]/90 via-[#2b3748]/30 to-transparent z-10" />

                <div className="space-y-3 relative z-20">
                  <h4 className="font-outfit font-bold text-lg sm:text-xl text-white tracking-tight leading-tight group-hover:text-brand-orange transition-colors duration-300">
                    {service.title}
                  </h4>

                  <div className="pt-1.5">
                    <span className="text-[10px] sm:text-sm font-bold text-brand-orange tracking-widest uppercase flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform">
                      {service.linkText} <span className="text-sm sm:text-sm">&rarr;</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* WORKSPACES G«ˆ mobile: full scrollable cards | desktop: sticky stacked scroll */}
      <section id="deployment-track" className="relative w-full bg-[#f8fafc] section-x py-16 sm:py-24 overflow-hidden reveal reveal-up">
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
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] block">
              OUR WORKSPACES
            </span>
            <h2 className="font-outfit font-bold text-2xl sm:text-3xl text-slate-800 leading-tight tracking-tight mt-1">
              Every space, built for growth.
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
          className="hidden lg:block relative w-full reveal reveal-up"
        >
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#f8fafc]">
            <div className="absolute top-10 left-0 right-0 flex flex-col items-center text-center section-x z-20 pointer-events-none">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em] block">
                OUR WORKSPACES
              </span>
              <h2 className="font-outfit font-bold text-3xl md:text-5xl text-slate-800 leading-none tracking-tight mt-2">
                Every space, built for growth.
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

      <section className="py-12 bg-white border-t border-slate-100 overflow-hidden w-full section-x reveal reveal-up">
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
      </section>

      {/* LOCATIONS SHOWCASE (MAP/GRID) */}
      <section id="locations" className="w-full bg-white border-t border-slate-100 overflow-hidden relative reveal reveal-up">
        {/* Floating shape */}
        <div className="absolute top-1/4 left-10 w-48 h-48 opacity-[0.03] text-brand-orange pointer-events-none select-none z-0 hidden lg:block">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
            <polygon points="50,10 90,90 10,90" strokeDasharray="4 4"/>
          </svg>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch relative z-10">

{/* TESTIMONIALS SECTION G«ˆ Background image + overlay */}
      <section id="testimonials" className="section-container w-full flex flex-col justify-center py-16 sm:py-24 relative overflow-hidden">
        {/* Full-bleed background image */}
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
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[100px] pointer-events-none z-[1]" />

        <div className="relative z-10 box-container w-full flex flex-col items-center justify-center gap-0">

          {/* Section Label */}
          <div className="text-center mb-10 reveal reveal-up">
            <span className="text-[11px] font-bold text-brand-orange uppercase tracking-[0.25em] block leading-none mb-4">TESTIMONIALS</span>
            <h2 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
              Trusted by Teams.
            </h2>
          </div>

          {/* Clean unboxed container (no border, no box shadow, no glass background) */}
          <div className="w-full max-w-4xl p-4 sm:p-8 reveal reveal-up">

            {/* Overlapping circular avatars + nav arrows */}
            <div className="relative flex items-center justify-center gap-4 mb-10">
              {/* Prev arrow */}
              <button
                onClick={handlePrevTestimonial}
                className="w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-brand-orange/20 hover:border-brand-orange/40 text-white transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0 mr-2"
                aria-label="Previous testimonial"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Three overlapping avatar images */}
              <div className="flex items-center -space-x-6">
                {TESTIMONIALS.map((t, i) => {
                  const isActive = i === activeTestimonial;
                  const order = [
                    (activeTestimonial + TESTIMONIALS.length - 1) % TESTIMONIALS.length,
                    activeTestimonial,
                    (activeTestimonial + 1) % TESTIMONIALS.length
                  ];
                  const pos = order.indexOf(i);
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTestifierTransition(true);
                        setTimeout(() => {
                          setActiveTestimonial(i);
                          setTestifierTransition(false);
                        }, 200);
                      }}
                      className={`relative rounded-full overflow-hidden border-4 transition-all duration-500 cursor-pointer flex-shrink-0 ${
                        isActive
                          ? "w-28 h-28 sm:w-36 sm:h-36 border-brand-orange z-20 scale-110"
                          : "w-20 h-20 sm:w-24 sm:h-24 border-white/15 z-10 opacity-50 hover:opacity-80"
                      }`}
                      aria-label={`View ${t.name} testimonial`}
                      style={{ order: pos }}
                    >
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Next arrow */}
              <button
                onClick={handleNextTestimonial}
                className="w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-brand-orange/20 hover:border-brand-orange/40 text-white transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0 ml-2"
                aria-label="Next testimonial"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Quote + attribution */}
            <div className={`text-center transition-all duration-400 ease-in-out ${
              testifierTransition ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}>
              {/* Big quote mark */}
              <span className="font-outfit font-bold text-6xl text-brand-orange/30 leading-none block -mb-4">&ldquo;</span>
              <p className="font-outfit font-bold text-base sm:text-xl md:text-2xl lg:text-3xl text-white tracking-tight leading-snug px-1">
                {TESTIMONIALS[activeTestimonial].quote}
              </p>
              <div className="mt-6 flex flex-col items-center gap-1">
                <div className="w-8 h-0.5 bg-brand-orange rounded-full mb-3" />
                <span className="text-sm font-bold text-white uppercase tracking-[0.15em]">
                  {TESTIMONIALS[activeTestimonial].name}
                </span>
                <span className="text-sm font-bold text-white/45 uppercase tracking-[0.2em]">
                  {TESTIMONIALS[activeTestimonial].role}
                </span>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setTestifierTransition(true);
                    setTimeout(() => {
                      setActiveTestimonial(i);
                      setTestifierTransition(false);
                    }, 200);
                  }}
                  className="rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width: i === activeTestimonial ? "28px" : "8px",
                    height: "8px",
                    background: i === activeTestimonial ? "#f37021" : "rgba(255,255,255,0.20)"
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

          </div>{/* end glass card */}

        </div>
      </section>

    

      {/* TILTED GALLERY (OUR BEST WORKS) SECTION */}
      <section id="gallery-works" className="section-container bg-white py-14 sm:py-20 lg:py-24 w-full overflow-hidden text-brand-navy relative reveal reveal-up">
        {/* Floating background shapes */}
        <div className="absolute top-10 right-0 w-64 h-64 opacity-[0.03] text-brand-navy pointer-events-none select-none z-0 hidden lg:block">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M10 90 Q 50 10 90 90" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="20" strokeDasharray="2 2" />
          </svg>
        </div>

        <div className="w-full flex flex-col items-center relative z-10">

          {/* Section header above gallery */}
          <div className="box-container text-center max-w-3xl space-y-4 mb-12 reveal reveal-up">
            <span className="text-[11px] font-bold text-brand-orange uppercase tracking-[0.25em] block leading-none">OUR BEST WORKS</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold tracking-tight leading-none text-slate-800">
              Where High-Growth Teams Align
            </h2>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              A virtual tour of our live campuses G«ˆ from acoustic private cabins to premium collaborative lounges.
            </p>
          </div>

          {/* Scrolling Marquee Container */}
          <div className="w-full relative overflow-hidden py-4 select-none">
            {/* Soft gradient fades on left and right edges */}
            <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee gap-8">
              {[...GALLERY_ITEMS, ...GALLERY_ITEMS].map((item, index) => {
                // Alternating rotations and slight vertical offsets for tilted deck effect
                const rotations = [
                  "rotate-[-4deg] translate-y-2",
                  "rotate-[3deg] -translate-y-1",
                  "rotate-[-3deg] translate-y-3",
                  "rotate-[4deg] -translate-y-2",
                  "rotate-[-5deg] translate-y-1",
                  "rotate-[5deg] -translate-y-3",
                ];
                const rotationClass = rotations[index % rotations.length];

                return (
                  <div
                    key={index}
                    className={`relative w-[260px] h-[220px] min-[400px]:w-72 min-[400px]:h-[250px] sm:w-[320px] sm:h-[280px] md:w-[360px] md:h-[320px] rounded-2xl sm:rounded-[2rem] overflow-hidden border-4 sm:border-[6px] border-white hover:scale-105 transition-all duration-500 cursor-pointer shrink-0 ${rotationClass} -mx-2`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2b3748]/85 via-[#2b3748]/20 to-transparent z-10" />
                    <div className="absolute bottom-6 left-6 right-6 z-20 text-left">
                      <p className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-1">COVAITECH PARK</p>
                      <h4 className="font-outfit font-bold text-lg sm:text-xl text-white tracking-tight leading-none">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA below marquee */}
          <div className="pt-10">
            <button
              onClick={() => handleOpenBooking("Book a Tour (Gallery Section)")}
              className="inline-block px-10 py-4 bg-brand-orange text-white hover:bg-brand-navy font-extrabold text-sm uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-orange-500/10 hover:scale-[1.03] cursor-pointer text-center"
            >
              Book a Tour Now
            </button>
          </div>
        </div>
      </section>

      

      {/* 2ND IMAGE CTA BANNER CARD (FULLWIDTH AND BLEED IMAGE) */}
      <section className="py-8 sm:py-10 bg-white w-full section-x">
        <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#0a0f1a] via-[#091b29] to-[#0a0f1a] border-2 border-brand-orange/20 flex flex-col md:flex-row items-stretch justify-between shadow-2xl min-h-[380px]">
          
          {/* Left Content */}
          <div className="flex-1 text-left space-y-4 sm:space-y-6 p-6 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-center z-10">
            <h3 className="font-outfit font-bold text-4xl sm:text-4xl lg:text-4xl text-white tracking-tight leading-tight">
              Get the Perfect Coworking Space in your City
            </h3>
            <p className="text-sm font-bold text-brand-orange uppercase tracking-widest leading-relaxed">
              Coimbatore | Chennai | Trichy | Kochi | Salem &amp; More...
            </p>
            <button
              onClick={() => handleOpenBooking("CTA Banner Enquiry")}
              className="px-10 py-4 bg-brand-orange hover:bg-white hover:text-brand-navy text-white text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer shadow-md self-start active:scale-98"
            >
              Enquire Now
            </button>
          </div>

          {/* Right blended image - Bleed, no padding */}
          <div className="relative w-full md:w-[48%] h-[300px] md:h-auto overflow-hidden shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
              alt="Perfect Coworking Office"
              fill
              className="object-cover"
            />
            {/* Blends with the background of the left container */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#091b29] via-transparent to-transparent hidden md:block z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#091b29] via-transparent to-transparent md:hidden z-10" />
          </div>

        </div>
      </section>

      {/* BOOKING/CONTACT SECTION */}
      <section id="booking" className="section-container h-auto py-16 sm:py-24 section-x bg-[#f8fafc] border-t border-b border-brand-orange/15 text-brand-navy relative overflow-hidden reveal reveal-up">
        
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
            <span className="text-sm font-bold text-brand-orange uppercase tracking-[0.25em] block leading-none">
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
                  <p className="text-sm sm:text-sm text-slate-500 font-bold">Nehru Nagar East, Near Saravanampatti Road, Civil Aerodrome Post, Coimbatore - 641014</p>
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
                  <p className="text-sm sm:text-sm text-slate-500 font-bold">Thillai Nagar Main Road, West Boulevard, Trichy - 620018</p>
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
                <p className="text-sm text-brand-slate font-medium">
                  Leave your details and we'll reach out shortly.
                </p>
              </div>

              <form className="flex flex-col gap-5 w-full" onSubmit={(e) => { e.preventDefault(); handleOpenBooking("Contact Form"); setBookingOpen(false); }}>
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-1">
                    <input type="text" placeholder="Name" required className="w-full bg-slate-50 border-b-2 border-slate-200 px-0 py-3 text-sm text-brand-navy font-medium focus:outline-none focus:border-brand-orange transition-colors rounded-none placeholder:text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <input type="email" placeholder="Email" required className="w-full bg-slate-50 border-b-2 border-slate-200 px-0 py-3 text-sm text-brand-navy font-medium focus:outline-none focus:border-brand-orange transition-colors rounded-none placeholder:text-slate-400" />
                  </div>
                </div>
                
                <div>
                  <input type="tel" placeholder="Phone Number" required className="w-full bg-slate-50 border-b-2 border-slate-200 px-0 py-3 text-sm text-brand-navy font-medium focus:outline-none focus:border-brand-orange transition-colors rounded-none placeholder:text-slate-400" />
                </div>

                <div>
                  <textarea placeholder="How can we help?" rows={2} required className="w-full bg-slate-50 border-b-2 border-slate-200 px-0 py-3 text-sm text-brand-navy font-medium focus:outline-none focus:border-brand-orange transition-colors rounded-none placeholder:text-slate-400 resize-none"></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-brand-orange hover:bg-[#091b29] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer mt-2"
                >
                  Send Message
                </button>
              </form>

            </div>
          </div>

        </div>

      </section>

      {/* GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…
           RICH BRANDED FOOTER
      GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ…GÚ… */}
      <footer className="w-full bg-[#060c10] text-white border-t border-white/5">
        
        {/* Top CTA Strip */}
        <div className="border-b border-white/35 py-6 sm:py-8">
          <div className="box-container flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-left space-y-1 ">
              <p className="font-outfit font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Ready to grow your team?
              </p>
              <p className="text-white/45 text-sm font-bold">Flexible tech workspaces in Coimbatore &amp; Trichy</p>
            </div>
            <button
              onClick={() => handleOpenBooking("General Inquiry")}
              className="px-8 py-3.5 bg-brand-orange hover:bg-white hover:text-brand-navy text-white font-extrabold text-[11px] uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer shadow-lg shrink-0"
            >
              Book a Free Tour GÂ∆
            </button>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="box-container py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 G«ˆ Brand */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            {/* Logo mark */}
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
            <p className="text-white/45 text-sm font-bold leading-relaxed max-w-xs">
              Premium managed tech coworking parks in Coimbatore &amp; Trichy for startups, enterprises, and digital-first teams.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { label: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
                { label: "Twitter/X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.635 5.902-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" }
              ].map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
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

          {/* Column 2 G«ˆ Services */}
          <div className="space-y-5">
            <h5 className="font-outfit font-bold text-sm text-white uppercase tracking-[0.2em]">Services</h5>
            <ul className="space-y-3 text-sm font-normal text-white/45">
              {["Private Cabin Suites", "Dedicated Desks", "Hot Desk Lounge", "Virtual Office & GST", "Meeting Rooms", "Event Space"].map(item => (
                <li key={item}>
                  <a href="#services-dark" className="hover:text-brand-orange transition-colors duration-200 cursor-pointer">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 G«ˆ Locations */}
          <div className="space-y-5">
            <h5 className="font-outfit font-bold text-sm text-white uppercase tracking-[0.2em]">Locations</h5>
            <div className="space-y-5 text-sm font-bold text-white/45">
              <div className="space-y-1">
                <p className="text-white/70 font-bold uppercase tracking-wider text-[10px]">Coimbatore</p>
                <p>Nehru Nagar East, Nehru Nagar</p>
                <p>Coimbatore G«ˆ 641 006</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/70 font-bold uppercase tracking-wider text-[10px]">Trichy</p>
                <p>Thillai Nagar, Trichy</p>
                <p>Tamil Nadu G«ˆ 620 018</p>
              </div>
            </div>
          </div>

          {/* Column 4 G«ˆ Contact */}
          <div className="space-y-5">
            <h5 className="font-outfit font-bold text-sm text-white uppercase tracking-[0.2em]">Contact</h5>
            <ul className="space-y-3 text-sm font-normal text-white/45">
              <li>
                <a href="mailto:info@covaitechpark.com" className="hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 cursor-pointer">
                  <span className="w-5 h-5 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  info@covaitechpark.com
                </a>
              </li>
              <li>
                <a href="tel:+919360780768" className="hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 cursor-pointer">
                  <span className="w-5 h-5 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72c.13.98.36 1.94.7 2.87a2 2 0 01-.45 2.11L6.09 8a16 16 0 006 6l1.12-1.16a2 2 0 012.11-.45c.93.34 1.9.57 2.87.7A2 2 0 0122 14.92z" />
                    </svg>
                  </span>
                  +91 93607 80768
                </a>
              </li>
              <li>
                <a href="https://covaitechpark.com" className="hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 cursor-pointer">
                  <span className="w-5 h-5 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                  </span>
                  covaitechpark.com
                </a>
              </li>
            </ul>

            {/* Quick nav */}
            <div className="pt-2 space-y-2">
              <h5 className="font-outfit font-bold text-sm text-white uppercase tracking-[0.2em]">Quick Nav</h5>
              <div className="flex flex-wrap gap-2">
                {[["About", "#about"], ["Spaces", "#banking-layout"], ["Phases", "#deployment-track"], ["Book", "#booking"]].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="text-[10px] font-bold uppercase tracking-widest text-white/45 hover:text-brand-orange border border-white/10 hover:border-brand-orange/40 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Legal Strip */}
        <div className="border-t border-white/5 py-5">
          <div className="box-container flex items-center justify-center text-center text-sm sm:text-sm font-bold text-white/60 px-2">
            <span>-¨ {new Date().getFullYear()} Covai Tech Park G«ˆ MAX OFFICE. All rights reserved.</span>
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
                className="absolute top-5 right-5 text-brand-navy/55 hover:text-brand-navy hover:bg-brand-navy/5 p-2 rounded-full transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="mb-6 space-y-1 text-left">
                <h3 className="font-outfit font-bold text-2xl text-brand-navy">
                  Reserve Your Space
                </h3>
                <p className="text-sm text-brand-slate font-bold">
                  Fill in the details below. Our space administration team will follow up.
                </p>
              </div>

              {bookingSuccess ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-brand-orange">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </div>
                  <h4 className="font-outfit font-bold text-lg text-brand-navy leading-none">Booking Request Sent!</h4>
                  <p className="text-sm text-brand-slate font-bold leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong>{bookingName}</strong>. Your interest in <strong>{selectedPlan}</strong> has been logged. We will contact you at <strong>{bookingEmail}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4 text-left font-bold text-sm">
                
                <div>
                  <label className="block text-[9px] font-bold text-brand-navy uppercase tracking-widest mb-1.5">
                    Selected Workspace / Plan
                  </label>
                  <input
                    type="text"
                    value={selectedPlan}
                    disabled
                    className="w-full bg-brand-cream border border-brand-navy/10 rounded-xl px-4 py-3 text-sm text-brand-navy/70 font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-brand-navy uppercase tracking-widest mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-bold text-brand-navy uppercase tracking-widest mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-brand-navy uppercase tracking-widest mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-bold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#091b29] text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-brand-orange transition-all duration-300 shadow shadow-[#2b3748]/10 cursor-pointer"
                >
                  Confirm Request
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
