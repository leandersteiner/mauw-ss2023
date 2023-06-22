import { useEffect, useRef } from 'react';
import { InputRef } from 'antd';

export const useFocus = () => {
  const ref = useRef<InputRef>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return ref;
};
