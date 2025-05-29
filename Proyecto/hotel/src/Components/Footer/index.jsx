import React, { useEffect, useState } from 'react';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchData } from '@Api/apiService';
import apiEndpoints from '@Api/apiEndpoints';


const Footer = () => {

  const [services, setServices] = useState([]);

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

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.column}>
          <div className={styles.logoSection}>
            <div className={styles.logo}>Hotel Mascotas Nobles</div>
            <div className={styles.subtitle}>HOTELS & GROOM</div>
          </div>
          <div className={styles.socialRow}>
            {/* <FontAwesomeIcon icon={['fas', 'blog']} /> */}
            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
            <FontAwesomeIcon icon={['fab', 'instagram']} />
            <FontAwesomeIcon icon={['fab', 'x-twitter']} />
            <FontAwesomeIcon icon={['fab', 'youtube']} />
            <FontAwesomeIcon icon={['fab', 'pinterest']} />
            <FontAwesomeIcon icon={['fab', 'tiktok']} />
          </div>
          <div className={styles.proSection}>
            <strong>Mascotel Pro</strong>
            <div>The portal for professionals. Access all the sales and information tools!</div>
            <button className={styles.infoBtn}>More information</button>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.colTitle}>ABOUT US</div>
          <ul>
            <li>About Mascotel</li>
            <li>Our Brands</li>
            <li>Elite Club</li>
            <li>Proudly Committed</li>
            <li>Magazine</li>
            <li>Communication</li>
            <li>New Openings</li>
            <li>Code of Ethics</li>
            <li>Fraud Prevention</li>
            <li>Whistleblowing Channel</li>
            <li>Transparency Portal</li>
            <li>Compliance Policy</li>
          </ul>
        </div>
        <div className={styles.column}>
          <div className={styles.colTitle}>SERVICES</div>
          <ul>
            {services.map(({ id, title, link }) => (
              <li key={id}>
                <a href={link || '#'} target="_blank" rel="noopener noreferrer">
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <div className={styles.colTitle}>RESERVATIONS</div>
          <ul>
            <li>Reservations</li>
            <li>Corporate Code</li>
            <li>Weddings</li>
            <li>Meetings & Events</li>
          </ul>
          {/* <div className={styles.appSection}>
            <div className={styles.appTitle}>YOUR COMPLETE EXPERIENCE</div>
            <div className={styles.appSubtitle}>Discover the Mascotel app</div>
            <div className={styles.appBtns}>
    <FontAwesomeIcon icon={['fab', 'apple']} />
    <FontAwesomeIcon icon={['fab', 'google-play']} />
  </div>
            <div className={styles.downloadText}>Download it for iOS and Android</div>
          </div> */}
          {/* <div className={styles.certSection}>
            <img src="/cert.png" alt="Certification" />
          </div> */}
        </div>
      </div>
     <div className={styles.footerBottom}>
      <a href="/privacy" className={styles.footerLink}>Privacy Statement</a>
      <a href="/terms" className={styles.footerLink}>Terms and Conditions</a>
      <a href="/cookies" className={styles.footerLink}>Cookies policy</a>
    </div>
    </footer>
  );
}
export default Footer;