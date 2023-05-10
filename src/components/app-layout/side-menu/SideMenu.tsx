import { Menu } from 'antd';
import { CSSProperties } from 'react';
import { MenuItem, toMenuItemArray } from './SideMenuUtils';
import { createBottomSideMenuEntries, createTopSideMenuEntries } from './SideMenuEntries';

export const SideMenu: React.FC = () => {
  const topItems: MenuItem[] = toMenuItemArray(createTopSideMenuEntries());

  const bottomItems: MenuItem[] = toMenuItemArray(createBottomSideMenuEntries());

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
    <>
      <div style={menuWrapperStyle}>
        <div style={logo}></div>
        <div style={menuContatinerStyle}>
          <div>
            <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} items={topItems}></Menu>
          </div>
          <div>
            <Menu style={bottomMenuStyle} theme='dark' mode='inline' items={bottomItems}></Menu>
          </div>
        </div>
      </div>
    </>
  );
};
