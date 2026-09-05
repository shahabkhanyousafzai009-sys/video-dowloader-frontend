import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { isValidUrl, isSupportedUrl, getValidationMessage } from '../utils/validators';
import { detectPlatform } from '../utils/platforms';
import { PlatformBadge } from './PlatformBadge';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  loading: boolean;
  onReset: () => void;
  currentLanguage?: Language;
}

const DISCLAIMER_TEXTS: Record<string, { text1: string; link: string; text2: string }> = {
  pt: { text1: 'Apenas para uso pessoal e offline. Ao usar esta ferramenta, você concorda com nossos ', link: 'Termos de Uso', text2: '.' },
  es: { text1: 'Solo para uso personal y sin conexión. Al usar esta herramienta, aceptas nuestra ', link: 'Política de Uso Justo', text2: '.' },
  id: { text1: 'Hanya untuk penggunaan pribadi dan offline. Dengan menggunakan alat ini, Anda menyetujui ', link: 'Kebijakan Penggunaan', text2: '.' },
  fr: { text1: 'Pour usage personnel et hors ligne uniquement. En utilisant cet outil, vous acceptez nos ', link: 'Conditions d\'Utilisation', text2: '.' },
  de: { text1: 'Nur für den persönlichen, offline Gebrauch. Durch die Nutzung stimmen Sie unserer ', link: 'Fair-Use-Richtlinie', text2: ' zu.' },
  ar: { text1: 'للاستخدام الشخصي دون اتصال فقط. باستخدام هذه الأداة فإنك توافق على ', link: 'سياسة الاستخدام العادل', text2: '.' },
  ru: { text1: 'Только для личного использования. Используя сервис, вы соглашаетесь с ', link: 'Правилами', text2: '.' },
  tr: { text1: 'Yalnızca kişisel ve çevrimdışı kullanım içindir. Bu aracı kullanarak ', link: 'Kullanım Koşullarımızı', text2: ' kabul etmiş olursunuz.' },
  ur: { text1: 'صرف ذاتی اور آف لائن استعمال کے لیے۔ اس ٹول کو استعمال کر کے آپ ہماری ', link: 'استعمال کی پالیسی', text2: ' سے اتفاق کرتے ہیں۔' },
  hi: { text1: 'केवल व्यक्तिगत और ऑफ़लाइन उपयोग के लिए। इस टूल का उपयोग करके आप हमारी ', link: 'उपयोग नीति', text2: ' से सहमत होते हैं।' },
  it: { text1: 'Solo per uso personale e offline. Utilizzando questo strumento accetti i nostri ', link: 'Termini di Servizio', text2: '.' },
  vi: { text1: 'Chỉ dành cho mục đích cá nhân, ngoại tuyến. Sử dụng công cụ này đồng nghĩa bạn đồng ý với ', link: 'Điều khoản Sử dụng', text2: '.' },
  th: { text1: 'สำหรับการใช้งานส่วนตัวแบบออฟไลน์เท่านั้น การใช้เครื่องมือนี้ถือว่าคุณยอมรับ ', link: 'ข้อกำหนดการใช้งาน', text2: ' ของเรา' },
  ko: { text1: '개인적 오프라인 용도로만 사용 가능합니다. 본 도구를 사용하면 당사의 ', link: '이용약관', text2: '에 동의하는 것으로 간주됩니다.' },
  ja: { text1: '個人利用およびオフライン再生専用です。本ツールの利用により、当サービスの ', link: '利用規約', text2: ' に同意したものとみなされます。' },
  pl: { text1: 'Wyłącznie do osobistego użytku offline. Korzystając z narzędzia, akceptujesz nasz ', link: 'Regulamin Serwisu', text2: '.' },
  nl: { text1: 'Alleen voor persoonlijk offline gebruik. Door deze tool te gebruiken gaat u akkoord met onze ', link: 'Gebruiksvoorwaarden', text2: '.' },
  ms: { text1: 'Untuk kegunaan peribadi dan luar talian sahaja. Menggunakan alat ini bermakna anda bersetuju dengan ', link: 'Syarat Perkhidmatan', text2: ' kami.' },
  fil: { text1: 'Para sa personal na offline na paggamit lamang. Sa paggamit ng tool na ito, sumasang-ayon ka sa aming ', link: 'Mga Tuntunin sa Paggamit', text2: '.' },
  uk: { text1: 'Лише для особистого офлайн-використання. Використовуючи цей інструмент, ви погоджуєтеся з нашими ', link: 'Умовами використання', text2: '.' },
  sv: { text1: 'Endast för personligt och offlinebruk. Genom att använda detta verktyg godkänner du våra ', link: 'Användarvillkor', text2: '.' },
  ro: { text1: 'Doar pentru uz personal și offline. Prin utilizarea acestui instrument sunteți de acord cu ', link: 'Termenii de Utilizare', text2: '.' },
  cs: { text1: 'Pouze pro osobní offline použití. Používáním tohoto nástroje souhlasíte s našimi ', link: 'Podmínkami použití', text2: '.' },
  el: { text1: 'Μόνο για προσωπική, εκτός σύνδεσης χρήση. Χρησιμοποιώντας αυτό το εργαλείο συμφωνείτε με τους ', link: 'Όρους Χρήσης', text2: ' μας.' },
  fa: { text1: 'فقط برای استفاده شخصی و آفلاین. با استفاده از این ابزار شما با ', link: 'قوانین استفاده', text2: ' ما موافقت می‌کنید.' },
  bn: { text1: 'কেবলমাত্র ব্যক্তিগত এবং অফলাইন ব্যবহারের জন্য। এই টুল ব্যবহার করে আপনি আমাদের ', link: 'ব্যবহারের শর্তাবলী', text2: ' মেনে নিচ্ছেন।' },
  en: { text1: 'For personal, offline use only. By using this tool you agree to our ', link: 'Fair Use Policy', text2: '.' },
};

