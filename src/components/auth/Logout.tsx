import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Logout = () => {
  const { onLogout, token } = useAuth();

  if (!token) return <Navigate to='/home' replace />;
  Promise.resolve().then(() => onLogout());
  return <Navigate to='/home' replace />;
};
