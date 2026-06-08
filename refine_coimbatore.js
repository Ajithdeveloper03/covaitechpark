const fs = require('fs');
const path = 'c:/Users/inyma/OneDrive/Desktop/Ajith System Backup/inymart projects/covaitech/covaitech/app/coimbatore/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Helper
function replaceSection(startMarker, endMarker, newContent) {
    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker);
    if (startIndex !== -1 && endIndex !== -1) {
        content = content.substring(0, startIndex) + newContent + '\n\n      ' + content.substring(endIndex);
    } else {
        console.error("Could not find markers:", startMarker, "or", endMarker);
    }
}

// 1. Directory Section (No Slider, Fully Adopted Grid)
replaceSection(
    '{/* ── WORKSPACE SOLUTIONS DIRECTORY SECTION (Image 3 Top Style) ── */}',
    '{/* ── WHY CHOOSE COVAI TECH PARK — 2-column split layout like image 4 ── */}',
    `{/* ── WORKSPACE SOLUTIONS DIRECTORY SECTION (Image 3 Top Style) ── */}
      <section className="py-20 sm:py-28 bg-slate-50 section-x w-full border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-slate-200 pb-8">
            <div className="max-w-xl space-y-2 text-left">
              <span className="text-sm font-bold text-brand-orange uppercase tracking-[0.25em] block">
                OTHER WORKSPACE SOLUTIONS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight leading-[1.1]">
                Versatile setups for <br className="hidden sm:block" />every work style
              </h2>
            </div>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
              {[
                { title: "Virtual Office", desc: "Professional Business Address", img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80" },
                { title: "Event Space", desc: "Spacious Venues for Gatherings", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80" },
                { title: "Training Room", desc: "Corporate Training Setups", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80" }
              ].map((item, i) => (
                <div key={i} className="w-full">
                  <div className="group flex flex-col text-left cursor-pointer relative h-full" onClick={() => handleOpenBooking(\`Coimbatore Directory: \${item.title}\`)}>
                    <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-md h-full">
                      <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 w-full bg-brand-navy/60 backdrop-blur-md border-t border-white/20 p-5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <h3 className="font-outfit font-bold text-xl sm:text-2xl text-white mb-1 drop-shadow-sm">{item.title}</h3>
                        <p className="text-white/90 text-sm font-normal drop-shadow-sm">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>`
);

// 2. Why Choose Us Section (More Beautiful)
replaceSection(
    '{/* ── WHY CHOOSE COVAI TECH PARK — 2-column split layout like image 4 ── */}',
    '{/* ── STATS SECTION — Image 3 Reference ── */}',
    `{/* ── WHY CHOOSE COVAI TECH PARK — 2-column split layout like image 4 ── */}
      <section id="benefits" className="py-20 sm:py-28 bg-slate-50 section-x w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[2.5rem] bg-white shadow-xl border border-slate-100">
            <div className="p-10 sm:p-16 lg:p-20 flex flex-col justify-center">
              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest block mb-4 border border-brand-orange/40 w-max px-3 py-1 rounded-full bg-brand-orange/5">
                WHY CHOOSE COVAI TECH PARK
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight leading-[1.1] mb-12">
                A modern approach to<br />coworking
              </h2>
              <div className="space-y-4 mb-12">
                {[
                  { label: "Flexible Plans", desc: "Covai Tech Park offers flexible coworking membership plans that cater to your long-term and short-term workspace needs. Book from a day to a month.", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6" },
                  { label: "Cost-effective Workspace", desc: "Coworking spaces at Covai Tech Park are ready-to-use, which significantly reduces the initial investment required to set up your office.", icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" },
                  { label: "Maintenance Covered", desc: "Don't worry about maintenance! Our dedicated staff handle regular cleaning and maintenance of the facility.", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-5 p-5 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                    <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d={feat.icon} /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-brand-navy mb-1.5">{feat.label}</h4>
                      <p className="text-slate-500 text-sm font-normal leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleOpenBooking("Book an appointment")} 
                className="inline-flex items-center gap-3 px-8 py-4 bg-brand-navy hover:bg-brand-orange text-white font-bold text-sm uppercase tracking-widest rounded-full transition-all duration-300 w-max shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Book an appointment
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
            <div className="relative w-full h-[400px] lg:h-auto min-h-[500px]">
              <Image src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80" alt="Modern workspace approach" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>`
);

// 3. Amenities Section (Restore Image Design)
replaceSection(
    '{/* ── AMENITIES SECTION — Mockup Card Grid with Overlapping Circle Icons ── */}',
    '{/* ── TESTIMONIALS SECTION — Premium Slider Carousel ── */}',
    `{/* ── AMENITIES SECTION — Mockup Card Grid with Overlapping Circle Icons ── */}
      <section id="amenities" className="py-20 sm:py-28 bg-[#f8fafc] w-full border-b border-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-sm font-bold text-brand-orange uppercase tracking-[0.3em] block leading-none">
              FACILITIES DIRECTORY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight">
              Best in Class Amenities
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
              Everything your organization needs is covered. Zero maintenance overhead, zero setup complications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Furnished Office Space", desc: "Fully furnished workspaces ready for you to move in." },
              { name: "Business Class Wi-Fi", desc: "High-speed secure internet connectivity across the campus." },
              { name: "Air-conditioned", desc: "Centralized air conditioning for a comfortable environment." },
              { name: "Facility Manager Support", desc: "Dedicated support team for your operational needs." },
              { name: "Cleaning & Maintenance", desc: "Regular sanitization and upkeep of all premises." },
              { name: "Mail & Package Handling", desc: "Professional reception services for your deliveries." },
              { name: "Parking", desc: "Ample secure parking space for members and visitors." },
              { name: "CCTV Surveillance", desc: "24/7 security monitoring for complete safety." },
              { name: "Power Backup", desc: "100% DG power backup ensuring zero downtime." },
              { name: "Food Court", desc: "In-house cafeteria serving hygienic and tasty meals." },
              { name: "Purified Drinking Water", desc: "RO purified water dispensers available on all floors." },
              { name: "Gym", desc: "Fully equipped fitness center for member wellness." }
            ].map((amenity, i) => {
              const imagesList = [
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1521791136364-728647526959?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1506521788723-868114856b3e?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80"
              ];
              const imageUrl = imagesList[i % imagesList.length];

              return (
                <div key={i} className="group bg-white rounded-3xl overflow-hidden border border-slate-200/70 shadow-sm hover:shadow-xl hover:border-brand-orange/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image src={imageUrl} alt={amenity.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                  </div>
                  <div className="relative px-6">
                    <div className="w-12 h-12 -mt-6 mb-2 relative z-20 rounded-full border-4 border-white shadow-md flex items-center justify-center bg-brand-orange text-white group-hover:bg-[#d96010] transition-colors duration-300">
                      <svg className="w-5 h-5 stroke-[1.8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2 flex flex-col justify-between flex-grow">
                    <div className="space-y-2">
                      <h3 className="font-outfit font-bold text-lg text-brand-navy group-hover:text-brand-orange transition-colors duration-200 text-left">
                        {amenity.name}
                      </h3>
                      <p className="text-slate-500 text-sm sm:text-sm font-normal leading-relaxed text-left">
                        {amenity.desc}
                      </p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-slate-100 flex justify-start">
                      <span className="inline-flex items-center gap-1.5 text-sm font-black uppercase tracking-wider text-brand-orange group-hover:gap-2.5 transition-all duration-300">
                        Learn more <span className="text-sm font-bold">&rarr;</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>`
);

fs.writeFileSync(path, content, 'utf8');
console.log('Refined Coimbatore UI elements successfully!');
