const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../client/src/data/blogData.ts');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  { slug: 'converting-video-links-to-320kbps-mp3-audio-technical-manual', img: '/mp3-audio-converter-banner.jpg' },
  { slug: 'how-to-save-instagram-reels-stories-carousel-photos-1080p-hd', img: '/instagram-reels-download-banner.jpg' },
  { slug: 'how-to-download-tiktok-videos-on-laptop', img: '/tiktok-hd-mp4-download-banner.jpg' },
  { slug: 'ultimate-guide-tiktok-video-downloader-no-watermark-2026', img: '/tiktok-hd-mp4-download-banner.jpg' }
];

replacements.forEach(({ slug, img }) => {
  const reg = new RegExp(`'${slug}':\\s*\\{[\\s\\S]*?imageUrl:\\s*'([^']+)'`);
  content = content.replace(reg, (match) => {
    return match.replace(/imageUrl:\s*'[^']+'/, `imageUrl: '${img}'`);
  });
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated article thumbnails!');
