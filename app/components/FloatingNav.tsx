"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export interface NavSection {
  id: string;
  label: string;
}

export const GLOBAL_SECTIONS: NavSection[] = [
  { id: "hero", label: "Home" },
  { id: "benefits-organic", label: "About" },
  { id: "locations", label: "Locations" },
  { id: "services-dark", label: "Services" },
  { id: "gallery-works", label: "Gallery" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faqs", label: "FAQs" },
  { id: "booking", label: "Get Quote" }
];

export const ABOUT_SECTIONS: NavSection[] = [
  { id: "hero", label: "Home" },
  { id: "who-we-are", label: "Who We Are" },
  { id: "our-story", label: "Our Story" },
  { id: "founder", label: "Founder" }
];

export const LOCATION_PAGES_SECTIONS: NavSection[] = [
  { id: "hero", label: "Home" },
  { id: "locations", label: "Locations" }
];

export const PRIVATE_OFFICE_SECTIONS: NavSection[] = [
  { id: "hero", label: "Home" },
  { id: "features", label: "Features" },
  { id: "amenities", label: "Amenities" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faqs", label: "FAQs" }
];

export const GALLERY_SECTIONS: NavSection[] = [
  { id: "gallery-hero", label: "Hero" },
  { id: "gallery-grid", label: "Gallery" }
];

export const CONTACT_SECTIONS: NavSection[] = [
  { id: "hero", label: "Hero" },
  { id: "contact-portal", label: "Contact Us" },
  { id: "ecosystem-map", label: "Locations Map" }
];

export const BLOG_SECTIONS: NavSection[] = [
  { id: "hero", label: "Hero" },
  { id: "articles", label: "Articles" }
];

export default function FloatingNav() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("");
  const [sections, setSections] = useState<NavSection[]>([]);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [hasAnySections, setHasAnySections] = useState(false);

  useEffect(() => {
    // Standardize pathname by removing the base path prefix if present
    const cleanPath = pathname;

    let selectedSections: NavSection[] | null = null;

    if (cleanPath === "/" || cleanPath === "") {
      selectedSections = GLOBAL_SECTIONS;
    } else if (cleanPath.startsWith("/about-us")) {
      selectedSections = ABOUT_SECTIONS;
    } else if (cleanPath.startsWith("/coimbatore") || cleanPath.startsWith("/trichy")) {
      selectedSections = LOCATION_PAGES_SECTIONS;
    } else if (
      cleanPath.startsWith("/coworking-space-in-coimbatore") ||
      cleanPath.startsWith("/private-office-space") ||
      cleanPath.startsWith("/managed-office") ||
      cleanPath.startsWith("/meeting-room") ||
      cleanPath.startsWith("/virtual-office") ||
      cleanPath.startsWith("/event-space-in-coimbatore")
    ) {
      selectedSections = PRIVATE_OFFICE_SECTIONS;
    } else if (cleanPath.startsWith("/gallery")) {
      selectedSections = GALLERY_SECTIONS;
    } else if (cleanPath.startsWith("/contact")) {
      selectedSections = CONTACT_SECTIONS;
    } else if (cleanPath.startsWith("/blog")) {
      selectedSections = BLOG_SECTIONS;
    }

    if (!selectedSections) {
      setSections([]);
      setHasAnySections(false);
      return;
    }

    setSections(selectedSections);

    const checkSections = () => {
      const found = selectedSections!.some((sec) => !!document.getElementById(sec.id));
      setHasAnySections(found);
      return found;
    };

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Hide floating nav on all page hero sections
      setIsScrolledPastHero(window.scrollY > 220);

      let currentSection = "";
      // Check from bottom to top
      for (let i = selectedSections!.length - 1; i >= 0; i--) {
        const el = document.getElementById(selectedSections![i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            currentSection = selectedSections![i].id;
            break;
          }
        }
      }
      // Fall back to first section that exists
      if (!currentSection) {
        const first = selectedSections!.find((s) => !!document.getElementById(s.id));
        if (first) currentSection = first.id;
      }
      if (currentSection) setActiveId(currentSection);
    };

    // Use a small timeout to let the DOM paint after navigation
    scrollTimeout = setTimeout(() => {
      if (checkSections()) {
        handleScroll();
      }
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  if (!hasAnySections || sections.length === 0) return null;

  return (
    <div
      className="fixed right-4 sm:right-6 xl:right-8 top-1/2 hidden lg:flex flex-col items-center z-[99] p-3 bg-[#091b29]/90 backdrop-blur-md rounded-full border border-white/10 shadow-2xl transition-all duration-500"
      style={{
        transform: `translateY(-50%) translateX(${!isScrolledPastHero ? "20px" : "0px"})`,
        opacity: !isScrolledPastHero ? 0 : 1,
        pointerEvents: !isScrolledPastHero ? "none" : "auto",
      }}
    >
      <div className="flex flex-col items-center gap-3.5 py-2">
        {sections.map((sec) => {
          const isActive = activeId === sec.id;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={(e) => {
                const el = document.getElementById(sec.id);
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              title={sec.label}
              className="relative group flex items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-3 h-3 bg-[#f37021] shadow-lg shadow-[#f37021]/50 scale-110"
                    : "w-2 h-2 bg-white/30 hover:bg-white/70 hover:scale-110"
                }`}
              />
              {/* Hover label tooltip */}
              <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#060c10] text-white text-[10px] font-semibold tracking-widest px-3 py-1.5 rounded-lg shadow-xl pointer-events-none whitespace-nowrap border border-white/10 translate-x-1 group-hover:translate-x-0">
                {sec.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
