"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Contact Us | Premium Office Spaces & Ecosystem - CovaiTech Park";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && email && phone) {
      setSuccess(true);
      setTimeout(() => {
        setFirstName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setSuccess(false);
      }, 3000);
    }
  };



  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans relative select-none antialiased">
      <Header />

      <section className="relative min-h-[60vh] flex items-center pt-32 pb-16 section-x overflow-hidden bg-brand-navy">
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
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-sans font-medium tracking-tight text-white flex items-center justify-center gap-2">
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

      {/* Form & Info Section */}
      <section className="py-24 bg-white section-x w-full">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
              LOOKING FOR A WORKSPACE?
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-medium text-slate-900 leading-[1.15]">
              If your team needs to <br className="hidden sm:block" /> feel some love,
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-normal">
              Get in Touch to see what we can do...
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Form */}
            <div className="bg-white p-2">
              <h3 className="font-sans font-bold text-2xl text-slate-900 mb-2">Send Us A Message</h3>
              <p className="text-slate-500 text-sm font-normal mb-8">Feel some love, to see what we can do...</p>
              
              {success ? (
                <div className="py-12 text-center text-emerald-600 font-bold bg-emerald-50 rounded-2xl">
                  Message sent successfully! We will get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Complete Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-full px-6 py-4 text-sm text-slate-800 focus:outline-none focus:border-brand-orange"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-full px-6 py-4 text-sm text-slate-800 focus:outline-none focus:border-brand-orange"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="Phone No"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-full px-6 py-4 text-sm text-slate-800 focus:outline-none focus:border-brand-orange"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </span>
                  </div>
                  <div className="relative">
                    <textarea
                      required
                      rows={4}
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-3xl px-6 py-4 text-sm text-slate-800 focus:outline-none focus:border-brand-orange resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-brand-orange hover:bg-slate-900 text-white text-sm font-bold rounded-full transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Dark Contact Card */}
            <div className="bg-[#0f1115] text-white p-10 sm:p-12 rounded-2xl relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url(${prefix("/pattern.png")})`, backgroundSize: '100px' }} />
              <div className="relative z-10 space-y-12">
                
                <div className="space-y-4">
                  <h4 className="font-bold text-lg">Get in touch</h4>
                  <div className="space-y-1">
                    <p className="text-slate-300 text-sm font-medium">+91 90420 65360</p>
                    <p className="text-slate-300 text-sm font-medium">info@covaitechpark.com</p>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <a href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-colors text-xs font-bold text-slate-400">Fa</a>
                    <a href="#" className="w-10 h-10 rounded-full bg-brand-orange border border-brand-orange flex items-center justify-center text-white text-xs font-bold shadow-[0_0_15px_rgba(243,112,33,0.4)]">Tw</a>
                    <a href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-colors text-xs font-bold text-slate-400">In</a>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="font-bold text-lg mb-2">Coimbatore</h4>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-normal">
                      Covai Tech Park, 4th South Cross St,<br />
                      Kovai Thirunagar, Nehru Nagar East,<br />
                      Block D, IL 60614
                    </p>
                  </div>
                  <div className="h-px w-full bg-slate-800" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Trichy</h4>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-normal">
                      2nd Floor, Bloom Plaza,<br />
                      6th Cross North East Extension,<br />
                      Block D, IL 60614
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[400px] bg-slate-200 relative grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.143641267597!2d77.031952!3d11.027815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857a2bd66f649%3A0xc48c0827ea8061e8!2sCovai%20Tech%20Park!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>



      <Footer />
    </div>
  );
}
