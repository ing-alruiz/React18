import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '../../../Components/Dashboard/Menu/Menu';

const Dashboard = () => {
     const { t } = useTranslation();

    return (
        <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Menu />
            <h1>{t('welcome')}</h1>
            <Button type="primary" style={{ margin: '10px' }}>Ant Design Button</Button>
            <FontAwesomeIcon icon={['fas', 'home']} size="2x" />
        </div>
    );
};

export default Dashboard;