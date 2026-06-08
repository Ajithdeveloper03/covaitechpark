"use client";

import React, { useState } from "react";
import Image from "next/image";
import ImageLightbox from "./ImageLightbox";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

const TABS = ["All", "Cabins", "Meeting Rooms", "Lounge"];

const GALLERY_ITEMS = [
  { img: "/workspace-cabin.png", category: "Cabins", aspect: "aspect-[3/5]" },
  { img: "/workspace-lounge.png", category: "Lounge", aspect: "aspect-[4/3]" },
  { img: "/workspace-cafe.png", category: "Lounge", aspect: "aspect-[1/1]" },
  { img: "/workspace-meeting.png", category: "Meeting Rooms", aspect: "aspect-[16/9]" },
  { img: "/workspace-hotdesk.png", category: "Cabins", aspect: "aspect-[4/5]" },
  { img: "/workspace-event.png", category: "Lounge", aspect: "aspect-[3/2]" },
  { img: "/workspace-cabin.png", category: "Cabins", aspect: "aspect-[1/1]" },
  { img: "/workspace-lounge.png", category: "Lounge", aspect: "aspect-[9/16]" },
  { img: "/workspace-cafe.png", category: "Lounge", aspect: "aspect-[3/4]" },
  { img: "/workspace-meeting.png", category: "Meeting Rooms", aspect: "aspect-[4/3]" },
  { img: "/workspace-hotdesk.png", category: "Cabins", aspect: "aspect-[16/9]" },
  { img: "/workspace-event.png", category: "Lounge", aspect: "aspect-[3/4]" }
];

export default function HomeGallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");

  const filteredItems = activeTab === "All" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeTab);

  const openLightbox = (imgSrc: string) => {
    setLightboxImage(prefix(imgSrc));
    setLightboxOpen(true);
  };

  return (
    <section id="gallery-works" className="bg-[#fcfbf9] w-full py-24 sm:py-32 px-4 sm:px-6 md:px-8 overflow-hidden relative border-t border-b border-slate-100">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold tracking-tight text-slate-900 flex items-center justify-center gap-3">
            <span className="text-brand-orange">CovaiTech</span> Gallery
            <svg className="w-8 h-8 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
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
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 w-full mt-4">
          {filteredItems.map((item, idx) => (
            <div 
              key={`${item.img}-${idx}`} 
              className={`group relative rounded-xl overflow-hidden bg-white border border-slate-100 shadow-sm w-full break-inside-avoid ${item.aspect} cursor-pointer`}
              onClick={() => openLightbox(item.img)}
            >
              <Image
                src={prefix(item.img)}
                alt={`${item.category} Gallery Image`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-6 py-2 bg-brand-orange text-white text-sm font-bold uppercase tracking-widest rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-6">
           <button
             onClick={() => window.location.href = prefix('/gallery')}
             className="px-8 py-3 bg-brand-orange hover:bg-brand-navy text-white text-sm font-bold rounded-full transition-colors shadow-lg"
           >
             View Full Gallery
           </button>
        </div>
        
      </div>

      <ImageLightbox 
        isOpen={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
        imageSrc={lightboxImage} 
      />
    </section>
  );
}
