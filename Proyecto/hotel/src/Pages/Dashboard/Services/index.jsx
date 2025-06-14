import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { fetchData, updateData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';

const ServicesAdminPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData(apiEndpoints.services)
      .then(setServices)
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
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: 'Title (EN)', dataIndex: 'title_en' },
    { title: 'Title (ES)', dataIndex: 'title_es' },
    { title: 'Description (EN)', dataIndex: 'description_en' },
    { title: 'Description (ES)', dataIndex: 'description_es' },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Are you sure to delete this service?"
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
        <h2 style={{ margin: 0 }}>Services</h2>
      </div>
      <Table
        columns={columns}
        dataSource={services.filter(s => !s.deleted)}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ServicesAdminPage;