const BADGES_TEXTS: Record<string, [string, string, string, string]> = {
  pt: ['Qualidade Original', 'HD MP4', 'Sem Necessidade de Login', '100% Grátis'],
  es: ['Calidad Original', 'HD MP4', 'Sin Iniciar Sesión', '100% Gratis'],
  id: ['Kualitas Asli', 'HD MP4', 'Tanpa Login', '100% Gratis'],
  fr: ['Qualité Originale', 'HD MP4', 'Sans Inscription', '100% Gratuit'],
  de: ['Originalqualität', 'HD MP4', 'Keine Anmeldung', '100% Kostenlos'],
  ar: ['جودة أصلية', 'HD MP4', 'دون تسجيل دخول', 'مجاني 100%'],
  ru: ['Оригинальное качество', 'HD MP4', 'Без регистрации', '100% Бесплатно'],
  tr: ['Orijinal Kalite', 'HD MP4', 'Giriş Gerekmez', '%100 Ücretsiz'],
  ur: ['اصل کوالٹی', 'ایچ ڈی MP4', 'لاگ ان کی ضرورت نہیں', '100% مفت'],
  hi: ['मूल गुणवत्ता', 'HD MP4', 'लॉगिन की आवश्यकता नहीं', '100% मुफ़्त'],
  it: ['Qualità Originale', 'HD MP4', 'Nessun Login Richiesto', '100% Gratis'],
  vi: ['Chất Lượng Gốc', 'HD MP4', 'Không Cần Đăng Nhập', '100% Miễn Phí'],
  th: ['คุณภาพต้นฉบับ', 'HD MP4', 'ไม่ต้องเข้าสู่ระบบ', 'ฟรี 100%'],
  ko: ['원본 화질', 'HD MP4', '로그인 필요 없음', '100% 무료'],
  ja: ['元の画質', 'HD MP4', 'ログイン不要', '100% 無料'],
  pl: ['Jakość Oryginalna', 'HD MP4', 'Bez Logowania', '100% Za Darmo'],
  nl: ['Originele Kwaliteit', 'HD MP4', 'Geen Login Nodig', '100% Gratis'],
  ms: ['Kualiti Asal', 'HD MP4', 'Tanpa Log Masuk', '100% Percuma'],
  fil: ['Orihinal na Kalidad', 'HD MP4', 'Hindi Kailangan ng Login', '100% Libre'],
  uk: ['Оригінальна якість', 'HD MP4', 'Без входу в акаунт', '100% Безкоштовно'],
  sv: ['Originalkvalitet', 'HD MP4', 'Ingen Inloggning Krävs', '100% Gratis'],
  ro: ['Calitate Originală', 'HD MP4', 'Fără Conectare', '100% Gratuit'],
  cs: ['Původní kvalita', 'HD MP4', 'Bez nutnosti přihlášení', '100% Zdarma'],
  el: ['Αρχική Ποιότητα', 'HD MP4', 'Χωρίς Σύνδεση', '100% Δωρεάν'],
  fa: ['کیفیت اصلی', 'HD MP4', 'بدون نیاز به لاگین', '۱۰۰٪ رایگان'],
  bn: ['অরিজিনাল কোয়ালিটি', 'HD MP4', 'কোনো লগইন প্রয়োজন নেই', '১০০% ফ্রি'],
  en: ['Original Quality', 'HD MP4', 'No Login Required', '100% Free'],
};

