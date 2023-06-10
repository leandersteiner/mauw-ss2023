import { Menu } from 'antd';
import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined, LoginOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { usePathContext } from '../../context/PathContext';
import { useAuth } from '../../context/AuthContext';

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
  const { token } = useAuth();

  const topMenuItems = (
    <>
      <Menu.Item key='home'>
        <Link to='/home'>
          <HomeOutlined />
          <span>Home</span>
        </Link>
      </Menu.Item>
      <Menu.Item key='board'>
        <Link to='/board'>
          <HomeOutlined />
          <span>Board</span>
        </Link>
      </Menu.Item>
    </>
  );
  const bottomMenuItems = (
    <>
      <Menu.Item key='login'>
        <Link to='login'>
          <LoginOutlined />
          <span>Login</span>
        </Link>
      </Menu.Item>
      <Menu.Item key='register'>
        <Link to='register'>
          <UserAddOutlined />
          <span>Register</span>
        </Link>
      </Menu.Item>
    </>
  );

  const bottomMenuItemsLoggedIn = (
    <>
      <Menu.Item key='profile'>
        <Link to='/user'>
          <UserOutlined />
          <span>Profile</span>
        </Link>
      </Menu.Item>
      <Menu.Item key='logout'>
        <Link to='/auth/logout'>
          <UserOutlined />
          <span>Logout</span>
        </Link>
      </Menu.Item>
    </>
  );

  return (
    <div style={menuWrapperStyle}>
      <div style={logoStyle} />
      <Menu theme='dark' mode='vertical' style={menuStyle} selectedKeys={[path]}>
        <Menu.ItemGroup>{topMenuItems}</Menu.ItemGroup>
        <Menu.ItemGroup style={bottomMenuStyle}>
          {token ? bottomMenuItemsLoggedIn : bottomMenuItems}
        </Menu.ItemGroup>
      </Menu>
    </div>
  );
};
