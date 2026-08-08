export type Language = 'en' | 'de' | 'fr' | 'es';

export interface TranslationSchema {
  nav: {
    home: string;
    tiktok: string;
    instagram: string;
    mp3: string;
  };
  hero: {
    heading: string;
    highlight: string;
    sub: string;
  };
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
      home: 'All Platforms',
      tiktok: 'TikTok No Watermark',
      instagram: 'Instagram Reels',
      mp3: 'MP3 Converter',
    },
    hero: {
      heading: 'Download Videos',
      highlight: 'From Anywhere',
      sub: 'Paste a link from TikTok or Instagram. Choose your quality and download instantly — no signup required.',
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
      home: 'Alle Plattformen',
      tiktok: 'TikTok Ohne Wasserzeichen',
      instagram: 'Instagram Reels',
      mp3: 'MP3 Konverter',
    },
    hero: {
      heading: 'Videos Herunterladen',
      highlight: 'Von Überall',
      sub: 'Fügen Sie einen Link von TikTok oder Instagram ein. Wählen Sie die Qualität und laden Sie sofort herunter.',
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
      home: 'Toutes les Plateformes',
      tiktok: 'TikTok Sans Filigrane',
      instagram: 'Instagram Reels',
      mp3: 'Convertisseur MP3',
    },
    hero: {
      heading: 'Télécharger des Vidéos',
      highlight: 'N\'importe Où',
      sub: 'Collez un lien TikTok ou Instagram. Choisissez la qualité et téléchargez instantanément.',
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
      home: 'Todas las Plataformas',
      tiktok: 'TikTok Sin Marca de Agua',
      instagram: 'Instagram Reels',
      mp3: 'Convertidor MP3',
    },
    hero: {
      heading: 'Descargar Videos',
      highlight: 'Desde Cualquier Lugar',
      sub: 'Pega un enlace de TikTok o Instagram. Elige la calidad y descarga al instante.',
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
