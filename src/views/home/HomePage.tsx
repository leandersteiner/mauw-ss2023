import { Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect } from 'react';
import { usePathContext } from '../../context/PathContext';

export const HomePage: React.FC = () => {
  const { setPath } = usePathContext();

  useEffect(() => setPath('home'), [setPath]);

  return (
    <Row style={{ minHeight: '50vh' }} justify='center' align='middle'>
      <Col span={6}>
        <Title>Hey 👋</Title>
        <Title level={3}>Welcome to Hof/pm</Title>
      </Col>
    </Row>
  );
};
