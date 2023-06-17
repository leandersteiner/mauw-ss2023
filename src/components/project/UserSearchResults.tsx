import { CSSProperties } from 'react';
import { User } from '../../models/user/User';
import { UserSearchResult } from './UserSearchResult';

type UserSearchResultsProps = {
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
    const foundUsers: User | undefined = props.users.find(user => user.id === userId);
    return foundUsers !== undefined;
  };

  return (
    <div style={searchResultsStyle}>
      {props.users?.map(user => {
        return (
          <span key={user.id} style={wrapperStyle}>
            <UserSearchResult
              user={user}
              isMember={checkIsMember(user.id)}
              projectId={props.projectId}
              orgId={props.orgId}
              teamId={props.teamId}
              setMembers={props.setMembers}
            />
          </span>
        );
      })}
    </div>
  );
};
