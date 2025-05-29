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
        {testimonials.map(({ id, name, comment, rating, image }) => (
          <Card key={id} style={{ width: 340, margin: '0 8px', padding: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={image || '/images/default-avatar.png'}
                alt={name}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: 16,
                  flexShrink: 0,
                  background: '#eee'
                }}
              />
              <div>
                <Rate disabled defaultValue={rating} />
                <p style={{ fontStyle: 'italic', margin: '12px 0 8px 0' }}>"{comment}"</p>
                <p style={{ fontWeight: 'bold', marginBottom: 0 }}>{name}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;