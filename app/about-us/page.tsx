"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingNav from "../components/FloatingNav";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

export default function AboutUsPage() {
  // Set page meta title for SEO
  useEffect(() => {
    document.title = "About Us | Premium Office Spaces & Ecosystem - CovaiTech Park";
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 flex flex-col font-sans relative select-none antialiased">
      <Header />

      <FloatingNav />

      {/* NEW CREATIVE HERO SECTION */}
      <section 
        id="hero"
        className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden bg-[#060d17]"
      >
        {/* Abstract shapes / Glows for a unique aesthetic */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#f37021]/15 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-sky-500/10 blur-[100px]" />
          <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] rounded-full bg-violet-500/10 blur-[80px]" />
          
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:"url('data:image/svg+xml,%3Csvg width=\"200\" height=\"200\" viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\" opacity=\"1\"/%3E%3C/svg%3E')"}} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-[#f37021] animate-pulse" />
            <span className="text-white/80 text-xs font-semibold tracking-[0.2em] uppercase">Redefining Workspaces</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-white font-sans font-bold leading-[0.95] mb-8">
            Work. Connect.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f37021] via-orange-300 to-yellow-300 italic font-serif font-medium pr-4">Thrive.</span>
          </h1>

          <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal mb-12">
            CovaiTech Park isn't just an office. It's an organically designed ecosystem engineered for high-performance teams, innovative startups, and visionary founders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button className="px-8 py-4 bg-[#f37021] text-white font-bold text-sm tracking-widest uppercase rounded-full hover:bg-white hover:text-[#f37021] transition-colors duration-300 shadow-xl shadow-[#f37021]/20">
              Explore Spaces
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold text-sm tracking-widest uppercase rounded-full hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm">
              Our Story
            </button>
          </div>
        </div>

        {/* Floating image accents */}
        <div className="absolute left-[5%] top-[20%] hidden lg:block w-48 h-64 rounded-3xl overflow-hidden border border-white/10 shadow-2xl rotate-[-6deg] animate-float">
          <Image src={prefix("/workspace-meeting.png")} alt="Meeting" fill className="object-cover" sizes="200px" />
        </div>
        <div className="absolute right-[5%] bottom-[15%] hidden lg:block w-56 h-40 rounded-3xl overflow-hidden border border-white/10 shadow-2xl rotate-[4deg] animate-float" style={{ animationDelay: '1.5s' }}>
          <Image src={prefix("/workspace-cabin.png")} alt="Cabin" fill className="object-cover" sizes="224px" />
        </div>

        {/* Fade to white at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#faf9f6] to-transparent pointer-events-none z-20" />
      </section>

     

      {/* WHO WE ARE SECTION */}
      <section id="who-we-are" className="py-24 bg-white w-full relative overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
            <Image 
              src={prefix("/workspace-meeting.png")} 
              alt="About CovaiTech" 
              fill 
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6">
            <span className="text-sm font-bold text-brand-orange uppercase tracking-[0.2em]">Who We Are</span>
            <h2 className="text-4xl sm:text-5xl font-sans font-bold text-slate-900 tracking-tight leading-tight">
              About CovaiTech Park
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              We are South India's most ambitious tech infrastructure provider. Born from a vision to empower startups and enterprises alike, CovaiTech Park transforms standard office leases into managed, high-performance ecosystems.
            </p>
            <p className="text-slate-500 leading-relaxed">
              We believe that the right workspace acts as a catalyst for innovation. By meticulously designing soundproof cabins, organic breakout zones, and enterprise-grade networking infrastructure, we remove the operational friction of running an office. Our community spans from bootstrapped tech founders to global software teams looking for an undeniable competitive edge.
            </p>
            <div className="pt-6">
              <button className="px-8 py-4 bg-brand-navy hover:bg-brand-orange text-white text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl">
                Explore The Space
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story line (Timeline Layout) */}
      <section id="our-story" className="py-24 bg-white w-full relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-slate-900 tracking-tight flex items-center justify-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center shadow-lg">
                <div className="w-3 h-3 rounded-full bg-brand-orange"></div>
              </span>
              Our Story line
            </h2>
            <p className="mt-6 text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Since our formation, CovaiTech has operated with a unified vision: to elevate workspace infrastructure and nurture enduring business growth across South India.
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-[90%] bg-slate-200 top-[5%]"></div>

            {/* 2024 Item */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-24 w-full group">
              <div className="w-full md:w-[45%] mb-8 md:mb-0">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border border-brand-navy/10 transition-transform duration-500 group-hover:-translate-y-2">
                  <Image src={prefix("/workspace-lounge.png")} alt="CovaiTech 2024" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </div>
              <div className="w-full md:w-[10%] flex justify-center py-4 md:py-0">
                <div className="bg-white px-6 py-3 font-black text-brand-orange text-3xl tracking-wide z-10 border-y md:border-y-0 border-slate-200">
                  2024
                </div>
              </div>
              <div className="w-full md:w-[45%] text-center md:text-left px-4 md:px-0 md:pl-12">
                <h3 className="text-2xl font-bold text-brand-navy mb-4">Adding value to workspaces</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  CovaiTech Park launches its state-of-the-art managed layouts in Coimbatore, featuring executive boardrooms, ergonomic hot desking zones, and collaborative lounge interfaces designed for ambitious startups.
                </p>
              </div>
            </div>

            {/* 2023 Item */}
            <div className="relative z-10 flex flex-col md:flex-row-reverse items-center justify-between mb-24 w-full group">
              <div className="w-full md:w-[45%] mb-8 md:mb-0">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border border-brand-navy/10 transition-transform duration-500 group-hover:-translate-y-2">
                  <Image src={prefix("/workspace-cabin.png")} alt="Max Office 2023" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </div>
              <div className="w-full md:w-[10%] flex justify-center py-4 md:py-0">
                <div className="bg-white px-6 py-3 font-black text-brand-orange text-3xl tracking-wide z-10 border-y md:border-y-0 border-slate-200">
                  2023
                </div>
              </div>
              <div className="w-full md:w-[45%] text-center md:text-right px-4 md:px-0 md:pr-12">
                <h3 className="text-2xl font-bold text-brand-navy mb-4">Building the foundation</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  The initial vision of Max Office is realized, connecting established enterprises with premium private cabins and dedicated support teams, laying the groundwork for a broader coworking ecosystem.
                </p>
              </div>
            </div>

            {/* 2022 Item */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-24 w-full group">
              <div className="w-full md:w-[45%] mb-8 md:mb-0">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border border-brand-navy/10 transition-transform duration-500 group-hover:-translate-y-2">
                  <Image src={prefix("/workspace-meeting.png")} alt="CovaiTech 2022" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </div>
              <div className="w-full md:w-[10%] flex justify-center py-4 md:py-0">
                <div className="bg-white px-6 py-3 font-black text-brand-orange text-3xl tracking-wide z-10 border-y md:border-y-0 border-slate-200">
                  2022
                </div>
              </div>
              <div className="w-full md:w-[45%] text-center md:text-left px-4 md:px-0 md:pl-12">
                <h3 className="text-2xl font-bold text-brand-navy mb-4">Expanding the ecosystem</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Demand for high-quality spaces surges. The team architects advanced IT layouts and organic breakout zones, introducing enterprise-grade internet and uninterrupted power to the portfolio.
                </p>
              </div>
            </div>

            {/* 2021 Item */}
            <div className="relative z-10 flex flex-col md:flex-row-reverse items-center justify-between w-full group">
              <div className="w-full md:w-[45%] mb-8 md:mb-0">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border border-brand-navy/10 transition-transform duration-500 group-hover:-translate-y-2">
                  <Image src={prefix("/workspace-cafe.png")} alt="CovaiTech 2021" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </div>
              <div className="w-full md:w-[10%] flex justify-center py-4 md:py-0">
                <div className="bg-white px-6 py-3 font-black text-brand-orange text-3xl tracking-wide z-10 border-y md:border-y-0 border-slate-200">
                  2021
                </div>
              </div>
              <div className="w-full md:w-[45%] text-center md:text-right px-4 md:px-0 md:pr-12">
                <h3 className="text-2xl font-bold text-brand-navy mb-4">The core concept</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Driven by the post-pandemic shift toward flexible working models, the founding vision takes shape: to create premium, managed office ecosystems that remove operational friction for software teams.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The CovaiTech Feeling Sub-Hero */}
      <section id="feeling" className="bg-brand-navy text-white pt-24 overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center px-4 md:px-8 z-10 relative">
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-medium tracking-tight mb-8 leading-tight">
            More than just a space,<br/> <span className="font-serif italic font-normal">it's a feeling.</span>
          </h2>
          <p className="text-white/80 font-medium max-w-2xl mx-auto mb-16 text-sm sm:text-base leading-relaxed">
            CovaiTech is a fertile ground for nurturing your ideas and growing your business. Whether you're a solopreneur or a startup ready to bloom, we provide the space, community, and resources you need to thrive.
          </p>
          <a href={prefix("/private-office-space")} className="text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:text-brand-orange transition-colors">
            Explore Full Story &rarr;
          </a>
        </div>

        {/* Bottom Archways */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 px-4 md:px-8 translate-y-12 sm:translate-y-24">
          <div className="relative rounded-t-full overflow-hidden aspect-[2/3] border-[6px] border-brand-navy shadow-2xl">
            <Image src={prefix("/workspace-event.png")} alt="Event Space" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
          <div className="relative rounded-t-full overflow-hidden aspect-[2/3] border-[6px] border-brand-navy shadow-2xl -translate-y-8 sm:-translate-y-16">
            <Image src={prefix("/workspace-lounge.png")} alt="Lounge Space" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
          <div className="relative rounded-t-full overflow-hidden aspect-[2/3] border-[6px] border-brand-navy shadow-2xl">
            <Image src={prefix("/workspace-cafe.png")} alt="Cafe Space" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
        </div>
      </section>

       {/* EXCLUSIVE ECOSYSTEM SECTION — full-width, reference-matched layout */}
      <section className="w-full bg-white pt-24 pb-0 overflow-hidden">
        
        {/* Heading block — centered, constrained */}
        <div className="max-w-3xl mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-6 font-sans">
            Step into CovaiTech's exclusive ecosystem
          </h2>
          <p className="text-slate-500 text-base sm:text-md leading-relaxed mb-10">
            We connect members with premium office cabins, enterprise-grade networking, bespoke meeting rooms, and proactive operational support—empowering teams to work optimized.
          </p>
          <a
            href={prefix("/private-office-space")}
            className="inline-flex items-center gap-3 bg-[#1a1a1a] text-white pl-7 pr-2 py-2 rounded-full text-sm font-semibold hover:bg-[#f37021] transition-colors duration-300 shadow-md group"
          >
            Explore Spaces
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black group-hover:translate-x-0.5 transition-transform shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>

        {/* Full-width stage: hand image + positioned cards */}
        <div className="relative w-full flex justify-center items-end" style={{ minHeight: '680px' }}>

          {/* Huge centered hand image */}
          <div className="relative z-10 w-[340px] sm:w-[480px] md:w-[580px] lg:w-[700px] xl:w-[920px]" style={{ height: '680px' }}>
            <Image
              src={prefix("/hand.png")}
              alt="CovaiTech Mobile Experience"
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 640px) 340px, (max-width: 1024px) 580px, 820px"
              priority
            />
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />

          {/* ── CARD 1: Top-Left — Coworking Spaces ── */}
          <div className="absolute top-[6%] left-[4%] md:left-[6%] lg:left-[9%] xl:left-[12%] z-30 hidden md:flex gap-4 items-start bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300 w-[260px] lg:w-[350px] cursor-pointer">
            <div className="w-20 h-30 shrink-0 rounded-xl overflow-hidden relative border border-slate-100">
              <Image src={prefix("/workspace-lounge.png")} alt="Coworking Spaces" fill className="object-cover" sizes="72px" />
            </div>
            <div className="flex-1">
              <h4 className="text-md font-extrabold  text-slate-800 uppercase mb-1.5">Coworking Spaces</h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-2.5">
                Discover flexible hot desks and dedicated workstations designed for focus, collaboration, and productivity.
              </p>
              {/* <a href={prefix("/#services-dark")} className="text-[11px] font-bold text-slate-900 underline underline-offset-2 hover:text-[#f37021] transition-colors">See full list</a> */}
            </div>
          </div>

          {/* ── CARD 2: Bottom-Left — Meeting Rooms ── */}
          <div className="absolute bottom-[18%] left-[4%] md:left-[6%] lg:left-[9%] xl:left-[12%] z-30 hidden md:flex gap-4 items-start bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300 w-[260px] lg:w-[350px] cursor-pointer">
            <div className="w-20 h-30 shrink-0 rounded-xl overflow-hidden relative border border-slate-100">
              <Image src={prefix("/workspace-meeting.png")} alt="Meeting Rooms" fill className="object-cover" sizes="72px" />
            </div>
            <div className="flex-1">
              <h4 className="text-md font-extrabold tracking-[0.1em] text-slate-800 uppercase mb-1.5">Meeting Rooms</h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-2.5">
                Book fully-equipped boardrooms for team sessions, client meetings, and high-stakes presentations.
              </p>
              {/* <a href={prefix("/#services-dark")} className="text-[11px] font-bold text-slate-900 underline underline-offset-2 hover:text-[#f37021] transition-colors">See full list</a> */}
            </div>
          </div>

          {/* ── CARD 3: Right — Private Cabins ── */}
          <div className="absolute top-[30%] right-[4%] md:right-[6%] lg:right-[9%] xl:right-[12%] z-30 hidden md:flex gap-4 items-start bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300 w-[260px] lg:w-[350px] cursor-pointer">
            <div className="w-20 h-30 shrink-0 rounded-xl overflow-hidden relative border border-slate-100">
              <Image src={prefix("/workspace-cabin.png")} alt="Private Cabins" fill className="object-cover" sizes="72px" />
            </div>
            <div className="flex-1">
              <h4 className="text-md font-extrabold tracking-[0.1em] text-slate-800 uppercase mb-1.5">Private Cabins</h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-2.5">
                Access soundproof, enterprise-ready private office suites that help you and your team achieve more.
              </p>
              {/* <a href={prefix("/private-office-space")} className="text-[11px] font-bold text-slate-900 underline underline-offset-2 hover:text-[#f37021] transition-colors">See full list</a> */}
            </div>
          </div>

        </div>

        {/* ── Mobile card stack (visible only on small screens) ── */}
        <div className="md:hidden flex flex-col gap-4 px-4 pb-12 pt-8">
          {[
            { title: "Coworking Spaces", img: "/workspace-lounge.png", desc: "Flexible hot desks and dedicated workstations for focus and collaboration.", href: "/#services-dark" },
            { title: "Meeting Rooms", img: "/workspace-meeting.png", desc: "Fully-equipped boardrooms for team sessions and client meetings.", href: "/#services-dark" },
            { title: "Private Cabins", img: "/workspace-cabin.png", desc: "Soundproof private office suites for deep focus and confidentiality.", href: "/private-office-space" },
          ].map((card) => (
            <div key={card.title} className="flex gap-4 items-start bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
              <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden relative border border-slate-100">
                <Image src={prefix(card.img)} alt={card.title} fill className="object-cover" sizes="64px" />
              </div>
              <div>
                <h4 className="text-[10px] font-black tracking-[0.18em] text-slate-800 uppercase mb-1.5">{card.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-2">{card.desc}</p>
                <a href={prefix(card.href)} className="text-[11px] font-bold text-slate-900 underline underline-offset-2">See full list</a>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Why Choose CovaiTech (Bento Grid) */}
      <section className="py-24 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="w-4 h-4 rounded-full bg-brand-orange inline-block mb-4"></span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-slate-900 tracking-tight">
              Leading the Way in<br/> Workspace Supply
            </h2>
            <p className="mt-4 text-slate-600">Explore the key reasons businesses choose us as their workspace partner.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[200px] sm:auto-rows-[250px]">
            {/* Stat Card 1 */}
            <div className="col-span-1 md:col-span-4 row-span-1 bg-[#faf9f6] rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between shadow-sm border border-slate-100 group transition-transform duration-500 hover:-translate-y-2">
              <p className="text-slate-600 font-medium leading-relaxed text-sm sm:text-base">
                Our unwavering quality ensures you receive top-tier amenities, always meeting your standards.
              </p>
              <div>
                <h3 className="text-4xl font-black text-brand-navy">99.8%</h3>
                <p className="text-lg font-bold text-brand-navy">Client Satisfaction</p>
              </div>
            </div>

            {/* Tall Image Card */}
            <div className="col-span-1 md:col-span-4 row-span-2 relative rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group transition-transform duration-500 hover:-translate-y-2">
              <Image src={prefix("/workspace-cabin.png")} alt="Premium Support" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-3xl font-black text-white mb-2">24/7</h3>
                <p className="text-lg font-bold text-white mb-4">Access & Support</p>
                <p className="text-white/80 text-sm font-medium">You can rely on us to keep your operations running smoothly without delays.</p>
              </div>
            </div>

            {/* Wide Image Card */}
            <div className="col-span-1 md:col-span-4 row-span-1 relative rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group transition-transform duration-500 hover:-translate-y-2">
              <Image src={prefix("/workspace-lounge.png")} alt="Lounge Area" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>

            {/* Image Card Bottom Left */}
            <div className="col-span-1 md:col-span-4 row-span-1 relative rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group transition-transform duration-500 hover:-translate-y-2">
              <Image src={prefix("/workspace-hotdesk.png")} alt="Hotdesk Zone" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>

            {/* Stat Card 2 */}
            <div className="col-span-1 md:col-span-4 row-span-1 bg-brand-navy rounded-[2rem] p-8 sm:p-10 flex flex-col justify-end shadow-sm border border-slate-800 group transition-transform duration-500 hover:-translate-y-2">
              <h3 className="text-4xl font-black text-white">300+</h3>
              <p className="text-lg font-bold text-white mb-4">Active Members</p>
              <p className="text-white/80 font-medium text-sm sm:text-base">
                Join countless satisfied businesses who've relied on our consistent, expert support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
