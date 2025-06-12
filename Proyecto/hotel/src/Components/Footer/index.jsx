import React, { useEffect, useState } from 'react';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchData } from '../../Api/apiService';
import apiEndpoints from '../../Api/apiEndpoints';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const [services, setServices] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await fetchData(apiEndpoints.services);
        setServices(data);
      } catch (err) {
        setServices([]);
      }
    };
    getServices();
  }, []);

  const lang = i18n.language.startsWith('es') ? 'es' : 'en';

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.column}>
          <div className={styles.logoSection}>
            <div className={styles.logo}>{t('footer.hotelName')}</div>
            <div className={styles.subtitle}>{t('footer.hotelSubtitle')}</div>
          </div>
          <div className={styles.socialRow}>
            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
            <FontAwesomeIcon icon={['fab', 'instagram']} />
            <FontAwesomeIcon icon={['fab', 'x-twitter']} />
            <FontAwesomeIcon icon={['fab', 'youtube']} />
            <FontAwesomeIcon icon={['fab', 'pinterest']} />
            <FontAwesomeIcon icon={['fab', 'tiktok']} />
          </div>
          <div className={styles.proSection}>
            <strong>{t('footer.proTitle')}</strong>
            <div>{t('footer.proDescription')}</div>
            <button className={styles.infoBtn}>{t('footer.moreInfo')}</button>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.colTitle}>{t('footer.aboutUs')}</div>
          <ul>
            <li>{t('footer.aboutMascotel')}</li>
            <li>{t('footer.ourBrands')}</li>
            <li>{t('footer.eliteClub')}</li>
            <li>{t('footer.proudlyCommitted')}</li>
            <li>{t('footer.magazine')}</li>
            <li>{t('footer.communication')}</li>
            <li>{t('footer.newOpenings')}</li>
            <li>{t('footer.codeOfEthics')}</li>
            <li>{t('footer.fraudPrevention')}</li>
            <li>{t('footer.whistleblowingChannel')}</li>
            <li>{t('footer.transparencyPortal')}</li>
            <li>{t('footer.compliancePolicy')}</li>
          </ul>
        </div>
        <div className={styles.column}>
          <div className={styles.colTitle}>{t('footer.services')}</div>
          <ul>
            {services.map(({ id, title_en, title_es, link }) => (
              <li key={id}>
                <a href={link || '#'} target="_blank" rel="noopener noreferrer">
                  {lang === 'es' ? title_es : title_en}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <div className={styles.colTitle}>{t('footer.reservations')}</div>
          <ul>
            <li>{t('footer.reservations')}</li>
            <li>{t('footer.corporateCode')}</li>
            <li>{t('footer.weddings')}</li>
            <li>{t('footer.meetingsEvents')}</li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <a href="/privacy" className={styles.footerLink}>{t('footer.privacy')}</a>
        <a href="/terms" className={styles.footerLink}>{t('footer.terms')}</a>
        <a href="/cookies" className={styles.footerLink}>{t('footer.cookies')}</a>
      </div>
    </footer>
  );
};

export default Footer;