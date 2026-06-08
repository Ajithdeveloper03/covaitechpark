const fs = require('fs');

// --- PAGE.TSX (HERO THUMBNAILS) ---
const pathPage = 'c:/Users/inyma/OneDrive/Desktop/Ajith System Backup/inymart projects/covaitech/covaitech/app/page.tsx';
let contentPage = fs.readFileSync(pathPage, 'utf8');

const startMarkerPage = '{/* Slide thumbnails — vertical list with vertical dot line on desktop */}';
const endMarkerPage = '{/* TRUSTED BRANDS PARTNERS SECTION (AUTOMATIC INFINITE MARQUEE DRAG-SLIDER) */}';

const startIndexPage = contentPage.indexOf(startMarkerPage);
const endIndexPage = contentPage.indexOf(endMarkerPage);

if (startIndexPage !== -1 && endIndexPage !== -1) {
    const newThumbnails = `{/* Slide thumbnails — vertical list with vertical dot line on desktop */}
          <div className="lg:col-span-5 w-full z-20 flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
            <div className="relative flex items-stretch gap-6 w-full lg:max-w-[320px] xl:max-w-[360px]">
              
              {/* Vertical Timeline Dot Connector (Desktop only) */}
              <div className="absolute left-1.5 top-[10%] bottom-[10%] w-[1px] bg-white/15 hidden lg:block z-0 pointer-events-none" />

              <div className="w-full flex flex-row lg:flex-col justify-center items-center relative z-10 overflow-hidden no-scrollbar pb-4 lg:pb-0 px-4 lg:px-0">
                {HERO_SLIDES.map((slide, i) => {
                  const isActive = activeHeroSlide === i;
                  
                  // Hide exactly one item to always show 3 items in the row
                  const isHidden = i === (activeHeroSlide + 2) % HERO_SLIDES.length;

                  return (
                    <div 
                      key={slide.id} 
                      className={\`flex-shrink-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] snap-center flex items-center justify-center \${isHidden ? 'w-0 h-0 opacity-0 overflow-hidden m-0 border-0' : 'w-[140px] sm:w-[160px] lg:w-full opacity-100 gap-3 sm:gap-4 lg:gap-5 my-2 lg:my-3'}\`}
                    >
                      {/* Timeline Dot (Desktop only) */}
                      <div className="relative items-center justify-center shrink-0 w-4 h-4 hidden lg:flex">
                        <div className={\`rounded-full transition-all duration-700 ease-out \${
                          isActive 
                            ? "w-3 h-3 bg-brand-orange ring-4 ring-brand-orange/30 scale-110" 
                            : "w-1.5 h-1.5 bg-white/45"
                        }\`} />
                      </div>

                      {/* Thumbnail Card Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveHeroSlide(i);
                          setIsAutoPlay(false);
                        }}
                        className={\`relative rounded-xl sm:rounded-2xl border font-bold transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden bg-white/60 backdrop-blur-md \${
                          isActive
                            ? "border-brand-orange ring-2 ring-brand-orange/40 shadow-lg shadow-brand-orange/20 opacity-100 scale-100 lg:h-[110px] w-full"
                            : "border-white/10 opacity-50 scale-90 hover:opacity-75 lg:h-[80px] w-[80%]"
                        }\`}
                        title={slide.label}
                        aria-label={\`View slide: \${slide.label}\`}
                        aria-pressed={isActive}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={slide.image}
                            alt={slide.label}
                            fill
                            className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-110"
                            sizes="(max-width: 1024px) 33vw, 360px"
                          />
                          <div className={\`absolute inset-0 transition-colors duration-700 ease-out \${
                            isActive 
                              ? "bg-black/20" 
                              : "bg-black/60 hover:bg-black/40"
                          }\`} />
                          
                          {/* Label overlay aligned bottom left */}
                          <div className={\`absolute inset-0 flex items-center justify-start pl-4 sm:pl-5 transition-all duration-700 ease-out \${
                            isActive ? "opacity-100 translate-x-0" : "opacity-60 -translate-x-2"
                          }\`}>
                            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white uppercase drop-shadow-md text-left leading-tight">
                              {slide.label.split(' ').map((word, idx) => (
                                <span key={idx} className="block">{word}</span>
                              ))}
                            </span>
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </section>

      `;
    contentPage = contentPage.substring(0, startIndexPage) + newThumbnails + contentPage.substring(endIndexPage);
    fs.writeFileSync(pathPage, contentPage, 'utf8');
    console.log('Homepage Hero Thumbnails updated.');
}


