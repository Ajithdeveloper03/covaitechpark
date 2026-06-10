const { execSync } = require('child_process');
const files = [
  'app/page.tsx',
  'app/about-us/page.tsx',
  'app/coimbatore/page.tsx',
  'app/private-office-space/page.tsx',
  'app/contact/page.tsx'
];

files.forEach(file => {
  try {
    console.log(`\n=================== DIFF FOR ${file} ===================`);
    const diff = execSync(`git diff HEAD -- "${file}"`, { encoding: 'utf8' });
    const lines = diff.split('\n');
    lines.forEach(line => {
      if ((line.startsWith('+') || line.startsWith('-')) && 
          !line.startsWith('+++') && !line.startsWith('---') &&
          (line.includes('font-') || line.includes('text-') || line.includes('tracking-') || line.includes('leading-'))) {
        console.log(line);
      }
    });
  } catch (err) {
    console.error(`Error diffing ${file}:`, err.message);
  }
});
