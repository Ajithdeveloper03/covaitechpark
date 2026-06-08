const fs = require('fs');

const path = 'c:/Users/inyma/OneDrive/Desktop/Ajith System Backup/inymart projects/covaitech/covaitech/app/coimbatore/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Update stats section full VH
content = content.replace(
  /<section className="w-full py-16 sm:py-20 border-t border-slate-100" style={{ background: '#f2f3f0' }}>\s*<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">/,
  `<section className="w-full min-h-[100vh] flex flex-col justify-center py-16 sm:py-20 border-t border-slate-100" style={{ background: '#f2f3f0' }}>\n        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">`
);

// Update Workspace Plans text
content = content.replace(
  /<h3 className="font-outfit font-bold text-xl text-brand-navy group-hover:text-brand-orange transition-colors">Hot Desks<\/h3>\s*<p className="text-slate-500 text-sm sm:text-sm font-normal leading-relaxed">\s*Reserve a seat in our open-plan shared workspace community. Perfect for freelancers, startup founders, and remote workers who enjoy a collaborative environment.\s*<\/p>/,
  `<h3 className="font-outfit font-bold text-xl text-brand-navy group-hover:text-brand-orange transition-colors">Dedicated Desk</h3>\n                    <p className="text-slate-500 text-sm sm:text-sm font-normal leading-relaxed">\n                      Enjoy the comfort of your own dedicated desk in our coworking space. The desk is reserved for you at a specific spot in our facility during your membership period.\n                    </p>`
);

content = content.replace(
  /<span className="text-lg font-bold text-brand-navy">₹450<span className="text-sm text-slate-400 font-normal"> \/seat\/day<\/span><\/span>\s*<button onClick=\{\(\) => handleOpenBooking\("Coimbatore: Hot Desks"\)\} className="px-5 py-2.5 bg-brand-navy hover:bg-brand-orange text-white text-\[10px\] font-black uppercase tracking-wider rounded-xl transition-all">Book Space<\/button>/,
  `<span className="text-lg font-bold text-brand-navy">₹6,000<span className="text-sm text-slate-400 font-normal"> /seat/mo</span></span>\n                  <button onClick={() => handleOpenBooking("Coimbatore: Dedicated Desk")} className="px-5 py-2.5 bg-brand-navy hover:bg-brand-orange text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all">Book Space</button>`
);

content = content.replace(
  /<h3 className="font-outfit font-bold text-xl text-brand-navy group-hover:text-brand-orange transition-colors">Private Cabins<\/h3>\s*<p className="text-slate-500 text-sm sm:text-sm font-normal leading-relaxed">\s*Fully furnished enclosed glass cabins tailored for teams ranging from 2 to 20\+ members. Designed for focus, privacy, and uninterrupted productivity.\s*<\/p>/,
  `<h3 className="font-outfit font-bold text-xl text-brand-navy group-hover:text-brand-orange transition-colors">Day Pass</h3>\n                    <p className="text-slate-500 text-sm sm:text-sm font-normal leading-relaxed">\n                      Reserve your seat in our coworking space for individuals and enjoy all the amenities with the flexibility to use it your way when you book by the hour, day or month.\n                    </p>`
);

content = content.replace(
  /<span className="text-lg font-bold text-brand-navy">Custom<span className="text-sm text-slate-400 font-normal"> Pricing<\/span><\/span>\s*<button onClick=\{\(\) => handleOpenBooking\("Coimbatore: Private Cabins"\)\} className="px-5 py-2.5 bg-brand-navy hover:bg-brand-orange text-white text-\[10px\] font-black uppercase tracking-wider rounded-xl transition-all">Get Quote<\/button>/,
  `<span className="text-lg font-bold text-brand-navy">₹450<span className="text-sm text-slate-400 font-normal"> /seat/day</span></span>\n                  <button onClick={() => handleOpenBooking("Coimbatore: Day Pass")} className="px-5 py-2.5 bg-brand-navy hover:bg-brand-orange text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all">Book Space</button>`
);


// Why Choose Us
content = content.replace(
  /<h4 className="font-outfit font-bold text-lg text-slate-900 mb-1">Unmatched Flexibility<\/h4>\s*<p className="text-slate-500 text-sm leading-relaxed">\s*Scale your workspace up or down instantly. Our monthly rolling contracts mean you're never tied down to long-term leases, giving your business the agility it needs.\s*<\/p>/,
  `<h4 className="font-outfit font-bold text-lg text-slate-900 mb-1">Flexible Plans</h4>\n                    <p className="text-slate-500 text-sm leading-relaxed">\n                      Covai Tech Park offers flexible coworking membership plans that cater to your long-term and short-term workspace needs. You can book our coworking space starting from a day, a week, or a month.\n                    </p>`
);

content = content.replace(
  /<h4 className="font-outfit font-bold text-lg text-slate-900 mb-1">Premium Grade Amenities<\/h4>\s*<p className="text-slate-500 text-sm leading-relaxed">\s*From enterprise-grade secure Wi-Fi to ergonomic seating, gourmet coffee, and smart meeting rooms. We handle the infrastructure so you can focus on your work.\s*<\/p>/,
  `<h4 className="font-outfit font-bold text-lg text-slate-900 mb-1">Cost-effective Workspace Solution</h4>\n                    <p className="text-slate-500 text-sm leading-relaxed">\n                      Coworking space at Covai Tech Park business center are ready-to-use, which significantly reduce the initial investment required to set up your office space in Coimbatore.\n                    </p>`
);

content = content.replace(
  /<h4 className="font-outfit font-bold text-lg text-slate-900 mb-1">Vibrant Community<\/h4>\s*<p className="text-slate-500 text-sm leading-relaxed">\s*Join a thriving ecosystem of over 650\+ businesses. Attend exclusive networking events, skill-sharing workshops, and connect with potential collaborators and clients.\s*<\/p>/,
  `<h4 className="font-outfit font-bold text-lg text-slate-900 mb-1">Maintenance Covered</h4>\n                    <p className="text-slate-500 text-sm leading-relaxed">\n                      Don't worry about the maintenance of your office space - we've got you covered! Our dedicated staff handle regular cleaning and maintenance to keep your workspace fresh and fully functional.\n                    </p>`
);

fs.writeFileSync(path, content, 'utf8');
console.log('Updated Coimbatore page successfully!');
