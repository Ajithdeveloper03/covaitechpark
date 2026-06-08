const fs = require('fs');
const path = 'c:/Users/inyma/OneDrive/Desktop/Ajith System Backup/inymart projects/covaitech/covaitech/app/coimbatore/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Coimbatore Hero Images Size Reduction
const heroRegex = /className=\{\`relative shrink-0 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl cursor-pointer \$\{\n\s*card.active \? "w-\[200px\] sm:w-\[240px\] md:w-\[260px\] h-\[240px\] sm:h-\[280px\] md:h-\[300px\] z-20 -translate-y-4 shadow-2xl rounded-3xl" : "w-\[120px\] sm:w-\[160px\] md:w-\[180px\] h-\[160px\] sm:h-\[200px\] md:h-\[220px\] z-10 opacity-70 hover:opacity-100 hover:z-30 rounded-2xl"\n\s*\}\`\}/;

const newHeroClass = `className={\`relative shrink-0 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl cursor-pointer \${
                  card.active ? "w-[140px] sm:w-[180px] md:w-[200px] h-[180px] sm:h-[220px] md:h-[240px] z-20 -translate-y-4 shadow-2xl rounded-[1.5rem]" : "w-[90px] sm:w-[120px] md:w-[140px] h-[120px] sm:h-[150px] md:h-[170px] z-10 opacity-70 hover:opacity-100 hover:z-30 rounded-[1.2rem]"
                }\`}`;
content = content.replace(heroRegex, newHeroClass);


// 2. Coimbatore Stats Section (Image 3)
const statsRegex = /\{\/\* ── STATS SECTION — Full VH Light cream bg, left heading, right staggered navy cards \(image 2 ref\) ── \*\/\}[\s\S]*?\{\/\* ── HELP BANNER ── \*\/\}/;

const newStats = `{/* ── STATS SECTION — Image 3 Reference ── */}
      <section className="w-full min-h-[100vh] flex flex-col justify-center py-16 sm:py-20 border-t border-slate-100" style={{ background: '#f5f6f4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: Heading + text + divider */}
            <div className="space-y-4 max-w-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-[#0055ff]" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">ACHIEVEMENTS AT A GLANCE</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold text-[#0f1f3a] tracking-tight leading-[1.1]">
                Our Edge<br />in Excellence
              </h2>
              <p className="text-slate-500 text-sm font-normal leading-relaxed pt-2 pb-4">
                With decades of industry experience, a diverse range of workspace solutions, and a dedicated team, we are committed to delivering exceptional quality infrastructure.
              </p>
              <div className="w-24 h-[1px] bg-slate-300" />
            </div>

            {/* Right: Staggered 3 stat cards — EXACTLY like image 3 */}
            <div className="relative flex items-center justify-center lg:justify-end gap-6 sm:gap-8 lg:pr-8">

              {/* Left Column (1 card shifted down) */}
              <div className="mt-24">
                <div className="relative w-40 sm:w-48 h-48 sm:h-56 rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] bg-[#101b3b]">
                  <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-[#0070f3]" />
                  <div className="absolute inset-0 flex flex-col justify-between p-6 pr-8">
                    <div>
                      <p className="text-[9px] font-bold text-white/70 uppercase tracking-[0.1em] leading-snug">SUBSCRIBERS<br />TRUST US</p>
                    </div>
                    <p className="font-outfit font-bold text-4xl sm:text-5xl text-white leading-none">250+</p>
                  </div>
                </div>
              </div>

              {/* Right Column (2 cards) */}
              <div className="flex flex-col gap-6 sm:gap-8">
                {/* Card 2 top */}
                <div className="relative w-40 sm:w-48 h-48 sm:h-56 rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] bg-[#101b3b]">
                  <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-[#0070f3]" />
                  <div className="absolute inset-0 flex flex-col justify-between p-6 pr-8">
                    <p className="text-[9px] font-bold text-white/70 uppercase tracking-[0.1em] leading-snug">PRODUCTS<br />HIGH-QUALITY</p>
                    <p className="font-outfit font-bold text-4xl sm:text-5xl text-white leading-none">60+</p>
                  </div>
                </div>

                {/* Card 3 bottom */}
                <div className="relative w-40 sm:w-48 h-48 sm:h-56 rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] bg-[#101b3b]">
                  <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-[#0070f3]" />
                  <div className="absolute inset-0 flex flex-col justify-between p-6 pr-8">
                    <p className="text-[9px] font-bold text-white/70 uppercase tracking-[0.1em] leading-snug">EXPERIENCE<br />YEARS</p>
                    <p className="font-outfit font-bold text-4xl sm:text-5xl text-white leading-none">25+</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── HELP BANNER ── */}`;
content = content.replace(statsRegex, newStats);

// 3. Coimbatore Why Choose Us (Image 2 Top)
const whyRegex = /\{\/\* ── WHY CHOOSE US SECTION \(Image 1 Style\) ── \*\/\}[\s\S]*?\{\/\* ── STATS DIVIDER ── \*\/\}/;

const newWhy = `{/* ── WHY CHOOSE US SECTION (Image 2 Top Reference) ── */}
      <section id="benefits" className="py-20 sm:py-28 bg-[#f5f4ef] section-x w-full">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[2.5rem] bg-white shadow-xl">
            
            {/* Left: Text block card */}
            <div className="p-10 sm:p-16 lg:p-20 flex flex-col justify-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-4 border border-slate-200 w-max px-3 py-1 rounded-sm">
                WHY CHOOSE US
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-slate-900 tracking-tight leading-[1.1] mb-10">
                A modern approach to<br />emotional wealth
              </h2>

              <div className="space-y-8 mb-12">
                {[
                  { label: "Flexible Plans", desc: "Covai Tech Park offers flexible coworking membership plans that cater to your long-term and short-term workspace needs. You can book our coworking space starting from a day, a week, or a month." },
                  { label: "Cost-effective Workspace Solution", desc: "Coworking space at Covai Tech Park business center are ready-to-use, which significantly reduce the initial investment required to set up your office space in Coimbatore." },
                  { label: "Maintenance Covered", desc: "Don't worry about the maintenance of your office space - we've got you covered! Our dedicated staff handle regular cleaning and maintenance to keep your workspace fresh and fully functional." },
                ].map((feat, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-sm text-slate-900 mb-1">{feat.label}</h4>
                    <p className="text-slate-500 text-sm sm:text-sm font-normal leading-relaxed max-w-sm">{feat.desc}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleOpenBooking("Book an appointment")} 
                className="inline-flex items-center gap-3 px-6 py-3 border border-slate-200 hover:border-brand-orange text-slate-900 font-bold text-sm uppercase tracking-wide rounded-full transition-all duration-300 w-max group"
              >
                Book an appointment
                <span className="w-6 h-6 rounded-full bg-[#6a6c53] text-white flex items-center justify-center group-hover:bg-brand-orange transition-colors">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Right: Large Image */}
            <div className="relative w-full h-[400px] lg:h-auto min-h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
                alt="Modern workspace approach"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

          </div>

        </div>
      </section>

      {/* ── STATS DIVIDER ── */}`;
content = content.replace(whyRegex, newWhy);


// 4. Coimbatore Services Section (Image 2 Bottom)
const servicesRegex = /\{\/\* ── CORE SPACE SOLUTIONS SECTION \(Image 2 Bottom Style\) ── \*\/\}[\s\S]*?\{\/\* ── WORKSPACE SOLUTIONS DIRECTORY SECTION \(Image 3 Top Style\) ── \*\/\}/;

const newServices = `{/* ── SERVICES SECTION (Image 2 Bottom Reference) ── */}
      <section id="plans" className="py-20 sm:py-28 bg-[#fdfaf5] section-x w-full">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block border border-slate-200 w-max px-3 py-1 rounded-sm mx-auto">
              SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-slate-900 tracking-tight leading-[1.1]">
              Reclaim your energy.<br />Reconnect with yourself
            </h2>
          </div>

          {/* Grid Layout matches Image 2 (left cards, center img, right cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* Left Column: 2 Cards */}
            <div className="flex flex-col gap-6 lg:gap-8">
              {/* Card 1 */}
              <div className="bg-[#f5f4ef] rounded-2xl p-8 flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="mb-10 text-[#6a6c53]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v4l3 3"/>
                  </svg>
                </div>
                <div className="mt-auto">
                  <h3 className="font-outfit font-bold text-lg text-slate-900 mb-2">Dedicated Desk</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Enjoy the comfort of your own dedicated desk in our coworking space. The desk is reserved for you at a specific spot.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#f5f4ef] rounded-2xl p-8 flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="mb-10 text-[#6a6c53]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="mt-auto">
                  <h3 className="font-outfit font-bold text-lg text-slate-900 mb-2">Private Cabins</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Ideal for growing teams requiring permanent enclosed desks and local storage with complete privacy.
                  </p>
                </div>
              </div>
            </div>

            {/* Center Column: Tall Image */}
            <div className="relative min-h-[400px] md:min-h-full rounded-2xl overflow-hidden shadow-sm">
              <Image 
                src="https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&w=600&q=80" 
                alt="Services Image" 
                fill 
                className="object-cover"
              />
            </div>

            {/* Right Column: 2 Cards */}
            <div className="flex flex-col gap-6 lg:gap-8">
              {/* Card 3 */}
              <div className="bg-[#f5f4ef] rounded-2xl p-8 flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="mb-10 text-[#6a6c53]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <line x1="3" y1="9" x2="21" y2="9"/>
                  </svg>
                </div>
                <div className="mt-auto">
                  <h3 className="font-outfit font-bold text-lg text-slate-900 mb-2">Day Pass</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Reserve your seat in our coworking space and enjoy all the amenities with the flexibility to use it your way.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-[#f5f4ef] rounded-2xl p-8 flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="mb-10 text-[#6a6c53]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <div className="mt-auto">
                  <h3 className="font-outfit font-bold text-lg text-slate-900 mb-2">Meeting Rooms</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Integrated tech-ready spaces to host your clients and team members for productive brainstorming sessions.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WORKSPACE SOLUTIONS DIRECTORY SECTION (Image 3 Top Style) ── */}`;
content = content.replace(servicesRegex, newServices);

fs.writeFileSync(path, content, 'utf8');
console.log('Updated Coimbatore UI references successfully!');
