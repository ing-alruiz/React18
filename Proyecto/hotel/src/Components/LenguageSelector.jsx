import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select onChange={handleChange} value={i18n.language} style={{ marginLeft: '1rem', padding: '0.3rem', borderRadius: '6px' }}>
      <option value="es">Español</option>
      <option value="en">English</option>
      {/* Add more languages as needed */}
    </select>
  );
};

export default LanguageSelector;