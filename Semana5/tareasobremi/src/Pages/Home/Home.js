import React from 'react';
import styles from './Home.module.css';
import { useTranslation } from 'react-i18next';
import Typical from 'react-typical'; // Import react-typical
import heroImage from '../../Resources/Images/Me.png'; // Import the image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon

const Home = () => {
    const { t } = useTranslation();

    // List of items for the typing effect
    const descriptionItems = t('Home.description', { returnObjects: true });

    return (
        <>
            <div className={styles.home}>
                <div className={styles.iam}>
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
                    <img src={heroImage} alt="Hero" className={styles.heroImage} />
                </div>
                <div className={styles.heroSocials}>
                    <div>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab','github']}/></a>
                    </div>
                    <div>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab','linkedin-in']}/></a>
                    </div>
                    <div>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab','whatsapp']}/></a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;