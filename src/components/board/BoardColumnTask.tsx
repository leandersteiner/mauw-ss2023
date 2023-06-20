import { Card, Col, Progress, Row, Space, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Task } from '../../models/task/Task';
import { Subtask } from '../../models/task/Subtask';

type BoardColumnTaskProps = {
  id: string;
  columnId: string;
  task: Task;
  onTaskDeleted: (taskId: string, columnId: string) => void;
};

const subtaskPercent = (subtasks: Subtask[]) => {
  const doneCount = subtasks.filter(subtask => subtask.done).length;
  return Math.round((doneCount / subtasks.length) * 100);
};

export const BoardColumnTask = ({ id, columnId, task, onTaskDeleted }: BoardColumnTaskProps) => {
  const { name, subtasks } = task;
  return (
    <Card
      style={{ border: '1px solid #cfcfcf', maxWidth: '100%' }}
      bodyStyle={{ margin: '0px', padding: '8px', textAlign: 'center' }}
      actions={[
        <Tooltip key='edit' title='Delete Column'>
          <EditOutlined onClick={() => console.log(`editing task ${id}`)} />
        </Tooltip>,
        <Tooltip key='delete' title='Delete Column'>
          <DeleteOutlined onClick={() => onTaskDeleted(id, columnId)} />
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
  );
};
