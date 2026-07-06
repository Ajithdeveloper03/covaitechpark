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
  

  // Booking Modal States
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingFirstName, setBookingFirstName] = useState("");
  const [bookingLastName, setBookingLastName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingPhoneCode, setBookingPhoneCode] = useState("+91");
  const [bookingLookingFor, setBookingLookingFor] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [botField, setBotField] = useState("");

  const handleOpenBooking = (plan: string) => {
    setBookingLookingFor(plan);
    setBookingOpen(true);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
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
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-brand-navy flex flex-col font-inter relative select-none font-medium text-base antialiased">
      <Header />


      {/* ── 1. NEW DARK HERO SECTION (Formerly Info Section) ── */}
      <section id="highlights" className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 w-full px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
        
        {/* Glow effect background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-orange/20 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] rounded-full bg-brand-orange/10 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-12">
          <div className="w-full lg:w-1/2 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/20 text-brand-orange rounded-full text-xs font-bold tracking-widest border border-brand-orange/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              A Unit of Max Office
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-outfit font-bold text-white tracking-tight leading-[1.1]">
              Trichy Coworks <br />
              <span className="text-3xl sm:text-4xl text-slate-300 font-medium">(Unit of Max Office) - Locations</span>
            </h1>
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Conveniently located in the heart of Trichy, <strong className="text-white">Trichy Coworks</strong> offers modern and flexible workspaces with excellent connectivity to key commercial areas and essential amenities. Designed for startups, professionals, and growing businesses, our locations provide a productive and collaborative work environment.
              </p>
              <p>
                Covai Tech Park and Trichy Coworks are trade names of <strong className="text-white">MAX OFFICE</strong>. Established in 2017, Trichy Coworks pioneered the concept of shared office spaces in Trichy, becoming the city&apos;s first coworking space provider.
              </p>
            </div>
            <div className="pt-6">
              <a href="https://trichycoworks.com/locations/?utm_source=ctp_website&utm_medium=navigation&utm_campaign=nav_bar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange hover:bg-white hover:text-brand-navy text-white font-medium text-sm tracking-widest rounded-full transition-all shadow-lg shadow-brand-orange/20" >
                Explore Trichy Location <span className="text-lg leading-none">&rarr;</span>
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[4/3] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl shadow-black/50 border border-slate-700/50">
              <Image src={prefix("/hero3.jpg")} alt="Trichy Coworks Facility" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>
 {/* ── 4. SHORTER CTA SECTION ── */}
      <section className="relative py-16 bg-gradient-to-br from-brand-navy via-[#1e293b] to-black text-white text-center overflow-hidden">
        {/* Lightened glowing orb 1 */}
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[100%] rounded-full bg-gradient-to-br from-brand-orange/40 to-transparent blur-[100px] pointer-events-none" />
        {/* Lightened glowing orb 2 */}
        <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[100%] rounded-full bg-gradient-to-tl from-brand-orange/30 to-transparent blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-outfit font-bold mb-0 md:w-1/2">Need help with finding the right workspace solution?</h2>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:w-1/2">
            <button onClick={() => handleOpenBooking("General Tour")} className="px-8 py-4 bg-brand-orange hover:bg-white hover:text-brand-navy text-white font-medium text-sm tracking-widest rounded-full transition-all shadow-lg whitespace-nowrap">Book a Tour Today</button>
          </div>
        </div>
      </section>
      {/* ── 3. EXPLORE OTHER LOCATIONS ── */}
      <section className="py-10 sm:py-20 md:py-28 bg-slate-50 section-x w-full border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-medium text-brand-orange tracking-widest block">
              ADDITIONAL LOCATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-medium tracking-tight leading-[1.1] text-slate-900">Need help with finding the right workspace solution?</h2>
          </div>

          <div className="flex flex-wrap gap-8 max-w-6xl mx-auto justify-center">
            {[
              { name: "Coimbatore Hub", desc: "Premium Workspaces in Well-Connected Hubs across Coimbatore.", link: prefix("/coimbatore"), img: "/covaitechpark/coimbatore.jpg" }
            ].map((sol, idx) => (
              <a href={sol.link} key={idx} className="group w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgb(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgb(0,0,0,0.12)] transition-all duration-400 flex flex-col cursor-pointer border border-slate-100 hover:border-brand-orange/20 hover:-translate-y-1">
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image src={sol.img} alt={sol.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <h4 className="font-outfit font-bold text-[17px] text-brand-navy group-hover:text-brand-orange transition-colors duration-300 leading-tight">
                    {sol.name}
                  </h4>
                  
                  <div className="pt-2 flex items-center gap-1.5 text-brand-orange text-[11px] font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-300">
                    Learn More <span>&rarr;</span>
                  </div>
                </div>
              </a>
            ))}
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
                alt="Covai Tech Park Premium Workspace"
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
                  <button type="submit" className="w-full py-4 bg-[#091b29] text-white text-sm font-medium tracking-widest rounded-xl hover:bg-brand-orange transition-all duration-300 shadow cursor-pointer mt-4" >
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