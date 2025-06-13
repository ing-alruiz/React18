import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './About.module.css';

const About = () => {
    return (
        <div className={styles.aboutPage}>
            {/* Parallax Hero Section */}
            <section className={styles.parallaxHero}>
                <div className={styles.heroOverlay}>
                    <h1 className={styles.heroTitle}>Welcome to Mascot Hotel</h1>
                    <p className={styles.heroSubtitle}>
                        Where comfort meets elegance in the heart of the city.
                    </p>
                </div>
            </section>

            {/* About Section */}
            <section className={styles.aboutSection}>
                <div className={styles.aboutContent}>
                    <img
                        src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80"
                        alt="Mascot Dog"
                        className={styles.aboutImage}
                    />
                    <div className={styles.aboutText}>
                        <h2>About Mascot Hotel</h2>
                        <p>
                            Mascot Hotel is a luxury destination where comfort meets elegance. Located in the heart of the city, our hotel offers world-class amenities, exceptional hospitality, and a memorable experience for every guest—both human and mascot!
                        </p>
                        <ul className={styles.featuresList}>
                            <li>
                                <FontAwesomeIcon icon={['fas', 'check-circle']} className={styles.icon} />
                                Spacious & elegant mascot-friendly rooms
                            </li>
                            <li>
                                <FontAwesomeIcon icon={['fas', 'check-circle']} className={styles.icon} />
                                Gourmet dining & rooftop bar for you and your mascot
                            </li>
                            <li>
                                <FontAwesomeIcon icon={['fas', 'check-circle']} className={styles.icon} />
                                Wellness spa & fitness center for all guests
                            </li>
                            <li>
                                <FontAwesomeIcon icon={['fas', 'check-circle']} className={styles.icon} />
                                Conference & event facilities for mascot meetups
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Parallax Divider */}
            <section className={styles.parallaxDivider}>
                <div className={styles.dividerOverlay}>
                    <h2>Experience Unmatched Mascot Luxury</h2>
                </div>
            </section>

            {/* Amenities Section */}
            <section className={styles.amenitiesSection}>
                <h2>Our Amenities</h2>
                <div className={styles.amenitiesGrid}>
                    <div className={styles.amenityCard}>
                        <FontAwesomeIcon icon={['fas', 'dog']} className={styles.amenityIcon} />
                        <h3>Mascot Playground</h3>
                        <p>Let your mascots play and socialize in our safe, open playground.</p>
                    </div>
                    <div className={styles.amenityCard}>
                        <FontAwesomeIcon icon={['fas', 'utensils']} className={styles.amenityIcon} />
                        <h3>Pet-Friendly Dining</h3>
                        <p>Enjoy gourmet cuisine with special menus for your mascots.</p>
                    </div>
                    <div className={styles.amenityCard}>
                        <FontAwesomeIcon icon={['fas', 'spa']} className={styles.amenityIcon} />
                        <h3>Spa & Grooming</h3>
                        <p>Pamper your mascots with our exclusive spa and grooming services.</p>
                    </div>
                    <div className={styles.amenityCard}>
                        <FontAwesomeIcon icon={['fas', 'paw']} className={styles.amenityIcon} />
                        <h3>Walking Services</h3>
                        <p>Professional mascot walking and care available on request.</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className={styles.contactSection}>
                <h2>Contact Us</h2>
                <div className={styles.contactInfo}>
                    <div>
                        <FontAwesomeIcon icon={['fas', 'phone']} className={styles.contactIcon} />
                        <span>(123) 456-7890</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={['fas', 'envelope']} className={styles.contactIcon} />
                        <span>info@mascothotel.com</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={['fas', 'map-marker-alt']} className={styles.contactIcon} />
                        <span>123 Main Street, City Center</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;