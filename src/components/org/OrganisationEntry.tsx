import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery
} from '@tanstack/react-query';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import { DeleteOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { Avatar, Button, Collapse, Modal, Tooltip } from 'antd';
import { Organisation } from '../../models/organisation/Organisation';
import { Team } from '../../models/team/Team';
import { getTeamOrgs } from '../../api/teamApi';
import { TeamEntry } from './TeamEntry';
import { useAuth } from '../../context/AuthContext';
import { deleteOrg } from '../../api/orgApi';
import { CreateTeamModal } from './CreateTeamModal';

type OrganisationEntryProps = {
  org: Organisation;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Organisation[], Error>>;
};

const organisationEntryContentStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignContent: 'center',
  gap: '30px',
  width: '100%'
};

const titleOwnerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  alignContent: 'center',
  gap: '30px',
  width: '90%'
};

const userAvatarStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  alignContent: 'center',
  gap: '10px'
};

const buttonContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'flex-end',
  alignItems: 'center',
  gap: '10px'
};

export const OrganisationEntry: React.FC<OrganisationEntryProps> = (
  props: OrganisationEntryProps
) => {
  const { user } = useAuth();

  const [isHover, setIsHover] = useState(false);

  const [teams, setTeams] = useState<Team[]>([]);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState<boolean>(false);

  const { isLoading, isError, error, data, refetch } = useQuery<Team[], Error>({
    queryKey: ['teams', props.org.id],
    queryFn: () => getTeamOrgs(props.org.id),
    enabled: false
  });

  useEffect(() => {
    if (data !== undefined) {
      setTeams(data);
    }
  }, [data]);

  const fetchTeams = () => {
    refetch();
  };

  const getTeamEntryItems = (): ReactNode => {
    if (teams.length === 0) {
      return (
        <Button
          style={{ width: '100%', marginTop: '10px' }}
          onClick={() => setIsCreateTeamModalOpen(true)}
        >
          Create Team
        </Button>
      );
    }
    return (
      <div>
        {teams?.map(team => {
          return <TeamEntry team={team} refetch={refetch} key={team.id} />;
        })}
        <Button
          style={{ width: '100%', marginTop: '10px' }}
          onClick={() => setIsCreateTeamModalOpen(true)}
        >
          Create Team
        </Button>
      </div>
    );
  };

  const organisationEntryStyle: CSSProperties = {
    width: '100%',
    backgroundColor: '#ffffff',
    transition: 'box-shadow .3s',
    boxShadow: isHover
      ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
      : 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
  };

  return (
    <div>
      <CreateTeamModal
        organisationId={props.org.id}
        isCreateTeamModalOpen={isCreateTeamModalOpen}
        setIsCreateTeamModalOpen={setIsCreateTeamModalOpen}
        refetch={refetch}
      />
      <Collapse
        bordered={false}
        onChange={() => fetchTeams()}
        style={organisationEntryStyle}
        expandIconPosition='end'
        size='large'
        items={[
          {
            key: '1',
            label: (
              <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <div style={organisationEntryContentStyle}>
                  <div style={titleOwnerStyle}>
                    <Title style={{ margin: '0' }} level={4} ellipsis={{ rows: 1, tooltip: true }}>
                      {props.org.name}
                    </Title>

                    <Tooltip title='Owner'>
                      <span style={userAvatarStyle}>
                        <Avatar size='small' icon={<UserOutlined />} />
                        <Title
                          style={{ margin: '0' }}
                          level={5}
                          ellipsis={{ rows: 1, tooltip: true }}
                        >
                          {props.org.owner.username}
                        </Title>
                      </span>
                    </Tooltip>
                  </div>

                  <span style={buttonContainerStyle}>
                    <Tooltip title='Manage members'>
                      <Button
                        icon={<UserSwitchOutlined />}
                        onClick={e => e.stopPropagation()}
                        disabled={!(props.org.owner.username === user?.username)}
                      />
                    </Tooltip>

                    <Tooltip title='Delete'>
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={e => {
                          e.stopPropagation();
                          const response: Promise<number> = deleteOrg(props.org.id);
                          response
                            .then(() => {
                              props.refetch();
                            })
                            // eslint-disable-next-line @typescript-eslint/no-shadow
                            .catch((error: Error) => {
                              alert(error.message);
                            });
                        }}
                      />
                    </Tooltip>
                  </span>
                </div>
              </div>
            ),
            children: getTeamEntryItems()
          }
        ]}
      />
    </div>
  );
};
