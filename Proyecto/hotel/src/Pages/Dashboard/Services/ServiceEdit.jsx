import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, updateData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';

const ServiceEdit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchData({ endpoint: `/services/${id}`, method: 'GET' })
      .then(data => {
        setService(data);
        if (data) {
          form.setFieldsValue(data);
        }
      })
      .finally(() => setLoading(false));
  }, [id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateData(`${apiEndpoints.services.endpoint}/${id}`, values);
      message.success('Service updated!');
      navigate('/dashboard/services');
    } catch {
      message.error('Failed to update service');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !service) {
    return (
      <div style={{ textAlign: 'center', marginTop: 64 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: '32px auto' }}>
      <Card title={`Edit Service #${id}`}>
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={service}>
          <Form.Item name="title_en" label="Title (EN)" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="title_es" label="Title (ES)" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description_en" label="Description (EN)">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="description_es" label="Description (ES)">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Save Changes
            </Button>
          </Form.Item>
          <Button onClick={() => navigate('/dashboard/services')} block>
            Cancel
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ServiceEdit;
