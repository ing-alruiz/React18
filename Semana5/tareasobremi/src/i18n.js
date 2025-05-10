// filepath: g:\Git\Cursos\React18\Semana5\tareasobremi\src\i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // Import the language detector plugin
import en from './Locales/en.json';
import es from './Locales/es.json';

i18n
  .use(LanguageDetector) // Use the language detector plugin
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es }
    },
    fallbackLng: 'en', // Fallback language if detection fails
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;