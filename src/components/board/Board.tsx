import { Col, Row, Space, Spin } from 'antd';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BoardColumn } from './BoardColumn';
import { DroppableTypes } from '../../constants/DroppableTypes';
import { StrictModeDroppable } from '../dnd/StrictModeDroppable';
import { AddNewItem } from './AddNewItem';
import { BoardResponse, getBoard } from '../../api/boardApi';
import { TaskResponse, updateTask } from '../../api/taskApi';
import { Task } from '../../models/task/Task';

const parseDndId = (dndId: string) => dndId.split(':')[1];

type BoardProps = {
  projectId: string;
};

export const Board = ({ projectId }: BoardProps) => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: board
  } = useQuery<BoardResponse, Error>({
    queryKey: ['board'],
    queryFn: () => getBoard(projectId)
  });

  const mutation = useMutation<TaskResponse, Error, Task>({
    mutationFn: updateTask(projectId ?? ''),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board']
      });
    }
  });

  if (isLoading) {
    return (
      <Space direction='vertical' style={{ width: '100%' }}>
        <Spin tip='Loading' size='large'>
          <div className='content' />
        </Spin>
      </Space>
    );
  }

  if (isError) {
    return <div>There was an unexpected error: {error.message}</div>;
  }

  console.log(board, projectId);

  const handleCardMoved = (cardId: string, columnId: string, index: number) => {
    const newColumn = board.columns.find(column => column.id === columnId);
    if (!newColumn) return;
    const updatedTask = newColumn.tasks.find(task => task.id === cardId);
    if (!updatedTask) return;
    updatedTask.boardColumnId = columnId;
    updatedTask.position = index;
    mutation.mutate(updatedTask);
  };

  const handleListMoved = (id: string, index: number) => {
    console.log(id, index);
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
            {board.columns.map(column => (
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
