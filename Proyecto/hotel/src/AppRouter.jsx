import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Tag, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { fetchData, updateData } from '@Api/apiService';
import apiEndpoints from '@Api/apiEndpoints';

const ROOMS_ENDPOINT = apiEndpoints.roomTypes || '/roomTypes';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        typeof ROOMS_ENDPOINT === 'object' ? `${ROOMS_ENDPOINT.endpoint}/${record.id}` : `/roomTypes/${record.id}`,
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
      title: 'ID',
      dataIndex: 'id',
      width: 60,
    },
    {
      title: 'Species',
      dataIndex: 'species',
      render: s => <Tag>{s}</Tag>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: price => <span>${price}</span>,
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
            onClick={e => {
              e.stopPropagation();
              navigate(`/dashboard/rooms/${record.id}`);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this room?"
            onConfirm={e => {
              e.stopPropagation();
              handleDelete(record);
            }}
            okText="Yes"
            cancelText="No"
            onCancel={e => e.stopPropagation()}
          >
            <Button icon={<DeleteOutlined />} size="small" danger onClick={e => e.stopPropagation()}>
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
        <h2 style={{ margin: 0 }}>Rooms</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/dashboard/rooms/new')}
        >
          Create Room
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={rooms}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        onRow={record => ({
          onClick: () => navigate(`/dashboard/rooms/${record.id}`),
          style: { cursor: 'pointer' }
        })}
      />
    </div>
  );
};

export default RoomsPage;