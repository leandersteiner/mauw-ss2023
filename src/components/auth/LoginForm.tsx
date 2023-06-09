import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, notification } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthApi } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';
import { usePathContext } from '../../context/PathContext';

type LoginFormData = {
  username: string;
  password: string;
};

export const LoginForm = () => {
  const { onLogin, token } = useAuth();
  const navigate = useNavigate();
  const { mutate: login } = useMutation(AuthApi.login);
  const { setPath } = usePathContext();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => setPath('login'), [setPath]);

  if (token) return <Navigate to='/home' replace />;

  const onFinish = async (data: LoginFormData) => {
    login(data, {
      onSuccess: response => {
        onLogin(response.user, response.token);
        Promise.resolve().then(() => {
          api.success({
            message: 'Login successful'
          });
        });
        navigate('/home');
      },
      onError: () => {
        api.error({
          message: 'Login failed',
          description: 'Please check your username and password'
        });
      }
    });
  };

  return (
    <>
      {contextHolder}
      <Form
        name='normal_login'
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
            Log in
          </Button>
          Or <Link to='/auth/register'>register now!</Link>
        </Form.Item>
      </Form>
    </>
  );
};
