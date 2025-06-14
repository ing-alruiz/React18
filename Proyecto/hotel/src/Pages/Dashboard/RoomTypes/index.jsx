import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Tag, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchData, updateData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RoomTypesPage = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    loadRoomTypes();
  }, []);

  const loadRoomTypes = () => {
    setLoading(true);
    fetchData(apiEndpoints.roomTypes)
      .then(data => setRoomTypes((data || []).filter(r => !r.deleted)))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (record) => {
    setLoading(true);
    try {
      await updateData(apiEndpoints.roomType(record.id), { ...record, deleted: true });
      setRoomTypes(prev => prev.filter(r => r.id !== record.id));
      message.success('Room type deleted');
    } catch {
      message.error('Failed to delete room type');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: t('dashboard.roomTypes.id', 'ID'), dataIndex: 'id', width: 60 },
    { title: t('dashboard.roomTypes.species', 'Species'), dataIndex: 'species', render: s => <Tag>{s}</Tag> },
    { title: t('dashboard.roomTypes.name', 'Name'), dataIndex: 'name' },
    { title: t('dashboard.roomTypes.description', 'Description'), dataIndex: 'description' },
    { title: t('dashboard.roomTypes.price', 'Price'), dataIndex: 'price', render: price => <span>${price}</span> },
    {
      title: t('dashboard.roomTypes.actions', 'Actions'),
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => navigate(`/dashboard/room-types/${record.id}`)}
          >
            {t('dashboard.roomTypes.edit', 'Edit')}
          </Button>
          <Popconfirm
            title={t('dashboard.roomTypes.confirmDelete', 'Are you sure to delete this room type?')}
            onConfirm={() => handleDelete(record)}
            okText={t('dashboard.roomTypes.yes', 'Yes')}
            cancelText={t('dashboard.roomTypes.no', 'No')}
          >
            <Button icon={<DeleteOutlined />} size="small" danger>
              {t('dashboard.roomTypes.delete', 'Delete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>{t('dashboard.roomTypes.title', 'Room Types')}</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/dashboard/room-types/new')}>
          {t('dashboard.roomTypes.add', 'Add Room Type')}
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={roomTypes}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default RoomTypesPage;
