import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '../../../Components/Dashboard/Menu/Menu';

const Dashboard = () => {
     const { t } = useTranslation();

    return (
        <div >
           Main Dashboard
        </div>
    );
};

export default Dashboard;