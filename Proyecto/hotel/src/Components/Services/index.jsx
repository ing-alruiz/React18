import React, { useEffect, useState } from 'react';
import { Card, Spin, Alert, Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchData } from '@Api/apiService';
import apiEndpoints from '@Api/apiEndpoints';
import styles from './Services.module.css';


const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await fetchData(apiEndpoints.services);
        console.log('Services data:', data); // Debugging line
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

  return (
    <div className={styles.servicesSection}>
        <h2 className={styles.title}>Our Services</h2>
        <Row gutter={[24, 24]} justify="center" className={styles.servicesRow}>
        {services.map(({ id, icon, title, description, image }) => (
            <Col xs={24} sm={12} md={8} key={id}>
                <Card className={styles.card} bordered={false}>
                    {image && (
                        <img src={image} alt={title} className={styles.cardImageTop} />
                    )}
                    <div className={styles.cardContent}>
                        <div className={styles.iconWrapper}>
                            <FontAwesomeIcon icon={icon} size="2x" />
                        </div>
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </div>
                </Card>
            </Col>
        ))}
        </Row>
    </div>
    );
};

export default Services;