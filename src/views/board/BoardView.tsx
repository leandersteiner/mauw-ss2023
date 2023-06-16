import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { Board } from '../../components/board/Board';
import { useAuth } from '../../context/AuthContext';

export const BoardView = () => {
  const { orgId, teamId, projectId } = useParams();
  const { user } = useAuth();

  if (!projectId || !teamId || !projectId || !orgId || !user) return <Navigate to='/home' />;

  const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  return <Board projectId={projectId} />;
};
