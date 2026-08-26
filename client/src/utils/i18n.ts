export type Language =
  | 'en' | 'pt' | 'es' | 'de' | 'fr' | 'id' | 'tr' | 'ru' | 'ar' | 'hi'
  | 'vi' | 'th' | 'it' | 'ja' | 'ko' | 'pl' | 'nl' | 'sv' | 'fi' | 'ro'
  | 'hu' | 'cs' | 'el' | 'he' | 'uk' | 'ms' | 'fil' | 'bg' | 'da' | 'sk'
  | 'hr' | 'sr' | 'sl' | 'lt' | 'lv' | 'et' | 'sq' | 'mk' | 'bs' | 'is'
  | 'no' | 'bn' | 'ta' | 'te' | 'mr' | 'ur' | 'fa' | 'sw' | 'kk' | 'uz';

export type PlatformKey = 'all' | 'tiktok' | 'instagram' | 'mp3' | 'tiktok-mp3' | 'youtube-shorts' | 'widget';

export interface HeroTranslation {
  heading: string;
  highlight: string;
  sub: string;
}

export interface TranslationSchema {
  nav: Record<PlatformKey, string>;
  hero: Record<PlatformKey, HeroTranslation>;
  input: {
    placeholder: string;
    paste: string;
    fetch: string;
    fetching: string;
    trySample: string;
  };
  features: {
    speedTitle: string;
    speedDesc: string;
    privacyTitle: string;
    privacyDesc: string;
    qualityTitle: string;
    qualityDesc: string;
  };
  faqTitle: string;
}

export const LANGUAGE_LABELS: Record<Language, { label: string; flag: string; code: string }> = {
  en: { label: 'English', flag: '🇺🇸', code: 'EN' },
  pt: { label: 'Português', flag: '🇧🇷', code: 'PT' },
  es: { label: 'Español', flag: '🇪🇸', code: 'ES' },
  de: { label: 'Deutsch', flag: '🇩🇪', code: 'DE' },
  fr: { label: 'Français', flag: '🇫🇷', code: 'FR' },
  id: { label: 'Bahasa Indonesia', flag: '🇮🇩', code: 'ID' },
  tr: { label: 'Türkçe', flag: '🇹🇷', code: 'TR' },
  ru: { label: 'Русский', flag: '🇷🇺', code: 'RU' },
  ar: { label: 'العربية', flag: '🇸🇦', code: 'AR' },
  hi: { label: 'हिन्दी', flag: '🇮🇳', code: 'HI' },
  vi: { label: 'Tiếng Việt', flag: '🇻🇳', code: 'VI' },
  th: { label: 'ไทย', flag: '🇹🇭', code: 'TH' },
  it: { label: 'Italiano', flag: '🇮🇹', code: 'IT' },
  ja: { label: '日本語', flag: '🇯🇵', code: 'JA' },
  ko: { label: '한국어', flag: '🇰🇷', code: 'KO' },
  pl: { label: 'Polski', flag: '🇵🇱', code: 'PL' },
  nl: { label: 'Nederlands', flag: '🇳🇱', code: 'NL' },
  sv: { label: 'Svenska', flag: '🇸🇪', code: 'SV' },
  fi: { label: 'Suomi', flag: '🇫🇮', code: 'FI' },
  ro: { label: 'Română', flag: '🇷🇴', code: 'RO' },
  hu: { label: 'Magyar', flag: '🇭🇺', code: 'HU' },
  cs: { label: 'Čeština', flag: '🇨🇿', code: 'CS' },
  el: { label: 'Ελληνικά', flag: '🇬🇷', code: 'EL' },
  he: { label: 'עברית', flag: '🇮🇱', code: 'HE' },
  uk: { label: 'Українська', flag: '🇺🇦', code: 'UK' },
  ms: { label: 'Bahasa Melayu', flag: '🇲🇾', code: 'MS' },
  fil: { label: 'Filipino', flag: '🇵🇭', code: 'FIL' },
  bg: { label: 'Български', flag: '🇧🇬', code: 'BG' },
  da: { label: 'Dansk', flag: '🇩🇰', code: 'DA' },
  sk: { label: 'Slovenčina', flag: '🇸🇰', code: 'SK' },
  hr: { label: 'Hrvatski', flag: '🇭🇷', code: 'HR' },
  sr: { label: 'Српски', flag: '🇷🇸', code: 'SR' },
  sl: { label: 'Slovenščina', flag: '🇸🇮', code: 'SL' },
  lt: { label: 'Lietuvių', flag: '🇱🇹', code: 'LT' },
  lv: { label: 'Latviešu', flag: '🇱🇻', code: 'LV' },
  et: { label: 'Eesti', flag: '🇪🇪', code: 'ET' },
  sq: { label: 'Shqip', flag: '🇦🇱', code: 'SQ' },
  mk: { label: 'Македонски', flag: '🇲🇰', code: 'MK' },
  bs: { label: 'Bosanski', flag: '🇧🇦', code: 'BS' },
  is: { label: 'Íslenska', flag: '🇮🇸', code: 'IS' },
  no: { label: 'Norsk', flag: '🇳🇴', code: 'NO' },
  bn: { label: 'বাংলা', flag: '🇧🇩', code: 'BN' },
  ta: { label: 'தமிழ்', flag: '🇮🇳', code: 'TA' },
  te: { label: 'తెలుగు', flag: '🇮🇳', code: 'TE' },
  mr: { label: 'मराठी', flag: '🇮🇳', code: 'MR' },
  ur: { label: 'اردو', flag: '🇵🇰', code: 'UR' },
  fa: { label: 'فارسی', flag: '🇮🇷', code: 'FA' },
  sw: { label: 'Kiswahili', flag: '🇰🇪', code: 'SW' },
  kk: { label: 'Қазақша', flag: '🇰🇿', code: 'KK' },
  uz: { label: 'Oʻzbekcha', flag: '🇺🇿', code: 'UZ' },
};

