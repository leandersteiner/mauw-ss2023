import { CSSProperties } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { deleteProject } from '../../api/projectsApi';
import Title from 'antd/es/typography/Title';

type ProjectEntryProps = {
  id: string;
  name: string;
};

const projectEntryStyle: CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '5px',
  marginBottom: '20px',
  padding: '10px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  alignContent: 'center',
  gap: '10px'
};

export const ProjectEntry: React.FC<ProjectEntryProps> = (props: ProjectEntryProps) => {
  return (
    <div style={projectEntryStyle}>
      <Title style={{ margin: '0' }} level={5}>
        {props.name}
      </Title>

      <Tooltip title='Add user'>
        <Button icon={<PlusOutlined />} />
      </Tooltip>

      <Tooltip title='Delete'>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => deleteProject('orgId', 'teamId', props.id)}
        />
      </Tooltip>
    </div>
  );
};
