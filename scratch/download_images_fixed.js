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
    let fetchUrl = url;
    if (fetchUrl.includes('pexels.com') && !fetchUrl.includes('?')) {
      fetchUrl += '?auto=compress&cs=tinysrgb&w=800';
    } else if (fetchUrl.includes('unsplash.com') && !fetchUrl.includes('&w=')) {
      fetchUrl += '&w=800&q=80';
    }

    const file = fs.createWriteStream(dest);
    https.get(fetchUrl, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => file.close(resolve));
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function processImages() {
  for (let i = 0; i < matches.length; i++) {
    const url = matches[i];
    const cleanUrl = url.split('?')[0];
    const filename = `ext_${i}_${path.basename(cleanUrl)}`;
    const destPath = path.join(optimizedDir, filename);
    const publicPath = `/optimized/${filename}`;

    console.log(`Downloading ${url} -> ${publicPath}`);
    try {
      await downloadImage(url, destPath);
      // Replace the string literal containing the URL with a prefix() call
      // We look for "url" or 'url' or `url` and replace the whole thing with prefix("/optimized/...")
      const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      const doubleQuoteRegex = new RegExp(`"${escapeRegExp(url)}"`, 'g');
      content = content.replace(doubleQuoteRegex, `prefix("${publicPath}")`);
      
      const singleQuoteRegex = new RegExp(`'${escapeRegExp(url)}'`, 'g');
      content = content.replace(singleQuoteRegex, `prefix('${publicPath}')`);

      const backtickRegex = new RegExp(`\`${escapeRegExp(url)}\``, 'g');
      content = content.replace(backtickRegex, `prefix(\`${publicPath}\`)`);
      
    } catch (e) {
      console.error(`Failed to download ${url}`, e);
    }
  }

  fs.writeFileSync(pageTsxPath, content, 'utf8');
  console.log('Finished processing images. Check app/page.tsx for any syntax errors.');
}

processImages();
