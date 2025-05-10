import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'; // Import your LanguageSwitcher component
import styles from './Nav.module.css'; // Adjust the path as necessary

const Nav = () => {
    const { t } = useTranslation();
    const [isSticky, setIsSticky] = useState(false);
    const [isMenuActive, setIsMenuActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
    };

    return (
        <nav className={`${styles.nav} ${isSticky ? styles.sticky : ''}`}>
            <div className={styles.hamburger} onClick={toggleMenu}>
                <FontAwesomeIcon icon={['fas', 'bars']} />
            </div>
            <ul className={`${styles.navlinks} ${isMenuActive ? styles.active : ''}`}>
                <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? styles.active : ''}
                    >
                        {t('Nav.home')}
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/porfolio" 
                        className={({ isActive }) => isActive ? styles.active : ''}
                    >
                        {t('Nav.porfolio')}
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/timeline" 
                        className={({ isActive }) => isActive ? styles.active : ''}
                    >
                        {t('Nav.timeline')}
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/skills" 
                        className={({ isActive }) => isActive ? styles.active : ''}
                    >
                        {t('Nav.skills')}
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/contact" 
                        className={({ isActive }) => isActive ? styles.active : ''}
                    >
                        {t('Nav.contact')}
                    </NavLink>
                </li>
            </ul>
            <LanguageSwitcher />
        </nav>
    );
};

export default Nav;