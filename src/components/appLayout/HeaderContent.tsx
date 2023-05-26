import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { CSSProperties, useContext } from 'react';
import { usePathContext } from '../../context/PathContext';

type HeaderContentProps = {
  isMenuFolded: boolean;
  setIsMenuFolded: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HeaderContent: React.FC<HeaderContentProps> = (props: HeaderContentProps) => {
  const buttonWrapperStyle: CSSProperties = {
    paddingLeft: 10,
    paddingRight: 10
  };

  const { path } = usePathContext();

  return (
    <>
      <span style={buttonWrapperStyle}>
        <Button
          icon={props.isMenuFolded ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => props.setIsMenuFolded(!props.isMenuFolded)}
        />
      </span>
      <span>{path}</span>
    </>
  );
};