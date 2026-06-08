const fs = require('fs');
const path = require('path');

const filesToFix = [
  path.join(__dirname, '../app/page.tsx'),
  path.join(__dirname, '../app/coimbatore/page.tsx'),
  path.join(__dirname, '../app/layout.tsx'),
];

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace font-extrabold and font-black with font-bold
    const updated = content
      .replace(/\bfont-extrabold\b/g, 'font-bold')
      .replace(/\bfont-black\b/g, 'font-bold');
    
    if (content !== updated) {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log(`Updated font weights in: ${filePath}`);
    } else {
      console.log(`No updates needed in: ${filePath}`);
    }
  } else {
    console.log(`File not found: ${filePath}`);
  }
});
