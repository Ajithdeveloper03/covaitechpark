const fs = require('fs');

// --- PAGE.TSX TWEAKS ---
const pathPage = 'c:/Users/inyma/OneDrive/Desktop/Ajith System Backup/inymart projects/covaitech/covaitech/app/page.tsx';
let contentPage = fs.readFileSync(pathPage, 'utf8');

// 1. Transparent Header
contentPage = contentPage.replace(
    `isScrolled
            ? "fixed top-0 bg-white backdrop-blur-md shadow-md border-b border-slate-100 py-2.5 lg:py-3.5"
            : "absolute top-0 bg-white shadow-sm border-b border-slate-100 py-3 lg:py-4"`,
    `isScrolled
            ? "fixed top-0 bg-white backdrop-blur-md shadow-md border-b border-slate-100 py-2.5 lg:py-3.5"
            : "absolute top-0 bg-transparent py-3 lg:py-4"`
);

contentPage = contentPage.replace(
    `className="hidden xl:flex items-center gap-8 text-[12px] font-medium tracking-widest uppercase mx-auto transition-colors duration-300 text-slate-700"`,
    `className={\`hidden xl:flex items-center gap-8 text-[12px] font-medium tracking-widest uppercase mx-auto transition-colors duration-300 \${isScrolled ? 'text-slate-700' : 'text-white/95'}\`}`
);

// 2. Awards Section Full VH
contentPage = contentPage.replace(
    `<section className="bg-brand-navy py-16 sm:py-24 w-full text-white relative overflow-hidden section-x">`,
    `<section className="bg-brand-navy min-h-[100vh] flex flex-col justify-center py-16 sm:py-24 w-full text-white relative overflow-hidden section-x">`
);

// 3. Hero Thumbnails logic to exactly show 3 out of 5
contentPage = contentPage.replace(
    `const isHidden = i === (activeHeroSlide + 2) % HERO_SLIDES.length;`,
    `const distance = Math.min(Math.abs(activeHeroSlide - i), HERO_SLIDES.length - Math.abs(activeHeroSlide - i));
                  const isHidden = distance > 1;`
);

fs.writeFileSync(pathPage, contentPage, 'utf8');
console.log('page.tsx tweaks applied!');

// --- COIMBATORE.TSX HERO ARC ---
const pathCoim = 'c:/Users/inyma/OneDrive/Desktop/Ajith System Backup/inymart projects/covaitech/covaitech/app/coimbatore/page.tsx';
let contentCoim = fs.readFileSync(pathCoim, 'utf8');

const arcStart = '{/* Fan-out Arc of 5 tilted workspace cards at bottom — flex-based responsive */}';
const arcEnd = '{/* ── SERVICES SECTION (Image 2 Bottom Reference) ── */}';

const startIndexArc = contentCoim.indexOf(arcStart);
const endIndexArc = contentCoim.indexOf(arcEnd);

if (startIndexArc !== -1 && endIndexArc !== -1) {
    const newArc = `{/* Fan-out Arc of 5 tilted workspace cards at bottom — flex-based responsive */}
        <div className="relative z-20 w-full max-w-5xl mx-auto mt-12 sm:mt-20 px-4 flex-shrink-0 h-[220px] sm:h-[260px] md:h-[300px]">
          {/* Desktop/tablet: absolute positioned fan */}
          <div className="hidden sm:block relative w-full h-full">
            {[
              { img: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=400&q=80", rotate: -32, active: false },
              { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80", rotate: -16, active: false },
              { img: "/coimbatore.png", rotate: 0, active: true },
              { img: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=400&q=80", rotate: 16, active: false },
              { img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80", rotate: 32, active: false },
            ].map((card, i) => (
              <div
                key={i}
                className="absolute bottom-0 left-1/2"
                style={{
                  transform: \`translateX(-50%) rotate(\${card.rotate}deg)\`,
                  transformOrigin: 'bottom center',
                  zIndex: card.active ? 30 : 20 - Math.abs(i - 2),
                }}
              >
                <div
                  className={\`relative w-36 sm:w-44 md:w-56 rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 \${
                    card.active ? 'border-4 border-brand-orange ring-4 ring-brand-orange/20 scale-105' : 'border-4 border-white/90 scale-95'
                  }\`}
                  style={{ height: card.active ? '280px' : '250px' }}
                >
                  <Image src={card.img} alt="Workspace" fill sizes="224px" className="object-cover" />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: horizontal scroll row (no rotation) */}
          <div className="flex sm:hidden gap-3 overflow-x-auto pb-2 scrollbar-hide items-end justify-center">
            {[
              { img: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=300&q=80" },
              { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80" },
              { img: "/coimbatore.png", active: true },
              { img: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=300&q=80" },
              { img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=300&q=80" },
            ].map((card, i) => (
              <div key={i} className={\`flex-shrink-0 w-28 relative rounded-[1.5rem] overflow-hidden shadow-lg border-2 \${card.active ? 'border-brand-orange h-44' : 'border-white h-36'}\`}>
                <Image src={card.img} alt="Workspace" fill sizes="112px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      `;
    contentCoim = contentCoim.substring(0, startIndexArc) + newArc + contentCoim.substring(endIndexArc);
    fs.writeFileSync(pathCoim, contentCoim, 'utf8');
    console.log('coimbatore/page.tsx hero arc tweaks applied!');
} else {
    console.log('Could not find Coimbatore Arc section markers!');
}
