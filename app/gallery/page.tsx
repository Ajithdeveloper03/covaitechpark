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


export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const [visibleCount, setVisibleCount] = useState(15);
  const [numColumns, setNumColumns] = useState(4);

  useEffect(() => {
    document.title = "Gallery | Premium Office Spaces - CovaiTech Park";
  }, []);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setNumColumns(1);
      } else if (window.innerWidth < 768) {
        setNumColumns(2);
      } else if (window.innerWidth < 1024) {
        setNumColumns(3);
      } else {
        setNumColumns(4);
      }
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Reset visible images count when active tab changes
  useEffect(() => {
    setVisibleCount(15);
  }, [activeTab]);

  const filteredItems = activeTab === "All" 
    ? FULL_GALLERY_ITEMS 
    : FULL_GALLERY_ITEMS.filter(item => item.category === activeTab);

  const displayedItems = filteredItems.slice(0, visibleCount);

  const openLightbox = (imgSrc: string) => {
    setLightboxImage(prefix(imgSrc));
    setLightboxOpen(true);
  };

  const getFlexGrow = (aspect: string) => {
    if (aspect.includes("3/5")) return 1.67;
    if (aspect.includes("4/5")) return 1.25;
    if (aspect.includes("9/16")) return 1.78;
    if (aspect.includes("3/4")) return 1.33;
    if (aspect.includes("1/1")) return 1.00;
    if (aspect.includes("4/3")) return 0.75;
    if (aspect.includes("3/2")) return 0.67;
    if (aspect.includes("16/9")) return 0.56;
    return 1.00;
  };

  // Partition items into columns
  const columnsData = Array.from({ length: numColumns }, () => [] as typeof FULL_GALLERY_ITEMS);
  displayedItems.forEach((item, idx) => {
    columnsData[idx % numColumns].push(item);
  });

  const maxItemsInCol = Math.max(...columnsData.map(col => col.length), 1);
  const containerHeight = maxItemsInCol * 280;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 flex flex-col font-sans relative select-none antialiased">
      <Header />
      <FloatingNav />

      {/* Hero Section */}
      <section 
        id="gallery-hero"
        className="relative pt-40 pb-20 px-4 md:px-8 bg-[#060d17] text-white flex flex-col items-center justify-center text-center overflow-hidden min-h-[50vh]"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={prefix("/workspace-meeting.png")}
            alt="Gallery Background"
            fill
            className="object-cover opacity-30 object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060d17] via-[#060d17]/80 to-transparent" />
        </div>

        {/* Powerful Glassy Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d17]/80 via-[#060d17]/60 to-[#f37021]/10 z-0"></div>
        <div className="absolute top-0 right-0 w-[80%] h-[80%] rounded-full bg-[#f37021]/20 blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-full bg-brand-orange/15 blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[2px] border-b border-white/10 pointer-events-none z-0"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-4">
          <span className="text-sm font-bold text-[#f37021] uppercase tracking-[0.2em]">Our Spaces</span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.1] font-sans font-medium">
            Explore <span className="font-serif italic text-white/90">CovaiTech</span>
          </h1>
          <p className="text-white/60 max-w-2xl text-base sm:text-lg mt-4 font-light leading-relaxed mx-auto">
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
        <div 
          className="grid gap-4 w-full" 
          style={{ 
            gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))`,
            height: `${containerHeight}px`
          }}
        >
          {columnsData.map((colItems, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4 h-full">
              {colItems.map((item, idx) => {
                const flexValue = getFlexGrow(item.aspect);
                return (
                  <div 
                    key={`${item.img}-${idx}`} 
                    className="group relative rounded-xl overflow-hidden bg-white border border-slate-100 shadow-xl w-full cursor-pointer"
                    style={{ flex: `${flexValue} 1 0%` }}
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
                      <span className="px-6 py-2 bg-brand-orange text-white text-sm font-bold uppercase tracking-widest rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        View Full
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Load More Option */}
        {filteredItems.length > visibleCount && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setVisibleCount((prev) => prev + 15)}
              className="px-8 py-3.5 bg-brand-navy hover:bg-brand-orange text-white font-bold text-sm uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl cursor-pointer"
            >
              Load More
            </button>
          </div>
        )}

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
