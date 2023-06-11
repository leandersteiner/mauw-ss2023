import { MenuProps } from 'antd';
import { ReactNode, Key } from 'react';
import { NavigateFunction } from 'react-router';

export type MenuItem = Required<MenuProps>['items'][number];

export type SideMenuEntry = {
  label: string;
  icon: ReactNode;
  key: Key;
  url: string;
  childEntries?: SideMenuEntry[];
  disabled?: boolean;
};

function createMenuItem(
  label: ReactNode,
  icon: ReactNode,
  key: Key,
  url: string,
  navigate: NavigateFunction,
  children?: MenuItem[],
  disabled?: boolean
): MenuItem {
  const onClick = () => navigate(url ?? '/');

  return {
    label,
    icon,
    key,
    onClick,
    children,
    disabled
  } as MenuItem;
}

export function toMenuItemArray(
  menuEntries: SideMenuEntry[],
  navigate: NavigateFunction
): MenuItem[] {
  return menuEntries.map(menuEntry => {
    return createMenuItem(
      menuEntry.label,
      menuEntry.icon,
      menuEntry.key,
      menuEntry.url,
      navigate,
      menuEntry.childEntries ? toMenuItemArray(menuEntry.childEntries, navigate) : undefined,
      menuEntry.disabled
    );
  });
}
