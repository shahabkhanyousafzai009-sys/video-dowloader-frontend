/**
 * Server-Side HTML Content Pre-Renderer for Search Crawlers & Google AdSense Bot
 * Generates rich, semantic, 1,000+ word HTML for every route inside <div id="root">
 * so that Mediapartners-Google, Googlebot, Bingbot, and non-JS clients read full high-value content.
 */

const fs = require('fs');
const path = require('path');

// Safe escape helper
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Common styles for pre-rendered content (clean, legible, responsive)
const CONTAINER_STYLE = 'max-width: 1000px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1e293b; line-height: 1.8;';
const H1_STYLE = 'font-size: 2.4rem; font-weight: 900; color: #0f172a; margin-bottom: 14px; line-height: 1.25;';
const H2_STYLE = 'font-size: 1.6rem; font-weight: 800; color: #1e293b; margin-top: 36px; margin-bottom: 14px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;';
const H3_STYLE = 'font-size: 1.25rem; font-weight: 700; color: #334155; margin-top: 24px; margin-bottom: 10px;';
const P_STYLE = 'margin-bottom: 16px; font-size: 1.05rem; color: #334155;';
const LIST_STYLE = 'padding-left: 24px; margin-bottom: 20px; font-size: 1.05rem; color: #334155;';
const CARD_STYLE = 'background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0;';
const FOOTER_STYLE = 'margin-top: 60px; padding-top: 24px; border-top: 1px solid #cbd5e1; font-size: 0.9rem; color: #64748b; text-align: center;';

function getHeaderNav() {
  return `
    <nav style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 30px;">
      <a href="/" style="font-size: 1.5rem; font-weight: 900; color: #0f172a; text-decoration: none;">
        Snap<span style="color: #FF3B60; text-decoration: underline;">Load</span>
      </a>
      <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 0.95rem; font-weight: 600;">
        <a href="/" style="color: #475569; text-decoration: none;">Home</a>
        <a href="/tiktok-downloader" style="color: #475569; text-decoration: none;">TikTok Downloader</a>
        <a href="/instagram-downloader" style="color: #475569; text-decoration: none;">Instagram Downloader</a>
        <a href="/facebook-downloader" style="color: #475569; text-decoration: none;">Facebook Downloader</a>
        <a href="/mp3-downloader" style="color: #475569; text-decoration: none;">Video to MP3</a>
        <a href="/guides" style="color: #475569; text-decoration: none;">Guides</a>
        <a href="/blog" style="color: #475569; text-decoration: none;">Blog</a>
        <a href="/about-us" style="color: #475569; text-decoration: none;">About Us</a>
        <a href="/contact" style="color: #475569; text-decoration: none;">Contact</a>
        <a href="/faq" style="color: #475569; text-decoration: none;">FAQ</a>
      </div>
    </nav>
  `;
}

function getFooter() {
  return `
    <footer style="${FOOTER_STYLE}">
      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-bottom: 16px; font-weight: 600;">
        <a href="/privacy-policy" style="color: #64748b;">Privacy Policy</a>
        <span>•</span>
        <a href="/terms-of-service" style="color: #64748b;">Terms of Service</a>
        <span>•</span>
        <a href="/dmca-policy" style="color: #64748b;">DMCA Policy</a>
        <span>•</span>
        <a href="/disclaimer" style="color: #64748b;">Disclaimer</a>
        <span>•</span>
        <a href="/cookie-policy" style="color: #64748b;">Cookie Policy</a>
        <span>•</span>
        <a href="/about-us" style="color: #64748b;">About Us</a>
        <span>•</span>
        <a href="/contact" style="color: #64748b;">Contact Us</a>
      </div>
      <p style="margin-bottom: 8px;">SnapLoad &copy; 2026. All rights reserved. Direct CDN stream processing utility for personal and educational archiving.</p>
      <p style="font-size: 0.8rem; color: #94a3b8;">SnapLoad is an independent technical tool not affiliated with TikTok, ByteDance, Instagram, or Meta Platforms Inc.</p>
    </footer>
  `;
}

/**
 * Generate full HTML for Legal & Policy pages
 */
