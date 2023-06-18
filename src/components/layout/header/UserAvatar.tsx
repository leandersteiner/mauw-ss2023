import React, { CSSProperties } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { useAuth } from '../../../context/AuthContext';

export const UserAvatar: React.FC = () => {
  const { user } = useAuth();

  const userAvatarStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    gap: '10px'
  };

  return (
    <span style={userAvatarStyle}>
      <Title style={{ margin: '0' }} level={5}>
        {user?.username}
      </Title>
      <Avatar size='large' icon={<UserOutlined />} />
    </span>
  );
};
