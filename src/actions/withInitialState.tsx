import { ComponentType, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AppState } from './AppState';
import { BoardResponse, getBoard } from '../api/boardApi';

type InjectedProps = {
  initialState: AppState;
};

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

export const withInitialState = <TProps,>(
  WrappedComponent: ComponentType<PropsWithoutInjected<TProps> & InjectedProps>
) => {
  return (props: PropsWithoutInjected<TProps>) => {
    const [initialState, setInitialState] = useState<AppState>({
      teamId: '',
      projectId: '',
      organisationId: '',
      userId: '',
      projectBoard: { id: '', title: '', columns: [] }
    });
    const queryClient = useQueryClient();
    const { isLoading, isError, error, data } = useQuery<BoardResponse, Error>({
      queryKey: ['board'],
      queryFn: () => getBoard('732e753a-aca8-41d8-9fbc-053e0bcb79cf')
    });

    if (isLoading) {
      return <div>Loading</div>;
    }
    if (error) {
      return <div>{error.message}</div>;
    }

    useEffect(() => {
      setInitialState({
        projectId: '732e753a-aca8-41d8-9fbc-053e0bcb79cf',
        userId: '',
        teamId: '',
        organisationId: '',
        projectBoard: data
      });
    }, []);
    return <WrappedComponent {...(props as TProps)} initialState={initialState} />;
  };
};
