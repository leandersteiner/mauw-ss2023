import { Col, Row } from 'antd';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { BoardColumn } from './BoardColumn';
import { DroppableTypes } from '../../constants/DroppableTypes';
import { StrictModeDroppable } from '../dnd/StrictModeDroppable';
import { AddNewItem } from './AddNewItem';
import { useAppState } from '../../context/AppStateContext';
import { addBoardColumn } from '../../actions/actions';

const parseDndId = (dndId: string) => dndId.split(':')[1];
type BoardProps = {
  projectId: string;
  onListMove: (id: string, index: number) => void;
  onCardMove: (cardId: string, boardId: string, index: number) => void;
};

export const Board = (props: BoardProps) => {
  const { appData, dispatch } = useAppState();
  const handleDragEnd = (result: DropResult) => {
    console.log(result);
    const { destination, source, type } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) {
      return;
    }

    const id = parseDndId(result.draggableId);

    switch (type) {
      case DroppableTypes.COLUMN:
        props.onListMove(id, destination.index);
        break;
      case DroppableTypes.CARD:
        props.onCardMove(id, parseDndId(destination.droppableId), destination.index);
        break;
      default:
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <StrictModeDroppable droppableId='board' type={DroppableTypes.COLUMN} direction='horizontal'>
        {({ innerRef, droppableProps, placeholder }) => (
          <Row style={{ height: '100%' }} ref={innerRef} {...droppableProps} data-drag-scroller>
            <Col key='board-backlog' flex='auto' style={{ height: '100%' }}>
              <BoardColumn onMove={() => {}} index={0} id='backlog' title='Backlog' />
            </Col>
            {appData.projectBoard.columns.map(column => (
              <Draggable
                key={column.id}
                draggableId={`column:${column.id}`}
                index={column.position}
              >
                {(provided, snapshot) => (
                  <Col
                    key={column.id}
                    flex='auto'
                    style={{ height: '100%' }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <BoardColumn
                      onMove={(draggableId, index) => console.log(draggableId, index)}
                      index={column.position}
                      id={column.id}
                      title={column.title}
                    />
                  </Col>
                )}
              </Draggable>
            ))}
            {placeholder}
            <Col flex='auto'>
              <AddNewItem
                onAdd={text => {
                  dispatch(
                    addBoardColumn({
                      id: 'test',
                      title: 'test',
                      position: 4,
                      state: { id: 'test', name: 'test' },
                      tasks: []
                    })
                  );
                }}
                toggleButtonText='+ Add another column'
              />
            </Col>
          </Row>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};
