const fs = require('fs');

let content = fs.readFileSync('app/page.tsx', 'utf8');

const targetStr = `            <div className="relative flex items-stretch gap-6 w-full lg:max-w-[320px] xl:max-w-[360px]">
              
              {/* Vertical Timeline Dot Connector (Desktop only) */}
              <div className="absolute left-1.5 top-[15%] bottom-[15%] w-[1px] bg-white/15 hidden lg:block z-0 pointer-events-none" />

              <div className="w-full flex flex-row lg:flex-col gap-3 sm:gap-4 lg:gap-5 justify-between items-center relative z-10">
                {HERO_SLIDES.map((slide, i) => {
                  let dist = (i - activeHeroSlide) % HERO_SLIDES.length;
                  if (dist < 0) dist += HERO_SLIDES.length;

                  const isActive = dist === 0;
                  const isVisible = dist < 3;
                  const isHidden = dist >= 3;

                  return (
                    <div 
                      key={slide.id} 
                      className={\`flex items-center gap-4 sm:gap-5 w-full group justify-center lg:justify-end transition-all duration-700 ease-in-out \${
                        isHidden 
                          ? "opacity-15 lg:opacity-25 scale-90 translate-x-3 lg:translate-x-6 z-0 pointer-events-none" 
                          : "opacity-100 scale-100 translate-x-0 z-10"
                      }\`}
                      style={{ 
                        order: dist,
                        marginTop: isHidden ? "-10px" : "0",
                        marginBottom: isHidden ? "-10px" : "0"
                      }}
                    >
                      
                      {/* Timeline Dot (Desktop only) */}
                      <div className={\`relative flex items-center justify-center shrink-0 w-4 h-4 hidden lg:flex transition-opacity duration-700 \${isHidden ? "opacity-0" : "opacity-100"}\`}>
                        <div className={\`rounded-full transition-all duration-500 \${
                          isActive 
                            ? "w-2.5 h-2.5 bg-brand-orange ring-4 ring-brand-orange/30 scale-125" 
                            : "w-1.5 h-1.5 bg-white/45 group-hover:bg-white"
                        }\`} />
                      </div>

                      {/* Thumbnail Card Button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (isHidden) return;
                          setActiveHeroSlide(i);
                          setIsAutoPlay(false);
                        }}
                        className={\`relative w-full aspect-[16/10] lg:aspect-auto rounded-xl sm:rounded-2xl border font-bold transition-all duration-700 cursor-pointer overflow-hidden bg-white/60 backdrop-blur-md \${
                          isActive
                            ? "border-brand-orange ring-2 ring-brand-orange/40 shadow-lg shadow-brand-orange/20 scale-102 lg:scale-105 z-10 lg:h-[110px]"
                            : isHidden
                              ? "border-transparent lg:h-[60px]"
                              : "border-white/15 opacity-100 hover:border-white/30 lg:h-[100px]"
                        }\`}
                        title={slide.label}
                        aria-label={\`View slide: \${slide.label}\`}
                        aria-pressed={isActive}
                        tabIndex={isHidden ? -1 : 0}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={slide.image}
                            alt={slide.label}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 33vw, 360px"
                          />
                          <div className={\`absolute inset-0 transition-colors duration-500 \${isHidden ? "bg-black/70" : "bg-[black]/55 group-hover:bg-[#2b3748]/30"}\`} />
                          
                          {/* Label overlay aligned bottom left */}
                          <div className={\`absolute inset-0 flex items-center justify-start pl-4 sm:pl-5 transition-opacity duration-500 \${isHidden ? "opacity-0" : "opacity-100"}\`}>
                            <span className="text-[10px] sm:text-sm font-normal tracking-widest text-white uppercase drop-shadow-md">
                              {slide.label}
                            </span>
                          </div>
                        </div>
                      </button>

                    </div>
                  );
                })}
              </div>
            </div>`;

