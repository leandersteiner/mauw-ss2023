import { Menu } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { LoadingOutlined } from '@ant-design/icons';
import { useAuth } from '../../../context/AuthContext';
import {
  MenuItem,
  createLoggedInBottomSideMenuEntries,
  createLoggedInTopSideMenuEntries,
  createLoggedOutBottomSideMenuEntries,
  createLoggedOutTopSideMenuEntries
} from './SideMenuEntries';
import { usePathContext } from '../../../context/PathContext';
import { getProjects } from '../../../api/projectsApi';
import { Project } from '../../../models/project/Project';

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

export const SideMenu: React.FC = () => {
  const navigator = useNavigate();
  const { token } = useAuth();
  const { path } = usePathContext();

  const [topEntries, setTopEntries] = useState<MenuItem[]>(
    Array.of({
      label: '',
      icon: <LoadingOutlined />,
      key: 'loading'
    })
  );
  const bottomEntries = token
    ? createLoggedInBottomSideMenuEntries(navigator)
    : createLoggedOutBottomSideMenuEntries(navigator);

  const { data } = useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: getProjects,
    enabled: !!token
  });

  useEffect(() => {
    if (data !== undefined) {
      setTopEntries(createLoggedInTopSideMenuEntries(navigator, data));
    }
  }, [data, navigator]);

  useEffect(() => {
    if (!token) {
      setTopEntries(createLoggedOutTopSideMenuEntries(navigator));
    }
  }, [navigator, token]);

  return (
    <div style={menuWrapperStyle}>
      <div style={logo} />
      <div style={menuContatinerStyle}>
        <div>
          <Menu
            theme='dark'
            mode='inline'
            items={topEntries}
            selectedKeys={[path]}
            defaultOpenKeys={['recentProjects']}
          />
        </div>
        <div>
          <Menu
            selectable={false}
            style={bottomMenuStyle}
            theme='dark'
            mode='inline'
            items={bottomEntries}
            selectedKeys={[path]}
          />
        </div>
      </div>
    </div>
  );
};
