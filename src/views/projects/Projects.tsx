import { CSSProperties, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { usePathContext } from '../../context/PathContext';
import { Project } from '../../models/project/Project';
import { getProjects } from '../../api/projectsApi';
import { ProjectEntry } from '../../components/project/ProjectEntry';
import { CreateProjectModal } from '../../components/project/CreateProjectModal';

const topBarStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '10px'
};

export const Projects = () => {
  const { setPath } = usePathContext();

  const [projects, setProjects] = useState<Project[]>();
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);

  const { mutate: getUsersProjects } = useMutation(getProjects, {
    onSuccess: (response: Project[]) => {
      setProjects(response);
    }
  });

  useEffect(() => setPath('projects'), [setPath]);
  useEffect(() => getUsersProjects(), [getUsersProjects]);

  return (
    <span>
      <CreateProjectModal
        isCreateProjectModalOpen={isCreateProjectModalOpen}
        setIsCreateProjectModalOpen={setIsCreateProjectModalOpen}
      />
      <div style={topBarStyle}>
        <Button icon={<PlusOutlined />} onClick={() => setIsCreateProjectModalOpen(true)}>
          Create Project
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {projects?.map(project => {
          return (
            <Col xs={14} sm={12} md={10} lg={8} xl={6} key={project.id}>
              <ProjectEntry project={project} key={project.id} />
            </Col>
          );
        })}
      </Row>
    </span>
  );
};
