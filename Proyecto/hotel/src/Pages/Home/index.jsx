import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Home.module.css';
import video1 from '@Videos/video1.mp4';
import video2 from '@Videos/video2.mp4';
import video3 from '@Videos/video3.mp4';
import MainNav from '@Components/MainNav';
import Footer from '@Components/Footer';
import Testimonials from '@Components/Testimonials';
import ReservationBar from '@Components/ReservationBar';
import Services from '@Components/Services';
import PetAdvantages from '../../Components/PedAdvantages';

const videoList = [video1, video2, video3];


const Home = () => {
    const { t } = useTranslation();
    const [currentVideo, setCurrentVideo] = useState(0);
    const videoRef = useRef(null);

    const handleVideoEnd = () => {
        setCurrentVideo((prev) => (prev + 1) % videoList.length);
    };

    return (
        <div>
            {/* Main video background section */}
            <div className={styles.videoBackground}>
                <video
                    ref={videoRef}
                    src={videoList[currentVideo]}
                    autoPlay
                    loop={false}
                    muted
                    playsInline
                    className={styles.bgVideo}
                    onEnded={handleVideoEnd}
                    />
                <div className={styles.gradientOverlay} />
                <div className={styles.navWrapper}>
                    <MainNav />
                </div>
                <div className={styles.content}>
                    <h1 className={styles.slogan}>{t('slogan')}</h1>
                    <ReservationBar className={styles.reservationBar}/>
                </div>
            </div>

            {/* More content sections below */}
            <div style={{ padding: '2rem', background: '#fff', color: '#222' }}>
                <h2>About Our Hotel</h2>
                <p>
                Welcome to our hotel! Enjoy your stay with beautiful views and excellent service.
                </p>
            </div>
            <Services />
            <PetAdvantages />
            <Testimonials />
            <Footer />
        </div>
    );
};

export default Home;