import React, { createContext, useContext, useMemo, FC, ReactNode } from 'react';

interface BoardContextType {
  userId: string;
  teamId: string;
  orgId: string;
  projectId: string;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
};

type BoardContextProviderProps = {
  children: ReactNode;
  userId: string;
  teamId: string;
  orgId: string;
  projectId: string;
};

export const BoardContextProvier: FC<BoardContextProviderProps> = ({
  children,
  userId,
  orgId,
  teamId,
  projectId
}) => {
  const values = useMemo(
    () => ({
      userId,
      teamId,
      orgId,
      projectId
    }),
    [userId, teamId, orgId, projectId]
  );

  return <BoardContext.Provider value={values}>{children}</BoardContext.Provider>;
};
