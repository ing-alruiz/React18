import React from 'react';
import styles from './Home.module.css';
import { useTranslation } from 'react-i18next';
import Typical from 'react-typical'; // Import react-typical

const Home = () => {
    const { t } = useTranslation();

    // List of items for the typing effect
    const descriptionItems = t('Home.description', { returnObjects: true });

    return (
        <>
            <div className={styles.home}>
                <h3>{t('Home.welcome')}</h3>
                <h1>{t('Home.name')}</h1>
                <p>
                    {t('Home.pasionate')}{' '}
                    <Typical
                        steps={descriptionItems.flatMap((item) => [item, 2000, ''])} // Type each item, pause, then delete
                        loop={Infinity} // Loop infinitely
                        wrapper="span" // Wrap the text in a span
                    />
                </p>
                <button>{t('Home.button')}</button>
            </div>
            <div className={styles.hero}>
                <img src="https://via.placeholder.com/150" alt="Hero" className={styles.heroImage} />
                <div className={styles.heroSocials}>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
            </div>
        </>
    );
};

export default Home;