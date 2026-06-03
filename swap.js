const fs = require('fs');
const content = fs.readFileSync('app/page.tsx', 'utf8');
const lines = content.split(/\r?\n/);

const locationsStart = 1226; // 1-indexed 1227
const locationsEnd = 1356;
const aboutStart = 1356; // 1-indexed 1357
const aboutEnd = 1433;

const locationsLines = lines.slice(locationsStart, locationsEnd);
const aboutLines = lines.slice(aboutStart, aboutEnd);

const newLines = [
  ...lines.slice(0, locationsStart),
  ...aboutLines,
  ...locationsLines,
  ...lines.slice(aboutEnd)
];

fs.writeFileSync('app/page.tsx', newLines.join('\n'), 'utf8');
console.log('Swapped successfully!');
