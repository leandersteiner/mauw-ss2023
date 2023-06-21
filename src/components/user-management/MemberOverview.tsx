import { CSSProperties } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Row, Col } from 'antd';
import Title from 'antd/es/typography/Title';
import { User } from '../../models/user/User';

type MemberOverviewProps = {
  members: User[];
  owner: User;
};

const userAvatarOwnerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  gap: '10px'
};

const userAvatarStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  alignContent: 'center',
  gap: '10px'
};

export const MemberOverview: React.FC<MemberOverviewProps> = (props: MemberOverviewProps) => {
  return (
    <div>
      <span style={userAvatarOwnerStyle}>
        <Avatar
          style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
          size='small'
          icon={<UserOutlined />}
        />
        <Title style={{ margin: '0' }} level={5} ellipsis={{ rows: 1, tooltip: true }}>
          {props.owner.username}
        </Title>
      </span>

      <Row gutter={[16, 4]} justify='center'>
        {props.members.map(user => {
          return (
            <Col xs={10} sm={10} md={10} lg={8} xl={8} key={user.id} style={{ marginTop: '20px' }}>
              <span style={userAvatarStyle}>
                <Avatar size='small' icon={<UserOutlined />} />
                <Title
                  style={{ margin: '0', maxWidth: '70%' }}
                  level={5}
                  ellipsis={{ rows: 1, tooltip: true }}
                >
                  {user.username}
                </Title>
              </span>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
