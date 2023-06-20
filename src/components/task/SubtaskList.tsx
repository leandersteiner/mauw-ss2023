import Title from 'antd/es/typography/Title';
import { Space } from 'antd';
import { Subtask } from './Subtask';

export const SubtaskList = () => {
  return (
    <>
      <Title level={4} style={{ marginTop: 0 }}>
        SubtaskList
      </Title>
      <Space direction='vertical'>
        <Subtask />
        <Subtask />
        <Subtask />
      </Space>
    </>
  );
};
