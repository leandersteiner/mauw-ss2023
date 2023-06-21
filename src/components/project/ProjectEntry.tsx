import { CSSProperties, useEffect, useState } from 'react';
import { DeleteOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Avatar, Button, Tooltip } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { useNavigate } from 'react-router';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery
} from '@tanstack/react-query';
import { deleteProject, getProjecById } from '../../api/projectsApi';
import { Project } from '../../models/project/Project';
import { useAuth } from '../../context/AuthContext';
import { DateUtils } from '../../helpers/date';
import { MemberManagementModal } from '../user-management/MemberManagementModal';

type ProjectEntryProps = {
  project: Project;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Project[], Error>>;
};

const buttonContainerStyle: CSSProperties = {
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  gap: '10px'
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

export const ProjectEntry: React.FC<ProjectEntryProps> = (props: ProjectEntryProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isHover, setIsHover] = useState(false);
  const [isMemberManagementModalOpen, setIsMemberManagementModalOpen] = useState(false);
  const [project, setProject] = useState<Project>(props.project);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const { data, refetch } = useQuery<Project, Error>({
    queryKey: ['project', props.project.id],
    queryFn: () => getProjecById(props.project.id),
    enabled: false
  });

  useEffect(() => {
    if (data !== undefined) {
      setProject(data);
    }
  }, [data]);

  const navigateToProject = () => {
    navigate(`/home/projects/${props.project.id}/boards` ?? '/');
  };

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

  return (
    <div>
      <MemberManagementModal
        isMemberManagementModalOpen={isMemberManagementModalOpen}
        setIsMemberManagementModalOpen={setIsMemberManagementModalOpen}
        owner={project.owner}
        members={project.members}
        refetch={refetch}
        orgId={project.team.organisation.id}
        teamId={project.team.id}
        projectId={project.id}
      />

      <div
        role='presentation'
        style={projectEntryStyle}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <span style={projectHeaderStyle}>
          <Tooltip placement='bottom' title='Open Project'>
            <Title
              style={{ margin: '0', maxWidth: '50%' }}
              level={4}
              ellipsis={{ rows: 1, tooltip: true }}
              onClick={navigateToProject}
            >
              {project.name}
            </Title>
          </Tooltip>
          <span style={userAvatarStyle}>
            <Title style={{ margin: '0' }} level={5} ellipsis={{ rows: 1, tooltip: true }}>
              {project.owner.username}
            </Title>
            <Avatar size='small' icon={<UserOutlined />} />
          </span>
        </span>

        <Title style={{ margin: '0' }} level={5}>
          {project.team.name}
        </Title>

        <Paragraph style={{ margin: '0' }}>{project.private ? 'private' : 'public'}</Paragraph>

        <span style={projectFooterStyle}>
          <span style={buttonContainerStyle}>
            <Tooltip title='Manage members'>
              <Button
                icon={<UserSwitchOutlined />}
                disabled={!(project.owner.username === user?.username)}
                onClick={() => setIsMemberManagementModalOpen(true)}
              />
            </Tooltip>

            <Tooltip title='Delete'>
              <Button
                danger
                icon={<DeleteOutlined />}
                loading={isDeleting}
                onClick={() => {
                  setIsDeleting(true);
                  const response: Promise<number> = deleteProject(
                    project.team.organisation.id,
                    project.team.id,
                    project.id
                  );

                  response
                    .then(() => {
                      props.refetch();
                      setIsDeleting(false);
                    })
                    .catch((error: Error) => {
                      alert(error.message);
                      setIsDeleting(false);
                    });
                }}
                disabled={!(project.owner.username === user?.username)}
              />
            </Tooltip>
          </span>

          <Paragraph style={{ margin: '0' }}>
            {DateUtils.toDateString(project.updatedAt.toLocaleString())}
          </Paragraph>
        </span>
      </div>
    </div>
  );
};
