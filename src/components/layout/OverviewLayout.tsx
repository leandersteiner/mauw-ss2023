import { Layout, theme } from 'antd';
import React, { CSSProperties, ReactNode } from 'react';

const { Header, Sider, Content } = Layout;

type OverviewLayoutProps = {
  menu?: ReactNode;
  headerContent?: ReactNode;
  content?: ReactNode;
  isMenuFolded: boolean;
};

export const OverviewLayout: React.FC<OverviewLayoutProps> = (props: OverviewLayoutProps) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const layoutStyle: CSSProperties = {
    height: '100vh'
  };

  const contentStyle: CSSProperties = {
    margin: '24px 16px',
    padding: 24
  };

  const headerStyle: CSSProperties = {
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
