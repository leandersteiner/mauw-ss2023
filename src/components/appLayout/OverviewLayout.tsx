import * as React from 'react';
import { Layout, theme } from 'antd';
import { ReactNode } from 'react';

const { Header, Sider, Content } = Layout;

type OverviewLayoutProps = {
  menu?: ReactNode;
  headerContent?: ReactNode;
  content?: ReactNode;
  isMenuFolded: boolean;
};

const OverviewLayout: React.FC<OverviewLayoutProps> = (props: OverviewLayoutProps) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const layoutStyle = {
    height: '100vh'
  };

  const contentStyle = {
    margin: '24px 16px',
    padding: 24
  };

  const headerStyle = {
    padding: 0,
    background: colorBgContainer
  };

  return (
    <Layout style={layoutStyle}>
      <Sider trigger={null} collapsible collapsed={props.isMenuFolded}>
        {props.menu}
      </Sider>

      <Layout className='site-layout'>
        <Header style={headerStyle}>{props.headerContent}</Header>

        <Content style={contentStyle}>{props.content}</Content>
      </Layout>
    </Layout>
  );
};

export default OverviewLayout;
