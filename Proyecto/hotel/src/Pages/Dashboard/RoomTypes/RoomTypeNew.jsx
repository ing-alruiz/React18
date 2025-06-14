import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';

const RoomTypeNew = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await createData(apiEndpoints.roomTypes, values);
      message.success('Room type created!');
      navigate('/dashboard/room-types');
    } catch {
      message.error('Failed to create room type');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '32px auto' }}>
      <Card title="Add Room Type">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="species" label="Species" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={0} prefix="$" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Create
            </Button>
          </Form.Item>
          <Button onClick={() => navigate('/dashboard/room-types')} block>
            Cancel
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default RoomTypeNew;
