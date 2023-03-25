import {
  Dispatch,
  DispatchWithoutAction,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react';

const getSavedValue = <T>(key: string, initialValue: T, storage: Storage): T => {
  const jsonValue = storage.getItem(key);
  if (jsonValue != null) return JSON.parse(jsonValue) as T;

  if (initialValue instanceof Function) return initialValue() as T;
  return initialValue;
};

const useStorage = <T>(
  key: string,
  initialValue: T,
  storage: Storage
): [T | null, Dispatch<SetStateAction<T | null>>, DispatchWithoutAction] => {
  const [value, setValue] = useState<T | null>(getSavedValue(key, initialValue, storage));

  useEffect(() => {
    if (value === null) return storage.removeItem(key);
    storage.setItem(key, JSON.stringify(value));
  }, [key, value, storage]);

  const removeValue = useCallback(() => setValue(null), []);

  return [value, setValue, removeValue];
};

/**
 * Example:
 * const [token, setToken, removeToken] = useSessionStorage("token", "")
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  return useStorage(key, initialValue, window.localStorage);
};

export const useSessionStorage = <T>(key: string, initialValue: T) => {
  return useStorage(key, initialValue, window.sessionStorage);
};
