import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Space, Spin } from 'antd';
import { Board } from '../../components/board/Board';
import { useAuth } from '../../context/AuthContext';
import { usePathContext } from '../../context/PathContext';
import { BoardResponse, getBoard } from '../../api/boardApi';
import { BacklogTasksResponse, getBacklogTasks } from '../../api/taskApi';

export const BoardView = () => {
  const { orgId, teamId, projectId } = useParams();
  const { user } = useAuth();
  const { setPath } = usePathContext();
  useEffect(() => setPath('board'));
  const boardQuery = useQuery<BoardResponse, Error>({
    queryKey: ['board', projectId],
    queryFn: () => getBoard(projectId ?? '')
  });

  const backlogQuery = useQuery<BacklogTasksResponse, Error>({
    queryKey: ['backlog', projectId],
    queryFn: () => getBacklogTasks(projectId ?? '')
  });

  useEffect(() => {
    boardQuery.remove();
    backlogQuery.remove();
    boardQuery.refetch();
    backlogQuery.refetch();
  }, [orgId, teamId, projectId]);

  if (!projectId || !teamId || !projectId || !orgId || !user) return <Navigate to='/home' />;

  if (boardQuery.isLoading || backlogQuery.isLoading) {
    return (
      <Space direction='vertical' style={{ width: '100%' }}>
        <Spin tip='Loading' size='large'>
          <div className='content' />
        </Spin>
      </Space>
    );
  }

  if (boardQuery.isError || backlogQuery.isError) {
    return (
      <div>
        There was an unexpected error: {boardQuery.error?.message}
        {backlogQuery.error?.message}
      </div>
    );
  }

  return <Board projectId={projectId} board={boardQuery} backlog={backlogQuery} user={user} />;
};
