import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UpdateUserForm } from './UpdateUserForm';
import { DeleteAccountButton } from './DeleteAccountButton';

export const Profile = () => {
  const { user, token, onLogin } = useAuth();

  if (!user || !token || !onLogin) return <Navigate to='/logout' />;

  return (
    <>
      <h1>{`Profile of ${user?.username}`}</h1>
      <UpdateUserForm token={token} user={user} onLogin={onLogin} />
      <DeleteAccountButton user={user} />
    </>
  );
};
