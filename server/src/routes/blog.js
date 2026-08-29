const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');
const BLOG_FILE = path.join(DATA_DIR, 'custom_blog_posts.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    console.error('[BLOG API] Failed to create data directory:', e.message);
  }
}

// Helper to read custom posts
function readCustomPosts() {
  try {
    if (fs.existsSync(BLOG_FILE)) {
      const data = fs.readFileSync(BLOG_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('[BLOG API] Error reading blog posts:', e.message);
  }
  return {};
}

// Helper to write custom posts
function writeCustomPosts(posts) {
  try {
    fs.writeFileSync(BLOG_FILE, JSON.stringify(posts, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error('[BLOG API] Error writing blog posts:', e.message);
    return false;
  }
}

// GET /api/blog/posts - Get all custom published posts
router.get('/posts', (req, res) => {
  const posts = readCustomPosts();
  res.json({ success: true, posts });
});

// POST /api/blog/posts - Directly publish/save an article to server
router.post('/posts', (req, res) => {
  const post = req.body;
  if (!post || !post.slug || !post.title) {
    return res.status(400).json({ success: false, error: 'Title and slug are required.' });
  }

  const posts = readCustomPosts();
  posts[post.slug] = post;
  
  if (writeCustomPosts(posts)) {
    console.log(`[BLOG API] Article published directly: ${post.slug}`);
    res.json({ success: true, message: 'Article published directly to server!', post });
  } else {
    res.status(500).json({ success: false, error: 'Failed to save article to server disk.' });
  }
});

// DELETE /api/blog/posts/:slug - Delete a published post
router.delete('/posts/:slug', (req, res) => {
  const { slug } = req.params;
  const posts = readCustomPosts();
  if (posts[slug]) {
    delete posts[slug];
    writeCustomPosts(posts);
    console.log(`[BLOG API] Article deleted: ${slug}`);
    return res.json({ success: true, message: 'Article deleted from server.' });
  }
  res.status(404).json({ success: false, error: 'Article not found.' });
});

module.exports = router;
