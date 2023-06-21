import { CSSProperties, useState } from 'react';
import { Avatar, Typography, Button } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation
} from '@tanstack/react-query';
import { User } from '../../models/user/User';
import { addUserToOrg } from '../../api/orgApi';
import { addUserToTeam } from '../../api/teamApi';
import { addUserToProject } from '../../api/projectsApi';
import { AddUserToProjectRequest } from '../../models/project/Project';

type UserSearchResultProps = {
  user: User;
  isMember: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<unknown, Error>>;
  orgId: string;
  teamId?: string;
  projectId?: string;
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

  const { mutate: addUserToOrgMutation } = useMutation(addUserToOrg, {
    onSuccess: () => {
      props.refetch();
      setIsMember(true);
      setIsAddingUser(false);
    },
    onError: (error: Error) => {
      alert(error.message);
      setIsAddingUser(false);
    }
  });

  const { mutate: addUserToTeamMutation } = useMutation(addUserToTeam, {
    onSuccess: () => {
      props.refetch();
      setIsMember(true);
      setIsAddingUser(false);
    },
    onError: (error: Error) => {
      alert(error.message);
      setIsAddingUser(false);
    }
  });

  const { mutate: addUserToProjectMutation } = useMutation(addUserToProject, {
    onSuccess: () => {
      props.refetch();
      setIsMember(true);
      setIsAddingUser(false);
    },
    onError: (error: Error) => {
      alert(error.message);
      setIsAddingUser(false);
    }
  });

  const addUser = () => {
    if (props.teamId === undefined && props.projectId === undefined) {
      setIsAddingUser(true);
      addUserToOrgMutation({ userId: props.user.id, organisationId: props.orgId });
    }

    if (props.teamId !== undefined && props.projectId === undefined) {
      setIsAddingUser(true);
      addUserToTeamMutation({
        orgId: props.orgId,
        teamId: props.teamId,
        body: { userId: props.user.id }
      });
    }

    if (props.teamId !== undefined && props.projectId !== undefined) {
      setIsAddingUser(true);

      const request: AddUserToProjectRequest = {
        orgId: props.orgId,
        teamId: props.teamId,
        projectId: props.projectId,
        body: { userId: props.user.id }
      };

      addUserToProjectMutation(request);
    }
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
        onClick={() => addUser()}
        loading={isAddingUser}
        disabled={isMember}
      />
    </div>
  );
};
