import Title from 'antd/es/typography/Title';
import { Divider, Space } from 'antd';
import { Subtask as SubtaskModel } from '../../models/task/Subtask';
import { Subtask } from './Subtask';
import { AddNewItem } from '../board/AddNewItem';

type SubtaskListProps = {
  tasks: SubtaskModel[];
  onSubtaskCreated: (title: string) => void;
  onSubtaskUpdated: (subtaskId: string, subtask: SubtaskModel) => void;
  onSubtaskDeleted: (subtaskId: string) => void;
};
export const SubtaskList = ({
  tasks,
  onSubtaskCreated,
  onSubtaskUpdated,
  onSubtaskDeleted
}: SubtaskListProps) => {
  return (
    <>
      <Title level={4} style={{ marginTop: 0 }}>
        Subtasks
      </Title>
      <Divider />
      <Space direction='vertical' size='middle' style={{ width: '100%' }}>
        {tasks
          ?.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          .map(task => (
            <Subtask
              key={task.id}
              task={task}
              onSubtaskUpdated={onSubtaskUpdated}
              onSubtaskDeleted={onSubtaskDeleted}
            />
          ))}
        <Divider style={{ margin: 0 }} />
        <AddNewItem onAdd={onSubtaskCreated} toggleButtonText='Add Subtask' />
      </Space>
    </>
  );
};
