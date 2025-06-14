import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faCalendar, faDog, faBed, faConciergeBell
} from '@fortawesome/free-solid-svg-icons';
import { fetchData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    bookings: 0,
    pets: 0,
    roomsAvailable: 0,
    roomsTotal: 0,
    services: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const [users, bookings, pets, rooms, services] = await Promise.all([
          fetchData({ endpoint: apiEndpoints.users.endpoint, method: 'GET' }),
          fetchData({ endpoint: apiEndpoints.reservations.endpoint, method: 'GET' }),
          fetchData({ endpoint: apiEndpoints.pets.endpoint, method: 'GET' }),
          fetchData({ endpoint: apiEndpoints.rooms.endpoint, method: 'GET' }),
          fetchData({ endpoint: apiEndpoints.services.endpoint, method: 'GET' }),
        ]);
        const roomsArr = Array.isArray(rooms) ? rooms.filter(r => !r.deleted) : [];
        setStats({
          users: Array.isArray(users) ? users.filter(u => !u.deleted).length : 0,
          bookings: Array.isArray(bookings) ? bookings.filter(b => !b.deleted).length : 0,
          pets: Array.isArray(pets) ? pets.filter(p => !p.deleted).length : 0,
          roomsAvailable: roomsArr.filter(r => r.status === 'available').length,
          roomsTotal: roomsArr.length,
          services: Array.isArray(services) ? services.filter(s => !s.deleted).length : 0,
        });
      } catch {
        setStats({
          users: 0,
          bookings: 0,
          pets: 0,
          roomsAvailable: 0,
          roomsTotal: 0,
          services: 0,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>{t('dashboard.title', 'Admin Dashboard')}</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Row gutter={24} style={{ marginBottom: 32 }}>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card
                hoverable
                onClick={() => navigate('/dashboard/users')}
                style={{ cursor: 'pointer' }}
              >
                <Statistic
                  title={t('dashboard.cards.users', 'Users')}
                  value={stats.users}
                  prefix={<FontAwesomeIcon icon={faUsers} style={{ color: '#0078d4' }} />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card
                hoverable
                onClick={() => navigate('/dashboard/bookings')}
                style={{ cursor: 'pointer' }}
              >
                <Statistic
                  title={t('dashboard.cards.bookings', 'Bookings')}
                  value={stats.bookings}
                  prefix={<FontAwesomeIcon icon={faCalendar} style={{ color: '#52c41a' }} />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card
                hoverable
                onClick={() => navigate('/dashboard/pets')}
                style={{ cursor: 'pointer' }}
              >
                <Statistic
                  title={t('dashboard.cards.pets', 'Pets')}
                  value={stats.pets}
                  prefix={<FontAwesomeIcon icon={faDog} style={{ color: '#faad14' }} />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card
                hoverable
                onClick={() => navigate('/dashboard/rooms')}
                style={{ cursor: 'pointer' }}
              >
                <Statistic
                  title={t('dashboard.cards.rooms', 'Rooms')}
                  value={stats.roomsAvailable}
                  formatter={() => (
                    <span>
                      <span style={{ color: '#52c41a' }}>{stats.roomsAvailable}</span>
                      <span style={{ color: '#aaa' }}> / {stats.roomsTotal}</span>
                    </span>
                  )}
                  prefix={<FontAwesomeIcon icon={faBed} style={{ color: '#52c41a' }} />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card
                hoverable
                onClick={() => navigate('/dashboard/services')}
                style={{ cursor: 'pointer' }}
              >
                <Statistic
                  title={t('dashboard.cards.services', 'Services')}
                  value={stats.services}
                  prefix={<FontAwesomeIcon icon={faConciergeBell} style={{ color: '#eb2f96' }} />}
                />
              </Card>
            </Col>
          </Row>
          <Card title={t('dashboard.overview', 'Overview (Coming Soon)')}>
            {/* Placeholder for future graphs/charts */}
            <div style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
              {t('dashboard.graphsPlaceholder', 'Graphs and analytics will be displayed here.')}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default Dashboard;