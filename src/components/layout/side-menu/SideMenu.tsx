import { Menu } from 'antd';
import { CSSProperties, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { ProjectOutlined } from '@ant-design/icons';
import { SideMenuEntry, toMenuItemArray } from './SideMenuUtils';
import { useAuth } from '../../../context/AuthContext';
import {
  loggedInBottomSideMenuEntries,
  loggedInTopSideMenuEntries,
  loggedOutBottomSideMenuEntries,
  loggedOutTopSideMenuEntries
} from './SideMenuEntries';
import { usePathContext } from '../../../context/PathContext';
import { getProjects } from '../../../api/projectsApi';
import { Project } from '../../../models/project/Project';

export const SideMenu: React.FC = () => {
  const navigator = useNavigate();
  const { token } = useAuth();
  const { path } = usePathContext();
  let topEntries = token ? loggedInTopSideMenuEntries : loggedOutTopSideMenuEntries;
  const bottomEntries = token ? loggedInBottomSideMenuEntries : loggedOutBottomSideMenuEntries;

  const { mutate: getUsersProjects } = useMutation(getProjects, {
    onSuccess: (response: Project[]) => {
      const entries = response.map(project => {
        return {
          label: project.name,
          key: project.name,
          icon: null,
          url: ''
        } as SideMenuEntry;
      });

      const projectsEntry: SideMenuEntry = {
        label: 'Projects',
        key: 'projects',
        icon: <ProjectOutlined />,
        url: '/home/projects',
        childEntries: entries
      };

      const newEntries = loggedInTopSideMenuEntries;
      newEntries[newEntries.length - 1] = projectsEntry;

      topEntries = newEntries;
    }
  });

  useEffect(() => {
    getUsersProjects();
  }, [getUsersProjects]);

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
          <Menu
            theme='dark'
            mode='inline'
            items={toMenuItemArray(topEntries, navigator)}
            selectedKeys={[path]}
          />
        </div>
        <div>
          <Menu
            selectable={false}
            style={bottomMenuStyle}
            theme='dark'
            mode='inline'
            items={toMenuItemArray(bottomEntries, navigator)}
            selectedKeys={[path]}
          />
        </div>
      </div>
    </div>
  );
};
