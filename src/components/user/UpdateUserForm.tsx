import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { User } from '../../models/user/User';
import { UserApi } from '../../api/userApi';

type UpdateUserFormData = Partial<User>;

type UpdateUserFormProps = {
  token: string;
  user: User;
  onLogin: (user: User, token: string) => void;
};

export const UpdateUserForm = ({ token, user, onLogin }: UpdateUserFormProps) => {
  const navigate = useNavigate();
  const { mutate: updateUser } = useMutation(UserApi.update(user.id));

  const onFinish = async (data: UpdateUserFormData) => {
    updateUser(data, {
      onSuccess: response => {
        onLogin(response, token);
        navigate('/home');
      }
    });
  };

  return (
    <Form
      name='normal_update_user'
      className='update-user-form'
      initialValues={{ username: user.username, email: user.email }}
      onFinish={onFinish}
    >
      <Form.Item name='username'>
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          value={user.username}
          disabled
        />
      </Form.Item>
      <Form.Item
        name='email'
        rules={[{ type: 'email', required: true, message: 'Please input a valid Email!' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          type='email'
          value={user.email}
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your Password or a new Password!' }]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='New Password'
        />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
