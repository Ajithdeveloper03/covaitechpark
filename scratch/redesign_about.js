const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '..', 'app', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

const newAboutSection = `      {/* ABOUT COMPANY SECTION — FLOATING BOX */}
      <section id="benefits-organic" className="py-16 sm:py-24 section-x w-full bg-[#f8fafc] text-brand-navy relative overflow-hidden flex justify-center">
        {/* Subtle ambient orb */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* The floating box */}
        <div className="max-w-6xl w-full mx-auto relative z-10 bg-white rounded-[2rem] lg:rounded-[3rem] shadow-2xl overflow-hidden reveal reveal-up flex flex-col lg:flex-row border border-slate-100">
          
          {/* Left: Full Height Image */}
          <div className="relative w-full lg:w-5/12 h-80 sm:h-96 lg:h-auto min-h-[400px]">
            <Image
              src={prefix("/optimized/ext_26_photo-1504917595217-d4dc5ebe6122")}
              alt="CovaiTech Park premium workspace lounge"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
            {/* Overlay to blend with design */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/10 to-transparent"></div>
          </div>

          {/* Right: Text Content */}
          <div className="w-full lg:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <span className="text-sm font-medium text-brand-orange uppercase tracking-[0.28em] block leading-none">
              About Covai Tech Park (Unit of MAX OFFICE)
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-outfit font-medium text-brand-navy tracking-tight leading-[1.05]">
              Business Ecosystem for<br />Collaboration & Growth
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Covai Tech Park® and Trichy Coworks, brands under MAX OFFICE, have enabled the growth of 650+ businesses across Tamil Nadu through premium managed offices, coworking spaces, and flexible workspace solutions. Today, we manage over 1,50,000 sq. ft. of office infrastructure.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
              {[
                { val: "4,500+", label: "Seats", color: "text-brand-orange" },
                { val: "650+", label: "Clients Served", color: "text-teal-500" },
                { val: "8", label: "Locations", color: "text-brand-orange" },
                { val: "2", label: "Cities", color: "text-teal-500" },
              ].map(stat => (
                <div key={stat.label} className="space-y-1">
                  <p className={\`font-outfit font-medium text-2xl \${stat.color} leading-none\`}>{stat.val}</p>
                  <p className="text-[10px] font-medium text-slate-500 tracking-widest uppercase">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href={prefix("/about-us")}
                className="inline-block px-8 py-3.5 bg-brand-orange hover:bg-brand-navy text-white font-medium text-[11px] uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg cursor-pointer hover:-translate-y-0.5 text-center"
              >
                Know More About Us
              </a>
            </div>
          </div>

        </div>
      </section>`;

const newAwardsSection = `      {/* AWARDS & RECOGNITION SECTION — Minimal & Attractive */}
      <section className="relative w-full bg-white py-20 sm:py-28 overflow-hidden border-t border-slate-100">
        <div className="relative z-10 max-w-5xl mx-auto section-x flex flex-col items-center">
          
          {/* Header */}
          <div className="text-center mb-16 reveal reveal-up">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.3em] block mb-4">
              Awards &amp; Recognitions
            </span>
            <h2 className="text-4xl sm:text-5xl font-outfit font-medium tracking-tight text-slate-900 leading-tight">
              Recognized for <span className="text-brand-orange">Excellence</span>
            </h2>
          </div>

          {/* Minimal Award Card */}
          <div className="w-full bg-slate-50 rounded-[2rem] p-8 sm:p-12 flex flex-col md:flex-row items-center gap-10 reveal reveal-up border border-slate-100 transition-all hover:shadow-xl group">
            
            {/* Left Column: Trophy Image */}
            <div className="flex-shrink-0 relative w-40 h-40 sm:w-48 sm:h-48 transform group-hover:scale-105 transition-transform duration-500">
              <Image src={prefix("/awards.png")} alt="Award Winner" fill className="object-contain drop-shadow-lg" loading="lazy"/>
            </div>

            {/* Right Column: Details */}
            <div className="flex-col space-y-4 text-center md:text-left flex-1">
              <div className="inline-block px-4 py-1.5 bg-orange-100 text-brand-orange text-xs font-semibold rounded-full uppercase tracking-wider">
                Winner
              </div>
              <h3 className="font-outfit font-medium text-3xl sm:text-4xl text-slate-900 leading-snug">Times Business Awards</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                Honored for our commitment to providing state-of-the-art office space solutions, premium managed workspaces, and outstanding corporate environment standards.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleOpenBooking("Times Business Awards")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy text-white hover:bg-brand-orange font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300"
                >
                  Learn More &rarr;
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>`;

// Replace About Section
const aboutRegex = /\{\/\*\s*LOCATIONS SECTION — Reference Image Style\s*\*\/\}([\s\S]*?)<\/section>/;
content = content.replace(aboutRegex, newAboutSection);

// Replace Awards Section
const awardsRegex = /\{\/\*\s*AWARDS & RECOGNITION SECTION — Single Featured Award\s*\*\/\}([\s\S]*?)<\/section>/;
content = content.replace(awardsRegex, newAwardsSection);

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Successfully updated About and Awards sections.');
