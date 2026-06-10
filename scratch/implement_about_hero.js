const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'about-us', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const newHero = `      {/* BENTO HERO SECTION */}
      <section 
        id="hero"
        className="relative min-h-screen flex flex-col items-center pt-32 pb-16 overflow-hidden bg-black"
      >
        <div className="relative z-10 w-full flex flex-col items-center text-center px-4">
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-white font-serif font-medium leading-[1.05] mb-4">
            <span className="italic text-brand-orange">Premium Workspace</span> is now<br/>
            Flexible & effortless.
          </h1>

          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans font-medium mb-10">
            We create stunning private offices, high-performing co-working hubs, and layouts that convert—combining architectural instincts with the power of modern design.
          </p>

          <button className="px-10 py-4 bg-brand-orange text-white font-sans font-bold text-sm tracking-widest uppercase rounded-full hover:bg-white hover:text-brand-navy transition-colors duration-300 shadow-xl shadow-brand-orange/20">
            Get Started
          </button>
        </div>

        {/* BENTO GRID */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 mt-16 lg:mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[200px_200px] md:grid-rows-[260px_260px] gap-4 lg:gap-6">
            
            {/* Cell 1: Small Square */}
            <div className="relative col-span-1 row-span-1 rounded-[2rem] overflow-hidden bg-slate-900 border border-white/5 hover:border-brand-orange/50 transition-colors">
              <Image src={prefix("/optimized/ext_14_pexels-photo-3184306.jpeg")} alt="Team Collaboration" fill className="object-cover" sizes="25vw" loading="eager" />
            </div>

            {/* Cell 2: Tall Portrait */}
            <div className="relative col-span-1 row-span-2 rounded-[2rem] overflow-hidden bg-slate-900 border border-white/5 hover:border-brand-orange/50 transition-colors">
              <Image src={prefix("/optimized/ext_26_photo-1504917595217-d4dc5ebe6122")} alt="Private Cabin" fill className="object-cover" sizes="25vw" loading="eager" />
            </div>

            {/* Cell 3: Wide Landscape */}
            <div className="relative col-span-2 row-span-1 rounded-[2rem] overflow-hidden bg-slate-900 border border-white/5 hover:border-brand-orange/50 transition-colors hidden md:block">
              <Image src={prefix("/optimized/ext_27_photo-1524758631624-e2822e304c36")} alt="Modern Lounge" fill className="object-cover" sizes="50vw" loading="eager" />
            </div>

            {/* Cell 4: Medium Square */}
            <div className="relative col-span-1 md:col-span-1 row-span-1 rounded-[2rem] overflow-hidden bg-slate-900 border border-white/5 hover:border-brand-orange/50 transition-colors">
              <Image src={prefix("/optimized/ext_15_pexels-photo-13219418.jpeg")} alt="Hot Desk" fill className="object-cover" sizes="25vw" loading="eager" />
            </div>

            {/* Cell 5: Medium Square */}
            <div className="relative col-span-1 md:col-span-1 row-span-1 rounded-[2rem] overflow-hidden bg-slate-900 border border-white/5 hover:border-brand-orange/50 transition-colors hidden md:block">
              <Image src={prefix("/optimized/ext_02_pexels-photo-3184328.jpeg")} alt="Boardroom" fill className="object-cover" sizes="25vw" loading="eager" />
            </div>

          </div>
        </div>

        {/* Fade to white at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#faf9f6] to-transparent pointer-events-none z-20" />
      </section>`;

// Replace old hero
const heroRegex = /\{\/\*\s*NEW CREATIVE HERO SECTION\s*\*\/\}([\s\S]*?)<\/section>/;
content = content.replace(heroRegex, newHero);

fs.writeFileSync(filePath, content, 'utf8');
console.log('About page hero updated successfully.');
