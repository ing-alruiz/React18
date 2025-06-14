import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';

const PetNew = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await createData(apiEndpoints.pets, values);
      message.success('Pet created!');
      navigate('/dashboard/pets');
    } catch {
      message.error('Failed to create pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '32px auto' }}>
      <Card title="Add Pet">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="species" label="Species" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="breed" label="Breed">
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age">
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item name="size" label="Size">
            <Input />
          </Form.Item>
          <Form.Item name="weight" label="Weight (kg)">
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item name="specialNeeds" label="Special Needs">
            <Input />
          </Form.Item>
          <Form.Item name="temperament" label="Temperament">
            <Input />
          </Form.Item>
          <Form.Item name="vaccines" label="Vaccines">
            <Input placeholder="Comma separated (e.g. Rabies, Parvovirus)" />
          </Form.Item>
          <Form.Item name="photo" label="Photo URL">
            <Input />
          </Form.Item>
          <Form.Item name="userId" label="Owner ID">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Create
            </Button>
          </Form.Item>
          <Button onClick={() => navigate('/dashboard/pets')} block>
            Cancel
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default PetNew;
