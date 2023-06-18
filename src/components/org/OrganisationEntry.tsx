import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Organisation } from '../../models/organisation/Organisation';
import { Team } from '../../models/team/Team';
import { getTeamOrgs } from '../../api/teamApi';

type OrganisationEntryProps = {
  org: Organisation;
};

export const OrganisationEntry: React.FC<OrganisationEntryProps> = (
  props: OrganisationEntryProps
) => {
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

  return <div> </div>;
};
