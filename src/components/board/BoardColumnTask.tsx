import { Card, Col, Popconfirm, Progress, Row, Space, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Task } from '../../models/task/Task';
import { Subtask } from '../../models/task/Subtask';
import { TaskOverviewModal } from '../task/TaskOverviewModal';

type BoardColumnTaskProps = {
  id: string;
  columnId: string;
  task: Task;
  onTaskDeleted: (taskId: string, columnId: string) => void;
  onTaskEdited: (taskId: string, task: Task) => void;
};

const subtaskPercent = (subtasks: Subtask[]) => {
  const doneCount = subtasks.filter(subtask => subtask.done).length;
  return Math.round((doneCount / subtasks.length) * 100);
};

export const BoardColumnTask = ({
  id,
  columnId,
  task,
  onTaskDeleted,
  onTaskEdited
}: BoardColumnTaskProps) => {
  const { name, subtasks } = task;
  const [isTaskOverviewModalOpen, setIsTaskOverviewModalOpen] = useState(false);

  return (
    <>
      <TaskOverviewModal
        isOpen={isTaskOverviewModalOpen}
        close={() => setIsTaskOverviewModalOpen(false)}
        task={task}
      />
      <Card
        style={{ border: '1px solid #cfcfcf', maxWidth: '100%' }}
        bodyStyle={{ margin: '0px', padding: '8px', textAlign: 'center' }}
        actions={[
          <Tooltip key='edit' placement='bottom' title='Edit Task'>
            <EditOutlined onClick={() => setIsTaskOverviewModalOpen(true)} />
          </Tooltip>,
          <Tooltip key='delete' placement='bottom' title='Delete Task'>
            <Popconfirm
              title='Delete Task'
              description='Are you sure you want to delete this task?'
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              okButtonProps={{ danger: true }}
              okText='Yes'
              cancelText='No'
              onConfirm={() => onTaskDeleted(id, columnId)}
            >
              <DeleteOutlined />
            </Popconfirm>
          </Tooltip>
        ]}
      >
        <Space direction='vertical'>
          <h1 style={{ margin: '0', padding: '0' }}>{name}</h1>
          {subtasks?.length > 0 && (
            <div>
              <Row>
                <Col>
                  <Progress
                    percent={subtaskPercent(subtasks)}
                    showInfo={false}
                    status='active'
                    style={{ width: '100px' }}
                  />
                </Col>
                <Col>
                  <span>{`${subtasks.filter(subtask => subtask.done).length} / ${
                    subtasks.length
                  }`}</span>
                </Col>
              </Row>
            </div>
          )}
        </Space>
      </Card>
    </>
  );
};
