import { BoardColumnTask } from './BoardColumnTask';
import './scrollbar.css';
import { Task } from '../../models/task/Task';

export type BoardColumnProps = {
  id: string;
  title: string;
  tasks: Task[];
};

export const BoardColumn = (props: BoardColumnProps) => {
  return (
    <div style={{ padding: '8px' }}>
      <h1>{props.title}</h1>
      <div style={{ height: '350px', overflowY: 'auto' }} className='scrollbar'>
        {props.tasks.map(task => (
          <div key={task.id} style={{ paddingBottom: '8px', paddingTop: '8px' }} draggable>
            <BoardColumnTask id={task.id} title={task.name} />
          </div>
        ))}
      </div>
    </div>
  );
};
