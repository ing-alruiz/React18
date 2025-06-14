import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Tag, Space, Card, Input, InputNumber, Modal, Form } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchData, updateData, createData } from '../../../Api/apiService';
import apiEndpoints from '../../../Api/apiEndpoints';

const RoomTypesPage = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form] = Form.useForm();

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

  const openModal = (record = null) => {
    setEditing(record);
    setModalOpen(true);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      if (editing) {
        await updateData(apiEndpoints.roomType(editing.id), values);
        message.success('Room type updated');
      } else {
        await createData(apiEndpoints.roomTypes, values);
        message.success('Room type created');
      }
      setModalOpen(false);
      setEditing(null);
      loadRoomTypes();
    } catch (e) {
      // validation error or API error
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: 'Species', dataIndex: 'species', render: s => <Tag>{s}</Tag> },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Description', dataIndex: 'description' },
    { title: 'Price', dataIndex: 'price', render: price => <span>${price}</span> },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => openModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this room type?"
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>Room Types</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>
          Add Room Type
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={roomTypes}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        open={modalOpen}
        title={editing ? 'Edit Room Type' : 'Add Room Type'}
        onCancel={() => setModalOpen(false)}
        onOk={handleModalOk}
        confirmLoading={loading}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="species" label="Species" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={0} prefix="$" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoomTypesPage;
