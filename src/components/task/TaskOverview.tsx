import { Col, Divider, Row, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';
import { Task } from '../../models/task/Task';
import { SubtaskList } from './SubtaskList';
import { CommentList } from './CommentList';
import { AssigneeList } from './AssigneeList';

const { Text, Paragraph } = Typography;

type TaskOverviewProps = {
  close: () => void;
  task: Task;
};

export const TaskOverview = ({ close, task }: TaskOverviewProps) => {
  const [title, setTitle] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  return (
    <>
      <Row>
        <Col span={24}>
          <Divider type='horizontal' style={{ margin: 10 }} />
          <Title
            editable={{
              tooltip: 'click to edit title',
              onChange: setTitle,
              triggerType: ['text']
            }}
            style={{ marginTop: 0 }}
          >
            {title}
          </Title>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col sm={24} lg={16}>
          <Title level={4} style={{ marginTop: 0 }}>
            Description
          </Title>
          <Paragraph
            editable={{
              tooltip: 'click to edit description',
              onChange: setDescription,
              triggerType: ['text', 'icon']
            }}
          >
            {description}
          </Paragraph>
          <SubtaskList />
          <CommentList />
        </Col>
        <Col sm={24} lg={8}>
          <AssigneeList />
        </Col>
      </Row>
    </>
  );
};
