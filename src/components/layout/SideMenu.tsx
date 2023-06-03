import { Menu } from 'antd';
import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { usePathContext } from '../../context/PathContext';

const menuWrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
};

const logoStyle: CSSProperties = {
  height: 32,
  margin: 16,
  background: 'rgba(255, 255, 255, 0.2)'
};

const menuStyle: CSSProperties = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
};

const bottomMenuStyle: CSSProperties = {
  marginTop: 'auto'
};

export const SideMenu: React.FC = () => {
  const { path } = usePathContext();

  return (
    <div style={menuWrapperStyle}>
      <div style={logoStyle} />
      <Menu theme='dark' mode='vertical' style={menuStyle} selectedKeys={[path]}>
        <Menu.ItemGroup>
          <Menu.Item key='home'>
            <Link to='/home'>
              <UserOutlined />
              <span>Home</span>
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup style={bottomMenuStyle}>
          <Menu.Item key='login'>
            <Link to='login'>
              <UserOutlined />
              <span>Login</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='register'>
            <Link to='register'>
              <UserOutlined />
              <span>Register</span>
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </div>
  );
};
