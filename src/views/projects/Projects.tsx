import { useEffect } from 'react';
import { usePathContext } from '../../context/PathContext';

export const Projects = () => {
  const { setPath } = usePathContext();
  useEffect(() => setPath('projects'), [setPath]);

  return <>Projects</>;
};
