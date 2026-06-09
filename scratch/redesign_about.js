const fs = require('fs');

const pathPage = 'c:/Users/inyma/OneDrive/Desktop/Ajith System Backup/inymart projects/covaitech/covaitech/app/about-us/page.tsx';
let content = fs.readFileSync(pathPage, 'utf8');

const heroRegex = /\{\/\* Hero Section \(ZenMind Reference Style\) \*\/\}[\s\S]*?\{\/\* WHO WE ARE SECTION \*\/\}/;

const newHeroAndMarketplace = `{/* NEW CREATIVE HERO SECTION */}
      <section 
        id="hero"
        className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden bg-[#060d17]"
      >
        {/* Abstract shapes / Glows for a unique aesthetic */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#f37021]/15 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-sky-500/10 blur-[100px]" />
          <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] rounded-full bg-violet-500/10 blur-[80px]" />
          
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:"url('data:image/svg+xml,%3Csvg width=\\"200\\" height=\\"200\\" viewBox=\\"0 0 200 200\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noise\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.65\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%25\\" height=\\"100%25\\" filter=\\"url(%23noise)\\" opacity=\\"1\\"/%3E%3C/svg%3E')"}} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-[#f37021] animate-pulse" />
            <span className="text-white/80 text-xs font-semibold tracking-[0.2em] uppercase">Redefining Workspaces</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-white font-sans font-bold leading-[0.95] mb-8">
            Work. Connect.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f37021] via-orange-300 to-yellow-300 italic font-serif font-medium pr-4">Thrive.</span>
          </h1>

          <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal mb-12">
            CovaiTech Park isn't just an office. It's an organically designed ecosystem engineered for high-performance teams, innovative startups, and visionary founders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button className="px-8 py-4 bg-[#f37021] text-white font-bold text-sm tracking-widest uppercase rounded-full hover:bg-white hover:text-[#f37021] transition-colors duration-300 shadow-xl shadow-[#f37021]/20">
              Explore Spaces
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold text-sm tracking-widest uppercase rounded-full hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm">
              Our Story
            </button>
          </div>
        </div>

        {/* Floating image accents */}
        <div className="absolute left-[5%] top-[20%] hidden lg:block w-48 h-64 rounded-3xl overflow-hidden border border-white/10 shadow-2xl rotate-[-6deg] animate-float">
          <Image src={prefix("/workspace-meeting.png")} alt="Meeting" fill className="object-cover" sizes="200px" />
        </div>
        <div className="absolute right-[5%] bottom-[15%] hidden lg:block w-56 h-40 rounded-3xl overflow-hidden border border-white/10 shadow-2xl rotate-[4deg] animate-float" style={{ animationDelay: '1.5s' }}>
          <Image src={prefix("/workspace-cabin.png")} alt="Cabin" fill className="object-cover" sizes="224px" />
        </div>

        {/* Fade to white at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#faf9f6] to-transparent pointer-events-none z-20" />
      </section>

      {/* EXCLUSIVE MARKETPLACE / ECOSYSTEM SECTION (Based on user's image) */}
      <section className="py-24 sm:py-32 bg-[#faf9f6] relative w-full">
        {/* Light radial glows behind the central element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-50 rounded-full blur-[100px] pointer-events-none opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-6 font-sans">
            Step into CovaiTech's exclusive ecosystem
          </h2>
          <p className="text-slate-500 max-w-3xl mx-auto text-base sm:text-lg mb-12 leading-relaxed">
            We connect members with premium office cabins, enterprise-grade networking, bespoke meeting rooms, and proactive operational support, empowering teams to work optimized.
          </p>

          <button className="inline-flex items-center gap-4 bg-[#1a1a1a] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-black transition-colors shadow-lg mb-20 sm:mb-32 group">
            Explore Features
            <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black -mr-4 group-hover:translate-x-1 transition-transform">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>

          {/* Central Phone Mockup & Floating Cards Container */}
          <div className="relative w-full max-w-5xl mx-auto flex justify-center items-center h-[500px] sm:h-[600px]">
            
            {/* The Phone Mockup */}
            <div className="relative z-20 w-[260px] sm:w-[300px] h-[520px] sm:h-[600px] bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-[8px] border-slate-100 overflow-hidden flex flex-col -rotate-3 hover:rotate-0 transition-transform duration-700">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-slate-100 rounded-b-2xl z-30"></div>
              
              {/* App UI */}
              <div className="flex-1 bg-slate-50 p-4 pt-12 flex flex-col gap-4 overflow-hidden relative">
                
                {/* Header icons */}
                <div className="flex gap-3 mb-2">
                   <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-brand-navy">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                   </div>
                   <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-brand-navy">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                   </div>
                </div>

                <div className="flex justify-between px-1">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">Pending requests</span>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">Past requests</span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-3 flex-1 overflow-hidden pb-4">
                  <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 relative overflow-hidden group cursor-pointer">
                    <Image src={prefix("/workspace-cabin.png")} alt="Cabins" fill className="object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-white text-[10px] sm:text-xs font-bold z-10">Private Cabins</span>
                  </div>
                  <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 relative overflow-hidden group cursor-pointer">
                    <Image src={prefix("/workspace-meeting.png")} alt="Meeting" fill className="object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-white text-[10px] sm:text-xs font-bold z-10">Meeting Rooms</span>
                  </div>
                  <div className="bg-slate-200 rounded-2xl p-3 shadow-sm border border-slate-100 flex items-center justify-center relative overflow-hidden cursor-pointer">
                    <Image src={prefix("/workspace-lounge.png")} alt="Lounge" fill className="object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-white text-[10px] sm:text-xs font-bold z-10">Lounges</span>
                  </div>
                  <div className="bg-brand-navy rounded-2xl p-3 shadow-sm border border-slate-800 flex items-center justify-center relative overflow-hidden cursor-pointer">
                    <Image src={prefix("/workspace-cafe.png")} alt="Cafe" fill className="object-cover opacity-50 grayscale" />
                    <span className="absolute bottom-3 left-3 text-white text-[10px] sm:text-xs font-bold z-10">Amenities</span>
                  </div>
                </div>

                {/* Bottom Nav */}
                <div className="h-14 bg-black rounded-3xl mx-2 mb-2 flex items-center justify-around px-4 shrink-0">
                  <div className="w-5 h-5 rounded bg-white/20"></div>
                  <div className="w-5 h-5 rounded-full border-2 border-white/40"></div>
                  <div className="w-5 h-5 flex gap-1 items-center justify-center"><span className="w-1.5 h-1.5 rounded-full bg-white/40"/><span className="w-1.5 h-1.5 rounded-full bg-white/40"/></div>
                </div>

              </div>
            </div>

            {/* Simulated Hand holding phone shadow/fade */}
            <div className="absolute bottom-[-100px] w-full h-[300px] bg-gradient-to-t from-[#faf9f6] via-[#faf9f6]/80 to-transparent z-30 pointer-events-none"></div>

            {/* Floating Card 1: Top Left */}
            <div className="absolute top-[10%] left-0 sm:left-[-5%] lg:left-[5%] z-10 bg-white/70 backdrop-blur-xl border border-slate-200/50 p-4 sm:p-5 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] gap-4 items-start w-[280px] sm:w-[320px] text-left hidden md:flex animate-float hover:scale-105 transition-transform cursor-pointer" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 shrink-0 rounded-2xl overflow-hidden relative border border-slate-100 shadow-sm">
                <Image src={prefix("/workspace-cabin.png")} alt="Cabin" fill className="object-cover" sizes="64px" />
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-widest text-slate-800 uppercase mb-2">Private Cabins</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mb-3">
                  Soundproof, modular office suites designed for teams that require deep focus and confidentiality.
                </p>
                <a href={prefix("/private-office-space")} className="text-[11px] sm:text-xs font-bold text-slate-900 border-b border-slate-900 pb-0.5 hover:text-brand-orange hover:border-brand-orange transition-colors">See full list</a>
              </div>
            </div>

            {/* Floating Card 2: Bottom Left */}
            <div className="absolute bottom-[20%] left-0 sm:left-[-10%] lg:left-0 z-10 bg-white/70 backdrop-blur-xl border border-slate-200/50 p-4 sm:p-5 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] gap-4 items-start w-[280px] sm:w-[320px] text-left hidden md:flex animate-float hover:scale-105 transition-transform cursor-pointer" style={{ animationDelay: '0.8s' }}>
              <div className="w-16 h-16 shrink-0 rounded-2xl overflow-hidden relative bg-blue-50 border border-slate-100 shadow-sm flex items-center justify-center p-2">
                <Image src={prefix("/covai-tech-park-logo.png")} alt="Logo" width={40} height={40} className="object-contain" />
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-widest text-slate-800 uppercase mb-2">Enterprise Network</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mb-3">
                  Dual SLA-backed fiber connectivity with dedicated bandwidth guarantees for zero downtime operations.
                </p>
                <a href={prefix("/#services-dark")} className="text-[11px] sm:text-xs font-bold text-slate-900 border-b border-slate-900 pb-0.5 hover:text-brand-orange hover:border-brand-orange transition-colors">See full list</a>
              </div>
            </div>

            {/* Floating Card 3: Middle Right */}
            <div className="absolute top-[35%] right-0 sm:right-[-10%] lg:right-[5%] z-10 bg-white/70 backdrop-blur-xl border border-slate-200/50 p-4 sm:p-5 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] gap-4 items-start w-[280px] sm:w-[320px] text-left hidden md:flex animate-float hover:scale-105 transition-transform cursor-pointer" style={{ animationDelay: '1.2s' }}>
              <div className="w-16 h-16 shrink-0 rounded-2xl overflow-hidden relative border border-slate-100 shadow-sm">
                <Image src={prefix("/workspace-meeting.png")} alt="Meetings" fill className="object-cover" sizes="64px" />
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-widest text-slate-800 uppercase mb-2">Meeting Rooms</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mb-3">
                  Smart boardrooms equipped with 4K displays and acoustic insulation for your most important pitches.
                </p>
                <a href={prefix("/#services-dark")} className="text-[11px] sm:text-xs font-bold text-slate-900 border-b border-slate-900 pb-0.5 hover:text-brand-orange hover:border-brand-orange transition-colors">See full list</a>
              </div>
            </div>

          </div>

          {/* Mobile Fallback layout for the cards */}
          <div className="mt-12 flex flex-col gap-4 md:hidden text-left max-w-sm mx-auto relative z-40">
             <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
                <h4 className="text-[11px] font-bold tracking-widest text-slate-800 uppercase mb-2">Private Cabins</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-2">Soundproof, modular office suites designed for teams that require deep focus and confidentiality.</p>
                <a href={prefix("/private-office-space")} className="text-xs font-bold text-slate-900 border-b border-slate-900 pb-0.5">See full list</a>
             </div>
             <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
                <h4 className="text-[11px] font-bold tracking-widest text-slate-800 uppercase mb-2">Enterprise Network</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-2">Dual SLA-backed fiber connectivity with dedicated bandwidth guarantees.</p>
                <a href={prefix("/#services-dark")} className="text-xs font-bold text-slate-900 border-b border-slate-900 pb-0.5">See full list</a>
             </div>
             <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
                <h4 className="text-[11px] font-bold tracking-widest text-slate-800 uppercase mb-2">Meeting Rooms</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-2">Smart boardrooms equipped with 4K displays and acoustic insulation for your most important pitches.</p>
                <a href={prefix("/#services-dark")} className="text-xs font-bold text-slate-900 border-b border-slate-900 pb-0.5">See full list</a>
             </div>
          </div>
          
        </div>
      </section>

      {/* WHO WE ARE SECTION */}`;

content = content.replace(heroRegex, newHeroAndMarketplace);

fs.writeFileSync(pathPage, content, 'utf8');
console.log('About page hero and marketplace updated!');
