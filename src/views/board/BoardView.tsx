import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Space, Spin } from 'antd';
import { Board } from '../../components/board/Board';
import { useAuth } from '../../context/AuthContext';
import { usePathContext } from '../../context/PathContext';
import { BoardResponse, getBoard } from '../../api/boardApi';
import { getBacklogTasks } from '../../api/taskApi';
import { BoardContextProvier } from '../../context/BoardContext';
import { Task } from '../../models/task/Task';

export const BoardView = () => {
  const { orgId, teamId, projectId } = useParams();
  const { user } = useAuth();
  const { setPath } = usePathContext();
  useEffect(() => setPath('board'));
  const board = useQuery<BoardResponse, Error>({
    queryKey: ['board', projectId, teamId, orgId],
    queryFn: () => getBoard(projectId ?? '')
  });

  const backlog = useQuery<Task[], Error>({
    queryKey: ['backlog'],
    queryFn: () => getBacklogTasks(projectId ?? '')
  });

  useEffect(() => {
    board.remove();
    backlog.remove();
    board.refetch();
    backlog.refetch();
    // We only want this to do a full refetch if we move projects
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, teamId, orgId]);

  if (!projectId || !teamId || !projectId || !orgId || !user) return <Navigate to='/home' />;

  if (backlog.isLoading || board.isLoading) {
    return (
      <Space direction='vertical' style={{ width: '100%' }}>
        <Spin tip='Loading' size='large'>
          <div className='content' />
        </Spin>
      </Space>
    );
  }

  if (backlog.isError || board.isError) {
    return (
      <div>{`There was an unexpected error: ${backlog.error?.message}${board.error?.message}`}</div>
    );
  }

  return (
    <BoardContextProvier userId={user.id} orgId={orgId} teamId={teamId} projectId={projectId}>
      <Board board={board.data} backlog={backlog.data} />
    </BoardContextProvier>
  );
};