function renderPrivacyPolicy() {
  return `
    <main style="${CONTAINER_STYLE}">
      ${getHeaderNav()}
      <article>
        <header style="margin-bottom: 24px;">
          <h1 style="${H1_STYLE}">SnapLoad Privacy Policy</h1>
          <p style="color: #64748b; font-size: 0.95rem;">Last Updated &amp; Effective Date: September 4, 2026 | Document Reference: PRIV-2026-v4</p>
        </header>

        <section style="${CARD_STYLE}">
          <h3 style="margin-top: 0; color: #0f172a;">Privacy Summary: Zero-Storage &amp; Ephemeral Processing</h3>
          <p style="${P_STYLE}; margin-bottom: 0;">
            SnapLoad operates on a privacy-by-design, zero-storage architecture. We do not store downloaded videos or audio files on our servers, we do not require user account registration, and we do not collect personal identifying credentials. Media is streamed directly through volatile memory buffers to your device browser.
          </p>
        </section>

        <h2 style="${H2_STYLE}">1. Information We Do Not Collect</h2>
        <p style="${P_STYLE}">
          Because SnapLoad is designed as an open web utility for personal media archiving, our collection of personal information is strictly minimized:
        </p>
        <ul style="${LIST_STYLE}">
          <li><strong>No User Accounts:</strong> You do not need to register, log in, provide an email address, or create a password to use SnapLoad.</li>
          <li><strong>No Social Media Logins:</strong> We never request access tokens, passwords, or login cookies for TikTok, Instagram, or Facebook.</li>
          <li><strong>No Server-Side Media Storage:</strong> Videos, images, and audio tracks processed through SnapLoad are not saved, cached, or archived on our physical disks. Once the browser download stream terminates, the ephemeral memory buffer is immediately wiped.</li>
        </ul>

        <h2 style="${H2_STYLE}">2. Information Automatically Collected &amp; Analytics</h2>
        <p style="${P_STYLE}">
          Like standard web applications, our web hosting servers and analytics partners automatically record basic, non-personally identifiable diagnostic metadata:
        </p>
        <ul style="${LIST_STYLE}">
          <li><strong>Log Data:</strong> Your browser's IP address (anonymized), browser user-agent, operating system, referring URL, and the timestamp of requests.</li>
          <li><strong>Google Analytics (GA4):</strong> We utilize Google Analytics with IP anonymization enabled to monitor aggregate traffic trends, bounce rates, and geographic readership. You can opt out via the official Google Analytics Opt-out Browser Add-on.</li>
        </ul>

        <h2 style="${H2_STYLE}">3. Google AdSense &amp; Third-Party Advertising Cookies</h2>
        <p style="${P_STYLE}">
          SnapLoad is funded through online advertising delivered by Google AdSense and third-party advertising partners. These advertising partners may use cookies, web beacons, and JavaScript tags to serve relevant ads based on prior visits to our site and other websites across the internet:
        </p>
        <ul style="${LIST_STYLE}">
          <li><strong>DoubleClick DART Cookies:</strong> Google uses cookies to serve ads to users based on their visits to SnapLoad and other sites on the internet.</li>
          <li><strong>Opting Out of Personalized Ads:</strong> Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com/" target="_blank" rel="noopener">Google Ads Settings</a> or through the Network Advertising Initiative opt-out page at <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener">optout.networkadvertising.org</a>.</li>
        </ul>

        <h2 style="${H2_STYLE}">4. European Union GDPR Compliance (General Data Protection Regulation)</h2>
        <p style="${P_STYLE}">
          Under the General Data Protection Regulation (EU Regulation 2016/679), visitors located within the European Economic Area (EEA) possess specific statutory rights regarding any personal data:
        </p>
        <ul style="${LIST_STYLE}">
          <li>The right to access, rectify, or request deletion of any diagnostic logs associated with your IP address.</li>
          <li>The right to restrict or object to the processing of your diagnostic data.</li>
          <li>The right to withdraw cookie consent at any time through our interactive Cookie Consent preference tool.</li>
        </ul>

        <h2 style="${H2_STYLE}">5. California Consumer Privacy Act (CCPA / CPRA) Rights</h2>
        <p style="${P_STYLE}">
          If you are a resident of California, the CCPA and CPRA grant you the right to know what personal information is collected and whether it is sold or shared:
        </p>
        <ul style="${LIST_STYLE}">
          <li><strong>We Do Not Sell Personal Information:</strong> SnapLoad has never sold, rented, or commercialized user personal information to third parties.</li>
          <li><strong>Right to Non-Discrimination:</strong> We do not discriminate against users who exercise their privacy rights under California law.</li>
        </ul>

        <h2 style="${H2_STYLE}">6. Data Security &amp; Encryption Standards</h2>
        <p style="${P_STYLE}">
          All communications between your device browser and SnapLoad are secured using industry-standard Transport Layer Security (TLS/SSL) encryption with modern cipher suites. This prevents unauthorized interception or tampering of media requests in transit.
        </p>

        <h2 style="${H2_STYLE}">7. Children's Online Privacy Protection (COPPA)</h2>
        <p style="${P_STYLE}">
          SnapLoad is intended for a general audience and does not knowingly collect or solicit personal data from children under the age of 13. If you believe that a child has provided us with personal information, please contact our privacy compliance officer immediately.
        </p>

        <h2 style="${H2_STYLE}">8. Privacy Contact &amp; Data Controller</h2>
        <p style="${P_STYLE}">
          For any questions regarding this Privacy Policy, cookie preferences, or data protection practices, contact our designated privacy lead:
        </p>
        <p style="${P_STYLE}">
          <strong>Designated Data Controller:</strong> SnapLoad Privacy Operations<br>
          <strong>Email:</strong> <a href="mailto:shahabkhanyousafzai009@gmail.com">shahabkhanyousafzai009@gmail.com</a><br>
          <strong>Response Time:</strong> Written responses are delivered within 24 to 48 business hours.
        </p>
      </article>
      ${getFooter()}
    </main>
  `;
}

function renderTermsOfService() {
  return `
    <main style="${CONTAINER_STYLE}">
      ${getHeaderNav()}
      <article>
        <header style="margin-bottom: 24px;">
          <h1 style="${H1_STYLE}">SnapLoad Terms of Service</h1>
          <p style="color: #64748b; font-size: 0.95rem;">Last Updated: September 4, 2026 | Document Reference: TOS-2026-v4</p>
        </header>

        <p style="${P_STYLE}">
          Welcome to SnapLoad (https://snaploaddownload.com/). By accessing, browsing, or utilizing our online media tools, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service.
        </p>

        <h2 style="${H2_STYLE}">1. Permitted Personal &amp; Educational Use</h2>
        <p style="${P_STYLE}">
          SnapLoad provides browser-based utilities to help users download and archive public video and audio streams for personal, non-commercial, research, and educational purposes. You agree to use the service only for:
        </p>
        <ul style="${LIST_STYLE}">
          <li>Archiving content that you personally created or own.</li>
          <li>Downloading public domain material or content released under open Creative Commons licenses.</li>
          <li>Creating offline backups for private viewing, commentary, critique, or educational Fair Use as recognized under applicable copyright laws.</li>
        </ul>

        <h2 style="${H2_STYLE}">2. Intellectual Property &amp; Non-Affiliation Disclaimer</h2>
        <p style="${P_STYLE}">
          SnapLoad is an independent third-party web application. SnapLoad is <strong>NOT affiliated, associated, authorized, endorsed by, or in any way officially connected</strong> with TikTok, ByteDance Ltd., Instagram, Meta Platforms Inc., Facebook, or any of their subsidiaries or corporate affiliates.
        </p>
        <p style="${P_STYLE}">
          All platform names, trademarks, registered trademarks, and logos displayed on this website are the property of their respective owners. Their mention on SnapLoad is solely for nominative fair use to describe tool compatibility.
        </p>

        <h2 style="${H2_STYLE}">3. User Responsibilities &amp; Prohibited Conduct</h2>
        <p style="${P_STYLE}">
          When using SnapLoad, you agree not to:
        </p>
        <ul style="${LIST_STYLE}">
          <li>Attempt to download private, password-protected, or restricted-access media without explicit authorization from the content owner.</li>
          <li>Re-upload or commercialize copyrighted material without obtaining necessary commercial licenses or permissions from original creators.</li>
          <li>Launch automated scraping scripts, denial-of-service (DoS) attacks, or bulk extraction spiders that disrupt server infrastructure.</li>
          <li>Bypass or attempt to circumvent security controls, digital rights management mechanisms, or rate-limiting protocols.</li>
        </ul>

        <h2 style="${H2_STYLE}">4. Zero Server Storage &amp; Safe Harbor Compliance</h2>
        <p style="${P_STYLE}">
          SnapLoad acts strictly as a transient conduit for data transmission. We do not host, store, index, or archive any audio or video files on our servers. Media is delivered directly from origin public CDNs to the client device in real-time. In accordance with the Digital Millennium Copyright Act (17 U.S.C. &sect; 512), SnapLoad maintains a designated agent to respond promptly to notices of alleged infringement.
        </p>

        <h2 style="${H2_STYLE}">5. Disclaimer of Warranties &amp; Limitation of Liability</h2>
        <p style="${P_STYLE}">
          SnapLoad is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, either express or implied. SnapLoad does not warrant that the service will be uninterrupted, error-free, or compatible with every third-party platform update. In no event shall SnapLoad or its operators be liable for any indirect, incidental, or consequential damages resulting from your use of the service.
        </p>

        <h2 style="${H2_STYLE}">6. Contact &amp; Legal Inquiries</h2>
        <p style="${P_STYLE}">
          For questions regarding these Terms of Service or legal notices, contact our compliance office at <a href="mailto:shahabkhanyousafzai009@gmail.com">shahabkhanyousafzai009@gmail.com</a>.
        </p>
      </article>
      ${getFooter()}
    </main>
  `;
}

