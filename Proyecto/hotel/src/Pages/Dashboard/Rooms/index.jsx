import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Tag, Space, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { fetchData, updateData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';
import { useTranslation } from 'react-i18next';

const ROOMS_ENDPOINT = apiEndpoints.rooms || '/rooms';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(50); // default page size 50
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setLoading(true);
    fetchData(ROOMS_ENDPOINT)
      .then(data => {
        setRooms(
          (data || [])
            .filter(r => !r.deleted)
            .sort((a, b) => (b.id > a.id ? 1 : -1))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (record) => {
    setLoading(true);
    try {
      await updateData(
        typeof ROOMS_ENDPOINT === 'object' ? `${ROOMS_ENDPOINT.endpoint}/${record.id}` : `/rooms/${record.id}`,
        { ...record, deleted: true }
      );
      setRooms(prev => prev.filter(r => r.id !== record.id));
      message.success('Room deleted (soft delete)');
    } catch {
      message.error('Failed to delete room');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: t('dashboard.rooms.id', 'ID'),
      dataIndex: 'id',
      width: 60,
    },
    {
      title: t('dashboard.rooms.roomNumber', 'Room Number'),
      dataIndex: 'roomNumber',
    },
    {
      title: t('dashboard.rooms.roomType', 'Room Type'),
      dataIndex: 'roomTypeId',
    },
    {
      title: t('dashboard.rooms.status', 'Status'),
      dataIndex: 'status',
      render: status => <Tag color={status === 'maintenance' ? 'orange' : 'green'}>{status}</Tag>,
    },
    {
      title: t('dashboard.rooms.floor', 'Floor'),
      dataIndex: 'floor',
    },
    {
      title: t('dashboard.rooms.pets', 'Pets'),
      dataIndex: 'pets',
      render: pets => pets && pets.length > 0 ? pets.join(', ') : '-',
    },
    {
      title: t('dashboard.rooms.notes', 'Notes'),
      dataIndex: 'notes',
    },
    {
      title: t('dashboard.rooms.actions', 'Actions'),
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => navigate(`/dashboard/rooms/${record.id}`)}
          >
            {t('dashboard.rooms.edit', 'Edit')}
          </Button>
          <Popconfirm
            title={t('dashboard.rooms.confirmDelete', 'Are you sure to delete this room?')}
            onConfirm={e => {
              e.stopPropagation();
              handleDelete(record);
            }}
            okText={t('dashboard.rooms.yes', 'Yes')}
            cancelText={t('dashboard.rooms.no', 'No')}
            onCancel={e => e.stopPropagation()}
          >
            <Button icon={<DeleteOutlined />} size="small" danger onClick={e => e.stopPropagation()}>
              {t('dashboard.rooms.delete', 'Delete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>{t('dashboard.rooms.title', 'Rooms')}</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/dashboard/rooms/new')}
        >
          {t('dashboard.rooms.create', 'Create Room')}
        </Button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <span>{t('dashboard.rooms.perPage', 'Rooms per page')}: </span>
        <Select
          value={pageSize}
          onChange={value => setPageSize(value)}
          style={{ width: 80 }}
          options={[10, 20, 30, 50, 100, 200].map(size => ({
            value: size,
            label: size,
          }))}
        />
      </div>
      <Table
        columns={columns}
        dataSource={rooms}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize,
          showSizeChanger: false,
        }}
        scroll={{ y: 500, x: false }} // only vertical scroll, fit to x
        onRow={record => ({
          onClick: () => navigate(`/dashboard/rooms/${record.id}`),
          style: { cursor: 'pointer' }
        })}
      />
    </div>
  );
};

export default RoomsPage;
