import { useState } from 'react';
import { HeaderContent } from './HeaderContent';
import { OverviewLayout } from './OverviewLayout';
import { SideMenu } from './SideMenu';
import { Outlet } from 'react-router';

export const Overview: React.FC = () => {
  const [isMenuFolded, setIsMenuFolded] = useState(false);

  const sideMenu = <SideMenu />;

  const headerContent = (
    <HeaderContent isMenuFolded={isMenuFolded} setIsMenuFolded={setIsMenuFolded} />
  );

  return (
    <OverviewLayout
      menu={sideMenu}
      headerContent={headerContent}
      content={<Outlet></Outlet>}
      isMenuFolded={isMenuFolded}
    />
  );
};
