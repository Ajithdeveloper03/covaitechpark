const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\inyma\\.gemini\\antigravity-ide\\brain\\af4ea2ed-d809-4982-a156-398277b45fe5\\.system_generated\\steps\\12\\content.md', 'utf-8');

const footerMatch = content.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i);
if (footerMatch) {
  console.log(footerMatch[1].replace(/<[^>]+>/g, '\n').replace(/\n+/g, '\n').trim());
} else {
  // if not found by <footer tag, try another way
  const elementorFooter = content.match(/elementor-location-footer([\s\S]*?)<\/html>/i);
  if (elementorFooter) {
    console.log(elementorFooter[1].replace(/<[^>]+>/g, '\n').replace(/\n+/g, '\n').trim());
  } else {
    console.log("Footer not found");
  }
}
