import { Button, message, Popconfirm } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { deleteUser } from '../../api/userApi';
import { User } from '../../models/user/User';

type DeleteAccountButtonProps = {
  user: User;
};
export const DeleteAccountButton = ({ user }: DeleteAccountButtonProps) => {
  const { mutate } = useMutation({
    mutationFn: deleteUser
  });
  const navigate = useNavigate();

  const confirm = () => {
    if (user) {
      mutate(user.id);
      message.success('Account deleted').then(() => navigate('/auth/logout'));
    }
  };

  const cancel = () => {};

  return (
    <Popconfirm
      title='Delete yout account'
      description='Are you sure you want to delete your account?'
      onConfirm={confirm}
      onCancel={cancel}
      okText='Yes'
      cancelText='No'
    >
      <Button danger>Delete Account</Button>
    </Popconfirm>
  );
};
