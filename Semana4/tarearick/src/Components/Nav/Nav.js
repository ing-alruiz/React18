import React, { useEffect, useState } from 'react';
import styles from './Nav.module.css'; // Adjust the path as necessary
import logo from '../../assets/images/logo.png'; 
import flag from '../../assets/images/amflg.png';

const Nav = () => {
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
            <div className={styles.logo}>
                <img src={logo} alt="Logo" />
                <h1>My Company</h1>
            </div>
            <div className={styles.hamburger} onClick={toggleMenu}>
                <i className="fa-solid fa-bars"></i>
            </div>
            <ul className={`${styles.navlinks} ${isMenuActive ? styles.active : ''}`}>
                <li><a href="index.html" className="active">Home</a></li>
                <li><a href="blog.html">Personajes</a></li>
                <li><a href="#about">Episodios</a></li>
                <li><a href="#contact">Lugares</a></li>
            </ul>
        </nav>
    );
};

export default Nav;