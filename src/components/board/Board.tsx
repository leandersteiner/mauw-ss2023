import { Col, Row } from 'antd';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { BoardColumn } from './BoardColumn';
import { DroppableTypes } from '../../constants/DroppableTypes';
import { StrictModeDroppable } from '../dnd/StrictModeDroppable';
import { AddNewItem } from './AddNewItem';
import { TaskResponse, updateTask } from '../../api/taskApi';
import { Task } from '../../models/task/Task';
import { Board as BoardModel } from '../../models/board/Board';
import { moveInList } from '../../helpers/drag';
import {
  BoardColumnResponse,
  updateBoardColumn,
  UpdateBoardColumnRequest
} from '../../api/boardApi';

const parseDndId = (dndId: string) => dndId.split(':')[1];

type BoardProps = {
  projectId: string;
  board: BoardModel;
};

export const Board = ({ projectId, board: model }: BoardProps) => {
  const [board, setBoard] = useState<BoardModel>(model);
  const updateTaskMutation = useMutation<TaskResponse, Error, Task>({
    mutationFn: updateTask(projectId)
  });
  const updateColumnMutation = useMutation<BoardColumnResponse, Error, UpdateBoardColumnRequest>({
    mutationFn: updateBoardColumn(projectId)
  });

  const handleCardMoved = (cardId: string, columnId: string, index: number) => {
    const newColumn = board.columns.find(column => column.id === columnId);
    if (!newColumn) return;
    const updatedTask = newColumn.tasks.find(task => task.id === cardId);
    if (!updatedTask) return;
    updatedTask.boardColumnId = columnId;
    updatedTask.position = index;
    updateTaskMutation.mutate(updatedTask);
    setBoard(board);
  };

  const handleListMoved = (id: string, index: number) => {
    const column = board.columns.find(column => column.id === id);
    if (!column) return;
    moveInList(board.columns, column.position, index);
    setBoard({ ...board });
    board.columns.forEach(column =>
      updateColumnMutation.mutate({ columnId: column.id, data: column })
    );
  };

  const handleDragEnd = (result: DropResult) => {
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
        handleListMoved(id, destination.index);
        break;
      case DroppableTypes.CARD:
        handleCardMoved(id, parseDndId(destination.droppableId), destination.index);
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
              <BoardColumn
                onMove={(draggableId, index) => console.log(draggableId, index)}
                tasks={[]}
                index={0}
                id='backlog'
                title='Backlog'
              />
            </Col>
            {board.columns
              .sort((a, b) => a.position - b.position)
              .map(column => (
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
                        tasks={column.tasks}
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
                  console.log(text);
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
