const fs = require('fs');
const https = require('https');
const path = require('path');

const pageTsxPath = path.join(__dirname, '..', 'app', 'page.tsx');
let content = fs.readFileSync(pageTsxPath, 'utf8');

const regex = /https:\/\/(images\.unsplash\.com|images\.pexels\.com)[^\s\"'\`\?]+\??[^\s\"'\`\)]*/g;
const matches = [...new Set(content.match(regex) || [])];

console.log(`Found ${matches.length} unique external image URLs.`);

const optimizedDir = path.join(__dirname, '..', 'public', 'optimized');
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    // Append auto compress to Pexels URLs to save download time and space
    let fetchUrl = url;
    if (fetchUrl.includes('pexels.com') && !fetchUrl.includes('?')) {
      fetchUrl += '?auto=compress&cs=tinysrgb&w=800';
    } else if (fetchUrl.includes('unsplash.com') && !fetchUrl.includes('&w=')) {
      fetchUrl += '&w=800&q=80';
    }

    const file = fs.createWriteStream(dest);
    https.get(fetchUrl, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close(resolve);
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function processImages() {
  for (let i = 0; i < matches.length; i++) {
    const url = matches[i];
    // Remove query params for filename
    const cleanUrl = url.split('?')[0];
    const filename = `ext_${i}_${path.basename(cleanUrl)}`;
    const destPath = path.join(optimizedDir, filename);
    const publicPath = `/optimized/${filename}`;

    console.log(`Downloading ${url} -> ${publicPath}`);
    try {
      await downloadImage(url, destPath);
      // Replace in content
      // Need to escape url for regex
      const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const urlRegex = new RegExp(escapeRegExp(url), 'g');
      content = content.replace(urlRegex, `prefix("${publicPath}")`);
    } catch (e) {
      console.error(`Failed to download ${url}`, e);
    }
  }

  // Also remove prefix("prefix( ... )") if double-prefixed by accident
  content = content.replace(/prefix\(\"prefix\(\\\"(.*?)\\\"\)\"\)/g, 'prefix("$1")');
  // Wait, the original strings were "https://..." without prefix().
  // If we replace "https://..." with prefix("/optimized/..."), it becomes prefix("/optimized/...")
  // But wait, the original code had them as strings: image: "https://..."
  // If we replace it with prefix("/optimized/..."), it will be image: prefix("/optimized/...")
  // We need to ensure we don't end up with "prefix(...)" as a string literal!
  // Ah, `content = content.replace(..., 'prefix(...)')` might replace inside a string literal.
  // Wait, if it's image: "https://...", it becomes image: "prefix("/optimized/...")". That's a syntax error!
  // Let's replace "https://..." with prefix("/optimized/...") without the surrounding quotes if possible.
  
  fs.writeFileSync(pageTsxPath, content, 'utf8');
  console.log('Finished processing images. Check app/page.tsx for any syntax errors.');
}

processImages();
