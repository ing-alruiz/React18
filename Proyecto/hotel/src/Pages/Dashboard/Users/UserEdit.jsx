import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message, Spin, Select } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, updateData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';

const UserEdit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchData({ endpoint: `/users/${id}`, method: 'GET' })
      .then(data => {
        setUser(data);
        if (data) {
          form.setFieldsValue(data);
        }
      })
      .finally(() => setLoading(false));
  }, [id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateData(`${apiEndpoints.users.endpoint}/${id}`, values);
      message.success('User updated!');
      navigate('/dashboard/users');
    } catch {
      message.error('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <div style={{ textAlign: 'center', marginTop: 64 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: '32px auto' }}>
      <Card title={`Edit User #${id}`}>
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={user}>
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
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Save Changes
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

export default UserEdit;