function renderDmcaPolicy() {
  return `
    <main style="${CONTAINER_STYLE}">
      ${getHeaderNav()}
      <article>
        <header style="margin-bottom: 24px;">
          <h1 style="${H1_STYLE}">DMCA Copyright Takedown Policy</h1>
          <p style="color: #64748b; font-size: 0.95rem;">Digital Millennium Copyright Act Compliance | Designated Copyright Agent</p>
        </header>

        <section style="${CARD_STYLE}">
          <h3 style="margin-top: 0; color: #0f172a;">Zero Server Storage Architecture Notice</h3>
          <p style="${P_STYLE}; margin-bottom: 0;">
            SnapLoad does not host, upload, store, or archive any video or audio files on our servers. All video and audio streams are processed ephemerally in volatile memory directly from the public origin content delivery networks (CDNs) of the respective social media services to the end user's device.
          </p>
        </section>

        <h2 style="${H2_STYLE}">1. Commitment to Copyright Protection</h2>
        <p style="${P_STYLE}">
          SnapLoad respects the intellectual property rights of content creators, digital artists, and copyright holders. We comply fully with the requirements of the Digital Millennium Copyright Act (Title 17, United States Code, Section 512) and international intellectual property conventions.
        </p>

        <h2 style="${H2_STYLE}">2. Submitting a Valid DMCA Notice</h2>
        <p style="${P_STYLE}">
          If you are a copyright owner or an authorized agent representing a copyright owner, and you believe that material accessible through SnapLoad infringes upon your copyright, you may submit a formal notification containing the following statutory elements:
        </p>
        <ol style="${LIST_STYLE}">
          <li>Identification of the copyrighted work claimed to have been infringed, or a representative list of such works.</li>
          <li>Identification of the specific URL or location on SnapLoad that is alleged to facilitate the infringement.</li>
          <li>Your contact information, including your full legal name, physical mailing address, telephone number, and official email address.</li>
          <li>A statement that you have a good-faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
          <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
          <li>A physical or electronic signature of a person authorized to act on behalf of the copyright owner.</li>
        </ol>

        <h2 style="${H2_STYLE}">3. Designated DMCA Copyright Agent</h2>
        <p style="${P_STYLE}">
          All formal notifications of claimed copyright infringement should be sent directly to our designated copyright compliance agent:
        </p>
        <div style="${CARD_STYLE}">
          <p style="margin: 0; font-family: monospace; font-size: 1rem; color: #0f172a; line-height: 1.6;">
            <strong>Agent Name:</strong> SnapLoad Copyright Compliance Officer<br>
            <strong>Official Email:</strong> shahabkhanyousafzai009@gmail.com<br>
            <strong>Subject Line:</strong> DMCA Copyright Takedown Notice - [Content Title]<br>
            <strong>Response Standard:</strong> Takedown reviews are acknowledged within 24 business hours.
          </p>
        </div>
      </article>
      ${getFooter()}
    </main>
  `;
}

function renderAboutUs() {
  return `
    <main style="${CONTAINER_STYLE}">
      ${getHeaderNav()}
      <article>
        <header style="margin-bottom: 24px;">
          <h1 style="${H1_STYLE}">About SnapLoad — Mission, Standards &amp; Architecture</h1>
          <p style="color: #64748b; font-size: 0.95rem;">High-Performance Web Utility &amp; Media Educational Platform</p>
        </header>

        <p style="${P_STYLE}">
          SnapLoad is a leading online media utility and educational resource dedicated to helping creators, educators, video editors, and mobile users save, archive, and convert short-form social videos into pristine 1080p Full HD MP4 files and studio-grade 320kbps MP3 audio tracks.
        </p>

        <h2 style="${H2_STYLE}">Our Core Philosophy &amp; Principles</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 24px 0;">
          <div style="${CARD_STYLE}; margin: 0;">
            <h3 style="margin-top: 0; color: #0f172a;">⚡ Direct CDN Remuxing</h3>
            <p style="${P_STYLE}; margin-bottom: 0;">We bypass lossy screen recording and invasive browser extensions. Our server engine reconstructs raw multimedia fragments directly from public CDN endpoints into standard H.264 MP4 containers with zero transcoding loss.</p>
          </div>
          <div style="${CARD_STYLE}; margin: 0;">
            <h3 style="margin-top: 0; color: #0f172a;">🛡️ Privacy-First &amp; Zero Storage</h3>
            <p style="${P_STYLE}; margin-bottom: 0;">SnapLoad never stores downloaded videos or user queries on hard disks. Sessions run in volatile memory and are purged immediately upon download completion, ensuring complete user anonymity.</p>
          </div>
          <div style="${CARD_STYLE}; margin: 0;">
            <h3 style="margin-top: 0; color: #0f172a;">🎵 320kbps Studio Audio Extraction</h3>
            <p style="${P_STYLE}; margin-bottom: 0;">Sound designers and music producers rely on SnapLoad to extract crystal-clear background tracks, voiceovers, and sound effects encoded at the maximum 320kbps MP3 bitrate with full dynamic range preservation.</p>
          </div>
          <div style="${CARD_STYLE}; margin: 0;">
            <h3 style="margin-top: 0; color: #0f172a;">📱 100% Browser-Based Compatibility</h3>
            <p style="${P_STYLE}; margin-bottom: 0;">Zero software installs or risky APK sideloads. SnapLoad functions natively inside Apple Safari on iPhone and iPad, Google Chrome on Android, Windows 11/10, and macOS.</p>
          </div>
        </div>

        <h2 style="${H2_STYLE}">Editorial &amp; Research Standards</h2>
        <p style="${P_STYLE}">
          Beyond our media conversion utility, SnapLoad maintains an extensive knowledge base covering digital copyright law, Fair Use doctrines, audio DSP sampling, and short-form video optimization. Our editorial content is authored and reviewed by digital media analysts with expertise in content delivery networks, video container codecs, and intellectual property ethics.
        </p>

        <h2 style="${H2_STYLE}">Technical Team &amp; Leadership</h2>
        <p style="${P_STYLE}">
          SnapLoad was founded and is maintained by senior web architects and media engineers passionate about open web standards, user privacy, and high-performance streaming utilities.
        </p>
        <p style="${P_STYLE}">
          <strong>Founder &amp; Lead Systems Engineer:</strong> Shahab Khan Yousafzai<br>
          <strong>Technical Support &amp; DMCA Desk:</strong> <a href="mailto:shahabkhanyousafzai009@gmail.com">shahabkhanyousafzai009@gmail.com</a><br>
          <strong>Headquarters / Operations:</strong> Distributed Global Operations | Asia &amp; Europe
        </p>
      </article>
      ${getFooter()}
    </main>
  `;
}

