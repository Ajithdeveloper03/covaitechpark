const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const pages = [
  path.join(projectRoot, 'app/page.tsx'),
  path.join(projectRoot, 'app/coimbatore/page.tsx'),
];

pages.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Global pass: Ensure all below-the-fold Image elements have sizes attribute and default to lazy-loading
  content = content.replace(/<Image([^>]+)\/>/g, (match, attrs) => {
    // Skip if it is already containing priority or loading="lazy" or sizes
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
