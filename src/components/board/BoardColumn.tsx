import './scrollbar.css';
import { Draggable } from 'react-beautiful-dnd';
import { DroppableTypes } from '../../constants/DroppableTypes';
import { StrictModeDroppable } from '../dnd/StrictModeDroppable';
import { BoardColumnTask } from './BoardColumnTask';
import { AddNewItem } from './AddNewItem';
import { Task } from '../../models/task/Task';

export type BoardColumnProps = {
  id: string;
  title: string;
  index: number;
  tasks: Task[];
  onTaskCreated: (task: Task, columnId?: string) => void;
};

export const BoardColumn = ({ id, title, index, tasks, onTaskCreated }: BoardColumnProps) => {
  const tasksNode = tasks
    .sort((a, b) => a.position - b.position)
    .map(task => (
      <Draggable key={task.id} draggableId={`task:${task.id}`} index={task.position}>
        {({ innerRef, draggableProps, dragHandleProps }) => (
          <div {...draggableProps} {...dragHandleProps} ref={innerRef}>
            <div key={task.id} style={{ paddingBottom: '5px' }}>
              <BoardColumnTask id={task.id} title={task.name} />
            </div>
          </div>
        )}
      </Draggable>
    ));

  return (
    <StrictModeDroppable
      droppableId={`column:${id}`}
      type={DroppableTypes.CARD}
      direction='vertical'
    >
      {({ innerRef, droppableProps, placeholder }) => (
        <div {...droppableProps} ref={innerRef} style={{ height: '100%' }}>
          <h1>{title}</h1>
          <div style={{ height: '95%', overflowY: 'auto', padding: '10px' }} className='scrollbar'>
            {tasksNode}
            {placeholder}
            <AddNewItem onAdd={text => console.log(text)} toggleButtonText='+ Add another Task' />
          </div>
        </div>
      )}
    </StrictModeDroppable>
  );
};
