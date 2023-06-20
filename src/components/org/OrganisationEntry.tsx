import { useQuery } from '@tanstack/react-query';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import Title from 'antd/es/typography/Title';
import { Collapse } from 'antd';
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    gap: '10px',
    boxShadow: isHover
      ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
      : 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    width: '100%'
  };

  return (
    <div
      style={organisationEntryStyle}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Title
        style={{ margin: '0', maxWidth: '50%' }}
        level={4}
        ellipsis={{ rows: 1, tooltip: true }}
      >
        {props.org.name}
      </Title>

      <Collapse
        bordered={false}
        onChange={() => fetchTeams()}
        style={{ width: '100%', marginTop: '-40px', backgroundColor: 'transparent' }}
        expandIconPosition='end'
        size='small'
        items={[
          {
            key: '1',
            label: '',
            children: getTeamEntryItems()
          }
        ]}
      />
    </div>
  );
};