// --- COIMBATORE.TSX (HERO ARC + TESTIMONIALS SLIDER) ---
const pathCoimbatore = 'c:/Users/inyma/OneDrive/Desktop/Ajith System Backup/inymart projects/covaitech/covaitech/app/coimbatore/page.tsx';
let contentCoimbatore = fs.readFileSync(pathCoimbatore, 'utf8');

function replaceCoimbatoreSection(startMarker, endMarker, newContent) {
    const startIndex = contentCoimbatore.indexOf(startMarker);
    const endIndex = contentCoimbatore.indexOf(endMarker);
    if (startIndex !== -1 && endIndex !== -1) {
        contentCoimbatore = contentCoimbatore.substring(0, startIndex) + newContent + '\n\n      ' + contentCoimbatore.substring(endIndex);
    } else {
        console.error("Could not find markers:", startMarker, "or", endMarker);
    }
}

// 1. Restore Hero Arc
replaceCoimbatoreSection(
    '{/* Responsive Image Row at Bottom */}',
    '{/* ── SERVICES SECTION (Image 2 Bottom Reference) ── */}',
    `{/* Fan-out Arc of 5 tilted workspace cards at bottom — flex-based responsive */}
        <div className="relative z-20 w-full max-w-5xl mx-auto mt-8 sm:mt-12 px-4 flex-shrink-0">
          {/* Desktop/tablet: absolute positioned fan */}
          <div className="hidden sm:block relative h-[280px] sm:h-[300px] md:h-[340px] w-full">
            {[
              { img: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=400&q=80", label: "Coworking Lounges", rotate: -18, x: "8%", scale: 0.82 },
              { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80", label: "Private Cabins", rotate: -9, x: "22%", scale: 0.91 },
              { img: "/coimbatore.png", label: "Premium Interiors", rotate: 0, x: "50%", scale: 1, active: true },
              { img: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=400&q=80", label: "Meeting Rooms", rotate: 9, x: "78%", scale: 0.91 },
              { img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80", label: "24x7 Access", rotate: 18, x: "92%", scale: 0.82 },
            ].map((card, i) => (
              <div
                key={i}
                className="absolute bottom-0"
                style={{
                  left: card.x,
                  transform: \`translateX(-50%) rotate(\${card.rotate}deg) scale(\${card.scale})\`,
                  transformOrigin: 'bottom center',
                  zIndex: card.active ? 20 : 10 - Math.abs(i - 2),
                }}
              >
                <div
                  className={\`relative w-32 sm:w-36 md:w-44 rounded-2xl overflow-hidden shadow-2xl border \${
                    card.active ? 'border-white/40 ring-2 ring-brand-orange/40' : 'border-white/15'
                  }\`}
                  style={{ height: card.active ? '240px' : '200px' }}
                >
                  <Image src={card.img} alt={card.label} fill sizes="176px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0">
                    <div className="m-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 px-3 py-2">
                      <p className="text-[9px] sm:text-[10px] font-bold text-white text-center leading-tight">{card.label}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: horizontal scroll row (no rotation) */}
          <div className="flex sm:hidden gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { img: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=300&q=80", label: "Lounges" },
              { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80", label: "Cabins" },
              { img: "/coimbatore.png", label: "Interiors" },
              { img: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=300&q=80", label: "Meetings" },
              { img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=300&q=80", label: "24x7" },
            ].map((card, i) => (
              <div key={i} className="flex-shrink-0 w-28 h-40 relative rounded-2xl overflow-hidden border border-white/20 shadow-lg">
                <Image src={card.img} alt={card.label} fill sizes="112px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 px-2 py-2">
                  <p className="text-[9px] font-bold text-white text-center">{card.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>`
);

