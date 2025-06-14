import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchData, updateData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PetsPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    fetchData(apiEndpoints.pets)
      .then(data => setPets((data || []).filter(p => !p.deleted)))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (record) => {
    setLoading(true);
    try {
      await updateData(apiEndpoints.pet(record.id), { ...record, deleted: true });
      setPets(prev => prev.filter(p => p.id !== record.id));
      message.success('Pet deleted (soft delete)');
    } catch {
      message.error('Failed to delete pet');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: t('dashboard.pets.id', 'ID'), dataIndex: 'id', width: 60 },
    { title: t('dashboard.pets.name', 'Name'), dataIndex: 'name' },
    { title: t('dashboard.pets.type', 'Type'), dataIndex: 'species' },
    { title: t('dashboard.pets.breed', 'Breed'), dataIndex: 'breed' },
    { title: t('dashboard.pets.owner', 'Owner'), dataIndex: 'userId' },
    { title: 'Age', dataIndex: 'age' },
    { title: 'Size', dataIndex: 'size' },
    { title: 'Weight (kg)', dataIndex: 'weight' },
    { title: 'Special Needs', dataIndex: 'specialNeeds' },
    { title: 'Temperament', dataIndex: 'temperament' },
    { title: 'Vaccines', dataIndex: 'vaccines' },
    { title: 'Photo', dataIndex: 'photo',
      render: (photo) => photo ? <img src={photo} alt="pet" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} /> : null
    },
    {
      title: t('dashboard.pets.actions', 'Actions'),
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => navigate(`/dashboard/pets/${record.id}`)}
          >
            {t('dashboard.pets.edit', 'Edit')}
          </Button>
          <Popconfirm
            title={t('dashboard.pets.confirmDelete', 'Are you sure to delete this pet?')}
            onConfirm={() => handleDelete(record)}
            okText={t('dashboard.pets.yes', 'Yes')}
            cancelText={t('dashboard.pets.no', 'No')}
          >
            <Button icon={<DeleteOutlined />} size="small" danger>
              {t('dashboard.pets.delete', 'Delete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>{t('dashboard.pets.title', 'Pets')}</h2>
        <Button type="primary" onClick={() => navigate('/dashboard/pets/new')}>
          {t('dashboard.pets.add', 'Add Pet')}
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={pets}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default PetsPage;
