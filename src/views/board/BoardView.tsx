import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Space, Spin } from 'antd';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Board } from '../../components/board/Board';
import { BoardResponse, getBoard } from '../../api/boardApi';
import { TaskResponse, updateTask } from '../../api/taskApi';
import { Task } from '../../models/task/Task';
import { useAppState } from '../../context/AppStateContext';
import { useAuth } from '../../context/AuthContext';
import { updateState } from '../../actions/actions';

export const BoardView = () => {
  const { orgId, teamId, projectId } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { dispatch, appData } = useAppState();
  const { isLoading, isError, error, data } = useQuery<BoardResponse, Error>({
    queryKey: ['board'],
    queryFn: () => getBoard(projectId ?? '')
  });
  const mutation = useMutation<TaskResponse, Error, Task>({
    mutationFn: updateTask(projectId ?? ''),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board']
      });
    }
  });

  useEffect(() => {
    dispatch(
      updateState({
        userId: user?.id ?? '',
        organisationId: orgId ?? '',
        teamId: teamId ?? '',
        projectId: projectId ?? '',
        projectBoard: data ?? { id: '', title: '', columns: [] }
      })
    );
  }, []);

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

  const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleCardMoved = (cardId: string, columnId: string, index: number) => {
    const newColumn = data.columns.find(column => column.id === columnId);
    if (!newColumn) return;
    const updatedTask = newColumn.tasks.find(task => task.id === cardId);
    if (!updatedTask) return;
    updatedTask.boardColumnId = columnId;
    updatedTask.position = index;
    mutation.mutate(updatedTask);
  };

  const handleListMoved = (id: string, index: number) => {
    console.log(id, index);
  };

  console.log(appData);

  return <Board projectId={projectId} onCardMove={handleCardMoved} onListMove={handleListMoved} />;
};
