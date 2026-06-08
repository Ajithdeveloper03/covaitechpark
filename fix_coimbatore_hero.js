const fs = require('fs');

const path = 'c:/Users/inyma/OneDrive/Desktop/Ajith System Backup/inymart projects/covaitech/covaitech/app/coimbatore/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace the fan arc logic with a straight flex row
const arcRegex = /\{\/\* Fan-out Arc of 5 tilted workspace cards at bottom — flex-based responsive \*\/\}[\s\S]*?<\/section>/;

const flatRowHTML = `{/* Responsive Image Row at Bottom */}
        <div className="relative z-20 w-full max-w-7xl mx-auto mt-12 px-4 pb-8 sm:pb-12">
          <div className="flex flex-row justify-center items-end gap-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide pb-4 pt-4 px-4">
            {[
              { img: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=400&q=80", label: "Coworking Lounges" },
              { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80", label: "Private Cabins" },
              { img: "/coimbatore.png", label: "Premium Interiors", active: true },
              { img: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=400&q=80", label: "Meeting Rooms" },
              { img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80", label: "24x7 Access" },
            ].map((card, i) => (
              <div
                key={i}
                className={\`relative shrink-0 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl cursor-pointer \${
                  card.active ? "w-[240px] sm:w-[280px] md:w-[320px] h-[320px] sm:h-[380px] md:h-[440px] z-20 -translate-y-4 shadow-2xl rounded-3xl" : "w-[160px] sm:w-[200px] md:w-[220px] h-[220px] sm:h-[280px] md:h-[320px] z-10 opacity-70 hover:opacity-100 hover:z-30 rounded-2xl"
                }\`}
              >
                <div className="w-full h-full rounded-[inherit] overflow-hidden border-4 border-white/20 shadow-inner relative">
                  <Image
                    src={card.img}
                    alt={card.label}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 sm:bottom-6 left-0 w-full text-center px-2">
                    <p className={\`text-white font-outfit font-bold tracking-wide \${card.active ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'}\`}>
                      {card.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>`;

content = content.replace(arcRegex, flatRowHTML);
fs.writeFileSync(path, content, 'utf8');
console.log('Updated Coimbatore hero cards to be flat & responsive!');
