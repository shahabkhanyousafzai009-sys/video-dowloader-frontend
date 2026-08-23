import React from 'react';
import type { GuideArticle } from '../data/guidesData';
import { UrlInput } from './UrlInput';
import { AdBanner } from './AdBanner';
import { BlogThumbnail } from './BlogThumbnail';

interface GuideDetailPageProps {
  guide: GuideArticle;
  onBack: () => void;
  onFetchInfo: (url: string) => void;
  loading: boolean;
  onReset: () => void;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({
  guide,
  onBack,
  onFetchInfo,
  loading,
  onReset,
}) => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [guide.slug]);

  return (
    <article className="space-y-8 animate-fade-in max-w-3xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-medium dark:text-white/40 text-dark-400">
        <button onClick={onBack} className="hover:text-primary-400 transition-colors cursor-pointer">
          Guides
        </button>
        <span>/</span>
        <span className="dark:text-white/80 text-dark-700 font-semibold truncate">{guide.title}</span>
      </div>

      {/* Guide Featured Cover Thumbnail */}
      <BlogThumbnail category={guide.platform} title={guide.title} imageUrl={guide.imageUrl} size="lg" />

      {/* Guide Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs">
          <span className="px-3 py-1 rounded-full font-bold uppercase tracking-wider bg-primary-500/10 text-primary-400 border border-primary-500/20">
            {guide.platform} Guide
          </span>
          <span className="dark:text-white/40 text-dark-400">{guide.readTime}</span>
          <span className="dark:text-white/20 text-dark-300">•</span>
          <span className="dark:text-white/40 text-dark-400">Updated {guide.updatedDate}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-dark-900 leading-tight">
          {guide.heroHeading}{' '}
          <span className="gradient-text">{guide.heroHighlight}</span>
        </h1>

        <p className="text-base dark:text-white/60 text-dark-600 leading-relaxed">
          {guide.subtitle}
        </p>
      </div>

      {/* Embedded Downloader Widget inside Guide */}
      <div className="glass-strong rounded-2xl p-6 space-y-3 border border-primary-500/20 shadow-glow">
        <div className="flex items-center justify-between text-xs font-semibold text-primary-400">
          <span>Try It Now — Fast Free Downloader</span>
          <span>No Signup Required</span>
        </div>
        <UrlInput onSubmit={onFetchInfo} loading={loading} onReset={onReset} />
      </div>

      {/* Step-by-Step Instructions */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold dark:text-white text-dark-900 flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary-400">
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          Step-by-Step Tutorial
        </h2>

        <div className="space-y-4">
          {guide.steps.map((step) => (
            <div key={step.stepNumber} className="glass rounded-xl p-5 flex gap-4 items-start border border-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0 shadow-md">
                {step.stepNumber}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold dark:text-white text-dark-900">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm dark:text-white/60 text-dark-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mid-Guide Ad Banner */}
      <AdBanner slot={`guide-${guide.slug}-mid`} label="Sponsored Content" className="my-6" />

      {/* Frequently Asked Questions */}
      <section className="space-y-4 pt-4 border-t border-white/5">
        <h2 className="text-xl font-bold dark:text-white text-dark-900 flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary-400">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {guide.faqs.map((faq, idx) => (
            <div key={idx} className="glass-subtle rounded-xl p-4 space-y-2">
              <h3 className="text-sm font-bold dark:text-white text-dark-900">
                {faq.question}
              </h3>
              <p className="text-xs dark:text-white/50 text-dark-500 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Guide Ad Banner */}
      <AdBanner slot={`guide-${guide.slug}-bottom`} label="Advertisement" className="mt-6" />

      {/* Back to Guides Link */}
      <div className="pt-4 text-center">
        <button
          onClick={onBack}
          className="text-xs font-semibold text-primary-400 hover:text-primary-300 underline underline-offset-4 cursor-pointer"
        >
          ← Back to All How-To Guides
        </button>
      </div>
    </article>
  );
};
