const fs = require('fs');

const path = 'c:/Users/inyma/OneDrive/Desktop/Ajith System Backup/inymart projects/covaitech/covaitech/app/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace left medal SVG with gold.png
const leftMedalRegex = /<div className="relative flex flex-col items-center select-none">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const newLeftMedal = `<div className="relative flex flex-col items-center select-none">
                <img src="/gold.png" alt="Award Winner" className="w-44 sm:w-52 md:w-60 h-auto object-contain drop-shadow-2xl" />
              </div>
            </div>`;

content = content.replace(leftMedalRegex, newLeftMedal);

// Replace wreath SVG with awards.jpg
const wreathRegex = /<div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 relative">\s*<svg viewBox="0 0 120 120"[\s\S]*?<\/svg>\s*<\/div>/g;
const newWreath = `<div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 relative flex items-center justify-center bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                    <img src="/awards.jpg" alt="Award Badge" className="w-full h-full object-cover" />
                  </div>`;

content = content.replace(wreathRegex, newWreath);

fs.writeFileSync(path, content, 'utf8');
console.log('Updated Awards section successfully!');
