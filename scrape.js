const cheerio = require('cheerio');
const fs = require('fs');

const urls = [
  'https://covaitechpark.com/private-office-space/',
  'https://covaitechpark.com/managed-office/',
  'https://covaitechpark.com/virtual-office/',
  'https://covaitechpark.com/meeting-room/',
  'https://covaitechpark.com/event-space-in-coimbatore/',
  'https://covaitechpark.com/training-room/',
  'https://covaitechpark.com/coworking-space/'
];

async function fetchAndExtract(url) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // Remove header and footer
    $('header, footer, nav, script, style, .site-footer').remove();
    
    const title = $('h1').first().text().trim() || $('h2').first().text().trim();
    
    // Grab elements that look like descriptions
    let paragraphs = [];
    $('.elementor-widget-text-editor p, p').each((i, el) => {
      const text = $(el).text().trim();
      if (text.length > 20 && !paragraphs.includes(text)) {
        paragraphs.push(text);
      }
    });

    console.log(`\n=== URL: ${url} ===`);
    console.log(`Title: ${title}`);
    console.log(`Paragraphs:\n- ${paragraphs.slice(0, 5).join('\n- ')}`);
  } catch(e) {
    console.error(`Error on ${url}:`, e.message);
  }
}

async function main() {
  for (const url of urls) {
    await fetchAndExtract(url);
  }
}

main();
