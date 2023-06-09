import './scrollbar.css';
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
    padding: '24px 36px',
    overflowY: 'auto',
    height: '100%'
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

        <Content className='scrollbar' style={contentStyle}>
          {props.content}
        </Content>
      </Layout>
    </Layout>
  );
};
