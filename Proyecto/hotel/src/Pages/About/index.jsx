import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const About = () => {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
                <img
                    src="https://dev251.kodesolution.com/hoteler/wp-content/uploads/2023/12/about-1.jpg"
                    alt="Mascot Hotel"
                    style={{ width: 340, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                />
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: 36, marginBottom: 12, color: '#1a284d' }}>
                        Welcome to Mascot Hotel
                    </h1>
                    <p style={{ fontSize: 18, color: '#444', marginBottom: 18 }}>
                        Mascot Hotel is a luxury destination where comfort meets elegance. Located in the heart of the city, our hotel offers world-class amenities, exceptional hospitality, and a memorable experience for every guest.
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: 18 }}>
                        <li style={{ marginBottom: 10 }}>
                            <FontAwesomeIcon icon={['fas', 'check-circle']} style={{ color: '#1a284d', marginRight: 8 }} />
                            Spacious & elegant rooms
                        </li>
                        <li style={{ marginBottom: 10 }}>
                            <FontAwesomeIcon icon={['fas', 'check-circle']} style={{ color: '#1a284d', marginRight: 8 }} />
                            Gourmet dining & rooftop bar
                        </li>
                        <li style={{ marginBottom: 10 }}>
                            <FontAwesomeIcon icon={['fas', 'check-circle']} style={{ color: '#1a284d', marginRight: 8 }} />
                            Wellness spa & fitness center
                        </li>
                        <li style={{ marginBottom: 10 }}>
                            <FontAwesomeIcon icon={['fas', 'check-circle']} style={{ color: '#1a284d', marginRight: 8 }} />
                            Conference & event facilities
                        </li>
                    </ul>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <FontAwesomeIcon icon={['fas', 'phone']} style={{ color: '#1a284d' }} />
                        <span style={{ fontWeight: 500, color: '#1a284d' }}>(123) 456-7890</span>
                        <FontAwesomeIcon icon={['fas', 'envelope']} style={{ color: '#1a284d', marginLeft: 16 }} />
                        <span style={{ fontWeight: 500, color: '#1a284d' }}>info@mascothotel.com</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;