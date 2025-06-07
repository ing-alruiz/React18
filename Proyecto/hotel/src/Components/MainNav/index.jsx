import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './MainNav.module.css';
import MainLogo from '@Components/Logo/MainLogo';
import LanguageSelector from '../LenguageSelector';
import { useAuth } from '@Contexts/Auth/AuthContext.jsx';

const MainNav = ({ className = '', ...props }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedKey = location.pathname === '/' ? '/home' : location.pathname;
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100); // Adjust threshold as needed
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // The nav content as a function to avoid duplication
  const navContent = (extraClass = '') => (
    <nav
      className={`${extraClass} ${className}`}
      {...props}
    >
      <MainLogo className={styles.logoWrapper}/>
      <div className={styles.menu}>
        <div className={styles.topMenu}>
          <div className={styles.menuItem + ' ' + (selectedKey === '/home' ? styles.selected : '')}>
            <Link to="/" className={styles.menuLink}>{t('menu.home')}</Link>
          </div>
          <div className={styles.menuItem + ' ' + (selectedKey === '/about' ? styles.selected : '')}>
            <Link to="/about" className={styles.menuLink}>{t('menu.about')}</Link>
          </div>
          <div className={styles.menuItem + ' ' + (selectedKey === '/book' ? styles.selected : '')}>
            <Link to="/book" className={styles.menuLink}>{t('menu.book')}</Link>
          </div>
          <LanguageSelector/>
        </div>
        <div className={styles.bottomMenu}>
          {/* Show login if not logged in, else dashboard/logout */}
          {!user ? (
            <div className={styles.menuItem}>
              <Link to="/login" className={styles.menuLink}>{t('menu.login') || 'Log In'}</Link>
            </div>
          ) : (
            <>
              <div className={styles.menuItem}>
                <Link to="/dashboard" className={styles.menuLink}>{t('menu.dashboard') || 'Dashboard'}</Link>
              </div>
              <div
                className={styles.menuItem}
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                style={{ cursor: 'pointer' }}
              >
                {t('menu.logout') || 'Log Out'}
              </div>
            </>
          )}
        </div> 
        
      </div>
    </nav>
  );

  return (
    <>
      {navContent(styles.navbar)}
      {/* Sticky nav: visible only when scrolled */}
      {scrolled && navContent(styles.navbarScrolled)}
    </>
  );
};

export default MainNav;