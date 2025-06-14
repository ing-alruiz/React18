import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Tag, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { fetchData, updateData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';
import { useTranslation } from 'react-i18next';

const BOOKINGS_ENDPOINT = apiEndpoints.reservations || '/reservations';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      title: t('dashboard.bookings.id', 'ID'),
      dataIndex: 'id',
      width: 60,
    },
    {
      title: t('dashboard.bookings.user', 'User'),
      dataIndex: 'userId',
      render: userId => <span>{t('dashboard.bookings.userLabel', 'User')} #{userId}</span>,
    },
    {
      title: t('dashboard.bookings.room', 'Room'),
      dataIndex: 'roomTypeId',
      render: roomTypeId => <span>{t('dashboard.bookings.roomLabel', 'Room')} #{roomTypeId}</span>,
    },
    {
      title: t('dashboard.bookings.checkIn', 'Check In'),
      dataIndex: 'checkIn',
    },
    {
      title: t('dashboard.bookings.checkOut', 'Check Out'),
      dataIndex: 'checkOut',
    },
    {
      title: t('dashboard.bookings.status', 'Status'),
      dataIndex: 'status',
      render: status => <Tag color={status === 'confirmada' ? 'green' : 'orange'}>{status}</Tag>,
    },
    {
      title: t('dashboard.bookings.total', 'Total'),
      dataIndex: 'total',
      render: total => <span>${total}</span>,
    },
    {
      title: t('dashboard.bookings.actions', 'Actions'),
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => navigate(`/dashboard/bookings/${record.id}`)}
          >
            {t('dashboard.bookings.edit', 'Edit')}
          </Button>
          <Popconfirm
            title={t('dashboard.bookings.confirmDelete', 'Are you sure to delete this booking?')}
            onConfirm={() => handleDelete(record)}
            okText={t('dashboard.bookings.yes', 'Yes')}
            cancelText={t('dashboard.bookings.no', 'No')}
          >
            <Button icon={<DeleteOutlined />} size="small" danger>
              {t('dashboard.bookings.delete', 'Delete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>{t('dashboard.bookings.title', 'Latest Bookings')}</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/dashboard/bookings/new')}
        >
          {t('dashboard.bookings.create', 'Create Booking')}
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
