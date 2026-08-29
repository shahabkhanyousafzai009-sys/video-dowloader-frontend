import React, { useEffect } from 'react';
import { BlogPost, BLOG_POSTS } from '../data/blogData';
import { AdBanner } from './AdBanner';
import { BlogThumbnail } from './BlogThumbnail';

interface BlogPostPageProps {
  post: BlogPost;
  onBack: () => void;
  onNavigateHome: () => void;
  onSelectPost?: (slug: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack, onNavigateHome, onSelectPost }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Dynamic SEO Title
    document.title = `${post.title} | SnapLoad`;

    // Dynamic Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', post.excerpt);
    }

    // Dynamic Canonical Link
    const postUrl = `https://snaploaddownload.com/blog/${post.slug}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', postUrl);
    }

    // Dynamic OpenGraph Metadata
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', post.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', post.excerpt);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', postUrl);

    if (post.imageUrl) {
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute('content', post.imageUrl);
      let twitterImage = document.querySelector('meta[name="twitter:image"]');
      if (twitterImage) twitterImage.setAttribute('content', post.imageUrl);
    }

    // Inject Article & BreadcrumbList JSON-LD Schemas for High-Level Google SEO
    const articleSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${postUrl}#article`,
          'isPartOf': {
            '@type': 'WebPage',
            '@id': postUrl,
            'url': postUrl,
            'name': post.title,
          },
          'headline': post.title,
          'description': post.excerpt,
          'mainEntityOfPage': postUrl,
          'datePublished': post.publishDate,
          'dateModified': post.lastUpdated,
          'articleSection': post.category,
          'image': post.imageUrl || 'https://snaploaddownload.com/og-image.png',
          'author': {
            '@type': 'Organization',
            'name': post.author.name,
            'jobTitle': post.author.role,
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'SnapLoad',
            'url': 'https://snaploaddownload.com/',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://snaploaddownload.com/logo.png',
            },
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${postUrl}#breadcrumb`,
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://snaploaddownload.com/',
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Blog',
              'item': 'https://snaploaddownload.com/blog',
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': post.title,
              'item': postUrl,
            },
          ],
        },
      ],
    };

    let scriptTag = document.getElementById('blog-article-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'blog-article-jsonld';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(articleSchema);

    return () => {
      if (scriptTag) scriptTag.remove();
    };
  }, [post]);

  const relatedPosts = Object.values(BLOG_POSTS)
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1))
    .slice(0, 2);

  return (
    <article className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold dark:text-white/50 text-dark-500">
        <button onClick={onNavigateHome} className="hover:text-primary-400 transition-colors cursor-pointer">
          Home
        </button>
        <span>/</span>
        <button onClick={onBack} className="hover:text-primary-400 transition-colors cursor-pointer">
          Blog
        </button>
        <span>/</span>
        <span className="dark:text-white text-dark-900 truncate max-w-xs">{post.title}</span>
      </div>

      {/* Featured Banner Thumbnail */}
      <BlogThumbnail category={post.category} title={post.title} imageUrl={post.imageUrl} size="lg" />

      {/* Main Glass Article Wrapper */}
      <div className="glass rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-8">
        
        {/* Article Header */}
        <header className="space-y-4 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-500/20 text-primary-300 border border-primary-500/30">
              {post.category}
            </span>
            <span className="text-xs dark:text-white/40 text-dark-400 font-mono">
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold dark:text-white text-dark-900 leading-tight tracking-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base dark:text-white/60 text-dark-600 leading-relaxed font-medium">
            {post.subtitle}
          </p>

          {/* Author E-E-A-T Info */}
          <div className="flex items-center gap-3 pt-4">
            <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-xl border border-primary-500/30">
              {post.author.avatar}
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold dark:text-white text-dark-900">
                {post.author.name}
              </p>
              <p className="text-[11px] dark:text-white/40 text-dark-400">
                {post.author.role} • Updated {post.lastUpdated}
              </p>
            </div>
          </div>
        </header>

        {/* Table of Contents */}
        {post.tableOfContents && post.tableOfContents.length > 0 && (
          <nav className="glass-subtle rounded-2xl p-5 border border-white/10 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider dark:text-white/80 text-dark-800">
              Table of Contents
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {post.tableOfContents.map((toc) => (
                <li key={toc.id}>
                  <a
                    href={`#${toc.id}`}
                    className="dark:text-primary-300 text-primary-600 hover:underline font-medium"
                  >
                    {toc.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Content Body */}
        <div
          className="blog-article-content prose prose-invert max-w-none dark:text-white/90 text-dark-800 leading-relaxed text-sm sm:text-base space-y-4"
          dangerouslySetInnerHTML={{
            __html: (() => {
              if (!post.content) return '';
              let c = post.content.trim();
              // Parse markdown headings if present
              if (c.includes('## ') || c.includes('### ') || c.includes('#### ')) {
                c = c
                  .split('\n')
                  .map((line) => {
                    const tr = line.trim();
                    if (tr.startsWith('#### ')) return `<h4>${tr.replace(/^####\s+/, '')}</h4>`;
                    if (tr.startsWith('### ')) return `<h3>${tr.replace(/^###\s+/, '')}</h3>`;
                    if (tr.startsWith('## ')) return `<h2>${tr.replace(/^##\s+/, '')}</h2>`;
                    if (tr.startsWith('# ')) return `<h2>${tr.replace(/^#\s+/, '')}</h2>`;
                    if (tr && !tr.startsWith('<')) return `<p>${tr}</p>`;
                    return tr;
                  })
                  .join('\n');
              } else if (!c.includes('<h2') && !c.includes('<h3') && !c.includes('<p')) {
                c = c
                  .split(/\n\s*\n|\n/)
                  .map((p) => (p.trim() ? `<p>${p.trim()}</p>` : ''))
                  .join('\n');
              }
              return c;
            })(),
          }}
        />

        {/* Policy-Compliant Bottom Ad Banner (strictly below publisher text) */}
        <AdBanner slot="blog-article-bottom-slot" label="Advertisement" className="mt-12" />

        {/* Author Bio Box */}
        <footer className="glass-subtle rounded-2xl p-6 border border-white/10 space-y-3 mt-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{post.author.avatar}</span>
            <div>
              <h4 className="font-bold dark:text-white text-dark-900 text-sm">
                Written by {post.author.name}
              </h4>
              <p className="text-xs dark:text-white/50 text-dark-500">
                {post.author.role} at SnapLoad
              </p>
            </div>
          </div>
          <p className="text-xs dark:text-white/60 text-dark-600 leading-relaxed">
            Our media technical team conducts rigorous safety audits, privacy tests, and stream manifest analysis to publish verified guides and tutorials for users worldwide.
          </p>
        </footer>

        {/* Related Articles & Guides Grid */}
        <div className="pt-8 border-t border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold dark:text-white text-dark-900 tracking-tight">
              Related Articles &amp; Guides
            </h3>
            <button
              onClick={onBack}
              className="text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors cursor-pointer"
            >
              View All Articles &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map((relPost) => (
              <div
                key={relPost.slug}
                onClick={() => (onSelectPost ? onSelectPost(relPost.slug) : onBack())}
                className="cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
              >
                <BlogThumbnail category={relPost.category} title={relPost.title} imageUrl={relPost.imageUrl} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Back to Blog Button */}
        <div className="pt-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-semibold transition-colors dark:text-white text-dark-900 cursor-pointer"
          >
            &larr; Back to Knowledge Base
          </button>
          <button
            onClick={onNavigateHome}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs sm:text-sm font-semibold shadow-glow cursor-pointer"
          >
            Use Video Downloader &rarr;
          </button>
        </div>
      </div>
    </article>
  );
};
