"use client";

import React, { useState, useEffect } from "react";

export interface NavSection {
  id: string;
  label: string;
}

interface FloatingNavProps {
  sections: NavSection[];
}

export default function FloatingNav({ sections }: FloatingNavProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
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

      if (!currentSection && sections.length > 0) {
        currentSection = sections[0].id;
      }

      if (currentSection) {
        setActiveId(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  if (!sections || sections.length === 0) return null;

  // Usually the first section is the hero. Hide the navigation if we are at the very top.
  const isTopSection = activeId === sections[0]?.id;

  return (
    <div
      className="fixed right-3 sm:right-6 xl:right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-[99] p-2.5 sm:p-3 bg-[#091b29]/95 backdrop-blur-md rounded-full border border-white/10 shadow-xl transition-all duration-500"
      style={{
        opacity: isTopSection ? 0 : 1,
        transform: `translateY(-50%) translateX(${isTopSection ? "24px" : "0px"})`,
        pointerEvents: isTopSection ? "none" : "auto",
      }}
    >
      <div className="relative flex flex-col items-center gap-4 py-2">
        <div className="dot-timeline-line bg-white/10" />
        {sections.map((sec) => {
          const isActive = activeId === sec.id;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              title={sec.label}
              className="w-3.5 h-3.5 rounded-full transition-all duration-300 relative group flex items-center justify-center animate-float-delayed"
            >
              <span className={`rounded-full transition-all duration-500 ${
                isActive 
                  ? "w-3.5 h-3.5 bg-[#f37021] scale-110 shadow-lg shadow-[#f37021]/40" 
                  : "w-2.5 h-2.5 bg-white/35 hover:bg-white"
              }`} />
              <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#060c10] text-white text-[10px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg pointer-events-none whitespace-nowrap translate-x-2 group-hover:translate-x-0 border border-white/10">
                {sec.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
