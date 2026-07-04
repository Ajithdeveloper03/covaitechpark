"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSettings } from "../hooks/useSettings";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

export default function ContactPage() {
  const { settings } = useSettings();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("+91");
  const [phoneFlag, setPhoneFlag] = useState("🇮🇳");
  const [showFlags, setShowFlags] = useState(false);
  const [requirement, setRequirement] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedMap, setSelectedMap] = useState<"coimbatore" | "trichy">("coimbatore");
  const [botField, setBotField] = useState("");

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName && email && phone) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: `${firstName} ${lastName}`,
            email: email,
            phone: `${phoneCode} ${phone}`,
            company: "",
            message: `Requirement: ${requirement}`,
            source: "contact_page",
            bot_field: botField
          }),
        });

        if (response.ok) {
          setSuccess(true);
          setTimeout(() => {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setRequirement("");
            setSuccess(false);
          }, 3000);
        }
      } catch (error) {
        console.error("Contact form error", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans relative select-none antialiased">
      <Header />

      <section id="hero" className="relative min-h-[45vh] sm:min-h-[55vh] md:min-h-[60vh] flex items-center pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden bg-brand-navy">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={prefix("/workspace-meeting.png")}
            alt="Contact Background"
            fill
            className="object-cover opacity-30 object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060d17] via-[#060d17]/80 to-transparent" />
        </div>

        {/* Powerful Glassy Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d17]/80 via-[#060d17]/60 to-[#f37021]/10 z-0"></div>
        <div className="absolute top-0 right-0 w-[80%] h-[80%] rounded-full bg-[#f37021]/20 blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-full bg-sky-500/15 blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[2px] border-b border-white/10 pointer-events-none z-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center gap-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-medium tracking-tight text-white flex items-center justify-center gap-2">
            Contact Us <span className="text-[#f37021] text-3xl animate-pulse mt-2">*</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-md font-normal leading-relaxed mx-auto">
            Premium managed workspaces and bespoke private cabins at the intersection of productivity, design and technology.
          </p>
          <div className="mt-8 text-[10px] sm:text-xs font-bold text-slate-400 tracking-widest flex items-center justify-center gap-4">
            <span>Home</span> <span className="text-[#f37021] font-bold">|</span> <span>Contact Us</span>
          </div>
        </div>
      </section>

      {/* Elegant Contact Portal Section */}
      <section id="contact-portal" className="py-12 sm:py-16 md:py-24 bg-[#faf9f6] w-full relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#f37021]/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-[#f37021]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* COLUMN 1: Form layout exactly as requested by user's screenshot */}
            <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] p-5 sm:p-8 md:p-12 shadow-xl shadow-slate-200/40 relative overflow-hidden transition-all duration-500">
              
              {success ? (
                <div className="py-16 text-center text-emerald-600 font-bold bg-emerald-50 rounded-3xl animate-fadeIn">
                  <svg className="w-16 h-16 text-emerald-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Message sent successfully!<br />
                  <span className="text-sm text-slate-500 font-normal mt-1 block">Our representative will call you shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <input
                    type="text"
                    name="bot_field"
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                    className="hidden"
                    style={{ display: "none" }}
                    autoComplete="off"
                  />
                  {/* Name field split into First/Last */}
                  <div className="space-y-2">
                    <label className="text-base font-normal text-slate-900 tracking-wide font-sans">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-base text-slate-800 focus:outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021] transition-all duration-300 shadow-sm"
                        />
                        <span className="text-xs text-slate-400 mt-1.5 block font-light">First</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-base text-slate-800 focus:outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021] transition-all duration-300 shadow-sm"
                        />
                        <span className="text-xs text-slate-400 mt-1.5 block font-light">Last</span>
                      </div>
                    </div>
                  </div>

                  {/* Phone field with custom flag selector */}
                  <div className="space-y-2">
                    <label className="text-base font-normal text-slate-900 tracking-wide font-sans">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="flex rounded-lg border border-slate-200 overflow-visible bg-white focus-within:border-[#f37021] focus-within:ring-1 focus-within:ring-[#f37021] transition-all duration-300 relative shadow-sm">
                      <div className="relative flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowFlags(!showFlags)}
                          className="flex items-center gap-1.5 px-4 py-3.5 text-slate-700 bg-slate-50 border-r border-slate-200 rounded-l-lg hover:bg-slate-100 transition-colors focus:outline-none"
                        >
                          <span className="text-xl leading-none">{phoneFlag}</span>
                          <span className="text-sm font-medium text-slate-700">{phoneCode}</span>
                          <span className="text-[8px] text-slate-400 ml-0.5">▼</span>
                        </button>
                        
                        {showFlags && (
                          <div className="absolute top-full left-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1 max-h-60 overflow-y-auto">
                            {[
                              { code: "+91", flag: "🇮🇳", name: "India" },
                              { code: "+1", flag: "🇺🇸", name: "United States" },
                              { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
                              { code: "+65", flag: "🇸🇬", name: "Singapore" },
                              { code: "+971", flag: "🇦🇪", name: "UAE" },
                            ].map((item) => (
                              <button
                                key={item.code}
                                type="button"
                                onClick={() => {
                                  setPhoneCode(item.code);
                                  setPhoneFlag(item.flag);
                                  setShowFlags(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                              >
                                <span className="text-lg leading-none">{item.flag}</span>
                                <span className="font-semibold">{item.code}</span>
                                <span className="text-xs text-slate-400 ml-auto">{item.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 px-4 py-3.5 text-base text-slate-800 bg-transparent focus:outline-none rounded-r-lg"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-base font-normal text-slate-900 tracking-wide font-sans">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-base text-slate-800 focus:outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021] transition-all duration-300 shadow-sm"
                    />
                  </div>

                  {/* What are you looking for dropdown */}
                  <div className="space-y-2">
                    <label className="text-base font-normal text-slate-900 tracking-wide font-sans">
                      What are you looking for?
                    </label>
                    <div className="relative">
                      <select
                        value={requirement}
                        onChange={(e) => setRequirement(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-base text-slate-800 focus:outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021] transition-all duration-300 appearance-none cursor-pointer shadow-sm pr-10"
                      >
                        <option value="">-Select-</option>
                        <option value="Private Cabins">Private Cabins</option>
                        <option value="Hot Desk">Hot Desk</option>
                        <option value="Dedicated Desk">Dedicated Desk</option>
                        <option value="Meeting & Boardrooms">Meeting & Boardrooms</option>
                        <option value="Custom Enterprise Suite">Custom Enterprise Suite</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <svg className="fill-current h-4.5 w-4.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#f37021] hover:bg-[#e06216] text-white font-bold text-base rounded-md transition-all duration-300 cursor-pointer text-center select-none"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* COLUMN 2: Elegant Text-based Office Contacts */}
            <div className="lg:col-span-5 space-y-6 pl-0 lg:pl-6">
              
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#f37021] uppercase tracking-[0.25em] block">LOCATE AN OFFICE</span>
                <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight leading-tight">
                  Premium Workspaces at prime hubs.
                </h2>
              </div>

              {/* Coimbatore contact details */}
              <div className="border-l-2 border-[#f37021]/50 pl-6 py-1 space-y-2">
                <span className="px-2.5 py-0.5 bg-[#f37021]/10 text-[#f37021] rounded-full text-[10px] font-bold tracking-wider inline-block">Coimbatore Headquarters</span>
                <h3 className="text-xl font-bold text-slate-900">CovaiTech Park HQ</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {settings.coimbatore_address}
                </p>
                <div className="pt-1.5 space-y-0.5 text-xs sm:text-sm font-medium text-slate-700">
                  <p><span className="text-[#f37021] font-bold">P:</span> {settings.coimbatore_phone_display}</p>
                  <p><span className="text-[#f37021] font-bold">E:</span> {settings.email}</p>
                </div>
              </div>

              {/* Trichy contact details */}
              <div className="border-l-2 border-[#f37021]/50 pl-6 py-1 space-y-2">
                <span className="px-2.5 py-0.5 bg-[#f37021]/10 text-[#f37021] rounded-full text-[10px] font-bold tracking-wider inline-block">Branch Office</span>
                <h3 className="text-xl font-bold text-slate-900">Trichy Center</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {settings.trichy_address}
                </p>
                <div className="pt-1.5 space-y-0.5 text-xs sm:text-sm font-medium text-slate-700">
                  <p><span className="text-[#f37021] font-bold">P:</span> {settings.trichy_phone_display}</p>
                  <p><span className="text-[#f37021] font-bold">E:</span> {settings.email}</p>
                </div>
              </div>

              {/* Social Media Links Block */}
              <div className="pt-2 border-t border-slate-200/60 space-y-4">
               
                <div className="flex gap-4">
                  {[
                    { label: "Facebook", link: settings.facebook_url, path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" },
                    { label: "LinkedIn", link: settings.linkedin_url, path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
                    { label: "Instagram", link: settings.instagram_url, path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" }
                  ].map(({ label, link, path }) => (
                    <a
                      key={label}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-[#f37021] hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer text-slate-500"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d={path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Separate, Full-width Interactive Map Section */}
      <section id="ecosystem-map" className="w-full bg-slate-900 flex flex-col items-center relative z-20 border-t border-slate-800">
        
        {/* Toggle controls header container */}
        <div className="w-full bg-slate-950 py-6 sm:py-10 border-b border-slate-800 px-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-[#f37021] uppercase tracking-[0.2em] block mb-1">INTERACTIVE ECOSYSTEM MAP</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-sans font-bold text-white tracking-tight">Explore Our Locations</h2>
            </div>
            
            <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl shadow-lg shrink-0">
              <button
                type="button"
                onClick={() => setSelectedMap("coimbatore")}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer ${
                  selectedMap === "coimbatore" 
                    ? "bg-[#f37021] text-white shadow-md shadow-[#f37021]/10" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Coimbatore HQ
              </button>
              <button
                type="button"
                onClick={() => setSelectedMap("trichy")}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer ${
                  selectedMap === "trichy" 
                    ? "bg-[#f37021] text-white shadow-md shadow-[#f37021]/10" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Trichy Center
              </button>
            </div>
          </div>
        </div>

        {/* Map view container with overlay */}
        <div className="w-full h-[350px] sm:h-[450px] md:h-[550px] relative overflow-hidden bg-slate-950 flex">
          
          {selectedMap === "coimbatore" ? (
            <iframe 
              src={settings.coimbatore_map_embed} 
              width="100%" 
              height="100%" 
              style={{ border: 0,  }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <iframe 
              src={settings.trichy_map_embed} 
              width="100%" 
              height="100%" 
              style={{ border: 0,  }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
          )}

          {/* Floating glassmorphic location info panel */}
          <div className="absolute bottom-4 left-3 right-3 sm:right-auto sm:bottom-8 sm:left-12 bg-slate-950/90 backdrop-blur-md text-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-sm border border-white/10 z-20 transition-all duration-500 hover:border-[#f37021]/30">
            {selectedMap === "coimbatore" ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-bold text-[#f37021] uppercase tracking-[0.2em] block mb-1">MAIN HEADQUARTERS</span>
                  <h3 className="text-xl font-bold font-sans">CovaiTech Park HQ</h3>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {settings.coimbatore_address}
                </p>
                <div className="text-xs text-slate-400 space-y-1">
                  <p>Hours: Mon - Sat, 9:00 AM - 7:00 PM</p>
                  <p>Keycard Access: 24/7 for Members</p>
                </div>
                <div className="pt-2">
                  <a 
                    href={settings.coimbatore_map_link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#f37021] uppercase tracking-wider hover:text-white transition-colors"
                  >
                    Open Google Maps &rarr;
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-bold text-[#f37021] uppercase tracking-[0.2em] block mb-1">TRICHY BRANCH</span>
                  <h3 className="text-xl font-bold font-sans">Trichy Center</h3>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {settings.trichy_address}
                </p>
                <div className="text-xs text-slate-400 space-y-1">
                  <p>Hours: Mon - Sat, 9:00 AM - 7:00 PM</p>
                  <p>Keycard Access: 24/7 for Members</p>
                </div>
                <div className="pt-2">
                  <a 
                    href={settings.trichy_map_link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#f37021] uppercase tracking-wider hover:text-white transition-colors"
                  >
                    Open Google Maps &rarr;
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>

      </section>

      <Footer />
    </div>
  );
}
