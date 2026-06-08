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

      <FloatingNav sections={[
        { id: "hero", label: "Hero" },
        { id: "who-we-are", label: "Who We Are" },
        { id: "our-story", label: "Our Story" },
        { id: "feeling", label: "The Feeling" },
        { id: "vision", label: "Vision" }
      ]} />

      {/* Hero Section (ZenMind Reference Style) */}
      <section 
        id="hero"
        className="relative min-h-[100vh] flex flex-col justify-center items-center text-center pt-32 pb-24 lg:pb-32 overflow-hidden bg-[#0a0a0a]"
      >
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
            alt="Dark Workspace"
            fill
            className="object-cover opacity-30 object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6 px-4">
          
          {/* Trust Badge */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full border border-[#0a0a0a] overflow-hidden relative"><Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" fill className="object-cover" /></div>
              <div className="w-6 h-6 rounded-full border border-[#0a0a0a] overflow-hidden relative"><Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="User" fill className="object-cover" /></div>
              <div className="w-6 h-6 rounded-full border border-[#0a0a0a] overflow-hidden relative"><Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" fill className="object-cover" /></div>
              <div className="w-6 h-6 rounded-full border border-[#0a0a0a] overflow-hidden relative"><Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" fill className="object-cover" /></div>
            </div>
            <div className="flex flex-col items-start text-left">
              <div className="flex gap-1 text-[#fbbf24] text-[10px]">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <span className="text-[9px] text-white/50 font-medium tracking-wide">Trusted by 2,000+ teams</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-white leading-[1.05] font-sans font-medium">
            Your business is <span className="font-serif italic font-normal text-white/90">unique.</span><br />
            A workspace that listens.
          </h1>

          {/* Subheading */}
          <p className="text-white/40 text-sm sm:text-base md:text-lg max-w-lg mx-auto leading-relaxed mt-4 font-light tracking-wide">
            CovaiTech uses premium amenities to personalize every experience—so you get exactly what you need, when you need it.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <button className="px-8 py-4 bg-white text-black font-semibold text-sm rounded-[2rem] hover:scale-105 transition-transform duration-300">
              Book a free tour
            </button>
          </div>

        </div>

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

      {/* Vision & Mission (Central Hub Layout) */}
      <section id="vision" className="py-32 bg-[#faf9f6] w-full mt-12 sm:mt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-slate-900 tracking-tight">
              Symbolizing Innovation<br/> and Reliability
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left Points: Vision */}
            <div className="space-y-8 order-2 lg:order-1 text-center lg:text-right">
              <div>
                <h4 className="text-lg font-bold text-slate-900 flex items-center justify-center lg:justify-end gap-3">
                  Sustainable Communities <span className="w-3 h-3 rounded-full bg-brand-orange"></span>
                </h4>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 flex items-center justify-center lg:justify-end gap-3">
                  Modern Infrastructure <span className="w-3 h-3 rounded-full bg-brand-orange"></span>
                </h4>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 flex items-center justify-center lg:justify-end gap-3">
                  South India's Leader <span className="w-3 h-3 rounded-full bg-brand-orange"></span>
                </h4>
              </div>
            </div>

            {/* Central Image */}
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image src={prefix("/workspace-meeting.png")} alt="Vision and Mission" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
              </div>
            </div>

            {/* Right Points: Mission */}
            <div className="space-y-8 order-3 text-center lg:text-left">
              <div>
                <h4 className="text-lg font-bold text-slate-900 flex items-center justify-center lg:justify-start gap-3">
                  <span className="w-3 h-3 rounded-full bg-brand-navy"></span> Absolute Integrity
                </h4>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 flex items-center justify-center lg:justify-start gap-3">
                  <span className="w-3 h-3 rounded-full bg-brand-navy"></span> Operational Excellence
                </h4>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 flex items-center justify-center lg:justify-start gap-3">
                  <span className="w-3 h-3 rounded-full bg-brand-navy"></span> Unmatched Hospitality
                </h4>
              </div>
            </div>
          </div>
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
