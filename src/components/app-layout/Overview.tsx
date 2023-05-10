import { useState } from 'react';
import { HeaderContent } from './header/HeaderContent';
import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { HeaderContent } from './HeaderContent';
import { OverviewLayout } from './OverviewLayout';
import { SideMenu } from './side-menu/SideMenu';
import { createBottomSideMenuEntries, createTopSideMenuEntries } from './side-menu/SideMenuEntries';

export const Overview: React.FC = () => {
  const [isMenuFolded, setIsMenuFolded] = useState(false);

  const sideMenu = (
    <SideMenu topItems={createTopSideMenuEntries()} bottomItems={createBottomSideMenuEntries()} />
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
