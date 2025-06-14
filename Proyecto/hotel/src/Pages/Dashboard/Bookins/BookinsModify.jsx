import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, DatePicker, Select, message, Card, Spin } from 'antd';
import { fetchData, updateData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const BookinsModify = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
  const [users, setUsers] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [services, setServices] = useState([]);
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    // Fetch booking, users, roomTypes, services, pets in parallel
    Promise.all([
      fetchData({ endpoint: `/reservations/${id}`, method: 'GET' }),
      fetchData(apiEndpoints.users),
      fetchData(apiEndpoints.roomTypes),
      fetchData(apiEndpoints.services),
      fetchData(apiEndpoints.pets)
    ]).then(([bookingData, usersData, roomTypesData, servicesData, petsData]) => {
      setBooking(bookingData);
      setUsers(usersData);
      setRoomTypes(roomTypesData);
      setServices(servicesData);
      setPets(petsData);
      if (bookingData) {
        form.setFieldsValue({
          userId: bookingData.userId,
          petIds: bookingData.petIds,
          roomTypeId: bookingData.roomTypeId,
          services: bookingData.services,
          dates: [
            bookingData.checkIn ? dayjs(bookingData.checkIn) : null,
            bookingData.checkOut ? dayjs(bookingData.checkOut) : null
          ],
          total: bookingData.total
        });
      }
    }).finally(() => setLoading(false));
  }, [id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const [checkIn, checkOut] = values.dates.map(d => d.format('YYYY-MM-DD'));
      const updatedBooking = {
        ...booking,
        userId: values.userId,
        roomTypeId: values.roomTypeId,
        services: values.services || [],
        checkIn,
        checkOut,
        total: Number(values.total) || 0
      };
      await updateData(`/reservations/${id}`, updatedBooking);
      message.success('Booking updated!');
      navigate('/dashboard/bookings');
    } catch (e) {
      message.error('Failed to update booking');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !booking) {
    return (
      <div style={{ textAlign: 'center', marginTop: 64 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: '32px auto' }}>
      <Card title={`Edit Booking #${id}`}>
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={booking}>
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
            name="petIds"
            label="Mascots"
            rules={[{ required: true, message: 'Please select at least one mascot' }]}
          >
            <Select
              mode="multiple"
              placeholder="Select mascots"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
              }
            >
              {pets.map(pet => (
                <Select.Option key={pet.id} value={pet.id}>
                  {pet.name} ({pet.species}) - {pet.breed}
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
          {/* Owner info display */}
          {booking && users.length > 0 && (
            <Card type="inner" title="Owner Information" style={{ marginBottom: 16 }}>
              <div>
                <strong>Name:</strong> {users.find(u => u.id === booking.userId)?.name || '-'}
              </div>
              <div>
                <strong>Email:</strong> {users.find(u => u.id === booking.userId)?.email || '-'}
              </div>
              <div>
                <strong>Phone:</strong> {users.find(u => u.id === booking.userId)?.phone || '-'}
              </div>
            </Card>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Save Changes
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

export default BookinsModify;
