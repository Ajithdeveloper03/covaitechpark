const fs = require('fs');
const path = 'c:/Users/inyma/OneDrive/Desktop/Ajith System Backup/inymart projects/covaitech/covaitech/app/coimbatore/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix Hero images size
const heroRegex = /className=\{\`relative shrink-0 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl cursor-pointer \$\{\n\s*card.active \? "w-\[240px\] sm:w-\[280px\] md:w-\[320px\] h-\[320px\] sm:h-\[380px\] md:h-\[440px\] z-20 -translate-y-4 shadow-2xl rounded-3xl" : "w-\[160px\] sm:w-\[200px\] md:w-\[220px\] h-\[220px\] sm:h-\[280px\] md:h-\[320px\] z-10 opacity-70 hover:opacity-100 hover:z-30 rounded-2xl"\n\s*\}\`\}/;

const newHeroClass = `className={\`relative shrink-0 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl cursor-pointer \${
                  card.active ? "w-[200px] sm:w-[240px] md:w-[260px] h-[240px] sm:h-[280px] md:h-[300px] z-20 -translate-y-4 shadow-2xl rounded-3xl" : "w-[120px] sm:w-[160px] md:w-[180px] h-[160px] sm:h-[200px] md:h-[220px] z-10 opacity-70 hover:opacity-100 hover:z-30 rounded-2xl"
                }\`}`;
content = content.replace(heroRegex, newHeroClass);


// 2. Fix Stats section
const statsRegex = /\{\/\* Right: Staggered 3 stat cards — exactly like image 2 \*\/\}[\s\S]*?\{\/\* ── HELP BANNER ── \*\/\}/;

const newStats = `{/* Right: Staggered 3 stat cards — exactly like image 2 */}
            <div className="relative flex items-center justify-center lg:justify-end gap-5 sm:gap-6">

              {/* Card 1 (tall, center) — 650+ Businesses */}
              <div className="relative flex-shrink-0 w-48 sm:w-56 rounded-3xl overflow-hidden shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #1a2a4a 0%, #0f1e3d 100%)', height: '320px' }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-orange rounded-l-3xl" />
                <div className="absolute inset-0 flex flex-col justify-between p-6 pl-8">
                  <div>
                    <p className="text-[10px] font-bold text-white/55 uppercase tracking-[0.2em] leading-tight mt-2">BUSINESSES<br />TRUST US</p>
                  </div>
                  <p className="font-outfit font-bold text-6xl sm:text-7xl text-white leading-none mb-2">650+</p>
                </div>
              </div>

              {/* Right column: 2 smaller stacked cards */}
              <div className="flex flex-col gap-5 sm:gap-6">

                {/* Card 2 top */}
                <div className="relative flex-shrink-0 w-44 sm:w-48 rounded-3xl overflow-hidden shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #1a2a4a 0%, #0f1e3d 100%)', height: '148px' }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-orange rounded-l-3xl" />
                  <div className="absolute inset-0 flex flex-col justify-between p-5 pl-7">
                    <p className="text-[10px] font-bold text-white/55 uppercase tracking-[0.2em] leading-tight">PREMIUM<br />WORKSPACES</p>
                    <p className="font-outfit font-bold text-4xl text-white leading-none">60+</p>
                  </div>
                </div>

                {/* Card 3 bottom */}
                <div className="relative flex-shrink-0 w-44 sm:w-48 rounded-3xl overflow-hidden shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #1a2a4a 0%, #0f1e3d 100%)', height: '148px' }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-orange rounded-l-3xl" />
                  <div className="absolute inset-0 flex flex-col justify-between p-5 pl-7">
                    <p className="text-[10px] font-bold text-white/55 uppercase tracking-[0.2em] leading-tight">EXPERIENCE<br />YEARS</p>
                    <p className="font-outfit font-bold text-4xl text-white leading-none">8+</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── HELP BANNER ── */}`;
content = content.replace(statsRegex, newStats);

// 3. Fix Directory Section
const dirRegex = /<div className="flex gap-8">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/;

const newDir = `<div className="flex gap-6 sm:gap-8">
              
              {[
                { title: "Private Office Space", desc: "Premium Enclosed Cabins", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" },
                { title: "Virtual Office", desc: "Professional Business Address", img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80" },
                { title: "Meeting Room", desc: "Smart Conference Facilities", img: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=600&q=80" },
                { title: "Event Space", desc: "Spacious Venues for Gatherings", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80" },
                { title: "Training Room", desc: "Corporate Training Setups", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80" }
              ].map((item, i) => (
                <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                  <div className="group flex flex-col text-left cursor-pointer relative" onClick={() => handleOpenBooking(\`Coimbatore Directory: \${item.title}\`)}>
                    <div className="relative w-full aspect-[4/3] sm:aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-md">
                      <Image 
                        src={item.img} 
                        alt={item.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Glassmorphism Bottom Content */}
                      <div className="absolute bottom-0 left-0 w-full bg-white/10 backdrop-blur-md border-t border-white/20 p-5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
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
      </section>`;

content = content.replace(dirRegex, newDir);

fs.writeFileSync(path, content, 'utf8');
console.log('Updated Coimbatore UI successfully!');
