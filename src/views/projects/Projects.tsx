import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { usePathContext } from '../../context/PathContext';
import { Project } from '../../models/project/Project';
import { getProjects } from '../../api/projectsApi';
import { ProjectEntry } from '../../components/project/ProjectEntry';

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>();

  const { mutate: getUsersProjects } = useMutation(getProjects, {
    onSuccess: (response: Project[]) => {
      setProjects(response);
    }
  });

  const { setPath } = usePathContext();
  useEffect(() => setPath('projects'), [setPath]);
  useEffect(() => getUsersProjects(), [getUsersProjects]);

  return (
    <div>
      {projects?.map(item => {
        // eslint-disable-next-line react/jsx-key
        return <ProjectEntry id={item.id} name={item.name} />;
      })}
    </div>
  );
};
