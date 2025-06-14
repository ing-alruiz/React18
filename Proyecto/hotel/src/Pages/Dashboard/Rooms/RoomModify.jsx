import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Card, message, Spin, Select } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, updateData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';

const RoomModify = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchData({ endpoint: `/rooms/${id}`, method: 'GET' })
      .then(data => {
        setRoom(data);
        if (data) {
          form.setFieldsValue(data);
        }
      })
      .finally(() => setLoading(false));
  }, [id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateData(`${apiEndpoints.rooms.endpoint}/${id}`, values);
      message.success('Room updated!');
      navigate('/dashboard/rooms');
    } catch {
      message.error('Failed to update room');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !room) {
    return (
      <div style={{ textAlign: 'center', marginTop: 64 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: '32px auto' }}>
      <Card title={`Edit Room #${id}`}>
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={room}>
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
              Save Changes
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

export default RoomModify;
