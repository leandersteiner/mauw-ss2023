import { Row, Col } from 'antd';
import Title from 'antd/es/typography/Title';
import { getRequest } from '../../api/api';
import { API } from '../../config/api';
import { Project } from '../../constants/project';

export const HomePage: React.FC = () => {
  const project = getRequest<Project>(API.projects);

  return (
    <Row style={{ minHeight: '50vh' }} justify='center' align='middle'>
      <Col span={6}>
        <Title>Hey 👋</Title>
        <Title level={3}>Welcome to Hof/pm</Title>
      </Col>
    </Row>
  );
};
