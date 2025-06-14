import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faCalendar, faDog, faBed, faConciergeBell
} from '@fortawesome/free-solid-svg-icons';
import { fetchData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    bookings: 0,
    pets: 0,
    rooms: 0,
    services: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        // Use .endpoint for each resource
        const [users, bookings, pets, rooms, services] = await Promise.all([
          fetchData({ endpoint: apiEndpoints.users.endpoint, method: 'GET' }),
          fetchData({ endpoint: apiEndpoints.reservations.endpoint, method: 'GET' }),
          fetchData({ endpoint: apiEndpoints.pets.endpoint, method: 'GET' }),
          fetchData({ endpoint: apiEndpoints.roomTypes.endpoint, method: 'GET' }),
          fetchData({ endpoint: apiEndpoints.services.endpoint, method: 'GET' }),
        ]);
        setStats({
          users: Array.isArray(users) ? users.filter(u => !u.deleted).length : 0,
          bookings: Array.isArray(bookings) ? bookings.filter(b => !b.deleted).length : 0,
          pets: Array.isArray(pets) ? pets.filter(p => !p.deleted).length : 0,
          rooms: Array.isArray(rooms) ? rooms.filter(r => !r.deleted).length : 0,
          services: Array.isArray(services) ? services.filter(s => !s.deleted).length : 0,
        });
      } catch {
        // fallback: show zeros
        setStats({
          users: 0,
          bookings: 0,
          pets: 0,
          rooms: 0,
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
      <h1 style={{ marginBottom: 24 }}>Admin Dashboard</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Row gutter={24} style={{ marginBottom: 32 }}>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card>
                <Statistic
                  title="Users"
                  value={stats.users}
                  prefix={<FontAwesomeIcon icon={faUsers} style={{ color: '#0078d4' }} />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card>
                <Statistic
                  title="Bookings"
                  value={stats.bookings}
                  prefix={<FontAwesomeIcon icon={faCalendar} style={{ color: '#52c41a' }} />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card>
                <Statistic
                  title="Pets"
                  value={stats.pets}
                  prefix={<FontAwesomeIcon icon={faDog} style={{ color: '#faad14' }} />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card>
                <Statistic
                  title="Rooms"
                  value={stats.rooms}
                  prefix={<FontAwesomeIcon icon={faBed} style={{ color: '#722ed1' }} />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card>
                <Statistic
                  title="Services"
                  value={stats.services}
                  prefix={<FontAwesomeIcon icon={faConciergeBell} style={{ color: '#eb2f96' }} />}
                />
              </Card>
            </Col>
          </Row>
          <Card title="Overview (Coming Soon)">
            {/* Placeholder for future graphs/charts */}
            <div style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
              Graphs and analytics will be displayed here.
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default Dashboard;