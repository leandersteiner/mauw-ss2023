import { BoardColumnTask } from './BoardColumnTask';
import './scrollbar.css';

export type BoardColumnProps = {
  id: string;
  title: string;
  tasks: [{ id: string; title: string }];
};

const tasks = [
  {
    id: '1',
    title: 'Task 1'
  },
  {
    id: '2',
    title: 'Task 2'
  },
  {
    id: '3',
    title: 'Task 3'
  }
];

export const BoardColumn = (props: BoardColumnProps) => {
  return (
    <div style={{ padding: '8px' }}>
      <h1>{props.title}</h1>
      <div style={{ height: '350px', overflowY: 'auto' }} className='scrollbar'>
        {props.tasks.map(task => (
          <div key={task.id} style={{ paddingBottom: '8px', paddingTop: '8px' }} draggable>
            <BoardColumnTask id={task.id} title={task.title} />
          </div>
        ))}
      </div>
    </div>
  );
};
