import { useEffect } from 'react';
import { usePathContext } from '../../context/PathContext';

export const Settings = () => {
  const { setPath } = usePathContext();
  useEffect(() => setPath('settings'), [setPath]);

  return <>Settings</>;
};
