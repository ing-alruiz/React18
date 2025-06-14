import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Form, Input, List, message, Spin } from 'antd';
import { useAuth } from '../../Contexts/Auth/AuthContext.jsx';
import { fetchData, createData, updateData } from '../../Api/apiService';
import apiEndpoints from '../../Api/apiEndpoints';
import { useTranslation } from 'react-i18next';

const Pets = () => {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchData(apiEndpoints.userPets(user.id))
        .then(setPets)
        .catch(() => message.error(t('account.petsLoadError')))
        .finally(() => setLoading(false));
    }
  }, [user, t]);

  const openModal = (pet = null) => {
    setEditingPet(pet);
    setModalOpen(true);
  };

  const handleOk = async (values) => {
    setLoading(true);
    try {
      if (editingPet) {
        const updated = await updateData(apiEndpoints.pet(editingPet.id), { ...editingPet, ...values });
        setPets(prev => prev.map(p => (p.id === updated.id ? updated : p)));
        message.success(t('account.petUpdated'));
      } else {
        // Add userId to values for new pet
        const newPet = await createData(apiEndpoints.addPetToUser(user.id), { ...values, userId: user.id });
        setPets(prev => [...prev, newPet]);
        message.success(t('account.petAdded'));
      }
      setModalOpen(false);
      setEditingPet(null);
    } catch {
      message.error(t('account.petSaveError'));
    } finally {
      setLoading(false);
    }
  };

  if (loading && !pets.length) {
    return <Spin style={{ margin: 40 }} />;
  }

  return (
    <Card title={t('account.myPets')} style={{ maxWidth: 600 }}>
      <Button type="primary" onClick={() => openModal()} style={{ marginBottom: 16 }}>
        {t('account.addPet')}
      </Button>
      <List
        dataSource={pets}
        renderItem={(pet) => (
          <List.Item
            actions={[
              <Button key="edit" onClick={() => openModal(pet)}>
                {t('account.edit')}
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={pet.name}
              description={`${pet.type} - ${pet.breed}`}
            />
          </List.Item>
        )}
      />
      <Modal
        open={modalOpen}
        title={editingPet ? t('account.editPet') : t('account.addPet')}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <PetForm
          initialValues={editingPet}
          onFinish={handleOk}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </Card>
  );
};

const PetForm = ({ initialValues, onFinish, onCancel }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item name="name" label={t('account.petName')} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="species" label={t('account.petType')} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="breed" label={t('account.petBreed')}>
        <Input />
      </Form.Item>
      <Form.Item name="age" label={t('account.petAge')}>
        <Input type="number" min={0} />
      </Form.Item>
      <Form.Item name="size" label={t('account.petSize')}>
        <Input />
      </Form.Item>
      <Form.Item name="weight" label={t('account.petWeight')}>
        <Input type="number" min={0} />
      </Form.Item>
      <Form.Item name="specialNeeds" label={t('account.petSpecialNeeds')}>
        <Input />
      </Form.Item>
      <Form.Item name="temperament" label={t('account.petTemperament')}>
        <Input />
      </Form.Item>
      <Form.Item name="vaccines" label={t('account.petVaccines')}>
        <Input placeholder={t('account.petVaccinesPlaceholder')} />
      </Form.Item>
      <Form.Item name="photo" label={t('account.petPhoto')}>
        <Input />
      </Form.Item>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button onClick={onCancel}>{t('account.cancel')}</Button>
        <Button type="primary" htmlType="submit">
          {t('account.save')}
        </Button>
      </div>
    </Form>
  );
};

export default Pets;
