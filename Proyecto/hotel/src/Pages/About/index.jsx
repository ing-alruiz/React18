import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const About = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>About Us</h1>
            <FontAwesomeIcon icon={['far', 'smile']} size="2x" />
        </div>
    );
};

export default About;