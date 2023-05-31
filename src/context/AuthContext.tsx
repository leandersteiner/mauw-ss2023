import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { User } from '../models/user/User';
import { useSessionStorage } from '../hooks/useStorage';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loggedIn: boolean;
  onLogin: (user: User, token: string) => void;
  onLogout: () => void;
  authConfig: AxiosRequestConfig;
}

const defaultContext: AuthContextType = {
  user: null,
  token: null,
  loggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
  authConfig: {}
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = (props: AuthProviderProps) => {
  const [user, setUser, removeUser] = useSessionStorage<User | null>('user', null);
  const [token, setToken, removeToken] = useSessionStorage<string | null>('token', null);
  const [loggedIn, setLoggedIn] = useSessionStorage<boolean>('loggedIn', false);
  const [authConfig, setAuthConfig] = useState<AxiosRequestConfig>({});

  useEffect(() => {
    setAuthConfig({
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
  }, [token]);

  const values = useMemo(
    () => ({
      user,
      token,
      loggedIn,
      onLogin: (newUser: User, newToken: string) => {
        setUser(newUser);
        setToken(newToken);
        setLoggedIn(true);
      },
      onLogout: () => {
        removeToken();
        removeUser();
        setLoggedIn(false);
      },
      authConfig
    }),
    [user, token, loggedIn, authConfig, removeToken, removeUser, setToken, setUser]
  );

  return <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>;
};
