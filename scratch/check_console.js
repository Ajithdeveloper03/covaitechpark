const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[CONSOLE ${msg.type()}]: ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.error(`[PAGE ERROR]: ${err.toString()}`);
  });

  console.log('Navigating to http://localhost:3005/covaitechpark/ ...');
  await page.goto('http://localhost:3005/covaitechpark/', { waitUntil: 'networkidle2' });
  
  console.log('Navigated. Waiting 3 seconds...');
  await new Promise(r => setTimeout(r, 3000));
  
  await browser.close();
})();
