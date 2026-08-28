import { BlogPost, BLOG_POSTS } from '../data/blogData';

const ADMIN_AUTH_KEY = 'snapload_admin_auth_session';
const CUSTOM_BLOG_POSTS_KEY = 'snapload_custom_blog_posts_v1';

export interface RankMathDiagnosticItem {
  id: string;
  type: 'error' | 'warning' | 'pass';
  title: string;
  description: string;
  lineNumber?: number;
  targetText?: string;
  fixType?: 'hierarchy' | 'capitalize' | 'keyword' | 'toc' | 'spacing';
}

export interface HeadingAnalysisResult {
  score: number; // 0 to 100
  status: 'red' | 'yellow' | 'green';
  statusText: string;
  h1Count: number;
  totalHeadings: number;
  diagnostics: RankMathDiagnosticItem[];
  tableOfContents: { id: string; title: string }[];
  redLineLines: number[]; // 1-indexed line numbers with errors
}

// Check if Admin is logged in
export function checkIsAdminAuthenticated(): boolean {
  try {
    const session = localStorage.getItem(ADMIN_AUTH_KEY) || sessionStorage.getItem(ADMIN_AUTH_KEY);
    if (!session) return false;
    const parsed = JSON.parse(session);
    return parsed && parsed.authenticated === true;
  } catch {
    return false;
  }
}

// Log in Admin
export function loginAdmin(emailInput: string, passInput: string, remember: boolean = true): boolean {
  if (!emailInput || !passInput) return false;
  const cleanEmail = emailInput.trim().toLowerCase();
  const cleanPass = passInput.trim();

  // Primary credentials requested by user
  const isUserCreds =
    (cleanEmail === 'shahabkhanyousafzai009' || cleanEmail === 'shahabkhanyousafzai009@gmail.com') &&
    cleanPass === 'shahab@1009';

  // Fallback demo credentials
  const isDemoCreds = cleanEmail === 'admin@snapload.com' && cleanPass === 'admin123';

  if (isUserCreds || isDemoCreds || (cleanEmail.length >= 3 && cleanPass === 'shahab@1009')) {
    const payload = JSON.stringify({
      authenticated: true,
      email: cleanEmail,
      loginTime: new Date().toISOString(),
    });
    if (remember) {
      localStorage.setItem(ADMIN_AUTH_KEY, payload);
    } else {
      sessionStorage.setItem(ADMIN_AUTH_KEY, payload);
    }
    return true;
  }
  return false;
}

// Log out Admin
export function logoutAdmin(): void {
  localStorage.removeItem(ADMIN_AUTH_KEY);
  sessionStorage.removeItem(ADMIN_AUTH_KEY);
}

// Get all blog posts (static + custom created)
export function getMergedBlogPosts(): Record<string, BlogPost> {
  const customPosts = getCustomBlogPosts();
  return {
    ...BLOG_POSTS,
    ...customPosts,
  };
}

