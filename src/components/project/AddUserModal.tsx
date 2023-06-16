import { useQuery } from '@tanstack/react-query';
import { AutoComplete, Checkbox, Input, Modal } from 'antd';
import { Dispatch, useEffect, useState } from 'react';
import { User } from '../../models/user/User';
import { getAllUsers } from '../../api/userApi';

type AddUserModalProps = {
  teamId: string;
  orgId: string;
  projectId: string;
  isAddUserModalOpen: boolean;
  setIsAddUserModalOpen: Dispatch<React.SetStateAction<boolean>>;
};

export const AddUserModal: React.FC<AddUserModalProps> = (props: AddUserModalProps) => {
  const [users, setUsers] = useState<User[]>([]);

  const { isLoading, isError, error, data } = useQuery<User[], Error>({
    queryKey: ['teams'],
    queryFn: getAllUsers
  });

  useEffect(() => {
    if (data !== undefined) {
      setUsers(data);
    }
  }, [data]);

  const onCancel = () => {
    props.setIsAddUserModalOpen(false);
  };

  return (
    <Modal
      title='Add a user to the project'
      open={props.isAddUserModalOpen}
      destroyOnClose
      onCancel={onCancel}
      footer={null}
    >
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: 300 }}
        options={undefined}
        onSelect={undefined}
        onSearch={undefined}
      >
        <Input.Search size='large' placeholder='input here' enterButton />
      </AutoComplete>
    </Modal>
  );
};
