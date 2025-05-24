import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>404 - Page Not Found</h1>
            <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} size="2x" />
        </div>
    );
};

export default NotFound;