const fs = require('fs');

const path = 'c:/Users/inyma/OneDrive/Desktop/Ajith System Backup/inymart projects/covaitech/covaitech/app/coimbatore/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Helper to replace section content between two markers
function replaceSection(startMarker, endMarker, newContent) {
    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker);
    if (startIndex !== -1 && endIndex !== -1) {
        content = content.substring(0, startIndex) + newContent + '\n\n      ' + content.substring(endIndex);
    } else {
        console.error("Could not find markers:", startMarker, "or", endMarker);
    }
}

// 1. SERVICES
replaceSection(
    '{/* ── SERVICES SECTION (Image 2 Bottom Reference) ── */}',
    '{/* ── WORKSPACE SOLUTIONS DIRECTORY SECTION (Image 3 Top Style) ── */}',
    `{/* ── SERVICES SECTION (Image 2 Bottom Reference) ── */}
      <section id="plans" className="py-20 sm:py-28 bg-white section-x w-full">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest block border border-brand-orange/30 text-brand-orange w-max px-3 py-1 rounded-sm mx-auto">
              SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight leading-[1.1]">
              Reclaim your energy.<br />Reconnect with yourself
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 flex flex-col h-full hover:border-brand-orange/40 hover:shadow-md transition-all">
                <div className="mb-10 w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                </div>
                <div className="mt-auto">
                  <h3 className="font-outfit font-bold text-lg text-brand-navy mb-2">Dedicated Desk</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Enjoy the comfort of your own dedicated desk in our coworking space. Reserved for you during your membership period. (Starts From INR 6,000/seat/month)</p>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 flex flex-col h-full hover:border-brand-orange/40 hover:shadow-md transition-all">
                <div className="mb-10 w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div className="mt-auto">
                  <h3 className="font-outfit font-bold text-lg text-brand-navy mb-2">Private Office Space</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Ideal for growing teams requiring permanent enclosed desks and local storage with complete privacy.</p>
                </div>
              </div>
            </div>
            <div className="relative min-h-[400px] md:min-h-full rounded-2xl overflow-hidden shadow-sm">
              <Image src="https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&w=600&q=80" alt="Services Image" fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 flex flex-col h-full hover:border-brand-orange/40 hover:shadow-md transition-all">
                <div className="mb-10 w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>
                </div>
                <div className="mt-auto">
                  <h3 className="font-outfit font-bold text-lg text-brand-navy mb-2">Day Pass</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Reserve your seat in our coworking space for individuals and enjoy all the amenities. (Starts From INR 450/seat/day)</p>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 flex flex-col h-full hover:border-brand-orange/40 hover:shadow-md transition-all">
                <div className="mb-10 w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <div className="mt-auto">
                  <h3 className="font-outfit font-bold text-lg text-brand-navy mb-2">Meeting Room</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Integrated tech-ready spaces to host your clients and team members for productive brainstorming sessions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`
);

