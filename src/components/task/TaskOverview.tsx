import { Button, Col, Divider, Popconfirm, Row, Select, Space, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { Task } from '../../models/task/Task';
import { CommentList } from './CommentList';
import { CommentApi, SubtaskApi } from '../../api/taskApi';
import { useAuth } from '../../context/AuthContext';
import { Subtask } from '../../models/task/Subtask';
import { TaskComment } from '../../models/task/TaskComment';
import { EditableMarkdown } from './EditableMarkdown';
import { getProjectMember } from '../../api/projectsApi';
import { SubtaskList } from './SubtaskList';

type TaskOverviewProps = {
  task: Task;
  onTaskDeleted: (taskId: string, columnId: string | null) => void;
  onTaskEdited: (taskId: string, task: Task) => void;
};

export const TaskOverview = ({ task, onTaskDeleted, onTaskEdited }: TaskOverviewProps) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['members'],
    queryFn: () => getProjectMember(task.projectId)
  });
  const { mutate: createSubtask } = useMutation(SubtaskApi.create(task.id), {
    onSuccess: subtask => task.subtasks.push(subtask)
  });
  const { mutate: updateSubtask } = useMutation(SubtaskApi.update(task.id));
  const { mutate: deleteSubtask } = useMutation(SubtaskApi.delete(task.id));

  const { mutate: createComment } = useMutation(CommentApi.create(task.id), {
    onSuccess: comment => task.comments.push(comment)
  });
  const { mutate: updateComment } = useMutation(CommentApi.update(task.id));
  const { mutate: deleteComment } = useMutation(CommentApi.delete(task.id));

  if (!user) return <Navigate to='/login' />;

  if (isLoading) {
    return (
      <Space direction='vertical' style={{ width: '100%' }}>
        <Spin tip='Loading' size='large'>
          <div className='content' />
        </Spin>
      </Space>
    );
  }

  if (isError) {
    return <div>There was an unexpected error</div>;
  }

  const handleSubtaskCreated = (title: string) => {
    createSubtask({ name: title, done: false });
  };

  const handleSubtaskUpdated = (subtask: Subtask) => {
    updateSubtask(subtask);
  };

  const handleSubtaskDeleted = (subtaskId: string) => {
    task.subtasks = task.subtasks.filter(subtask => subtask.id !== subtaskId);
    deleteSubtask(subtaskId);
  };

  const handleCommentCreated = (comment: string) => {
    createComment({ comment });
  };

  const handleCommentUpdated = (comment: TaskComment) => {
    updateComment(comment);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    onTaskEdited(task.id, { ...updatedTask });
  };

  const handleCommentDeleted = (commentId: string) => {
    task.comments = task.comments.filter(comment => comment.id !== commentId);
    deleteComment(commentId);
  };

  const onChange = (value: string) => {
    handleTaskUpdated({ ...task, assigneeId: value });
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Divider type='horizontal' style={{ margin: 10 }} />
          <Title
            editable={{
              tooltip: 'click to edit title',
              onChange: text => {
                task.name = text;
              },
              triggerType: ['text'],
              onEnd: () => handleTaskUpdated({ ...task })
            }}
            style={{ marginTop: 0 }}
          >
            {task.name}
          </Title>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col sm={24} lg={16}>
          <Title level={4} style={{ marginTop: 0 }}>
            Description
          </Title>
          <EditableMarkdown
            editBtnText='Edit Description'
            saveBtnText='Save Description'
            canEdit
            text={task.description}
            onSave={text => handleTaskUpdated({ ...task, description: text })}
          />
          <Divider />
          <CommentList
            comments={task.comments}
            onCommentCreated={handleCommentCreated}
            onCommentDeleted={handleCommentDeleted}
            onCommentUpdated={handleCommentUpdated}
          />
        </Col>
        <Col sm={24} lg={8}>
          <Space direction='vertical' style={{ width: '100%' }}>
            <SubtaskList
              tasks={task.subtasks}
              onSubtaskCreated={handleSubtaskCreated}
              onSubtaskDeleted={handleSubtaskDeleted}
              onSubtaskUpdated={handleSubtaskUpdated}
            />
            <Title level={4}>Assignee</Title>
            <Select
              style={{ width: '100%' }}
              showSearch
              placeholder='Select a person'
              defaultValue={task.assigneeId}
              allowClear
              onClear={() => handleTaskUpdated({ ...task, assigneeId: null })}
              onChange={onChange}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={data.map(user => ({ value: user.id, label: user.username }))}
            />
            <Divider style={{ marginBottom: 0 }} />
            <Title level={4}>Actions</Title>
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
            <Divider />
          </Space>
        </Col>
      </Row>
    </>
  );
};
