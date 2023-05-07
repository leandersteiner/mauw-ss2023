import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';

interface PathContextType {
  path: string;
  setPath: Dispatch<SetStateAction<string>>;
}

const defaultContext: PathContextType = { path: '', setPath: () => { } };

const context = createContext<PathContextType>(defaultContext);

export const usePathContext = () => useContext(context);

export const PathContextProvider = (props: { children: ReactNode }) => {
  const [path, setPath] = useState('home');

  const pathContextProviderValue = useMemo(() => ({ path, setPath }), [path, setPath]);

  return <context.Provider value={pathContextProviderValue}>{props.children}</context.Provider>;
};
