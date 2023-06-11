import { Menu } from 'antd';
import { CSSProperties, Key } from 'react';
import { useNavigate } from 'react-router';
import { MenuItem, toMenuItemArray } from './SideMenuUtils';
import { useAuth } from '../../../context/AuthContext';
import {
  loggedInBottomSideMenuEntries,
  loggedInTopSideMenuEntries,
  loggedOutBottomSideMenuEntries,
  loggedOutTopSideMenuEntries
} from './SideMenuEntries';
import { usePathContext } from '../../../context/PathContext';

export const SideMenu: React.FC = () => {
  const navigator = useNavigate();
  const { token } = useAuth();
  const { path } = usePathContext();

  const topItems: MenuItem[] = toMenuItemArray(
    token ? loggedInTopSideMenuEntries : loggedOutTopSideMenuEntries,
    navigator
  );

  const bottomItems: MenuItem[] = toMenuItemArray(
    token ? loggedInBottomSideMenuEntries : loggedOutBottomSideMenuEntries,
    navigator
  );

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
          <Menu theme='dark' mode='inline' items={topItems} selectedKeys={[path]} />
        </div>
        <div>
          <Menu
            selectable={false}
            style={bottomMenuStyle}
            theme='dark'
            mode='inline'
            items={bottomItems}
            selectedKeys={[path]}
          />
        </div>
      </div>
    </div>
  );
};
