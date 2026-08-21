import React from 'react';

export type LegalPageType = 'privacy' | 'terms' | 'disclaimer' | 'dmca' | 'about' | 'contact' | 'cookies';

interface LegalPageProps {
  type: LegalPageType;
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold dark:text-white/50 text-dark-500 mb-6">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-primary-400 transition-colors cursor-pointer"
        >
          Home
        </button>
        <span>/</span>
        <span className="dark:text-white text-dark-900 capitalize">
          {type === 'dmca' ? 'DMCA Copyright Policy' : type === 'about' ? 'About Us' : type === 'cookies' ? 'Cookie Policy' : `${type} Policy`}
        </span>
      </div>

      {/* Main Glass Card Container */}
      <div className="glass rounded-3xl p-6 sm:p-10 border border-white/10 dark:border-white/10 shadow-2xl space-y-8">
        
        {/* PRIVACY POLICY */}
        {type === 'privacy' && (
          <article className="space-y-6 dark:text-white/80 text-dark-800 leading-relaxed text-sm sm:text-base">
            <header className="border-b border-white/10 pb-6">
              <h1 className="text-2xl sm:text-4xl font-extrabold dark:text-white text-dark-900 tracking-tight">
                Privacy Policy for SnapLoad
              </h1>
              <p className="mt-2 text-xs sm:text-sm dark:text-white/40 text-dark-400 font-mono">
                Effective Date: August 21, 2026 | Last Updated: August 21, 2026
              </p>
            </header>

            <p>
              At <strong>SnapLoad</strong> (accessible from <a href="https://snaploaddownload.com" className="text-primary-400 underline">https://snaploaddownload.com</a>), one of our highest priorities is protecting the privacy and data of our users worldwide. This Privacy Policy document outlines the types of information collected by SnapLoad and how we handle it in full compliance with the <strong>Google Publisher &amp; AdSense Program Policies</strong>, <strong>GDPR (General Data Protection Regulation)</strong>, and <strong>CCPA (California Consumer Privacy Act)</strong>.
            </p>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              1. Google AdSense &amp; Advertising Cookies
            </h2>
            <p>
              SnapLoad uses Google AdSense to serve advertisements on our web pages. Google is a third-party advertising vendor on our site and uses cookies (such as DART cookies and advertising identifiers) to display ads based on users&apos; prior visits to <code>snaploaddownload.com</code> or other sites across the Internet.
            </p>
            <ul className="list-disc pl-6 space-y-2 dark:text-white/70 text-dark-600">
              <li>
                <strong>Personalized Advertising Opt-Out:</strong> Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary-400 underline font-medium">Google Ads Settings</a>.
              </li>
              <li>
                <strong>Third-Party Opt-Out:</strong> Alternatively, users can opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary-400 underline font-medium">www.aboutads.info</a>.
              </li>
              <li>
                <strong>Network Partner Ads:</strong> Third-party ad vendors or ad networks may also collect browser technical information (such as user-agent and language) strictly for frequency capping and fraud detection.
              </li>
            </ul>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              2. Zero File Storage &amp; Privacy Architecture
            </h2>
            <p>
              SnapLoad is engineered around a <strong>privacy-first, zero-storage model</strong>.
            </p>
            <div className="glass-subtle p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
              <h3 className="font-bold text-emerald-400">Security Commitment</h3>
              <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                SnapLoad <strong>does not host, archive, cache, or save any downloaded videos or audio files on our servers</strong>. All video conversions and stream transfers occur in real-time memory and stream directly to your device browser.
              </p>
            </div>
            <p>
              We do not require user account registration, login credentials, credit card info, or personal identifier submissions.
            </p>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              3. Server Logs &amp; Technical Analytics
            </h2>
            <p>
              Like most standard website operations, SnapLoad processes temporary server log entries (IP addresses, browser type, Internet Service Provider, access timestamp, and referring page URLs). These log entries are processed purely for network routing, DDoS prevention, rate-limiting API security, and general operational stability, and are automatically purged.
            </p>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              4. GDPR Privacy Rights (EEA &amp; UK Users)
            </h2>
            <p>
              For users located in the European Economic Area (EEA) or United Kingdom, you have guaranteed rights under the EU General Data Protection Regulation (GDPR):
            </p>
            <ul className="list-disc pl-6 space-y-1 dark:text-white/70 text-dark-600">
              <li>The right to withdraw consent for non-essential cookies via our Cookie Preferences popup.</li>
              <li>The right to request confirmation regarding data processing.</li>
              <li>The right to request data erasure or processing restrictions.</li>
            </ul>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              5. CCPA Rights (California Consumer Privacy Act)
            </h2>
            <p>
              Under CCPA regulations, California consumers have the right to request disclosure of personal data categories collected, request deletion, and request that personal data not be sold. SnapLoad <strong>does not sell personal data to third parties</strong>.
            </p>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              6. Contact Information
            </h2>
            <p>
              For any questions or concerns regarding our Privacy Policy, please contact our privacy compliance team at <a href="mailto:shahabkhanyousafzai009@gmail.com" className="text-primary-400 font-mono underline">shahabkhanyousafzai009@gmail.com</a>.
            </p>
          </article>
        )}

        {/* TERMS OF SERVICE */}
        {type === 'terms' && (
          <article className="space-y-6 dark:text-white/80 text-dark-800 leading-relaxed text-sm sm:text-base">
            <header className="border-b border-white/10 pb-6">
              <h1 className="text-2xl sm:text-4xl font-extrabold dark:text-white text-dark-900 tracking-tight">
                Terms of Service
              </h1>
              <p className="mt-2 text-xs sm:text-sm dark:text-white/40 text-dark-400 font-mono">
                Effective Date: August 21, 2026 | Last Updated: August 21, 2026
              </p>
            </header>

            <p>
              Welcome to <strong>SnapLoad</strong>. By accessing or using our website located at <code>https://snaploaddownload.com</code>, you agree to comply with and be bound by the following Terms of Service. If you do not agree to these terms, please refrain from using our service.
            </p>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              1. Permitted Use &amp; Educational Purpose
            </h2>
            <p>
              SnapLoad provides an online web converter and video downloading utility designed exclusively for personal, educational, non-commercial, and legitimate fair use purposes. Users are expected to respect content creators and intellectual property laws.
            </p>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              2. User Obligations &amp; Copyright Compliance
            </h2>
            <p>
              As a user of SnapLoad, you warrant and agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2 dark:text-white/70 text-dark-600">
              <li>You will only download media content for which you own the copyright, have explicit authorization from the copyright holder, or qualify under applicable Fair Use laws.</li>
              <li>You will not use SnapLoad to download pirated material, commercial films, protected music tracks, or copyrighted content for commercial distribution or monetization.</li>
              <li>You will not perform automated scraping, mass bot requests, or malicious attacks against the SnapLoad server infrastructure.</li>
            </ul>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              3. Independent Service &amp; Trademark Disclaimers
            </h2>
            <p>
              SnapLoad is an independent third-party technical tool. SnapLoad is <strong>NOT affiliated, associated, authorized, endorsed by, or in any way officially connected</strong> with TikTok, ByteDance Ltd., Instagram, Meta Platforms Inc., YouTube, Google LLC, or any of their subsidiaries or affiliates.
            </p>
            <p>
              All product names, logos, trademarks, registered trademarks, and brand names belong to their respective owners.
            </p>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              4. Disclaimer of Warranties &amp; Limitation of Liability
            </h2>
            <p>
              SnapLoad is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. Under no circumstances shall SnapLoad, its operators, or hosting providers be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this platform.
            </p>
          </article>
        )}

        {/* DMCA COPYRIGHT POLICY */}
        {type === 'dmca' && (
          <article className="space-y-6 dark:text-white/80 text-dark-800 leading-relaxed text-sm sm:text-base">
            <header className="border-b border-white/10 pb-6">
              <h1 className="text-2xl sm:text-4xl font-extrabold dark:text-white text-dark-900 tracking-tight">
                DMCA Copyright Policy &amp; Takedown Procedure
              </h1>
              <p className="mt-2 text-xs sm:text-sm dark:text-white/40 text-dark-400 font-mono">
                Compliant with Digital Millennium Copyright Act (17 U.S.C. § 512)
              </p>
            </header>

            <p>
              <strong>SnapLoad</strong> strictly respects the intellectual property rights of creators, rights owners, and copyright holders. In accordance with the Digital Millennium Copyright Act (DMCA), we have established policy procedures to handle formal notice of copyright infringement.
            </p>

            <div className="glass-subtle p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-2">
              <h3 className="font-bold text-amber-400">Important Note on Content Hosting</h3>
              <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                SnapLoad <strong>does NOT store, host, re-transmit, or archive media files on our servers</strong>. All downloads process dynamically as pass-through network streams from origin platform CDNs to the user&apos;s local browser session.
              </p>
            </div>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              Filing a Formal DMCA Copyright Takedown Notice
            </h2>
            <p>
              If you are a copyright holder or authorized agent and believe that a specific URL accessible through our tool infringes your copyright, please send a written notification to our Designated Copyright Agent containing the following details:
            </p>

            <ol className="list-decimal pl-6 space-y-3 dark:text-white/70 text-dark-600">
              <li>
                <strong>Identification of Content:</strong> A description or link to the copyrighted work claimed to have been infringed.
              </li>
              <li>
                <strong>Identification of Infringing URL:</strong> The specific URL(s) on origin platforms (e.g. TikTok/Instagram) that you request us to block from conversion.
              </li>
              <li>
                <strong>Contact Information:</strong> Your full legal name, company/organization, mailing address, telephone number, and email address.
              </li>
              <li>
                <strong>Good Faith Statement:</strong> A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
              </li>
              <li>
                <strong>Accuracy &amp; Perjury Statement:</strong> A statement made under penalty of perjury that the information in the notice is accurate and that you are authorized to act on behalf of the copyright owner.
              </li>
              <li>
                <strong>Signature:</strong> A physical or electronic signature of the copyright owner or authorized representative.
              </li>
            </ol>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              Designated DMCA Agent Contact
            </h2>
            <div className="glass-subtle p-5 rounded-2xl space-y-2 font-mono text-xs sm:text-sm">
              <p className="font-bold dark:text-white text-dark-900">SnapLoad Copyright Operations</p>
              <p className="text-primary-400">Email: shahabkhanyousafzai009@gmail.com</p>
              <p className="dark:text-white/60 text-dark-500">Subject Line: DMCA Takedown Notice — [URL / Content Name]</p>
            </div>
            <p>
              Upon receipt of a valid notification complying with DMCA requirements, SnapLoad will promptly investigate and block processing for the identified URLs.
            </p>
          </article>
        )}

        {/* ABOUT US (E-E-A-T) */}
        {type === 'about' && (
          <article className="space-y-6 dark:text-white/80 text-dark-800 leading-relaxed text-sm sm:text-base">
            <header className="border-b border-white/10 pb-6">
              <h1 className="text-2xl sm:text-4xl font-extrabold dark:text-white text-dark-900 tracking-tight">
                About SnapLoad — Mission &amp; Standards
              </h1>
              <p className="mt-2 text-xs sm:text-sm dark:text-white/40 text-dark-400">
                High-Performance Web Utility &amp; Media Educational Hub
              </p>
            </header>

            <p>
              <strong>SnapLoad</strong> is a leading online media utility and educational resource dedicated to helping users save, back up, and convert online short-form videos from major social media platforms including TikTok, Instagram Reels, and YouTube Shorts into crystal clear 1080p HD video and 320kbps MP3 audio files.
            </p>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              Our Core Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="glass-subtle p-5 rounded-2xl space-y-2">
                <h3 className="font-bold text-primary-400 text-base">⚡ Fast &amp; Accessible</h3>
                <p className="text-xs sm:text-sm leading-relaxed dark:text-white/70 text-dark-600">
                  We believe web tools should work instantly without requiring complex software installations, browser extensions, or invasive signups.
                </p>
              </div>
              <div className="glass-subtle p-5 rounded-2xl space-y-2">
                <h3 className="font-bold text-accent-400 text-base">🛡️ Privacy-First Engineering</h3>
                <p className="text-xs sm:text-sm leading-relaxed dark:text-white/70 text-dark-600">
                  Zero logging of personal data, zero server storage of converted media, and strict HTTPS end-to-end encryption.
                </p>
              </div>
              <div className="glass-subtle p-5 rounded-2xl space-y-2">
                <h3 className="font-bold text-emerald-400 text-base">📖 High-Quality Publisher Guides</h3>
                <p className="text-xs sm:text-sm leading-relaxed dark:text-white/70 text-dark-600">
                  We publish detailed technical guides, tutorials, and legal fair-use documentation to empower users with digital literacy.
                </p>
              </div>
              <div className="glass-subtle p-5 rounded-2xl space-y-2">
                <h3 className="font-bold text-amber-400 text-base">🌐 International Accessibility</h3>
                <p className="text-xs sm:text-sm leading-relaxed dark:text-white/70 text-dark-600">
                  Full multi-language support (English, Spanish, German, French) for seamless mobile and desktop accessibility worldwide.
                </p>
              </div>
            </div>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              Editorial Standards &amp; Technical Expertise
            </h2>
            <p>
              All tutorial articles, platform comparison guides, and technical FAQs published on SnapLoad are researched, authored, and verified by our media technology team to ensure accuracy, privacy compliance, and user safety.
            </p>
          </article>
        )}

        {/* CONTACT US */}
        {type === 'contact' && (
          <article className="space-y-6 dark:text-white/80 text-dark-800 leading-relaxed text-sm sm:text-base">
            <header className="border-b border-white/10 pb-6">
              <h1 className="text-2xl sm:text-4xl font-extrabold dark:text-white text-dark-900 tracking-tight">
                Contact &amp; Customer Support
              </h1>
              <p className="mt-2 text-xs sm:text-sm dark:text-white/40 text-dark-400">
                We are here to assist you with inquiries, feedback, and DMCA reports.
              </p>
            </header>

            <p>
              Have a question, feedback, bug report, or DMCA copyright query? Our support team is available to assist you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="glass-subtle p-6 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary-500/20 text-primary-400 flex items-center justify-center font-bold text-lg">
                  ✉
                </div>
                <h3 className="font-bold text-base dark:text-white text-dark-900">General Support &amp; Feedback</h3>
                <p className="text-xs dark:text-white/60 text-dark-500">
                  For website performance inquiries, feature suggestions, or general assistance:
                </p>
                <a
                  href="mailto:shahabkhanyousafzai009@gmail.com"
                  className="inline-block text-xs sm:text-sm text-primary-400 font-mono underline hover:text-primary-300"
                >
                  shahabkhanyousafzai009@gmail.com
                </a>
              </div>

              <div className="glass-subtle p-6 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 text-accent-400 flex items-center justify-center font-bold text-lg">
                  ⚖
                </div>
                <h3 className="font-bold text-base dark:text-white text-dark-900">Copyright &amp; DMCA Agent</h3>
                <p className="text-xs dark:text-white/60 text-dark-500">
                  For formal copyright infringement notifications and takedown requests:
                </p>
                <a
                  href="mailto:shahabkhanyousafzai009@gmail.com"
                  className="inline-block text-xs sm:text-sm text-accent-400 font-mono underline hover:text-accent-300"
                >
                  shahabkhanyousafzai009@gmail.com
                </a>
              </div>
            </div>

            <div className="glass-subtle p-6 rounded-2xl space-y-2 border border-white/10">
              <h3 className="font-bold dark:text-white text-dark-900 text-sm">Response Time Commitment</h3>
              <p className="text-xs dark:text-white/60 text-dark-500 leading-relaxed">
                We respond to all verified emails within 24–48 business hours. DMCA copyright notices are prioritized and processed urgently upon receipt.
              </p>
            </div>
          </article>
        )}

        {/* DISCLAIMER */}
        {type === 'disclaimer' && (
          <article className="space-y-6 dark:text-white/80 text-dark-800 leading-relaxed text-sm sm:text-base">
            <header className="border-b border-white/10 pb-6">
              <h1 className="text-2xl sm:text-4xl font-extrabold dark:text-white text-dark-900 tracking-tight">
                Legal Disclaimer &amp; Platform Notice
              </h1>
              <p className="mt-2 text-xs sm:text-sm dark:text-white/40 text-dark-400">
                Official disclaimers regarding media downloads and platform ownership.
              </p>
            </header>

            <p>
              The information and online services provided by <strong>SnapLoad</strong> (https://snaploaddownload.com) are intended solely for general informational, educational, and personal non-commercial use.
            </p>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              1. Non-Affiliation Disclaimer
            </h2>
            <p>
              SnapLoad is an independent third-party web utility. SnapLoad is <strong>not affiliated, associated, authorized, endorsed by, or in any way officially connected</strong> with TikTok, ByteDance Ltd., Instagram, Meta Platforms Inc., YouTube, Google LLC, or any of their subsidiaries or corporate affiliates.
            </p>
            <p>
              All official platform names, logos, and trademarks mentioned on this website belong to their respective trademark holders. Reference to third-party brand names is strictly for technical compatibility identification under nominative fair use.
            </p>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              2. Copyright Responsibility
            </h2>
            <p>
              SnapLoad does not grant or transfer copyright permissions for downloaded content. Users are solely responsible for respecting the copyright terms of origin content creators and platforms. Downloading copyrighted material without authorization may violate local laws and platform terms.
            </p>
          </article>
        )}

        {/* COOKIE POLICY */}
        {type === 'cookies' && (
          <article className="space-y-6 dark:text-white/80 text-dark-800 leading-relaxed text-sm sm:text-base">
            <header className="border-b border-white/10 pb-6">
              <h1 className="text-2xl sm:text-4xl font-extrabold dark:text-white text-dark-900 tracking-tight">
                Cookie Policy
              </h1>
              <p className="mt-2 text-xs sm:text-sm dark:text-white/40 text-dark-400">
                Explanation of how cookies and web beacons are used on SnapLoad.
              </p>
            </header>

            <p>
              This Cookie Policy explains how <strong>SnapLoad</strong> uses cookies, web beacons, and similar technologies to recognize you when you visit our website at <code>https://snaploaddownload.com</code>.
            </p>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              What Are Cookies?
            </h2>
            <p>
              Cookies are small data files stored on your computer or mobile browser when you visit a website. They are widely used by web publishers to make websites function efficiently and to provide reporting metrics.
            </p>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              Types of Cookies We Use
            </h2>
            <ul className="list-disc pl-6 space-y-3 dark:text-white/70 text-dark-600">
              <li>
                <strong>Essential Operational Cookies:</strong> Required for basic website navigation, theme preferences (dark/light mode), and language selection.
              </li>
              <li>
                <strong>Google Analytics Cookies:</strong> Measure traffic metrics and page performance anonymously to help us improve user experience.
              </li>
              <li>
                <strong>Google AdSense Advertising Cookies:</strong> Google uses cookies (including DART cookies) to serve personalized or non-personalized advertisements based on user visits.
              </li>
            </ul>

            <h2 className="text-xl font-bold dark:text-white text-dark-900 pt-4 border-t border-white/10">
              Managing Your Cookie Preferences
            </h2>
            <p>
              You can control or disable cookies through your browser settings. To opt out of Google advertising cookies, visit <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary-400 underline font-medium">Google Ads Settings</a>.
            </p>
          </article>
        )}

      </div>
    </div>
  );
};
