const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const pages = [
  path.join(projectRoot, 'app/contact/page.tsx'),
  path.join(projectRoot, 'app/about-us/page.tsx'),
  path.join(projectRoot, 'app/private-office-space/page.tsx'),
];

pages.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Contact Page Hero background image
  if (filePath.endsWith('contact/page.tsx')) {
    content = content.replace(
      /className="relative min-h-\[55vh\] flex flex-col justify-center items-center text-center pt-32 pb-16 section-x z-10 bg-slate-950"\s+style=\{\{\s+backgroundImage: `linear-gradient\(rgba\(10, 15, 26, 0.75\), rgba\(10, 15, 26, 0.88\)\), url\(\$\{prefix\("\/hero-bg.png"\)\}\)\`,\s+backgroundSize: "cover",\s+backgroundPosition: "center",\s+\}\}/g,
      'className="relative min-h-[55vh] flex flex-col justify-center items-center text-center pt-32 pb-16 section-x z-10 bg-slate-950 overflow-hidden">\n        <div className="absolute inset-0 -z-10">\n          <Image src={prefix("/hero-bg.png")} alt="Hero Background" fill className="object-cover" sizes="100vw" priority />\n          <div className="absolute inset-0 bg-slate-950/80" />\n        </div>'
    );
  }

  // Replace About Us Page Hero background image
  if (filePath.endsWith('about-us/page.tsx')) {
    content = content.replace(
      /className="relative min-h-\[60vh\] flex flex-col justify-center items-center text-center pt-32 pb-16 section-x bg-slate-950"\s+style=\{\{\s+backgroundImage: `linear-gradient\(rgba\(10, 15, 26, 0.75\), rgba\(10, 15, 26, 0.88\)\), url\(\$\{prefix\("\/hero-bg.png"\)\}\)\`,\s+backgroundSize: "cover",\s+backgroundPosition: "center",\s+\}\}/g,
      'className="relative min-h-[60vh] flex flex-col justify-center items-center text-center pt-32 pb-16 section-x bg-slate-950 overflow-hidden">\n        <div className="absolute inset-0 -z-10">\n          <Image src={prefix("/hero-bg.png")} alt="Hero Background" fill className="object-cover" sizes="100vw" priority />\n          <div className="absolute inset-0 bg-slate-950/80" />\n        </div>'
    );
  }

  // Replace Private Office Page Hero and CTA background images
  if (filePath.endsWith('private-office-space/page.tsx')) {
    content = content.replace(
      /id="hero"\s+className="relative min-h-\[90vh\] flex flex-col lg:flex-row justify-center items-center overflow-hidden pt-28 pb-16 section-x gap-12 bg-slate-950"\s+style=\{\{\s+backgroundImage: `linear-gradient\(rgba\(10, 15, 26, 0.78\), rgba\(10, 15, 26, 0.88\)\), url\(\$\{prefix\("\/hero-bg.png"\)\}\)\`,\s+backgroundSize: "cover",\s+backgroundPosition: "center",\s+\}\}/g,
      'id="hero"\n        className="relative min-h-[90vh] flex flex-col lg:flex-row justify-center items-center overflow-hidden pt-28 pb-16 section-x gap-12 bg-slate-950">\n        <div className="absolute inset-0 -z-10">\n          <Image src={prefix("/hero-bg.png")} alt="Hero Background" fill className="object-cover" sizes="100vw" priority />\n          <div className="absolute inset-0 bg-slate-950/85" />\n        </div>'
    );

    content = content.replace(
      /className="relative w-full overflow-hidden py-24 bg-slate-950"\s+style=\{\{\s+backgroundImage: `linear-gradient\(rgba\(10, 15, 26, 0.8\), rgba\(10, 15, 26, 0.9\)\), url\(\$\{prefix\("\/awards-bg.jpg"\)\}\)\`,\s+backgroundSize: "cover",\s+backgroundPosition: "center",\s+\}\}/g,
      'className="relative w-full overflow-hidden py-24 bg-slate-950">\n        <div className="absolute inset-0 -z-10">\n          <Image src={prefix("/awards-bg.jpg")} alt="CTA Background" fill className="object-cover" sizes="100vw" loading="lazy" />\n          <div className="absolute inset-0 bg-slate-950/85" />\n        </div>'
    );
  }

  // Global pass: Ensure all below-the-fold Image elements have sizes attribute and default to lazy-loading
  content = content.replace(/<Image([^>]+)\/>/g, (match, attrs) => {
    // Skip if it is already containing priority or loading="lazy"
    let newAttrs = attrs;
    
    // Add sizes if not present
    if (!newAttrs.includes('sizes=')) {
      newAttrs += ' sizes="(max-width: 768px) 100vw, 800px"';
    }
    
    // Add loading="lazy" if neither loading nor priority are present
    if (!newAttrs.includes('loading=') && !newAttrs.includes('priority')) {
      newAttrs += ' loading="lazy"';
    }
    
    return `<Image${newAttrs}/>`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Optimized images in: ${filePath}`);
});
