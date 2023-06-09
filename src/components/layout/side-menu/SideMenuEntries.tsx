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
import { SideMenuEntry } from './SideMenuUtils';

const home: SideMenuEntry = {
  label: 'Home',
  key: 'home',
  icon: <HomeOutlined />,
  url: '/home'
};

const projects: SideMenuEntry = {
  label: 'Projects',
  key: 'projects',
  icon: <ProjectOutlined />,
  url: '/home/projects'
};

const organisations: SideMenuEntry = {
  label: 'Organisations',
  key: 'organisations',
  icon: <UngroupOutlined />,
  url: '/home/orgs'
};

const settings: SideMenuEntry = {
  label: 'Settings',
  key: 'settings',
  icon: <SettingOutlined />,
  url: '/home/settings'
};

const profile: SideMenuEntry = {
  label: 'Profile',
  key: 'profile',
  icon: <UserOutlined />,
  url: '/user'
};

const logout: SideMenuEntry = {
  label: 'Logout',
  key: 'logout',
  icon: <LogoutOutlined />,
  url: '/auth/logout'
};

const login: SideMenuEntry = {
  label: 'Login',
  key: 'login',
  icon: <LoginOutlined />,
  url: '/auth/login'
};

const register: SideMenuEntry = {
  label: 'Register',
  key: 'register',
  icon: <UserAddOutlined />,
  url: '/auth/register'
};

export const loggedInTopSideMenuEntries: SideMenuEntry[] = Array.of(home, organisations, projects);
export const loggedInBottomSideMenuEntries: SideMenuEntry[] = Array.of(profile, logout, settings);

export const loggedOutTopSideMenuEntries: SideMenuEntry[] = Array.of(home);
export const loggedOutBottomSideMenuEntries: SideMenuEntry[] = Array.of(login, register);
