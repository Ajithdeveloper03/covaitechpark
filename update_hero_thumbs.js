const fs = require('fs');
const pathPage = 'c:/Users/inyma/OneDrive/Desktop/Ajith System Backup/inymart projects/covaitech/covaitech/app/page.tsx';
let contentPage = fs.readFileSync(pathPage, 'utf8');

// Replace Thumbnails Section in app/page.tsx
const startMarker = '{/* Slide thumbnails — vertical list with vertical dot line on desktop */}';
const endMarker = '{/* End Hero */}';

const startIndex = contentPage.indexOf(startMarker);
const endIndex = contentPage.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const newThumbnails = `{/* Slide thumbnails — vertical list with vertical dot line on desktop */}
          <div className="lg:col-span-5 w-full z-20 flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
            <div className="relative flex items-stretch gap-6 w-full lg:max-w-[320px] xl:max-w-[360px]">
              
              {/* Vertical Timeline Dot Connector (Desktop only) */}
              <div className="absolute left-1.5 top-[10%] bottom-[10%] w-[1px] bg-white/15 hidden lg:block z-0 pointer-events-none" />

              <div className="w-full flex flex-row lg:flex-col justify-center items-center relative z-10 overflow-hidden no-scrollbar pb-4 lg:pb-0 px-4 lg:px-0">
                {HERO_SLIDES.map((slide, i) => {
                  const isActive = activeHeroSlide === i;
                  
                  // Hide the item directly opposite in a 4-item array to always show exactly 3 items
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
                            <span className="text-[10px] sm:text-sm font-bold tracking-widest text-white uppercase drop-shadow-md text-left leading-tight">
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
    contentPage = contentPage.substring(0, startIndex) + newThumbnails + contentPage.substring(endIndex);
    fs.writeFileSync(pathPage, contentPage, 'utf8');
    console.log('Homepage Hero Thumbnails updated.');
} else {
    console.log('Could not find Hero Thumbnails section in page.tsx');
}
