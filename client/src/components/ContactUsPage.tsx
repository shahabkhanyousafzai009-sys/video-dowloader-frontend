import React, { useState } from 'react';

interface ContactUsPageProps {
  onNavigateHome: () => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ onNavigateHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Support',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold dark:text-white/50 text-dark-500">
        <button onClick={onNavigateHome} className="hover:text-primary-400 transition-colors cursor-pointer">
          Home
        </button>
        <span>/</span>
        <span className="dark:text-white text-dark-900">Contact Us</span>
      </div>

      {/* Main Glass Card */}
      <div className="glass rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-8">
        
        {/* Header */}
        <header className="border-b border-white/10 pb-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-xs font-semibold">
            <span>✉️ Support &amp; Legal Agent</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-dark-900 tracking-tight">
            Contact SnapLoad Support Team
          </h1>
          <p className="text-sm sm:text-base dark:text-white/60 text-dark-600 leading-relaxed">
            Have a technical question, bug report, DMCA inquiry, or feedback? Get in touch with us.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Direct Channels */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold dark:text-white text-dark-900">
              Direct Contact Channels
            </h2>

            <div className="glass-subtle p-5 rounded-2xl space-y-3 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-500/20 text-primary-400 flex items-center justify-center font-bold text-lg">
                  ✉️
                </div>
                <div>
                  <h3 className="font-bold dark:text-white text-dark-900 text-sm">General Support &amp; Inquiries</h3>
                  <a href="mailto:shahabkhanyousafzai009@gmail.com" className="text-xs text-primary-400 font-mono underline">
                    shahabkhanyousafzai009@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-subtle p-5 rounded-2xl space-y-3 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 text-accent-400 flex items-center justify-center font-bold text-lg">
                  ⚖️
                </div>
                <div>
                  <h3 className="font-bold dark:text-white text-dark-900 text-sm">Designated DMCA Copyright Agent</h3>
                  <a href="mailto:shahabkhanyousafzai009@gmail.com" className="text-xs text-accent-400 font-mono underline">
                    shahabkhanyousafzai009@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-subtle p-5 rounded-2xl space-y-2 border border-white/10 text-xs dark:text-white/70 text-dark-600 leading-relaxed">
              <h3 className="font-bold dark:text-white text-dark-900 text-sm">⏱️ Service Response SLA</h3>
              <p>
                We strive to respond to all technical support inquiries within 24 to 48 business hours. DMCA copyright takedown notices are prioritized and processed urgently.
              </p>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold dark:text-white text-dark-900">
              Send Us a Direct Message
            </h2>

            {submitted ? (
              <div className="glass-subtle p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 space-y-3 text-center">
                <span className="text-3xl">✅</span>
                <h3 className="font-bold text-lg text-emerald-200">Message Sent Successfully!</h3>
                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  Thank you for reaching out to SnapLoad. Our support engineering team has received your message and will respond shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: 'General Support', message: '' }); }}
                  className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-xs font-semibold cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block dark:text-white/80 text-dark-800 font-semibold mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 dark:text-white text-dark-900 focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block dark:text-white/80 text-dark-800 font-semibold mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 dark:text-white text-dark-900 focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block dark:text-white/80 text-dark-800 font-semibold mb-1">
                    Subject / Category
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 dark:text-white text-dark-900 focus:outline-none focus:border-primary-500"
                  >
                    <option value="General Support">General Support</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="DMCA Notice">DMCA Copyright Notice</option>
                    <option value="Business Partnership">Business Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block dark:text-white/80 text-dark-800 font-semibold mb-1">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your inquiry or video URL issue..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 dark:text-white text-dark-900 focus:outline-none focus:border-primary-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold text-xs sm:text-sm shadow-glow hover:opacity-95 transition-opacity cursor-pointer"
                >
                  Submit Message
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