// 2. Restore Testimonials Slider
replaceCoimbatoreSection(
    '{/* ── TESTIMONIALS SECTION — Premium Slider Carousel ── */}',
    '{/* ── FAQ SECTION (Sleek Minimal Grid Layout) ── */}',
    `{/* ── TESTIMONIALS SECTION — Premium Slider Carousel ── */}
      <section className="py-20 sm:py-28 bg-[#f1f3f6] section-x w-full relative overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-14 relative z-10">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8">
            <div className="space-y-3 text-left">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-[0.3em] block leading-none">
                WHAT OUR MEMBERS SAY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight leading-tight">
                Here's what our happy customers say!
              </h2>
              <div className="flex items-center gap-2 pt-1">
                <div className="text-brand-orange flex items-center gap-0.5 text-base">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <span className="text-sm font-bold text-brand-navy">4.9</span>
                <span className="text-slate-400 text-xs font-normal">· Google Business</span>
              </div>
            </div>

            {/* Carousel Buttons */}
            <div className="flex gap-3 shrink-0">
              <button
                onClick={scrollPrev}
                className="w-12 h-12 rounded-full border border-slate-300 bg-white hover:bg-brand-orange hover:border-brand-orange hover:text-white text-brand-navy flex items-center justify-center shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
                aria-label="Previous Testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={scrollNext}
                className="w-12 h-12 rounded-full border border-slate-300 bg-white hover:bg-brand-orange hover:border-brand-orange hover:text-white text-brand-navy flex items-center justify-center shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
                aria-label="Next Testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Embla Slider Carousel */}
          <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex">
              {[
                { name: "Saravanan", review: "Ready to move office space at the best price. I highly recommend this place if you are planning for an office space in Coimbatore." },
                { name: "Vivek Anand", review: "I'm happy to share this information. It has a friendly atmosphere working in the community space. They provide end to end support and suitable for startup firm, freelancers and large scale business office use." },
                { name: "Vijayakumar Balu", review: "I used this Facility and found to be useful and productive for me. I recommend this facility for freelancers or startups or corporate professionals working remotely." },
                { name: "Dhanush", review: "It is clean and bright place and convenient to work. We Booked conference room for a day to a official business meet, out team is so happy and satisfied with their service." }
              ].map((testimonial, idx) => (
                <div key={idx} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3 min-w-0">
                  <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between relative group">
                    
                    {/* Big quotation icon */}
                    <span className="absolute top-6 right-8 text-6xl text-brand-orange/10 font-serif leading-none select-none pointer-events-none group-hover:text-brand-orange/25 transition-colors duration-300">
                      &ldquo;
                    </span>

                    <div>
                      {/* Star rating */}
                      <div className="flex gap-1 mb-4 text-brand-orange text-sm">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                      <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed -mt-1 italic">
                        &ldquo;{testimonial.review}&rdquo;
                      </p>
                    </div>

                    {/* Member profile */}
                    <div className="mt-8 pt-5 border-t border-slate-100 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-sm shrink-0 border-2 border-brand-orange/20">
                        {testimonial.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                      </div>
                      <div className="text-left">
                        <p className="font-outfit font-bold text-sm text-brand-navy">{testimonial.name}</p>
                        <p className="text-xs text-brand-orange font-semibold">Verified Member</p>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider dots pagination indicator */}
          <div className="flex justify-center gap-2 pt-4">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                className={\`h-2.5 rounded-full transition-all duration-300 cursor-pointer \${
                  selectedIndex === index ? "w-8 bg-brand-orange" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }\`}
                aria-label={\`Go to slide \${index + 1}\`}
              />
            ))}
          </div>

        </div>
      </section>`
);

fs.writeFileSync(pathCoimbatore, contentCoimbatore, 'utf8');
console.log('Coimbatore Hero Arc and Testimonials updated.');
