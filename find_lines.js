const fs = require('fs');
const lines = fs.readFileSync('app/page.tsx', 'utf8').split(/\r?\n/);
lines.forEach((line, i) => {
  if (line.includes('id="services-dark"') || line.includes('id="locations"') || line.includes('id="benefits-organic"')) {
    console.log((i + 1) + ": " + line.trim());
  }
});
