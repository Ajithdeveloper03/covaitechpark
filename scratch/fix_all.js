const fs = require('fs');
const path = require('path');

// --- 1. ABOUT US PAGE HERO ---
const aboutPath = path.join(__dirname, '..', 'app', 'about-us', 'page.tsx');
let aboutContent = fs.readFileSync(aboutPath, 'utf8');

const newAboutHero = `      {/* BENTO HERO SECTION */}
      <section 
        id="hero"
        className="relative h-[100dvh] max-h-screen flex flex-col items-center pt-24 lg:pt-32 pb-0 overflow-hidden bg-black w-full"
      >
        <div className="relative z-10 w-full flex flex-col items-center text-center px-4 flex-shrink-0">
          
          <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] tracking-tight text-white font-serif font-medium leading-[1.05] mb-4">
            <span className="italic font-light">Premium Workspace</span> is now<br/>
            Flexible & effortless.
          </h1>

          <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans font-medium mb-6">
            We create stunning private offices, high-performing co-working hubs, and layouts that convert—combining architectural instincts with modern design.
          </p>

          <button className="px-10 py-3.5 bg-[#d8b4fe] text-black font-sans font-bold text-sm tracking-wide rounded-full hover:bg-white transition-colors duration-300">
            Get Started
          </button>
        </div>

        {/* EDGE TO EDGE BENTO GRID (100vh fit) */}
        <div className="relative z-10 w-full flex-1 mt-10 lg:mt-14 px-0 pb-0 overflow-hidden">
          <div className="grid grid-cols-5 grid-rows-[1fr_0.6fr] gap-2 md:gap-4 h-full w-full">
            
            {/* Col 1 */}
            <div className="col-span-1 row-span-1 relative rounded-tr-[1.5rem] overflow-hidden">
              <Image src={prefix("/optimized/ext_14_pexels-photo-3184306.jpeg")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>
            <div className="col-span-1 row-span-1 relative rounded-tr-[1.5rem] overflow-hidden">
              <Image src={prefix("/optimized/ext_02_pexels-photo-3184328.jpeg")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>

            {/* Col 2 */}
            <div className="col-span-1 row-span-1 relative rounded-t-[1.5rem] overflow-hidden translate-y-8">
              <Image src={prefix("/optimized/ext_26_photo-1504917595217-d4dc5ebe6122")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>
            <div className="col-span-1 row-span-1 relative rounded-t-[1.5rem] overflow-hidden translate-y-8">
              <Image src={prefix("/optimized/ext_27_photo-1524758631624-e2822e304c36")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>

            {/* Col 3 */}
            <div className="col-span-1 row-span-2 relative rounded-t-[1.5rem] overflow-hidden -translate-y-4">
              <Image src={prefix("/optimized/ext_15_pexels-photo-13219418.jpeg")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>

            {/* Col 4 */}
            <div className="col-span-1 row-span-1 relative rounded-t-[1.5rem] overflow-hidden translate-y-12">
              <Image src={prefix("/optimized/ext_26_photo-1504917595217-d4dc5ebe6122")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>
            <div className="col-span-1 row-span-1 relative rounded-t-[1.5rem] overflow-hidden translate-y-12">
              <Image src={prefix("/optimized/ext_14_pexels-photo-3184306.jpeg")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>

            {/* Col 5 */}
            <div className="col-span-1 row-span-2 relative rounded-tl-[1.5rem] overflow-hidden">
              <Image src={prefix("/optimized/ext_27_photo-1524758631624-e2822e304c36")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>

          </div>
        </div>
      </section>`;

const aboutHeroRegex = /\{\/\*\s*BENTO HERO SECTION\s*\*\/\}([\s\S]*?)<\/section>/;
aboutContent = aboutContent.replace(aboutHeroRegex, newAboutHero);
fs.writeFileSync(aboutPath, aboutContent, 'utf8');

