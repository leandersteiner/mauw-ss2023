import { CSSProperties } from 'react';
import { User } from '../../models/user/User';
import { UserSearchResult } from './UserSearchResult';
import { Project } from '../../models/project/Project';

type UserSearchResultsProps = {
  users: User[];
  project: Project;
  setMembers: React.Dispatch<React.SetStateAction<User[]>>;
};

const wrapperStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '97%',
  alignContent: 'center',
  alignItems: 'center'
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

export const UserSearchResults: React.FC<UserSearchResultsProps> = (
  props: UserSearchResultsProps
) => {
  const checkIsMember = (userId: string): boolean => {
    const foundUser: User | undefined = props.project.members.find(user => user.id === userId);
    return foundUser !== undefined;
  };

  return (
    <div style={searchResultsStyle}>
      {props.users?.map(user => {
        return (
          <span key={user.id} style={wrapperStyle}>
            <UserSearchResult
              user={user}
              isMember={checkIsMember(user.id)}
              projectId={props.project.id}
              orgId={props.project.team.organisation.id}
              teamId={props.project.team.id}
              setMembers={props.setMembers}
            />
          </span>
        );
      })}
    </div>
  );
};
