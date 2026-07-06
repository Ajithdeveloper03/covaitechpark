"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

const HERO_GRID_IMAGES = [
  [
    { src: prefix("/hero1.jpg"), hClass: "h-[90px] sm:h-[120px] md:h-[150px] lg:h-[170px] xl:h-[190px]" },
    { src: prefix("/workspace-lounge.png"), hClass: "h-[120px] sm:h-[150px] md:h-[185px] lg:h-[220px] xl:h-[250px]" }
  ],
  [
    { src: prefix("/hero2.jpg"), hClass: "h-[120px] sm:h-[150px] md:h-[185px] lg:h-[220px] xl:h-[250px]" },
    { src: prefix("/workspace-cabin.png"), hClass: "h-[120px] sm:h-[150px] md:h-[185px] lg:h-[220px] xl:h-[250px]" }
  ],
  [
    { src: prefix("/workspace-meeting.png"), hClass: "h-[120px] sm:h-[150px] md:h-[185px] lg:h-[220px] xl:h-[250px]" },
    { src: prefix("/workspace-event.png"), hClass: "h-[120px] sm:h-[150px] md:h-[185px] lg:h-[220px] xl:h-[250px]" }
  ],
  [
    { src: prefix("/hero11.jpg"), hClass: "h-[120px] sm:h-[150px] md:h-[185px] lg:h-[220px] xl:h-[250px]" },
    { src: prefix("/workspace-cafe.png"), hClass: "h-[120px] sm:h-[150px] md:h-[185px] lg:h-[220px] xl:h-[250px]" }
  ],
  [
    { src: prefix("/hero3.jpg"), hClass: "h-[90px] sm:h-[120px] md:h-[150px] lg:h-[170px] xl:h-[190px]" },
    { src: prefix("/hero13.jpg"), hClass: "h-[120px] sm:h-[150px] md:h-[185px] lg:h-[220px] xl:h-[250px]" }
  ]
];

const ECOSYSTEM_CARDS = [
  {
    title: "Coworking",
    img: "/workspace-lounge.png",
    desc: "Flexible hot desks for collaborative teams.",
    pos: "top-[8%] left-[2%] md:left-[4%] lg:left-[8%] xl:left-[12%]",
    href: "/coworking-space-in-coimbatore"
  },
  {
    title: "Meeting Rooms",
    img: "/workspace-meeting.png",
    desc: "Fully equipped spaces for presentations.",
    pos: "top-[44%] left-[1%] md:left-[2%] lg:left-[5%] xl:left-[9%]",
    href: "/meeting-room"
  },
  {
    title: "Virtual Office",
    img: "/workspace-cafe.png",
    desc: "Breakout zones with premium coffee.",
    pos: "bottom-[12%] left-[2%] md:left-[4%] lg:left-[8%] xl:left-[12%]",
    href: "/virtual-office"
  },
  {
    title: "Private Cabins",
    img: "/workspace-cabin.png",
    desc: "Soundproof suites for high-performance.",
    pos: "top-[18%] right-[2%] md:right-[4%] lg:right-[8%] xl:right-[12%]",
    href: "/private-office-space"
  },
  {
    title: "Event Spaces",
    img: "/workspace-event.png",
    desc: "Versatile areas for workshops & meetups.",
    pos: "bottom-[22%] right-[2%] md:right-[4%] lg:right-[8%] xl:right-[12%]",
    href: "/event-space-in-coimbatore"
  }
];

