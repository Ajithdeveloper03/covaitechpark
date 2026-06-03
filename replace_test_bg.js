const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const targetStr = `      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="section-container w-full flex flex-col justify-center py-16 sm:py-24 relative overflow-hidden bg-[#06090f]">
        {/* Ambient accent orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none z-[1]" />`;

const replacementStr = `      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="section-container w-full flex flex-col justify-center py-16 sm:py-24 relative overflow-hidden bg-[#06090f]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            priority={false}
            className="object-cover scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#06090f]/88" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06090f]/40 via-transparent to-[#06090f]/90" />
        </div>
        
        {/* Ambient accent orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none z-[1]" />`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync('app/page.tsx', content, 'utf8');
console.log('Replaced Testimonials bg successfully!');
