import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '../Components/Dashboard/Menu/Menu';

const breadcrumbNameMap = {
  '/': 'Dashboard',
  '/bookings': 'Bookings',
  '/bookings/new': 'New Booking',
  '/bookings/:id': 'Edit Booking',
  '/rooms': 'Rooms',
  '/rooms/new': 'New Room',
  '/rooms/:id': 'Edit Room',
  // Add more routes as needed
};

const AdminLayout = ({ children }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);

    // Remove the first "dashboard" segment to avoid double breadcrumb
    const isDashboard = pathSnippets[0] === 'dashboard';
    const filteredSnippets = isDashboard ? pathSnippets.slice(1) : pathSnippets;

    const extraBreadcrumbItems = filteredSnippets.map((_, index) => {
        const url = `/dashboard${filteredSnippets.length ? '/' : ''}${filteredSnippets.slice(0, index + 1).join('/')}`;
        const name = breadcrumbNameMap[`/${filteredSnippets.slice(0, index + 1).join('/')}`] || filteredSnippets[index];
        return (
            <Breadcrumb.Item key={url}>
                {index < filteredSnippets.length - 1 ? (
                    <Link to={url}>{name}</Link>
                ) : (
                    name
                )}
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [
        <Breadcrumb.Item key="dashboard">
            <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>,
        ...extraBreadcrumbItems
    ];

    return (
        <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', display: 'flex', flexDirection: 'row' }}>
            <Menu />
            <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                <Breadcrumb style={{ marginBottom: 16 }}>
                    {breadcrumbItems}
                </Breadcrumb>
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
