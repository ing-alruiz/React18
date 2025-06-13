import React, { useState } from 'react';
import { useAuth } from '../../Contexts/Auth/AuthContext.jsx';
import { Form, Input, Button, Card, message } from 'antd';
import { updateData } from '../../Api/apiService';
import apiEndpoints from '../../Api/apiEndpoints';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { user, login } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateData(apiEndpoints.user(user.id), values, 'PATCH');
      message.success(t('account.profileUpdated'));
      // Optionally, re-login to update context
      await login(values.email, values.password || user.password);
    } catch {
      message.error(t('account.profileUpdateError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title={t('account.editProfile')} style={{ maxWidth: 400 }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: user?.name,
          email: user?.email,
        }}
        onFinish={onFinish}
      >
        <Form.Item name="name" label={t('account.name')} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label={t('account.email')} rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {t('account.saveChanges')}
        </Button>
      </Form>
    </Card>
  );
};

export default Profile;
