import React from 'react';
import styles from './MainLogo.module.css';
import logoPerrito from '@Images/logo/logoPerrito.png';

const MainLogo = () => {
  return (
    <div className={styles.logoContainer}>
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
    </div>
  );
};

export default MainLogo;