const BASE_EN_TRANSLATION: TranslationSchema = {
  nav: {
    all: 'All Platforms',
    tiktok: 'TikTok No Watermark',
    'tiktok-mp3': 'TikTok MP3',
    instagram: 'Instagram Reels',
    'youtube-shorts': 'YouTube Shorts',
    mp3: 'MP3 Converter',
    widget: 'Embed Widget',
  },
  hero: {
    all: {
      heading: 'TikTok Downloader &',
      highlight: 'TikTok Video Downloader HD',
      sub: 'SnapLoad is the ultimate free TikTok video downloader to save watermark-free TikTok videos, HD Instagram Reels, and 320kbps MP3 sound tracks. Fast online tiktok download without account registration.',
    },
    tiktok: {
      heading: 'TikTok Downloader',
      highlight: 'Without Watermark',
      sub: 'Paste your TikTok link below for instant TikTok video download without watermark in 1080p Full HD.',
    },
    'tiktok-mp3': {
      heading: 'TikTok Sound to MP3',
      highlight: 'Audio Converter',
      sub: 'Extract high-bitrate MP3 audio tracks directly from viral TikTok video links in seconds.',
    },
    instagram: {
      heading: 'Instagram Reels & Video',
      highlight: 'Downloader HD',
      sub: 'Save high-definition Instagram Reels, clips, and video posts directly to your phone or computer.',
    },
    'youtube-shorts': {
      heading: 'YouTube Shorts',
      highlight: 'Downloader HD & MP3',
      sub: 'Download YouTube Shorts clips in full 1080p HD resolution or convert to MP3 audio files.',
    },
    mp3: {
      heading: 'Video to MP3',
      highlight: 'Audio Converter',
      sub: 'Extract high-bitrate MP3 audio tracks directly from TikTok or Instagram video links.',
    },
    widget: {
      heading: 'Embed Video Downloader',
      highlight: 'Widget on Your Site',
      sub: 'Give your website visitors the power to download videos with our free embeddable widget.',
    },
  },
  input: {
    placeholder: 'Paste TikTok or Instagram video link here...',
    paste: 'Paste',
    fetch: 'Fetch',
    fetching: 'Fetching...',
    trySample: 'Try Sample:',
  },
  features: {
    speedTitle: 'Lightning Fast',
    speedDesc: 'Direct streaming — no waiting for server processing',
    privacyTitle: 'Secure & Private',
    privacyDesc: 'No files stored on servers. Direct browser streaming',
    qualityTitle: 'Up to 4K Quality',
    qualityDesc: 'Download in highest available 1080p HD or 4K quality',
  },
  faqTitle: 'Frequently Asked Questions',
};

