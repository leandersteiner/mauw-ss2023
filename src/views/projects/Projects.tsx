import { CSSProperties, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row, Skeleton } from 'antd';
import { usePathContext } from '../../context/PathContext';
import { Project } from '../../models/project/Project';
import { getProjects } from '../../api/projectsApi';
import { ProjectEntry } from '../../components/project/ProjectEntry';
import { CreateProjectModal } from '../../components/project/CreateProjectModal';
import { DateUtils } from '../../helpers/date';

const topBarStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '10px'
};

export const Projects = () => {
  const { setPath } = usePathContext();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);

  const { isLoading, isError, error, data } = useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: getProjects
  });

  useEffect(() => setPath('projects'), [setPath]);

  useEffect(() => {
    if (data !== undefined) {
      setProjects(
        data.sort((a, b) => {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        })
      );
    }
  }, [data]);

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <span>
      <CreateProjectModal
        isCreateProjectModalOpen={isCreateProjectModalOpen}
        setIsCreateProjectModalOpen={setIsCreateProjectModalOpen}
        projects={projects}
        setProjects={setProjects}
      />
      <div style={topBarStyle}>
        <Button icon={<PlusOutlined />} onClick={() => setIsCreateProjectModalOpen(true)}>
          Create Project
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {projects?.map(project => {
          return (
            <Col xs={24} sm={12} md={8} lg={8} xl={6} key={project.id}>
              <ProjectEntry project={project} key={project.id} />
            </Col>
          );
        })}
      </Row>
    </span>
  );
};