const replacementStr = `            <div className="relative flex items-center justify-center w-full lg:max-w-[320px] xl:max-w-[360px] h-[160px] sm:h-[180px] lg:h-[400px]">
              
              {/* Vertical Timeline Dot Connector (Desktop only) */}
              <div className="absolute left-1.5 top-[15%] bottom-[15%] w-[1px] bg-white/15 hidden lg:block z-0 pointer-events-none" />

              <style>{\`
                .hero-thumb-slide {
                  --tx: 105%;
                  --ty: 0px;
                  transform: translate(calc(var(--tx) * var(--offset)), calc(var(--ty) * var(--offset))) scale(var(--scale));
                }
                @media (min-width: 1024px) {
                  .hero-thumb-slide {
                    --tx: 0px;
                    --ty: 120px;
                  }
                }
              \`}</style>

              <div className="w-full flex justify-center lg:justify-end items-center relative z-10 h-full">
                {HERO_SLIDES.map((slide, i) => {
                  let d = i - activeHeroSlide;
                  if (d > 2) d -= 5;
                  if (d < -2) d += 5;

                  const isActive = d === 0;
                  const isVisible = Math.abs(d) <= 1;

                  return (
                    <div 
                      key={slide.id} 
                      className={\`hero-thumb-slide absolute flex items-center gap-4 sm:gap-5 w-[75%] sm:w-[260px] lg:w-full group justify-center lg:justify-end transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]\`}
                      style={{ 
                        '--offset': d,
                        '--scale': isActive ? 1 : isVisible ? 0.85 : 0.6,
                        opacity: isVisible ? (isActive ? 1 : 0.4) : 0,
                        zIndex: isActive ? 20 : 10 - Math.abs(d),
                        pointerEvents: isVisible ? 'auto' : 'none'
                      } as React.CSSProperties}
                    >
                      
                      {/* Timeline Dot (Desktop only) */}
                      <div className={\`relative flex items-center justify-center shrink-0 w-4 h-4 hidden lg:flex transition-opacity duration-700 \${isActive ? "opacity-100" : "opacity-40"}\`}>
                        <div className={\`rounded-full transition-all duration-500 \${
                          isActive 
                            ? "w-2.5 h-2.5 bg-brand-orange ring-4 ring-brand-orange/30 scale-125" 
                            : "w-1.5 h-1.5 bg-white/45 group-hover:bg-white"
                        }\`} />
                      </div>

                      {/* Thumbnail Card Button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (!isVisible) return;
                          setActiveHeroSlide(i);
                          setIsAutoPlay(false);
                        }}
                        className={\`relative w-full aspect-[16/10] lg:aspect-auto lg:h-[100px] xl:h-[110px] rounded-xl sm:rounded-2xl border font-bold transition-all duration-700 cursor-pointer overflow-hidden bg-white/60 backdrop-blur-md \${
                          isActive
                            ? "border-brand-orange ring-2 ring-brand-orange/40 shadow-lg shadow-brand-orange/20"
                            : "border-white/15 hover:border-white/30"
                        }\`}
                        title={slide.label}
                        aria-label={\`View slide: \${slide.label}\`}
                        aria-pressed={isActive}
                        tabIndex={isVisible ? 0 : -1}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={slide.image}
                            alt={slide.label}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 33vw, 360px"
                          />
                          <div className={\`absolute inset-0 transition-colors duration-500 \${isActive ? "bg-[black]/55 group-hover:bg-[#2b3748]/30" : "bg-black/60"}\`} />
                          
                          {/* Label overlay aligned bottom left */}
                          <div className={\`absolute inset-0 flex items-center justify-start pl-4 sm:pl-5 transition-opacity duration-500 \${isActive ? "opacity-100" : "opacity-40"}\`}>
                            <span className="text-[10px] sm:text-sm font-normal tracking-widest text-white uppercase drop-shadow-md">
                              {slide.label}
                            </span>
                          </div>
                        </div>
                      </button>

                    </div>
                  );
                })}
              </div>
            </div>`;

if (!content.includes('opacity-15 lg:opacity-25 scale-90 translate-x-3')) {
  console.log('Target string not found!');
  fs.writeFileSync('target_not_found.log', targetStr, 'utf8');
} else {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync('app/page.tsx', content, 'utf8');
  console.log('Thumbnail animation updated successfully!');
}
