import { Button, message, Popconfirm } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { UserApi } from '../../api/userApi';
import { User } from '../../models/user/User';

type DeleteAccountButtonProps = {
  user: User;
};
export const DeleteAccountButton = ({ user }: DeleteAccountButtonProps) => {
  const { mutate: deleteUser } = useMutation(UserApi.delete);
  const navigate = useNavigate();

  const confirm = () => {
    if (user) {
      deleteUser(user.id);
      message.success('Account deleted').then(() => navigate('/auth/logout'));
    }
  };

  return (
    <Popconfirm
      title='Delete your account'
      description='Are you sure you want to delete your account?'
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      okButtonProps={{ danger: true }}
      onConfirm={confirm}
      okText='Yes'
      cancelText='No'
    >
      <Button danger>Delete Account</Button>
    </Popconfirm>
  );
};
