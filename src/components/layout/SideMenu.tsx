import { Menu } from 'antd';
import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

export const SideMenu: React.FC = () => {
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

  return (
    <div style={menuWrapperStyle}>
      <div style={logoStyle} />
      <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} style={menuStyle}>
        <Menu.ItemGroup>
          <Menu.Item key='1'>
            <Link to='/home'>
              <UserOutlined />
              <span>Home</span>
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup style={bottomMenuStyle}>
          <Menu.Item key='2'>
            <Link to='/auth/login'>
              <UserOutlined />
              <span>Login</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Link to='/auth/register'>
              <UserOutlined />
              <span>Register</span>
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </div>
  );
};
