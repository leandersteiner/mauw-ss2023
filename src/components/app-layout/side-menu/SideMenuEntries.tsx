import { HomeOutlined, PlusOutlined, ProjectOutlined, SettingOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Key, ReactNode } from 'react';

export type MenuItem = Required<MenuProps>['items'][number];

export type SideMenuEntry = {
  label: string;
  icon: ReactNode;
  childEntries?: SideMenuEntry[];
  disabled?: boolean;
  onClick?: () => void;
};

function createMenuItem(
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[],
  disabled?: boolean,
  onClick?: () => void
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    disabled,
    onClick
  } as MenuItem;
}

export function toMenuItemArray(menuEntries: SideMenuEntry[]): MenuItem[] {
  return menuEntries.map((menuEntry, index) => {
    if (menuEntry.childEntries != null) {
      return createMenuItem(
        menuEntry.label,
        index,
        menuEntry.icon,
        toMenuItemArray(menuEntry.childEntries),
        menuEntry.disabled,
        menuEntry.onClick
      );
    } else {
      return createMenuItem(
        menuEntry.label,
        index,
        menuEntry.icon,
        undefined,
        menuEntry.disabled,
        menuEntry.onClick
      );
    }
  });
}

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
  onClick: () => {}
};

export function createTopSideMenuEntries(): SideMenuEntry[] {
  return Array.of(home, projects);
}

export function createBottomSideMenuEntries(): SideMenuEntry[] {
  return Array.of(createProject, settings);
}
