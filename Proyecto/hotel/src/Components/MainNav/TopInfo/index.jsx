import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TopInfo = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            color: 'inherit'
        }}>
            <div style={{ display: 'flex', gap: '20px' }}>
                <span>
                    <FontAwesomeIcon icon={['fas', 'envelope']} style={{ marginRight: 6 }} />
                    info@hotelmascotasnobles.com
                </span>
                <span>
                    <FontAwesomeIcon icon={['fas', 'map-marker-alt']} style={{ marginRight: 6 }} />
                    Heredia, San Pablo
                </span>
                <span>
                    <FontAwesomeIcon icon={['fas', 'phone']} style={{ marginRight: 6 }} />
                    (+506) 8562-5736
                </span>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <FontAwesomeIcon icon={['fab', 'twitter']} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                </a>
            </div>
        </div>
    );
};

export default TopInfo;