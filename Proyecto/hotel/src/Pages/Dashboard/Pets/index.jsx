import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { fetchData, updateData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';

const PetsPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData(apiEndpoints.pets)
      .then(setPets)
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
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Type', dataIndex: 'type' },
    { title: 'Breed', dataIndex: 'breed' },
    { title: 'Owner', dataIndex: 'userId' },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Are you sure to delete this pet?"
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
        <h2 style={{ margin: 0 }}>Pets</h2>
      </div>
      <Table
        columns={columns}
        dataSource={pets.filter(p => !p.deleted)}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default PetsPage;
