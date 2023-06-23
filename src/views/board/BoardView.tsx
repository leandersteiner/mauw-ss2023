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
import { BoardContextProvier } from '../../context/BoardContext';

export const BoardView = () => {
  const { orgId, teamId, projectId } = useParams();
  const { user } = useAuth();
  const { setPath } = usePathContext();
  useEffect(() => setPath('board'));
  const boardQuery = useQuery<BoardResponse, Error>({
    queryKey: ['board', projectId, teamId, orgId],
    queryFn: () => getBoard(projectId ?? '')
  });

  const backlogQuery = useQuery<BacklogTasksResponse, Error>({
    queryKey: ['backlog', projectId, teamId, orgId],
    queryFn: () => getBacklogTasks(projectId ?? '')
  });

  useEffect(() => {
    boardQuery.remove();
    backlogQuery.remove();
    Promise.all([boardQuery.refetch(), backlogQuery.refetch()]);
    // We only want this to do a full refetch if we move projects
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, teamId, orgId]);

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
        {`There was an unexpected error: ${boardQuery.error?.message}${backlogQuery.error?.message}`}
      </div>
    );
  }

  return (
    <BoardContextProvier userId={user.id} orgId={orgId} teamId={teamId} projectId={projectId}>
      <Board board={boardQuery} backlog={backlogQuery} user={user} />
    </BoardContextProvier>
  );
};