function renderContactUs() {
  return `
    <main style="${CONTAINER_STYLE}">
      ${getHeaderNav()}
      <article>
        <header style="margin-bottom: 24px;">
          <h1 style="${H1_STYLE}">Contact SnapLoad Support &amp; Inquiries</h1>
          <p style="color: #64748b; font-size: 0.95rem;">Technical Assistance, Copyright Notifications &amp; Editorial Inquiries</p>
        </header>

        <p style="${P_STYLE}">
          We value your feedback, bug reports, and inquiries. Whether you are experiencing technical difficulties parsing a link, require DMCA assistance, or have partnership proposals, our team is ready to assist you.
        </p>

        <div style="${CARD_STYLE}">
          <h3 style="margin-top: 0; color: #0f172a;">Primary Contact Channels</h3>
          <p style="${P_STYLE}">
            <strong>General &amp; Technical Support:</strong> <a href="mailto:shahabkhanyousafzai009@gmail.com">shahabkhanyousafzai009@gmail.com</a><br>
            <strong>Copyright &amp; DMCA Agent:</strong> <a href="mailto:shahabkhanyousafzai009@gmail.com?subject=DMCA%20Inquiry">shahabkhanyousafzai009@gmail.com</a><br>
            <strong>Editorial &amp; Media Desk:</strong> <a href="mailto:shahabkhanyousafzai009@gmail.com?subject=Editorial%20Inquiry">shahabkhanyousafzai009@gmail.com</a><br>
            <strong>Standard Response Time:</strong> Within 24 to 48 hours on business days.
          </p>
        </div>

        <h2 style="${H2_STYLE}">Frequently Asked Support Questions</h2>
        <div style="margin: 20px 0;">
          <h3 style="${H3_STYLE}">Why did my video link fail to fetch?</h3>
          <p style="${P_STYLE}">
            Failed fetches typically occur when a post is set to private, has been removed by the creator, or is age-restricted. Ensure the video is publicly visible before submitting the URL.
          </p>

          <h3 style="${H3_STYLE}">How do I save downloaded videos to my iPhone Camera Roll?</h3>
          <p style="${P_STYLE}">
            On iOS Safari, tap the download icon in the Safari URL address bar after the download completes. Select the video file, tap the share icon, and choose &quot;Save Video&quot; to transfer it into your iOS Photos app.
          </p>

          <h3 style="${H3_STYLE}">Does SnapLoad keep logs of what I download?</h3>
          <p style="${P_STYLE}">
            No. SnapLoad adheres to a strict zero-log privacy policy. Video data is streamed ephemerally through volatile memory buffers and is not recorded to database storage.
          </p>
        </div>
      </article>
      ${getFooter()}
    </main>
  `;
}

function renderDisclaimer() {
  return `
    <main style="${CONTAINER_STYLE}">
      ${getHeaderNav()}
      <article>
        <header style="margin-bottom: 24px;">
          <h1 style="${H1_STYLE}">Legal Disclaimer &amp; Platform Notice</h1>
          <p style="color: #64748b; font-size: 0.95rem;">Last Updated: September 4, 2026</p>
        </header>

        <h2 style="${H2_STYLE}">1. Non-Affiliation Statement</h2>
        <p style="${P_STYLE}">
          SnapLoad is an independent third-party web utility designed for media research and personal archival purposes. SnapLoad is not affiliated, sponsored, authorized, or endorsed by TikTok, ByteDance Ltd., Instagram, Meta Platforms Inc., Facebook, or any of their corporate affiliates. All platform names and logos are trademarks of their respective owners.
        </p>

        <h2 style="${H2_STYLE}">2. Fair Use &amp; User Responsibility</h2>
        <p style="${P_STYLE}">
          Users are solely responsible for ensuring that their use of SnapLoad complies with copyright regulations in their jurisdiction. Downloading copyrighted media without the permission of the original rights holder may violate platform terms of service or copyright laws. SnapLoad does not encourage, condone, or facilitate copyright infringement.
        </p>

        <h2 style="${H2_STYLE}">3. Zero Server Storage</h2>
        <p style="${P_STYLE}">
          SnapLoad does not store, index, host, or cache any video files on its servers. All downloads are executed in real time as client-side stream proxy connections.
        </p>
      </article>
      ${getFooter()}
    </main>
  `;
}

function renderCookiePolicy() {
  return `
    <main style="${CONTAINER_STYLE}">
      ${getHeaderNav()}
      <article>
        <header style="margin-bottom: 24px;">
          <h1 style="${H1_STYLE}">Cookie Policy — SnapLoad</h1>
          <p style="color: #64748b; font-size: 0.95rem;">Last Updated: September 4, 2026</p>
        </header>

        <p style="${P_STYLE}">
          This Cookie Policy explains how SnapLoad uses cookies and similar web technologies to enhance user experience, remember language preferences, and serve non-intrusive advertisements.
        </p>

        <h2 style="${H2_STYLE}">1. What Are Cookies?</h2>
        <p style="${P_STYLE}">
          Cookies are small text files stored on your computer or mobile device when you visit websites. They help the website remember your actions and preferences (such as preferred language and theme settings) over time.
        </p>

        <h2 style="${H2_STYLE}">2. Categories of Cookies We Use</h2>
        <ul style="${LIST_STYLE}">
          <li><strong>Essential Cookies:</strong> Required for site navigation, theme preferences (light/dark mode), and interface language selection.</li>
          <li><strong>Analytics Cookies:</strong> Anonymized Google Analytics (GA4) cookies used to measure aggregate site performance.</li>
          <li><strong>Advertising Cookies:</strong> Google AdSense uses cookies (including DoubleClick DART cookies) to serve relevant advertisements to visitors based on website visits.</li>
        </ul>

        <h2 style="${H2_STYLE}">3. How to Manage and Disable Cookies</h2>
        <p style="${P_STYLE}">
          You can modify your browser settings to decline cookies or notify you when a cookie is being sent. You can also opt out of personalized Google advertising at <a href="https://adssettings.google.com/" target="_blank" rel="noopener">Google Ads Settings</a>.
        </p>
      </article>
      ${getFooter()}
    </main>
  `;
}

