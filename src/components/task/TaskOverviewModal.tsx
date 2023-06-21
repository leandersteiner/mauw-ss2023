import { Button, Modal } from 'antd';
import { TaskOverview } from './TaskOverview';
import { Task } from '../../models/task/Task';

type TaskOverviewModalProps = {
  isOpen: boolean;
  close: () => void;
  task: Task;
  onTaskDeleted: (taskId: string, columnId: string | null) => void;
  onTaskEdited: (taskId: string, task: Task) => void;
};

export const TaskOverviewModal = ({
  isOpen,
  close,
  task,
  onTaskEdited,
  onTaskDeleted
}: TaskOverviewModalProps) => {
  return (
    <Modal
      title='Basic Modal'
      open={isOpen}
      width='80%'
      onCancel={close}
      style={{ maxWidth: '900px' }}
      footer={[
        <Button key='done' type='primary' onClick={close}>
          Done
        </Button>
      ]}
    >
      <TaskOverview
        task={task}
        close={() => close}
        onTaskEdited={onTaskEdited}
        onTaskDeleted={onTaskDeleted}
      />
    </Modal>
  );
};
