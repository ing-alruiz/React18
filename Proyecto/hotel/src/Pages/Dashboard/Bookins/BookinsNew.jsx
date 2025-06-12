import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, message, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';

const { RangePicker } = DatePicker;

const BookinsNew = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch users, room types, and services
  useEffect(() => {
    fetchData({ endpoint: '/users', method: 'GET' }).then(setUsers);
    fetchData(apiEndpoints.roomTypes).then(setRoomTypes);
    fetchData(apiEndpoints.services).then(setServices);
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const [checkIn, checkOut] = values.dates.map(d => d.format('YYYY-MM-DD'));
      const newBooking = {
        userId: values.userId,
        petIds: [], // You can add pet selection if needed
        roomTypeId: values.roomTypeId,
        services: values.services || [],
        checkIn,
        checkOut,
        status: 'confirmada',
        total: Number(values.total) || 0,
        deleted: false
      };
      const response = await fetch('http://localhost:4000/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });
      if (!response.ok) throw new Error('Failed to create booking');
      message.success('Booking created!');
      navigate('/dashboard/bookings');
    } catch (e) {
      message.error('Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '32px auto' }}>
      {/* Breadcrumb removed, now handled by Admin layout */}
      <Card title="New Booking">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="userId"
            label="User"
            rules={[{ required: true, message: 'Please select a user' }]}
          >
            <Select
              showSearch
              placeholder="Select user"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
              }
            >
              {users.map(u => (
                <Select.Option key={u.id} value={u.id}>
                  {u.name} ({u.email})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="roomTypeId"
            label="Room Type"
            rules={[{ required: true, message: 'Please select a room type' }]}
          >
            <Select placeholder="Select room type">
              {roomTypes.map(r => (
                <Select.Option key={r.id} value={r.id}>
                  {r.name} ({r.species})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="services"
            label="Services"
          >
            <Select mode="multiple" placeholder="Select services">
              {services.map(s => (
                <Select.Option key={s.id} value={s.id}>
                  {s.title_en}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="dates"
            label="Dates"
            rules={[{ required: true, message: 'Please select check-in and check-out dates' }]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item
            name="total"
            label="Total"
            rules={[{ required: true, message: 'Please enter total amount' }]}
          >
            <Input type="number" min={0} prefix="$" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Create Booking
            </Button>
          </Form.Item>
        </Form>
        <Button style={{ marginTop: 8 }} onClick={() => navigate('/dashboard/bookings')}>
          Cancel
        </Button>
      </Card>
    </div>
  );
};

export default BookinsNew;