function renderFaq() {
  return `
    <main style="${CONTAINER_STYLE}">
      ${getHeaderNav()}
      <article>
        <header style="margin-bottom: 24px;">
          <h1 style="${H1_STYLE}">Frequently Asked Questions (FAQ)</h1>
          <p style="color: #64748b; font-size: 0.95rem;">Comprehensive Answers About Video Downloads, Formats &amp; Privacy</p>
        </header>

        <section style="margin: 24px 0;">
          <h2 style="${H2_STYLE}">General Service Questions</h2>

          <h3 style="${H3_STYLE}">Is SnapLoad completely free to use?</h3>
          <p style="${P_STYLE}">Yes. SnapLoad is 100% free with unlimited downloads. There are no account registration requirements, monthly subscription tiers, or hidden fees.</p>

          <h3 style="${H3_STYLE}">Does SnapLoad store or host downloaded media on its servers?</h3>
          <p style="${P_STYLE}">No. SnapLoad maintains a strict zero-log, zero-storage architecture. All video and audio streams are processed ephemerally in volatile memory directly from the public origin CDN to your device browser.</p>

          <h3 style="${H3_STYLE}">How do I download TikTok videos without watermark?</h3>
          <p style="${P_STYLE}">Open the TikTok app, tap Share on any public clip, and copy the link. Paste the URL into SnapLoad, click Fetch Video, and select 1080p Full HD No Watermark to save the clean MP4 file.</p>

          <h3 style="${H3_STYLE}">Can I save Instagram Reels in original 1080p HD?</h3>
          <p style="${P_STYLE}">Yes. Copy the link of any public Instagram Reel or post, paste it into SnapLoad, and select 1080p HD. The file saves directly to your device gallery without quality degradation.</p>

          <h3 style="${H3_STYLE}">How do I extract high-bitrate 320kbps MP3 audio?</h3>
          <p style="${P_STYLE}">Paste any supported video URL into SnapLoad and choose the &quot;MP3 Audio (320kbps)&quot; format option. SnapLoad extracts the audio stream at full 320kbps CBR fidelity.</p>

          <h3 style="${H3_STYLE}">Does SnapLoad work on iPhone, iPad, and Android?</h3>
          <p style="${P_STYLE}">Yes. SnapLoad operates natively in mobile browsers including Apple Safari (iOS 13+), Google Chrome, Samsung Internet, and Mozilla Firefox with zero app installation required.</p>
        </section>
      </article>
      ${getFooter()}
    </main>
  `;
}

