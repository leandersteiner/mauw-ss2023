import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const SideMenu: React.FC = () => {
  return (
    <>
      <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1'
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2'
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3'
          }
        ]}
      ></Menu>
    </>
  );
};

export default SideMenu;
