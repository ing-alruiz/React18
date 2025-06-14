import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TopBar.module.css';
import ProfileCard from '../ProfileCard/ProfileCard';
import LanguageSelector from '../../LenguageSelector';

const TopBar = () => (
  <div className={styles.topBar}>
    <Link to="/" className={styles.appName} style={{ textDecoration: 'none', color: 'inherit' }}>
      Admin Portal
    </Link>
    <div className={styles.profileWrapper}>
      <LanguageSelector className={styles.langSelector} />
      <ProfileCard className={styles.profileMini} />
    </div>
  </div>
);

export default TopBar;
