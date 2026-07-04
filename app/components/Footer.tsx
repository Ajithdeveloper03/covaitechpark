"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSettings } from "../hooks/useSettings";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

interface FooterProps {
  onCtaClick?: () => void;
}

export default function Footer({ onCtaClick }: FooterProps) {
  const { settings } = useSettings();
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      // Default fallback
      const el = document.getElementById("contact-section") || document.getElementById("contact-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = prefix("/contact");
      }
    }
  };

  return (
    <footer className="w-full bg-[#060c10] text-white border-t border-white/5 font-sans z-10 relative">
      
      {/* Top CTA Strip */}
      <div className="w-full bg-gradient-to-r from-[#0a0f1c] to-[#121b2f] py-6 sm:py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-outfit font-medium text-white m-0">
            Need help with finding the right workspace solution?
          </h2>
          <button
            onClick={handleCtaClick}
            className="px-6 py-2.5 bg-[#f03a17] hover:bg-white hover:text-slate-900 text-white font-semibold text-sm rounded-md transition-all whitespace-nowrap shadow-md cursor-pointer"
          >
            Talk to our Expert
          </button>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

        {/* Column 1 — Brand (Covai Tech Park + Addresses) */}
        <div className="space-y-6 text-left">
          <div className="flex items-center">
            <Link href={"/"} className="inline-block p-2 bg-white rounded-xl shadow-md border border-slate-200 hover:scale-[1.01] transition-transform">
              <Image
                src={prefix("/covai-tech-park-logo.png")}
                alt="Covai Tech Park"
                width={140}
                height={45}
                className="object-contain h-8 w-auto"
                sizes="(max-width: 768px) 100vw, 800px" 
                loading="lazy"
              />
            </Link>
          </div>
          
          <div className="space-y-4">
            <div>
              <h5 className="font-sans font-bold text-sm text-white uppercase tracking-[0.2em] mb-1">Registered Address</h5>
              <p className="text-white/70 font-bold text-sm uppercase tracking-wider mb-0.5">Max Office</p>
              <p className="text-white/45 text-sm font-normal leading-relaxed">
                2nd Floor, Old No. C-63, New No. C-50, Bloom Plaza, 6th Cross North East Extension, Near to Isha Yoga Center, Thillai Nagar, Tiruchirappalli, Tamil Nadu, 620018
              </p>
            </div>

            <div>
              <h5 className="font-sans font-bold text-sm text-white uppercase tracking-[0.2em] mb-1">Address</h5>
              <p className="text-white/45 text-sm font-normal leading-relaxed">
                Covai Tech Park, 4th South Cross St, Kovai Thirunagar, Nehru Nagar East, Coimbatore- 641 014.
              </p>
            </div>
          </div>
        </div>

        {/* Column 2 — Workspace Solutions & Email */}
        <div className="space-y-5 text-left">
          <h5 className="font-sans font-bold text-sm text-white uppercase tracking-[0.2em]">Workspace Solutions</h5>
          <ul className="space-y-3 text-sm font-normal text-white/45">
            {[
              { name: "Coworking Space", link: prefix("/coworking-space-in-coimbatore") },
              { name: "Private Office Space", link: prefix("/private-office-space") },
              { name: "Managed Office", link: prefix("/managed-office") },
              { name: "Virtual Office", link: prefix("/virtual-office") },
              { name: "Meeting Room", link: prefix("/meeting-room") },
              { name: "Event Space", link: prefix("/event-space-in-coimbatore") }
            ].map(item => (
              <li key={item.name} className="flex items-center gap-2">
                <span className="text-brand-orange text-sm">&rsaquo;</span>
                <a href={item.link} className="hover:text-brand-orange transition-colors duration-200 cursor-pointer">{item.name}</a>
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <h5 className="font-sans font-bold text-sm text-white uppercase tracking-[0.2em] mb-1">Email</h5>
            <a href="mailto:info@covaitechpark.com" className="text-white/45 hover:text-brand-orange text-sm font-normal transition-colors whitespace-nowrap">
              info@covaitechpark.com
            </a>
          </div>
        </div>

        {/* Column 3 — Useful Links & Other Pages */}
        <div className="space-y-6 text-left">
          <div className="space-y-4">
            <h5 className="font-sans font-bold text-sm text-white uppercase tracking-[0.2em]">Useful Links</h5>
            <ul className="space-y-3 text-sm font-normal text-white/45">
              {[
                { name: "Terms & Conditions", link: prefix("/terms") },
                { name: "Privacy Policy", link: prefix("/privacy") }
              ].map(item => (
                <li key={item.name} className="flex items-center gap-2">
                  <span className="text-brand-orange text-sm">&rsaquo;</span>
                  <a href={item.link} className="hover:text-brand-orange transition-colors duration-200 cursor-pointer">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 pt-2">
            <h5 className="font-sans font-bold text-sm text-white uppercase tracking-[0.2em]">Other Pages</h5>
            <ul className="space-y-3 text-sm font-normal text-white/45">
              {[
                { name: "Furnished Office Space", link: prefix("/furnished-office-space") },
                { name: "Commercial Office Space", link: prefix("/commercial-space-for-rent") },
                { name: "Coimbatore Hub", link: prefix("/coimbatore") },
                { name: "Trichy Hub", link: prefix("/trichy") }
              ].map(item => (
                <li key={item.name} className="flex items-start gap-2">
                  <span className="text-brand-orange text-sm mt-0.5">&rsaquo;</span>
                  <a href={item.link} className="hover:text-brand-orange transition-colors duration-200 cursor-pointer">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 4 — Social Links, Other Site & Mobile */}
        <div className="space-y-6 text-left">
          <div className="space-y-3">
            <h5 className="font-sans font-bold text-sm text-white uppercase tracking-[0.2em]">Social Links</h5>
            <div className="flex gap-3">
              {[
                { label: "Facebook", link: settings.facebook_url, path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" },
                { label: "Instagram", link: settings.instagram_url, path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                { label: "LinkedIn", link: settings.linkedin_url, path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" }
              ].map(({ label, link, path }) => (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-brand-orange hover:border-brand-orange flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="font-sans font-bold text-sm text-white uppercase tracking-[0.2em]">Other Site</h5>
            <div className="flex flex-col gap-1.5 text-sm text-white/45 font-normal">
              <a href="https://trichycoworks.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors flex items-center gap-1">
                <span className="text-brand-orange">&#9679;</span> trichycoworks.com
              </a>
              <a href="https://maxoffice.co.in" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors flex items-center gap-1">
                <span className="text-brand-orange">&#9679;</span> maxoffice.co.in
              </a>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h5 className="font-sans font-bold text-sm text-white uppercase tracking-[0.2em] mb-1.5">Mobile</h5>
            <div className="flex flex-col gap-1.5 text-white/45 text-sm font-normal">
              <a href="tel:+919360780768" className="hover:text-brand-orange transition-colors whitespace-nowrap">+91 93607 80768</a>
              <a href="tel:+919003550455" className="hover:text-brand-orange transition-colors whitespace-nowrap">+91 900 355 0455</a>
              <a href="tel:+919688992210" className="hover:text-brand-orange transition-colors whitespace-nowrap">+91 968 899 2210</a>
            </div>
          </div>
        </div>

      </div>

      {/* Legal Strip */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center text-sm font-medium text-white/60">
          <span>© {new Date().getFullYear()} Covai Tech Park — MAX OFFICE. All rights reserved.</span>
        </div>
      </div>

    </footer>
  );
}
