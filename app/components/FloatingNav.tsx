"use client";

import React, { useState, useEffect } from "react";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

export interface NavSection {
  id: string;
  label: string;
}

export const GLOBAL_SECTIONS: NavSection[] = [
  { id: "hero", label: "Home" },
  { id: "benefits-organic", label: "About" },
  { id: "services-dark", label: "Services" },
  { id: "locations", label: "Locations" },
  { id: "deployment-track", label: "Facilities" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faqs", label: "FAQs" },
  { id: "booking", label: "Book Space" }
];

interface FloatingNavProps {
  sections?: NavSection[];
}

export default function FloatingNav({ sections = GLOBAL_SECTIONS }: FloatingNavProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [hasAnySections, setHasAnySections] = useState(false);

  useEffect(() => {
    // Only show if at least one section ID exists in the DOM
    const found = sections.some((sec) => !!document.getElementById(sec.id));
    setHasAnySections(found);
    if (!found) return;

    const handleScroll = () => {
      let currentSection = "";
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            currentSection = sections[i].id;
            break;
          }
        }
      }
      // Fall back to first section that exists
      if (!currentSection) {
        const first = sections.find((s) => !!document.getElementById(s.id));
        if (first) currentSection = first.id;
      }
      if (currentSection) setActiveId(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize on mount
    setTimeout(handleScroll, 120);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  if (!hasAnySections || sections.length === 0) return null;

  // First section that actually exists in DOM
  const firstExistingId = sections.find((s) =>
    typeof document !== "undefined" ? !!document.getElementById(s.id) : false
  )?.id;

  const isAtTop = activeId === firstExistingId || activeId === "";

  return (
    <div
      className="fixed right-4 sm:right-6 xl:right-8 top-1/2 hidden lg:flex flex-col items-center z-[99] p-3 bg-[#091b29]/90 backdrop-blur-md rounded-full border border-white/10 shadow-2xl transition-all duration-500"
      style={{
        transform: `translateY(-50%) translateX(${isAtTop ? "20px" : "0px"})`,
        opacity: isAtTop ? 0 : 1,
        pointerEvents: isAtTop ? "none" : "auto",
      }}
    >
      <div className="flex flex-col items-center gap-3.5 py-2">
        {sections.map((sec) => {
          const isActive = activeId === sec.id;
          return (
            <a
              key={sec.id}
              href={prefix(`/#${sec.id}`)}
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
              <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#060c10] text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl pointer-events-none whitespace-nowrap border border-white/10 translate-x-1 group-hover:translate-x-0">
                {sec.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
