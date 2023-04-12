import { Menu, MenuProps } from 'antd';
import { CSSProperties, ReactNode } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

export type SideMenuEntry = {
  label: string;
  icon: ReactNode;
  childEntries?: SideMenuEntry[];
};

type SideMenuProps = {
  topItems?: SideMenuEntry[];
  bottomItems?: SideMenuEntry[];
};

function createMenuItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

function toMenuItemArray(menuEntries: SideMenuEntry[]): MenuItem[] {
  return menuEntries.map((menuEntry, index) => {
    if (menuEntry.childEntries != null) {
      return createMenuItem(
        menuEntry.label,
        index,
        menuEntry.icon,
        toMenuItemArray(menuEntry.childEntries)
      );
    } else {
      return createMenuItem(menuEntry.label, index, menuEntry.icon);
    }
  });
}

export const SideMenu: React.FC<SideMenuProps> = (props: SideMenuProps) => {
  const topItems: MenuItem[] = props.topItems != null ? toMenuItemArray(props.topItems) : [];

  const bottomItems: MenuItem[] =
    props.bottomItems != null ? toMenuItemArray(props.bottomItems) : [];

  const menuWrapperStyle: CSSProperties = {
    overflow: 'auto',
    height: '100%'
  };

  const menuContatinerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%'
  };

  const bottomMenuStyle: CSSProperties = {
    marginBottom: 'auto'
  };

  return (
    <>
      <div style={menuWrapperStyle}>
        <div style={menuContatinerStyle}>
          <div>
            <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} items={topItems}></Menu>
          </div>

          <div>
            <Menu style={bottomMenuStyle} theme='dark' mode='inline' items={bottomItems}></Menu>
          </div>
        </div>
      </div>
    </>
  );
};
