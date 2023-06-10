import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { HeaderContent } from './HeaderContent';
import { OverviewLayout } from './OverviewLayout';
import { SideMenu } from './SideMenu';

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
      content={<Outlet />}
      isMenuFolded={isMenuFolded}
    />
  );
};
