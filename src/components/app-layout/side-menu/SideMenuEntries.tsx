import { HomeOutlined, PlusOutlined, ProjectOutlined, SettingOutlined } from '@ant-design/icons';
import { SideMenuEntry } from './SideMenuUtils';

const home: SideMenuEntry = {
  label: 'Home',
  icon: <HomeOutlined />
};

const projects: SideMenuEntry = {
  label: 'Projects',
  icon: <ProjectOutlined />
};

const settings: SideMenuEntry = {
  label: 'Settings',
  icon: <SettingOutlined />
};

const createProject: SideMenuEntry = {
  label: 'Create Project',
  icon: <PlusOutlined />,
  onClick: () => { }
};

export function createTopSideMenuEntries(): SideMenuEntry[] {
  return Array.of(home, projects);
}

export function createBottomSideMenuEntries(): SideMenuEntry[] {
  return Array.of(createProject, settings);
}
