import React, { useEffect, useState } from 'react';
import { Card, Spin, Alert, Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchData } from '../../Api/apiService';
import apiEndpoints from '../../Api/apiEndpoints';
import styles from './Services.module.css';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await fetchData(apiEndpoints.services);
        setServices(data);
      } catch (err) {
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };
    getServices();
  }, []);

  if (loading) return <Spin />;
  if (error) return <Alert type="error" message={error} />;

  const lang = i18n.language.startsWith('es') ? 'es' : 'en';

  return (
    <div className={styles.servicesSection}>
      <h2 className={styles.title}>
        {lang === 'es' ? 'Nuestros Servicios' : 'Our Services'}
      </h2>
      <Row gutter={[24, 24]} justify="center" className={styles.servicesRow}>
        {services.map((service) => (
          <Col xs={24} sm={12} md={8} key={service.id}>
            <Card className={styles.card} bordered={false}>
              {service.image && (
                <img src={service.image} alt={service[`title_${lang}`]} className={styles.cardImageTop} />
              )}
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  <FontAwesomeIcon icon={service.icon} size="2x" />
                </div>
                <h3>{service[`title_${lang}`]}</h3>
                <p>{service[`description_${lang}`]}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Services;