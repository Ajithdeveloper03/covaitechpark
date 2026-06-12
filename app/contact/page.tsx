"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

export default function ContactPage() {
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

  useEffect(() => {
    document.title = "Contact Us | Premium Office Spaces & Ecosystem - CovaiTech Park";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName && email && phone) {
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
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans relative select-none antialiased">
      <Header />

      <section className="relative min-h-[45vh] sm:min-h-[55vh] md:min-h-[60vh] flex items-center pt-24 sm:pt-32 pb-12 sm:pb-16 section-x overflow-hidden bg-brand-navy">
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
        
        <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center text-center gap-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-medium tracking-tight text-white flex items-center justify-center gap-2">
            Contact Us <span className="text-[#f37021] text-3xl animate-pulse mt-2">*</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-md font-normal leading-relaxed mx-auto">
            Premium managed workspaces and bespoke private cabins at the intersection of productivity, design and technology.
          </p>
          <div className="mt-8 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-4">
            <span>Home</span> <span className="text-[#f37021] font-bold">|</span> <span>Contact Us</span>
          </div>
        </div>
      </section>

      {/* Elegant Contact Portal Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#faf9f6] w-full relative overflow-hidden">
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
            <div className="lg:col-span-5 space-y-12 pl-0 lg:pl-6">
              
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#f37021] uppercase tracking-[0.25em] block">LOCATE AN OFFICE</span>
                <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight leading-tight">
                  Premium Workspaces at prime hubs.
                </h2>
                {/* <p className="text-slate-500 text-sm leading-relaxed">
                  Experience a curated network of workspaces designed for tech innovators, teams, and growing enterprises in Tamil Nadu.
                </p> */}
              </div>

              {/* Coimbatore contact details */}
              <div className="border-l-2 border-[#f37021]/50 pl-6 py-1 space-y-2">
                <span className="px-2.5 py-0.5 bg-[#f37021]/10 text-[#f37021] rounded-full text-[10px] font-black uppercase tracking-wider inline-block">Coimbatore Headquarters</span>
                <h3 className="text-xl font-bold text-slate-900">CovaiTech Park HQ</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Covai Tech Park, 4th South Cross St, Kovai Thirunagar, Nehru Nagar East, Coimbatore - 641 014.
                </p>
                <div className="pt-1.5 space-y-0.5 text-xs sm:text-sm font-medium text-slate-700">
                  <p><span className="text-[#f37021] font-bold">P:</span> +91 93607 80768</p>
                  <p><span className="text-[#f37021] font-bold">E:</span> info@covaitechpark.com</p>
                </div>
              </div>

              {/* Trichy contact details */}
              <div className="border-l-2 border-[#f37021]/50 pl-6 py-1 space-y-2">
                <span className="px-2.5 py-0.5 bg-[#f37021]/10 text-[#f37021] rounded-full text-[10px] font-black uppercase tracking-wider inline-block">Branch Office</span>
                <h3 className="text-xl font-bold text-slate-900">Trichy Center</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  2nd Floor, Old No. C-63, New No. C-50, Bloom Plaza, 6th Cross North East Extension, Near to Isha Yoga Center, Thillai Nagar, Tiruchirappalli, Tamil Nadu, 620018
                </p>
                <div className="pt-1.5 space-y-0.5 text-xs sm:text-sm font-medium text-slate-700">
                  <p><span className="text-[#f37021] font-bold">P:</span> +91 96889 92210</p>
                  <p><span className="text-[#f37021] font-bold">E:</span> info@covaitechpark.com</p>
                </div>
              </div>

              {/* Direct Booking CTA */}
             

            </div>

          </div>
        </div>
      </section>

      {/* Separate, Full-width Interactive Map Section */}
      <section className="w-full bg-slate-900 flex flex-col items-center relative z-20 border-t border-slate-800">
        
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.143641267597!2d77.031952!3d11.027815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857a2bd66f649%3A0xc48c0827ea8061e8!2sCovai%20Tech%20Park!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9172089270634!2d78.6881744!3d10.8176587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf50ad5c0a373%3A0x63cd735d4fa36829!2sBloom%20Plaza!5e0!3m2!1sen!2sin!4v1718100000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0,  }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
          )}

          {/* Glowing gradient overlay at edges to blend maps */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-transparent to-slate-950/20 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" /> */}

          {/* Floating glassmorphic location info panel */}
          <div className="absolute bottom-4 left-3 right-3 sm:right-auto sm:bottom-8 sm:left-12 bg-slate-950/90 backdrop-blur-md text-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-sm border border-white/10 z-20 transition-all duration-500 hover:border-[#f37021]/30">
            {selectedMap === "coimbatore" ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-bold text-[#f37021] uppercase tracking-[0.2em] block mb-1">MAIN HEADQUARTERS</span>
                  <h3 className="text-xl font-bold font-sans">CovaiTech Park HQ</h3>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Covai Tech Park, 4th South Cross St, Kovai Thirunagar, Nehru Nagar East, Coimbatore - 641 014.
                </p>
                <div className="text-xs text-slate-400 space-y-1">
                  <p>Hours: Mon - Sat, 9:00 AM - 7:00 PM</p>
                  <p>Keycard Access: 24/7 for Members</p>
                </div>
                <div className="pt-2">
                  <a 
                    href="https://maps.app.goo.gl/T4HnE2Wn8nSjLptN8" 
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
                  2nd Floor, Old No. C-63, New No. C-50, Bloom Plaza, 6th Cross North East Extension, Near to Isha Yoga Center, Thillai Nagar, Tiruchirappalli, Tamil Nadu, 620018
                </p>
                <div className="text-xs text-slate-400 space-y-1">
                  <p>Hours: Mon - Sat, 9:00 AM - 7:00 PM</p>
                  <p>Keycard Access: 24/7 for Members</p>
                </div>
                <div className="pt-2">
                  <a 
                    href="https://maps.google.com/?q=Bloom+Plaza+Trichy" 
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
