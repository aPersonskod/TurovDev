import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import ru from './locales/ru.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    returnNull: false,
  });

/** Keep <html lang> in sync with the active language. */
function applyHtmlLang(lng) {
  const normalized = typeof lng === 'string' && lng.startsWith('ru') ? 'ru' : 'en';
  document.documentElement.setAttribute('lang', normalized);
}

applyHtmlLang(i18n.resolvedLanguage || i18n.language);
i18n.on('languageChanged', applyHtmlLang);

export default i18n;