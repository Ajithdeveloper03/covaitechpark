const fs = require('fs');
const path = require('path');

// 1. Update Blog Archive
const blogPagePath = path.join(__dirname, '..', 'app', 'blog', 'page.tsx');
let blogContent = fs.readFileSync(blogPagePath, 'utf8');

const newBlogHero = `      {/* ── LIGHT CLEAN HERO ── */}
      <section className="relative min-h-[50vh] flex flex-col justify-end items-center pt-40 pb-16 overflow-hidden bg-white border-b border-slate-100">
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <div className="flex justify-center items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold tracking-[0.2em] uppercase">
              CovaiTech Journal
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-slate-900 leading-[1.05] mb-6">
            Workspace <span className="italic font-serif text-[#f37021] font-medium">Insights</span> & Ideas
          </h1>
          <p className="text-slate-500 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
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
                    ? "bg-[#0f172a] border-[#0f172a] text-white shadow-lg shadow-[#0f172a]/20"
                    : "bg-white border-slate-200 text-slate-500 hover:border-[#0f172a] hover:text-[#0f172a]"
                }\`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>`;

const blogHeroRegex = /\{\/\*\s*── HERO ──\s*\*\/\}([\s\S]*?)<\/section>/;
blogContent = blogContent.replace(blogHeroRegex, newBlogHero);
fs.writeFileSync(blogPagePath, blogContent, 'utf8');

// 2. Update Blog Details
const detailPath = path.join(__dirname, '..', 'app', 'blog', '[slug]', 'BlogDetailContent.tsx');
let detailContent = fs.readFileSync(detailPath, 'utf8');

const newDetailHero = `      {/* ── EDITORIAL MAGAZINE HERO ── */}
      <section className="relative w-full pt-32 pb-16 bg-[#fafafa] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          
          {/* Typography side */}
          <div className="lg:col-span-6 space-y-8 relative z-20">
            {/* Back link */}
            <a
              href={prefix("/blog")}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-[#f37021] text-xs font-bold uppercase tracking-widest mb-4 transition-colors"
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
              <span className="text-slate-300 text-xs">·</span>
              <span className="text-slate-500 text-xs font-medium">{article.readTime}</span>
              <span className="text-slate-300 text-xs">·</span>
              <span className="text-slate-500 text-xs font-medium">{article.date}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-slate-900 leading-[1.02]">
              {article.title}
            </h1>

            <p className="text-slate-600 text-base sm:text-xl font-normal leading-relaxed max-w-lg">
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

// detail content had `{/* ── HERO BANNER ── */}`
const detailHeroRegex = /\{\/\*\s*── HERO BANNER ──\s*\*\/\}([\s\S]*?)<\/section>/;
detailContent = detailContent.replace(detailHeroRegex, newDetailHero);
fs.writeFileSync(detailPath, detailContent, 'utf8');

console.log('Blog heroes updated successfully.');
