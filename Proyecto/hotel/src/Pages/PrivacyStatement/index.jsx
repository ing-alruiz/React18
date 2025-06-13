import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyStatement = () => {
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '2rem' }}>
      <h1>{t('pages.privacy')}</h1>
      <p>{t('privacy.intro')}</p>
      <h2>{t('privacy.collectTitle')}</h2>
      <ul>
        <li>{t('privacy.collect1')}</li>
        <li>{t('privacy.collect2')}</li>
        <li>{t('privacy.collect3')}</li>
      </ul>
      <h2>{t('privacy.useTitle')}</h2>
      <ul>
        <li>{t('privacy.use1')}</li>
        <li>{t('privacy.use2')}</li>
        <li>{t('privacy.use3')}</li>
        <li>{t('privacy.use4')}</li>
      </ul>
      <h2>{t('privacy.protectTitle')}</h2>
      <p>{t('privacy.protect')}</p>
      <h2>{t('privacy.rightsTitle')}</h2>
      <p>
        {t('privacy.rights')}
        <a href="mailto:info@hotelmascotasnobles.com">info@hotelmascotasnobles.com</a>.
      </p>
      <h2>{t('privacy.updatesTitle')}</h2>
      <p>{t('privacy.updates')}</p>
      <p style={{ marginTop: '2rem', color: '#888' }}>
        {t('privacy.lastUpdated')}
      </p>
    </div>
  );
};

export default PrivacyStatement;