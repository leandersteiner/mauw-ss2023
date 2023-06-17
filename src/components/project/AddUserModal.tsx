import { useQuery } from '@tanstack/react-query';
import { Divider, Modal, Result } from 'antd';
import React, { CSSProperties, Dispatch, ReactNode, useEffect, useState } from 'react';
import Search from 'antd/es/input/Search';
import { User } from '../../models/user/User';
import { getAllUsers } from '../../api/userApi';
import { UserGrid } from './UserGrid';
import { Project } from '../../models/project/Project';
import { UserSearchResult } from './UserSearchResult';

type AddUserModalProps = {
  project: Project;
  isAddUserModalOpen: boolean;
  setIsAddUserModalOpen: Dispatch<React.SetStateAction<boolean>>;
};

export const AddUserModal: React.FC<AddUserModalProps> = (props: AddUserModalProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [foundUsers, setFoundUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<ReactNode>(<> </>);
  const [members, setMembers] = useState<User[]>(
    props.project.members ? props.project.members : []
  );

  const { isLoading, isError, error, data } = useQuery<User[], Error>({
    queryKey: ['users'],
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

  const onSearch = (value: string) => {
    if (value.length !== 0) {
      setIsSearching(true);
      const filteredUsers = users.filter(
        user => user.email.includes(value) || user.username.includes(value)
      );

      if (filteredUsers.length === 0) {
        setNotFound(
          <Result
            status='404'
            title='No users found'
            subTitle='Sorry, we found no users for the given input.'
          />
        );
      } else {
        setNotFound(<> </>);
      }

      setFoundUsers(filteredUsers);
      setIsSearching(false);
    }
  };

  const searchResultsStyle: CSSProperties = {
    overflowY: 'auto',
    maxHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    gap: '10px',
    width: '100%'
  };

  const wrapperStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '97%',
    alignContent: 'center',
    alignItems: 'center'
  };

  const checkIsMember = (userId: string): boolean => {
    if (props.project.members !== undefined) {
      const foundUser: User | undefined = props.project.members.find(user => user.id === userId);
      return foundUser !== undefined || props.project.owner.id === userId;
    }

    return false;
  };

  return (
    <Modal
      title='Add a user to the project'
      open={props.isAddUserModalOpen}
      destroyOnClose
      onCancel={onCancel}
      footer={null}
    >
      <Search
        placeholder='Search users by mail or username'
        allowClear
        enterButton='Search'
        size='large'
        onSearch={onSearch}
        style={{ marginBottom: '15px' }}
        loading={isSearching}
      />

      {notFound}

      <div style={searchResultsStyle}>
        {foundUsers.map(user => {
          return (
            <span key={user.id} style={wrapperStyle}>
              <UserSearchResult
                user={user}
                isMember={checkIsMember(user.id)}
                projectId={props.project.id}
                orgId={props.project.team.organisation.id}
                teamId={props.project.team.id}
                setMembers={setMembers}
              />
            </span>
          );
        })}
      </div>

      <Divider>Members</Divider>

      <UserGrid owner={props.project.owner} members={members} />
    </Modal>
  );
};
