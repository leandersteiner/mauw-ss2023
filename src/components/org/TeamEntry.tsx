import Title from 'antd/es/typography/Title';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined, UserAddOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { CSSProperties } from 'react';
import { Team } from '../../models/team/Team';

type TeamEntryProps = {
  team: Team;
};

export const TeamEntry: React.FC<TeamEntryProps> = (props: TeamEntryProps) => {
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
          <Button danger icon={<DeleteOutlined />} />
        </Tooltip>
      </span>
    </div>
  );
};
