import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchData, updateData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ServicesAdminPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    fetchData(apiEndpoints.services)
      .then(data => setServices((data || []).filter(s => !s.deleted)))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (record) => {
    setLoading(true);
    try {
      await updateData({ endpoint: `/services/${record.id}`, method: 'PATCH' }, { ...record, deleted: true });
      setServices(prev => prev.filter(s => s.id !== record.id));
      message.success('Service deleted (soft delete)');
    } catch {
      message.error('Failed to delete service');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: t('dashboard.services.id', 'ID'), dataIndex: 'id', width: 60 },
    { title: t('dashboard.services.titleEn', 'Title (EN)'), dataIndex: 'title_en' },
    { title: t('dashboard.services.titleEs', 'Title (ES)'), dataIndex: 'title_es' },
    { title: t('dashboard.services.descriptionEn', 'Description (EN)'), dataIndex: 'description_en' },
    { title: t('dashboard.services.descriptionEs', 'Description (ES)'), dataIndex: 'description_es' },
    {
      title: t('dashboard.services.actions', 'Actions'),
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => navigate(`/dashboard/services/${record.id}`)}
          >
            {t('dashboard.services.edit', 'Edit')}
          </Button>
          <Popconfirm
            title={t('dashboard.services.confirmDelete', 'Are you sure to delete this service?')}
            onConfirm={() => handleDelete(record)}
            okText={t('dashboard.services.yes', 'Yes')}
            cancelText={t('dashboard.services.no', 'No')}
          >
            <Button icon={<DeleteOutlined />} size="small" danger>
              {t('dashboard.services.delete', 'Delete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>{t('dashboard.services.title', 'Services')}</h2>
        <Button type="primary" onClick={() => navigate('/dashboard/services/new')}>
          {t('dashboard.services.add', 'Add Service')}
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={services}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ServicesAdminPage;
