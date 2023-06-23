import { createContext, ReactNode, useContext, useMemo } from 'react';
import { User } from '../models/user/User';
import { useSessionStorage } from '../hooks/useStorage';

interface AuthContextType {
  user: User | null;
  token: string | null;
  onLogin: (user: User, token: string) => void;
  onLogout: () => void;
}

const defaultContext: AuthContextType = {
  user: null,
  token: null,
  onLogin: () => {},
  onLogout: () => {}
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = (props: AuthProviderProps) => {
  const [user, setUser, removeUser] = useSessionStorage<User | null>('user', null);
  const [token, setToken, removeToken] = useSessionStorage<string | null>('token', null);

  const values = useMemo(
    () => ({
      user,
      token,
      onLogin: (newUser: User, newToken: string) => {
        setUser(newUser);
        setToken(newToken);
      },
      onLogout: () => {
        removeToken();
        removeUser();
      }
    }),
    [user, token, setUser, setToken, removeToken, removeUser]
  );

  return <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>;
};
