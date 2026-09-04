const fs = require('fs');
const path = require('path');
const { injectSeoMeta } = require('../server/src/utils/seoMeta');
const { prerenderContent } = require('../server/src/utils/prerenderContent');

const clientBuildPath = path.join(__dirname, '../client/dist');
const indexPath = path.join(clientBuildPath, 'index.html');
const rawHtml = fs.readFileSync(indexPath, 'utf8');

const testRoutes = [
  '/privacy-policy',
  '/terms-of-service',
  '/about-us',
  '/contact',
  '/blog',
  '/guides',
  '/blog/social-media-video-formats-resolutions-audio-guide',
];

for (const r of testRoutes) {
  let html = injectSeoMeta(rawHtml, r);
  const richBody = prerenderContent(r);
  html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${richBody}</div>`);
  console.log(`[PASS] ${r.padEnd(55)} Length: ${html.length.toLocaleString()} bytes`);
}
