import { CSSProperties, useState } from 'react';
import { DeleteOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Tooltip } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { deleteProject } from '../../api/projectsApi';
import { Project } from '../../models/project/Project';
import { useAuth } from '../../context/AuthContext';
import { DateUtils } from '../../helpers/date';
import { AddUserModal } from './AddUserModal';

type ProjectEntryProps = {
  project: Project;
};

const buttonContainerStyle: CSSProperties = {
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  gap: '10px'
};

export const ProjectEntry: React.FC<ProjectEntryProps> = (props: ProjectEntryProps) => {
  const { user } = useAuth();
  const [isHover, setIsHover] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);

  const projectEntryStyle: CSSProperties = {
    transition: 'box-shadow .3s',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    gap: '10px',
    boxShadow: isHover
      ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
      : 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
  };

  const userAvatarStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    gap: '10px'
  };

  const projectHeaderStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  };

  const projectFooterStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '15px'
  };

  return (
    <div
      style={projectEntryStyle}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <AddUserModal
        project={props.project}
        isAddUserModalOpen={isAddUserModalOpen}
        setIsAddUserModalOpen={setIsAddUserModalOpen}
      />

      <span style={projectHeaderStyle}>
        <Title
          style={{ margin: '0', maxWidth: '50%' }}
          level={4}
          ellipsis={{ rows: 1, tooltip: true }}
        >
          {props.project.name}
        </Title>

        <span style={userAvatarStyle}>
          <Title style={{ margin: '0' }} level={5} ellipsis={{ rows: 1, tooltip: true }}>
            {props.project.owner.username}
          </Title>
          <Avatar size='small' icon={<UserOutlined />} />
        </span>
      </span>

      <Title style={{ margin: '0' }} level={5}>
        {props.project.team.name}
      </Title>

      <Paragraph style={{ margin: '0' }}>{props.project.private ? 'private' : 'public'}</Paragraph>

      <span style={projectFooterStyle}>
        <span style={buttonContainerStyle}>
          <Tooltip title='Add user'>
            <Button
              icon={<UserAddOutlined />}
              disabled={!(props.project.owner.username === user?.username)}
              onClick={() => setIsAddUserModalOpen(!isAddUserModalOpen)}
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

        <Paragraph style={{ margin: '0' }}>
          {DateUtils.toDateString(props.project.updatedAt.toLocaleString())}
        </Paragraph>
      </span>
    </div>
  );
};
