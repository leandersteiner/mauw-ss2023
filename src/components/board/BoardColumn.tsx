import './scrollbar.css';
import { Draggable, DropResult } from 'react-beautiful-dnd';
import { DroppableTypes } from '../../constants/DroppableTypes';
import { StrictModeDroppable } from '../dnd/StrictModeDroppable';
import { BoardColumnTask } from './BoardColumnTask';
import { AddNewItem } from './AddNewItem';
import { useAppState } from '../../context/AppStateContext';
import { addTask } from '../../actions/actions';

export type BoardColumnProps = {
  id: string;
  title: string;
  index: number;
  onMove: (draggableId: string, index: number) => void;
};

export const BoardColumn = (props: BoardColumnProps) => {
  const { getTasksByListId, dispatch } = useAppState();

  const tasks = getTasksByListId(props.id);
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || result.source.index === result.destination.index) {
      return;
    }

    props.onMove(result.draggableId, result.destination.index);
  };
  const tasksNode = tasks.map((task, index) => (
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
      droppableId={`column:${props.id}`}
      type={DroppableTypes.CARD}
      direction='vertical'
    >
      {({ innerRef, droppableProps, placeholder }) => (
        <div {...droppableProps} ref={innerRef} style={{ height: '100%' }}>
          <h1>{props.title}</h1>
          <div style={{ height: '95%', overflowY: 'auto', padding: '10px' }} className='scrollbar'>
            {tasksNode}
            {placeholder}
            <AddNewItem
              onAdd={text => {
                dispatch(
                  addTask({
                    id: 'test',
                    name: text,
                    boardColumnId: props.id,
                    stateId: 'test',
                    sprintId: '',
                    priority: 1,
                    done: false,
                    description: 'test desc',
                    creatorId: 'test',
                    assigneeId: 'test',
                    position: 3
                  })
                );
              }}
              toggleButtonText='+ Add another Task'
            />
          </div>
        </div>
      )}
    </StrictModeDroppable>
  );
};
