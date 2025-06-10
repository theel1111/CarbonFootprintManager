import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enProfile from './locales/en/profile.json';
import zhProfile from './locales/zh/profile.json';
i18n
  .use(LanguageDetector) // 可自動偵測語言
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        profile: enProfile,
      },
      zh: {
        profile: zhProfile,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
