"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

interface HeaderProps {
  ctaText?: string;
  ctaAction?: () => void;
}

export default function Header({ ctaText = "Write Message", ctaAction }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCtaClick = () => {
    if (ctaAction) {
      ctaAction();
    } else {
      // Default behavior: redirect to contact page or scroll to form
      const el = document.getElementById("contact-section") || document.getElementById("contact-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = prefix("/contact");
      }
    }
  };

  return (
    <>
      <header
        className={`left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "fixed top-0 bg-white shadow-md border-b border-slate-100 py-2.5 lg:py-3.5"
            : "absolute top-0 lg:top-4 bg-transparent border-none py-3 lg:py-4"
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 xl:px-12 flex justify-between items-center gap-2 sm:gap-3 lg:gap-4">
          
          <a
            href={prefix("/")}
            className={`flex items-center shrink-0 transition-all duration-300 hover:scale-[1.01] min-w-0 p-1 sm:p-1.5 md:p-2 rounded-lg sm:rounded-xl ${
              isScrolled
                ? "bg-white"
                : "bg-white/100  backdrop-blur-sm"
            }`}
          >
            <Image
              src={prefix("/covai-tech-park-logo.png")}
              alt="Covai Tech Park"
              width={180}
              height={85}
              priority
              className="object-contain h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] xl:max-w-[200px]"
            />
          </a>

          <nav
            className={`hidden xl:flex items-center gap-8 text-[12px] font-medium tracking-widest uppercase mx-auto transition-colors duration-300 ${
              isScrolled ? "text-slate-700" : "text-white/80"
            }`}
          >
            <div className="relative group cursor-pointer h-full flex items-center">
              <a href={prefix("/#locations")} className="hover:text-brand-orange transition-colors flex items-center gap-1 font-medium py-6">Locations <span className="text-[8px]">▼</span></a>
              <div className="absolute top-[90%] left-1/2 -translate-x-1/2 w-[700px] bg-white/98 backdrop-blur-2xl text-slate-800 rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-slate-100 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 invisible group-hover:visible transition-all duration-500 ease-out grid grid-cols-2 p-6 text-sm normal-case tracking-normal font-medium z-50 gap-6 pointer-events-none group-hover:pointer-events-auto before:content-[''] before:absolute before:-top-6 before:left-0 before:w-full before:h-6">
                {/* Coimbatore Card */}
                <a href={prefix("/coimbatore")} className="group/loc relative bg-white border border-slate-100/80 rounded-2xl overflow-hidden flex flex-col hover:border-brand-orange/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                  <div className="relative h-36 w-full overflow-hidden">
                    <Image src={prefix("/coimbatore.png")} alt="Coimbatore" fill className="object-cover transition-transform duration-700 group-hover/loc:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1828]/90 via-[#0a1828]/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5 w-full flex justify-between items-end">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-orange mb-1.5 block drop-shadow-md">Primary Hub</span>
                        <h4 className="font-outfit font-medium text-[22px] text-white tracking-tight leading-none drop-shadow-md">Coimbatore</h4>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/loc:bg-brand-orange group-hover/loc:border-brand-orange transition-colors duration-300">
                        <span className="text-sm font-light">&rarr;</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col gap-3.5 bg-slate-50/50">
                    {["Nehru Nagar", "Saravanampatti", "Peelamedu", "RS Puram"].map((area, idx) => (
                      <span key={idx} className="text-slate-600 text-[13px] group-hover/loc:text-slate-900 transition-colors flex items-center gap-3">
                        <span className="w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center group-hover/loc:border-brand-orange/30 shadow-sm transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover/loc:bg-brand-orange transition-colors"></span>
                        </span>
                        {area}
                      </span>
                    ))}
                  </div>
                </a>
                
                {/* Trichy Card */}
                <a href="https://trichycoworks.com/" target="_blank" rel="noopener noreferrer" className="group/loc relative bg-white border border-slate-100/80 rounded-2xl overflow-hidden flex flex-col hover:border-brand-orange/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                  <div className="relative h-36 w-full overflow-hidden">
                    <Image src={prefix("/workspace-meeting.png")} alt="Trichy" fill className="object-cover transition-transform duration-700 group-hover/loc:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1828]/90 via-[#0a1828]/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5 w-full flex justify-between items-end">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-orange mb-1.5 block drop-shadow-md">New Hub</span>
                        <h4 className="font-outfit font-medium text-[22px] text-white tracking-tight leading-none drop-shadow-md">Trichy</h4>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/loc:bg-brand-orange group-hover/loc:border-brand-orange transition-colors duration-300">
                        <span className="text-sm font-light">&rarr;</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col gap-3.5 bg-slate-50/50">
                    {["Thillai Nagar", "Cantonment", "Woraiyur", "KK Nagar"].map((area, idx) => (
                      <span key={idx} className="text-slate-600 text-[13px] group-hover/loc:text-slate-900 transition-colors flex items-center gap-3">
                        <span className="w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center group-hover/loc:border-brand-orange/30 shadow-sm transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover/loc:bg-brand-orange transition-colors"></span>
                        </span>
                        {area}
                      </span>
                    ))}
                  </div>
                </a>
              </div>
            </div>
            
            <div className="relative group cursor-pointer h-full flex items-center">
              <a href={prefix("/#services-dark")} className="hover:text-brand-orange transition-colors flex items-center gap-1 font-medium py-6">Services <span className="text-[8px]">▼</span></a>
              <div className="absolute top-[90%] left-0 w-[260px] bg-white/98 backdrop-blur-2xl text-slate-800 rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-slate-100 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 invisible group-hover:visible transition-all duration-500 ease-out flex flex-col p-3 text-sm normal-case tracking-normal font-medium z-50 pointer-events-none group-hover:pointer-events-auto before:content-[''] before:absolute before:-top-6 before:left-0 before:w-full before:h-6">
                <a href={prefix("/private-office-space")} className="px-4 py-3.5 hover:bg-slate-50 hover:text-brand-orange rounded-2xl transition-all flex items-center justify-between group/link">
                  <span className="font-outfit text-[15px] text-slate-700 group-hover/link:text-brand-orange">Private Office</span>
                  <span className="text-brand-orange opacity-0 -translate-x-2 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all duration-300">&rarr;</span>
                </a>
                <a href={prefix("/#services-dark")} className="px-4 py-3.5 hover:bg-slate-50 hover:text-brand-orange rounded-2xl transition-all flex items-center justify-between group/link">
                  <span className="font-outfit text-[15px] text-slate-700 group-hover/link:text-brand-orange">Managed Office</span>
                  <span className="text-brand-orange opacity-0 -translate-x-2 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all duration-300">&rarr;</span>
                </a>
                <a href={prefix("/#services-dark")} className="px-4 py-3.5 hover:bg-slate-50 hover:text-brand-orange rounded-2xl transition-all flex items-center justify-between group/link">
                  <span className="font-outfit text-[15px] text-slate-700 group-hover/link:text-brand-orange">Virtual Office</span>
                  <span className="text-brand-orange opacity-0 -translate-x-2 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all duration-300">&rarr;</span>
                </a>
                <a href={prefix("/#services-dark")} className="px-4 py-3.5 hover:bg-slate-50 hover:text-brand-orange rounded-2xl transition-all flex items-center justify-between group/link">
                  <span className="font-outfit text-[15px] text-slate-700 group-hover/link:text-brand-orange">Meeting Rooms</span>
                  <span className="text-brand-orange opacity-0 -translate-x-2 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all duration-300">&rarr;</span>
                </a>
                <a href={prefix("/#services-dark")} className="px-4 py-3.5 hover:bg-slate-50 hover:text-brand-orange rounded-2xl transition-all flex items-center justify-between group/link">
                  <span className="font-outfit text-[15px] text-slate-700 group-hover/link:text-brand-orange">Event Space</span>
                  <span className="text-brand-orange opacity-0 -translate-x-2 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all duration-300">&rarr;</span>
                </a>
              </div>
            </div>
            <a href={prefix("/blog")} className="hover:text-brand-orange transition-colors font-medium">Blog</a>
            <a href={prefix("/contact")} className="hover:text-brand-orange transition-colors font-medium">Contact</a>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
            <a
              href="https://wa.me/919042065360"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 rounded-full text-[10px] sm:text-[11px] font-normal uppercase tracking-widest bg-[#25d366] text-white hover:bg-[#1da851] transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 32 32" fill="white">
                <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.828 1.781 6.858L2 30l7.352-1.758A13.918 13.918 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.46 11.46 0 01-5.844-1.598l-.42-.25-4.36 1.043 1.074-4.248-.277-.438A11.46 11.46 0 014.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5zm6.29-8.524c-.344-.172-2.035-1.004-2.349-1.118-.314-.115-.543-.172-.771.172-.229.344-.88 1.118-1.079 1.347-.199.229-.397.257-.741.086-.344-.172-1.453-.535-2.766-1.707-1.022-.913-1.713-2.04-1.912-2.384-.199-.344-.021-.53.15-.7.154-.153.344-.4.516-.6.172-.2.229-.344.344-.572.114-.229.057-.43-.029-.601-.086-.172-.771-1.858-1.057-2.546-.278-.668-.56-.578-.771-.588l-.657-.011c-.229 0-.6.086-.914.43-.314.344-1.2 1.176-1.2 2.865s1.228 3.325 1.4 3.554c.171.229 2.42 3.695 5.863 5.182.82.354 1.46.566 1.959.724.824.262 1.574.225 2.167.136.66-.098 2.035-.831 2.32-1.634.286-.803.286-1.49.2-1.634-.086-.143-.314-.229-.657-.4z" />
              </svg>
              <span className="hidden lg:inline">+91 90420 65360</span>
              <span className="hidden sm:inline lg:hidden">WhatsApp</span>
            </a>

            <button
              onClick={handleCtaClick}
              className="hidden md:flex px-4 py-2.5 lg:px-6 lg:py-3 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest bg-gradient-to-r from-brand-orange to-[#ffaa66] text-white hover:scale-103 transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap items-center gap-2"
            >
              {ctaText}
              <span className="text-sm font-bold">&rarr;</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`xl:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-350 cursor-pointer shrink-0 ${
                isScrolled ? "text-slate-855 hover:bg-slate-150" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <div className={`fixed inset-y-0 right-0 w-full max-w-xs bg-[#0a1828]/98 backdrop-blur-2xl z-50 flex flex-col justify-center items-center gap-6 xl:hidden transition-transform duration-500 shadow-2xl ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white cursor-pointer transition-colors duration-250"
            aria-label="Close Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav className="flex flex-col items-center gap-6 text-[15px] font-bold text-white uppercase tracking-widest w-full px-8 overflow-y-auto max-h-[80vh] py-8">
            <div className="flex flex-col items-center gap-2 w-full text-center">
              <span className="text-white/45 text-[10px] tracking-widest uppercase mb-1">Locations</span>
              <div className="flex flex-col gap-1 w-full">
                <span className="text-brand-orange text-sm font-bold uppercase tracking-wider">Coimbatore</span>
                <a href={prefix("/coimbatore")} onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors text-sm normal-case font-normal text-white/85">Nehru Nagar</a>
                <a href={prefix("/coimbatore")} onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors text-sm normal-case font-normal text-white/85">Saravanampatti</a>
                <a href={prefix("/coimbatore")} onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors text-sm normal-case font-normal text-white/85">Peelamedu</a>
                <a href={prefix("/coimbatore")} onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors text-sm normal-case font-normal text-white/85">RS Puram</a>
              </div>
              <div className="flex flex-col gap-1 w-full mt-3">
                <span className="text-brand-orange text-sm font-bold uppercase tracking-wider">Trichy</span>
                <a href="https://trichycoworks.com/" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors text-sm normal-case font-normal text-white/85">Thillai Nagar</a>
                <a href="https://trichycoworks.com/" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors text-sm normal-case font-normal text-white/85">Cantonment</a>
                <a href="https://trichycoworks.com/" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors text-sm normal-case font-normal text-white/85">Woraiyur</a>
                <a href="https://trichycoworks.com/" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors text-sm normal-case font-normal text-white/85">KK Nagar</a>
              </div>
            </div>
            <a href={prefix("/private-office-space")} onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors text-center w-full font-medium">Private Office</a>
            <a href={prefix("/#services-dark")} onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors text-center w-full font-medium">Services</a>
            <a href={prefix("/blog")} onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors text-center w-full font-medium">Blog</a>
            <a href={prefix("/contact")} onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors text-center w-full font-medium">Contact</a>
          </nav>
        </div>
      </header>
    </>
  );
}
