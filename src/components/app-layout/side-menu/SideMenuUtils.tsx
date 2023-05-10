import { MenuProps } from 'antd';
import { ReactNode, Key } from 'react';
import { NavigateFunction } from 'react-router';

export type MenuItem = Required<MenuProps>['items'][number];

export type SideMenuEntry = {
  label: string;
  icon: ReactNode;
  url: string;
  childEntries?: SideMenuEntry[];
  disabled?: boolean;
};

function createMenuItem(
  label: ReactNode,
  key: Key,
  url: string,
  navigate: NavigateFunction,
  icon?: ReactNode,
  children?: MenuItem[],
  disabled?: boolean
): MenuItem {
  const onClick = () => navigate(url ?? '/');

  return {
    key,
    icon,
    children,
    label,
    disabled,
    onClick
  } as MenuItem;
}

export function toMenuItemArray(
  menuEntries: SideMenuEntry[],
  navigate: NavigateFunction
): MenuItem[] {
  return menuEntries.map((menuEntry, index) => {
    if (menuEntry.childEntries != null) {
      return createMenuItem(
        menuEntry.label,
        index,
        menuEntry.url,
        navigate,
        menuEntry.icon,
        toMenuItemArray(menuEntry.childEntries, navigate),
        menuEntry.disabled
      );
    }
    return createMenuItem(
      menuEntry.label,
      index,
      menuEntry.url,
      navigate,
      menuEntry.icon,
      undefined,
      menuEntry.disabled
    );
  });
}
