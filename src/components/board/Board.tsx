import { Space } from 'antd';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { BoardColumn } from './BoardColumn';
import { DroppableTypes } from '../../constants/DroppableTypes';
import { StrictModeDroppable } from '../dnd/StrictModeDroppable';
import { AddNewItem } from './AddNewItem';
import {
  createTaskState,
  CreateTaskStateRequest,
  TaskApi,
  TaskResponse,
  TaskStateApi,
  TaskStateResponse,
  updateTask
} from '../../api/taskApi';
import { Task } from '../../models/task/Task';
import { Board as BoardModel } from '../../models/board/Board';
import { moveInList, moveTaskBetweenColumns, reorder } from '../../helpers/drag';
import {
  BoardColumnResponse,
  createBoardColumn,
  CreateBoardColumnRequest,
  deleteBoardColumn,
  updateBoardColumn,
  UpdateBoardColumnRequest
} from '../../api/boardApi';
import { NotFound } from '../../views/NotFound';
import { BACKLOG_ID } from '../../constants/board';
import { useBoard } from '../../context/BoardContext';
import { BacklogColumn } from './BacklogColumn';
import { BoardColumn as BoardColumnModel } from '../../models/board/BoardColumn';

const parseDndId = (dndId: string) => dndId.split(':')[1];

type BoardProps = {
  board: BoardModel;
  backlog: Task[];
};

export const Board = ({ board: model, backlog: b }: BoardProps) => {
  const [board, setBoard] = useState<BoardModel>(model);
  const [backlog, setBacklog] = useState<Task[]>(b);
  const [dragging, setDragging] = useState(false);
  const { projectId } = useBoard();

  const { mutate: updateTask } = useMutation<TaskResponse, Error, Task>({
    mutationFn: TaskApi.update(projectId)
  });

  const { mutate: updateColumn } = useMutation<
    BoardColumnResponse,
    Error,
    UpdateBoardColumnRequest
  >({
    mutationFn: updateBoardColumn(projectId)
  });

  const { mutate: createColumn } = useMutation<
    BoardColumnResponse,
    Error,
    CreateBoardColumnRequest
  >({
    mutationFn: createBoardColumn(projectId)
  });

  const { mutate: createTaskState } = useMutation<TaskStateResponse, Error, CreateTaskStateRequest>(
    {
      mutationFn: TaskStateApi.create(projectId)
    }
  );

  const { mutate: deleteColumn } = useMutation<void, Error, string>({
    mutationFn: deleteBoardColumn(projectId)
  });

  if (!model) return <NotFound />;

  const handleColumnUpdated = (column: BoardColumnModel) => {
    setBoard({
      ...board,
      columns: reorder([...board.columns.filter(col => col.id !== column.id), column])
    });
  };

  const handleCardMoved = (taskId: string, columnId: string, index: number) => {
    const toBacklog = columnId === BACKLOG_ID;
    const fromBacklog = !!backlog.find(task => task.id === taskId);

    if (fromBacklog) {
      const movedTask = backlog.find(t => t.id === taskId);
      if (!movedTask) return;

      if (toBacklog) {
        moveInList(backlog, movedTask.position, index);
        setBacklog([...backlog]);
        backlog.forEach(task => updateTask(task));
      } else {
        movedTask.boardColumnId = columnId;
        const newColumn = board.columns.find(column => column.id === columnId);
        if (!newColumn) return;
        const { newSource, newDestination } = moveTaskBetweenColumns(
          backlog,
          BACKLOG_ID,
          newColumn.tasks,
          newColumn.id,
          movedTask,
          index
        );
        newColumn.tasks = newDestination;
        setBacklog([...newSource]);
        setBoard({ ...board });
        backlog.forEach(task => updateTask(task));
        newColumn.tasks.forEach(task => updateTask(task));
      }
      return;
    }

    if (toBacklog) {
      const oldColumn = board.columns.find(col => {
        return !!col.tasks.find(task => task.id === taskId);
      });
      if (!oldColumn) return;
      const movedTask = oldColumn.tasks.find(task => task.id === taskId);
      if (!movedTask) return;
      const { newSource, newDestination } = moveTaskBetweenColumns(
        oldColumn.tasks,
        oldColumn.id,
        backlog,
        BACKLOG_ID,
        movedTask,
        index
      );
      oldColumn.tasks = newSource;
      movedTask.boardColumnId = null;
      movedTask.taskStateId = null;
      setBacklog([...newDestination]);
      setBoard({ ...board });
      oldColumn.tasks.forEach(task => updateTask(task));
      backlog.forEach(task => updateTask(task));
    }

    const oldColumn = board.columns.find(column => {
      return !!column.tasks.find(task => task.id === taskId);
    });
    if (!oldColumn) return;
    const movedTask = oldColumn.tasks.find(task => task.id === taskId);
    if (!movedTask) return;
    movedTask.boardColumnId = columnId;
    const newColumn = board.columns.find(column => column.id === columnId);
    if (!newColumn) return;
    if (oldColumn.id === newColumn.id) {
      moveInList(oldColumn.tasks, movedTask.position, index);
      setBoard({ ...board });
      oldColumn.tasks.forEach(task => updateTask(task));
    } else {
      movedTask.boardColumnId = columnId;
      const { newSource, newDestination } = moveTaskBetweenColumns(
        oldColumn.tasks,
        oldColumn.id,
        newColumn.tasks,
        newColumn.id,
        movedTask,
        index
      );
      oldColumn.tasks = newSource;
      newColumn.tasks = newDestination;
      oldColumn.tasks.forEach(task => updateTask(task));
      newColumn.tasks.forEach(task => updateTask(task));
    }
  };

  const handleColumnMoved = (id: string, index: number) => {
    const column = board.columns.find(column => column.id === id);
    if (!column) return;
    moveInList(board.columns, column.position, index);
    board.columns.forEach(column => updateColumn({ columnId: column.id, data: column }));
  };

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleColumnCreated = (title: string) => {
    createTaskState(
      {
        name: title,
        projectId
      },
      {
        onSuccess: taskState => {
          createColumn(
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
              }
            }
          );
        }
      }
    );
  };

  const handleColumnDeleted = (columnId: string) => {
    const deletedColumn = board.columns.find(column => column.id === columnId);
    if (!deletedColumn) return;
    board.columns = board.columns.filter(column => column.id !== columnId);
    setBoard({ ...board });
    deleteColumn(columnId);
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
          <Space
            style={{ height: '100%' }}
            ref={innerRef}
            align='start'
            {...droppableProps}
            size='middle'
          >
            <BacklogColumn tasks={backlog} updateTasks={setBacklog} />
            {board.columns
              .sort((a, b) => a.position - b.position)
              .map(column => {
                return (
                  <Draggable
                    key={column.id}
                    draggableId={`column:${column.id}`}
                    index={column.position}
                    isDragDisabled={dragging}
                  >
                    {provided => (
                      <div
                        key={column.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <BoardColumn
                          column={column}
                          onColumnDeleted={handleColumnDeleted}
                          onColumnUpdated={handleColumnUpdated}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
            {placeholder}
            <div style={{ width: '200px' }}>
              <AddNewItem onAdd={handleColumnCreated} toggleButtonText='Add column' />
            </div>
          </Space>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};
