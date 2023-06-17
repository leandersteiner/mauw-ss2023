import { CSSProperties, useState } from 'react';
import { Avatar, Typography, Button } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { AddUserToProjectRequest, Project } from '../../models/project/Project';
import { User } from '../../models/user/User';
import { addUserToProject } from '../../api/projectsApi';

type UserSearchResultProps = {
  user: User;
  isMember: boolean;
  projectId: string;
  teamId: string;
  orgId: string;
  setMembers: React.Dispatch<React.SetStateAction<User[]>>;
};

const nameMailStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column'
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

export const UserSearchResult: React.FC<UserSearchResultProps> = (props: UserSearchResultProps) => {
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false);
  const [isMember, setIsMember] = useState<boolean>(props.isMember);

  const { mutate: addUserToProjectMutation } = useMutation(addUserToProject, {
    onSuccess: (response: Project) => {
      setIsAddingUser(false);
      props.setMembers(response.members);
      setIsMember(true);
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
    <div style={searchResultStyle}>
      <span style={searchResultStyle}>
        <Avatar size='small' icon={<UserOutlined />} />
        <span style={nameMailStyle}>
          <Typography.Title
            style={{ margin: '0', maxWidth: '90%' }}
            level={5}
            ellipsis={{ rows: 1, tooltip: true }}
          >
            {props.user.username}
          </Typography.Title>
          {props.user.email}
        </span>
      </span>
      <Button
        icon={<PlusOutlined />}
        onClick={() => addUser(props.user.id)}
        loading={isAddingUser}
        disabled={isMember}
      />
    </div>
  );
};
