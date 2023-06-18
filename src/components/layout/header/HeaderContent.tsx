import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { usePathContext } from '../../../context/PathContext';
import { UserAvatar } from './UserAvatar';

type HeaderContentProps = {
  isMenuFolded: boolean;
  setIsMenuFolded: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HeaderContent: React.FC<HeaderContentProps> = (props: HeaderContentProps) => {
  const { path } = usePathContext();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 8px'
      }}
    >
      <div>
        <Button
          style={{ marginRight: '8px' }}
          icon={props.isMenuFolded ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => props.setIsMenuFolded(!props.isMenuFolded)}
        />
        {path}
      </div>
      <UserAvatar />
    </div>
  );
};
