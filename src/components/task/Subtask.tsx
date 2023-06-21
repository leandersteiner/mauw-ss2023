import { Button, Checkbox, Popconfirm, Space, Tooltip } from 'antd';
import { useState } from 'react';
import { DeleteFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { Subtask as SubtaskModel } from '../../models/task/Subtask';

type SubtaskProps = {
  task: SubtaskModel;
  onSubtaskUpdated: (subtaskId: string, subtask: SubtaskModel) => void;
  onSubtaskDeleted: (subtaskId: string) => void;
};
export const Subtask = ({ task, onSubtaskUpdated, onSubtaskDeleted }: SubtaskProps) => {
  const [checked, setChecked] = useState(task.done);
  return (
    <Space>
      <Tooltip title='Delete Subtask'>
        <Popconfirm
          title='Delete Subtask'
          description='Are you sure you want to delete this Subtask?'
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          okButtonProps={{ danger: true }}
          okText='Yes'
          cancelText='No'
          onConfirm={() => onSubtaskDeleted(task.id)}
        >
          <Button type='primary' icon={<DeleteFilled />} danger size='small' />
        </Popconfirm>
      </Tooltip>
      <Checkbox
        checked={task.done}
        onChange={() => {
          task.done = !checked;
          setChecked(!checked);
          onSubtaskUpdated(task.id, task);
        }}
      >
        {task.name}
      </Checkbox>
    </Space>
  );
};