export default function AboutUsPage() {
  // Set page meta title for SEO
  

  return (
    <div className="min-h-screen bg-black text-slate-900 flex flex-col font-sans relative select-none antialiased">

      <Header />

      {/* HERO SECTION — responsive height, full bleed grid with glassy gradient background */}
      <section 
        id="hero"
        className="relative min-h-[90vh] lg:h-screen lg:max-h-screen w-full overflow-hidden flex flex-col justify-between pt-24 pb-8 lg:pb-0 z-10 bg-black"
      >
        {/* Vivid colorful glassmorphism background with layered gradient orbs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-gradient-to-b from-[#0a182b] via-[#12223a] to-[#26150b]">
          {/* Primary Orb: Warm Amber/Orange — top-left anchor */}
          <div className="absolute top-[-10%] left-[-5%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-[#f37021]/35 via-[#f37021]/15 to-transparent blur-[120px] animate-pulse" style={{animationDuration:'8s'}} />
          
          {/* Secondary Orb: Deep Indigo/Cyan — bottom-right anchor */}
          <div className="absolute bottom-[-10%] right-[-5%] w-[65%] h-[65%] rounded-full bg-gradient-to-tl from-indigo-500/25 via-blue-900/10 to-transparent blur-[120px] animate-pulse" style={{animationDuration:'10s'}} />
          
          {/* Unified glassy backdrop blur layer */}
          <div className="absolute inset-0 backdrop-blur-[70px] bg-black/15" />

          {/* Subtle grain noise texture for depth */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{backgroundImage:"url('data:image/svg+xml,%3Csvg width=\"200\" height=\"200\" viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\" opacity=\"1\"/%3E%3C/svg%3E')"}} />
        </div>

        {/* Minimal Hero content (Title, description, button) */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center gap-3 sm:gap-2 px-4 sm:px-6 lg:px-8 text-center mt-4 sm:mt-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white leading-[1.02] font-sans font-extrabold max-w-4xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f37021] via-orange-300 to-yellow-300">Covai Tech Park</span>
          </h1>
          <p className="text-white/80 tracking-[0.2em] uppercase mt-4 text-sm md:text-base font-semibold">
            Unit of Max Office
          </p>
        </div>

        {/* Full-width image grid block at bottom, aligned in 2 rows, with staggered translation and glassy overlay on 2nd row */}
        <div className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 z-10 mt-2 sm:-mt-8 pb-4 lg:pb-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 max-w-[1800px] mx-auto">
            {HERO_GRID_IMAGES.map((col, colIdx) => {
              const offsetClass = colIdx === 0 || colIdx === 4 ? "translate-y-0" :
                                  colIdx === 1 || colIdx === 3 ? "translate-y-[20px] sm:translate-y-[35px] md:translate-y-[50px]" :
                                  "translate-y-[40px] sm:translate-y-[70px] md:translate-y-[100px]";
              
              return (
                <div 
                  key={colIdx} 
                  className={`flex flex-col gap-4 sm:gap-5 ${offsetClass} ${colIdx >= 2 ? "hidden sm:flex" : "flex"} ${colIdx >= 3 ? "hidden md:flex" : "flex"}`}
                >
                  {col.map((img, imgIdx) => (
                    <div 
                      key={imgIdx} 
                      className={`group relative w-full ${img.hClass} rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl ${
                        imgIdx === 1 ? "opacity-55" : ""
                      }`}
                    >
                      <Image 
                        src={img.src} 
                        alt="Workspace Premium Layout" 
                        fill 
                        className="object-cover" 
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                        priority={true}
                      />
                      {/* Dark low-opacity overlay on the 2nd row (imgIdx === 1) matching the hero bg gradient tone */}
                      {imgIdx === 1 && (
                        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHO WE ARE SECTION - PART 1 */}
      <section id="who-we-are" className="py-12 sm:py-16 md:py-24 bg-white w-full relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 group order-2 lg:order-1">
            <Image 
              src={prefix("/workspace-meeting.png")} 
              alt="About Covai Tech" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6 order-1 lg:order-2">
            <span className="inline-block text-sm font-bold text-brand-orange tracking-[0.2em] bg-brand-orange/10 px-4 py-2 rounded-full">About Us</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-slate-900 tracking-tight leading-tight">
              Building Workspaces That Help Businesses Grow
            </h2>
            <div className="space-y-4">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Covai Tech Park was launched to bring premium managed office spaces and flexible workspace solutions to businesses in Coimbatore. Owned and operated by MAX OFFICE, a company established in 2017, Covai Tech Park is backed by years of expertise in delivering managed offices, coworking spaces, and enterprise workspace solutions designed for startups, growing businesses, and large enterprises.
              </p>
              <p className="text-slate-500 leading-relaxed text-base">
                Our workspaces are thoughtfully designed to provide the flexibility, functionality, and professional environment that modern businesses need. Whether you're looking for a private office, a managed workspace, or a fully customized office solution, our team is committed to delivering a seamless experience from workspace planning and setup to day-to-day operations.
              </p>
              <p className="text-slate-500 leading-relaxed text-base">
                Today, MAX OFFICE operates through Covai Tech Park in Coimbatore and Trichy Coworks in Trichy, with 8 business centres across the two cities. Together, we manage over 1.5 lakh square feet of premium office space, creating productive environments where businesses can collaborate, innovate, and grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE SECTION - PART 2 */}
      <section className="py-12 sm:py-16 md:py-24 bg-slate-50 w-full relative overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 order-1">
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight leading-tight">
              Trusted by Industry Leaders
            </h2>
            <div className="space-y-4">
              <p className="text-slate-600 leading-relaxed text-base">
                Over the years, organizations from diverse industries have chosen our workspaces, including BIS, WNS, Sigma Technologies, Choitrams, PhonePe, Zomato, Vodafone, 99acres, Naukri, Capgemini, HDFC Bank, Pan Gulf, Club Mahindra, and many more. Our focus on quality infrastructure, exceptional service, and operational excellence has enabled us to build lasting relationships with businesses of all sizes.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Our commitment to excellence has also earned industry recognition. Trichy Coworks, another brand owned and operated by MAX OFFICE, was recognized by Times Magazine as the Best Office Space Solution in Tier 2 and Tier 3 Cities of Tamil Nadu, reflecting our dedication to delivering outstanding workspace experiences.
              </p>
              <div className="p-6 bg-white border border-brand-orange/20 rounded-2xl shadow-sm mt-6">
                <p className="text-brand-navy font-medium italic text-lg leading-relaxed">
                  "At Covai Tech Park, we believe that a workspace is more than just an office. It is a place where ideas are transformed into opportunities, teams work together with confidence, and businesses achieve sustainable growth. As we continue to expand across Tamil Nadu, our mission remains the same—to provide flexible, future-ready workspaces that empower businesses to succeed."
                </p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 group order-2">
            <Image 
              src={prefix("/hero13.jpg")} 
              alt="Trusted Workspace" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Our Journey line (Timeline Layout) */}
      <section id="our-story" className="py-12 sm:py-16 md:py-24 bg-[#f8fafc] w-full relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-sans font-bold text-slate-900 tracking-tight flex items-center justify-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center shadow-lg">
                <div className="w-3 h-3 rounded-full bg-brand-orange"></div>
              </span>
              Our Journey
            </h2>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-[95%] bg-slate-200 top-[2%]"></div>

            {/* 2017 */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-24 w-full group">
              <div className="w-full md:w-[45%] mb-8 md:mb-0">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border border-brand-navy/10 transition-transform duration-500 group-hover:-translate-y-2">
                  <Image src={prefix("/beginning.jpg")}  alt="Covai Tech 2017" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </div>
              <div className="w-full md:w-[10%] flex justify-center py-4 md:py-0">
                <div className="bg-[#f8fafc] px-6 py-3 font-black text-brand-orange text-3xl tracking-wide z-10 border-y md:border-y-0 border-slate-200">
                  2017
                </div>
              </div>
              <div className="w-full md:w-[45%] text-center md:text-left px-4 md:px-0 md:pl-12">
                <h3 className="text-2xl font-bold text-brand-navy mb-4">The Beginning</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  MAX OFFICE was founded with a vision to transform the way businesses work. Trichy Coworks was launched as one of the first organized coworking spaces in Trichy, introducing flexible and managed office solutions to the city.
                </p>
              </div>
            </div>

            {/* 2018 */}
            <div className="relative z-10 flex flex-col md:flex-row-reverse items-center justify-between mb-24 w-full group">
              <div className="w-full md:w-[45%] mb-8 md:mb-0">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border border-brand-navy/10 transition-transform duration-500 group-hover:-translate-y-2">
                  <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80" alt="Covai Tech 2018" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </div>
              <div className="w-full md:w-[10%] flex justify-center py-4 md:py-0">
                <div className="bg-[#f8fafc] px-6 py-3 font-black text-brand-orange text-3xl tracking-wide z-10 border-y md:border-y-0 border-slate-200">
                  2018
                </div>
              </div>
              <div className="w-full md:w-[45%] text-center md:text-right px-4 md:px-0 md:pr-12">
                <h3 className="text-2xl font-bold text-brand-navy mb-4">Building the Foundation</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Expanded operations in Trichy, establishing a strong presence in the managed office and coworking industry while serving startups, SMEs, and enterprises.
                </p>
              </div>
            </div>

            {/* 2022 */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-24 w-full group">
              <div className="w-full md:w-[45%] mb-8 md:mb-0">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border border-brand-navy/10 transition-transform duration-500 group-hover:-translate-y-2">
                  <Image src={prefix("/growth.jpg")}  alt="Covai Tech 2022" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </div>
              <div className="w-full md:w-[10%] flex justify-center py-4 md:py-0">
                <div className="bg-[#f8fafc] px-6 py-3 font-black text-brand-orange text-3xl tracking-wide z-10 border-y md:border-y-0 border-slate-200">
                  2022
                </div>
              </div>
              <div className="w-full md:w-[45%] text-center md:text-left px-4 md:px-0 md:pl-12">
                <h3 className="text-2xl font-bold text-brand-navy mb-4">Rapid Growth</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Reached 750+ seats across 3 locations in Trichy, managing over 23,000 sq. ft. of premium office space.
                </p>
              </div>
            </div>

            {/* 2023 */}
            <div className="relative z-10 flex flex-col md:flex-row-reverse items-center justify-between mb-24 w-full group">
              <div className="w-full md:w-[45%] mb-8 md:mb-0">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border border-brand-navy/10 transition-transform duration-500 group-hover:-translate-y-2">
                  <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80" alt="Covai Tech 2023" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </div>
              <div className="w-full md:w-[10%] flex justify-center py-4 md:py-0">
                <div className="bg-[#f8fafc] px-6 py-3 font-black text-brand-orange text-3xl tracking-wide z-10 border-y md:border-y-0 border-slate-200">
                  2023
                </div>
              </div>
              <div className="w-full md:w-[45%] text-center md:text-right px-4 md:px-0 md:pr-12">
                <h3 className="text-2xl font-bold text-brand-navy mb-4">Expansion into Coimbatore</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Launched Covai Tech Park in Coimbatore, expanding beyond Trichy and increasing our portfolio to 1,500+ seats.
                  <br/><br/>
                  <strong className="text-brand-orange">Recognition:</strong> Trichy Coworks was recognized by Times Magazine as the Best Office Space Solution in Tier 2 & Tier 3 Cities of Tamil Nadu.
                </p>
              </div>
            </div>

            {/* 2024 */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-24 w-full group">
              <div className="w-full md:w-[45%] mb-8 md:mb-0">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border border-brand-navy/10 transition-transform duration-500 group-hover:-translate-y-2">
                  <Image src={prefix("/strength.jpg")}  alt="Covai Tech 2024" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </div>
              <div className="w-full md:w-[10%] flex justify-center py-4 md:py-0">
                <div className="bg-[#f8fafc] px-6 py-3 font-black text-brand-orange text-3xl tracking-wide z-10 border-y md:border-y-0 border-slate-200">
                  2024
                </div>
              </div>
              <div className="w-full md:w-[45%] text-center md:text-left px-4 md:px-0 md:pl-12">
                <h3 className="text-2xl font-bold text-brand-navy mb-4">Strengthening Our Presence</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Added 20,000 sq. ft. of premium office space in Trichy, further expanding our capacity and meeting the growing demand for flexible workspaces.
                </p>
              </div>
            </div>

            {/* 2025 */}
            <div className="relative z-10 flex flex-col md:flex-row-reverse items-center justify-between mb-24 w-full group">
              <div className="w-full md:w-[45%] mb-8 md:mb-0">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border border-brand-navy/10 transition-transform duration-500 group-hover:-translate-y-2">
                  <Image src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80" alt="Covai Tech 2025" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </div>
              <div className="w-full md:w-[10%] flex justify-center py-4 md:py-0">
                <div className="bg-[#f8fafc] px-6 py-3 font-black text-brand-orange text-3xl tracking-wide z-10 border-y md:border-y-0 border-slate-200">
                  2025
                </div>
              </div>
              <div className="w-full md:w-[45%] text-center md:text-right px-4 md:px-0 md:pr-12">
                <h3 className="text-2xl font-bold text-brand-navy mb-4">Growing in Coimbatore</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Expanded our presence in Coimbatore by adding 10,000 sq. ft. of premium office space under the Covai Tech Park brand, strengthening our footprint in the city's growing business ecosystem.
                </p>
              </div>
            </div>

            {/* 2026 */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full group">
              <div className="w-full md:w-[45%] mb-8 md:mb-0">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border border-brand-navy/10 transition-transform duration-500 group-hover:-translate-y-2">
                  <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80" alt="Covai Tech 2026" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </div>
              <div className="w-full md:w-[10%] flex justify-center py-4 md:py-0">
                <div className="bg-[#f8fafc] px-6 py-3 font-black text-brand-orange text-3xl tracking-wide z-10 border-y md:border-y-0 border-slate-200">
                  2026
                </div>
              </div>
              <div className="w-full md:w-[45%] text-center md:text-left px-4 md:px-0 md:pl-12">
                <h3 className="text-2xl font-bold text-brand-navy mb-4">Accelerating Growth</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Further expanded our portfolio with 17,000 sq. ft. of premium office space in Trichy and 30,000 sq. ft. in Coimbatore. Today, MAX OFFICE manages over 1.5 lakh square feet of workspace across 8 business centres in Coimbatore and Trichy, serving businesses ranging from startups to leading national and multinational organizations.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section id="founder" className="py-12 sm:py-16 md:py-24 bg-white w-full relative overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#f37021]/10 text-brand-orange text-xs font-bold uppercase tracking-widest rounded-full mb-4">Leadership</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
              TEDx Speaker | Entrepreneur | Workspace Innovator
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-10 items-stretch min-h-[500px]">
            
            {/* Left Content */}
            <div className="space-y-5 text-slate-600 text-sm sm:text-base leading-relaxed text-justify flex flex-col justify-center">
              <p className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm">
                In 2017, Manoj Prabahar Asokan recognized a significant gap in Trichy's business ecosystem. While startups, freelancers, and growing businesses were emerging, there were no organized coworking or managed office spaces that offered the flexibility and professional infrastructure they needed.
              </p>
              <p className="px-2">
                Seeing this opportunity, Manoj founded Trichy Coworks, one of the city's first organized coworking space providers, with a vision to make premium workspaces accessible to businesses of every size. What started as a modest 500 sq. ft. workspace soon transformed the way companies worked in Trichy.
              </p>
            </div>
            
            {/* Center Image */}
            <div className="relative w-full h-[400px] lg:h-auto rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
              <Image 
                src={prefix("/founder.jpeg")} 
                alt="Manoj Prabahar Asokan" 
                fill 
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-8 left-0 right-0 text-center px-4">
                <h3 className="text-white text-2xl font-bold">Manoj Prabahar Asokan</h3>
                <p className="text-brand-orange font-medium mt-1">Founder & Managing Director</p>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-5 text-slate-600 text-sm sm:text-base leading-relaxed text-justify flex flex-col justify-center">
              <p className="px-2">
                As demand grew, so did the vision. Under his leadership, MAX OFFICE expanded beyond Trichy with the launch of Covai Tech Park in Coimbatore. Today, the company manages over 1.5 lakh square feet of premium office space across 8 business centres.
              </p>
              <p className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm">
                Driven by a passion for enabling business growth, Manoj also founded Talentztech Solution, helping organizations around the world build and manage remote teams in India. A Civil Engineer and Master's graduate from the University of Greenwich, UK.
              </p>
              <p className="font-semibold text-slate-800 text-base italic border-l-4 border-brand-orange pl-4 mt-2">
                "His vision continues to guide MAX OFFICE today: to build inspiring workspaces that empower businesses, foster collaboration, and create opportunities for growth."
              </p>
            </div>
            
          </div>
        </div>
      </section>

          {/* EXCLUSIVE ECOSYSTEM SECTION */}
      <section className="w-full bg-white pt-12 sm:pt-16 md:pt-24 pb-0 overflow-hidden">
        
        {/* Heading block */}
        <div className="max-w-5xl mx-auto px-4 text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4 sm:mb-6 font-sans">
            Step into Covai Tech's exclusive ecosystem
          </h2>
          <p className="text-slate-500 text-base sm:text-md leading-relaxed mb-10">
            We connect members with premium office cabins, enterprise grade networking, bespoke meeting rooms, and proactive operational support empowering teams to work optimized.
          </p>
        </div>

        {/* Full-width stage: hand image + positioned cards */}
        <div className="relative w-full flex justify-center items-end min-h-[380px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[680px] overflow-hidden">
          
          {/* Background Image for the hand section */}
          <div className="absolute inset-0 z-0">
            <Image
              src={prefix("/step-into-bg.png")}
              alt="Workspace Background"
              fill
              className="object-cover opacity-100"
              sizes="100vw"
            />
            {/* Gradient overlay to blend it cleanly */}
           
          </div>


          {/* Huge centered hand image */}
          <div className="relative z-10 w-[95vw] max-w-[420px] sm:max-w-none sm:w-[480px] md:w-[580px] lg:w-[700px] xl:w-[920px] h-[380px] sm:h-[500px] md:h-[600px] lg:h-[680px]">
            <Image
              src={prefix("/hand.png")}
              alt="Covai Tech Mobile Experience"
              fill
              className="object-contain object-bottom scale-110 sm:scale-100 origin-bottom"
              sizes="(max-width: 640px) 95vw, (max-width: 1024px) 580px, 920px"
              priority
            />
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 w-full h-24 sm:h-40 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />

          {/* Desktop cards (5 compact boxes with minimal content) */}
          {ECOSYSTEM_CARDS.map((card, idx) => (
            <a 
              href={prefix(card.href)}
              key={idx} 
              className={`absolute ${card.pos} z-30 hidden md:flex gap-4 items-center bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-all duration-300 w-[240px] lg:w-[310px] cursor-pointer group hover:-translate-y-1`}
            >
              <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden relative border border-slate-100">
                <Image src={prefix(card.img)} alt={card.title} fill className="object-cover" sizes="56px" />
              </div>
              <div className="flex-1">
                <h4 className="text-[16px] font-bold tracking-wider text-slate-800 uppercase mb-0.5 group-hover:text-brand-orange transition-colors duration-300">{card.title}</h4>
                <p className="text-[14px] text-slate-500 leading-normal">{card.desc}</p>
              </div>
            </a>
          ))}

        </div>

        {/* Mobile card stack (visible only on small screens) */}
        <div className="md:hidden flex flex-col gap-4 px-4 pb-12 pt-8">
          {ECOSYSTEM_CARDS.map((card) => (
            <div key={card.title} className="flex gap-4 items-center bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
              <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden relative border border-slate-100">
                <Image src={prefix(card.img)} alt={card.title} fill className="object-cover" sizes="64px" />
              </div>
              <div>
                <h4 className="text-[10px] font-black tracking-[0.18em] text-slate-800 mb-1">{card.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-2">{card.desc}</p>
                <a href={prefix(card.href)} className="text-[11px] font-bold text-slate-900 underline underline-offset-2">See details</a>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Why Choose Covai Tech (Bento Grid) */}
      {/* <section className="py-12 sm:py-16 md:py-24 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="w-4 h-4 rounded-full bg-brand-orange inline-block mb-4"></span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-sans font-bold text-slate-900 tracking-tight">
              Leading the Way in<br/> Workspace Supply
            </h2>
            <p className="mt-4 text-slate-600">Explore the key reasons businesses choose us as their workspace partner.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 sm:gap-6 auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[250px]">
           
            <div className="col-span-1 md:col-span-4 row-span-1 bg-[#faf9f6] rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between shadow-sm border border-slate-100 group transition-transform duration-500 hover:-translate-y-2">
              <p className="text-slate-600 font-medium leading-relaxed text-sm sm:text-base">
                Our unwavering quality ensures you receive top-tier amenities, always meeting your standards.
              </p>
              <div>
                <h3 className="text-4xl font-black text-brand-navy">99.8%</h3>
                <p className="text-lg font-bold text-brand-navy">Client Satisfaction</p>
              </div>
            </div>

           
            <div className="col-span-1 md:col-span-4 row-span-2 relative rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group transition-transform duration-500 hover:-translate-y-2">
              <Image src={prefix("/workspace-cabin.png")} alt="Premium Support" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-3xl font-black text-white mb-2">24/7</h3>
                <p className="text-lg font-bold text-white mb-4">Access & Support</p>
                <p className="text-white/80 text-sm font-medium">You can rely on us to keep your operations running smoothly without delays.</p>
              </div>
            </div>

           
            <div className="col-span-1 md:col-span-4 row-span-1 relative rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group transition-transform duration-500 hover:-translate-y-2">
              <Image src={prefix("/workspace-lounge.png")} alt="Lounge Area" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>

            
            <div className="col-span-1 md:col-span-4 row-span-1 relative rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group transition-transform duration-500 hover:-translate-y-2">
              <Image src={prefix("/workspace-hotdesk.png")} alt="Hotdesk Zone" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>

            
            <div className="col-span-1 md:col-span-4 row-span-1 bg-brand-navy rounded-[2rem] p-8 sm:p-10 flex flex-col justify-end shadow-sm border border-slate-800 group transition-transform duration-500 hover:-translate-y-2">
              <h3 className="text-4xl font-black text-white">300+</h3>
              <p className="text-lg font-bold text-white mb-4">Active Members</p>
              <p className="text-white/80 font-medium text-sm sm:text-base">
                Join countless satisfied businesses who've relied on our consistent, expert support.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
}
