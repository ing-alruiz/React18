import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchData, updateData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setLoading(true);
    fetchData(apiEndpoints.users)
      .then(data => setUsers((data || []).filter(u => !u.deleted)))
      .finally(() => setLoading(false));
  };

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
    { title: t('dashboard.users.id', 'ID'), dataIndex: 'id', width: 60 },
    { title: t('dashboard.users.name', 'Name'), dataIndex: 'name' },
    { title: t('dashboard.users.email', 'Email'), dataIndex: 'email' },
    { title: t('dashboard.users.role', 'Role'), dataIndex: 'role' },
    {
      title: t('dashboard.users.actions', 'Actions'),
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => navigate(`/dashboard/users/${record.id}`)}
          >
            {t('dashboard.users.edit', 'Edit')}
          </Button>
          <Popconfirm
            title={t('dashboard.users.confirmDelete', 'Are you sure to delete this user?')}
            onConfirm={() => handleDelete(record)}
            okText={t('dashboard.users.yes', 'Yes')}
            cancelText={t('dashboard.users.no', 'No')}
          >
            <Button icon={<DeleteOutlined />} size="small" danger>
              {t('dashboard.users.delete', 'Delete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>{t('dashboard.users.title', 'Users')}</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/dashboard/users/new')}>
          {t('dashboard.users.add', 'Add User')}
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default UsersPage;
