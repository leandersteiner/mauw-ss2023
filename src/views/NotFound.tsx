import { Empty, Space, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const { Text } = Typography;

export const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate('/home'), 2000);
  }, [navigate]);
  return (
    <Empty
      description={
        <Space direction='vertical'>
          <Title level={2}>404 Not Found</Title>
          <Text>You are being redirected...</Text>
        </Space>
      }
    />
  );
};
