import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchData, updateData, createData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData(apiEndpoints.users)
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (record) => {
    setLoading(true);
    try {
      await updateData(apiEndpoints.user(record.id), { ...record, deleted: true });
      setUsers(prev => prev.filter(u => u.id !== record.id));
      message.success('User deleted (soft delete)');
    } catch {
      message.error('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Role', dataIndex: 'role' },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          {/* You can add edit functionality here */}
          <Popconfirm
            title="Are you sure to delete this user?"
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
        <h2 style={{ margin: 0 }}>Users</h2>
        {/* Add user functionality can be added here */}
      </div>
      <Table
        columns={columns}
        dataSource={users.filter(u => !u.deleted)}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default UsersPage;
