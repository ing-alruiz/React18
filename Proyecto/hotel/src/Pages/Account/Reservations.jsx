import React, { useEffect, useState } from 'react';
import { Card, Button, List, Spin, message } from 'antd';
import { useAuth } from '../../Contexts/Auth/AuthContext.jsx';
import { fetchData } from '../../Api/apiService';
import apiEndpoints from '../../Api/apiEndpoints';
import { useTranslation } from 'react-i18next';

const Reservations = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchData(apiEndpoints.userReservations(user.id))
        .then(setReservations)
        .catch(() => message.error(t('account.reservationsLoadError')))
        .finally(() => setLoading(false));
    }
  }, [user, t]);

  if (loading && !reservations.length) {
    return <Spin style={{ margin: 40 }} />;
  }

  return (
    <Card title={t('account.myReservations')} style={{ maxWidth: 600 }}>
      <Button type="primary" style={{ marginBottom: 16 }}>
        {t('account.createReservation')}
      </Button>
      <List
        dataSource={reservations}
        renderItem={(r) => (
          <List.Item>
            <List.Item.Meta
              title={`${t('account.reservation')} #${r.id}`}
              description={`${t('account.pet')}: ${r.petName || r.pet || ''} | ${t('account.room')}: ${r.room || r.roomTypeId || ''} | ${t('account.date')}: ${r.date || r.checkIn || ''}`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Reservations;
