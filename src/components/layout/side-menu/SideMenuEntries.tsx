import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProjectOutlined,
  SettingOutlined,
  UngroupOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons';
import { NavigateFunction } from 'react-router';
import { MenuProps } from 'antd';
import { Project } from '../../../models/project/Project';

export type MenuItem = Required<MenuProps>['items'][number];

export function createLoggedInTopSideMenuEntries(
  navigate: NavigateFunction,
  projects: Project[]
): MenuItem[] {
  const homeEntry: MenuItem = {
    label: 'Home',
    icon: <HomeOutlined />,
    key: 'home',
    onClick: () => navigate('/home' ?? '/')
  };

  const organisationsEntry: MenuItem = {
    label: 'Organisations',
    icon: <UngroupOutlined />,
    key: 'organisations',
    onClick: () => navigate('/orgs' ?? '/')
  };

  const projectChildEntries: MenuItem[] = projects
    .sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    })
    .map(project => {
      return {
        label: project.name,
        icon: null,
        key: project.id,
        onClick: () =>
          navigate(
            `/orgs/${project.team.organisation.id}/teams/${project.team.id}/projects/${project.id}/board` ??
              '/'
          )
      } as MenuItem;
    })
    .slice(0, 8);

  projectChildEntries.push({
    label: 'All Projects',
    key: 'projects',
    onClick: () => navigate('/projects' ?? '/')
  } as MenuItem);

  const projectEntry: MenuItem = {
    label: 'Projects',
    icon: <ProjectOutlined />,
    key: 'recentProjects',
    children: projectChildEntries
  };

  return Array.of(homeEntry, organisationsEntry, projectEntry);
}

export function createLoggedInBottomSideMenuEntries(navigate: NavigateFunction): MenuItem[] {
  const profile: MenuItem = {
    label: 'Profile',
    icon: <UserOutlined />,
    key: 'profile',
    onClick: () => navigate('/profile' ?? '/')
  };

  const logout: MenuItem = {
    label: 'Logout',
    icon: <LogoutOutlined />,
    key: 'logout',
    onClick: () => navigate('/auth/logout' ?? '/')
  };

  return Array.of(profile, logout);
}

export function createLoggedOutTopSideMenuEntries(navigate: NavigateFunction): MenuItem[] {
  const homeEntry: MenuItem = {
    label: 'Home',
    icon: <HomeOutlined />,
    key: 'home',
    onClick: () => navigate('/home' ?? '/')
  };

  return Array.of(homeEntry);
}

export function createLoggedOutBottomSideMenuEntries(navigate: NavigateFunction): MenuItem[] {
  const login: MenuItem = {
    label: 'Login',
    icon: <LoginOutlined />,
    key: 'login',
    onClick: () => navigate('/auth/login' ?? '/')
  };

  const register: MenuItem = {
    label: 'Register',
    icon: <UserAddOutlined />,
    key: 'register',
    onClick: () => navigate('/auth/register' ?? '/')
  };

  return Array.of(login, register);
}
