import { useState } from 'react';
import { HeaderContent } from './header/HeaderContent';
import { OverviewLayout } from './OverviewLayout';
import { SideMenu } from './sideMenu/SideMenu';
import { createBottomSideMenuEntries, createTopSideMenuEntries } from './sideMenu/SideMenuEntries';

export const Overview: React.FC = () => {
  const [isMenuFolded, setIsMenuFolded] = useState(false);

  const sideMenu = (
    <SideMenu topItems={createTopSideMenuEntries()} bottomItems={createBottomSideMenuEntries()} />
  );

  const headerContent = (
    <HeaderContent isMenuFolded={isMenuFolded} setIsMenuFolded={setIsMenuFolded} />
  );

  return (
    <OverviewLayout menu={sideMenu} headerContent={headerContent} isMenuFolded={isMenuFolded} />
  );
};
