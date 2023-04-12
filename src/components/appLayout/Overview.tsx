import { useState } from 'react';
import { HeaderContent } from './HeaderContent';
import { OverviewLayout } from './OverviewLayout';
import { SideMenu, SideMenuEntry } from './SideMenu';
import { UploadOutlined } from '@ant-design/icons';

export const Overview: React.FC = () => {
  const [isMenuFolded, setIsMenuFolded] = useState(false);

  const entry: SideMenuEntry = {
    label: 'Home',
    icon: <UploadOutlined></UploadOutlined>
  };

  const topMenuEntries: SideMenuEntry[] = Array.of(entry);

  const sideMenu = <SideMenu topItems={topMenuEntries} bottomItems={topMenuEntries} />;

  const headerContent = (
    <HeaderContent isMenuFolded={isMenuFolded} setIsMenuFolded={setIsMenuFolded} />
  );

  return (
    <OverviewLayout menu={sideMenu} headerContent={headerContent} isMenuFolded={isMenuFolded} />
  );
};
