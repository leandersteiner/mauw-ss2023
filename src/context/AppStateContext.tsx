import React, { createContext, Dispatch, FC, PropsWithChildren, useContext, useMemo } from 'react';
import { useImmerReducer } from 'use-immer';
import { Task } from '../models/task/Task';
import { Action } from '../actions/actions';
import { appStateReducer } from '../actions/appStateReducer';
import { AppState } from '../actions/AppState';

const appData: AppState = {
  userId: '',
  organisationId: '',
  teamId: '',
  projectId: '',
  projectBoard: {
    id: '',
    title: '',
    columns: []
  }
};

type AppStateContextProps = {
  appData: AppState;
  getTasksByListId: (id: string) => Task[];
  dispatch: Dispatch<Action>;
};

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

export const AppStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);
  const getTasksByListId = (id: string) => {
    return appData.projectBoard.columns.find(column => column.id === id)?.tasks || [];
  };

  const values = useMemo(
    () => ({
      appData: state,
      getTasksByListId,
      dispatch
    }),
    [state, dispatch]
  );

  return <AppStateContext.Provider value={values}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  return useContext(AppStateContext);
};
