import { useEffect } from 'react';
import { usePathContext } from '../../context/PathContext';

export const Organisations = () => {
  const { setPath } = usePathContext();
  useEffect(() => setPath('organisations'), [setPath]);

  return <>Organisations</>;
};
