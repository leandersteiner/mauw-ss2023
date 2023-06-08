import { Row, Col } from 'antd';
import Title from 'antd/es/typography/Title';

export const HomePage: React.FC = () => {
  return (
    <Row style={{ minHeight: '50vh' }} justify='center' align='middle'>
      <Col span={6}>
        <Title>Hey 👋</Title>
        <Title level={3}>Welcome to Hof/pm</Title>
      </Col>
    </Row>
  );
};
