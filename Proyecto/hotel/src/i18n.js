import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from './locales/en.json';
import es from './locales/es.json';

// Configure i18next
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: 'es', // Set Spanish as the default language
    fallbackLng: 'es', // Default language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;

// import React from 'react';
// import { useTranslation } from 'react-i18next';

// const LanguageSwitcher = () => {
//   const { i18n } = useTranslation();

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '20px' }}>
//       <button onClick={() => changeLanguage('en')}>English</button>
//       <button onClick={() => changeLanguage('es')}>Español</button>
//       <button onClick={() => changeLanguage('fr')}>Français</button>
//     </div>
//   );
// };

// export default LanguageSwitcher;