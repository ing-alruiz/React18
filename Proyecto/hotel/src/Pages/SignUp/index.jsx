import React from 'react';
import { Form, Input, Button, Typography, Row, Col, Card, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../Api/apiService';
import Password from 'antd/es/input/Password';

const { Title, Text } = Typography;

export default function Signup() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await registerUser({
        name: values.username,
        email: values.email,
        password: values.password
      });
      message.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      message.error('Registration failed. Try again.');
    }
  };

  return (
    <Row style={{ minHeight: '100vh' }}>
      <Col xs={0} md={14} style={{ background: '#23243a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/hotel-illustration.svg" alt="Hotel" style={{ width: '80%' }} />
      </Col>
      <Col xs={24} md={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#181a23' }}>
        <Card style={{ width: 350, background: 'transparent', border: 'none' }}>
          <Title level={4} style={{ color: '#fff' }}>Sign Up</Title>
          <Text style={{ color: '#aaa' }}>
            Enter details to create your account
          </Text>
          <Form
            name="signup"
            onFinish={onFinish}
            style={{ marginTop: 24 }}
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
              label="Username"
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your Email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
              label="Email"
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
              label="Password"
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={['password']}
              label="Confirm Password"
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
            </Form.Item>
            <Text style={{ color: '#aaa' }}>
              Already Registered? <Link to="/login">Login</Link>
            </Text>
            <Form.Item style={{ marginTop: 16 }}>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Form.Item>
            <div style={{ textAlign: 'center', color: '#aaa' }}>
              <span>OR</span>
              <div style={{ marginTop: 16 }}>
                <Button shape="circle" icon={<FontAwesomeIcon icon={['fab', 'google']} />} style={{ margin: '0 8px' }} />
                <Button shape="circle" icon={<FontAwesomeIcon icon={['fab', 'facebook-f']} />} style={{ margin: '0 8px' }} />
                <Button shape="circle" icon={<FontAwesomeIcon icon={['fab', 'twitter']} />} style={{ margin: '0 8px' }} />
                <Button shape="circle" icon={<FontAwesomeIcon icon={['fab', 'linkedin-in']} />} style={{ margin: '0 8px' }} />
              </div>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}