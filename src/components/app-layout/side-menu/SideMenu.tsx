import { Menu } from 'antd';
import { CSSProperties } from 'react';
import { useNavigate } from 'react-router';
import { MenuItem, toMenuItemArray } from './SideMenuUtils';
import { createBottomSideMenuEntries, createTopSideMenuEntries } from './SideMenuEntries';

export const SideMenu: React.FC = () => {
  const navigator = useNavigate();

  const topItems: MenuItem[] = toMenuItemArray(createTopSideMenuEntries(), navigator);
  const bottomItems: MenuItem[] = toMenuItemArray(createBottomSideMenuEntries(), navigator);

  const menuWrapperStyle: CSSProperties = {
    overflow: 'auto',
    height: '100%'
  };

  const menuContatinerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '90%'
  };

  const bottomMenuStyle: CSSProperties = {
    marginBottom: 'auto'
  };

  const logo: CSSProperties = {
    height: 32,
    margin: 17,
    background: 'rgba(255, 255, 255, 0.2)'
  };

  return (
    <div style={menuWrapperStyle}>
      <div style={logo} />
      <div style={menuContatinerStyle}>
        <div>
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['0']} items={topItems} />
        </div>
        <div>
          <Menu style={bottomMenuStyle} theme='dark' mode='inline' items={bottomItems} />
        </div>
      </div>
    </div>
  );
};
