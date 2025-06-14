import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message, Spin } from 'antd';
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
    fetchData({ endpoint: `/pets/${id}`, method: 'GET' })
      .then(data => {
        setPet(data);
        if (data) {
          form.setFieldsValue(data);
        }
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

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: 64 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: '32px auto' }}>
      <Card title={`Edit Pet #${id}`}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={pet}
        >
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