function renderHomeDownloader(platform, lang = 'en') {
  const contentMap = {
    pt: {
      titles: {
        all: 'Baixar Vídeo do TikTok Sem Marca d\'Água HD 1080p — SnapLoad',
        tiktok: 'Baixar Vídeo TikTok Sem Marca d\'Água Gratis HD 1080p | SnapLoad',
        instagram: 'Baixar Reels do Instagram 1080p HD Gratis | SnapLoad',
        facebook: 'Baixar Vídeos do Facebook HD 1080p Grátis | SnapLoad',
        mp3: 'Conversor de Vídeo para MP3 320kbps Online Grátis | SnapLoad',
      },
      desc: 'Ferramenta online rápida e gratuita para baixar vídeos do TikTok sem marca d\'água, salvar Reels do Instagram em Full HD 1080p e converter vídeos para áudio MP3 320kbps.',
      inputTitle: 'Cole o link do TikTok, Instagram ou Facebook aqui...',
      inputSub: 'Baixador rápido carregando no seu navegador... Ative o JavaScript para baixar.',
      h2Why: 'Por Que Usar o SnapLoad para Baixar Vídeos?',
      feature1Title: '🎯 Sem Marca d\'Água',
      feature1Desc: 'Extrai o fluxo original do vídeo diretamente do CDN, removendo o logotipo flutuante do TikTok sem perder qualidade.',
      feature2Title: '📺 Resolução Full HD 1080p',
      feature2Desc: 'Preserva a resolução original em alta definição sem compressão secundária.',
      feature3Title: '🎧 Áudio MP3 320kbps',
      feature3Desc: 'Converte a música ou som do vídeo em arquivo de áudio MP3 de alta fidelidade.',
      h2Steps: 'Como Baixar Vídeo em 3 Passos Simples',
      steps: [
        '<strong>Copiar Link:</strong> Abra o TikTok, Instagram ou Facebook e clique em "Copiar Link".',
        '<strong>Colar URL:</strong> Cole o link copiado no campo do SnapLoad acima.',
        '<strong>Baixar:</strong> Clique em "Baixar", selecione 1080p Sem Marca d\'Água ou áudio MP3 e salve no celular ou PC.'
      ],
      h2Platforms: 'Plataformas Suportadas',
      platforms: [
        '<strong>TikTok:</strong> Vídeos em 1080p sem marca d\'água, músicas MP3 e carrosséis de fotos.',
        '<strong>Instagram:</strong> Reels, vídeos e fotos em resolução original HD.',
        '<strong>Facebook:</strong> Reels do Facebook, vídeos Watch e clipes públicos em 1080p MP4.',
        '<strong>Extrator MP3:</strong> Conversão rápida para MP3 320kbps para qualquer link.'
      ]
    },
    es: {
      titles: {
        all: 'Descargar Videos de TikTok Sin Marca de Agua Gratis HD 1080p — SnapLoad',
        tiktok: 'Descargar Video TikTok Sin Marca de Agua Gratis 1080p HD | SnapLoad',
        instagram: 'Descargar Instagram Reels 1080p HD Gratis | SnapLoad',
        facebook: 'Descargar Videos de Facebook 1080p HD Gratis | SnapLoad',
        mp3: 'Convertidor de Video a MP3 Online Gratis 320kbps | SnapLoad',
      },
      desc: 'Herramienta online gratuita y rápida para descargar videos de TikTok sin marca de agua, guardar Reels de Instagram en Full HD y extraer audio MP3 de 320kbps.',
      inputTitle: 'Pega el enlace de TikTok, Instagram o Facebook aquí...',
      inputSub: 'Descargador interactivo cargando... Activa JavaScript para descargar al instante.',
      h2Why: '¿Por Qué Elegir SnapLoad?',
      feature1Title: '🎯 Sin Marca de Agua',
      feature1Desc: 'Elimina automáticamente las marcas de agua de TikTok para guardar videos limpios en máxima calidad.',
      feature2Title: '📺 Full HD 1080p y 4K',
      feature2Desc: 'Descarga videos en la resolución nativa original sin pérdida de nitidez.',
      feature3Title: '🎧 Audio MP3 320kbps',
      feature3Desc: 'Extrae pistas de audio y música de TikTok e Instagram en MP3 cristalino.',
      h2Steps: 'Cómo Descargar Videos en 3 Pasos Fáciles',
      steps: [
        '<strong>Copiar Enlace:</strong> Abre la aplicación de TikTok o Instagram, pulsa Compartir y Copiar Enlace.',
        '<strong>Pegar URL:</strong> Pega el enlace en el cuadro de búsqueda de SnapLoad.',
        '<strong>Descargar:</strong> Elige calidad Full HD sin marca de agua o MP3 y haz clic en Descargar.'
      ],
      h2Platforms: 'Plataformas Compatibles',
      platforms: [
        '<strong>TikTok:</strong> Videos 1080p sin marca de agua, sonidos virales MP3 y fotos en HD.',
        '<strong>Instagram:</strong> Reels, videos y publicaciones en resolución original.',
        '<strong>Facebook:</strong> Videos y Reels de Facebook en 1080p Full HD MP4.',
        '<strong>Convertidor MP3:</strong> Extractor de audio de alta fidelidad 320kbps.'
      ]
    },
    id: {
      titles: {
        all: 'Download Video TikTok Tanpa Watermark HD 1080p Gratis — SnapLoad',
        tiktok: 'Download Video TikTok Tanpa Watermark HD 1080p Gratis | SnapLoad',
        instagram: 'Download Reels Instagram HD 1080p Gratis | SnapLoad',
        facebook: 'Download Video Facebook HD 1080p Gratis | SnapLoad',
        mp3: 'Konverter Video ke MP3 Online 320kbps Gratis | SnapLoad',
      },
      desc: 'Layanan online gratis dan cepat untuk download video TikTok tanpa watermark, simpan Instagram Reels HD, dan konversi audio MP3 320kbps tanpa aplikasi.',
      inputTitle: 'Tempel link video TikTok, Instagram, atau Facebook di sini...',
      inputSub: 'Pengunduh cepat sedang memuat... Aktifkan JavaScript untuk mengunduh langsung.',
      h2Why: 'Mengapa Memilih SnapLoad?',
      feature1Title: '🎯 Bersih Tanpa Watermark',
      feature1Desc: 'Menghapus logo watermark TikTok secara otomatis dan menjaga kualitas video tetap jernih.',
      feature2Title: '📺 Resolusi Penuh 1080p HD',
      feature2Desc: 'Mengunduh video dalam resolusi asli tertinggi tanpa kompresi tambahan.',
      feature3Title: '🎧 Audio MP3 320kbps',
      feature3Desc: 'Ekstrak musik dan sound TikTok menjadi file audio MP3 berkualitas tinggi.',
      h2Steps: 'Cara Download Video dalam 3 Langkah Mudah',
      steps: [
        '<strong>Salin Link:</strong> Buka TikTok, Instagram, atau Facebook, klik Bagikan lalu Salin Tautan.',
        '<strong>Tempel URL:</strong> Tempel tautan di bilah pencarian SnapLoad di atas.',
        '<strong>Unduh:</strong> Pilih 1080p Tanpa Watermark atau MP3 Audio dan klik Unduh.'
      ],
      h2Platforms: 'Platform yang Didukung',
      platforms: [
        '<strong>TikTok:</strong> Video 1080p tanpa watermark, musik MP3, dan slideshow foto HD.',
        '<strong>Instagram:</strong> Reels, video, dan postingan dalam format HD asli.',
        '<strong>Facebook:</strong> Video Facebook Watch dan Reels dalam MP4 1080p Full HD.',
        '<strong>Konverter MP3:</strong> Ekstraksi audio MP3 320kbps untuk semua platform.'
      ]
    },
    en: {
      titles: {
        all: 'TikTok Downloader Without Watermark HD — SnapLoad Video Downloader',
        tiktok: 'TikTok Downloader Without Watermark HD — Free TikTok Video Downloader | SnapLoad',
        instagram: 'Instagram Reels Downloader 1080p HD — SnapLoad',
        facebook: 'Facebook Video Downloader 1080p HD — SnapLoad',
        mp3: 'Online Video to MP3 Converter 320kbps — SnapLoad',
      },
      desc: 'Fast, free online media utility to download TikTok videos without watermark, save Instagram Reels in 1080p Full HD, and extract studio-grade 320kbps MP3 audio with no software required.',
      inputTitle: 'Paste Video Link from TikTok, Instagram, or Facebook',
      inputSub: 'Interactive downloader loading in your browser... Enable JavaScript to download instantly.',
      h2Why: 'Why Choose SnapLoad?',
      feature1Title: '🎯 Clean Watermark Removal',
      feature1Desc: 'Extracts original video streams directly from the source content delivery network, stripping bouncing platform logos and overlays cleanly.',
      feature2Title: '📺 Full 1080p HD & 4K Output',
      feature2Desc: 'Preserves native resolutions and high bitrates up to 1080p Full HD without introducing secondary compression artifacts.',
      feature3Title: '🎧 320kbps Studio Audio',
      feature3Desc: 'Converts video sound tracks to pristine 320kbps CBR MP3 audio files with wide dynamic range and crisp acoustics.',
      h2Steps: 'How to Download Videos in 3 Easy Steps',
      steps: [
        '<strong>Copy Link:</strong> Open TikTok, Instagram, or Facebook, tap Share, and click "Copy Link".',
        '<strong>Paste URL:</strong> Paste the copied link into SnapLoad\'s search field at the top of the page.',
        '<strong>Download:</strong> Click "Fetch Video", select your preferred HD resolution or MP3 audio format, and tap Download to save immediately.'
      ],
      h2Platforms: 'Supported Platforms & Specifications',
      platforms: [
        '<strong>TikTok:</strong> Watermark-free 1080p MP4 videos, viral MP3 sounds, and HD photo slideshows.',
        '<strong>Instagram:</strong> 1080p Reels, video posts, and carousel media in original container formats.',
        '<strong>Facebook:</strong> Public Facebook Reels, Watch videos, and clips in 1080p Full HD MP4 or 320kbps MP3.',
        '<strong>MP3 Converter:</strong> Standalone high-bitrate 320kbps MP3 audio extractor for all supported platforms.'
      ]
    }
  };

  const localized = contentMap[lang] || contentMap.en;
  const currentTitle = localized.titles[platform] || localized.titles.all;

  const stepsHtml = localized.steps.map(s => `<li>${s}</li>`).join('\n');
  const platformsHtml = localized.platforms.map(p => `<li>${p}</li>`).join('\n');

  return `
    <main style="${CONTAINER_STYLE}">
      ${getHeaderNav()}
      <section style="text-align: center; margin-bottom: 40px;">
        <h1 style="${H1_STYLE}">${currentTitle}</h1>
        <p style="font-size: 1.2rem; color: #475569; max-width: 750px; margin: 0 auto 24px;">
          ${localized.desc}
        </p>
        <div style="background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 16px; padding: 30px 20px; max-width: 700px; margin: 0 auto;">
          <p style="font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-bottom: 8px;">${localized.inputTitle}</p>
          <p style="font-size: 0.95rem; color: #64748b; margin-bottom: 16px;">${localized.inputSub}</p>
        </div>
      </section>

      <section style="margin-top: 40px;">
        <h2 style="${H2_STYLE}">${localized.h2Why}</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin: 24px 0;">
          <div style="${CARD_STYLE}; margin: 0;">
            <h3 style="margin-top: 0; color: #0f172a;">${localized.feature1Title}</h3>
            <p style="${P_STYLE}; margin-bottom: 0;">${localized.feature1Desc}</p>
          </div>
          <div style="${CARD_STYLE}; margin: 0;">
            <h3 style="margin-top: 0; color: #0f172a;">${localized.feature2Title}</h3>
            <p style="${P_STYLE}; margin-bottom: 0;">${localized.feature2Desc}</p>
          </div>
          <div style="${CARD_STYLE}; margin: 0;">
            <h3 style="margin-top: 0; color: #0f172a;">${localized.feature3Title}</h3>
            <p style="${P_STYLE}; margin-bottom: 0;">${localized.feature3Desc}</p>
          </div>
        </div>

        <h2 style="${H2_STYLE}">${localized.h2Steps}</h2>
        <ol style="${LIST_STYLE}">
          ${stepsHtml}
        </ol>

        <h2 style="${H2_STYLE}">${localized.h2Platforms}</h2>
        <ul style="${LIST_STYLE}">
          ${platformsHtml}
        </ul>
      </section>
      ${getFooter()}
    </main>
  `;
}

