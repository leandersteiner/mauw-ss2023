import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, notification } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthApi } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';
import { usePathContext } from '../../context/PathContext';

type RegistrationFormData = {
  username: string;
  email: string;
  password: string;
};

export const RegistrationForm = () => {
  const { onLogin, token } = useAuth();
  const navigate = useNavigate();
  const { mutate: register } = useMutation(AuthApi.register);
  const { setPath } = usePathContext();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => setPath('register'), [setPath]);

  if (token) return <Navigate to='/home' replace />;

  const onFinish = async (data: RegistrationFormData) => {
    const { username, email, password } = data;
    if (!username || !email || !password) {
      api.error({
        message: 'Registration failed',
        description: 'Please check your username and password'
      });
    }
    register(data, {
      onSuccess: response => {
        onLogin(response.user, response.token);
        navigate('/home');
        // Todo: set current user show success notification
      }
    });
  };

  return (
    <>
      {contextHolder}
      <Form
        name='normal_register'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[{ type: 'email', required: true, message: 'Please input your Email!' }]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            type='email'
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Register
          </Button>
          Or <Link to='/auth/login'>Log in now!</Link>
        </Form.Item>
      </Form>
    </>
  );
};
