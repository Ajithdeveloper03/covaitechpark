"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageLightbox from "../components/ImageLightbox";

const BASE_PATH = "";
const prefix = (url: string) => `${BASE_PATH}${url}`;
const getImgUrl = (img: string) => img.startsWith("http") || img.startsWith("/") ? img : prefix(img);

const TABS = ["All", "Coworking Space", "Private Office Space", "Meeting Room", "Managed Office Space", "Furnished Office Space", "Common Area"];



export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const [numColumns, setNumColumns] = useState(4);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/galleries`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const mapped = data
              .filter((item: any) => item.is_active)
              .sort((a: any, b: any) => a.sort_order - b.sort_order)
              .map((item: any) => {
                const rawImg = item.image;
                let resolvedImg = "/workspace-lounge.png";
                if (rawImg) {
                  if (rawImg.startsWith("http") || rawImg.startsWith("/")) {
                    resolvedImg = rawImg;
                  } else {
                    resolvedImg = `${process.env.NEXT_PUBLIC_STORAGE_URL}/${rawImg}`;
                  }
                }

                const aspects = ["aspect-[3/5]", "aspect-[4/3]", "aspect-[1/1]", "aspect-[16/9]", "aspect-[4/5]", "aspect-[3/2]", "aspect-[9/16]", "aspect-[3/4]"];
                const aspect = aspects[item.id % aspects.length];

                return {
                  img: resolvedImg,
                  category: item.title || "Lounge",
                  aspect: aspect
                };
              });
            if (mapped.length > 0) {
              setGalleryItems(mapped);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);



  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setNumColumns(2);
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

  const filteredItems = activeTab === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeTab);

  const openLightbox = (imgSrc: string) => {
    setLightboxImage(getImgUrl(imgSrc));
    setLightboxOpen(true);
  };

  // Items are rendered directly to a CSS Grid

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 flex flex-col font-sans relative select-none antialiased">
      <Header />

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
            Explore <span className="text-white/90">Covai Tech Park</span>
          </h1>
          <p className="text-white/60 max-w-2xl text-base sm:text-lg mt-4 font-light leading-relaxed mx-auto">
            Take a visual tour of our meticulously designed private cabins, meeting rooms, and collaborative organic lounges.
          </p>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section id="gallery-grid" className="py-10 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 w-full max-w-[1400px] mx-auto min-h-screen">

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-16">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${activeTab === tab
                  ? "bg-brand-navy text-white shadow-lg"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-brand-navy hover:text-brand-navy"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20 mb-24 w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f37021]"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 mb-24 w-full">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No images found</h2>
            <p className="text-slate-500">There are no gallery images available in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mb-24">
            {filteredItems.map((item, idx) => {
            return (
              <div
                key={`${item.img}-${idx}`}
                className={`group relative rounded-xl overflow-hidden bg-white border border-slate-100 shadow-sm w-full cursor-pointer aspect-[4/3] shrink-0 h-full`}
                onClick={() => openLightbox(item.img)}
              >
                <Image
                  src={getImgUrl(item.img)}
                  alt={`${item.category} Gallery Image`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/covai-tech-park-logo.png";
                    e.currentTarget.className = "object-contain p-8 opacity-20";
                  }}
                />
                <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-6 py-2 bg-brand-orange text-white text-sm font-bold tracking-widest rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    View Full
                  </span>
                </div>
              </div>
            );
          })}
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
