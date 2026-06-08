const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\inyma\\.gemini\\antigravity-ide\\brain\\530efe1a-00b0-4563-8fc6-f693f90f6733\\.system_generated\\steps\\352\\content.md', 'utf8');

// simple regex to remove tags and get text
const text = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
fs.writeFileSync('C:\\Users\\inyma\\.gemini\\antigravity-ide\\brain\\530efe1a-00b0-4563-8fc6-f693f90f6733\\scratch\\extracted_text.txt', text);
