import { Button, message, Popconfirm } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { deleteUser } from '../../api/userApi';

export const Profile = () => {
  const { user } = useAuth();
  const { mutate } = useMutation({
    mutationFn: deleteUser
  });
  const navigate = useNavigate();

  const confirm = () => {
    if (user) {
      mutate(user.id);
      message.success('Account deleted');
      navigate('/auth/logout');
    }
  };

  const cancel = () => {};

  return (
    <>
      <h1>{`Profile of ${user?.username}`}</h1>
      <p>{user?.email}</p>
      <Popconfirm
        title='Delete the task'
        description='Are you sure to delete this task?'
        onConfirm={confirm}
        onCancel={cancel}
        okText='Yes'
        cancelText='No'
      >
        <Button danger>Delete</Button>
      </Popconfirm>
    </>
  );
};
