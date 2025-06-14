import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Card, message, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';

const RoomNew = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await createData(apiEndpoints.rooms, { ...values, pets: [] });
      message.success('Room created!');
      navigate('/dashboard/rooms');
    } catch {
      message.error('Failed to create room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '32px auto' }}>
      <Card title="Create Room">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="roomNumber" label="Room Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="roomTypeId" label="Room Type ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="available">Available</Select.Option>
              <Select.Option value="maintenance">Maintenance</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="floor" label="Floor" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="notes" label="Notes">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Create
            </Button>
          </Form.Item>
          <Button onClick={() => navigate('/dashboard/rooms')} block>
            Cancel
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default RoomNew;
