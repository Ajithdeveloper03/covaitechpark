const fs = require('fs');

const html = fs.readFileSync('private-office.html', 'utf-8');

// Match elementor-heading-title
const headings = [...html.matchAll(/<[^>]+class="[^"]*elementor-heading-title[^"]*"[^>]*>([\s\S]*?)<\/[^>]+>/gi)];
console.log("=== HEADINGS ===");
headings.forEach(m => console.log(m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()));

// Match elementor-text-editor
const texts = [...html.matchAll(/<div class="elementor-text-editor elementor-clearfix">([\s\S]*?)<\/div>/gi)];
console.log("\n=== TEXTS ===");
texts.forEach(m => console.log(m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()));