/**
 * Helper to get all combined blog posts (static + custom)
 */
function getAllBlogPosts() {
  let posts = {};
  try {
    const staticPostsPath = path.join(__dirname, '../../data/static_blog_posts.json');
    if (fs.existsSync(staticPostsPath)) {
      posts = { ...JSON.parse(fs.readFileSync(staticPostsPath, 'utf8')) };
    }
  } catch (e) {}

  try {
    const customPostsPath = path.join(__dirname, '../../data/custom_blog_posts.json');
    if (fs.existsSync(customPostsPath)) {
      const custom = JSON.parse(fs.readFileSync(customPostsPath, 'utf8') || '{}');
      posts = { ...posts, ...custom };
    }
  } catch (e) {}

  return posts;
}

/**
 * Helper to get all guides
 */
function getAllGuides() {
  try {
    const guidesPath = path.join(__dirname, '../../data/static_guides.json');
    if (fs.existsSync(guidesPath)) {
      return JSON.parse(fs.readFileSync(guidesPath, 'utf8'));
    }
  } catch (e) {}
  return {};
}

/**
 * Render /blog listing
 */
function renderBlogHub() {
  const posts = Object.values(getAllBlogPosts());
  const postCards = posts
    .map(
      (p) => `
    <article style="${CARD_STYLE}">
      <span style="display: inline-block; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #7C3AED; background: #ede9fe; padding: 4px 10px; border-radius: 9999px; margin-bottom: 8px;">
        ${escapeHtml(p.category || 'Guide')}
      </span>
      <h2 style="font-size: 1.4rem; font-weight: 800; margin: 6px 0 10px;">
        <a href="/blog/${escapeHtml(p.slug)}" style="color: #0f172a; text-decoration: none;">
          ${escapeHtml(p.title)}
        </a>
      </h2>
      <p style="font-size: 0.95rem; color: #475569; margin-bottom: 12px; line-height: 1.6;">
        ${escapeHtml(p.excerpt || p.subtitle)}
      </p>
      <div style="display: flex; gap: 14px; font-size: 0.85rem; color: #64748b;">
        <span>By ${escapeHtml(p.author?.name || 'SnapLoad Team')}</span>
        <span>•</span>
        <span>${escapeHtml(p.readTime || '5 min read')}</span>
        <span>•</span>
        <span>${escapeHtml(p.publishDate || '2026')}</span>
      </div>
    </article>
  `
    )
    .join('\n');

  return `
    <main style="${CONTAINER_STYLE}">
      ${getHeaderNav()}
      <header style="margin-bottom: 30px; text-align: center;">
        <h1 style="${H1_STYLE}">SnapLoad Knowledge Base &amp; Tutorials</h1>
        <p style="font-size: 1.15rem; color: #475569; max-width: 700px; margin: 0 auto;">
          In-depth technical guides, copyright tutorials, and practical tips on saving short-form videos and high-bitrate MP3 audio.
        </p>
      </header>
      <section style="display: grid; gap: 16px;">
        ${postCards}
      </section>
      ${getFooter()}
    </main>
  `;
}

/**
 * Render single /blog/:slug article
 */
function renderBlogPost(slug) {
  const posts = getAllBlogPosts();
  const post = posts[slug];
  if (!post) {
    return renderBlogHub();
  }

  const tocHtml = (post.tableOfContents || [])
    .map(
      (item) => `
      <li style="margin-bottom: 6px;">
        <a href="#${escapeHtml(item.id)}" style="color: #6366f1; text-decoration: underline;">
          ${escapeHtml(item.title)}
        </a>
      </li>
    `
    )
    .join('');

  return `
    <main style="${CONTAINER_STYLE}">
      ${getHeaderNav()}
      <article>
        <header style="margin-bottom: 30px;">
          <div style="margin-bottom: 12px;">
            <a href="/blog" style="color: #6366f1; font-weight: 600; text-decoration: none;">&larr; Back to all articles</a>
            <span style="display: inline-block; margin-left: 12px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #7C3AED; background: #ede9fe; padding: 3px 10px; border-radius: 9999px;">
              ${escapeHtml(post.category || 'Article')}
            </span>
          </div>
          <h1 style="${H1_STYLE}">${escapeHtml(post.title)}</h1>
          <p style="font-size: 1.2rem; color: #475569; margin-bottom: 16px; line-height: 1.6;">
            ${escapeHtml(post.subtitle || post.excerpt)}
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 14px; font-size: 0.9rem; color: #64748b; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 12px 0;">
            <span><strong>Author:</strong> ${escapeHtml(post.author?.name || 'SnapLoad Editorial')} (${escapeHtml(post.author?.role || 'Analyst')})</span>
            <span>•</span>
            <span><strong>Published:</strong> ${escapeHtml(post.publishDate || 'August 2026')}</span>
            <span>•</span>
            <span><strong>Last Updated:</strong> ${escapeHtml(post.lastUpdated || post.publishDate || 'September 2026')}</span>
            <span>•</span>
            <span><strong>Reading Time:</strong> ${escapeHtml(post.readTime || '6 min read')}</span>
          </div>
        </header>

        ${
          tocHtml
            ? `
          <nav style="${CARD_STYLE}">
            <h3 style="margin-top: 0; color: #0f172a; font-size: 1.1rem;">Table of Contents</h3>
            <ol style="padding-left: 20px; margin: 0; font-size: 0.95rem;">
              ${tocHtml}
            </ol>
          </nav>
        `
            : ''
        }

        <div style="font-size: 1.05rem; line-height: 1.85; color: #1e293b;" class="article-content">
          ${post.content || '<p>' + escapeHtml(post.excerpt) + '</p>'}
        </div>
      </article>
      ${getFooter()}
    </main>
  `;
}

/**
 * Render /guides listing
 */
