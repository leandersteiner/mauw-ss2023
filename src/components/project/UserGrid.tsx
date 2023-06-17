import Title from 'antd/es/typography/Title';
import Avatar from 'antd/es/avatar';
import { UserOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { CSSProperties } from 'react';
import { User } from '../../models/user/User';

type UserGridProps = {
  owner: User;
  members: User[];
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

export const UserGrid: React.FC<UserGridProps> = (props: UserGridProps) => {
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

      <Row gutter={[16, 4]}>
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
