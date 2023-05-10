import { useState } from 'react';
import { HeaderContent } from './header/HeaderContent';
import { Outlet } from 'react-router';
import { OverviewLayout } from './OverviewLayout';
import { SideMenu } from './side-menu/SideMenu';

export const Overview: React.FC = () => {
  const [isMenuFolded, setIsMenuFolded] = useState(false);

  const sideMenu = (
    <SideMenu />
  );

  const headerContent = (
    <HeaderContent isMenuFolded={isMenuFolded} setIsMenuFolded={setIsMenuFolded} />
  );

  return (
    <OverviewLayout
      menu={sideMenu}
      headerContent={headerContent}
      content={<Outlet />}
      isMenuFolded={isMenuFolded}
    />
  );
};
