import { useQuery } from '@tanstack/react-query';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import { DeleteOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { Avatar, Button, Collapse, Tooltip } from 'antd';
import { Organisation } from '../../models/organisation/Organisation';
import { Team } from '../../models/team/Team';
import { getTeamOrgs } from '../../api/teamApi';
import { TeamEntry } from './TeamEntry';

type OrganisationEntryProps = {
  org: Organisation;
};

export const OrganisationEntry: React.FC<OrganisationEntryProps> = (
  props: OrganisationEntryProps
) => {
  const [isHover, setIsHover] = useState(false);

  const [teams, setTeams] = useState<Team[]>([]);

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
    return (
      <div>
        {teams?.map(team => {
          return <TeamEntry team={team} key={team.id} />;
        })}
      </div>
    );
  };

  const organisationEntryStyle: CSSProperties = {
    transition: 'box-shadow .3s',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    padding: '10px',
    boxShadow: isHover
      ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
      : 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    width: '100%',
    height: '60px'
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

  return (
    <Collapse
      bordered={false}
      onChange={() => fetchTeams()}
      style={{
        width: '100%',
        backgroundColor: '#ffffff'
      }}
      expandIconPosition='end'
      size='large'
      items={[
        {
          key: '1',
          label: (
            <div>
              <div style={organisationEntryContentStyle}>
                <div style={titleOwnerStyle}>
                  <Title style={{ margin: '0' }} level={4} ellipsis={{ rows: 1, tooltip: true }}>
                    {props.org.name}
                  </Title>

                  <span style={userAvatarStyle}>
                    <Avatar size='small' icon={<UserOutlined />} />
                    <Title style={{ margin: '0' }} level={5} ellipsis={{ rows: 1, tooltip: true }}>
                      {props.org.owner.username}
                    </Title>
                  </span>
                </div>

                <span style={buttonContainerStyle}>
                  <Tooltip title='Manage users'>
                    <Button icon={<UserSwitchOutlined />} onClick={e => e.stopPropagation()} />
                  </Tooltip>

                  <Tooltip title='Delete'>
                    <Button danger icon={<DeleteOutlined />} onClick={e => e.stopPropagation()} />
                  </Tooltip>
                </span>
              </div>
            </div>
          ),
          children: getTeamEntryItems()
        }
      ]}
    />
  );
};
