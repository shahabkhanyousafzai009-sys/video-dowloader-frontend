import React from 'react';

export type LegalTab = 'privacy' | 'terms' | 'disclaimer' | 'contact' | 'dmca' | 'about' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  activeTab: LegalTab;
  onClose: () => void;
  onTabChange: (tab: LegalTab) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  activeTab,
  onClose,
  onTabChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="glass rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl border border-white/10 dark:border-white/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => onTabChange('privacy')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'dark:text-white/60 text-dark-500 hover:text-white dark:hover:bg-white/5 hover:bg-black/5'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onTabChange('terms')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'dark:text-white/60 text-dark-500 hover:text-white dark:hover:bg-white/5 hover:bg-black/5'
              }`}
            >
              Terms of Service
            </button>
            <button
              onClick={() => onTabChange('dmca')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'dmca'
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'dark:text-white/60 text-dark-500 hover:text-white dark:hover:bg-white/5 hover:bg-black/5'
              }`}
            >
              DMCA Policy
            </button>
            <button
              onClick={() => onTabChange('about')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'dark:text-white/60 text-dark-500 hover:text-white dark:hover:bg-white/5 hover:bg-black/5'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => onTabChange('contact')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'contact'
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'dark:text-white/60 text-dark-500 hover:text-white dark:hover:bg-white/5 hover:bg-black/5'
              }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => onTabChange('disclaimer')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'disclaimer'
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'dark:text-white/60 text-dark-500 hover:text-white dark:hover:bg-white/5 hover:bg-black/5'
              }`}
            >
              Disclaimer
            </button>
            <button
              onClick={() => onTabChange('cookies')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'cookies'
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'dark:text-white/60 text-dark-500 hover:text-white dark:hover:bg-white/5 hover:bg-black/5'
              }`}
            >
              Cookie Policy
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors ml-2 cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm dark:text-white/80 text-dark-700 leading-relaxed">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold dark:text-white text-dark-900 border-b border-white/10 pb-2">
                Privacy Policy for SnapLoad
              </h2>
              <p className="text-xs dark:text-white/50 text-dark-400">
                Effective Date: August 3, 2026 | Last Updated: August 3, 2026
              </p>

              <p>
                At SnapLoad (accessible from <strong>https://snaploaddownload.com</strong>), one of our main priorities is the privacy of our visitors. This Privacy Policy document details the types of information collected and recorded by SnapLoad and how we utilize it in full compliance with Google AdSense Policies, GDPR, and CCPA regulations.
              </p>

              <h3 className="text-base font-bold dark:text-white text-dark-900 pt-2">
                1. Google AdSense &amp; DoubleClick DART Cookies
              </h3>
              <p>
                Google is a third-party vendor on our site. Google uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to <code>snaploaddownload.com</code> and other websites on the internet.
              </p>
              <ul className="list-disc pl-5 space-y-1 dark:text-white/70 text-dark-600">
                <li>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites.</li>
                <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet.</li>
                <li>Visitors may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary-400 underline">Google Ads Settings</a>. Alternatively, visitors can opt out of third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary-400 underline">www.aboutads.info</a>.</li>
              </ul>

              <h3 className="text-base font-bold dark:text-white text-dark-900 pt-2">
                2. Information Collection &amp; Zero Log Policy
              </h3>
              <p>
                SnapLoad operates on a privacy-first model. We <strong>do not require account registration</strong>, and we do not store, copy, or host any downloaded video or audio files on our servers.
              </p>
              <p>
                All media downloads are processed dynamically and streamed directly to your browser. Standard web server log files (IP addresses, browser type, ISP, timestamp, referring pages) are processed temporarily solely for operational routing, rate limiting, and server security.
              </p>

              <h3 className="text-base font-bold dark:text-white text-dark-900 pt-2">
                3. Advertising Partners Privacy Policies
              </h3>
              <p>
                Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on SnapLoad, which are sent directly to users&apos; browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
              </p>
              <p>
                Note that SnapLoad has no access to or control over these cookies that are used by third-party advertisers.
              </p>

              <h3 className="text-base font-bold dark:text-white text-dark-900 pt-2">
                4. GDPR Compliance (EEA &amp; UK User Rights)
              </h3>
              <p>
                If you are located in the European Economic Area (EEA) or the United Kingdom, you are entitled to standard rights under General Data Protection Regulation (GDPR), including:
              </p>
              <ul className="list-disc pl-5 space-y-1 dark:text-white/70 text-dark-600">
                <li>The right to access, update, or erase personal data.</li>
                <li>The right to withdraw consent at any time via our Consent Management Platform (CMP) banner.</li>
                <li>The right to object to data processing or request data portability.</li>
              </ul>

              <h3 className="text-base font-bold dark:text-white text-dark-900 pt-2">
                5. CCPA Privacy Rights (Do Not Sell My Personal Information)
              </h3>
              <p>
                Under the California Consumer Privacy Act (CCPA), California consumers have the right to request disclosure of categories of personal data collected, request deletion of personal data, and request that personal data not be sold. SnapLoad does not sell personal data to third parties.
              </p>

              <h3 className="text-base font-bold dark:text-white text-dark-900 pt-2">
                6. Contact &amp; Consent
              </h3>
              <p>
                By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions. For any privacy queries, contact us at <code>support@snaploaddownload.com</code>.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold dark:text-white text-dark-900 border-b border-white/10 pb-2">
                Terms of Service
              </h2>
              <p className="text-xs dark:text-white/50 text-dark-400">
                Effective Date: August 3, 2026
              </p>

              <h3 className="text-base font-bold dark:text-white text-dark-900 pt-2">
                1. Acceptance of Terms
              </h3>
              <p>
                By accessing and using SnapLoad (https://snaploaddownload.com), you accept and agree to be bound by the terms and provisions of this agreement.
              </p>

              <h3 className="text-base font-bold dark:text-white text-dark-900 pt-2">
                2. Acceptable Use &amp; Intellectual Property
              </h3>
              <p>
                SnapLoad is provided as an online utility for downloading media content for personal, non-commercial use only. Users are solely responsible for ensuring they possess legal rights, authorization, or fair use permissions to download any media link entered into the tool.
              </p>

              <h3 className="text-base font-bold dark:text-white text-dark-900 pt-2">
                3. Disclaimer of Affiliation
              </h3>
              <p>
                SnapLoad is an independent third-party tool and is <strong>NOT affiliated, associated, authorized, endorsed by, or in any way officially connected</strong> with TikTok, ByteDance, Instagram, Meta, or any of their subsidiaries or affiliates. All product and company names are trademarks™ or registered® trademarks of their respective holders.
              </p>

              <h3 className="text-base font-bold dark:text-white text-dark-900 pt-2">
                4. Limitation of Liability
              </h3>
              <p>
                In no event shall SnapLoad or its operators be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this service.
              </p>
            </div>
          )}

          {activeTab === 'disclaimer' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold dark:text-white text-dark-900 border-b border-white/10 pb-2">
                Legal Disclaimer &amp; Copyright Notice
              </h2>
              <p>
                SnapLoad respects the intellectual property rights of content creators and copyright holders.
              </p>
              <div className="glass-subtle p-4 rounded-xl space-y-2 border border-amber-500/20">
                <h3 className="font-bold text-amber-400">Copyright Compliance Statement</h3>
                <p className="text-xs leading-relaxed">
                  SnapLoad does not host, store, archive, or re-transmit any media files on its servers. All downloads are executed as direct real-time streams between the origin platform content distribution network (CDN) and the end user&apos;s device.
                </p>
              </div>
              <p>
                Users must ensure that their download activities comply with copyright laws applicable in their jurisdiction and the Terms of Service of origin platforms.
              </p>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold dark:text-white text-dark-900 border-b border-white/10 pb-2">
                Contact &amp; Support
              </h2>
              <p>
                Have questions, bug reports, DMCA requests, or feedback regarding SnapLoad? Reach out to our team:
              </p>

              <div className="glass-subtle p-5 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/20 text-primary-400 flex items-center justify-center font-bold">
                    ✉
                  </div>
                  <div>
                    <h4 className="font-bold dark:text-white text-dark-900">General Support &amp; Privacy Queries</h4>
                    <p className="text-xs text-primary-400 font-medium font-mono">
                      <a href="mailto:shahabkhanyousafzai009@gmail.com" className="hover:underline">
                        shahabkhanyousafzai009@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-accent-500/20 text-accent-400 flex items-center justify-center font-bold">
                    ⚖
                  </div>
                  <div>
                    <h4 className="font-bold dark:text-white text-dark-900">Copyright &amp; DMCA Agent</h4>
                    <p className="text-xs text-accent-400 font-medium font-mono">
                      <a href="mailto:shahabkhanyousafzai009@gmail.com" className="hover:underline">
                        shahabkhanyousafzai009@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-semibold transition-colors dark:text-white text-dark-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
