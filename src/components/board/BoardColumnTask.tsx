import { Card, Popconfirm, Progress, Space, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Title from 'antd/es/typography/Title';
import { Task } from '../../models/task/Task';
import { Subtask } from '../../models/task/Subtask';
import { TaskOverviewModal } from '../task/TaskOverviewModal';

type BoardColumnTaskProps = {
  id: string;
  columnId: string;
  task: Task;
  onTaskDeleted: (taskId: string, columnId: string | null) => void;
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
        onTaskEdited={onTaskEdited}
        onTaskDeleted={onTaskDeleted}
      />
      <Card
        style={{ border: '1px solid #cfcfcf', maxWidth: '100%' }}
        bodyStyle={{ margin: '8px', padding: '8px', textAlign: 'left' }}
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
        <Space direction='vertical' onClick={() => setIsTaskOverviewModalOpen(true)}>
          <Title
            level={5}
            style={{ margin: '0', cursor: 'pointer' }}
            /* editable={{
              onChange: text => {
                task.name = text;
              },
              onEnd: () => onTaskEdited(task.id, task),
              triggerType: ['text']
            }} */
          >
            {name}
          </Title>
          {subtasks.length > 0 && (
            <Progress
              percent={subtaskPercent(subtasks)}
              format={() =>
                `${subtasks.filter(subtask => subtask.done).length} / ${subtasks.length}`
              }
              style={{ width: '100%' }}
            />
          )}
        </Space>
      </Card>
    </>
  );
};
