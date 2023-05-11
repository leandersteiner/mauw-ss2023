import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { User } from '../models/user/User';
import { useSessionStorage } from '../hooks/useStorage';

interface SecurityContextType {
  user: User | null;
  token: string | null;
  loggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  authConfig: AxiosRequestConfig;
}

const defaultContext: SecurityContextType = {
  user: null,
  token: null,
  loggedIn: false,
  login: () => {},
  logout: () => {},
  authConfig: {}
};

const SecurityContext = createContext<SecurityContextType>(defaultContext);

export const useSecurity = () => useContext(SecurityContext);

type SecurityProviderProps = {
  children: ReactNode;
};

export const SecurityContextProvider = (props: SecurityProviderProps) => {
  const [user, setUser, removeUser] = useSessionStorage<User | null>('user', null);
  const [token, setToken, removeToken] = useSessionStorage<string | null>('token', null);
  const [loggedIn, setLoggedIn] = useState(true);
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
      login: (newUser: User, newToken: string) => {
        setUser(newUser);
        setToken(newToken);
        setLoggedIn(true);
      },
      logout: () => {
        removeToken();
        removeUser();
        setLoggedIn(false);
      },
      authConfig
    }),
    [user, token, loggedIn, authConfig, removeToken, removeUser, setToken, setUser]
  );

  return <SecurityContext.Provider value={values}>{props.children}</SecurityContext.Provider>;
};
