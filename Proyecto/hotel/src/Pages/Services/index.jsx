import React, { useEffect, useState } from 'react';
import { Card, Spin, Alert, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../Api/apiService';
import apiEndpoints from '../../Api/apiEndpoints';
import { useTranslation } from 'react-i18next';
import styles from './Services.module.css';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(apiEndpoints.services)
      .then(setServices)
      .catch(() => setError('Failed to load services'))
      .finally(() => setLoading(false));
  }, []);

  const lang = i18n.language.startsWith('es') ? 'es' : 'en';

  if (loading) return <Spin />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <div className={styles.servicesPage}>
      <h1>{lang === 'es' ? 'Nuestros Servicios' : 'Our Services'}</h1>
      <Row gutter={[24, 24]} justify="center">
        {services.map(service => (
          <Col xs={24} sm={12} md={8} key={service.id}>
            <Card
              hoverable
              className={styles.card}
              onClick={() => navigate(`/services/${service.id}`)}
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
              <Card.Meta
                title={service[`title_${lang}`]}
                description={service[`description_${lang}`]}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ServicesPage;
