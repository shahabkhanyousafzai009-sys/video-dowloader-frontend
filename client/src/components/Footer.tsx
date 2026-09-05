import React from 'react';
import { LegalTab } from './LegalModal';
import { Language } from '../utils/i18n';

interface FooterProps {
  onOpenLegal: (tab: LegalTab) => void;
  onOpenWidget?: () => void;
  onNavigate?: (path: string) => void;
  currentLanguage?: Language;
}

const FOOTER_TRANSLATIONS: Record<string, {
  heading: string;
  tiktok: string;
  tiktokMp3: string;
  instagram: string;
  facebook: string;
  mp3: string;
  guides: string;
  blog: string;
  widget: string;
  privacy: string;
  terms: string;
  dmca: string;
  about: string;
  contact: string;
  disclaimer: string;
  cookie: string;
  disclaimerLabel: string;
  disclaimerBody: string;
  noStorage: string;
}> = {
  pt: {
    heading: 'Baixadores de Vídeo Online Gratuitos & Conversores de MP3 HD',
    tiktok: 'Baixar Vídeo TikTok Sem Marca d\'Água',
    tiktokMp3: 'Baixar Música TikTok MP3 320kbps',
    instagram: 'Baixar Reels do Instagram 1080p HD',
    facebook: 'Baixar Vídeos do Facebook HD',
    mp3: 'Conversor de Vídeo para MP3',
    guides: '📖 Guias Passo a Passo',
    blog: '📚 Blog & Tutoriais',
    widget: '⚡ Incorporar Widget no seu Site',
    privacy: 'Política de Privacidade',
    terms: 'Termos de Serviço',
    dmca: 'Política DMCA',
    about: 'Sobre Nós',
    contact: 'Fale Conosco',
    disclaimer: 'Aviso Legal',
    cookie: 'Política de Cookies',
    disclaimerLabel: 'Aviso Legal:',
    disclaimerBody: 'O SnapLoad destina-se a baixar conteúdos aos quais você tem direito de acesso. Baixar material protegido por direitos autorais sem permissão pode violar os termos de serviço das respectivas plataformas. Não armazenamos nenhum vídeo em nossos servidores — todos os arquivos são transmitidos diretamente para o seu dispositivo.',
    noStorage: 'Nenhum vídeo salvo no servidor • Transmissão direta',
  },
  es: {
    heading: 'Descargadores de Video Online Gratis y Convertidores de MP3 HD',
    tiktok: 'Descargar Video TikTok Sin Marca de Agua',
    tiktokMp3: 'Música de TikTok a MP3 320kbps',
    instagram: 'Descargar Instagram Reels 1080p HD',
    facebook: 'Descargar Videos de Facebook HD',
    mp3: 'Convertidor de Video a MP3',
    guides: '📖 Guías Paso a Paso',
    blog: '📚 Blog y Tutoriales',
    widget: '⚡ Incrustar Widget en tu Sitio',
    privacy: 'Política de Privacidad',
    terms: 'Términos del Servicio',
    dmca: 'Política DMCA',
    about: 'Sobre Nosotros',
    contact: 'Contáctanos',
    disclaimer: 'Descargo de Responsabilidad',
    cookie: 'Política de Cookies',
    disclaimerLabel: 'Descargo de responsabilidad:',
    disclaimerBody: 'SnapLoad está diseñado para descargar contenido al que tienes derecho de acceso. Descargar material con derechos de autor sin permiso puede violar los términos de servicio de las plataformas respectivas. No almacenamos ningún video en nuestros servidores: todos los archivos se transmiten directamente a tu dispositivo.',
    noStorage: 'Sin videos guardados en servidores • Transmisión directa',
  },
  id: {
    heading: 'Pengunduh Video Online Gratis & Konverter MP3 HD',
    tiktok: 'Download Video TikTok Tanpa Watermark',
    tiktokMp3: 'Ekstrak Lagu TikTok MP3 320kbps',
    instagram: 'Download Reels Instagram 1080p HD',
    facebook: 'Download Video Facebook HD',
    mp3: 'Konverter Video ke MP3',
    guides: '📖 Panduan Langkah demi Langkah',
    blog: '📚 Blog & Tutorial',
    widget: '⚡ Pasang Widget di Situs Anda',
    privacy: 'Kebijakan Privasi',
    terms: 'Ketentuan Layanan',
    dmca: 'Kebijakan DMCA',
    about: 'Tentang Kami',
    contact: 'Hubungi Kami',
    disclaimer: 'Penafian',
    cookie: 'Kebijakan Cookie',
    disclaimerLabel: 'Penafian:',
    disclaimerBody: 'SnapLoad ditujukan untuk mengunduh konten yang Anda memiliki hak akses. Mengunduh materi berhak cipta tanpa izin dapat melanggar ketentuan layanan platform masing-masing. Kami tidak menyimpan video apa pun di server kami — semua file dialirkan langsung ke perangkat Anda.',
    noStorage: 'Tidak ada video disimpan di server • Streaming langsung',
  },
  fr: {
    heading: 'Téléchargeurs de Vidéos Gratuits & Convertisseurs MP3 HD',
    tiktok: 'Télécharger Vidéo TikTok Sans Filigrane',
    tiktokMp3: 'Son TikTok en MP3 320kbps',
    instagram: 'Télécharger Instagram Reels 1080p HD',
    facebook: 'Télécharger Vidéo Facebook HD',
    mp3: 'Convertisseur Vidéo en MP3',
    guides: '📖 Guides Étape par Étape',
    blog: '📚 Blog & Tutoriels',
    widget: '⚡ Intégrer le Widget sur Votre Site',
    privacy: 'Politique de Confidentialité',
    terms: 'Conditions d\'Utilisation',
    dmca: 'Politique DMCA',
    about: 'À Propos',
    contact: 'Contactez-nous',
    disclaimer: 'Avertissement',
    cookie: 'Politique de Cookies',
    disclaimerLabel: 'Avertissement :',
    disclaimerBody: 'SnapLoad est destiné au téléchargement de contenu auquel vous avez légalement accès. Aucun fichier n\'est stocké sur nos serveurs — tout est diffusé directement sur votre appareil.',
    noStorage: 'Aucune vidéo stockée sur le serveur • Diffusion directe',
  },
  de: {
    heading: 'Kostenlose Online-Video-Downloader & MP3-Konverter',
    tiktok: 'TikTok Downloader Ohne Wasserzeichen',
    tiktokMp3: 'TikTok Sound zu MP3 320kbps',
    instagram: 'Instagram Reels Downloader 1080p HD',
    facebook: 'Facebook Video Downloader HD',
    mp3: 'Video zu MP3 Konverter',
    guides: '📖 Schritt-für-Schritt-Anleitungen',
    blog: '📚 Blog & Tutorials',
    widget: '⚡ Widget auf Ihrer Website einbinden',
    privacy: 'Datenschutzrichtlinie',
    terms: 'Nutzungsbedingungen',
    dmca: 'DMCA-Richtlinie',
    about: 'Über Uns',
    contact: 'Kontakt',
    disclaimer: 'Haftungsausschluss',
    cookie: 'Cookie-Richtlinie',
    disclaimerLabel: 'Haftungsausschluss:',
    disclaimerBody: 'SnapLoad ist für das Herunterladen von Inhalten bestimmt, zu deren Zugriff Sie berechtigt sind. Wir speichern keine Videos auf unseren Servern.',
    noStorage: 'Keine Videos auf dem Server gespeichert • Direktes Streaming',
  },
  ar: {
    heading: 'أدوات تحميل الفيديو المجانية ومحولات MP3 عالية الجودة',
    tiktok: 'تحميل تيك توك بدون علامة مائية',
    tiktokMp3: 'تحميل صوت تيك توك MP3 320kbps',
    instagram: 'تحميل ريلز انستقرام 1080p HD',
    facebook: 'تحميل فيديو فيسبوك HD',
    mp3: 'تحويل الفيديو إلى MP3',
    guides: '📖 دليل خطوة بخطوة',
    blog: '📚 المدونة والمقالات',
    widget: '⚡ أضف الودجة إلى موقعك',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
    dmca: 'سياسة DMCA',
    about: 'من نحن',
    contact: 'اتصل بنا',
    disclaimer: 'إخلاء المسؤولية',
    cookie: 'سياسة ملفات تعريف الارتباط',
    disclaimerLabel: 'إخلاء المسؤولية:',
    disclaimerBody: 'SnapLoad مخصص لتحميل المحتوى المصرح لك بالوصول إليه. لا نقوم بتخزين أي مقاطع فيديو على خوادمنا — يتم نقل جميع الملفات مباشرة إلى جهازك.',
    noStorage: 'لا يتم تخزين أي فيديوهات على السيرفر • بث مباشر',
  },
  ur: {
    heading: 'مفت آن لائن ویڈیو ڈاؤنلوڈرز اور ایچ ڈی ایم پی 3 کنورٹرز',
    tiktok: 'ٹک ٹاک بغیر واٹر مارک ڈاؤنلوڈر',
    tiktokMp3: 'ٹک ٹاک ایم پی 3 آڈیو 320kbps',
    instagram: 'انسٹاگرام ریلز ڈاؤنلوڈر 1080p HD',
    facebook: 'فیس بک ویڈیو ڈاؤنلوڈر HD',
    mp3: 'ویڈیو سے ایم پی 3 کنورٹر',
    guides: '📖 مرحلہ وار گائیڈز',
    blog: '📚 بلاگ اور مضامین',
    widget: '⚡ اپنی سائٹ پر ویجیٹ لگائیں',
    privacy: 'پرائیویسی پالیسی',
    terms: 'شرائط و ضوابط',
    dmca: 'ڈی ایم سی اے پالیسی',
    about: 'ہمارے بارے میں',
    contact: 'ہم سے رابطہ کریں',
    disclaimer: 'دستبرداری',
    cookie: 'کوکی پالیسی',
    disclaimerLabel: 'دستبرداری:',
    disclaimerBody: 'SnapLoad صرف ان ویڈیوز کو ڈاؤن لوڈ کرنے کے لیے ہے جن تک رسائی کا آپ کو حق ہے۔ ہم اپنے سرورز پر کوئی ویڈیو محفوظ نہیں کرتے۔',
    noStorage: 'سرور پر کوئی ویڈیو محفوظ نہیں ہوتی • براہ راست ڈاؤن لوڈ',
  },
  tr: {
    heading: 'Ücretsiz Online Video İndiriciler & Yüksek Bitrate MP3 Dönüştürücüler',
    tiktok: 'Filigramsız TikTok Video İndir',
    tiktokMp3: 'TikTok MP3 Ses İndirme 320kbps',
    instagram: 'Instagram Reels İndir 1080p HD',
    facebook: 'Facebook Video İndirici HD',
    mp3: 'Videoyu MP3 Yapma',
    guides: '📖 Adım Adım Kılavuzlar',
    blog: '📚 Blog ve Rehberler',
    widget: '⚡ Sitenize İndirme Widget\'ı Ekleyin',
    privacy: 'Gizlilik Politikası',
    terms: 'Kullanım Koşulları',
    dmca: 'DMCA Bildirimi',
    about: 'Hakkımızda',
    contact: 'İletişim',
    disclaimer: 'Yasal Uyarı',
    cookie: 'Çerez Politikası',
    disclaimerLabel: 'Yasal Uyarı:',
    disclaimerBody: 'SnapLoad, yalnızca erişim hakkınız olan içerikleri kişisel amaçlarla indirmeniz içindir. Sunucularımızda hiçbir dosya depolanmaz, doğrudan cihazınıza aktarılır.',
    noStorage: 'Sunucuda video depolanmaz • Doğrudan aktarım',
  },
  ru: {
    heading: 'Бесплатные Онлайн Загрузчики Видео & MP3 Конвертеры Высокого Качества',
    tiktok: 'Скачать видео Тик Ток без водяного знака',
    tiktokMp3: 'Скачать звук из Тик Ток в MP3 320kbps',
    instagram: 'Скачать Рилс Инстаграм 1080p HD',
    facebook: 'Скачать видео с Фейсбука HD',
    mp3: 'Конвертер видео в MP3',
    guides: '📖 Пошаговые Руководства',
    blog: '📚 Блог и Статьи',
    widget: '⚡ Встроить виджет на свой сайт',
    privacy: 'Политика конфиденциальности',
    terms: 'Условия использования',
    dmca: 'Политика DMCA',
    about: 'О нас',
    contact: 'Контакты',
    disclaimer: 'Отказ от ответственности',
    cookie: 'Политика cookies',
    disclaimerLabel: 'Предупреждение:',
    disclaimerBody: 'SnapLoad предназначен для личного скачивания общедоступного контента. Мы не храним видео на своих серверах — поток передается напрямую в браузер.',
    noStorage: 'Файлы не сохраняются на сервере • Прямая передача',
  },
  hi: {
    heading: 'मुफ़्त ऑनलाइन वीडियो डाउनलोडर और हाई-क्वालिटी MP3 कनवर्टर',
    tiktok: 'बिना वॉटरमार्क टिकटक वीडियो डाउनलोडर',
    tiktokMp3: 'टिकटक MP3 साउंड एक्सट्रैक्टर 320kbps',
    instagram: 'इंस्टाग्राम रील्स डाउनलोड 1080p HD',
    facebook: 'फेसबुक वीडियो डाउनलोडर HD',
    mp3: 'वीडियो से MP3 कनवर्टर',
    guides: '📖 चरण-दर-चरण गाइड',
    blog: '📚 ब्लॉग और ट्यूटोरियल',
    widget: '⚡ अपनी साइट पर विजेट जोड़ें',
    privacy: 'गोपनीयता नीति',
    terms: 'सेवा की शर्तें',
    dmca: 'DMCA नीति',
    about: 'हमारे बारे में',
    contact: 'संपर्क करें',
    disclaimer: 'अस्वीकरण',
    cookie: 'कुकी नीति',
    disclaimerLabel: 'अस्वीकरण:',
    disclaimerBody: 'SnapLoad केवल वैध पहुंच वाले मीडिया के व्यक्तिगत डाउनलोड के लिए है। हम अपने सर्वर पर कोई वीडियो संग्रहीत नहीं करते हैं।',
    noStorage: 'सर्वर पर कोई वीडियो स्टोर नहीं • सीधा स्ट्रीम',
  },
  it: {
    heading: 'Downloader Video Online Gratuiti e Convertitori Audio MP3 HD',
    tiktok: 'Scaricare Video TikTok Senza Watermark',
    tiktokMp3: 'Estrarre Audio TikTok in MP3 320kbps',
    instagram: 'Scaricare Reels Instagram 1080p HD',
    facebook: 'Scaricare Video Facebook HD',
    mp3: 'Convertitore da Video a MP3',
    guides: '📖 Guide Passo Dopo Passo',
    blog: '📚 Blog e Tutorial',
    widget: '⚡ Incorpora Widget sul tuo Sito',
    privacy: 'Informativa sulla Privacy',
    terms: 'Termini di Servizio',
    dmca: 'Politica DMCA',
    about: 'Chi Siamo',
    contact: 'Contattaci',
    disclaimer: 'Disclaimer Legale',
    cookie: 'Informativa sui Cookie',
    disclaimerLabel: 'Avviso:',
    disclaimerBody: 'SnapLoad è concepito per il salvataggio di contenuti a cui hai diritto di accesso. Nessun file viene memorizzato sui nostri server.',
    noStorage: 'Nessun video archiviato su server • Streaming diretto',
  },
  vi: {
    heading: 'Trình Tải Video Trực Tuyến Miễn Phí & Chuyển Đổi MP3 Chất Lượng Cao',
    tiktok: 'Tải Video TikTok Không Watermark Logo',
    tiktokMp3: 'Tải Nhạc TikTok MP3 320kbps',
    instagram: 'Tải Reels Instagram 1080p HD',
    facebook: 'Tải Video Facebook HD',
    mp3: 'Chuyển Đổi Video Sang MP3',
    guides: '📖 Hướng Dẫn Từng Bước',
    blog: '📚 Blog & Bài Viết',
    widget: '⚡ Nhúng Tiện Ích Vào Website',
    privacy: 'Chính Sách Bảo Mật',
    terms: 'Điều Khoản Dịch Vụ',
    dmca: 'Chính Sách DMCA',
    about: 'Giới Thiệu',
    contact: 'Liên Hệ',
    disclaimer: 'Tuyên Bố Miễn Trừ',
    cookie: 'Chính Sách Cookie',
    disclaimerLabel: 'Miễn trừ trách nhiệm:',
    disclaimerBody: 'SnapLoad phục vụ mục đích lưu trữ nội dung công khai cá nhân hợp pháp. Chúng tôi không lưu trữ bất kỳ video nào trên máy chủ.',
    noStorage: 'Không lưu tệp trên máy chủ • Truyền trực tiếp',
  },
  th: {
    heading: 'ดาวน์โหลดวิดีโอออนไลน์ฟรี & แปลงไฟล์เสียง MP3 ความละเอียดสูง',
    tiktok: 'ดาวน์โหลดวิดีโอ TikTok ไม่มีลายน้ำ',
    tiktokMp3: 'ดึงเสียงเพลง TikTok เป็น MP3 320kbps',
    instagram: 'ดาวน์โหลด Instagram Reels 1080p HD',
    facebook: 'ดาวน์โหลดวิดีโอ Facebook HD',
    mp3: 'แปลงวิดีโอเป็นไฟล์ MP3',
    guides: '📖 คู่มือขั้นตอนการใช้งาน',
    blog: '📚 บล็อกและบทความ',
    widget: '⚡ ติดตั้งวิดเจ็ตบนเว็บไซต์ของคุณ',
    privacy: 'นโยบายความเป็นส่วนตัว',
    terms: 'ข้อกำหนดการให้บริการ',
    dmca: 'นโยบายลิขสิทธิ์ DMCA',
    about: 'เกี่ยวกับเรา',
    contact: 'ติดต่อเรา',
    disclaimer: 'ข้อจำกัดความรับผิดชอบ',
    cookie: 'นโยบายคุกกี้',
    disclaimerLabel: 'ข้อจำกัดความรับผิดชอบ:',
    disclaimerBody: 'SnapLoad มีไว้สำหรับการดาวน์โหลดเนื้อหาเพื่อการใช้งานส่วนบุคคล เราไม่มีการจัดเก็บไฟล์วิดีโอไว้บนเซิร์ฟเวอร์ของเรา',
    noStorage: 'ไม่มีการเก็บวิดีโอบนเซิร์ฟเวอร์ • สตรีมโดยตรง',
  },
  ko: {
    heading: '무료 온라인 동영상 다운로더 및 고음질 MP3 변환기',
    tiktok: '워터마크 없는 틱톡 동영상 다운로드',
    tiktokMp3: '틱톡 음원 추출 MP3 320kbps',
    instagram: '인스타그램 릴스 다운로드 1080p HD',
    facebook: '페이스북 동영상 다운로더 HD',
    mp3: '동영상 MP3 변환기',
    guides: '📖 단계별 이용 가이드',
    blog: '📚 블로그 및 팁',
    widget: '⚡ 웹사이트 위젯 임베드',
    privacy: '개인정보 처리방침',
    terms: '이용약관',
    dmca: 'DMCA 저작권 정책',
    about: '회사 소개',
    contact: '문의하기',
    disclaimer: '면책 조항',
    cookie: '쿠키 정책',
    disclaimerLabel: '면책 조항:',
    disclaimerBody: 'SnapLoad는 개인 소장 목적의 공개 동영상 다운로드를 지원하며, 서버에 어떠한 파일도 영구 저장하지 않습니다.',
    noStorage: '서버 내 미디어 저장 없음 • 다이렉트 전송',
  },
  ja: {
    heading: '無料オンライン動画ダウンローダー＆高音質MP3変換ツール',
    tiktok: 'TikTok動画保存（ロゴなし・透かしなし）',
    tiktokMp3: 'TikTok音源 MP3抽出 320kbps',
    instagram: 'Instagramリール保存 1080p HD',
    facebook: 'Facebook動画ダウンロード HD',
    mp3: '動画からMP3音声変換',
    guides: '📖 使い方マニュアル',
    blog: '📚 公式ブログ＆コラム',
    widget: '⚡ サイト用埋め込みウィジェット',
    privacy: 'プライバシーポリシー',
    terms: '利用規約',
    dmca: 'DMCA著作権方針',
    about: '運営者情報',
    contact: 'お問い合わせ',
    disclaimer: '免責事項',
    cookie: 'クッキーポリシー',
    disclaimerLabel: '免責事項：',
    disclaimerBody: 'SnapLoadは個人利用目的でのメディア保存を支援するツールです。動画データはサーバー上に一切保存されません。',
    noStorage: 'サーバーへの動画保存ゼロ • ダイレクト配信',
  },
  pl: {
    heading: 'Darmowe Pobieracze Wideo Online & Konwertery MP3 Wysokiej Jakości',
    tiktok: 'Pobieranie z TikToka Bez Znaku Wodnego',
    tiktokMp3: 'Dźwięki z TikToka do MP3 320kbps',
    instagram: 'Pobieracz Rolek Instagram 1080p HD',
    facebook: 'Pobieracz Wideo z Facebooka HD',
    mp3: 'Konwerter Wideo na MP3',
    guides: '📖 Przewodniki Krok po Kroku',
    blog: '📚 Blog i Poradniki',
    widget: '⚡ Dodaj Widżet na Swoją Stronę',
    privacy: 'Polityka Prywatności',
    terms: 'Regulamin Serwisu',
    dmca: 'Zgłoszenia DMCA',
    about: 'O Nas',
    contact: 'Kontakt',
    disclaimer: 'Zrzeczenie Odpowiedzialności',
    cookie: 'Polityka Cookies',
    disclaimerLabel: 'Zrzeczenie odpowiedzialności:',
    disclaimerBody: 'SnapLoad służy do prywatnego pobierania materiałów publicznych. Nie przechowujemy żadnych plików na naszych serwerach.',
    noStorage: 'Brak plików na serwerze • Bezpośrednie pobieranie',
  },
  nl: {
    heading: 'Gratis Online Video Downloaders & Hoge Bitrate MP3 Converters',
    tiktok: 'TikTok Downloader Zonder Watermerk',
    tiktokMp3: 'TikTok Muziek naar MP3 320kbps',
    instagram: 'Instagram Reels Downloader 1080p HD',
    facebook: 'Facebook Video Downloader HD',
    mp3: 'Video naar MP3 Converter',
    guides: '📖 Stap-voor-stap Handleidingen',
    blog: '📚 Blog & Artikelen',
    widget: '⚡ Widget Insluiten op Website',
    privacy: 'Privacybeleid',
    terms: 'Gebruiksvoorwaarden',
    dmca: 'DMCA Beleid',
    about: 'Over Ons',
    contact: 'Contact',
    disclaimer: 'Disclaimer',
    cookie: 'Cookiebeleid',
    disclaimerLabel: 'Disclaimer:',
    disclaimerBody: 'SnapLoad is bedoeld voor persoonlijk gebruik van openbare content. Wij bewaren geen bestanden op onze servers.',
    noStorage: 'Geen opslag op servers • Direct streamen',
  },
  ms: {
    heading: 'Pemuat Turun Video Percuma & Penukar MP3 Berkualiti Tinggi',
    tiktok: 'Muat Turun TikTok Tanpa Watermark',
    tiktokMp3: 'Ekstrak Lagu TikTok MP3 320kbps',
    instagram: 'Muat Turun Instagram Reels 1080p HD',
    facebook: 'Pemuat Turun Video Facebook HD',
    mp3: 'Penukar Video ke MP3',
    guides: '📖 Panduan Pengguna',
    blog: '📚 Blog & Artikel',
    widget: '⚡ Pasang Widget di Laman Web',
    privacy: 'Dasar Privasi',
    terms: 'Syarat Perkhidmatan',
    dmca: 'Dasar DMCA',
    about: 'Tentang Kami',
    contact: 'Hubungi Kami',
    disclaimer: 'Penafian',
    cookie: 'Dasar Kuki',
    disclaimerLabel: 'Penafian:',
    disclaimerBody: 'SnapLoad bertujuan untuk memuat turun kandungan yang anda mempunyai hak akses. Tiada video disimpan pada pelayan kami.',
    noStorage: 'Tiada video disimpan di pelayan • Strim langsung',
  },
  fil: {
    heading: 'Libreng Online Video Downloader & Converter sa Mataas na Bitrate MP3',
    tiktok: 'TikTok Downloader Walang Watermark',
    tiktokMp3: 'I-extract ang TikTok Sound sa MP3 320kbps',
    instagram: 'Instagram Reels Downloader 1080p HD',
    facebook: 'Facebook Video Downloader HD',
    mp3: 'Video to MP3 Converter',
    guides: '📖 Hakbang-hakbang na Gabay',
    blog: '📚 Blog at mga Artikulo',
    widget: '⚡ I-embed ang Widget sa Iyong Site',
    privacy: 'Patakaran sa Privacy',
    terms: 'Mga Tuntunin sa Paggamit',
    dmca: 'Patakaran sa DMCA',
    about: 'Tungkol sa Amin',
    contact: 'Makipag-ugnayan',
    disclaimer: 'Pagwawaksi ng Responsibilidad',
    cookie: 'Patakaran sa Cookie',
    disclaimerLabel: 'Pagwawaksi:',
    disclaimerBody: 'Ang SnapLoad ay para lamang sa personal na pag-download ng pampublikong media. Hindi kami nag-iimbak ng anumang file sa aming server.',
    noStorage: 'Walang naka-save sa server • Direktang streaming',
  },
  uk: {
    heading: 'Безкоштовні Онлайн Завантажувачі Відео та Конвертери в MP3',
    tiktok: 'Завантажити відео TikTok без водяного знака',
    tiktokMp3: 'Звук з TikTok в MP3 320kbps',
    instagram: 'Завантажити Instagram Reels 1080p HD',
    facebook: 'Завантажувач відео з Facebook HD',
    mp3: 'Конвертер відео в MP3',
    guides: '📖 Інструкції та Посібники',
    blog: '📚 Блог та Статті',
    widget: '⚡ Вставити віджет на свій сайт',
    privacy: 'Політика конфіденційності',
    terms: 'Умови надання послуг',
    dmca: 'Політика DMCA',
    about: 'Про нас',
    contact: 'Контакти',
    disclaimer: 'Відмова від відповідальності',
    cookie: 'Політика щодо файлів cookie',
    disclaimerLabel: 'Застереження:',
    disclaimerBody: 'SnapLoad призначений для особистого використання публічного контенту. Ми не зберігаємо жодних файлів на своїх серверах.',
    noStorage: 'Файли не зберігаються на сервері • Прямий потік',
  },
  sv: {
    heading: 'Gratis Online Video Downloaders & MP3-omvandlare med Hög Bithastighet',
    tiktok: 'TikTok Downloader Utan Vattenstämpel',
    tiktokMp3: 'TikTok Ljud till MP3 320kbps',
    instagram: 'Instagram Reels Downloader 1080p HD',
    facebook: 'Facebook Video Downloader HD',
    mp3: 'Video till MP3 Omvandlare',
    guides: '📖 Steg-för-steg Guider',
    blog: '📚 Blogg & Tips',
    widget: '⚡ Bädda in Widget på din Webbplats',
    privacy: 'Integritetspolicy',
    terms: 'Användarvillkor',
    dmca: 'DMCA-policy',
    about: 'Om Oss',
    contact: 'Kontakta Oss',
    disclaimer: 'Friskrivning',
    cookie: 'Cookiepolicy',
    disclaimerLabel: 'Ansvarsfriskrivning:',
    disclaimerBody: 'SnapLoad är avsett för personlig nedladdning av offentligt tillgängligt innehåll. Inga filer sparas på våra servrar.',
    noStorage: 'Inga videor sparas på servern • Direktströmning',
  },
  ro: {
    heading: 'Descărcătoare Video Online Gratuite & Convertoare MP3 HD',
    tiktok: 'Descărcare Video TikTok Fără Filigran',
    tiktokMp3: 'Sunet TikTok în MP3 320kbps',
    instagram: 'Descărcare Instagram Reels 1080p HD',
    facebook: 'Descărcător Video Facebook HD',
    mp3: 'Convertor Video în MP3',
    guides: '📖 Ghiduri Pas cu Pas',
    blog: '📚 Blog și Articole',
    widget: '⚡ Integrează Widget pe Site-ul Tău',
    privacy: 'Politica de Confidențialitate',
    terms: 'Termeni și Condiții',
    dmca: 'Politica DMCA',
    about: 'Despre Noi',
    contact: 'Contact',
    disclaimer: 'Declinare a Răspunderii',
    cookie: 'Politica privind Cookie-urile',
    disclaimerLabel: 'Declinare a răspunderii:',
    disclaimerBody: 'SnapLoad este destinat descărcării de conținut public în scopuri personale. Nu stocăm niciun fișier pe serverele noastre.',
    noStorage: 'Nu stocăm videoclipuri pe server • Redare directă',
  },
  cs: {
    heading: 'Bezplatné Online Stahovače Videa a Vysoce Kvalitní MP3 Převodníky',
    tiktok: 'Stahování z TikToku Bez Vodoznaku',
    tiktokMp3: 'Zvuk z TikToku do MP3 320kbps',
    instagram: 'Stahovač Instagram Reels 1080p HD',
    facebook: 'Stahovač Videa z Facebooku HD',
    mp3: 'Převodník Videa do MP3',
    guides: '📖 Návody Krok za Krokem',
    blog: '📚 Blog a Články',
    widget: '⚡ Vložit Widget na Váš Web',
    privacy: 'Zásady Ochrany Osobních Údajů',
    terms: 'Podmínky Použití',
    dmca: 'Pravidla DMCA',
    about: 'O Nás',
    contact: 'Kontakt',
    disclaimer: 'Vyloučení Odpovědnosti',
    cookie: 'Zásady Používání Cookies',
    disclaimerLabel: 'Vyloučení odpovědnosti:',
    disclaimerBody: 'SnapLoad slouží pouze k osobnímu stahování veřejného obsahu. Žádné soubory na našich serverech neukládáme.',
    noStorage: 'Žádná videa se neukládají na server • Přímý přenos',
  },
  el: {
    heading: 'Δωρεάν Online Προγράμματα Λήψης Βίντεο & Μετατροπείς MP3 Υψηλής Ποιότητας',
    tiktok: 'Λήψη Βίντεο TikTok Χωρίς Υδατογράφημα',
    tiktokMp3: 'Ήχος TikTok σε MP3 320kbps',
    instagram: 'Λήψη Instagram Reels 1080p HD',
    facebook: 'Πρόγραμμα Λήψης Βίντεο Facebook HD',
    mp3: 'Μετατροπέας Βίντεο σε MP3',
    guides: '📖 Οδηγοί Βήμα προς Βήμα',
    blog: '📚 Ιστολόγιο & Άρθρα',
    widget: '⚡ Ενσωμάτωση Widget στην Ιστοσελίδα σας',
    privacy: 'Πολιτική Απορρήτου',
    terms: 'Όροι Παροχής Υπηρεσιών',
    dmca: 'Πολιτική DMCA',
    about: 'Σχετικά με Εμάς',
    contact: 'Επικοινωνία',
    disclaimer: 'Αποποίηση Ευθύνης',
    cookie: 'Πολιτική Cookies',
    disclaimerLabel: 'Αποποίηση ευθύνης:',
    disclaimerBody: 'Το SnapLoad προορίζεται για προσωπική χρήση δημόσιου περιεχομένου. Δεν αποθηκεύουμε κανένα αρχείο στους διακομιστές μας.',
    noStorage: 'Κανένα βίντεο στον διακομιστή • Απευθείας λήψη',
  },
  fa: {
    heading: 'دانلودرهای رایگان ویدیو آنلاین و مبدل‌های صوتی MP3 با کیفیت بالا',
    tiktok: 'دانلود ویدیو تیک تاک بدون واترمارک',
    tiktokMp3: 'استخراج صدای تیک تاک به MP3 320kbps',
    instagram: 'دانلود ریلز اینستاگرام 1080p HD',
    facebook: 'دانلودر ویدیو فیسبوک HD',
    mp3: 'تبدیل ویدیو به MP3',
    guides: '📖 راهنماهای گام به گام',
    blog: '📚 وبلاگ و آموزش‌ها',
    widget: '⚡ قرار دادن ابزارک در وب‌سایت',
    privacy: 'سیاست حفظ حریم خصوصی',
    terms: 'شرایط خدمات',
    dmca: 'قوانین کپی‌رایت DMCA',
    about: 'درباره ما',
    contact: 'تماس با ما',
    disclaimer: 'سلب مسئولیت',
    cookie: 'سیاست کوکی‌ها',
    disclaimerLabel: 'سلب مسئولیت:',
    disclaimerBody: 'SnapLoad برای دانلود محتوای عمومی و استفاده شخصی طراحی شده است. هیچ ویدیویی روی سرورهای ما ذخیره نمی‌شود.',
    noStorage: 'هیچ فایلی در سرور ذخیره نمی‌شود • استریم مستقیم',
  },
  bn: {
    heading: 'ফ্রি অনলাইন ভিডিও ডাউনলোডার এবং উচ্চ বিটরেট MP3 কনভার্টার',
    tiktok: 'ওয়াটারমার্ক ছাড়া টিকটক ভিডিও ডাউনলোডার',
    tiktokMp3: 'টিকটক সাউন্ড MP3 এক্সট্রাক্টর ৩২০kbps',
    instagram: 'ইনস্টাگرام রিলস ডাউনলোডার ১০৮০p HD',
    facebook: 'ফেসবুক ভিডিও ডাউনলোডার HD',
    mp3: 'ভিডিও থেকে MP3 কনভার্টার',
    guides: '📖 ধাপে ধাপে গাইড',
    blog: '📚 ব্লগ ও টিউটোরিয়াল',
    widget: '⚡ আপনার ওয়েবসাইটে উইজেট যুক্ত করুন',
    privacy: 'গোপনীয়তা নীতি',
    terms: 'ব্যবহারের শর্তাবলী',
    dmca: 'DMCA কপিরাইট নীতি',
    about: 'আমাদের সম্পর্কে',
    contact: 'যোগাযোগ',
    disclaimer: 'দায়মুক্তি',
    cookie: 'কুকি নীতি',
    disclaimerLabel: 'দায়মুক্তি:',
    disclaimerBody: 'SnapLoad কেবলমাত্র ব্যক্তিগত উদ্দেশ্যে পাবলিক ভিডিও ডাউনলোডের জন্য প্রস্তুত করা হয়েছে। সার্ভারে কোনো ভিডিও সংরক্ষণ করা হয় না।',
    noStorage: 'সার্ভারে কোনো ফাইল সংরক্ষণ করা হয় না • সরাসরি স্ট্রিম',
  },
  en: {
    heading: 'Free Online Video Downloaders & High-Bitrate MP3 Converters',
    tiktok: 'TikTok Downloader Without Watermark',
    tiktokMp3: 'TikTok MP3 Sound Extractor',
    instagram: 'Instagram Reels Downloader 1080p',
    facebook: 'Facebook Video Downloader',
    mp3: 'Video to MP3 Converter',
    guides: '📖 How-To Guides',
    blog: '📚 Blog & Tutorials',
    widget: '⚡ Embed Widget on Your Site',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    dmca: 'DMCA Policy',
    about: 'About Us',
    contact: 'Contact Us',
    disclaimer: 'Disclaimer',
    cookie: 'Cookie Policy',
    disclaimerLabel: 'Disclaimer:',
    disclaimerBody: 'SnapLoad is intended for downloading content you have rights to access. Downloading copyrighted material without permission may violate the terms of service of respective platforms. We do not store any videos on our servers — all files are streamed directly to your device.',
    noStorage: 'No videos stored on server • Direct streaming',
  },
};

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenWidget, onNavigate, currentLanguage = 'en' }) => {
  const ft = FOOTER_TRANSLATIONS[currentLanguage] || FOOTER_TRANSLATIONS.en;
  const handleLegalClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new Event('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="w-full mt-16 pb-8 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4">
        {/* Internal Keyword Links Section for SEO Indexation & Search Engine Crawling */}
        <div className="glass-subtle rounded-2xl p-5 mb-6 border border-slate-200/80 dark:border-white/10 shadow-sm">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-center dark:text-white/50 text-slate-500 mb-3.5">
            {ft.heading}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-bold text-center">
            <a
              href="/tiktok-downloader"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
              title={ft.tiktok}
            >
              {ft.tiktok}
            </a>
            <span className="dark:text-white/20 text-slate-300">•</span>
            <a
              href="/tiktok-mp3-downloader"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
              title={ft.tiktokMp3}
            >
              {ft.tiktokMp3}
            </a>
            <span className="dark:text-white/20 text-slate-300">•</span>
            <a
              href="/instagram-downloader"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
              title={ft.instagram}
            >
              {ft.instagram}
            </a>
            <span className="dark:text-white/20 text-slate-300">•</span>
            <a
              href="/facebook-downloader"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
              title={ft.facebook}
            >
              {ft.facebook}
            </a>

            <span className="dark:text-white/20 text-slate-300">•</span>
            <a
              href="/mp3-downloader"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
              title={ft.mp3}
            >
              {ft.mp3}
            </a>
            <span className="dark:text-white/20 text-slate-300">•</span>
            <a
              href="/guides"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
              title={ft.guides}
            >
              {ft.guides}
            </a>
            <span className="dark:text-white/20 text-slate-300">•</span>
            <a
              href="/blog"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
              title={ft.blog}
            >
              {ft.blog}
            </a>
            <span className="dark:text-white/20 text-slate-300">•</span>
            {onOpenWidget ? (
              <button
                onClick={onOpenWidget}
                className="text-amber-500 dark:text-amber-400 hover:underline underline-offset-2 transition-all cursor-pointer font-extrabold"
              >
                {ft.widget}
              </button>
            ) : (
              <a
                href="/widget"
                className="text-amber-500 dark:text-amber-400 hover:underline underline-offset-2 transition-all font-extrabold"
              >
                {ft.widget}
              </a>
            )}
          </div>

          {/* High Intent SEO Keyword Tag Cloud */}
          <div className="mt-4 pt-3.5 border-t border-slate-200/60 dark:border-white/10 flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-semibold dark:text-white/40 text-slate-500">
            {[
              'TikTok Downloader',
              'TikTok Video Downloader',
              'Baixar Video TikTok',
              'Facebook Video Downloader',
              'FB Reels Downloader',
              'TikTok Download',
              'Descargar Videos de TikTok',
              'Baixar Video do TikTok',
              'Descargar Video TikTok',
              'TikTok Video Download',
              'Facebook Downloader HD',
              'TikTok Downloader Without Watermark',
              'Baixar Musica do TikTok',
              'Descargar TikTok Sin Marca de Agua',
              'TikTok MP3 Downloader',
              'TikTok Photo Downloader',
              'SaveFrom TikTok',
              'SSSTik TikTok',
              'SnapTik TikTok Downloader',
              'TikTok Saver',
              'Save Video TikTok',
            ].map((kw) => (
              <span key={kw} className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 font-extrabold text-primary-600 dark:text-primary-300">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Legal & Policy Navigation Links for Google AdSense Compliance */}
        <div className="glass-subtle rounded-xl p-4 mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium dark:text-white/70 text-dark-600">
          <a
            href="/privacy-policy"
            onClick={(e) => handleLegalClick(e, '/privacy-policy')}
            className="hover:text-primary-400 transition-colors underline underline-offset-4 cursor-pointer"
          >
            {ft.privacy}
          </a>
          <span className="text-white/20">•</span>
          <a
            href="/terms-of-service"
            onClick={(e) => handleLegalClick(e, '/terms-of-service')}
            className="hover:text-primary-400 transition-colors underline underline-offset-4 cursor-pointer"
          >
            {ft.terms}
          </a>
          <span className="text-white/20">•</span>
          <a
            href="/dmca-policy"
            onClick={(e) => handleLegalClick(e, '/dmca-policy')}
            className="hover:text-primary-400 transition-colors underline underline-offset-4 cursor-pointer"
          >
            {ft.dmca}
          </a>
          <span className="text-white/20">•</span>
          <a
            href="/about-us"
            onClick={(e) => handleLegalClick(e, '/about-us')}
            className="hover:text-primary-400 transition-colors underline underline-offset-4 cursor-pointer"
          >
            {ft.about}
          </a>
          <span className="text-white/20">•</span>
          <a
            href="/contact"
            onClick={(e) => handleLegalClick(e, '/contact')}
            className="hover:text-primary-400 transition-colors underline underline-offset-4 cursor-pointer"
          >
            {ft.contact}
          </a>
          <span className="text-white/20">•</span>
          <a
            href="/disclaimer"
            onClick={(e) => handleLegalClick(e, '/disclaimer')}
            className="hover:text-primary-400 transition-colors underline underline-offset-4 cursor-pointer"
          >
            {ft.disclaimer}
          </a>
          <span className="text-white/20">•</span>
          <a
            href="/cookie-policy"
            onClick={(e) => handleLegalClick(e, '/cookie-policy')}
            className="hover:text-primary-400 transition-colors underline underline-offset-4 cursor-pointer"
          >
            {ft.cookie}
          </a>
        </div>

        {/* Disclaimer Note */}
        <div className="glass-subtle rounded-xl p-4 mb-6 border border-slate-200/80 dark:border-white/10 shadow-xs">
          <p className="text-xs dark:text-slate-300 text-slate-800 text-center leading-relaxed font-medium">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="inline-block text-amber-500 mr-1.5 align-text-bottom">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <strong className="text-slate-900 dark:text-white font-extrabold">{ft.disclaimerLabel}</strong> {ft.disclaimerBody}
          </p>
        </div>

        {/* Footer links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#7026b9] via-[#d92662] to-[#f97316] flex items-center justify-center shadow-xs border border-white/20">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>
                <polyline points="7 11 12 16 17 11"/>
                <line x1="12" y1="4" x2="12" y2="16"/>
              </svg>
            </div>
            <span className="text-xs font-extrabold dark:text-slate-300 text-slate-800">
              SnapLoad © 2026
            </span>
          </div>

          <div className="flex items-center gap-6">
            {['TikTok', 'Instagram', 'Facebook'].map((platform) => (
              <span key={platform} className="text-[11px] font-extrabold uppercase tracking-wider dark:text-slate-400 text-slate-600">
                {platform}
              </span>
            ))}
          </div>

          <p className="text-[11px] font-bold dark:text-slate-400 text-slate-600">
            {ft.noStorage}
          </p>

        </div>
      </div>
    </footer>
  );
};
