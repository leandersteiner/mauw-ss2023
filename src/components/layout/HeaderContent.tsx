import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { usePathContext } from '../../context/PathContext';
import { useAuth } from '../../context/AuthContext';

type HeaderContentProps = {
  isMenuFolded: boolean;
  setIsMenuFolded: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HeaderContent: React.FC<HeaderContentProps> = (props: HeaderContentProps) => {
  const { path } = usePathContext();
  const { user } = useAuth();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 8px'
      }}
    >
      <Button
        icon={props.isMenuFolded ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => props.setIsMenuFolded(!props.isMenuFolded)}
      />
      <span>{path}</span>
      <span>{user?.username}</span>
    </div>
  );
};