// 2. DIRECTORY
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
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-6 sm:gap-8">
              {[
                { title: "Virtual Office", desc: "Professional Business Address", img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80" },
                { title: "Event Space", desc: "Spacious Venues for Gatherings", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80" },
                { title: "Training Room", desc: "Corporate Training Setups", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80" }
              ].map((item, i) => (
                <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_33.333%] min-w-0">
                  <div className="group flex flex-col text-left cursor-pointer relative" onClick={() => handleOpenBooking(\`Coimbatore Directory: \${item.title}\`)}>
                    <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-md">
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

// 3. WHY CHOOSE US
replaceSection(
    '{/* ── WHY CHOOSE COVAI TECH PARK — 2-column split layout like image 4 ── */}',
    '{/* ── STATS SECTION — Image 3 Reference ── */}',
    `{/* ── WHY CHOOSE COVAI TECH PARK — 2-column split layout like image 4 ── */}
      <section id="benefits" className="py-20 sm:py-28 bg-slate-50 section-x w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[2.5rem] bg-white shadow-xl">
            <div className="p-10 sm:p-16 lg:p-20 flex flex-col justify-center">
              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest block mb-4 border border-brand-orange/40 w-max px-3 py-1 rounded-sm">
                WHY CHOOSE COVAI TECH PARK
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight leading-[1.1] mb-10">
                A modern approach to<br />coworking
              </h2>
              <div className="space-y-8 mb-12">
                {[
                  { label: "Flexible Plans", desc: "Covai Tech Park offers flexible coworking membership plans that cater to your long-term and short-term workspace needs. Book from a day to a month." },
                  { label: "Cost-effective Workspace", desc: "Coworking spaces at Covai Tech Park are ready-to-use, which significantly reduces the initial investment required to set up your office." },
                  { label: "Maintenance Covered", desc: "Don't worry about maintenance! Our dedicated staff handle regular cleaning and maintenance of the facility." },
                ].map((feat, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-sm text-brand-navy mb-1">{feat.label}</h4>
                    <p className="text-slate-500 text-sm sm:text-sm font-normal leading-relaxed max-w-sm">{feat.desc}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleOpenBooking("Book an appointment")} 
                className="inline-flex items-center gap-3 px-6 py-3 border border-slate-200 hover:border-brand-orange text-brand-navy font-bold text-sm uppercase tracking-wide rounded-full transition-all duration-300 w-max group"
              >
                Book an appointment
                <span className="w-6 h-6 rounded-full bg-brand-navy text-white flex items-center justify-center group-hover:bg-brand-orange transition-colors">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
              </button>
            </div>
            <div className="relative w-full h-[400px] lg:h-auto min-h-[500px]">
              <Image src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80" alt="Modern workspace approach" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>`
);

// 4. STATS
replaceSection(
    '{/* ── STATS SECTION — Image 3 Reference ── */}',
    '{/* ── HELP BANNER ── */}',
    `{/* ── STATS SECTION — Image 3 Reference ── */}
      <section className="w-full min-h-[100vh] flex flex-col justify-center py-16 sm:py-20 border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-4 max-w-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-brand-orange" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">ACHIEVEMENTS AT A GLANCE</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold text-brand-navy tracking-tight leading-[1.1]">
                Our Edge<br />in Excellence
              </h2>
              <p className="text-slate-500 text-sm font-normal leading-relaxed pt-2 pb-4">
                With a diverse range of workspace solutions, premium amenities, and a prime location in Coimbatore, we are committed to delivering exceptional quality infrastructure.
              </p>
              <div className="w-24 h-[1px] bg-slate-300" />
            </div>
            <div className="relative flex items-center justify-center lg:justify-end gap-6 sm:gap-8 lg:pr-8">
              <div className="mt-24">
                <div className="relative w-40 sm:w-48 h-48 sm:h-56 rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] bg-brand-navy">
                  <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-brand-orange" />
                  <div className="absolute inset-0 flex flex-col justify-between p-6 pr-8">
                    <div>
                      <p className="text-[9px] font-bold text-white/70 uppercase tracking-[0.1em] leading-snug">SUBSCRIBERS<br />TRUST US</p>
                    </div>
                    <p className="font-outfit font-bold text-4xl sm:text-5xl text-white leading-none">250+</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 sm:gap-8">
                <div className="relative w-40 sm:w-48 h-48 sm:h-56 rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] bg-brand-navy">
                  <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-brand-orange" />
                  <div className="absolute inset-0 flex flex-col justify-between p-6 pr-8">
                    <p className="text-[9px] font-bold text-white/70 uppercase tracking-[0.1em] leading-snug">LOCATIONS<br />PRIME</p>
                    <p className="font-outfit font-bold text-4xl sm:text-5xl text-white leading-none">8</p>
                  </div>
                </div>
                <div className="relative w-40 sm:w-48 h-48 sm:h-56 rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] bg-brand-navy">
                  <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-brand-orange" />
                  <div className="absolute inset-0 flex flex-col justify-between p-6 pr-8">
                    <p className="text-[9px] font-bold text-white/70 uppercase tracking-[0.1em] leading-snug">EXPERIENCE<br />YEARS</p>
                    <p className="font-outfit font-bold text-4xl sm:text-5xl text-white leading-none">25+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`
);

// 5. AMENITIES
replaceSection(
    '{/* ── AMENITIES SECTION — Mockup Card Grid with Overlapping Circle Icons ── */}',
    '{/* ── TESTIMONIALS SECTION — Premium Slider Carousel ── */}',
    `{/* ── AMENITIES SECTION — Mockup Card Grid with Overlapping Circle Icons ── */}
      <section id="amenities" className="py-20 sm:py-28 bg-white w-full border-b border-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-sm font-bold text-brand-orange uppercase tracking-[0.3em] block leading-none">
              FACILITIES DIRECTORY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-brand-navy tracking-tight">
              Best in Class Amenities
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10">
            {[
              "Furnished Office Space", "Business Class Wi-Fi", "Air-conditioned Environment", 
              "Facility Manager Support", "Cleaning & Maintenance", "Mail & Package Handling", 
              "Front Desk Support", "Parking", "CCTV Surveillance", "Power Backup", 
              "Food Court", "Purified Drinking Water", "Printers", "Security Building Access", 
              "Break-out Area", "Gym"
            ].map((amenity, i) => (
              <div key={i} className="flex flex-col items-center text-center group cursor-default">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.25rem] bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 shadow-sm border border-slate-100 group-hover:scale-110 mb-4 sm:mb-5">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-outfit font-bold text-sm sm:text-sm text-brand-navy tracking-wide">{amenity}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>`
);

// 6. TESTIMONIALS
replaceSection(
    '{/* ── TESTIMONIALS SECTION — Premium Slider Carousel ── */}',
    '{/* ── FAQ SECTION (Sleek Minimal Grid Layout) ── */}',
    `{/* ── TESTIMONIALS SECTION — Premium Slider Carousel ── */}
      <section className="py-20 sm:py-28 bg-slate-50 section-x w-full relative overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center space-y-3 mb-16">
            <span className="text-sm font-bold text-brand-orange uppercase tracking-[0.2em]">COMMUNITY</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-brand-navy">Here's what our happy customers say!</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[
              { name: "Saravanan", review: "Ready to move office space at the best price. I highly recommend this place if you are planning for an office space in Coimbatore." },
              { name: "Vivek Anand", review: "I'm happy to share this information. It has a friendly atmosphere working in the community space. They provide end to end support and suitable for startup firm, freelancers and large scale business office use." },
              { name: "Vijayakumar Balu", review: "I used this Facility and found to be useful and productive for me. I recommend this facility for freelancers or startups or corporate professionals working remotely." },
              { name: "Dhanush", review: "It is clean and bright place and convenient to work. We Booked conference room for a day to a official business meet, out team is so happy and satisfied with their service." }
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col hover:-translate-y-2 transition-transform duration-300">
                <div className="flex text-brand-orange mb-6">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">"{t.review}"</p>
                <div className="flex items-center gap-4 mt-auto border-t border-slate-100 pt-6">
                  <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange font-bold text-lg">{t.name.charAt(0)}</div>
                  <h4 className="font-outfit font-bold text-brand-navy">{t.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>`
);

// 7. FAQs
replaceSection(
    '{/* ── FAQ SECTION (Sleek Minimal Grid Layout) ── */}',
    '{/* ── CONNECT / BOOKING SECTION ── */}',
    `{/* ── FAQ SECTION (Sleek Minimal Grid Layout) ── */}
      <section className="py-20 sm:py-28 bg-white section-x w-full">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.25em]">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-brand-navy">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is there an option to book a coworking space for one day in Coimbatore?", a: "Yes, the shared workspace can be booked for a day in Coimbatore. The terms for using the workspace are highly flexible to meet your short-term and long-term office space needs." },
              { q: "Is there 24/7 access to the coworking space facility?", a: "Yes, the Covai Tech Park’s coworking space facility is accessible 24/7." },
              { q: "Who can benefit from coworking space?", a: "Coworking spaces in Coimbatore are best suited for entrepreneurs, remote workers, freelancers, small-medium enterprises, startups, businesses, and professionals who want to be part of a dynamic community." },
              { q: "Can we host events in this coworking facility?", a: "Yes, Event spaces are available at Covai Tech Park." },
              { q: "What are the benefits of choosing a shared office space in Coimbatore?", a: "Professional working environment at affordable price. Opportunities to network and collaborate. Workspace that is flexible and can be adjusted according to your requirements." },
              { q: "Can we access the coworking space on Sundays?", a: "Certainly! Our coworking space is open throughout the entire week, including Sundays." }
            ].map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl p-2 transition-all">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full p-4 sm:p-5 text-left bg-transparent group"
                >
                  <span className="font-outfit font-bold text-brand-navy text-sm sm:text-base pr-8 group-hover:text-brand-orange transition-colors">{faq.q}</span>
                  <div className={\`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors \${openFaq === i ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-brand-orange/10 group-hover:text-brand-orange'}\`}>
                    <svg className={\`w-4 h-4 transition-transform duration-300 \${openFaq === i ? 'rotate-180' : ''}\`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </button>
                <div className={\`overflow-hidden transition-all duration-300 ease-in-out \${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}\`}>
                  <p className="p-4 sm:p-5 pt-0 text-slate-500 text-sm leading-relaxed border-t border-slate-100 mt-2">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>`
);

fs.writeFileSync(path, content, 'utf8');
console.log("Replaced Coimbatore content with correct text and brand colors.");
