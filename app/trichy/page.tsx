"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { contactInfo } from "../config/contactInfo";
import { useSettings } from "../hooks/useSettings";
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

export default function TrichyPage() {
  const { settings } = useSettings();

  // Set page meta title for SEO
  useEffect(() => {
    document.title = "Book a Shared Office For Rent in Trichy | Coworking Space";
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
  const [botField, setBotField] = useState("");

  const handleOpenBooking = (plan: string) => {
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
            message: `Booking Inquiry for: ${bookingLookingFor} (Trichy Branch)`,
            source: "popup",
            bot_field: botField
          }),
        });

        if (response.ok) {
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
      } catch (error) {
        console.error("Booking form error", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-brand-navy flex flex-col font-inter relative select-none font-medium text-base antialiased">
      <Header />

      {/* ── 1. HERO SECTION ── */}
      <section id="hero" className="relative min-h-[100vh] w-full flex flex-col items-center justify-start pt-16 sm:pt-24 md:pt-28 pb-30 overflow-hidden text-white">
        
        {/* Full bleed background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/covaitechpark/coimbatore.png"
            alt="Trichy coworking space"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        {/* Centered Hero Content */}
        <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-6xl mt-8 mx-auto w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-outfit font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ff9853] leading-[1.05] mb-4">
            CovaiTech Park - Trichy Center
          </h1>
          <p className="text-slate-200 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-3xl mb-6 flex items-start justify-center gap-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-center">2nd Floor, Old No. C-63, New No. C-50, Bloom Plaza, 6th Cross North East Extension, Near to Isha Yoga Center, Thillai Nagar, Tiruchirappalli, Tamil Nadu, 620018</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2 hidden">
            <button
              onClick={() => handleOpenBooking("Trichy Tour")}
              className="px-8 py-4 bg-brand-orange hover:bg-white hover:text-brand-navy text-white font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg cursor-pointer"
            >
              Schedule Visit
            </button>
            <a
              href="https://maps.google.com/?q=Bloom+Plaza+Trichy"
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
                  <Image src={card.img} alt="CovaiTech Park Trichy Workspace Highlight" fill sizes="156px" className="object-cover" loading="lazy" />
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
                <Image src={card.img} alt="CovaiTech Park Trichy Workspace Highlight" fill sizes="112px" className="object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── 2. TRICHY COWORKS INFO ── */}
      <section id="highlights" className="py-16 sm:py-24 bg-white w-full px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              A Unit of Max Office
            </span>
            <h2 className="text-4xl sm:text-5xl font-outfit font-bold text-brand-navy tracking-tight leading-none">
              Comprehensive Workspace Solutions in Tiruchirappalli
            </h2>
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                We provide comprehensive workspace solutions in Tiruchirappalli under our division <strong>Trichy Coworks (A unit of Max Office)</strong>. Our facilities offer fully furnished IT workspaces with modern infrastructure tailored for startups, tech teams, and remote professionals.
              </p>
              <p>
                Equipped with high-speed internet, ergonomic seating, and essential amenities, we ensure a seamless and productive work environment. Whether you need hot desks, dedicated seats, or private office cabins, we provide flexible options to suit your business needs.
              </p>
            </div>
            <div className="pt-4">
              <a href="https://trichycoworks.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange hover:bg-[#e0661e] text-white font-medium text-sm uppercase tracking-widest rounded-full transition-all shadow-lg">
                Visit Trichy Coworks <span className="text-lg leading-none">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
              <Image src={prefix("/hero3.jpg")} alt="Trichy Coworks Facility" fill className="object-cover" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>
      </section>
 {/* ── 4. SHORTER CTA SECTION ── */}
      <section className="py-16 bg-brand-navy text-white text-center">
        <h2 className="text-3xl font-outfit font-bold mb-4">Ready to upgrade your workspace?</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">Join hundreds of growing businesses across our network.</p>
        <button onClick={() => handleOpenBooking("General Tour")} className="px-8 py-4 bg-brand-orange hover:bg-white hover:text-brand-navy text-white font-medium text-sm uppercase tracking-widest rounded-full transition-all shadow-lg">Book a Tour Today</button>
      </section>
      {/* ── 3. EXPLORE SERVICES ── */}
      <section id="explore-services" className="py-12 sm:py-24 bg-slate-100 w-full relative overflow-hidden border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-bold tracking-tight text-brand-navy leading-none">
              Explore Our Workspace Services
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-normal">
              Tailored solutions for freelancers, startups, and enterprise teams.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <a href={prefix("/coworking-space")} className="group bg-white rounded-[1.5rem] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col border border-slate-100 hover:-translate-y-1">
              <div className="relative h-40 w-full overflow-hidden p-2 pb-0">
                <div className="relative w-full h-full rounded-t-xl rounded-b-sm overflow-hidden shadow-sm">
                  <Image src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=400&q=80" alt="Coworking Space" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-brand-navy/5 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1 text-center">
                <h4 className="font-outfit font-bold text-lg text-brand-navy group-hover:text-brand-orange transition-colors mb-2">Coworking Space</h4>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">Flexible, dynamic shared spaces perfect for networking and productivity.</p>
              </div>
            </a>
            <a href={prefix("/private-office-space")} className="group bg-white rounded-[1.5rem] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col border border-slate-100 hover:-translate-y-1">
              <div className="relative h-40 w-full overflow-hidden p-2 pb-0">
                <div className="relative w-full h-full rounded-t-xl rounded-b-sm overflow-hidden shadow-sm">
                  <Image src="https://images.pexels.com/photos/386150/pexels-photo-386150.jpeg" alt="Private Office" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-brand-navy/5 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1 text-center">
                <h4 className="font-outfit font-bold text-lg text-brand-navy group-hover:text-brand-orange transition-colors mb-2">Private Office</h4>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">Secure, dedicated cabins designed for teams of all sizes.</p>
              </div>
            </a>
            <a href={prefix("/managed-office-space")} className="group bg-white rounded-[1.5rem] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col border border-slate-100 hover:-translate-y-1">
              <div className="relative h-40 w-full overflow-hidden p-2 pb-0">
                <div className="relative w-full h-full rounded-t-xl rounded-b-sm overflow-hidden shadow-sm">
                  <Image src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80" alt="Managed Office" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-brand-navy/5 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1 text-center">
                <h4 className="font-outfit font-bold text-lg text-brand-navy group-hover:text-brand-orange transition-colors mb-2">Managed Office</h4>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">End-to-end custom workspace solutions built for enterprise needs.</p>
              </div>
            </a>
            <a href={prefix("/meeting-rooms")} className="group bg-white rounded-[1.5rem] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col border border-slate-100 hover:-translate-y-1">
              <div className="relative h-40 w-full overflow-hidden p-2 pb-0">
                <div className="relative w-full h-full rounded-t-xl rounded-b-sm overflow-hidden shadow-sm">
                  <Image src="https://images.pexels.com/photos/20101490/pexels-photo-20101490.jpeg" alt="Meeting Rooms" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-brand-navy/5 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1 text-center">
                <h4 className="font-outfit font-bold text-lg text-brand-navy group-hover:text-brand-orange transition-colors mb-2">Meeting Rooms</h4>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">High-tech conference spaces for interviews, pitches, and training.</p>
              </div>
            </a>
            <a href={prefix("/virtual-office-space")} className="group bg-white rounded-[1.5rem] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col border border-slate-100 hover:-translate-y-1">
              <div className="relative h-40 w-full overflow-hidden p-2 pb-0">
                <div className="relative w-full h-full rounded-t-xl rounded-b-sm overflow-hidden shadow-sm">
                  <Image src="https://images.pexels.com/photos/36713181/pexels-photo-36713181.jpeg" alt="Virtual Office" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-brand-navy/5 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1 text-center">
                <h4 className="font-outfit font-bold text-lg text-brand-navy group-hover:text-brand-orange transition-colors mb-2">Virtual Office</h4>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">Professional business address and mail handling services.</p>
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
                          value={bookingFirstName}
                          onChange={(e) => setBookingFirstName(e.target.value)}
                          className="w-full bg-white border border-brand-navy/15 rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-medium shadow-sm"
                        />
                        <span className="text-[10px] text-slate-400 font-medium mt-1 block">First</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          value={bookingLastName}
                          onChange={(e) => setBookingLastName(e.target.value)}
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
                      <option value="Trichy Tour">Trichy Tour</option>
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