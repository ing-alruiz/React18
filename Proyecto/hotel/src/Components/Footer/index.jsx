import React from 'react';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => (
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
          <li>Pet Parties</li>
          <li>Pet Classes</li>
          <li>Pro Portal</li>
          <li>Partner Club</li>
          <li>Shop</li>
          <li>Professionals</li>
          <li>FAQ's</li>
          <li>Contact</li>
          <li>Job Offers</li>
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
      <span>Privacy Statement</span>
      <span>Terms and Conditions</span>
      <span>Cookies policy</span>
    </div>
  </footer>
);

export default Footer;