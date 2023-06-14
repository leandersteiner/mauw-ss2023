import { CSSProperties, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { usePathContext } from '../../context/PathContext';
import { Project } from '../../models/project/Project';
import { getProjects } from '../../api/projectsApi';
import { ProjectEntry } from '../../components/project/ProjectEntry';
import { CreateProjectModal } from '../../components/project/CreateProjectModal';

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>();
  const [isCreateProjectModalOpen, setisCreateProjectModalOpen] = useState(false);

  const { mutate: getUsersProjects } = useMutation(getProjects, {
    onSuccess: (response: Project[]) => {
      setProjects(response);
    }
  });

  const { setPath } = usePathContext();
  useEffect(() => setPath('projects'), [setPath]);
  useEffect(() => getUsersProjects(), [getUsersProjects]);

  const topBarStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '10px'
  };

  return (
    <span>
      <CreateProjectModal
        isCreateProjectModalOpen={isCreateProjectModalOpen}
        setIsCreateProjectModalOpen={setisCreateProjectModalOpen}
      />
      <div style={topBarStyle}>
        <Button icon={<PlusOutlined />} onClick={() => setisCreateProjectModalOpen(true)}>
          Create Project
        </Button>
      </div>
      <div>
        {projects?.map(project => {
          // eslint-disable-next-line react/jsx-key
          return <ProjectEntry project={project} />;
        })}
      </div>
    </span>
  );
};
