import { Card, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

type BoardColumnTaskProps = {
  id: string;
  columnId: string;
  title: string;
  onTaskDeleted: (taskId: string, columnId: string) => void;
};

export const BoardColumnTask = ({ id, columnId, title, onTaskDeleted }: BoardColumnTaskProps) => {
  return (
    <Card
      style={{ border: '1px solid #cfcfcf', maxWidth: '100%' }}
      bodyStyle={{ margin: '0px', padding: '0px 16px', textAlign: 'center' }}
      actions={[
        <Tooltip key='edit' title='Delete Column'>
          <EditOutlined onClick={() => console.log(`editing task ${id}`)} />
        </Tooltip>,
        <Tooltip key='delete' title='Delete Column'>
          <DeleteOutlined onClick={() => onTaskDeleted(id, columnId)} />
        </Tooltip>
      ]}
    >
      <h1>{title}</h1>
    </Card>
  );
};