// --- 2. BLOG ARCHIVE PAGE HERO ---
// Add background image with overlay
const blogPath = path.join(__dirname, '..', 'app', 'blog', 'page.tsx');
let blogContent = fs.readFileSync(blogPath, 'utf8');

const newBlogHero = `      {/* ── LIGHT CLEAN HERO WITH BG IMAGE ── */}
      <section className="relative min-h-[50vh] flex flex-col justify-end items-center pt-40 pb-16 overflow-hidden bg-slate-900 border-b border-slate-800">
        <div className="absolute inset-0">
          <Image src={prefix("/workspace-lounge.png")} alt="Blog background" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <div className="flex justify-center items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase">
              CovaiTech Journal
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-white leading-[1.05] mb-6">
            Workspace <span className="italic font-serif text-[#f37021] font-medium">Insights</span> & Ideas
          </h1>
          <p className="text-white/70 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            Explore modern office design trends, startup strategies, remote infrastructure advice, and workspace management expertise from our team.
          </p>

          {/* Category filter pills */}
          <div className="flex items-center justify-center gap-3 mt-12 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={\`px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all duration-300 \${
                  activeCategory === cat
                    ? "bg-[#f37021] border-[#f37021] text-white shadow-lg shadow-[#f37021]/20"
                    : "bg-white/10 border-white/20 text-white hover:border-white hover:bg-white/20"
                }\`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>`;

const blogHeroRegex = /\{\/\*\s*── LIGHT CLEAN HERO ──\s*\*\/\}([\s\S]*?)<\/section>/;
blogContent = blogContent.replace(blogHeroRegex, newBlogHero);
fs.writeFileSync(blogPath, blogContent, 'utf8');

// --- 3. BLOG DETAIL PAGE HERO ---
// Reduce title font size and add background image with overlay
const detailPath = path.join(__dirname, '..', 'app', 'blog', '[slug]', 'BlogDetailContent.tsx');
let detailContent = fs.readFileSync(detailPath, 'utf8');

const newDetailHero = `      {/* ── EDITORIAL MAGAZINE HERO ── */}
      <section className="relative w-full pt-32 pb-16 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={prefix(article.img)} alt="Blog Details background" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-sm" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end relative z-10">
          
          {/* Typography side */}
          <div className="lg:col-span-6 space-y-8 relative z-20">
            {/* Back link */}
            <a
              href={prefix("/blog")}
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#f37021] text-xs font-bold uppercase tracking-widest mb-4 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              All Articles
            </a>

            <div className="flex items-center flex-wrap gap-3">
              <span className={\`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border \${catColor.bg} \${catColor.text} \${catColor.border}\`}>
                {article.category}
              </span>
              <span className="text-white/30 text-xs">·</span>
              <span className="text-white/60 text-xs font-medium">{article.readTime}</span>
              <span className="text-white/30 text-xs">·</span>
              <span className="text-white/60 text-xs font-medium">{article.date}</span>
            </div>

            {/* REDUCED FONT SIZE: changed from text-5xl sm:text-6xl md:text-7xl to text-4xl sm:text-5xl md:text-5xl */}
            <h1 className="text-4xl sm:text-5xl md:text-5xl font-sans font-bold tracking-tight text-white leading-[1.1]">
              {article.title}
            </h1>

            <p className="text-white/70 text-base sm:text-lg font-normal leading-relaxed max-w-lg">
              {article.excerpt}
            </p>
          </div>

          {/* Image side - Large and overlapping */}
          <div className="lg:col-span-6 relative z-10 w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl lg:-translate-y-12">
            <Image
              src={prefix(article.img)}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

        </div>
      </section>`;

const detailHeroRegex = /\{\/\*\s*── EDITORIAL MAGAZINE HERO ──\s*\*\/\}([\s\S]*?)<\/section>/;
detailContent = detailContent.replace(detailHeroRegex, newDetailHero);
fs.writeFileSync(detailPath, detailContent, 'utf8');

console.log("All fixes applied.");
