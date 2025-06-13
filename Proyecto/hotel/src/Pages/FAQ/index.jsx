import React, { useEffect, useState } from 'react';
import { Collapse, Card, Spin, Alert } from 'antd';
import { fetchData } from '../../Api/apiService';
import apiEndpoints from '../../Api/apiEndpoints';
import { useTranslation } from 'react-i18next';

const { Panel } = Collapse;

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { i18n } = useTranslation();

  useEffect(() => {
    fetchData({ endpoint: '/faqs', method: 'GET' })
      .then(setFaqs)
      .catch(() => setError('Failed to load FAQs'))
      .finally(() => setLoading(false));
  }, []);

  const lang = i18n.language.startsWith('es') ? 'es' : 'en';

  if (loading) {
    return (
      <div style={{ maxWidth: 800, margin: '2rem auto', textAlign: 'center' }}>
        <Spin />
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ maxWidth: 800, margin: '2rem auto' }}>
        <Alert type="error" message={error} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '2rem'}}>
      <h1 style={{ marginBottom: 24 }}>Frequently Asked Questions</h1>
      <Card>
        <Collapse accordion>
          {faqs.map((faq, idx) => (
            <Panel header={faq[`question_${lang}`] || faq.question} key={faq.id || idx}>
              <p>{faq[`answer_${lang}`] || faq.answer}</p>
            </Panel>
          ))}
        </Collapse>
      </Card>
    </div>
  );
};

export default FAQ;
