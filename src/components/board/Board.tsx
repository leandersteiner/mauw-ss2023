import { Col, Row } from 'antd';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { BoardColumn } from './BoardColumn';
import { DroppableTypes } from '../../constants/DroppableTypes';
import { StrictModeDroppable } from '../dnd/StrictModeDroppable';
import { AddNewItem } from './AddNewItem';
import {
  createTaskState,
  CreateTaskStateRequest,
  TaskResponse,
  TaskStateResponse,
  updateTask
} from '../../api/taskApi';
import { Task } from '../../models/task/Task';
import { Board as BoardModel } from '../../models/board/Board';
import { moveInList, moveTaskBetweenColumns } from '../../helpers/drag';
import {
  BoardColumnResponse,
  createBoardColumn,
  CreateBoardColumnRequest,
  updateBoardColumn,
  UpdateBoardColumnRequest
} from '../../api/boardApi';

const parseDndId = (dndId: string) => dndId.split(':')[1];

type BoardProps = {
  projectId: string;
  board: BoardModel;
};

export const Board = ({ projectId, board: model }: BoardProps) => {
  const queryClient = useQueryClient();
  const [board, setBoard] = useState<BoardModel>(model);
  const [dragging, setDragging] = useState(false);
  const updateTaskMutation = useMutation<TaskResponse, Error, Task>({
    mutationFn: updateTask(projectId),
    onSuccess: () => queryClient.invalidateQueries(['board'])
  });
  const updateColumnMutation = useMutation<BoardColumnResponse, Error, UpdateBoardColumnRequest>({
    mutationFn: updateBoardColumn(projectId),
    onSuccess: () => queryClient.invalidateQueries(['board'])
  });
  const createColumnMutation = useMutation<BoardColumnResponse, Error, CreateBoardColumnRequest>({
    mutationFn: createBoardColumn(projectId),
    onSuccess: () => queryClient.invalidateQueries(['board'])
  });
  const createTaskStateMutation = useMutation<TaskStateResponse, Error, CreateTaskStateRequest>({
    mutationFn: createTaskState(projectId),
    onSuccess: () => queryClient.invalidateQueries(['board'])
  });

  const handleCardMoved = (cardId: string, columnId: string, index: number) => {
    const oldColumn = board.columns.find(col => {
      return !!col.tasks.find(task => task.id === cardId);
    });
    if (!oldColumn) return;
    const newColumn = board.columns.find(column => column.id === columnId);
    if (!newColumn) return;
    const task = oldColumn.tasks.find(task => task.id === cardId);
    if (!task) return;
    if (oldColumn.id === newColumn.id) {
      moveInList(oldColumn.tasks, task.position, index);
      setBoard({ ...board });
      board.columns.forEach(column =>
        updateColumnMutation.mutate({ columnId: column.id, data: column })
      );
    } else {
      task.boardColumnId = columnId;
      moveTaskBetweenColumns(oldColumn, newColumn, task, index);
      setBoard({ ...board });
      oldColumn.tasks.forEach(task => updateTaskMutation.mutate(task));
      newColumn.tasks.forEach(task => updateTaskMutation.mutate(task));
    }
  };

  const handleColumnMoved = (id: string, index: number) => {
    const column = board.columns.find(column => column.id === id);
    if (!column) return;
    moveInList(board.columns, column.position, index);
    setBoard({ ...board });
    board.columns.forEach(column =>
      updateColumnMutation.mutate({ columnId: column.id, data: column })
    );
  };

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleColumnAdded = (title: string) => {
    const taskState = createTaskStateMutation.mutate(
      {
        name: title,
        projectId
      },
      {
        onSuccess: taskState => {
          createColumnMutation.mutate(
            {
              title,
              position: board.columns.length + 1,
              taskStateId: taskState.id,
              state: taskState
            },
            {
              onSuccess: column => {
                column.tasks = column.tasks ?? [];
                board.columns.push(column);
                setBoard({ ...board });
              },
              onError: error => console.log(error)
            }
          );
        },
        onError: error => console.log(error)
      }
    );
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) {
      setDragging(false);
      return;
    }

    const id = parseDndId(result.draggableId);

    switch (type) {
      case DroppableTypes.COLUMN:
        handleColumnMoved(id, destination.index);
        break;
      case DroppableTypes.CARD:
        handleCardMoved(id, parseDndId(destination.droppableId), destination.index);
        break;
      default:
    }
    setDragging(false);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <StrictModeDroppable
        droppableId='board'
        type={DroppableTypes.COLUMN}
        direction='horizontal'
        isDropDisabled={!dragging}
      >
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
                  isDragDisabled={dragging}
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
                onAdd={text => handleColumnAdded(text)}
                toggleButtonText='+ Add another column'
              />
            </Col>
          </Row>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};