export function UrlInput({ onSubmit, loading, onReset, currentLanguage = 'en' }: UrlInputProps) {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const [url, setUrl] = useState('');
  const [validationMsg, setValidationMsg] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState<MediaFilter>('video');

  const platform = url.trim() ? detectPlatform(url) : null;
  const isValid = isValidUrl(url) && isSupportedUrl(url);

  // Validate on change
  useEffect(() => {
    if (url.trim()) {
      setValidationMsg(getValidationMessage(url));
    } else {
      setValidationMsg(null);
    }
  }, [url]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (isValid && !loading) {
      onSubmit(url.trim());
    }
  }, [url, isValid, loading, onSubmit]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        if (isValidUrl(text.trim()) && isSupportedUrl(text.trim())) {
          setTimeout(() => onSubmit(text.trim()), 300);
        }
      }
    } catch {
      // Clipboard access denied silently
    }
  }, [onSubmit]);

  const handleClear = useCallback(() => {
    setUrl('');
    setValidationMsg(null);
    onReset();
  }, [onReset]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 animate-slide-up">

      <form onSubmit={handleSubmit} className="relative space-y-3">
        {/* Crisp White Search Container */}
        <div className={`relative bg-white rounded-2xl p-2 transition-all duration-300 shadow-2xl flex items-center gap-2 border-2 border-slate-900/80
                        ${isFocused ? 'ring-4 ring-white/40' : ''}
                        ${validationMsg && url.trim() ? 'ring-4 ring-amber-400/50' : ''}
                        ${isValid && url.trim() ? 'ring-4 ring-emerald-400/50' : ''}`}>
          
          {/* Platform badge */}
          {platform && (
            <div className="pl-3 animate-fade-in shrink-0">
              <PlatformBadge platform={platform} size="sm" />
            </div>
          )}

          {/* URL Input Field */}
          <input
            id="url-input"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={t.input.placeholder || "Paste TikTok or Instagram video link here..."}
            className="flex-1 min-w-0 px-3 sm:px-4 py-3 sm:py-3.5 bg-transparent border-none outline-none text-sm sm:text-base font-semibold text-slate-900 placeholder-slate-400"
            disabled={loading}
            autoComplete="off"
            spellCheck={false}
          />

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 pr-1 shrink-0">
            {url && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
                aria-label="Clear input"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}

            {/* Gradient Paste Button */}
            <button
              type="button"
              onClick={handlePaste}
              className="px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-95 transition-all cursor-pointer shadow-md flex items-center gap-1.5"
              disabled={loading}
              aria-label="Paste link from clipboard"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
              </svg>
              <span>{t.input.paste}</span>
            </button>
          </div>
        </div>

        {/* Large Prominent Black DOWNLOAD Button */}
        <button
          type="submit"
          disabled={!isValid || loading}
          className="w-full py-4 rounded-2xl bg-slate-950 hover:bg-black text-white font-black text-base sm:text-lg uppercase tracking-wider shadow-2xl flex items-center justify-center gap-2.5 transition-all border border-slate-800 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          )}
          <span>{loading ? t.input.fetching : (t.input.fetch ? t.input.fetch.toUpperCase() : 'DOWNLOAD')}</span>
        </button>

        {/* Disclaimer Note */}
        {(() => {
          const d = DISCLAIMER_TEXTS[currentLanguage] || DISCLAIMER_TEXTS.en;
          return (
            <p className="text-[11px] text-white/80 text-center font-medium">
              {d.text1}
              <a href="/terms-of-service" className="underline hover:text-white font-bold">{d.link}</a>
              {d.text2}
            </p>
          );
        })()}

        {/* Feature Checkmark Badges */}
        {(() => {
          const b = BADGES_TEXTS[currentLanguage] || BADGES_TEXTS.en;
          return (
            <div className="pt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-bold text-white drop-shadow-sm">
              <span className="flex items-center gap-1.5"><span className="text-emerald-300 font-black">✓</span> {b[0]}</span>
              <span className="flex items-center gap-1.5"><span className="text-emerald-300 font-black">✓</span> {b[1]}</span>
              <span className="flex items-center gap-1.5"><span className="text-emerald-300 font-black">✓</span> {b[2]}</span>
              <span className="flex items-center gap-1.5"><span className="text-emerald-300 font-black">✓</span> {b[3]}</span>
            </div>
          );
        })()}

        {/* Validation Status Message */}
        {validationMsg && url.trim() && (
          <p className="mt-2 text-xs font-bold text-amber-300 text-center flex items-center justify-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {validationMsg}
          </p>
        )}
      </form>
    </div>
  );
}
