import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { CSSProperties } from 'react';

type HeaderContentProps = {
  isMenuFolded: boolean;
  setIsMenuFolded: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HeaderContent: React.FC<HeaderContentProps> = (props: HeaderContentProps) => {
  const buttonWrapperStyle: CSSProperties = {
    paddingLeft: 10,
    paddingRight: 10
  };

  return (
    <>
      <span style={buttonWrapperStyle}>
        <Button
          icon={props.isMenuFolded ? <MenuUnfoldOutlined /> : <MenuFoldOutlined></MenuFoldOutlined>}
          onClick={() => props.setIsMenuFolded(!props.isMenuFolded)}
        ></Button>
      </span>
      <span>Projects / ls / mauw</span>
    </>
  );
};
