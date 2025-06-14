import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Card, message, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, updateData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';

const RoomTypeEdit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [roomType, setRoomType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchData(`${apiEndpoints.roomTypes.endpoint}/${id}`)
      .then(data => {
        setRoomType(data);
        form.setFieldsValue(data);
      })
      .finally(() => setLoading(false));
  }, [id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateData(`${apiEndpoints.roomTypes.endpoint}/${id}`, values);
      message.success('Room type updated!');
      navigate('/dashboard/room-types');
    } catch {
      message.error('Failed to update room type');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !roomType) {
    return (
      <div style={{ textAlign: 'center', marginTop: 64 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: '32px auto' }}>
      <Card title={`Edit Room Type #${id}`}>
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
              Save Changes
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

export default RoomTypeEdit;