// Key localized overrides for high volume languages
const CUSTOM_TRANSLATIONS: Partial<Record<Language, Partial<TranslationSchema>>> = {
  pt: {
    nav: { all: 'Todas as Plataformas', tiktok: 'Baixar Video TikTok', 'tiktok-mp3': 'TikTok MP3', instagram: 'Instagram Reels', 'youtube-shorts': 'YouTube Shorts', mp3: 'Conversor MP3', widget: 'Widget Embed' },
    hero: {
      all: { heading: 'Baixar Vídeo TikTok', highlight: 'Sem Marca d\'Água HD', sub: 'SnapLoad é a ferramenta online gratuita para baixar vídeo do TikTok sem marca d\'água, salvar Reels do Instagram em Full HD 1080p e converter vídeos para áudio MP3 de 320kbps.' },
      tiktok: { heading: 'Baixar Video TikTok', highlight: 'Sem Marca d\'Água', sub: 'Cole o link do seu vídeo do TikTok abaixo para baixar vídeos do TikTok em alta definição sem marca d\'água e grátis.' },
      'tiktok-mp3': { heading: 'Baixar Música do TikTok', highlight: 'Converter Áudio MP3', sub: 'Extraia e baixe áudios e músicas do TikTok em qualidade MP3 de 320kbps diretamente para o seu celular ou PC.' },
      instagram: { heading: 'Baixar Reels do Instagram', highlight: 'Downloader HD', sub: 'Baixe vídeos, Reels, fotos e histórias do Instagram em alta resolução sem perda de qualidade.' },
      'youtube-shorts': { heading: 'Baixar YouTube Shorts', highlight: 'Downloader HD e MP3', sub: 'Baixe vídeos do YouTube Shorts em formato MP4 1080p HD ou converta para MP3 gratuitamente.' },
      mp3: { heading: 'Conversor de Vídeo para MP3', highlight: 'Extrair Áudio HD', sub: 'Converta links de vídeos do TikTok e Instagram em áudio MP3 de alta fidelidade em segundos.' },
      widget: { heading: 'Widget de Download', highlight: 'Incorpore no seu Site', sub: 'Ofereça aos visitantes do seu site um baixador de vídeos do TikTok rápido e gratuito.' },
    },
    input: { placeholder: 'Cole o link do vídeo do TikTok ou Instagram aqui...', paste: 'Colar', fetch: 'Baixar', fetching: 'Carregando...', trySample: 'Testar Exemplo:' },
  },
  es: {
    nav: { all: 'Todas las Plataformas', tiktok: 'TikTok Sin Marca de Agua', 'tiktok-mp3': 'TikTok MP3', instagram: 'Instagram Reels', 'youtube-shorts': 'YouTube Shorts', mp3: 'Convertidor MP3', widget: 'Embed Widget' },
    hero: {
      all: { heading: 'Descargar Videos de TikTok', highlight: 'Sin Marca de Agua HD', sub: 'Descargar videos de tiktok gratis sin marca de agua y guardar Reels de Instagram en Full HD 1080p. Descargador de tiktok rápido y convertidor MP3 de 320kbps.' },
      tiktok: { heading: 'Descargar Video TikTok', highlight: 'Sin Marca de Agua', sub: 'Pega tu enlace de video de TikTok a continuación para descargar videos de TikTok limpios sin marca de agua.' },
      'tiktok-mp3': { heading: 'Audio de TikTok a MP3', highlight: 'Convertidor de Audio', sub: 'Extrae y descarga música y audios de TikTok en MP3 de 320kbps gratis.' },
      instagram: { heading: 'Instagram Reels y Video', highlight: 'Descargador HD', sub: 'Guarda Reels, clips y publicaciones de video de Instagram en alta definición directamente en tu teléfono o computadora.' },
      'youtube-shorts': { heading: 'YouTube Shorts', highlight: 'Descargador HD y MP3', sub: 'Descarga clips de YouTube Shorts en HD 1080p o conviértelos a audio MP3.' },
      mp3: { heading: 'Video a MP3', highlight: 'Convertidor de Audio', sub: 'Extrae pistas de audio MP3 de alta calidad directamente desde enlaces de video de TikTok o Instagram.' },
      widget: { heading: 'Incrustar Widget', highlight: 'En Tu Sitio Web', sub: 'Ofrece a los visitantes de tu sitio web un descargador de video gratuito.' },
    },
    input: { placeholder: 'Pega un enlace de video de TikTok o Instagram...', paste: 'Pegar', fetch: 'Obtener', fetching: 'Cargando...', trySample: 'Probar ejemplo:' },
  },
  de: {
    hero: {
      all: { heading: 'TikTok Video Downloader &', highlight: 'Videos Herunterladen', sub: 'TikTok Video Downloader ohne Wasserzeichen und Instagram Reels Downloader in 1080p HD.' },
      tiktok: { heading: 'TikTok Downloader', highlight: 'Ohne Wasserzeichen', sub: 'Fügen Sie Ihren TikTok-Videolink unten ein, um saubere, wasserzeichenfreie HD-Videos zu speichern.' },
      'tiktok-mp3': { heading: 'TikTok Sound zu MP3', highlight: 'Audio Konverter', sub: 'Extrahierten Sie erstklassige MP3-Audiospuren direkt aus TikTok-Videolinks.' },
      instagram: { heading: 'Instagram Reels & Video', highlight: 'Downloader HD', sub: 'Speichern Sie hochauflösende Instagram Reels direkt auf Ihrem Gerät.' },
      'youtube-shorts': { heading: 'YouTube Shorts', highlight: 'Downloader HD & MP3', sub: 'Laden Sie YouTube Shorts Clips in HD herunter oder konvertieren Sie sie in MP3.' },
      mp3: { heading: 'Video zu MP3', highlight: 'Audio Konverter', sub: 'Extrahierten Sie erstklassige MP3-Audiospuren.' },
      widget: { heading: 'Embed Downloader', highlight: 'Widget auf Ihrer Website', sub: 'Kostenloser Downloader für Ihre Website.' },
    },
    input: { placeholder: 'Videolink von TikTok oder Instagram einfügen...', paste: 'Einfügen', fetch: 'Holen', fetching: 'Lädt...', trySample: 'Beispiel testen:' },
  },
  fr: {
    hero: {
      all: { heading: 'Télécharger Vidéo TikTok &', highlight: 'Instagram Reels HD', sub: 'Le meilleur téléchargeur vidéo TikTok sans filigrane et convertisseur MP3 gratuit.' },
      tiktok: { heading: 'Téléchargeur TikTok', highlight: 'Sans Filigrane', sub: 'Collez votre lien vidéo TikTok ci-dessous pour enregistrer des vidéos HD propres.' },
      'tiktok-mp3': { heading: 'Son TikTok en MP3', highlight: 'Convertisseur Audio', sub: 'Extrayez des pistes audio MP3 haute qualité à partir de liens TikTok.' },
      instagram: { heading: 'Instagram Reels & Vidéo', highlight: 'Téléchargeur HD', sub: 'Enregistrez des Reels Instagram en haute définition.' },
      'youtube-shorts': { heading: 'YouTube Shorts', highlight: 'Téléchargeur HD & MP3', sub: 'Téléchargez des clips YouTube Shorts en HD 1080p.' },
      mp3: { heading: 'Vidéo en MP3', highlight: 'Convertisseur Audio', sub: 'Extrayez des pistes audio MP3.' },
      widget: { heading: 'Intégrer le Widget', highlight: 'Sur Votre Site Web', sub: 'Offrez un outil de téléchargement vidéo gratuit.' },
    },
    input: { placeholder: 'Collez un lien vidéo de TikTok ou Instagram...', paste: 'Coller', fetch: 'Obtenir', fetching: 'Chargement...', trySample: 'Essayer un exemple:' },
  },
  id: {
    hero: {
      all: { heading: 'Unduh Video TikTok &', highlight: 'Instagram Reels HD', sub: 'Unduh video TikTok tanpa watermark dan Instagram Reels HD gratis 1080p.' },
      tiktok: { heading: 'Pengunduh TikTok', highlight: 'Tanpa Watermark', sub: 'Tempel tautan video TikTok di bawah untuk mengunduh video HD tanpa watermark.' },
      'tiktok-mp3': { heading: 'Musik TikTok ke MP3', highlight: 'Konverter Audio', sub: 'Ekstrak lagu dan suara MP3 dari TikTok dengan cepat.' },
      instagram: { heading: 'Pengunduh Reels Instagram', highlight: 'Kualitas HD', sub: 'Simpan Reels dan video Instagram dalam resolusi tinggi.' },
      'youtube-shorts': { heading: 'Pengunduh YouTube Shorts', highlight: 'MP4 & MP3', sub: 'Unduh klip YouTube Shorts 1080p MP4 atau konversi ke MP3.' },
      mp3: { heading: 'Konverter Video ke MP3', highlight: 'Ekstrak Audio HD', sub: 'Ubah link video TikTok dan Instagram menjadi MP3 320kbps.' },
      widget: { heading: 'Widget Pengunduh Video', highlight: 'Pasang di Situs Anda', sub: 'Berikan pengunjung situs Anda fitur unduh video gratis.' },
    },
    input: { placeholder: 'Tempel link video TikTok atau Instagram di sini...', paste: 'Tempel', fetch: 'Unduh', fetching: 'Memproses...', trySample: 'Coba Contoh:' },
  },
  tr: {
    hero: {
      all: { heading: 'TikTok Video İndirici &', highlight: 'Instagram Reels HD', sub: 'Filigramsız TikTok videoları ve HD Instagram Reels videolarını ücretsiz indirin.' },
      tiktok: { heading: 'TikTok İndirici', highlight: 'Filigramsız HD', sub: 'Filigramsız TikTok videolarını Full HD kalitesinde cihazınıza kaydedin.' },
      'tiktok-mp3': { heading: 'TikTok Müzik İndirme', highlight: 'MP3 Dönüştürücü', sub: 'TikTok videolarındaki sesleri 320kbps MP3 olarak indirin.' },
      instagram: { heading: 'Instagram Reels İndir', highlight: '1080p HD', sub: 'Instagram Reels ve videolarını yüksek kalitede kaydedin.' },
      'youtube-shorts': { heading: 'YouTube Shorts İndir', highlight: 'HD & MP3', sub: 'YouTube Shorts videolarını MP4 veya MP3 olarak indirin.' },
      mp3: { heading: 'Videoyu MP3 Yapma', highlight: 'Ses Çıkarıcı', sub: 'TikTok ve Instagram video bağlantılarını yüksek kaliteli MP3 yapın.' },
      widget: { heading: 'Video İndirme Widget\'ı', highlight: 'Sitenize Ekleyin', sub: 'Web sitenizin ziyaretçilerine ücretsiz video indirme aracı sunun.' },
    },
    input: { placeholder: 'TikTok veya Instagram video bağlantısını yapıştırın...', paste: 'Yapıştır', fetch: 'İndir', fetching: 'Yükleniyor...', trySample: 'Örnek Dene:' },
  },
  ru: {
    hero: {
      all: { heading: 'Скачать Видео с Тиктока &', highlight: 'Instagram Reels HD', sub: 'Сервис для скачивания видео с TikTok без водяного знака и Instagram Reels в 1080p HD.' },
      tiktok: { heading: 'Скачать Видео TikTok', highlight: 'Без Водяного Знака', sub: 'Вставьте ссылку на TikTok видео, чтобы сохранить файл без логотипа.' },
      'tiktok-mp3': { heading: 'Скачать Музыку из TikTok', highlight: 'Конвертер в MP3', sub: 'Извлекайте аудио и песни из TikTok в формате MP3 320kbps.' },
      instagram: { heading: 'Скачать Reels Instagram', highlight: 'в HD Качестве', sub: 'Сохраняйте Reels и видео из Instagram в оригинальном разрешении.' },
      'youtube-shorts': { heading: 'Скачать YouTube Shorts', highlight: 'MP4 & MP3', sub: 'Скачивайте ролик Shorts в 1080p MP4 или конвертируйте в MP3.' },
      mp3: { heading: 'Конвертер Видео в MP3', highlight: 'Извлечение Звука', sub: 'Конвертируйте ссылки TikTok и Instagram в высококачественный MP3.' },
      widget: { heading: 'Виджет Скачивания Видео', highlight: 'Встроить на Сайт', sub: 'Предоставьте пользователям вашего сайта бесплатный инструмент.' },
    },
    input: { placeholder: 'Вставьте ссылку на видео TikTok или Instagram...', paste: 'Вставить', fetch: 'Скачать', fetching: 'Загрузка...', trySample: 'Пример:' },
  },
  ar: {
    hero: {
      all: { heading: 'تحميل فيديو تيك توك &', highlight: 'إنستغرام ريلز HD', sub: 'أفضل أداة مجانية لتحميل فيديوهات تيك توك بدون علامة مائية وبأعلى جودة.' },
      tiktok: { heading: 'تحميل تيك توك', highlight: 'بدون علامة مائية', sub: 'أدخل رابط فيديو تيك توك لتحميله بدون حقوق وبجودة HD عالية.' },
      'tiktok-mp3': { heading: 'تحميل صوت تيك توك', highlight: 'محول MP3', sub: 'استخرج الأصوات والموسيقى من تيك توك بصيغة MP3 عالية الجودة.' },
      instagram: { heading: 'تحميل إنستغرام ريلز', highlight: 'بجودة عالية HD', sub: 'احفظ فيديوهات وريلز إنستغرام مباشرة على هاتفك أو حاسوبك.' },
      'youtube-shorts': { heading: 'تحميل شورتس يوتيوب', highlight: 'HD و MP3', sub: 'حمل مقاطع شورتس يوتيوب بصيغة MP4 أو حولها إلى MP3.' },
      mp3: { heading: 'تحويل الفيديو إلى MP3', highlight: 'استخراج الصوت', sub: 'حول روابط فيديوهات تيك توك وإنستغرام إلى ملفات صوتية 320kbps.' },
      widget: { heading: 'ودجة تحميل الفيديو', highlight: 'أضفها لموقعك', sub: 'امنح زوار موقعك إمكانية تحميل الفيديوهات مجاناً.' },
    },
    input: { placeholder: 'أدخل رابط فيديو تيك توك أو إنستغرام هنا...', paste: 'لصق', fetch: 'تحميل', fetching: 'جاري التحميل...', trySample: 'تجربة مثال:' },
  },
  hi: {
    hero: {
      all: { heading: 'टिकटक वीडियो डाउनलोड &', highlight: 'इंस्टाग्राम रील्स HD', sub: 'बिना वॉटरमार्क टिकटक वीडियो और इंस्टाग्राम रील्स HD 1080p में मुफ़्त डाउनलोड करें।' },
      tiktok: { heading: 'टिकटक डाउनलोडर', highlight: 'बिना वॉटरमार्क', sub: 'बिना लोगो टिकटक वीडियो डाउनलोड करने के लिए नीचे लिंक पेस्ट करें।' },
      'tiktok-mp3': { heading: 'टिकटक साउंड MP3', highlight: 'ऑडियो कनवर्टर', sub: 'टिकटक वीडियो से 320kbps MP3 ऑडियो तुरंत निकालें।' },
      instagram: { heading: 'इंस्टाग्राम रील्स डाउनलोड', highlight: 'HD 1080p', sub: 'इंस्टाग्राम रील्स और वीडियो अपने फ़ोन या कंप्यूटर में सेव करें।' },
      'youtube-shorts': { heading: 'यूट्यूब शॉर्ट्स डाउनलोडर', highlight: 'HD & MP3', sub: 'यूट्यूब शॉर्ट्स 1080p MP4 या MP3 ऑडियो में डाउनलोड करें।' },
      mp3: { heading: 'वीडियो से MP3 कनवर्टर', highlight: 'ऑडियो निष्कर्षण', sub: 'टिकटक और इंस्टाग्राम वीडियो लिंक को MP3 में बदलें।' },
      widget: { heading: 'वीडियो डाउनलोडर विजेट', highlight: 'साइट में जोड़ें', sub: 'अपनी वेबसाइट के विज़िटर्स को मुफ़्त डाउनलोड सुविधा दें।' },
    },
    input: { placeholder: 'टिकटक या इंस्टाग्राम वीडियो लिंक यहाँ पेस्ट करें...', paste: 'पेस्ट', fetch: 'डाउनलोड', fetching: 'लोड हो रहा है...', trySample: 'सैंपल देखें:' },
  },
  ja: {
    hero: {
      all: { heading: 'TikTok動画保存 &', highlight: 'Instagramリール HD', sub: 'TikTokのロゴなし動画やInstagramリールを1080p HDで無料ダウンロード。' },
      tiktok: { heading: 'TikTok動画保存', highlight: 'ロゴなし・無 watermark', sub: 'TikTokのURLを貼り付けて、高画質でロゴのない動画を保存できます。' },
      'tiktok-mp3': { heading: 'TikTok音源 MP3抽出', highlight: '音声変換', sub: 'TikTok動画から高音質な320kbps MP3音源を抽出して保存。' },
      instagram: { heading: 'Instagramリール保存', highlight: '1080p HD', sub: 'Instagramのリールや動画を元の画質のまま保存できます。' },
      'youtube-shorts': { heading: 'YouTube Shorts保存', highlight: 'MP4 & MP3', sub: 'YouTube Shorts動画を1080p MP4またはMP3で保存。' },
      mp3: { heading: '動画 MP3 変換', highlight: '音声抽出', sub: 'TikTokやInstagramの動画リンクから音声のみを抽出。' },
      widget: { heading: '動画保存ウィジェット', highlight: 'サイトに埋め込み', sub: 'あなたのウェブサイトに無料の動画保存ツールを追加。' },
    },
    input: { placeholder: 'TikTokまたはInstagramのリンクを貼り付け...', paste: '貼り付け', fetch: 'ダウンロード', fetching: '取得中...', trySample: 'サンプルを試す:' },
  },
};

