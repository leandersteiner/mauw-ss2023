import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import * as React from 'react';

type HeaderContentProps = {
  isMenuFolded: boolean;
  setIsMenuFolded: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderContent: React.FC<HeaderContentProps> = (props: HeaderContentProps) => {
  return (
    <>
      <span style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Button
          icon={props.isMenuFolded ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => props.setIsMenuFolded(!props.isMenuFolded)}
        ></Button>
      </span>
      <span>Projects / ls / mauw</span>
    </>
  );
};

export default HeaderContent;
