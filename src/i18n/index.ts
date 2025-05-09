import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ar from './locales/ar.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: localStorage.getItem('lang') || 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React handles escaping
  },
});

export default i18n;
