import React from 'react';
import { Form, Input, Button, Checkbox, Typography, Row, Col, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../Contexts/Auth/AuthContext.jsx'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { Title, Text, Link } = Typography;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

    const onFinish = async (values) => {
    // Use email as username
    const success = await login(values.username, values.password);
    if (success) {
      navigate('/');
    } else {
      // Show error message (Ant Design notification or message)
      // For simplicity, use alert here:
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <Row style={{ minHeight: '100vh' }}>
      <Col xs={0} md={14} style={{ background: '#23243a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Illustration or image */}
        <img src="/hotel-illustration.svg" alt="Hotel" style={{ width: '80%' }} />
      </Col>
      <Col xs={24} md={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#181a23' }}>
        <Card style={{ width: 350, background: 'transparent', border: 'none' }}>
          <Title level={3} style={{ color: '#fff' }}>Sign in</Title>
          <Text style={{ color: '#aaa' }}>
            Welcome to Spice<br />
            Need an account? <Link href="/signup">Sign Up</Link>
          </Text>
          <Form
            name="login"
            initialValues={{ remember: true }}
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
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
              label="Password"
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Checkbox style={{ color: '#fff' }}>Remember me</Checkbox>
              <Link href="#" style={{ float: 'right' }}>Forgot Password?</Link>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
            <div style={{ textAlign: 'center', color: '#aaa' }}>
              <span>OR</span>
              <div style={{ marginTop: 16 }}>
                <Button shape="circle" icon={<FontAwesomeIcon icon={['fab', 'google']} />} style={{ margin: '0 8px' }} />
                {/* <Button shape="circle" icon={<FontAwesomeIcon icon={['fab', 'facebook-f']} />} style={{ margin: '0 8px' }} />
                <Button shape="circle" icon={<FontAwesomeIcon icon={['fab', 'twitter']} />} style={{ margin: '0 8px' }} />
                <Button shape="circle" icon={<FontAwesomeIcon icon={['fab', 'linkedin-in']} />} style={{ margin: '0 8px' }} /> */}
              </div>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}