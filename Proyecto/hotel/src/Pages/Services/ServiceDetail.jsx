import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Spin, Alert, Button } from 'antd';
import { fetchData } from '../../Api/apiService';
import apiEndpoints from '../../Api/apiEndpoints';
import { useTranslation } from 'react-i18next';
import styles from './Services.module.css';

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchData({ endpoint: `/services/${id}`, method: 'GET' })
      .then(setService)
      .catch(() => setError('Failed to load service'))
      .finally(() => setLoading(false));
  }, [id]);

  const lang = i18n.language.startsWith('es') ? 'es' : 'en';

  if (loading) return <Spin />;
  if (error) return <Alert type="error" message={error} />;
  if (!service) return null;

  return (
    <div className={styles.serviceDetailPage}>
      <Button type="link">
        <Link to="/services">{lang === 'es' ? 'Volver a Servicios' : 'Back to Services'}</Link>
      </Button>
      <Card
        title={service[`title_${lang}`]}
        cover={
          service.image ? (
            <img
              alt={service[`title_${lang}`]}
              src={service.image}
              className={styles.cardImageTop}
            />
          ) : null
        }
      >
        <p>{service[`description_${lang}`]}</p>
        {/* Add more details if available */}
      </Card>
    </div>
  );
};

export default ServiceDetail;
