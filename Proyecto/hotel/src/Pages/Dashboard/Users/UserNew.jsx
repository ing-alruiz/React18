import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';

const UserNew = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await createData(apiEndpoints.users, values);
      message.success('User created!');
      navigate('/dashboard/users');
    } catch {
      message.error('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '32px auto' }}>
      <Card title="Add User">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role">
            <Select allowClear>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="cliente">Cliente</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Create
            </Button>
          </Form.Item>
          <Button onClick={() => navigate('/dashboard/users')} block>
            Cancel
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default UserNew;
