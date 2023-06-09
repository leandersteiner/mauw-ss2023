import { useState } from 'react';
import { Outlet } from 'react-router';
import { HeaderContent } from './HeaderContent';
import { OverviewLayout } from './OverviewLayout';
import { SideMenu } from './side-menu/SideMenu';

export const Overview: React.FC = () => {
  const [isMenuFolded, setIsMenuFolded] = useState(false);

  const headerContent = (
    <HeaderContent isMenuFolded={isMenuFolded} setIsMenuFolded={setIsMenuFolded} />
  );

  return (
    <OverviewLayout
      menu={<SideMenu />}
      headerContent={headerContent}
      content={<Outlet />}
      isMenuFolded={isMenuFolded}
    />
  );
};