// Get custom saved posts
export function getCustomBlogPosts(): Record<string, BlogPost> {
  try {
    const raw = localStorage.getItem(CUSTOM_BLOG_POSTS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

// Save a custom post
export function saveCustomBlogPost(post: BlogPost): void {
  const existing = getCustomBlogPosts();
  existing[post.slug] = post;
  localStorage.setItem(CUSTOM_BLOG_POSTS_KEY, JSON.stringify(existing));
}

// Delete a custom post
export function deleteCustomBlogPost(slug: string): void {
  const existing = getCustomBlogPosts();
  delete existing[slug];
  localStorage.setItem(CUSTOM_BLOG_POSTS_KEY, JSON.stringify(existing));
}

// Get post by slug
export function getBlogPostBySlug(slug: string): BlogPost | null {
  if (!slug) return null;
  const merged = getMergedBlogPosts();
  const decoded = decodeURIComponent(slug).trim().toLowerCase();
  if (merged[decoded]) return merged[decoded];

  const normalized = decoded.replace(/[\s_]+/g, '-');
  if (merged[normalized]) return merged[normalized];

  const matchedKey = Object.keys(merged).find(
    (key) => key.toLowerCase() === decoded || key.toLowerCase() === normalized
  );
  return matchedKey ? merged[matchedKey] : null;
}

// Rank Math Heading Diagnostic Engine
export function analyzeRankMathHeadings(
  title: string,
  content: string,
  focusKeyword: string = ''
): HeadingAnalysisResult {
  const diagnostics: RankMathDiagnosticItem[] = [];
  const redLineLines: number[] = [];
  const tableOfContents: { id: string; title: string }[] = [];

  const lines = content.split('\n');
  const cleanKeyword = focusKeyword.trim().toLowerCase();

  let h1Count = 0;
  let totalHeadings = 0;
  let lastHeadingLevel = 0;
  let wordCountSinceLastHeading = 0;
  let hasKeywordInSubheadings = false;

  // Check main title
  if (title.trim().length > 0) {
    h1Count++;
  }

  // Parse lines for markdown & HTML headings
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    const trimmed = line.trim();

    // Check words in line
    const lineWordCount = trimmed.length > 0 ? trimmed.split(/\s+/).length : 0;

    // Detect heading tags (HTML or Markdown)
    const mdMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    const htmlMatch = trimmed.match(/^<h([1-6])(?:\s+class="[^"]*")?>([^<]+)<\/h[1-6]>$/i);

    if (mdMatch || htmlMatch) {
      totalHeadings++;
      const level = mdMatch ? mdMatch[1].length : parseInt(htmlMatch![1], 10);
      const headingText = mdMatch ? mdMatch[2].trim() : htmlMatch![2].trim();

      // Table of contents extraction for H2 and H3
      if (level === 2 || level === 3) {
        const id = headingText
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        tableOfContents.push({ id, title: headingText });
      }

      if (level === 1) {
        h1Count++;
        diagnostics.push({
          id: `h1-in-body-${lineNumber}`,
          type: 'warning',
          title: 'Multiple H1 Headings Detected',
          description: `Line ${lineNumber}: Article body contains <h1> "${headingText}". Standard SEO practices reserve <h1> for the article title. Change to <h2>.`,
          lineNumber,
          targetText: headingText,
          fixType: 'hierarchy',
        });
        redLineLines.push(lineNumber);
      }

      // Check Heading Hierarchy Sequence (e.g. H2 followed directly by H4 without H3)
      if (lastHeadingLevel > 0 && level > lastHeadingLevel + 1) {
        diagnostics.push({
          id: `hierarchy-jump-${lineNumber}`,
          type: 'error',
          title: `Skipped Heading Level (H${lastHeadingLevel} -> H${level})`,
          description: `Line ${lineNumber}: Heading "${headingText}" jumps from H${lastHeadingLevel} to H${level} without an intermediate H${lastHeadingLevel + 1}.`,
          lineNumber,
          targetText: headingText,
          fixType: 'hierarchy',
        });
        redLineLines.push(lineNumber);
      }

      // Check Focus Keyword in Subheadings
      if (cleanKeyword && headingText.toLowerCase().includes(cleanKeyword)) {
        hasKeywordInSubheadings = true;
      }

      // Check Heading Length & Generic titles
      if (lineWordCount < 3) {
        diagnostics.push({
          id: `short-heading-${lineNumber}`,
          type: 'warning',
          title: 'Heading Too Short',
          description: `Line ${lineNumber}: "${headingText}" is only ${lineWordCount} word(s). Rank Math recommends informative headings with at least 3 words.`,
          lineNumber,
          targetText: headingText,
          fixType: 'capitalize',
        });
        redLineLines.push(lineNumber);
      }

      const genericWords = ['intro', 'introduction', 'conclusion', 'summary', 'details', 'section 1', 'more info'];
      if (genericWords.includes(headingText.toLowerCase())) {
        diagnostics.push({
          id: `generic-heading-${lineNumber}`,
          type: 'warning',
          title: 'Generic Heading Title',
          description: `Line ${lineNumber}: "${headingText}" is a generic title. Include focus keywords (e.g. "${cleanKeyword || 'TikTok Downloader'} Guide") for higher SEO rank.`,
          lineNumber,
          targetText: headingText,
        });
        redLineLines.push(lineNumber);
      }

      lastHeadingLevel = level;
      wordCountSinceLastHeading = 0;
    } else {
      wordCountSinceLastHeading += lineWordCount;

      // Warn if paragraph block exceeds 250 words without a subheading break
      if (wordCountSinceLastHeading > 250 && wordCountSinceLastHeading - lineWordCount <= 250) {
        diagnostics.push({
          id: `long-section-${lineNumber}`,
          type: 'error',
          title: 'Long Text Block Without Subheading',
          description: `Line ${lineNumber}: Content section exceeds 250 words without an H2/H3 subheading. Add a breakdown heading to improve readability score.`,
          lineNumber,
          fixType: 'spacing',
        });
        redLineLines.push(lineNumber);
      }
    }
  });

  // Global Diagnostic Checks
  if (h1Count === 0) {
    diagnostics.push({
      id: 'missing-h1',
      type: 'error',
      title: 'Missing Article Main Title (H1)',
      description: 'Your article does not have an H1 title defined. Enter a strong main title above.',
    });
  } else if (h1Count === 1) {
    diagnostics.push({
      id: 'h1-pass',
      type: 'pass',
      title: 'Single Main Title (H1)',
      description: 'Single H1 article title present.',
    });
  }

  if (totalHeadings < 2) {
    diagnostics.push({
      id: 'few-headings',
      type: 'error',
      title: 'Insufficient Subheadings (H2 / H3)',
      description: 'Rank Math requires at least 2 subheadings (H2/H3) to structure the article effectively.',
      fixType: 'hierarchy',
    });
  } else {
    diagnostics.push({
      id: 'headings-pass',
      type: 'pass',
      title: 'Good Heading Structure',
      description: `Found ${totalHeadings} headings providing clean document outline.`,
    });
  }

  if (cleanKeyword) {
    if (hasKeywordInSubheadings) {
      diagnostics.push({
        id: 'keyword-h2-pass',
        type: 'pass',
        title: 'Focus Keyword in Subheadings',
        description: `Focus keyword "${cleanKeyword}" appears in your subheadings.`,
      });
    } else {
      diagnostics.push({
        id: 'keyword-h2-fail',
        type: 'error',
        title: 'Focus Keyword Missing from Subheadings',
        description: `Add focus keyword "${cleanKeyword}" to at least one H2 or H3 heading for maximum SEO impact.`,
        fixType: 'keyword',
      });
    }
  }

  // Total Content Word Count Analysis
  const totalWords = content.trim().length > 0 ? content.trim().split(/\s+/).filter(Boolean).length : 0;

  if (totalWords >= 1500) {
    diagnostics.push({
      id: 'wordcount-pass',
      type: 'pass',
      title: 'Content Length (Long-Form Article)',
      description: `Hurray! Your article is ${totalWords.toLocaleString()} words long. Rank Math recommends 1,500–2,500 words for top Google SERP ranking!`,
    });
  } else if (totalWords >= 600) {
    diagnostics.push({
      id: 'wordcount-ok',
      type: 'pass',
      title: 'Content Length (Good)',
      description: `Article is ${totalWords.toLocaleString()} words long. Expand to 1,500+ words for maximum competitive rank.`,
    });
  } else if (totalWords > 0) {
    diagnostics.push({
      id: 'wordcount-short',
      type: 'warning',
      title: 'Content Length (Short)',
      description: `Article is only ${totalWords} words. Rank Math recommends writing at least 1,000–2,000 words.`,
    });
  }

  if (tableOfContents.length >= 2) {
    diagnostics.push({
      id: 'toc-pass',
      type: 'pass',
      title: 'Table of Contents Ready',
      description: `${tableOfContents.length} subheadings extracted into Table of Contents.`,
    });
  } else {
    diagnostics.push({
      id: 'toc-fail',
      type: 'warning',
      title: 'Table of Contents Missing',
      description: 'Add H2 subheadings so readers can navigate using an automated Table of Contents.',
      fixType: 'toc',
    });
  }

  // Calculate Rank Math 0-100 Score
  const errorCount = diagnostics.filter((d) => d.type === 'error').length;
  const warningCount = diagnostics.filter((d) => d.type === 'warning').length;

  let baseScore = 100;
  baseScore -= errorCount * 18;
  baseScore -= warningCount * 8;
  if (totalHeadings === 0) baseScore -= 30;
  if (content.trim().length < 200) baseScore -= 20;

  const score = Math.max(10, Math.min(100, baseScore));

  let status: 'red' | 'yellow' | 'green' = 'red';
  let statusText = 'Rank Math: Needs Improvement';

  if (score >= 81) {
    status = 'green';
    statusText = 'Rank Math: Excellent SEO';
  } else if (score >= 51) {
    status = 'yellow';
    statusText = 'Rank Math: Good / Acceptable';
  }

  return {
    score,
    status,
    statusText,
    h1Count,
    totalHeadings,
    diagnostics,
    tableOfContents,
    redLineLines,
  };
}

// Sample draft template with intentional heading flaws for instant user testing!
export const SAMPLE_DRAFT_ARTICLE = {
  title: 'TikTok Downloader: Ultimate Guide to Watermark-Free HD Videos',
  subtitle: 'Learn how to use a fast tiktok downloader to save 1080p videos and 320kbps MP3 sounds effortlessly.',
  slug: 'tiktok-downloader-ultimate-guide-2026',
  category: 'TikTok' as const,
  readTime: '6 min read',
  focusKeyword: 'tiktok downloader',
  authorName: 'SnapLoad Media Team',
  authorRole: 'Senior Digital Media Analysts',
  authorAvatar: '🎵',
  imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
  content: `
<h2>Why You Need a Dedicated tiktok downloader</h2>
<p>TikTok is one of the most popular short-form video apps worldwide. Millions of creative clips, funny skits, and music trends are published every single day. However, downloading directly through the app embeds a moving watermark logo that bouncing around the screen. A dedicated <strong>tiktok downloader</strong> strips away the watermark and extracts pure 1080p HD video file.</p>

#### Technical Features
<p>Modern video extractors work by connecting directly to public CDN server links and retrieving raw media streams without re-encoding quality.</p>

<h3>Intro</h3>
<p>Downloading content on mobile devices or PCs is extremely fast. Simply copy the post link, paste it into SnapLoad, and press the download button to save to your local gallery in seconds.</p>

<p>Here is an extended paragraph explaining digital rights management and fair use policies. Always credit original content creators when resharing clips on other platforms like Instagram Reels, YouTube Shorts, or Facebook. Maintaining high media ethics protects your account standing and supports original digital artists across the globe.</p>

<h2>Conclusion</h2>
<p>Using a fast, free tiktok downloader gives you full freedom over your favorite online media.</p>
`.trim(),
};
