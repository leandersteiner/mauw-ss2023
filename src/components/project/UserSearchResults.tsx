import { Avatar, Button, Typography } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { CSSProperties, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { User } from '../../models/user/User';
import { addUserToProject } from '../../api/projectsApi';
import {
  AddUserToProjectBodyData,
  AddUserToProjectRequest,
  Project
} from '../../models/project/Project';

type UserSearchResultProps = {
  users: User[];
  projectId: string;
  teamId: string;
  orgId: string;
  setMembers: React.Dispatch<React.SetStateAction<User[]>>;
};

const wrapperStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '97%',
  alignContent: 'center',
  alignItems: 'center'
};

const searchResultStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  alignContent: 'center',
  gap: '10px',
  width: '100%'
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

const nameMailStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column'
};

export const UserSearchResult: React.FC<UserSearchResultProps> = (props: UserSearchResultProps) => {
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false);

  const { mutate: addUserToProjectMutation } = useMutation(addUserToProject, {
    onSuccess: (response: Project) => {
      setIsAddingUser(false);
      props.setMembers(response.members);
    },
    onError: (error: Error) => {
      alert(error.message);
    }
  });

  const addUser = (userResultId: string) => {
    setIsAddingUser(true);

    const request: AddUserToProjectRequest = {
      orgId: props.orgId,
      teamId: props.teamId,
      projectId: props.projectId,
      body: { userId: userResultId }
    };

    addUserToProjectMutation(request);
  };

  return (
    <div style={searchResultsStyle}>
      {props.users?.map(user => {
        return (
          <span key={user.id} style={wrapperStyle}>
            <span style={searchResultStyle}>
              <Avatar size='small' icon={<UserOutlined />} />
              <span style={nameMailStyle}>
                <Typography.Title
                  style={{ margin: '0', maxWidth: '90%' }}
                  level={5}
                  ellipsis={{ rows: 1, tooltip: true }}
                >
                  {user.username}
                </Typography.Title>
                {user.email}
              </span>
            </span>
            <Button
              icon={<PlusOutlined />}
              onClick={() => addUser(user.id)}
              loading={isAddingUser}
            />
          </span>
        );
      })}
    </div>
  );
};
