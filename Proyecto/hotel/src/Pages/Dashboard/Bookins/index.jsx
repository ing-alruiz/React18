import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Tag, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { fetchData, updateData } from '@Api/apiService';
import apiEndpoints from '@Api/apiEndpoints';

const BOOKINGS_ENDPOINT = apiEndpoints.reservations || '/reservations';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch bookings on mount
  useEffect(() => {
    setLoading(true);
    fetchData(BOOKINGS_ENDPOINT)
      .then(data => {
        // Only show not deleted bookings, latest first
        setBookings(
          (data || [])
            .filter(b => !b.deleted)
            .sort((a, b) => (b.id > a.id ? 1 : -1))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  // Soft delete booking
  const handleDelete = async (record) => {
    setLoading(true);
    try {
      // Soft delete: set deleted=true
      await updateData(`${BOOKINGS_ENDPOINT}/${record.id}`, { ...record, deleted: true });
      setBookings(prev => prev.filter(b => b.id !== record.id));
      message.success('Booking deleted (soft delete)');
    } catch {
      message.error('Failed to delete booking');
    } finally {
      setLoading(false);
    }
  };

  // Columns for the table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
    },
    {
      title: 'User',
      dataIndex: 'userId',
      render: userId => <span>User #{userId}</span>,
    },
    {
      title: 'Room',
      dataIndex: 'roomTypeId',
      render: roomTypeId => <span>Room #{roomTypeId}</span>,
    },
    {
      title: 'Check In',
      dataIndex: 'checkIn',
    },
    {
      title: 'Check Out',
      dataIndex: 'checkOut',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: status => <Tag color={status === 'confirmada' ? 'green' : 'orange'}>{status}</Tag>,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      render: total => <span>${total}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => navigate(`/dashboard/bookings/${record.id}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this booking?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} size="small" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>Latest Bookings</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/dashboard/bookings/new')}
        >
          Create Booking
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={bookings}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        onRow={record => ({
          onClick: () => navigate(`/dashboard/bookings/${record.id}`),
          style: { cursor: 'pointer' }
        })}
      />
    </div>
  );
};

export default BookingsPage;
