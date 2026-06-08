const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\inyma\\.gemini\\antigravity-ide\\brain\\530efe1a-00b0-4563-8fc6-f693f90f6733\\.system_generated\\steps\\352\\content.md', 'utf8');

const regex = /<img[^>]+src="([^">]+)"[^>]*>/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const url = match[1];
  if (url.includes('.svg') || url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg')) {
    // Find text near the image
    const start = Math.max(0, match.index - 150);
    const end = Math.min(content.length, match.index + 150);
    const context = content.substring(start, end).replace(/\n/g, ' ');
    console.log(`URL: ${url}\nContext: ${context}\n---`);
  }
}