// Build complete TRANSLATIONS dictionary for all 50 languages with fallback to BASE_EN_TRANSLATION
export const TRANSLATIONS: Record<Language, TranslationSchema> = (Object.keys(LANGUAGE_LABELS) as Language[]).reduce(
  (acc, langKey) => {
    const custom = CUSTOM_TRANSLATIONS[langKey];
    if (!custom) {
      acc[langKey] = BASE_EN_TRANSLATION;
    } else {
      acc[langKey] = {
        nav: { ...BASE_EN_TRANSLATION.nav, ...(custom.nav || {}) },
        hero: {
          all: { ...BASE_EN_TRANSLATION.hero.all, ...(custom.hero?.all || {}) },
          tiktok: { ...BASE_EN_TRANSLATION.hero.tiktok, ...(custom.hero?.tiktok || {}) },
          'tiktok-mp3': { ...BASE_EN_TRANSLATION.hero['tiktok-mp3'], ...(custom.hero?.['tiktok-mp3'] || {}) },
          instagram: { ...BASE_EN_TRANSLATION.hero.instagram, ...(custom.hero?.instagram || {}) },
          'youtube-shorts': { ...BASE_EN_TRANSLATION.hero['youtube-shorts'], ...(custom.hero?.['youtube-shorts'] || {}) },
          mp3: { ...BASE_EN_TRANSLATION.hero.mp3, ...(custom.hero?.mp3 || {}) },
          widget: { ...BASE_EN_TRANSLATION.hero.widget, ...(custom.hero?.widget || {}) },
        },
        input: { ...BASE_EN_TRANSLATION.input, ...(custom.input || {}) },
        features: { ...BASE_EN_TRANSLATION.features, ...(custom.features || {}) },
        faqTitle: custom.faqTitle || BASE_EN_TRANSLATION.faqTitle,
      };
    }
    return acc;
  },
  {} as Record<Language, TranslationSchema>
);
