// Capture the actual pages, so library previews stay faithful to their contents.
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require('playwright');
const root = path.resolve(__dirname, '..');
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'library.json'), 'utf8'));

(async () => {
  const browser = await chromium.launch({headless:true, ...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {})});
  try {
    const page = await browser.newPage({viewport:{width:1200,height:632}, deviceScaleFactor:1});
    fs.mkdirSync(path.join(root,'docs/assets/previews'), {recursive:true});
    for (const entry of catalog.pages) {
      await page.goto(pathToFileURL(path.join(root, 'docs', entry.path)).href, {waitUntil:'networkidle'});
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({path:path.join(root, 'docs/assets/previews', entry.id + '.jpg'),type:'jpeg',quality:85});
      console.log('Preview:', entry.id);
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
