export type Language = 'en' | 'de' | 'fr' | 'es';
export type PlatformKey = 'all' | 'tiktok' | 'instagram' | 'mp3';

export interface HeroTranslation {
  heading: string;
  highlight: string;
  sub: string;
}

export interface TranslationSchema {
  nav: {
    all: string;
    tiktok: string;
    instagram: string;
    mp3: string;
  };
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

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      all: 'All Platforms',
      tiktok: 'TikTok No Watermark',
      instagram: 'Instagram Reels',
      mp3: 'MP3 Converter',
    },
    hero: {
      all: {
        heading: 'Download Videos',
        highlight: 'From Anywhere',
        sub: 'Paste a link from TikTok or Instagram. Choose your quality and download instantly — no signup required.',
      },
      tiktok: {
        heading: 'TikTok Downloader',
        highlight: 'Without Watermark',
        sub: 'Paste your TikTok video link below to save clean, watermark-free HD videos directly to your device.',
      },
      instagram: {
        heading: 'Instagram Reels & Video',
        highlight: 'Downloader HD',
        sub: 'Save high-definition Instagram Reels, clips, and video posts directly to your phone or computer.',
      },
      mp3: {
        heading: 'Video to MP3',
        highlight: 'Audio Converter',
        sub: 'Extract high-bitrate MP3 audio tracks directly from TikTok or Instagram video links.',
      },
    },
    input: {
      placeholder: 'Paste a video link from TikTok or Instagram...',
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
  },
  de: {
    nav: {
      all: 'Alle Plattformen',
      tiktok: 'TikTok Ohne Wasserzeichen',
      instagram: 'Instagram Reels',
      mp3: 'MP3 Konverter',
    },
    hero: {
      all: {
        heading: 'Videos Herunterladen',
        highlight: 'Von Überall',
        sub: 'Fügen Sie einen Link von TikTok oder Instagram ein. Wählen Sie die Qualität und laden Sie sofort herunter.',
      },
      tiktok: {
        heading: 'TikTok Downloader',
        highlight: 'Ohne Wasserzeichen',
        sub: 'Fügen Sie Ihren TikTok-Videolink unten ein, um saubere, wasserzeichenfreie HD-Videos direkt auf Ihrem Gerät zu speichern.',
      },
      instagram: {
        heading: 'Instagram Reels & Video',
        highlight: 'Downloader HD',
        sub: 'Speichern Sie hochauflösende Instagram Reels, Clips und Videobeiträge direkt auf Ihrem Telefon oder Computer.',
      },
      mp3: {
        heading: 'Video zu MP3',
        highlight: 'Audio Konverter',
        sub: 'Extrahierten Sie erstklassige MP3-Audiospuren direkt aus TikTok- oder Instagram-Videolinks.',
      },
    },
    input: {
      placeholder: 'Videolink von TikTok oder Instagram einfügen...',
      paste: 'Einfügen',
      fetch: 'Holen',
      fetching: 'Lädt...',
      trySample: 'Beispiel testen:',
    },
    features: {
      speedTitle: 'Blitzschnell',
      speedDesc: 'Direktes Streaming — ohne Wartezeit',
      privacyTitle: 'Sicher & Privat',
      privacyDesc: 'Keine Speicherung auf Servern. Direkt im Browser',
      qualityTitle: 'Bis zu 4K Qualität',
      qualityDesc: 'Download in bester 1080p HD oder 4K Qualität',
    },
    faqTitle: 'Häufig gestellte Fragen',
  },
  fr: {
    nav: {
      all: 'Toutes les Plateformes',
      tiktok: 'TikTok Sans Filigrane',
      instagram: 'Instagram Reels',
      mp3: 'Convertisseur MP3',
    },
    hero: {
      all: {
        heading: 'Télécharger des Vidéos',
        highlight: 'N\'importe Où',
        sub: 'Collez un lien TikTok ou Instagram. Choisissez la qualité et téléchargez instantanément.',
      },
      tiktok: {
        heading: 'Téléchargeur TikTok',
        highlight: 'Sans Filigrane',
        sub: 'Collez votre lien vidéo TikTok ci-dessous pour enregistrer des vidéos HD propres sans filigrane.',
      },
      instagram: {
        heading: 'Instagram Reels & Vidéo',
        highlight: 'Téléchargeur HD',
        sub: 'Enregistrez des Reels, clips et vidéos Instagram haute définition directement sur votre téléphone ou ordinateur.',
      },
      mp3: {
        heading: 'Vidéo en MP3',
        highlight: 'Convertisseur Audio',
        sub: 'Extrayez des pistes audio MP3 haute qualité directement à partir de liens vidéo TikTok ou Instagram.',
      },
    },
    input: {
      placeholder: 'Collez un lien vidéo de TikTok ou Instagram...',
      paste: 'Coller',
      fetch: 'Obtenir',
      fetching: 'Chargement...',
      trySample: 'Essayer un exemple:',
    },
    features: {
      speedTitle: 'Ultra Rapide',
      speedDesc: 'Streaming direct — sans attente de traitement',
      privacyTitle: 'Sécurisé & Privé',
      privacyDesc: 'Fichiers non stockés sur le serveur',
      qualityTitle: 'Jusqu\'à Qualité 4K',
      qualityDesc: 'Téléchargement en haute définition 1080p HD ou 4K',
    },
    faqTitle: 'Foire Aux Questions',
  },
  es: {
    nav: {
      all: 'Todas las Plataformas',
      tiktok: 'TikTok Sin Marca de Agua',
      instagram: 'Instagram Reels',
      mp3: 'Convertidor MP3',
    },
    hero: {
      all: {
        heading: 'Descargar Videos',
        highlight: 'Desde Cualquier Lugar',
        sub: 'Pega un enlace de TikTok o Instagram. Elige la calidad y descarga al instante.',
      },
      tiktok: {
        heading: 'Descargador de TikTok',
        highlight: 'Sin Marca de Agua',
        sub: 'Pega tu enlace de video de TikTok a continuación para guardar videos HD limpios sin marca de agua.',
      },
      instagram: {
        heading: 'Instagram Reels y Video',
        highlight: 'Descargador HD',
        sub: 'Guarda Reels, clips y publicaciones de video de Instagram en alta definición directamente en tu teléfono o computadora.',
      },
      mp3: {
        heading: 'Video a MP3',
        highlight: 'Convertidor de Audio',
        sub: 'Extrae pistas de audio MP3 de alta calidad directamente desde enlaces de video de TikTok o Instagram.',
      },
    },
    input: {
      placeholder: 'Pega un enlace de video de TikTok o Instagram...',
      paste: 'Pegar',
      fetch: 'Obtener',
      fetching: 'Cargando...',
      trySample: 'Probar ejemplo:',
    },
    features: {
      speedTitle: 'Ultrarrápido',
      speedDesc: 'Transmisión directa — sin tiempo de espera',
      privacyTitle: 'Seguro y Privado',
      privacyDesc: 'Sin almacenamiento de archivos en el servidor',
      qualityTitle: 'Calidad hasta 4K',
      qualityDesc: 'Descarga en la máxima resolución 1080p HD o 4K',
    },
    faqTitle: 'Preguntas Frecuentes',
  },
};

export const LANGUAGE_LABELS: Record<Language, { label: string; flag: string }> = {
  en: { label: 'English', flag: '🇺🇸' },
  de: { label: 'Deutsch', flag: '🇩🇪' },
  fr: { label: 'Français', flag: '🇫🇷' },
  es: { label: 'Español', flag: '🇪🇸' },
};
