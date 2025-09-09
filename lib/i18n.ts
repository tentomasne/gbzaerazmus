import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Cookies from 'js-cookie';

// Import translations
import en from '@/locales/en.json';
import sk from '@/locales/sk.json';

const resources = {
  en: {
    translation: en
  },
  sk: {
    translation: sk
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
      cookieMinutes: 60 * 24 * 30, // 30 days
      cookieDomain: typeof window !== 'undefined' ? window.location.hostname : undefined,
      cookieOptions: {
        path: '/',
        sameSite: 'strict'
      }
    },

    interpolation: {
      escapeValue: false,
    },
  });

// Function to change language and persist in cookie
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  Cookies.set('i18next', lng, { expires: 30, path: '/' });
};

export default i18n;