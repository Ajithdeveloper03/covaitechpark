"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingNav from "../components/FloatingNav";
import ImageLightbox from "../components/ImageLightbox";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

const TABS = ["All", "Cabins", "Meeting Rooms", "Lounge", "Events", "Facilities"];

const FULL_GALLERY_ITEMS = [
  { img: "/hero1.jpg", category: "Facilities", aspect: "aspect-[16/9]" },
  { img: "/workspace-cabin.png", category: "Cabins", aspect: "aspect-[3/5]" },
  { img: "/workspace-lounge.png", category: "Lounge", aspect: "aspect-[4/3]" },
  { img: "/workspace-cafe.png", category: "Lounge", aspect: "aspect-[1/1]" },
  { img: "/hero2.jpg", category: "Meeting Rooms", aspect: "aspect-[16/9]" },
  { img: "/workspace-meeting.png", category: "Meeting Rooms", aspect: "aspect-[4/3]" },
  { img: "/workspace-hotdesk.png", category: "Cabins", aspect: "aspect-[4/5]" },
  { img: "/workspace-event.png", category: "Events", aspect: "aspect-[3/2]" },
  { img: "/hero3.jpg", category: "Cabins", aspect: "aspect-[1/1]" },
  { img: "/workspace-lounge.png", category: "Lounge", aspect: "aspect-[9/16]" },
  { img: "/workspace-cafe.png", category: "Lounge", aspect: "aspect-[3/4]" },
  { img: "/workspace-meeting.png", category: "Meeting Rooms", aspect: "aspect-[4/3]" },
  { img: "/hero11.jpg", category: "Facilities", aspect: "aspect-[16/9]" },
  { img: "/workspace-hotdesk.png", category: "Cabins", aspect: "aspect-[16/9]" },
  { img: "/workspace-event.png", category: "Events", aspect: "aspect-[3/4]" },
  { img: "/hero13.jpg", category: "Facilities", aspect: "aspect-[4/3]" }
];

const SECTIONS = [
  { id: "gallery-hero", label: "Gallery" },
  { id: "gallery-grid", label: "Images" }
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");

  useEffect(() => {
    document.title = "Gallery | Premium Office Spaces - CovaiTech Park";
  }, []);

  const filteredItems = activeTab === "All" 
    ? FULL_GALLERY_ITEMS 
    : FULL_GALLERY_ITEMS.filter(item => item.category === activeTab);

  const openLightbox = (imgSrc: string) => {
    setLightboxImage(prefix(imgSrc));
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 flex flex-col font-sans relative select-none antialiased">
      <Header />
      <FloatingNav sections={SECTIONS} />

      {/* Hero Section */}
      <section 
        id="gallery-hero"
        className="relative pt-40 pb-20 px-4 md:px-8 bg-[#0a0a0a] text-white flex flex-col items-center justify-center text-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image 
            src={prefix("/hero2.jpg")}
            alt="CovaiTech Gallery"
            fill
            className="object-cover opacity-20 object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/50" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-4">
          <span className="text-sm font-bold text-brand-orange uppercase tracking-[0.2em]">Our Spaces</span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.1] font-sans font-medium">
            Explore <span className="font-serif italic text-white/90">CovaiTech</span>
          </h1>
          <p className="text-white/60 max-w-2xl text-base sm:text-lg mt-4 font-light leading-relaxed">
            Take a visual tour of our meticulously designed private cabins, meeting rooms, and collaborative organic lounges.
          </p>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section id="gallery-grid" className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 w-full max-w-[1400px] mx-auto min-h-screen">
        
        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-16">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                activeTab === tab 
                  ? "bg-brand-navy text-white shadow-lg" 
                  : "bg-white text-slate-600 border border-slate-200 hover:border-brand-navy hover:text-brand-navy"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry Layout Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 w-full">
          {filteredItems.map((item, idx) => (
            <div 
              key={`${item.img}-${idx}`} 
              className={`group relative rounded-xl overflow-hidden bg-white border border-slate-100 shadow-xl w-full break-inside-avoid ${item.aspect} cursor-pointer`}
              onClick={() => openLightbox(item.img)}
            >
              <Image
                src={prefix(item.img)}
                alt={`${item.category} Gallery Image`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-6 py-2 bg-brand-orange text-white text-sm font-bold uppercase tracking-widest rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  View Full
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

      <ImageLightbox 
        isOpen={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
        imageSrc={lightboxImage} 
      />
      <Footer />
    </div>
  );
}
