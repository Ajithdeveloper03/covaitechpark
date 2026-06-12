"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingNav from "../components/FloatingNav";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

const AmenityIcon = ({ name, className }: { name: string; className?: string }) => {
  const cls = className || "w-6 h-6";
  switch (name) {
    case "office":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M9 21V9a3 3 0 0 1 6 0v12M4 21V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v15" />
        </svg>
      );
    case "wifi":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856a9.75 9.75 0 0113.788 0M1.924 8.674a14.25 14.25 0 0120.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
        </svg>
      );
    case "ac":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5L7 19M19 12H5M17 19L7 5M12 2l3 3M12 22l-3-3M2 12l3-3M22 12l-3 3" />
        </svg>
      );
    case "generator":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "parking":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7h4a3 3 0 0 1 0 6H9" />
        </svg>
      );
    case "access":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
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

export default function CoimbatorePage() {
  // Set page meta title for SEO
  useEffect(() => {
    document.title = "Book a Shared Office For Rent in Coimbatore | Coworking Space";
  }, []);

  // Booking Modal States
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingFirstName, setBookingFirstName] = useState("");
  const [bookingLastName, setBookingLastName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingPhoneCode, setBookingPhoneCode] = useState("+91");
  const [bookingLookingFor, setBookingLookingFor] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleOpenBooking = (plan: string) => {
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
    <div className="min-h-screen bg-slate-50 text-brand-navy flex flex-col font-inter relative select-none font-medium text-base antialiased">
      
      <FloatingNav />
      <Header />

      {/* ── 1. HERO SECTION ── */}
      <section id="hero" className="relative min-h-[100vh] w-full flex flex-col items-center justify-start pt-24 sm:pt-28 pb-30 overflow-hidden text-white">
        
        {/* Full bleed background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/covaitechpark/coimbatore.png"
            alt="Coimbatore coworking space"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Centered Hero Content */}
        <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-8xl mt-8 mx-auto w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-outfit font-bold tracking-tight text-white leading-[1.05] mb-4">
            CovaiTech Park - Coimbatore HQ
          </h1>

          <p className="text-slate-200 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-3xl mb-6 flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-brand-orange shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            4th South Cross St, Kovai Thirunagar, Nehru Nagar East, Coimbatore - 641 014
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <button
              onClick={() => handleOpenBooking("Coimbatore HQ Tour")}
              className="px-8 py-4 bg-brand-orange hover:bg-white hover:text-brand-navy text-white font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg cursor-pointer"
            >
              Schedule Visit
            </button>
            <a
              href="https://maps.app.goo.gl/T4HnE2Wn8nSjLptN8"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/30 hover:border-brand-orange text-white hover:bg-brand-orange/15 font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer no-underline flex items-center gap-2"
            >
              Get Directions &rarr;
            </a>
          </div>
        </div>

        {/* Fan-out Arc of 5 workspace cards at bottom */}
        <div className="relative z-20 w-full max-w-5xl mx-auto mt-4 sm:mt-2 md:mt-2 lg:mt-6 px-4 flex-shrink-0 h-[220px] sm:h-[240px] md:h-[280px] justify-start">
          {/* Desktop/tablet view */}
          <div className="hidden sm:block relative w-full h-full">
            {[
              { img: "/covaitechpark/hero1.jpg", rotate: -36, offset: "-300px", translateY: "60px", active: false },
              { img: "/covaitechpark/hero2.jpg", rotate: -18, offset: "-160px", translateY: "15px", active: false },
              { img: "/covaitechpark/hero3.jpg", rotate: 0, offset: "0px", translateY: "0px", active: true },
              { img: "/covaitechpark/hero11.jpg", rotate: 18, offset: "160px", translateY: "15px", active: false },
              { img: "/covaitechpark/hero13.jpg", rotate: 36, offset: "300px", translateY: "60px", active: false },
            ].map((card, i) => (
              <div
                key={i}
                className="absolute bottom-0 left-1/2"
                style={{
                  transform: `translateX(calc(-50% + ${card.offset})) translateY(${card.translateY}) rotate(${card.rotate}deg)`,
                  transformOrigin: 'bottom center',
                  zIndex: card.active ? 30 : 20 - Math.abs(i - 2),
                  transition: 'transform 0.5s ease',
                }}
              >
                <div
                  className={`relative w-48 sm:w-52 md:w-52 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden transition-all duration-500 ${
                    card.active ? 'scale-105' : 'scale-95'
                  }`}
                  style={{ height: '260px' }}
                >
                  <Image src={card.img} alt="Workspace Highlight" fill sizes="156px" className="object-cover" loading="lazy" />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile view */}
          <div className="flex sm:hidden gap-3 overflow-x-auto pb-2 scrollbar-hide items-end justify-center">
            {[
              { img: "/covaitechpark/hero1.jpg" },
              { img: "/covaitechpark/hero2.jpg" },
              { img: "/covaitechpark/hero3.jpg", active: true },
              { img: "/covaitechpark/hero11.jpg" },
              { img: "/covaitechpark/hero13.jpg" },
            ].map((card, i) => (
              <div key={i} className={`flex-shrink-0 w-28 relative rounded-[1rem] overflow-hidden ${card.active ? 'h-44' : 'h-36'}`}>
                <Image src={card.img} alt="Workspace Highlight" fill sizes="112px" className="object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. LOCATION HIGHLIGHTS (Bento Grid Redesign) ── */}
      <section id="highlights" className="py-24 sm:py-32 bg-white w-full px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Subtle decorative background blobs */}
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-navy/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="text-left space-y-4 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              Campus Features
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold text-brand-navy tracking-tight leading-none">
              High-End Infrastructure <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ff9853]">
                Designed For Growth
              </span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
              Discover unique advantages that make our Coimbatore campus the ultimate environment for tech startups and corporate offices.
            </p>
          </div>

          {/* Unique Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto auto-rows-[minmax(180px,auto)]">
            
            {/* Feature 1: Large Card (Spans 2 columns) */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/80 rounded-3xl p-8 lg:p-10 flex flex-col justify-between hover:border-brand-orange/45 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-orange/5 rounded-bl-[6rem] pointer-events-none" />
              <div className="space-y-4 max-w-md">
                <div className="w-14 h-14 rounded-2xl bg-brand-orange/15 text-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                  <AmenityIcon name="office" className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h3 className="font-outfit font-bold text-2xl text-brand-navy">Premium Fully Furnished Cabins</h3>
                <p className="text-slate-500 text-sm sm:text-sm font-normal leading-relaxed">
                  Move-in ready cabins and premium ergonomic desk setups designed for maximum focus, comfort, and professional representation.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-brand-orange">
                <span>Enterprise Grade Layouts</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
              </div>
            </div>

            {/* Feature 2: High Card (Spans 1 column, height is double in rows) */}
            <div className="md:col-span-1 md:row-span-2 relative border border-slate-800 rounded-3xl p-8 lg:p-10 flex flex-col justify-between hover:shadow-2xl hover:border-brand-orange/30 transition-all duration-500 group text-white overflow-hidden">
              <Image
                src={prefix("/hero11.jpg")}
                alt="High-Speed Internet Infrastructure"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 z-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#091b29]/95 via-[#091b29]/80 to-[#091b29]/95 z-10" />
              
              <div className="relative z-20 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-orange text-white flex items-center justify-center shadow-lg">
                  <AmenityIcon name="wifi" className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h3 className="font-outfit font-bold text-2xl">High-Speed Dual-Fiber Internet</h3>
                <p className="text-slate-200 text-sm sm:text-sm font-normal leading-relaxed">
                  Dual-active enterprise internet lines with automatic failover and SLA backups to ensure your business operations never face downtime.
                </p>
              </div>
              <div className="relative z-20 mt-8 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-brand-orange">
                <span>99.9% Uptime Guarantee</span>
              </div>
            </div>

            {/* Feature 3: Standard Card */}
            <div className="bg-slate-50/80 border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-brand-orange/45 hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-brand-orange/10 group-hover:text-brand-orange flex items-center justify-center transition-all duration-300">
                  <AmenityIcon name="ac" className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-outfit font-bold text-lg text-brand-navy">Smart Climate Control</h3>
                <p className="text-slate-500 text-sm font-normal leading-relaxed">
                  Individually controlled smart climate systems to keep your work environment comfortable.
                </p>
              </div>
            </div>

            {/* Feature 4: Standard Card */}
            <div className="bg-slate-50/80 border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-brand-orange/45 hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-brand-orange/10 group-hover:text-brand-orange flex items-center justify-center transition-all duration-300">
                  <AmenityIcon name="generator" className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-outfit font-bold text-lg text-brand-navy">24/7 Power Backup</h3>
                <p className="text-slate-500 text-sm font-normal leading-relaxed">
                  Heavy industrial diesel generator setups ensuring zero interruption in power.
                </p>
              </div>
            </div>

            {/* Feature 5: Large Card (Spans 2 columns) */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/80 rounded-3xl p-8 lg:p-10 flex flex-col justify-between hover:border-brand-orange/45 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-orange/5 rounded-bl-[6rem] pointer-events-none" />
              <div className="space-y-4 max-w-md">
                <div className="w-14 h-14 rounded-2xl bg-brand-orange/15 text-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                  <AmenityIcon name="access" className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h3 className="font-outfit font-bold text-2xl text-brand-navy">Secure 24x7 Campus Access</h3>
                <p className="text-slate-500 text-sm sm:text-sm font-normal leading-relaxed">
                  Work on your own terms and global schedules with secure keycard entries and round-the-clock physical security guards on patrol.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-brand-orange">
                <span>Secure IT Infrastructure</span>
              </div>
            </div>

            {/* Feature 6: Standard Card */}
            <div className="bg-slate-50/80 border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-brand-orange/45 hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-brand-orange/10 group-hover:text-brand-orange flex items-center justify-center transition-all duration-300">
                  <AmenityIcon name="parking" className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-outfit font-bold text-lg text-brand-navy">Allocated Parking Spaces</h3>
                <p className="text-slate-500 text-sm font-normal leading-relaxed">
                  Ample safe parking space dedicated to two-wheelers and four-wheelers of members.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. OTHER LOCATIONS (Minimal, Rich & Elegant with Images) ── */}
      <section id="other-locations" className="py-24 sm:py-32 bg-slate-50 w-full relative overflow-hidden border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block">
              OUR NETWORK
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-bold tracking-tight text-brand-navy leading-none">
              Explore Our Strategic Locations
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-normal">
              Establish your business across premium tech corridors in Tamil Nadu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto px-4">
            
            {/* Coimbatore - Rich Elegant Card with Image */}
            <div className="bg-white border border-slate-200/80 rounded-[2.5rem] overflow-hidden flex flex-col shadow-lg hover:shadow-2xl transition-all duration-500 group">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src="/covaitechpark/coimbatore.png"
                  alt="Coimbatore headquarters"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute top-6 right-6">
                  <span className="px-3.5 py-1 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
                    Active Location
                  </span>
                </div>
                <div className="absolute bottom-6 left-8 text-white">
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Headquarters</span>
                  <h3 className="font-outfit font-bold text-3xl mt-1">Coimbatore HQ</h3>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex flex-col justify-between flex-grow space-y-6">
                <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
                  Our flagship business hub features ready-to-move cabins, premium coworking lounges, and modern meeting spaces.
                </p>
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm font-medium text-slate-500">
                  <div className="space-y-1">
                    <p className="text-brand-navy font-bold">4th South Cross St, Coimbatore</p>
                    <p className="text-xs">Phone: +91 93607 80768</p>
                  </div>
                  <span className="text-brand-orange font-bold text-xs uppercase tracking-wider shrink-0">Currently Viewing</span>
                </div>
              </div>
            </div>

            {/* Trichy Branch - Rich Elegant Card with Image */}
            <a 
              href={prefix("/contact")} 
              className="bg-white border border-slate-200/80 rounded-[2.5rem] overflow-hidden flex flex-col shadow-lg hover:shadow-2xl hover:border-brand-orange/30 transition-all duration-500 group"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src="/covaitechpark/hero3.jpg"
                  alt="Trichy Center workspace"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute top-6 right-6">
                  <span className="px-3.5 py-1 bg-brand-navy text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
                    Explore Campus
                  </span>
                </div>
                <div className="absolute bottom-6 left-8 text-white">
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Expansion Hub</span>
                  <h3 className="font-outfit font-bold text-3xl mt-1 group-hover:text-brand-orange transition-colors">Trichy Center</h3>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex flex-col justify-between flex-grow space-y-6">
                <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
                  Located strategically in Thillai Nagar near Isha Yoga Center, offering complete IT infrastructure and on-site support.
                </p>
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm font-medium text-slate-500">
                  <div className="space-y-1">
                    <p className="text-brand-navy font-bold">Thillai Nagar, Tiruchirappalli</p>
                    <p className="text-xs">Phone: +91 96889 92210</p>
                  </div>
                  <span className="text-[#f37021] font-bold text-xs uppercase tracking-wider shrink-0 group-hover:translate-x-1 transition-transform duration-300">Inquire Branch &rarr;</span>
                </div>
              </div>
            </a>

          </div>
        </div>
      </section>

      <Footer />

      {/* ── IN-PAGE RESERVATION MODAL ── */}
      {bookingOpen && (
        <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-[2rem] overflow-hidden w-full max-w-4xl shadow-2xl relative border border-brand-navy/10 flex flex-col md:flex-row">
            
            <div className="relative w-full md:w-5/12 hidden md:block">
              <Image
                src={prefix("/workspace-cabin.png")}
                alt="CovaiTech Park Premium Workspace"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px" loading="lazy" />
              <div className="absolute inset-0 bg-brand-navy/20" />
            </div>

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
                <h3 className="font-outfit font-medium text-2xl text-brand-navy">
                  Reserve Your Space / Schedule Visit
                </h3>
                <p className="text-sm text-brand-slate font-medium">
                  Fill in the details below. Our space administration team will follow up.
                </p>
              </div>

              {bookingSuccess ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-brand-orange">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </div>
                  <h4 className="font-outfit font-medium text-lg text-brand-navy leading-none">Tour Request Sent!</h4>
                  <p className="text-sm text-brand-slate font-medium leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong>{bookingFirstName} {bookingLastName}</strong>. Your interest in <strong>{bookingLookingFor}</strong> has been logged. We will contact you at <strong>{bookingEmail}</strong> or <strong>{bookingPhoneCode} {bookingPhone}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4 text-left font-medium text-sm">
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
                          value={bookingFirstName}
                          onChange={(e) => setBookingFirstName(e.target.value)}
                          placeholder=""
                          className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-medium shadow-sm"
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
                          className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-medium shadow-sm"
                        />
                        <span className="text-[10px] text-slate-400 font-medium italic mt-1 block">Last</span>
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
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
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
                      value={bookingLookingFor}
                      onChange={(e) => setBookingLookingFor(e.target.value)}
                      className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-medium cursor-pointer shadow-sm"
                      required
                    >
                      <option value="">-Select-</option>
                      <option value="Coworking & Hot Desks">Coworking & Hot Desks</option>
                      <option value="Dedicated Desks">Dedicated Desks</option>
                      <option value="Private Cabins">Private Cabins</option>
                      <option value="Meeting Rooms">Meeting Rooms</option>
                      <option value="Custom Office Solutions">Custom Office Solutions</option>
                      <option value="Coimbatore HQ Tour">Coimbatore HQ Tour</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#091b29] text-white text-sm font-medium uppercase tracking-widest rounded-xl hover:bg-brand-orange transition-all duration-300 shadow cursor-pointer mt-4"
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
