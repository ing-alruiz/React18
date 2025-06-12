import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MainLogo.module.css';
import logoPerrito from '../../assets/images/logo/logoPerrito.png';

const MainLogo = () => {
  return (
    <Link to="/" className={styles.logoContainer} style={{ textDecoration: 'none' }}>
      <img
        src={logoPerrito}
        alt="Hotel Logo"
        className={styles.logoImage}
      />
      <span className={styles.logoText}>
        Hotel<br/>
        Mascotas<br/>
        Nobles
      </span>
    </Link>
  );
};

export default MainLogo;