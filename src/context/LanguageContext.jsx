import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'site-language';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', dir: 'ltr' },
  { code: 'es', label: 'Spanish', native: 'Español', dir: 'ltr' },
];

const DICTIONARY = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      photos: 'Photos',
      blog: 'Latest News',
      team: 'Team',
      contact: 'Contact',
      selectLanguage: 'Select language',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode',
    },
    footer: {
      discover: 'Discover',
      information: 'Information',
      newsletter: 'Subscribe News',
      footerSummary:
        'Golden Shine Trading specializes in import, export, and wholesale of Japanese used automobile engines and spare parts, serving customers across Malaysia and worldwide.',
      newsletterSummary: 'Please enter your email address to receive updates.',
      yourEmail: 'Your email',
      subscribe: 'Subscribe',
      rightsReserved: 'All rights reserved.',
      newsletterError: 'Something went wrong. Please try again.',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      products: 'Productos',
      photos: 'Fotos',
      blog: 'Noticias',
      team: 'Equipo',
      contact: 'Contacto',
      selectLanguage: 'Seleccionar idioma',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      switchToLight: 'Cambiar a modo claro',
      switchToDark: 'Cambiar a modo oscuro',
    },
    footer: {
      discover: 'Descubrir',
      information: 'Información',
      newsletter: 'Suscríbete',
      footerSummary:
        'Golden Shine Trading se especializa en la importación, exportación y venta al por mayor de motores y repuestos de automóviles japoneses usados, sirviendo a clientes en Malasia y en todo el mundo.',
      newsletterSummary: 'Introduce tu correo electrónico para recibir actualizaciones.',
      yourEmail: 'Tu correo',
      subscribe: 'Suscribirse',
      rightsReserved: 'Todos los derechos reservados.',
      newsletterError: 'Algo salió mal. Inténtalo de nuevo.',
    },
  },
};

const NAV_PATH_KEYS = {
  '/': 'home',
  '/about': 'about',
  '/products': 'products',
  '/photos': 'photos',
  '/blog': 'blog',
  '/blogs': 'blog',
  '/team': 'team',
  '/contact': 'contact',
};

const LanguageContext = createContext(null);

function getLanguageMeta(code) {
  return SUPPORTED_LANGUAGES.find((item) => item.code === code) || SUPPORTED_LANGUAGES[0];
}

function toPathKey(path = '') {
  if (!path) return '';
  const lower = String(path).toLowerCase();
  return NAV_PATH_KEYS[lower] || '';
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.some((item) => item.code === saved)) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const languageMeta = getLanguageMeta(language);
    html.setAttribute('lang', languageMeta.code);
    html.setAttribute('dir', languageMeta.dir);
    localStorage.setItem(STORAGE_KEY, languageMeta.code);
  }, [language]);

  const value = useMemo(() => {
    const languageMeta = getLanguageMeta(language);
    const dictionary = DICTIONARY[languageMeta.code] || DICTIONARY.en;

    const t = (key, fallback = '') => {
      const segments = String(key || '').split('.').filter(Boolean);
      if (!segments.length) return fallback;

      let current = dictionary;
      for (const segment of segments) {
        if (current && typeof current === 'object' && segment in current) {
          current = current[segment];
        } else {
          return fallback;
        }
      }

      return typeof current === 'string' ? current : fallback;
    };

    const translateNavLabel = (label, path = '') => {
      const key = toPathKey(path);
      if (!key) return label;
      const englishLabel = DICTIONARY.en?.nav?.[key];
      if (englishLabel && String(label).toLowerCase() === englishLabel.toLowerCase()) {
        return t(`nav.${key}`, label);
      }
      return label;
    };

    return {
      language: languageMeta.code,
      languages: SUPPORTED_LANGUAGES,
      setLanguage,
      dir: languageMeta.dir,
      isRTL: languageMeta.dir === 'rtl',
      t,
      translateNavLabel,
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
