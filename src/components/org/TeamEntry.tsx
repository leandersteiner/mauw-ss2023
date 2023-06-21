import Title from 'antd/es/typography/Title';
import { Button, Tooltip } from 'antd';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import { DeleteOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { CSSProperties, useState } from 'react';
import { Team } from '../../models/team/Team';
import { deleteTeam } from '../../api/teamApi';

type TeamEntryProps = {
  team: Team;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Team[], Error>>;
};

const buttonContainerStyle: CSSProperties = {
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  gap: '10px'
};

const teamEntryWrapperStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',
  alignItems: 'center',
  gap: '10px',
  width: '100%',
  marginTop: '10px'
};

export const TeamEntry: React.FC<TeamEntryProps> = (props: TeamEntryProps) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDeleteTeam = () => {
    setIsDeleting(true);
    const response: Promise<number> = deleteTeam(props.team.organisation.id, props.team.id);
    response
      .then(() => {
        props.refetch();
        setIsDeleting(false);
      })
      .catch((error: Error) => {
        alert(error.message);
        setIsDeleting(false);
      });
  };

  return (
    <div style={teamEntryWrapperStyle}>
      <Title
        style={{ margin: '0', maxWidth: '50%' }}
        level={4}
        ellipsis={{ rows: 1, tooltip: true }}
      >
        {props.team.name}
      </Title>

      <span style={buttonContainerStyle}>
        <Tooltip title='Manage members'>
          <Button icon={<UserSwitchOutlined />} />
        </Tooltip>

        <Tooltip title='Delete'>
          <Button
            danger
            loading={isDeleting}
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteTeam()}
          />
        </Tooltip>
      </span>
    </div>
  );
};
