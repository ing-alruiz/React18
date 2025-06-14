import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';

const ServiceNew = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await createData(apiEndpoints.services, values);
      message.success('Service created!');
      navigate('/dashboard/services');
    } catch {
      message.error('Failed to create service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '32px auto' }}>
      <Card title="Add Service">
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
              Create
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

export default ServiceNew;
