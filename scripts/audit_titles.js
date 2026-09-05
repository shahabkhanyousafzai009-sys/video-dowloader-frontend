const { injectSeoMeta } = require('../server/src/utils/seoMeta.js');
const fs = require('fs');

const sitemap = fs.readFileSync('client/public/sitemap.xml', 'utf8');
const locs = [...sitemap.matchAll(/<loc>https:\/\/snaploaddownload\.com(.*?)<\/loc>/g)].map(m => m[1] || '/');

const htmlTemplate = '<!DOCTYPE html><html><head><title>Default</title><meta name="description" content="Default" /></head><body><div id="root"></div></body></html>';

const titles = {};
const dupes = {};

locs.forEach(route => {
  const out = injectSeoMeta(htmlTemplate, route);
  const match = out.match(/<title>(.*?)<\/title>/);
  const title = match ? match[1] : '';
  if (!titles[title]) titles[title] = [];
  titles[title].push(route);
});

for (const [t, list] of Object.entries(titles)) {
  if (list.length > 1) {
    dupes[t] = list;
  }
}

console.log('Unique titles:', Object.keys(titles).length);
console.log('Duplicate title groups:', Object.keys(dupes).length);
console.log(JSON.stringify(dupes, null, 2));
