import { useEffect, useState } from 'react';
import { Language } from '../utils/i18n';
import { AdBanner } from './AdBanner';

type PlatformKey = 'all' | 'tiktok' | 'instagram' | 'mp3' | 'tiktok-mp3' | 'youtube-shorts' | 'widget';

interface SeoContentProps {
  platform: PlatformKey;
  currentLanguage?: Language;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ContentData {
  heading: string;
  subheading: string;
  whyTitle: string;
  faqTitle: string;
  steps: { number: string; title: string; desc: string }[];
  features: { title: string; desc: string; icon: string }[];
  faqs: FaqItem[];
}

const SEO_DATA: Record<Language, Record<PlatformKey, ContentData>> = {
  en: {
    all: {
      heading: 'Universal Online Video & Audio Downloader',
      subheading: 'SnapLoad provides the fastest way to save HD videos and MP3 audio from TikTok and Instagram for free.',
      whyTitle: 'Why Choose SnapLoad?',
      faqTitle: 'Frequently Asked Questions',
      steps: [
        { number: '01', title: 'Copy Video Link', desc: 'Copy the URL of any video or reel from TikTok or Instagram.' },
        { number: '02', title: 'Paste Link Above', desc: 'Paste the copied URL into the SnapLoad input bar and click "Fetch".' },
        { number: '03', title: 'Choose & Download', desc: 'Select your preferred resolution or MP3 audio format to download instantly.' },
      ],
      features: [
        { title: 'No Watermark', desc: 'Download clean TikTok videos without any logo or watermark overlay.', icon: '✨' },
        { title: 'Full HD & 4K', desc: 'Preserve original video crispness up to 1080p HD and 4K ultra quality.', icon: '🎬' },
        { title: '320kbps MP3', desc: 'Extract crisp audio tracks directly to high-bitrate MP3 format.', icon: '🎵' },
        { title: '100% Free & Private', desc: 'No account required, no software installation, and zero user logging.', icon: '🔒' },
      ],
      faqs: [
        {
          question: 'Is SnapLoad free to use?',
          answer: 'Yes! SnapLoad is 100% free with unlimited downloads. No sign-up, subscription, or software installation is required.'
        },
        {
          question: 'How do I download TikTok videos without watermark?',
          answer: 'Simply copy the TikTok video link, paste it into SnapLoad, click Fetch, and choose the "No Watermark HD" option.'
        },
        {
          question: 'Can I convert Instagram Reels or TikTok videos to MP3?',
          answer: 'Yes, SnapLoad allows you to extract audio tracks directly into high-quality 320kbps MP3 audio files.'
        },
      ]
    },
    tiktok: {
      heading: 'Free TikTok Downloader Without Watermark HD',
      subheading: 'Save watermark-free TikTok videos, slides, and audio tracks in high definition directly to your device.',
      whyTitle: 'Why Choose SnapLoad TikTok Saver?',
      faqTitle: 'TikTok Downloader FAQ',
      steps: [
        { number: '01', title: 'Copy TikTok URL', desc: 'Open the TikTok app or website, tap Share, and choose "Copy Link".' },
        { number: '02', title: 'Paste into SnapLoad', desc: 'Paste the TikTok link into the box above and hit "Fetch".' },
        { number: '03', title: 'Download Clean MP4', desc: 'Choose "Without Watermark" to save your watermark-free video instantly.' },
      ],
      features: [
        { title: 'Watermark-Free HD', desc: 'Removes the bouncing TikTok logo and username overlay cleanly.', icon: '🚫' },
        { title: 'Fast Processing', desc: 'Fetches media links in less than 2 seconds with zero queue time.', icon: '⚡' },
        { title: 'TikTok Sound Saver', desc: 'Extract original TikTok trending sounds directly into MP3 files.', icon: '🎧' },
        { title: 'Works on iOS & Android', desc: 'Save videos directly to your camera roll or downloads folder.', icon: '📱' },
      ],
      faqs: [
        {
          question: 'Why download TikTok videos without watermark?',
          answer: 'Downloading without watermark gives you a clean video for personal archiving or sharing without visual distractions.'
        },
        {
          question: 'Do I need a TikTok account to download videos?',
          answer: 'No, you do not need a TikTok account or app. You only need the video URL.'
        }
      ]
    },
    instagram: {
      heading: 'Instagram Reels & Video Downloader 1080p HD',
      subheading: 'Download Instagram Reels, IGTV clips, and video posts in original high definition.',
      whyTitle: 'Why Choose SnapLoad Instagram Saver?',
      faqTitle: 'Instagram Reels FAQ',
      steps: [
        { number: '01', title: 'Copy Instagram Link', desc: 'Tap the three dots on any Instagram Reel or Video and tap "Copy link".' },
        { number: '02', title: 'Paste on SnapLoad', desc: 'Paste the Instagram link into our converter tool above.' },
        { number: '03', title: 'Save Original MP4', desc: 'Click Download to save the highest resolution 1080p MP4 file.' },
      ],
      features: [
        { title: '1080p Full HD', desc: 'Retains maximum original resolution and audio clarity.', icon: '🌟' },
        { title: 'Reels & IGTV', desc: 'Supports Instagram Reels, main feed posts, and IGTV videos.', icon: '📸' },
        { title: 'No App Required', desc: 'Works directly in Safari, Chrome, Edge, and Firefox browsers.', icon: '🌐' },
        { title: 'Safe & Secure', desc: 'We do not store your downloads or track your personal viewing history.', icon: '🛡️' },
      ],
      faqs: [
        {
          question: 'How to download Instagram Reels on mobile?',
          answer: 'Copy the Reel link from the Instagram app, paste it into SnapLoad on Safari/Chrome, tap Fetch, and press Download.'
        }
      ]
    },
    mp3: {
      heading: 'Online Video to MP3 Audio Converter (320kbps)',
      subheading: 'Extract crisp MP3 audio tracks from TikTok and Instagram video links instantly.',
      whyTitle: 'Why Choose SnapLoad MP3 Converter?',
      faqTitle: 'MP3 Converter FAQ',
      steps: [
        { number: '01', title: 'Copy Video Link', desc: 'Copy any TikTok or Instagram video link.' },
        { number: '02', title: 'Paste into Converter', desc: 'Paste the video URL into SnapLoad and select MP3 format.' },
        { number: '03', title: 'Download Audio', desc: 'Click Download to receive your high-quality 320kbps MP3 track.' },
      ],
      features: [
        { title: 'High Bitrate 320kbps', desc: 'Extracts clear, uncompressed audio quality for music & podcasts.', icon: '🎵' },
        { title: 'Fast Conversion', desc: 'Processes audio extraction in seconds directly in your browser.', icon: '⚡' },
        { title: 'Multi-Platform', desc: 'Supports TikTok sounds and Instagram audio reels.', icon: '🌐' },
        { title: 'Mobile Friendly', desc: 'Listen offline on your phone or sync to your favorite music player.', icon: '📱' },
      ],
      faqs: [
        {
          question: 'What is the quality of extracted MP3 files?',
          answer: 'SnapLoad extracts audio at up to 320kbps (the highest standard MP3 quality available).'
        }
      ]
    }
  },
  de: {
    all: {
      heading: 'Universal Online Video & Audio Downloader',
      subheading: 'SnapLoad bietet die schnellste Möglichkeit, HD-Videos und MP3-Audio von TikTok und Instagram kostenlos zu speichern.',
      whyTitle: 'Warum SnapLoad wählen?',
      faqTitle: 'Häufig gestellte Fragen',
      steps: [
        { number: '01', title: 'Link kopieren', desc: 'Kopieren Sie die URL eines Videos oder Reels von TikTok oder Instagram.' },
        { number: '02', title: 'Link einfügen', desc: 'Fügen Sie die kopierte URL oben ein und klicken Sie auf "Holen".' },
        { number: '03', title: 'Wählen & Herunterladen', desc: 'Wählen Sie die Auflösung oder das MP3-Format zum sofortigen Download.' },
      ],
      features: [
        { title: 'Ohne Wasserzeichen', desc: 'Laden Sie TikTok-Videos ohne Logo oder Wasserzeichen herunter.', icon: '✨' },
        { title: 'Full HD & 4K', desc: 'Erhalten Sie die originale Videoqualität in 1080p HD oder 4K.', icon: '🎬' },
        { title: '320kbps MP3', desc: 'Extrahierten Sie Audiospuren direkt im hochwertigen MP3-Format.', icon: '🎵' },
        { title: '100% Kostenlos', desc: 'Keine Registrierung, keine Installation und vollkommen anonym.', icon: '🔒' },
      ],
      faqs: [
        {
          question: 'Ist SnapLoad kostenlos?',
          answer: 'Ja! SnapLoad ist 100% kostenlos ohne Einschränkungen oder Registrierung.'
        },
        {
          question: 'Wie lade ich TikTok-Videos ohne Wasserzeichen herunter?',
          answer: 'Kopieren Sie den TikTok-Link, fügen Sie ihn bei SnapLoad ein und wählen Sie "Ohne Wasserzeichen HD".'
        }
      ]
    },
    tiktok: {
      heading: 'Kostenloser TikTok Downloader Ohne Wasserzeichen HD',
      subheading: 'Speichern Sie wasserzeichenfreie TikTok-Videos und Audio direkt auf Ihrem Gerät.',
      whyTitle: 'Warum SnapLoad TikTok Downloader?',
      faqTitle: 'TikTok Downloader FAQ',
      steps: [
        { number: '01', title: 'TikTok URL kopieren', desc: 'Öffnen Sie TikTok, tippen Sie auf Teilen und wählen Sie "Link kopieren".' },
        { number: '02', title: 'Bei SnapLoad einfügen', desc: 'Fügen Sie den Link in das Suchfeld ein und tippen Sie auf "Holen".' },
        { number: '03', title: 'Sauberes MP4 speichern', desc: 'Wählen Sie "Ohne Wasserzeichen" zum sofortigen Speichern.' },
      ],
      features: [
        { title: 'Wasserzeichenfrei HD', desc: 'Entfernt das TikTok-Logo sauber aus dem Video.', icon: '🚫' },
        { title: 'Schnelle Verarbeitung', desc: 'Lädt Medienlinks in weniger als 2 Sekunden.', icon: '⚡' },
      ],
      faqs: [
        {
          question: 'Warum TikTok-Videos ohne Wasserzeichen herunterladen?',
          answer: 'Das Herunterladen ohne Wasserzeichen liefert Ihnen ein sauberes Video zur persönlichen Archivierung.'
        }
      ]
    },
    instagram: {
      heading: 'Instagram Reels Downloader 1080p HD',
      subheading: 'Laden Sie Instagram Reels, IGTV-Clips und Videos in bester HD-Auflösung herunter.',
      whyTitle: 'Warum SnapLoad Instagram Downloader?',
      faqTitle: 'Instagram FAQ',
      steps: [
        { number: '01', title: 'Instagram Link kopieren', desc: 'Tippen Sie bei Instagram auf die drei Punkte und wählen Sie "Link kopieren".' },
        { number: '02', title: 'Einfügen', desc: 'Fügen Sie den Link oben in das Konverter-Tool ein.' },
        { number: '03', title: 'Speichern', desc: 'Klicken Sie auf Download, um die Datei in 1080p HD zu speichern.' },
      ],
      features: [
        { title: '1080p Full HD', desc: 'Erhält die originale Video- und Audioqualität.', icon: '🌟' },
      ],
      faqs: [
        {
          question: 'Wie lade ich Instagram Reels herunter?',
          answer: 'Link in der Instagram-App kopieren, bei SnapLoad einfügen und auf Herunterladen klicken.'
        }
      ]
    },
    mp3: {
      heading: 'Online Video zu MP3 Konverter (320kbps)',
      subheading: 'Extrahierten Sie erstklassige MP3-Audiospuren aus TikTok- und Instagram-Links.',
      whyTitle: 'Warum SnapLoad MP3 Konverter?',
      faqTitle: 'MP3 Konverter FAQ',
      steps: [
        { number: '01', title: 'Link kopieren', desc: 'Kopieren Sie jeden TikTok- oder Instagram-Link.' },
        { number: '02', title: 'Format wählen', desc: 'Fügen Sie den Link ein und wählen Sie MP3-Audio.' },
        { number: '03', title: 'MP3 herunterladen', desc: 'Klicken Sie auf Herunterladen für die 320kbps MP3-Datei.' },
      ],
      features: [
        { title: 'Hohe Bitrate 320kbps', desc: 'Klarer unkomprimierter Sound für Musik & Podcasts.', icon: '🎵' },
      ],
      faqs: [
        {
          question: 'Welche Qualität haben die MP3-Dateien?',
          answer: 'SnapLoad extrahiert Audio mit bis zu 320kbps.'
        }
      ]
    }
  },
  fr: {
    all: {
      heading: 'Téléchargeur de Vidéos et Audio En Ligne',
      subheading: 'SnapLoad est le moyen le plus rapide de télécharger des vidéos HD et MP3 depuis TikTok et Instagram.',
      whyTitle: 'Pourquoi choisir SnapLoad ?',
      faqTitle: 'Foire Aux Questions',
      steps: [
        { number: '01', title: 'Copier le lien', desc: 'Copiez l\'URL de n\'importe quelle vidéo TikTok ou Instagram.' },
        { number: '02', title: 'Coller le lien', desc: 'Collez l\'URL ci-dessus et cliquez sur "Obtenir".' },
        { number: '03', title: 'Télécharger', desc: 'Sélectionnez la qualité ou le format MP3 pour télécharger.' },
      ],
      features: [
        { title: 'Sans Filigrane', desc: 'Téléchargez des vidéos TikTok sans aucun logo.', icon: '✨' },
        { title: 'Full HD & 4K', desc: 'Conservez la résolution originale jusqu\'en 1080p HD ou 4K.', icon: '🎬' },
      ],
      faqs: [
        {
          question: 'Est-ce que SnapLoad est gratuit ?',
          answer: 'Oui ! SnapLoad est 100% gratuit sans inscription.'
        }
      ]
    },
    tiktok: {
      heading: 'Téléchargeur TikTok Sans Filigrane HD',
      subheading: 'Enregistrez des vidéos TikTok sans filigrane directement sur votre appareil.',
      whyTitle: 'Pourquoi SnapLoad TikTok ?',
      faqTitle: 'FAQ TikTok',
      steps: [
        { number: '01', title: 'Copier l\'URL TikTok', desc: 'Ouvrez TikTok et appuyez sur Copier le lien.' },
        { number: '02', title: 'Coller sur SnapLoad', desc: 'Collez le lien dans le champ ci-dessus.' },
        { number: '03', title: 'Télécharger MP4', desc: 'Choisissez "Sans Filigrane" pour enregistrer.' },
      ],
      features: [
        { title: 'Sans Filigrane HD', desc: 'Supprime le logo TikTok proprement.', icon: '🚫' }
      ],
      faqs: [
        {
          question: 'Comment télécharger sans filigrane ?',
          answer: 'Collez simplement le lien TikTok et sélectionnez l\'option Sans Filigrane.'
        }
      ]
    },
    instagram: {
      heading: 'Téléchargeur Instagram Reels 1080p HD',
      subheading: 'Téléchargez les Reels et vidéos Instagram en haute définition.',
      whyTitle: 'Pourquoi SnapLoad Instagram ?',
      faqTitle: 'FAQ Instagram',
      steps: [
        { number: '01', title: 'Copier le lien Instagram', desc: 'Appuyez sur les trois points et copiez le lien.' },
        { number: '02', title: 'Coller', desc: 'Collez le lien ci-dessus.' },
        { number: '03', title: 'Télécharger', desc: 'Enregistrez le fichier MP4 HD.' },
      ],
      features: [
        { title: '1080p Full HD', desc: 'Garde la qualité vidéo originale.', icon: '🌟' }
      ],
      faqs: [
        {
          question: 'Comment enregistrer un Reel ?',
          answer: 'Copiez le lien du Reel et collez-le sur SnapLoad.'
        }
      ]
    },
    mp3: {
      heading: 'Convertisseur Vidéo en MP3 (320kbps)',
      subheading: 'Extrayez des pistes audio MP3 à partir de liens vidéo.',
      whyTitle: 'Pourquoi Convertir en MP3 ?',
      faqTitle: 'FAQ MP3',
      steps: [
        { number: '01', title: 'Copier le lien', desc: 'Copiez le lien de la vidéo.' },
        { number: '02', title: 'Convertir', desc: 'Sélectionnez le format MP3.' },
        { number: '03', title: 'Télécharger MP3', desc: 'Obtenez votre fichier audio 320kbps.' },
      ],
      features: [
        { title: 'Haute Qualité 320kbps', desc: 'Son de qualité supérieure.', icon: '🎵' }
      ],
      faqs: [
        {
          question: 'Quelle est la qualité MP3 ?',
          answer: 'SnapLoad extrait l\'audio jusqu\'à 320kbps.'
        }
      ]
    }
  },
  es: {
    all: {
      heading: 'Descargador Universal de Video y Audio',
      subheading: 'La forma más rápida de guardar videos HD y audio MP3 de TikTok e Instagram gratis.',
      whyTitle: '¿Por qué elegir SnapLoad?',
      faqTitle: 'Preguntas Frecuentes',
      steps: [
        { number: '01', title: 'Copiar enlace', desc: 'Copia la URL de cualquier video de TikTok o Instagram.' },
        { number: '02', title: 'Pegar enlace', desc: 'Pega la URL arriba y haz clic en "Obtener".' },
        { number: '03', title: 'Descargar', desc: 'Selecciona la resolución o formato MP3 para descargar.' },
      ],
      features: [
        { title: 'Sin Marca de Agua', desc: 'Descarga videos de TikTok limpios sin marca de agua.', icon: '✨' },
        { title: 'Full HD y 4K', desc: 'Conserva la calidad original hasta 1080p HD o 4K.', icon: '🎬' },
      ],
      faqs: [
        {
          question: '¿Es SnapLoad gratuito?',
          answer: '¡Sí! SnapLoad es 100% gratuito sin necesidad de registro.'
        }
      ]
    },
    tiktok: {
      heading: 'Descargador de TikTok Sin Marca de Agua HD',
      subheading: 'Guarda videos de TikTok sin marca de agua directamente en tu dispositivo.',
      whyTitle: '¿Por qué SnapLoad TikTok?',
      faqTitle: 'Preguntas Frecuentes TikTok',
      steps: [
        { number: '01', title: 'Copiar URL', desc: 'Abre TikTok y selecciona Copiar Enlace.' },
        { number: '02', title: 'Pegar', desc: 'Pega el enlace en la caja superior.' },
        { number: '03', title: 'Descargar', desc: 'Elige Sin Marca de Agua para guardar.' },
      ],
      features: [
        { title: 'Sin Marca de Agua HD', desc: 'Elimina el logo de TikTok de forma limpia.', icon: '🚫' }
      ],
      faqs: [
        {
          question: '¿Cómo descargar sin marca de agua?',
          answer: 'Copia el enlace de TikTok, pégalo en SnapLoad y selecciona Sin Marca de Agua.'
        }
      ]
    },
    instagram: {
      heading: 'Descargador de Instagram Reels 1080p HD',
      subheading: 'Descarga Reels y videos de Instagram en alta definición.',
      whyTitle: '¿Por qué SnapLoad Instagram?',
      faqTitle: 'Preguntas Frecuentes Instagram',
      steps: [
        { number: '01', title: 'Copiar enlace', desc: 'Toca los tres puntos en Instagram y copia el enlace.' },
        { number: '02', title: 'Pegar', desc: 'Pega el enlace arriba.' },
        { number: '03', title: 'Descargar', desc: 'Guarda tu archivo MP4 en HD.' },
      ],
      features: [
        { title: '1080p Full HD', desc: 'Mantiene la calidad de video original.', icon: '🌟' }
      ],
      faqs: [
        {
          question: '¿Cómo guardar un Reel?',
          answer: 'Copia el enlace del Reel y pégalo en SnapLoad.'
        }
      ]
    },
    mp3: {
      heading: 'Convertidor de Video a MP3 (320kbps)',
      subheading: 'Extrae pistas de audio MP3 de alta calidad desde enlaces de video.',
      whyTitle: '¿Por qué Convertir a MP3?',
      faqTitle: 'Preguntas Frecuentes MP3',
      steps: [
        { number: '01', title: 'Copiar enlace', desc: 'Copia el enlace del video.' },
        { number: '02', title: 'Convertir', desc: 'Selecciona el formato MP3.' },
        { number: '03', title: 'Descargar MP3', desc: 'Obtén tu archivo de audio en 320kbps.' },
      ],
      features: [
        { title: 'Alta Calidad 320kbps', desc: 'Sonido sin compresión.', icon: '🎵' }
      ],
      faqs: [
        {
          question: '¿Cuál es la calidad MP3?',
          answer: 'SnapLoad extrae audio a hasta 320kbps.'
        }
      ]
    }
  }
};

export function SeoContentSection({ platform, currentLanguage = 'en' }: SeoContentProps) {
  const langData = SEO_DATA[currentLanguage] || SEO_DATA.en;
  const content = langData[platform] || langData.all;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (content && content.faqs && content.faqs.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': content.faqs.map((faq) => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer,
          },
        })),
      };

      let scriptTag = document.getElementById('dynamic-faq-jsonld');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'dynamic-faq-jsonld';
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(faqSchema);
    }
  }, [content]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-4xl mx-auto mt-16 space-y-16 animate-fade-in text-left">
      {/* Step-by-Step Guide */}
      <div className="glass-strong rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
            {content.heading}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            {content.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-sm hover:border-primary-500/30 transition-all"
            >
              <span className="inline-block text-3xl font-black text-primary-500/40 mb-2">
                {step.number}
              </span>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
          {content.whyTitle}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.features.map((feat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-subtle border border-white/10 hover:border-primary-500/40 transition-all flex flex-col items-start"
            >
              <span className="text-3xl mb-3">{feat.icon}</span>
              <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-1">
                {feat.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Banner Ad */}
      <AdBanner slot={`platform-${platform}-slot`} label="Sponsored Content" className="my-8" />

      {/* Accordion FAQ Section */}
      <div className="glass-strong rounded-3xl p-6 sm:p-10 border border-white/10">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {content.faqTitle}
          </h3>
        </div>

        <div className="space-y-4">
          {content.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200/50 dark:border-white/10 overflow-hidden transition-all bg-white/30 dark:bg-white/5"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-semibold text-gray-900 dark:text-white text-sm sm:text-base hover:bg-white/10 transition-all"
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 text-primary-400 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 animate-fade-in border-t border-gray-100 dark:border-white/5 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