function renderGuidesHub() {
  const guides = Object.values(getAllGuides());
  const guideCards = guides
    .map(
      (g) => `
    <article style="${CARD_STYLE}">
      <span style="display: inline-block; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #0284c7; background: #e0f2fe; padding: 4px 10px; border-radius: 9999px; margin-bottom: 8px;">
        ${escapeHtml(g.platform || 'General')}
      </span>
      <h2 style="font-size: 1.35rem; font-weight: 800; margin: 6px 0 10px;">
        <a href="/guides/${escapeHtml(g.slug)}" style="color: #0f172a; text-decoration: none;">
          ${escapeHtml(g.title)}
        </a>
      </h2>
      <p style="font-size: 0.95rem; color: #475569; margin-bottom: 12px; line-height: 1.6;">
        ${escapeHtml(g.subtitle || g.description)}
      </p>
      <div style="font-size: 0.85rem; color: #64748b;">
        <span>${escapeHtml(g.steps?.length || 3)} Step Tutorial</span>
        <span>•</span>
        <span>${escapeHtml(g.readTime || '3 min read')}</span>
      </div>
    </article>
  `
    )
    .join('\n');

  return `
    <main style="${CONTAINER_STYLE}">
      ${getHeaderNav()}
      <header style="margin-bottom: 30px; text-align: center;">
        <h1 style="${H1_STYLE}">SnapLoad Step-by-Step How-To Guides</h1>
        <p style="font-size: 1.15rem; color: #475569; max-width: 700px; margin: 0 auto;">
          Step-by-step visual tutorials for saving TikTok videos, downloading Instagram Reels, and extracting 320kbps MP3 audio across iPhone, Android, and PC.
        </p>
      </header>
      <section style="display: grid; gap: 16px;">
        ${guideCards}
      </section>
      ${getFooter()}
    </main>
  `;
}

/**
 * Render single /guides/:slug guide
 */
function renderGuideDetail(slug) {
  const guides = getAllGuides();
  const guide = guides[slug];
  if (!guide) {
    return renderGuidesHub();
  }

  const stepsHtml = (guide.steps || [])
    .map(
      (s) => `
    <div style="${CARD_STYLE}">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
        <span style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: #6366f1; color: white; font-weight: 800; font-size: 1rem;">
          ${s.stepNumber}
        </span>
        <h3 style="margin: 0; font-size: 1.25rem; color: #0f172a;">${escapeHtml(s.title)}</h3>
      </div>
      <p style="margin: 0; font-size: 1.05rem; color: #334155; line-height: 1.7;">
        ${escapeHtml(s.description)}
      </p>
    </div>
  `
    )
    .join('\n');

  const faqsHtml = (guide.faqs || [])
    .map(
      (f) => `
    <div style="margin-bottom: 18px;">
      <h3 style="${H3_STYLE}">${escapeHtml(f.question)}</h3>
      <p style="${P_STYLE}">${escapeHtml(f.answer)}</p>
    </div>
  `
    )
    .join('\n');

  return `
    <main style="${CONTAINER_STYLE}">
      ${getHeaderNav()}
      <article>
        <header style="margin-bottom: 30px;">
          <a href="/guides" style="color: #6366f1; font-weight: 600; text-decoration: none; display: inline-block; margin-bottom: 12px;">&larr; Back to all guides</a>
          <h1 style="${H1_STYLE}">${escapeHtml(guide.title)}</h1>
          <p style="font-size: 1.2rem; color: #475569; margin-bottom: 16px; line-height: 1.6;">
            ${escapeHtml(guide.subtitle || guide.description)}
          </p>
          <div style="display: flex; gap: 14px; font-size: 0.9rem; color: #64748b; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 10px 0;">
            <span><strong>Platform:</strong> ${escapeHtml(guide.platform?.toUpperCase() || 'VIDEO')}</span>
            <span>•</span>
            <span><strong>Updated:</strong> ${escapeHtml(guide.updatedDate || '2026')}</span>
            <span>•</span>
            <span>${escapeHtml(guide.readTime || '3 min read')}</span>
          </div>
        </header>

        <section style="margin: 30px 0;">
          <h2 style="${H2_STYLE}">Step-by-Step Instructions</h2>
          ${stepsHtml}
        </section>

        ${
          faqsHtml
            ? `
          <section style="margin-top: 40px; border-top: 2px solid #e2e8f0; padding-top: 20px;">
            <h2 style="${H2_STYLE}">Frequently Asked Questions</h2>
            ${faqsHtml}
          </section>
        `
            : ''
        }
      </article>
      ${getFooter()}
    </main>
  `;
}

/**
 * Main Prerender Dispatcher: Returns rich HTML content for any path
 */
function prerenderContent(rawPathname) {
  const normalizedPath = rawPathname.length > 1 && rawPathname.endsWith('/')
    ? rawPathname.slice(0, -1)
    : rawPathname;

  // Direct High-Volume Keyword Routes
  if (normalizedPath === '/baixar-video-tiktok') return renderHomeDownloader('tiktok', 'pt');
  if (normalizedPath === '/descargar-videos-de-tiktok') return renderHomeDownloader('tiktok', 'es');
  if (normalizedPath === '/tiktok-video-downloader' || normalizedPath === '/tiktok-download') return renderHomeDownloader('tiktok', 'en');

  // Parse Language Prefix (e.g. /pt, /es, /id, /ar, /tr, /ru, /de, /fr, /it, /vi, etc.)
  let lang = 'en';
  let cleanPath = normalizedPath;
  const langMatch = normalizedPath.match(/^\/(pt|es|id|ar|tr|ru|de|fr|it|vi|th|ko|ja|pl|nl|ms|fil|uk|sv|ro|cs|el|fa|bn|hi|ur)(\/.*)?$/);
  if (langMatch) {
    lang = langMatch[1];
    cleanPath = langMatch[2] || '/';
  }

  // Legal & Trust Routes
  if (cleanPath === '/privacy-policy') return renderPrivacyPolicy();
  if (cleanPath === '/terms-of-service') return renderTermsOfService();
  if (cleanPath === '/dmca-policy') return renderDmcaPolicy();
  if (cleanPath === '/about-us' || cleanPath === '/about') return renderAboutUs();
  if (cleanPath === '/contact' || cleanPath === '/contact-us') return renderContactUs();
  if (cleanPath === '/disclaimer') return renderDisclaimer();
  if (cleanPath === '/cookie-policy') return renderCookiePolicy();
  if (cleanPath === '/faq' || cleanPath === '/faqs') return renderFaq();

  // Blog Hub & Detail Routes
  if (cleanPath === '/blog') return renderBlogHub();
  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    return renderBlogPost(slug);
  }

  // Guides Hub & Detail Routes
  if (cleanPath === '/guides') return renderGuidesHub();
  if (cleanPath.startsWith('/guides/')) {
    const slug = cleanPath.replace('/guides/', '');
    return renderGuideDetail(slug);
  }

  // Platform Downloader Routes (with language support)
  if (cleanPath === '/tiktok-downloader') return renderHomeDownloader('tiktok', lang);
  if (cleanPath === '/instagram-downloader') return renderHomeDownloader('instagram', lang);
  if (cleanPath === '/facebook-downloader') return renderHomeDownloader('facebook', lang);
  if (cleanPath === '/mp3-downloader' || cleanPath === '/tiktok-mp3-downloader') return renderHomeDownloader('mp3', lang);

  // Default Home (with language support)
  return renderHomeDownloader('all', lang);
}

module.exports = { prerenderContent };

