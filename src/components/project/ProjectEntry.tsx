import { CSSProperties } from 'react';
import { DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import Title from 'antd/es/typography/Title';
import { deleteProject } from '../../api/projectsApi';
import { Project } from '../../models/project/Project';
import { useAuth } from '../../context/AuthContext';

type ProjectEntryProps = {
  project: Project;
};

const projectEntryStyle: CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '5px',
  marginBottom: '20px',
  padding: '10px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignContent: 'center',
  gap: '10px'
};

const buttonContainerStyle: CSSProperties = {
  display: 'flex',
  gap: '10px'
};

export const ProjectEntry: React.FC<ProjectEntryProps> = (props: ProjectEntryProps) => {
  const { user } = useAuth();

  return (
    <div style={projectEntryStyle}>
      <Title style={{ margin: '0' }} level={5}>
        {props.project.team.name} / {props.project.name}
      </Title>

      <span style={buttonContainerStyle}>
        <Tooltip title='Add user'>
          <Button
            icon={<UserAddOutlined />}
            disabled={!(props.project.owner.username === user?.username)}
          />
        </Tooltip>

        <Tooltip title='Delete'>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() =>
              deleteProject(
                props.project.team.organisation.id,
                props.project.team.id,
                props.project.id
              )
            }
            disabled={!(props.project.owner.username === user?.username)}
          />
        </Tooltip>
      </span>
    </div>
  );
};
