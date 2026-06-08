const fs = require('fs');

const pathPage = 'c:/Users/inyma/OneDrive/Desktop/Ajith System Backup/inymart projects/covaitech/covaitech/app/page.tsx';
let contentPage = fs.readFileSync(pathPage, 'utf8');

// Replace Gallery Section in app/page.tsx to use brand colors
const galleryRegex = /<section id="gallery-works" className="bg-\[#fcfbf9\][\s\S]*?\{\/\* FAQS SECTION \*\/\}/;

const newGallery = `<section id="gallery-works" className="bg-slate-50 py-16 sm:py-24 w-full text-brand-navy relative overflow-hidden">
        <div className="w-full flex flex-col items-center relative z-10">
          
          {/* Header block */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 px-4 sm:px-8 max-w-7xl mx-auto w-full">
            <div className="space-y-4 text-left">
              <span className="text-[9px] font-bold text-brand-orange uppercase tracking-[0.25em] flex items-center gap-2">
                <span className="w-6 h-[1px] bg-brand-orange"></span> OUR GALLERY
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold tracking-tight leading-none text-brand-navy">
                Creative Workspaces That <br className="hidden sm:block" />
                <span className="text-brand-orange">Define Our Style</span>
              </h2>
            </div>
            <p className="text-slate-500 text-sm font-normal max-w-md leading-relaxed text-left lg:pb-2">
              Our portfolio showcases a diverse range of premium coworking environments, from beautifully crafted private cabins to highly functional and stylish open lounges.
            </p>
          </div>

          {/* Carousel container */}
          <div className="relative w-full overflow-hidden mt-6">
            {/* Left white fade overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none" />
            {/* Right white fade overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none" />

            <div className="overflow-hidden w-full" ref={galleryRef}>
              <div className="flex gap-6 sm:gap-8 items-end px-4 sm:px-12 pb-12 pt-4">
                {GALLERY_ITEMS.map((item, index) => {
                  return (
                    <div key={index} className="flex-[0_0_260px] sm:flex-[0_0_320px] lg:flex-[0_0_380px] min-w-0">
                      
                      {/* Image Card */}
                      <div className="group relative w-full aspect-[4/5] sm:aspect-square rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-orange/30 border border-transparent transition-all duration-500 cursor-pointer mb-5">
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          fill 
                          sizes="380px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        
                        {/* Tags */}
                        <div className="absolute top-5 left-5 z-10 flex gap-2">
                          <span className="px-4 py-1.5 bg-brand-navy/60 backdrop-blur-md border border-white/20 rounded-full text-[9px] font-bold tracking-widest text-white uppercase shadow-sm">
                            PREMIUM
                          </span>
                          <span className="px-4 py-1.5 bg-brand-orange/80 backdrop-blur-md border border-white/20 rounded-full text-[9px] font-bold tracking-widest text-white uppercase shadow-sm">
                            WORKSPACE
                          </span>
                        </div>

                        {/* Circular View Button (Hover) */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-navy/20">
                          <div className="w-16 h-16 rounded-full bg-brand-orange/90 backdrop-blur-sm text-white flex items-center justify-center text-[10px] font-bold uppercase tracking-wider scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl border border-white/20">
                            View
                          </div>
                        </div>
                      </div>

                      {/* Text content below */}
                      <div className="text-left px-2">
                        <h3 className="font-outfit font-bold text-xl text-brand-navy group-hover:text-brand-orange transition-colors duration-300 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-normal">{item.location}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* FAQS SECTION */}`;

contentPage = contentPage.replace(galleryRegex, newGallery);
fs.writeFileSync(pathPage, contentPage, 'utf8');
console.log('Updated Gallery section to brand colors!');
