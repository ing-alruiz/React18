import React from 'react';
import styles from './Footer.module.css'; // Adjust the path as necessary

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <h2>Contact Us</h2>
            <p id="contact">Email: info@example.com</p>
        </footer>
    );
};

export default Footer;