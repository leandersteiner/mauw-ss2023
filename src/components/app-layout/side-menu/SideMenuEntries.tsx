import { HomeOutlined, PlusOutlined, ProjectOutlined, SettingOutlined } from '@ant-design/icons';
import { SideMenuEntry } from './SideMenuUtils';

const home: SideMenuEntry = {
  label: 'Home',
  icon: <HomeOutlined />,
  url: '/home/123/boards'
};

const projects: SideMenuEntry = {
  label: 'Projects',
  icon: <ProjectOutlined />,
  url: '/home/123'
};

const settings: SideMenuEntry = {
  label: 'Settings',
  icon: <SettingOutlined />,
  url: '/home/123'
};

const createProject: SideMenuEntry = {
  label: 'Create Project',
  icon: <PlusOutlined />,
  url: '/home/123/create-project'
};

export function createTopSideMenuEntries(): SideMenuEntry[] {
  return Array.of(home, projects);
}

export function createBottomSideMenuEntries(): SideMenuEntry[] {
  return Array.of(createProject, settings);
}
