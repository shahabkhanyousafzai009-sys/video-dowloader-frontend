export interface LocalizedRouteMeta {
  title: string;
  desc: string;
}

export interface LanguageMetaSet {
  home: LocalizedRouteMeta;
  tiktok: LocalizedRouteMeta;
  instagram: LocalizedRouteMeta;
  facebook: LocalizedRouteMeta;
  mp3: LocalizedRouteMeta;
}

export const LOCALIZED_TITLES: Record<string, LanguageMetaSet> = {
  pt: {
    home: {
      title: 'SnapLoad Brasil — Baixar Vídeos do TikTok, Reels e Facebook HD',
      desc: 'Ferramenta online grátis para baixar vídeo do TikTok sem marca d\'água em alta definição HD 1080p, salvar Reels do Instagram e converter MP3.',
    },
    tiktok: {
      title: 'Baixar Vídeos do TikTok Sem Marca d\'Água Grátis MP4 | SnapLoad PT',
      desc: 'Baixar vídeos do TikTok sem marca d\'água online e grátis. Salve vídeos do TikTok em Full HD MP4 e converta para áudio MP3 rapidamente.',
    },
    instagram: {
      title: 'Baixar Reels do Instagram 1080p HD Grátis | SnapLoad PT',
      desc: 'Baixe Reels, vídeos e fotos do Instagram em resolução original HD. Downloader online gratuito para celular e computador.',
    },
    facebook: {
      title: 'Baixar Vídeos do Facebook HD 1080p Grátis | SnapLoad PT',
      desc: 'Baixe vídeos e Reels do Facebook em alta definição 1080p MP4 ou converta em áudio MP3 rapidamente sem cadastro.',
    },
    mp3: {
      title: 'Conversor de Vídeo para MP3 Online 320kbps | SnapLoad PT',
      desc: 'Extraia e baixe músicas do TikTok e Instagram em formato MP3 de 320kbps com alta qualidade de áudio.',
    },
  },
  es: {
    home: {
      title: 'SnapLoad Español — Descargador de Videos TikTok, Reels y Facebook HD',
      desc: 'Descargar videos de TikTok sin marca de agua en 1080p HD gratis. Guarda Reels de Instagram, Facebook y convierte a audio MP3 sin registro.',
    },
    tiktok: {
      title: 'Descargar Videos de TikTok Sin Marca de Agua Gratis MP4 | SnapLoad ES',
      desc: 'Descargar videos de TikTok gratis sin marca de agua. Descargador de TikTok rápido online en full HD 1080p para móvil y PC.',
    },
    instagram: {
      title: 'Descargar Instagram Reels 1080p HD Gratis | SnapLoad ES',
      desc: 'Guarda Instagram Reels, videos e IGTV en alta definición original. Descargador gratis para móvil y computadora.',
    },
    facebook: {
      title: 'Descargar Videos de Facebook 1080p HD Gratis | SnapLoad ES',
      desc: 'Descarga videos y Reels de Facebook en Full HD 1080p MP4 o extrae audio MP3 de 320kbps gratis sin registros.',
    },
    mp3: {
      title: 'Convertidor de Video a MP3 Online 320kbps Gratis | SnapLoad ES',
      desc: 'Convierte enlaces de video de TikTok e Instagram en archivos de audio MP3 de 320kbps. Extractor gratis sin registro.',
    },
  },
  id: {
    home: {
      title: 'SnapLoad Indonesia — Download Video TikTok, Reels & FB HD Gratis',
      desc: 'Unduh video TikTok tanpa watermark resolusi Full HD 1080p gratis. Download Reels Instagram dan video Facebook serta convert audio MP3 320kbps.',
    },
    tiktok: {
      title: 'Download Video TikTok Tanpa Watermark HD 1080p Gratis | SnapLoad ID',
      desc: 'Download video TikTok tanpa watermark dan tanpa logo secara online dan gratis. Simpan video TikTok MP4 dan musik MP3 langsung di HP dan PC.',
    },
    instagram: {
      title: 'Download Reels Instagram HD 1080p Gratis | SnapLoad ID',
      desc: 'Download Reels, video, dan foto Instagram kualitas asli HD. Pengunduh online cepat tanpa aplikasi untuk Android, iPhone, dan laptop.',
    },
    facebook: {
      title: 'Download Video Facebook HD 1080p Gratis | SnapLoad ID',
      desc: 'Download video Facebook Watch, Reels, dan video publik kualitas 1080p Full HD MP4 atau ekstrak audio MP3 gratis tanpa registrasi.',
    },
    mp3: {
      title: 'Konverter Video ke MP3 Online 320kbps Gratis | SnapLoad ID',
      desc: 'Ekstrak dan unduh lagu dari link video TikTok dan Instagram menjadi format MP3 320kbps jernih tanpa batas.',
    },
  },
  ar: {
    home: {
      title: 'SnapLoad العربي — تحميل فيديو تيك توك، ريلز وفيسبوك بجودة HD',
      desc: 'أفضل موقع مجاني لتحميل فيديوهات تيك توك بدون علامة مائية بجودة Full HD 1080p، تنزيل ريلز انستغرام وفيديوهات فيسبوك واستخراج صوت MP3.',
    },
    tiktok: {
      title: 'تحميل فيديوهات تيك توك بدون علامة مائية 1080p HD | SnapLoad AR',
      desc: 'تنزيل وحفظ مقاطع تيك توك بدون حقوق أو شعار مجاناً وبأعلى جودة للموبايل والكمبيوتر دون برامج.',
    },
    instagram: {
      title: 'تحميل ريلز انستقرام وفيديوهات بجودة عالية HD | SnapLoad AR',
      desc: 'تنزيل مقاطع ريلز انستقرام وفيديوهات البوستات بجودة 1080p HD الأصلية مجاناً وسريع جداً.',
    },
    facebook: {
      title: 'تحميل فيديو من فيسبوك وريلز بجودة 1080p HD | SnapLoad AR',
      desc: 'حفظ وتحميل فيديوهات فيسبوك العامة ومقاطع الريلز بصيغة MP4 عالية الجودة أو تحويلها إلى MP3 مجاناً.',
    },
    mp3: {
      title: 'تحويل الفيديو إلى MP3 أونلاين مجاناً 320kbps | SnapLoad AR',
      desc: 'استخراج وتنزيل الصوت والموسيقى من فيديوهات تيك توك وانستغرام بصيغة MP3 نقية 320kbps مجاناً.',
    },
  },
  tr: {
    home: {
      title: 'SnapLoad Türkiye — TikTok, Instagram Reels ve Facebook Video İndirici',
      desc: 'TikTok videolarını filigransız 1080p Full HD kalitede ücretsiz indirin. Instagram Reels ve Facebook videolarını kaydedin, 320kbps MP3 ses dönüştürün.',
    },
    tiktok: {
      title: 'TikTok Video İndir Filigransız HD 1080p | SnapLoad TR',
      desc: 'Logosuz ve filigransız TikTok video indirme aracı. Hızlı, güvenli ve ücretsiz MP4 ve MP3 indirin.',
    },
    instagram: {
      title: 'Instagram Reels Video İndir 1080p HD | SnapLoad TR',
      desc: 'Instagram Reels, video ve gönderilerini orijinal yüksek çözünürlükte indirin. Mobil ve PC uyumlu.',
    },
    facebook: {
      title: 'Facebook Video İndir HD 1080p Ücretsiz | SnapLoad TR',
      desc: 'Facebook Reels ve Watch videolarını 1080p MP4 veya 320kbps MP3 formatında anında indirin.',
    },
    mp3: {
      title: 'Video MP3 Dönüştürücü Online 320kbps | SnapLoad TR',
      desc: 'TikTok ve Instagram videolarını 320kbps yüksek kaliteli MP3 ses dosyalarına ücretsiz dönüştürün.',
    },
  },
  ru: {
    home: {
      title: 'SnapLoad Россия — Скачать видео с Тик Ток, Reels и Facebook HD',
      desc: 'Бесплатный онлайн сервис для скачивания видео TikTok без водяного знака в 1080p HD, Reels из Instagram и Facebook видео, конвертация в MP3.',
    },
    tiktok: {
      title: 'Скачать видео Тик Ток без водяного знака бесплатно 1080p HD | SnapLoad RU',
      desc: 'Скачивайте видео из TikTok без логотипа и водяных знаков в оригинальном качестве Full HD на телефон или компьютер.',
    },
    instagram: {
      title: 'Скачать Рилс Инстаграм 1080p HD бесплатно | SnapLoad RU',
      desc: 'Скачивайте Instagram Reels, видео и фото в оригинальном высоком разрешении без потери качества.',
    },
    facebook: {
      title: 'Скачать видео с Фейсбука 1080p HD бесплатно | SnapLoad RU',
      desc: 'Сохраняйте Reels и видео Facebook в формате MP4 1080p или извлекайте аудио треки в MP3 320kbps.',
    },
    mp3: {
      title: 'Конвертер видео в MP3 онлайн 320kbps | SnapLoad RU',
      desc: 'Извлечение чистого звука из ссылок TikTok и Instagram в формате MP3 320kbps без регистрации.',
    },
  },
  de: {
    home: {
      title: 'SnapLoad Deutschland — Video Downloader für TikTok, Reels & Facebook',
      desc: 'Laden Sie TikTok-Videos ohne Wasserzeichen und Instagram Reels in 1080p HD oder 4K herunter. MP3-Audio extrahieren. Kostenlos & schnell.',
    },
    tiktok: {
      title: 'TikTok Video Downloader Ohne Wasserzeichen HD 1080p | SnapLoad DE',
      desc: 'Laden Sie TikTok-Videos ohne Wasserzeichen in voller HD 1080p-Qualität kostenlos herunter. Schneller Online-Downloader.',
    },
    instagram: {
      title: 'Instagram Reels Downloader 1080p HD Gratis | SnapLoad DE',
      desc: 'Speichern Sie Instagram Reels, Videos und IGTV-Clips in originaler HD-Auflösung. Kostenloser Downloader.',
    },
    facebook: {
      title: 'Facebook Video Downloader 1080p Full HD MP4 | SnapLoad DE',
      desc: 'Facebook Videos und Reels in bester Full HD 1080p Qualität oder als 320kbps MP3 Audio kostenlos herunterladen.',
    },
    mp3: {
      title: 'Video zu MP3 Konverter Online 320kbps Audio | SnapLoad DE',
      desc: 'Konvertieren Sie Videolinks von TikTok & Instagram in 320kbps MP3-Audiodateien. Kostenloser Audio-Extractor.',
    },
  },
  fr: {
    home: {
      title: 'SnapLoad France — Téléchargeur Vidéo TikTok, Reels Instagram & Facebook',
      desc: 'Téléchargez des vidéos TikTok sans filigrane et Reels Instagram en 1080p HD ou 4K. Extrayez des fichiers MP3. Gratuit et rapide.',
    },
    tiktok: {
      title: 'Télécharger Vidéo TikTok Sans Filigrane 1080p HD Gratuit | SnapLoad FR',
      desc: 'Téléchargez des vidéos TikTok sans filigrane en haute définition 1080p gratuitement. Enregistreur TikTok en ligne sans application.',
    },
    instagram: {
      title: 'Télécharger Instagram Reels 1080p HD Gratuit | SnapLoad FR',
      desc: 'Enregistrez des Reels Instagram, vidéos et clips IGTV en haute définition originale. Téléchargeur gratuit mobile et PC.',
    },
    facebook: {
      title: 'Télécharger Vidéo Facebook 1080p Full HD MP4 | SnapLoad FR',
      desc: 'Téléchargez des vidéos et Reels Facebook en Full HD 1080p MP4 ou convertissez en MP3 gratuitement sans compte.',
    },
    mp3: {
      title: 'Convertisseur Vidéo en MP3 Audio En Ligne 320kbps | SnapLoad FR',
      desc: 'Convertissez des liens vidéo TikTok et Instagram en fichiers audio MP3 320kbps. Extracteur audio rapide sans inscription.',
    },
  },
  it: {
    home: {
      title: 'SnapLoad Italia — Scaricare Video TikTok, Reels e Facebook HD',
      desc: 'Scarica video TikTok senza watermark in 1080p Full HD gratis. Salva Instagram Reels e converti video in audio MP3 a 320kbps rapidamente.',
    },
    tiktok: {
      title: 'Scaricare Video TikTok Senza Logo HD 1080p Gratis | SnapLoad IT',
      desc: 'Salva video TikTok senza filigrana in alta definizione 1080p. Downloader veloce e gratuito per iPhone, Android e PC.',
    },
    instagram: {
      title: 'Scaricare Instagram Reels 1080p HD Gratis | SnapLoad IT',
      desc: 'Salva Reels Instagram, video e foto in alta definizione 1080p originale senza perdita di qualità.',
    },
    facebook: {
      title: 'Scaricare Video Facebook HD 1080p Gratis | SnapLoad IT',
      desc: 'Scarica video pubblici di Facebook e Reels in formato MP4 1080p o audio MP3 a 320kbps senza account.',
    },
    mp3: {
      title: 'Convertitore Video in MP3 Online 320kbps | SnapLoad IT',
      desc: 'Estrai musica e tracce audio da link video TikTok e Instagram in MP3 a 320kbps ad alta fedeltà.',
    },
  },
  vi: {
    home: {
      title: 'SnapLoad Việt Nam — Tải Video TikTok, Reels & Facebook HD Miễn Phí',
      desc: 'Tải video TikTok không logo không watermark chuẩn Full HD 1080p miễn phí. Lưu Reels Instagram và tải nhạc MP3 320kbps cực nhanh.',
    },
    tiktok: {
      title: 'Tải Video TikTok Không Logo 1080p HD Miễn Phí | SnapLoad VI',
      desc: 'Công cụ tải video TikTok không dính watermark trực tuyến miễn phí trên điện thoại và máy tính không cần cài app.',
    },
    instagram: {
      title: 'Tải Video Instagram Reels 1080p HD Miễn Phí | SnapLoad VI',
      desc: 'Lưu Reels, video bài viết và Story Instagram chất lượng gốc HD 1080p miễn phí.',
    },
    facebook: {
      title: 'Tải Video Facebook 1080p Full HD MP4 Miễn Phí | SnapLoad VI',
      desc: 'Tải video Facebook Watch và Reels chất lượng cao 1080p MP4 hoặc tách âm thanh MP3 cực nhanh.',
    },
    mp3: {
      title: 'Chuyển Đổi Video Sang MP3 320kbps Trực Tuyến | SnapLoad VI',
      desc: 'Tách nhạc và tải âm thanh MP3 320kbps chất lượng cao từ link video TikTok và Instagram dễ dàng.',
    },
  },
  th: {
    home: {
      title: 'SnapLoad ประเทศไทย — ดาวน์โหลดวิดีโอ TikTok, Reels และ Facebook HD',
      desc: 'ดาวน์โหลดวิดีโอ TikTok ไม่มีลายน้ำ คมชัด Full HD 1080p ฟรี บันทึก Instagram Reels และแปลงเป็น MP3 320kbps',
    },
    tiktok: {
      title: 'ดาวน์โหลดคลิป TikTok ไม่มีลายน้ำ 1080p HD ฟรี | SnapLoad TH',
      desc: 'โหลดวิดีโอ TikTok ไม่มีลายน้ำ ไม่ติดโลโก้ ฟรี บนมือถือและคอมพิวเตอร์ ใช้งานง่ายผ่านเว็บ',
    },
    instagram: {
      title: 'ดาวน์โหลด Instagram Reels 1080p HD ฟรี | SnapLoad TH',
      desc: 'บันทึก Reels, วิดีโอ และรูปภาพ Instagram คุณภาพต้นฉบับ HD ฟรี ไม่ต้องลงทะเบียน',
    },
    facebook: {
      title: 'ดาวน์โหลดวิดีโอ Facebook 1080p Full HD ฟรี | SnapLoad TH',
      desc: 'ดาวน์โหลดคลิป Facebook Watch และ Reels คุณภาพสูง 1080p MP4 หรือแปลงเป็นเสียง MP3 ทันที',
    },
    mp3: {
      title: 'แปลงวิดีโอเป็น MP3 320kbps ออนไลน์ฟรี | SnapLoad TH',
      desc: 'แยกเสียงเพลงจากคลิป TikTok และ Instagram เป็นไฟล์ MP3 คุณภาพสูง 320kbps ฟรี',
    },
  },
  ko: {
    home: {
      title: 'SnapLoad 한국 — 틱톡 워터마크 없는 동영상 & 릴스 다운로더 HD',
      desc: '워터마크 없는 틱톡 동영상 1080p Full HD 무료 다운로드. 인스타그램 릴스, 페이스북 동영상 저장 및 320kbps MP3 변환기.',
    },
    tiktok: {
      title: '틱톡 동영상 워터마크 없이 저장 1080p HD 무료 | SnapLoad KO',
      desc: '틱톡 로고 및 워터마크 없이 원본 화질 1080p로 동영상을 빠르게 저장하세요.',
    },
    instagram: {
      title: '인스타그램 릴스 다운로더 1080p HD 무료 | SnapLoad KO',
      desc: '인스타그램 릴스, 비디오, 게시물 미디어를 원본 고화질로 저장하는 무료 온라인 도구.',
    },
    facebook: {
      title: '페이스북 동영상 다운로더 1080p Full HD | SnapLoad KO',
      desc: '페이스북 릴스 및 공개 비디오를 고화질 MP4 또는 320kbps MP3로 무료 저장.',
    },
    mp3: {
      title: '온라인 동영상 MP3 음원 추출 변환기 320kbps | SnapLoad KO',
      desc: '틱톡 및 인스타그램 동영상 링크에서 고음질 320kbps MP3 오디오를 무료로 추출하세요.',
    },
  },
  ja: {
    home: {
      title: 'SnapLoad 日本 — TikTok透かしなし動画・Reels保存ダウンローダー HD',
      desc: '透かしロゴなしでTikTok動画を1080p Full HDで無料ダウンロード。Instagramリール、Facebook動画保存、320kbps MP3変換。',
    },
    tiktok: {
      title: 'TikTok動画 透かしなし保存 1080p HD 無料 | SnapLoad JA',
      desc: 'TikTokのロゴ・ウォーターマークなしで動画を安全かつ高速にダウンロード保存できる無料ツール。',
    },
    instagram: {
      title: 'Instagramリール動画 ダウンローダー 1080p HD | SnapLoad JA',
      desc: 'インスタグラムのリール、投稿動画、写真をオリジナル最高画質で保存できる無料オンライン保存ツール。',
    },
    facebook: {
      title: 'Facebook動画 ダウンローダー 1080p Full HD MP4 | SnapLoad JA',
      desc: 'フェイスブックのリールやWatch動画を高画質1080p MP4または320kbps MP3で簡単保存。',
    },
    mp3: {
      title: '動画からMP3音楽変換・音声抽出 320kbps | SnapLoad JA',
      desc: 'TikTokやInstagramの動画リンクから高音質320kbpsのMP3音楽ファイルを無料抽出保存。',
    },
  },
  pl: {
    home: {
      title: 'SnapLoad Polska — Pobieranie Filmów z TikTok, Reels i Facebook HD',
      desc: 'Darmowe pobieranie filmów z TikTok bez znaku wodnego w jakości 1080p Full HD. Zapisuj Reels z Instagrama, wideo z Facebooka i konwertuj na MP3.',
    },
    tiktok: {
      title: 'Pobierz Wideo z TikTok Bez Znaku Wodnego 1080p HD | SnapLoad PL',
      desc: 'Pobieraj filmy z TikToka bez logo i znaku wodnego online za darmo na telefon i komputer.',
    },
    instagram: {
      title: 'Instagram Reels Downloader 1080p HD Gratis | SnapLoad PL',
      desc: 'Zapisuj Instagram Reels, filmy i zdjęcia w oryginalnej rozdzielczości HD bez aplikacji.',
    },
    facebook: {
      title: 'Pobieranie Filmów z Facebooka 1080p Full HD MP4 | SnapLoad PL',
      desc: 'Pobieraj filmy z Facebooka i Reels w jakości 1080p MP4 lub konwertuj na MP3 za darmo.',
    },
    mp3: {
      title: 'Konwerter Wideo na MP3 Online 320kbps | SnapLoad PL',
      desc: 'Wyodrębnij czysty dźwięk z linków TikTok i Instagram do formatu MP3 320kbps za darmo.',
    },
  },
  nl: {
    home: {
      title: 'SnapLoad Nederland — TikTok, Instagram Reels & Facebook Video Downloader',
      desc: 'Download TikTok-video\'s zonder watermerk in 1080p Full HD gratis. Bewaar Instagram Reels, Facebook video\'s en converteer naar 320kbps MP3.',
    },
    tiktok: {
      title: 'TikTok Video Downloaden Zonder Watermerk 1080p HD | SnapLoad NL',
      desc: 'Download schone TikTok-video\'s zonder logo gratis op mobiel en pc zonder registratie.',
    },
    instagram: {
      title: 'Instagram Reels Downloader 1080p HD Gratis | SnapLoad NL',
      desc: 'Download Instagram Reels, video\'s en foto\'s in originele HD-kwaliteit zonder app.',
    },
    facebook: {
      title: 'Facebook Video Downloader 1080p Full HD MP4 | SnapLoad NL',
      desc: 'Download openbare Facebook video\'s en Reels in Full HD 1080p of converteer naar MP3 audio.',
    },
    mp3: {
      title: 'Video naar MP3 Converter Online 320kbps | SnapLoad NL',
      desc: 'Zet video links van TikTok en Instagram eenvoudig om naar hoge kwaliteit 320kbps MP3 audio.',
    },
  },
  hi: {
    home: {
      title: 'SnapLoad भारत — टिकटॉक, इंस्टाग्राम रील्स और फेसबुक वीडियो डाउनलोडर HD',
      desc: 'वाटरमार्क के बिना टिकटॉक वीडियो 1080p Full HD में मुफ्त डाउनलोड करें। इंस्टाग्राम रील्स, फेसबुक वीडियो सेव करें और 320kbps MP3 में बदलें।',
    },
    tiktok: {
      title: 'बिना वाटरमार्क टिकटॉक वीडियो डाउनलोड करें 1080p HD | SnapLoad HI',
      desc: 'टिकटॉक वीडियो बिना किसी लोगो या वाटरमार्क के फुल एचडी में सीधे मोबाइल या कंप्यूटर पर डाउनलोड करें।',
    },
    instagram: {
      title: 'इंस्टाग्राम रील्स डाउनलोडर 1080p HD फ्री | SnapLoad HI',
      desc: 'इंस्टाग्राम रील्स, वीडियो और पोस्ट मीडिया को ओरिजिनल एचडी क्वालिटी में तुरंत सेव करें।',
    },
    facebook: {
      title: 'फेसबुक वीडियो डाउनलोडर 1080p Full HD MP4 | SnapLoad HI',
      desc: 'फेसबुक वीडियो और रील्स को 1080p MP4 या 320kbps MP3 ऑडियो में मुफ्त डाउनलोड करें।',
    },
    mp3: {
      title: 'वीडियो से MP3 कन्वर्टर ऑनलाइन 320kbps | SnapLoad HI',
      desc: 'टिकटॉक और इंस्टाग्राम वीडियो से बेहतरीन 320kbps MP3 ऑडियो आसानी से एक्सट्रैक्ट करें।',
    },
  },
  ur: {
    home: {
      title: 'SnapLoad پاکستان — ٹک ٹاک بغیر واٹر مارک، ریلز اور فیس بک ویڈیو ڈاؤنلوڈر',
      desc: 'ٹک ٹاک ویڈیوز بغیر واٹر مارک 1080p فل ایچ ڈی میں مفت ڈاؤن لوڈ کریں۔ انسٹاگرام ریلز، فیس بک ویڈیوز محفوظ کریں اور MP3 میں تبدیل کریں۔',
    },
    tiktok: {
      title: 'ٹک ٹاک ویڈیو بغیر واٹر مارک ڈاؤن لوڈ کریں 1080p HD | SnapLoad UR',
      desc: 'ٹک ٹاک کی ویڈیوز بغیر لوگو یا واٹر مارک کے اعلیٰ کوالٹی میں موبائل اور کمپیوٹر پر محفوظ کریں۔',
    },
    instagram: {
      title: 'انسٹاگرام ریلز ڈاؤنلوڈر 1080p HD مفت | SnapLoad UR',
      desc: 'انسٹاگرام ریلز، ویڈیوز اور پوسٹس اصل ایچ ڈی کوالٹی میں ڈاؤن لوڈ کرنے کا بہترین ٹول۔',
    },
    facebook: {
      title: 'فیس بک ویڈیو ڈاؤنلوڈر 1080p Full HD MP4 | SnapLoad UR',
      desc: 'فیس بک ویڈیوز اور ریلز 1080p MP4 یا 320kbps MP3 میں مفت اور بغیر اکاؤنٹ ڈاؤن لوڈ کریں۔',
    },
    mp3: {
      title: 'آن لائن ویڈیو سے MP3 کنورٹر 320kbps | SnapLoad UR',
      desc: 'ٹک ٹاک اور انسٹاگرام ویڈیوز سے بہترین ساؤنڈ ٹریکس 320kbps MP3 آڈیو میں تبدیل کریں۔',
    },
  },
  ms: {
    home: {
      title: 'SnapLoad Malaysia — Muat Turun Video TikTok, Reels & Facebook HD',
      desc: 'Muat turun video TikTok tanpa tera air kualiti 1080p Full HD percuma. Simpan Instagram Reels, video Facebook dan tukar ke MP3 320kbps.',
    },
    tiktok: {
      title: 'Muat Turun Video TikTok Tanpa Watermark 1080p HD | SnapLoad MS',
      desc: 'Simpan video TikTok tanpa logo secara percuma dan pantas di telefon atau komputer.',
    },
    instagram: {
      title: 'Instagram Reels Downloader 1080p HD Percuma | SnapLoad MS',
      desc: 'Muat turun Reels, video dan foto Instagram dalam resolusi asal HD tanpa aplikasi tambahan.',
    },
    facebook: {
      title: 'Muat Turun Video Facebook 1080p Full HD MP4 | SnapLoad MS',
      desc: 'Simpan video Facebook Watch dan Reels kualiti 1080p MP4 atau tukar kepada audio MP3 percuma.',
    },
    mp3: {
      title: 'Penukar Video ke MP3 Dalam Talian 320kbps | SnapLoad MS',
      desc: 'Ekstrak lagu dan audio daripada pautan video TikTok dan Instagram ke format MP3 320kbps.',
    },
  },
  fil: {
    home: {
      title: 'SnapLoad Pilipinas — I-download ang TikTok, Reels at Facebook Video HD',
      desc: 'Libreng download ng TikTok video na walang watermark sa 1080p Full HD. I-save ang Instagram Reels, Facebook video at i-convert sa MP3 320kbps.',
    },
    tiktok: {
      title: 'Download TikTok Video Walang Watermark 1080p HD | SnapLoad FIL',
      desc: 'I-save ang TikTok videos nang walang watermark o logo nang libre at mabilis sa cellphone o computer.',
    },
    instagram: {
      title: 'Instagram Reels Downloader 1080p HD Libre | SnapLoad FIL',
      desc: 'I-save ang Instagram Reels, videos, at photos sa orihinal na HD resolution nang walang bayad.',
    },
    facebook: {
      title: 'Facebook Video Downloader 1080p Full HD MP4 | SnapLoad FIL',
      desc: 'I-download ang Facebook public videos at Reels sa 1080p MP4 o gawing MP3 audio nang walang account.',
    },
    mp3: {
      title: 'Online Video to MP3 Converter 320kbps | SnapLoad FIL',
      desc: 'I-extract ang musika at tunog mula sa TikTok at Instagram video links papuntang 320kbps MP3 audio.',
    },
  },
  uk: {
    home: {
      title: 'SnapLoad Україна — Завантажити Відео з TikTok, Reels та Facebook HD',
      desc: 'Безкоштовне завантаження відео TikTok без водяного знака в 1080p Full HD. Зберігайте Reels з Instagram, Facebook відео та конвертуйте в MP3.',
    },
    tiktok: {
      title: 'Завантажити Відео TikTok Без Водяного Знака 1080p HD | SnapLoad UK',
      desc: 'Зберігайте відео з Тік Ток без логотипу та водяних знаків онлайн безкоштовно на телефон і ПК.',
    },
    instagram: {
      title: 'Завантажити Instagram Reels 1080p HD Безкоштовно | SnapLoad UK',
      desc: 'Завантажуйте Reels, відео та фото з Instagram в оригінальній високій роздільній здатності без додатків.',
    },
    facebook: {
      title: 'Завантажити Відео з Фейсбук 1080p Full HD MP4 | SnapLoad UK',
      desc: 'Зберігайте відео та Reels з Facebook у форматі 1080p MP4 або конвертуйте в MP3 аудіо без реєстрації.',
    },
    mp3: {
      title: 'Конвертер Відео в MP3 Онлайн 320kbps | SnapLoad UK',
      desc: 'Витягуйте чистий звук та музику з відео TikTok та Instagram у формат MP3 320kbps безкоштовно.',
    },
  },
  sv: {
    home: {
      title: 'SnapLoad Sverige — Ladda ner TikTok, Reels och Facebook Video HD',
      desc: 'Ladda ner TikTok-videor utan vattenstämpel i 1080p Full HD gratis. Spara Instagram Reels, Facebook-videor och konvertera till 320kbps MP3.',
    },
    tiktok: {
      title: 'Ladda ner TikTok Video Utan Vattenmärke 1080p HD | SnapLoad SV',
      desc: 'Spara TikTok-klipp utan logotyp eller vattenstämpel snabbt och gratis i webbläsaren för mobil och dator.',
    },
    instagram: {
      title: 'Instagram Reels Downloader 1080p HD Gratis | SnapLoad SV',
      desc: 'Ladda ner Instagram Reels, videor och bilder i original HD-kvalitet utan registrering.',
    },
    facebook: {
      title: 'Facebook Video Downloader 1080p Full HD MP4 | SnapLoad SV',
      desc: 'Spara Facebook-videor och Reels i Full HD 1080p MP4 eller extrahera 320kbps MP3-ljud gratis.',
    },
    mp3: {
      title: 'Video till MP3 Konverterare Online 320kbps | SnapLoad SV',
      desc: 'Konvertera videolänkar från TikTok och Instagram till högkvalitativa 320kbps MP3-ljudfiler.',
    },
  },
  ro: {
    home: {
      title: 'SnapLoad România — Descărcare Video TikTok, Reels și Facebook HD',
      desc: 'Descarcă videoclipuri TikTok fără filigran la rezoluție 1080p Full HD gratis. Salvează Instagram Reels, video Facebook și convertește în MP3.',
    },
    tiktok: {
      title: 'Descarcă Video TikTok Fără Logo 1080p HD Gratis | SnapLoad RO',
      desc: 'Salvează videoclipuri TikTok fără watermark online rapid și gratuit pe telefon sau calculator.',
    },
    instagram: {
      title: 'Instagram Reels Downloader 1080p HD Gratis | SnapLoad RO',
      desc: 'Descarcă Reels, videoclipuri și fotografii de pe Instagram în calitate originală HD fără aplicație.',
    },
    facebook: {
      title: 'Descarcă Video de pe Facebook 1080p Full HD MP4 | SnapLoad RO',
      desc: 'Salvează clipuri și Reels de pe Facebook în format 1080p MP4 sau convertește în audio MP3 gratuit.',
    },
    mp3: {
      title: 'Convertor Video în MP3 Online 320kbps | SnapLoad RO',
      desc: 'Extrage piese audio clare din linkuri TikTok și Instagram în format MP3 de 320kbps rapid.',
    },
  },
  cs: {
    home: {
      title: 'SnapLoad Česko — Stahování Videí z TikTok, Reels a Facebook HD',
      desc: 'Stahujte videa z TikToku bez vodoznaku v 1080p Full HD zdarma. Ukládejte Instagram Reels, Facebook videa a převádějte na 320kbps MP3.',
    },
    tiktok: {
      title: 'Stáhnout Video z TikTok Bez Vodoznaku 1080p HD | SnapLoad CS',
      desc: 'Ukládejte videa z TikToku bez loga a vodoznaku online a zdarma na telefon i počítač.',
    },
    instagram: {
      title: 'Instagram Reels Downloader 1080p HD Zdarma | SnapLoad CS',
      desc: 'Stahujte Instagram Reels, videa a fotky v původní HD kvalitě bez instalace aplikací.',
    },
    facebook: {
      title: 'Stahování Videa z Facebooku 1080p Full HD MP4 | SnapLoad CS',
      desc: 'Ukládejte videa a Reels z Facebooku v 1080p MP4 nebo převádějte do MP3 zvuku zdarma.',
    },
    mp3: {
      title: 'Převodník Videa na MP3 Online 320kbps | SnapLoad CS',
      desc: 'Extrahujte vysoce kvalitní zvukové stopy MP3 320kbps z odkazů TikTok a Instagram bez registrace.',
    },
  },
  el: {
    home: {
      title: 'SnapLoad Ελλάδα — Λήψη Βίντεο TikTok, Reels και Facebook HD',
      desc: 'Κατεβάστε βίντεο TikTok χωρίς υδατογράφημα σε ποιότητα 1080p Full HD δωρεάν. Αποθηκεύστε Instagram Reels και μετατρέψτε σε MP3 320kbps.',
    },
    tiktok: {
      title: 'Λήψη Βίντεο TikTok Χωρίς Υδατογράφημα 1080p HD | SnapLoad EL',
      desc: 'Αποθηκεύστε βίντεο TikTok χωρίς λογότυπο δωρεάν και γρήγορα σε κινητό και υπολογιστή.',
    },
    instagram: {
      title: 'Instagram Reels Downloader 1080p HD Δωρεάν | SnapLoad EL',
      desc: 'Κατεβάστε Instagram Reels, βίντεο και φωτογραφίες στην αρχική υψηλή ανάλυση HD.',
    },
    facebook: {
      title: 'Λήψη Βίντεο από Facebook 1080p Full HD MP4 | SnapLoad EL',
      desc: 'Αποθηκεύστε βίντεο και Reels από το Facebook σε 1080p MP4 ή μετατρέψτε σε ήχο MP3 δωρεάν.',
    },
    mp3: {
      title: 'Μετατροπέας Βίντεο σε MP3 Online 320kbps | SnapLoad EL',
      desc: 'Εξαγάγετε κορυφαίο ήχο MP3 320kbps από συνδέσμους βίντεο TikTok και Instagram δωρεάν.',
    },
  },
  fa: {
    home: {
      title: 'SnapLoad ایران — دانلود ویدیو از تیک تاک، ریلز و فیسبوک HD',
      desc: 'دانلود رایگان ویدیو تیک تاک بدون واترمارک با کیفیت 1080p Full HD. ذخیره ریلز اینستاگرام، ویدیوهای فیسبوک و تبدیل به MP3 320kbps.',
    },
    tiktok: {
      title: 'دانلود ویدیو تیک تاک بدون واترمارک 1080p HD | SnapLoad FA',
      desc: 'ذخیره ویدیوهای تیک تاک بدون لوگو و واترمارک به صورت رایگان برای موبایل و کامپیوتر.',
    },
    instagram: {
      title: 'دانلود ریلز اینستاگرام با کیفیت 1080p HD رایگان | SnapLoad FA',
      desc: 'دانلود ریلز، ویدیوها و عکس‌های اینستاگرام با کیفیت اصلی و بدون نیاز به برنامه.',
    },
    facebook: {
      title: 'دانلود ویدیو از فیسبوک 1080p Full HD MP4 | SnapLoad FA',
      desc: 'ذخیره ویدیوها و ریلزهای فیسبوک در فرمت 1080p MP4 یا تبدیل به فایل صوتی MP3 رایگان.',
    },
    mp3: {
      title: 'تبدیل آنلاین ویدیو به MP3 با کیفیت 320kbps | SnapLoad FA',
      desc: 'استخراج آسان صدا و موسیقی با کیفیت بالای 320kbps از ویدیوهای تیک تاک و اینستاگرام.',
    },
  },
  bn: {
    home: {
      title: 'SnapLoad বাংলাদেশ — ওয়াটারমার্ক ছাড়া টিকটক, রিলস ও ফেসবুক ভিডিও ডাউনলোডার',
      desc: 'ওয়াটারমার্ক ছাড়া টিকটক ভিডিও 1080p Full HD কোয়ালিটিতে বিনামূল্যে ডাউনলোড করুন। ইনস্টাগ্রাম রিলস, ফেসবুক ভিডিও সংরক্ষণ ও 320kbps MP3 কনভার্ট করুন।',
    },
    tiktok: {
      title: 'ওয়াটারমার্ক ছাড়া টিকটক ভিডিও ডাউনলোড 1080p HD | SnapLoad BN',
      desc: 'টিকটক ভিডিওর লোগো ও ওয়াটারমার্ক ছাড়া সহজে মোবাইল বা কম্পিউটারে সেভ করুন একদম বিনামূল্যে।',
    },
    instagram: {
      title: 'ইনস্টাগ্রাম রিলস ডাউনলোডার 1080p HD ফ্রি | SnapLoad BN',
      desc: 'ইনস্টাগ্রাম রিলস, ভিডিও এবং ফটোগুলি মূল এইচডি রেজোলিউশনে সেভ করার সেরা ফ্রি অনলাইন টুল।',
    },
    facebook: {
      title: 'ফেসবুক ভিডিও ডাউনলোডার 1080p Full HD MP4 | SnapLoad BN',
      desc: 'ফেসবুক পাবলিক ভিডিও ও রিলস 1080p MP4 বা 320kbps MP3 অডিওতে বিনামূল্যে ডাউনলোড করুন।',
    },
    mp3: {
      title: 'অনলাইন ভিডিও থেকে MP3 কনভার্টার 320kbps | SnapLoad BN',
      desc: 'টিকটক এবং ইনস্টাগ্রাম ভিডিও লিঙ্ক থেকে নিখুঁত 320kbps MP3 অডিও ট্র্যাক এক্সট্র্যাক্ট করুন।',
    },
  },
};
