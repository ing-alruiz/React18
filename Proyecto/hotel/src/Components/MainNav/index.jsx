import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './MainNav.module.css';
import MainLogo from '@Components/Logo/MainLogo';
import LanguageSelector from '../LenguageSelector';

const MainNav = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const selectedKey = location.pathname === '/' ? '/home' : location.pathname;

  return (
   <nav className={styles.navbar}>
      <div className={styles.logoWrapper}>
        <MainLogo />
      </div>
      <div className={styles.menu}>
        <div className={styles.menuItem + ' ' + (selectedKey === '/home' ? styles.selected : '')}>
          <Link to="/" className={styles.menuLink}>{t('menu.home')}</Link>
        </div>
        <div className={styles.menuItem + ' ' + (selectedKey === '/about' ? styles.selected : '')}>
          <Link to="/about" className={styles.menuLink}>{t('menu.about')}</Link>
        </div>
        <div className={styles.menuItem + ' ' + (selectedKey === '/book' ? styles.selected : '')}>
          <Link to="/book" className={styles.menuLink}>{t('menu.book')}</Link>
        </div>
        <div className={styles.menuItem + ' ' + (selectedKey === '/dashboard' ? styles.selected : '')}>
          <Link to="/dashboard" className={styles.menuLink}>{t('menu.dashboard')}</Link>
        </div>
        <div className={styles.menuItem + ' ' + (selectedKey === '/mibooks' ? styles.selected : '')}>
          <Link to="/mibooks" className={styles.menuLink}>{t('menu.miBook')}</Link>
        </div>
        <LanguageSelector/>
      </div>
    </nav>
  );
};

export default MainNav;