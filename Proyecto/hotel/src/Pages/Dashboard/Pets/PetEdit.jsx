import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message, Spin, Select } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, updateData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';

const PetEdit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchData(`${apiEndpoints.pets.endpoint}/${id}`)
      .then(data => {
        setPet(data);
        form.setFieldsValue(data);
      })
      .finally(() => setLoading(false));
  }, [id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateData(`${apiEndpoints.pets.endpoint}/${id}`, values);
      message.success('Pet updated!');
      navigate('/dashboard/pets');
    } catch {
      message.error('Failed to update pet');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !pet) {
    return (
      <div style={{ textAlign: 'center', marginTop: 64 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: '32px auto' }}>
      <Card title={`Edit Pet #${id}`}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="breed" label="Breed">
            <Input />
          </Form.Item>
          <Form.Item name="userId" label="Owner ID">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Save Changes
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

export default PetEdit;
