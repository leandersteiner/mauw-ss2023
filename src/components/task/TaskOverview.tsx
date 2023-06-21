import { Button, Col, Divider, Popconfirm, Row, Select, Space, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { Task } from '../../models/task/Task';
import { SubtaskList } from './SubtaskList';
import { CommentList } from './CommentList';
import {
  CommentResponse,
  createComment,
  CreateCommentRequest,
  createSubtask,
  CreateSubtaskRequest,
  deleteComment,
  deleteSubtask,
  SubtaskResponse,
  updateComment,
  updateSubtask
} from '../../api/taskApi';
import { useAuth } from '../../context/AuthContext';
import { Subtask } from '../../models/task/Subtask';
import { TaskComment } from '../../models/task/TaskComment';
import { EditableMarkdown } from './EditableMarkdown';

const { Paragraph } = Typography;

type TaskOverviewProps = {
  close: () => void;
  task: Task;
  onTaskDeleted: (taskId: string, columnId: string | null) => void;
  onTaskEdited: (taskId: string, task: Task) => void;
};

export const TaskOverview = ({ close, task, onTaskDeleted, onTaskEdited }: TaskOverviewProps) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [title, setTitle] = useState(task.name);
  const [description, setDescription] = useState(task.description);

  const createSubtaskMutation = useMutation<SubtaskResponse, Error, CreateSubtaskRequest>({
    mutationFn: createSubtask(task.id),
    onSuccess: subtask => {
      queryClient.invalidateQueries(['board']);
      task.subtasks.push(subtask);
    }
  });

  const updateSubtaskMutation = useMutation<SubtaskResponse, Error, CreateSubtaskRequest>({
    mutationFn: updateSubtask(task.id),
    onSuccess: () => queryClient.invalidateQueries(['board'])
  });

  const deleteSubtaskMutation = useMutation<void, Error, string>({
    mutationFn: deleteSubtask(task.id),
    onSuccess: () => queryClient.invalidateQueries(['board'])
  });

  const createCommentMutation = useMutation<CommentResponse, Error, CreateCommentRequest>({
    mutationFn: createComment(task.id),
    onSuccess: subtask => {
      queryClient.invalidateQueries(['board']);
      task.comments = [...task.comments, subtask];
    }
  });

  const updateCommentMutation = useMutation<CommentResponse, Error, CreateCommentRequest>({
    mutationFn: updateComment(task.id),
    onSuccess: () => queryClient.invalidateQueries(['board'])
  });

  const deleteCommentMutation = useMutation<void, Error, string>({
    mutationFn: deleteComment(task.id),
    onSuccess: () => queryClient.invalidateQueries(['board'])
  });

  if (!user) return <Navigate to='/login' />;

  const handleSubtaskCreated = (title: string) => {
    createSubtaskMutation.mutate({ name: title, done: false });
  };

  const handleSubtaskUpdated = (subtaskId: string, subtask: Subtask) => {
    updateSubtaskMutation.mutate(subtask);
  };

  const handleSubtaskDeleted = (subtaskId: string) => {
    task.subtasks = task.subtasks.filter(subtask => subtask.id !== subtaskId);
    deleteSubtaskMutation.mutate(subtaskId);
  };

  const handleCommentCreated = (comment: string) => {
    createCommentMutation.mutate({ comment });
  };

  const handleCommentUpdated = (commentId: string, comment: TaskComment) => {
    updateCommentMutation.mutate(comment);
  };

  const handleCommentDeleted = (commentId: string) => {
    task.comments = task.comments.filter(comment => comment.id !== commentId);
    deleteCommentMutation.mutate(commentId);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

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
            Markdown Description
          </Title>
          <EditableMarkdown text={description} />
          <Title level={4} style={{ marginTop: 0 }}>
            Description
          </Title>
          <Paragraph
            editable={{
              tooltip: 'click to edit description',
              onChange: setDescription,
              triggerType: ['text']
            }}
          >
            {description}
          </Paragraph>
          <SubtaskList
            tasks={task.subtasks}
            onSubtaskCreated={handleSubtaskCreated}
            onSubtaskDeleted={handleSubtaskDeleted}
            onSubtaskUpdated={handleSubtaskUpdated}
          />
          <CommentList
            comments={task.comments}
            onCommentCreated={handleCommentCreated}
            onCommentDeleted={handleCommentDeleted}
            onCommentUpdated={handleCommentUpdated}
          />
        </Col>
        <Col sm={24} lg={8}>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Title level={4} style={{ marginTop: 0 }}>
              Add
            </Title>
            <Select
              style={{ width: '100%' }}
              showSearch
              placeholder='Select a person'
              optionFilterProp='children'
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                {
                  value: 'jack',
                  label: 'Jack'
                },
                {
                  value: 'lucy',
                  label: 'Lucy'
                },
                {
                  value: 'tom',
                  label: 'Tom'
                }
              ]}
            />
            <Title level={4} style={{ marginTop: 0 }}>
              Actions
            </Title>
            <Button block>Move Task</Button>
            <Popconfirm
              title='Delete Task'
              description='Are you sure you want to delete this task?'
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              okButtonProps={{ danger: true }}
              okText='Yes'
              cancelText='No'
              onConfirm={() => onTaskDeleted(task.id, task.boardColumnId)}
            >
              <Button type='primary' block danger>
                Delete Task
              </Button>
            </Popconfirm>
          </Space>
        </Col>
      </Row>
    </>
  );
};
