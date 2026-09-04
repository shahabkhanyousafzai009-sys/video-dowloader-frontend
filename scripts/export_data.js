const fs = require('fs');
const path = require('path');
const esbuild = require('../client/node_modules/esbuild');

async function exportData() {
  const serverDataDir = path.join(__dirname, '../server/data');
  if (!fs.existsSync(serverDataDir)) {
    fs.mkdirSync(serverDataDir, { recursive: true });
  }

  // Build blogData
  const blogResult = await esbuild.build({
    entryPoints: [path.join(__dirname, '../client/src/data/blogData.ts')],
    bundle: false,
    format: 'cjs',
    write: false,
  });

  const blogModule = {};
  const blogExports = {};
  const blogFn = new Function('module', 'exports', blogResult.outputFiles[0].text);
  blogFn(blogModule, blogExports);
  const blogPosts = blogModule.exports.BLOG_POSTS || blogExports.BLOG_POSTS || {};

  fs.writeFileSync(
    path.join(serverDataDir, 'static_blog_posts.json'),
    JSON.stringify(blogPosts, null, 2),
    'utf8'
  );
  console.log(`Exported ${Object.keys(blogPosts).length} blog posts to static_blog_posts.json`);

  // Build guidesData
  const guidesResult = await esbuild.build({
    entryPoints: [path.join(__dirname, '../client/src/data/guidesData.ts')],
    bundle: false,
    format: 'cjs',
    write: false,
  });

  const guidesModule = {};
  const guidesExports = {};
  const guidesFn = new Function('module', 'exports', guidesResult.outputFiles[0].text);
  guidesFn(guidesModule, guidesExports);
  const guides = guidesModule.exports.GUIDES_DATA || guidesExports.GUIDES_DATA || {};

  fs.writeFileSync(
    path.join(serverDataDir, 'static_guides.json'),
    JSON.stringify(guides, null, 2),
    'utf8'
  );
  console.log(`Exported ${Object.keys(guides).length} guides to static_guides.json`);
}

exportData().catch(console.error);
