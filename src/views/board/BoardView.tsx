import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Space, Spin } from 'antd';
import { Board } from '../../components/board/Board';
import { useAuth } from '../../context/AuthContext';
import { usePathContext } from '../../context/PathContext';
import { BoardResponse, getBoard } from '../../api/boardApi';

export const BoardView = () => {
  const { orgId, teamId, projectId } = useParams();
  const { user } = useAuth();
  const { setPath } = usePathContext();
  useEffect(() => setPath('board'));
  const { isLoading, isError, error, data } = useQuery<BoardResponse, Error>({
    queryKey: ['board'],
    queryFn: () => getBoard(projectId ?? '')
  });

  if (!projectId || !teamId || !projectId || !orgId || !user) return <Navigate to='/home' />;

  if (isLoading) {
    return (
      <Space direction='vertical' style={{ width: '100%' }}>
        <Spin tip='Loading' size='large'>
          <div className='content' />
        </Spin>
      </Space>
    );
  }

  if (isError) {
    return <div>There was an unexpected error: {error.message}</div>;
  }

  return <Board projectId={projectId} board={data} />;
};
