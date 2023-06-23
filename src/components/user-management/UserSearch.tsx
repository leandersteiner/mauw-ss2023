import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery
} from '@tanstack/react-query';
import Search from 'antd/es/input/Search';
import { CSSProperties, useEffect, useState } from 'react';
import { UserApi } from '../../api/userApi';
import { User } from '../../models/user/User';
import { UserSearchResult } from './UserSearchResult';

type UserSearchResultProps = {
  members: User[];
  owner: User;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<unknown, Error>>;
  orgId: string;
  teamId?: string;
  projectId?: string;
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

export const UserSearch: React.FC<UserSearchResultProps> = (props: UserSearchResultProps) => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [foundUsers, setFoundUsers] = useState<User[]>([]);
  const [searchInput, setSearchInput] = useState<string>('‎');

  const { isLoading, isError, error, data, refetch } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: UserApi.all,
    enabled: false
  });

  useEffect(() => {
    if (data !== undefined) {
      setFoundUsers(
        data.filter(user => user.email.includes(searchInput) || user.username.includes(searchInput))
      );
      setIsSearching(false);
    }
  }, [data, searchInput]);

  const onSearch = (input: string) => {
    const trimInput = input.trim();
    if (trimInput.length !== 0) {
      setIsSearching(true);
      setSearchInput(trimInput);
      refetch();
    }
  };

  const checkIsMember = (userId: string): boolean => {
    if (props.members !== undefined) {
      const foundUser: User | undefined = props.members.find(user => user.id === userId);
      return foundUser !== undefined || props.owner.id === userId;
    }

    return false;
  };

  return (
    <div>
      <Search
        placeholder='Search users by mail or username'
        allowClear
        enterButton='Search'
        size='large'
        onSearch={onSearch}
        style={{ marginBottom: '15px' }}
        loading={isSearching}
      />

      <div style={searchResultsStyle}>
        {foundUsers.map(user => {
          return (
            <span key={user.id} style={wrapperStyle}>
              <UserSearchResult
                user={user}
                isMember={checkIsMember(user.id)}
                refetch={props.refetch}
                orgId={props.orgId}
                teamId={props.teamId}
                projectId={props.projectId}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
};
