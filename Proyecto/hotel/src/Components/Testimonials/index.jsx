import React, { useEffect, useState } from 'react';
import { Card, Rate, Spin, Alert } from 'antd';
import { fetchData } from '@Api/apiService';
import apiEndpoints from '@Api/apiEndpoints';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getTestimonials = async () => {
      try {
        const data = await fetchData(apiEndpoints.testimonials);
        setTestimonials(data);
      } catch (err) {
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };
    getTestimonials();
  }, []);

  if (loading) return <Spin />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <div style={{ padding: '2rem', background: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 32 }}>Testimonials</h2>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        {testimonials.map(({ id, name, comment, rating }) => (
          <Card key={id} style={{ width: 320, margin: '0 8px' }}>
            <Rate disabled defaultValue={rating} />
            <p style={{ fontStyle: 'italic', margin: '16px 0' }}>"{comment}"</p>
            <p style={{ fontWeight: 'bold', marginBottom: 0 }}>{name}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;