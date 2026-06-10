const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, '..', 'app', 'about-us', 'page.tsx');
let aboutContent = fs.readFileSync(aboutPath, 'utf8');

const exactReplicaHero = `      {/* BENTO HERO SECTION - EXACT REPLICA */}
      <section 
        id="hero"
        className="relative h-[100dvh] max-h-[100dvh] flex flex-col items-center pt-24 lg:pt-32 pb-0 overflow-hidden bg-[#030303] w-full"
      >
        <div className="relative z-20 w-full flex flex-col items-center text-center px-4 flex-shrink-0">
          
          <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] tracking-tight text-white font-serif font-medium leading-[1.05] mb-4">
            <span className="italic font-light">Premium Workspace</span> is now<br/>
            Flexible & effortless.
          </h1>

          <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans font-medium mb-6">
            We create stunning private offices, high-performing co-working hubs, and layouts that convert—combining architectural instincts with modern design.
          </p>

          <button className="px-10 py-3.5 bg-[#d8b4fe] text-black font-sans font-bold text-sm tracking-wide rounded-[2rem] hover:bg-white transition-colors duration-300">
            Get Started
          </button>
        </div>

        {/* EDGE TO EDGE BENTO GRID (Exact Layout Replica) */}
        <div className="relative z-10 w-full flex-1 mt-10 lg:mt-16 px-0 pb-0 overflow-hidden flex gap-2 sm:gap-4 md:gap-5 justify-center">
          
          {/* Column 1 */}
          <div className="flex-1 flex flex-col gap-2 sm:gap-4 md:gap-5 translate-y-16 lg:translate-y-24">
            <div className="relative w-full aspect-square rounded-r-[1.5rem] md:rounded-r-[2rem] overflow-hidden">
              <Image src={prefix("/optimized/ext_0_pexels-photo-386150.jpeg")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>
            <div className="relative w-full aspect-[4/3] rounded-r-[1.5rem] md:rounded-r-[2rem] overflow-hidden">
              <Image src={prefix("/optimized/ext_2_pexels-photo-36713181.jpeg")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex-1 flex flex-col gap-2 sm:gap-4 md:gap-5 translate-y-8 lg:translate-y-12">
            <div className="relative w-full aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
              <Image src={prefix("/optimized/ext_26_photo-1504917595217-d4dc5ebe6122")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>
            <div className="relative w-full aspect-[16/9] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
              <Image src={prefix("/optimized/ext_3_pexels-photo-20101490.jpeg")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>
          </div>

          {/* Column 3 (Center) */}
          <div className="flex-1 flex flex-col gap-2 sm:gap-4 md:gap-5 translate-y-0 lg:translate-y-0">
            <div className="relative w-full aspect-[3/4] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
              <Image src={prefix("/optimized/ext_25_photo-1477959858617-67f85cf4f1df")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>
            <div className="relative w-full aspect-[16/9] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
              <Image src={prefix("/optimized/ext_24_photo-1556761175-4b46a572b786")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>
          </div>

          {/* Column 4 */}
          <div className="flex-1 flex flex-col gap-2 sm:gap-4 md:gap-5 translate-y-8 lg:translate-y-12">
            <div className="relative w-full aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
              <Image src={prefix("/optimized/ext_21_photo-1582719508461-905c673771fd")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>
            <div className="relative w-full aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
              <Image src={prefix("/optimized/ext_15_pexels-photo-13219418.jpeg")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>
          </div>

          {/* Column 5 */}
          <div className="flex-1 flex flex-col gap-2 sm:gap-4 md:gap-5 translate-y-16 lg:translate-y-24">
            <div className="relative w-full aspect-[3/4] rounded-l-[1.5rem] md:rounded-l-[2rem] overflow-hidden">
              <Image src={prefix("/optimized/ext_17_photo-1524758631624-e2822e304c36")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>
            <div className="relative w-full aspect-square rounded-l-[1.5rem] md:rounded-l-[2rem] overflow-hidden">
              <Image src={prefix("/optimized/ext_27_photo-1524758631624-e2822e304c36")} alt="Workspace" fill className="object-cover" sizes="20vw" />
            </div>
          </div>

        </div>
      </section>`;

const aboutHeroRegex = /\{\/\*\s*BENTO HERO SECTION\s*\*\/\}([\s\S]*?)<\/section>/;
const altRegex = /\{\/\*\s*BENTO HERO SECTION \- EXACT REPLICA\s*\*\/\}([\s\S]*?)<\/section>/;

if (altRegex.test(aboutContent)) {
  aboutContent = aboutContent.replace(altRegex, exactReplicaHero);
} else {
  aboutContent = aboutContent.replace(aboutHeroRegex, exactReplicaHero);
}

fs.writeFileSync(aboutPath, aboutContent, 'utf8');
console.log("Updated to exact replica layout!");
