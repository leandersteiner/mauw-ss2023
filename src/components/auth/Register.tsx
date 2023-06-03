import React, { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthResponse, registerUser } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';
import { usePathContext } from '../../context/PathContext';

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
};

export const Register = () => {
  const { onLogin, token } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createRegisterMutation = useMutation(registerUser);
  const { setPath } = usePathContext();

  useEffect(() => setPath('register'), [setPath]);

  if (token) return <Navigate to='/home' replace />;

  const onFinish = async (data: RegisterFormData) => {
    const { username, email, password } = data;
    if (!username || !email || !password) {
      // Todo: error handling
      alert('Please provide username, email and password');
    }
    await createRegisterMutation.mutate(data, {
      onSuccess: (response: AuthResponse) => {
        queryClient.invalidateQueries('register');
        onLogin(response.user, response.token);
        navigate('/home');
        // Todo: set current user show success notification
      }
    });
  };

  return (
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
        Or <a href='login'>Login now!</a>
      </Form.Item>
    </Form>
  );
};
