import { Draggable } from 'react-beautiful-dnd';
import { Col, Row, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { DroppableTypes } from '../../constants/DroppableTypes';
import { StrictModeDroppable } from '../dnd/StrictModeDroppable';
import { BoardColumnTask } from './BoardColumnTask';
import { AddNewItem } from './AddNewItem';
import { Task } from '../../models/task/Task';
import { BACKLOG_ID } from '../../constants/board';
import { CreateTaskRequest, TaskApi, TaskResponse } from '../../api/taskApi';
import { useBoard } from '../../context/BoardContext';
import { reorder } from '../../helpers/drag';

export type BacklogColumnProps = {
  tasks: Task[];
  updateTasks: Dispatch<SetStateAction<Task[]>>;
};

export const BacklogColumn = ({ tasks, updateTasks }: BacklogColumnProps) => {
  const id = BACKLOG_ID;
  const { projectId, userId } = useBoard();

  const { mutate: createTask } = useMutation<TaskResponse, Error, CreateTaskRequest>({
    mutationFn: TaskApi.create(projectId)
  });

  const { mutate: updateTask } = useMutation<TaskResponse, Error, Task>({
    mutationFn: TaskApi.update(projectId)
  });

  const { mutate: deleteTask } = useMutation<void, Error, string>({
    mutationFn: TaskApi.delete(projectId)
  });

  const handleTaskCreated = (title: string) => {
    createTask(
      {
        columnId: null,
        data: {
          boardColumnId: null,
          name: title,
          description: '',
          projectId,
          creatorId: userId,
          done: false,
          position: tasks.length + 1
        }
      },
      {
        onSuccess: task => {
          task.subtasks = task.subtasks ?? [];
          updateTasks([...tasks, task]);
        }
      }
    );
  };

  const handleTaskUpdated = (taskId: string, task: Task) => {
    updateTask(task, {
      onSuccess: task => {
        tasks.forEach((t, i) => {
          if (t.id === taskId) {
            tasks[i] = task;
            updateTasks([...tasks]);
          }
        });
      }
    });
  };

  const handleTaskDeleted = (taskId: string) => {
    const deletedTask = tasks.find(task => task.id === taskId);
    if (!deletedTask) return;
    updateTasks([...reorder(tasks.filter(task => task.id !== taskId))]);
    deleteTask(taskId);
    tasks.forEach(task => updateTask(task));
  };

  const tasksNode = (
    <Space direction='vertical' style={{ width: '100%' }}>
      {tasks
        .sort((a, b) => a.position - b.position)
        .map(task => (
          <Draggable key={task.id} draggableId={`task:${task.id}`} index={task.position}>
            {({ innerRef, draggableProps, dragHandleProps }) => (
              <div {...draggableProps} {...dragHandleProps} ref={innerRef}>
                <BoardColumnTask
                  id={task.id}
                  columnId={id}
                  task={task}
                  onTaskDeleted={handleTaskDeleted}
                  onTaskEdited={handleTaskUpdated}
                />
              </div>
            )}
          </Draggable>
        ))}
    </Space>
  );

  return (
    <StrictModeDroppable
      droppableId={`column:${id}`}
      type={DroppableTypes.CARD}
      direction='vertical'
    >
      {({ innerRef, droppableProps, placeholder }) => (
        <Space
          {...droppableProps}
          ref={innerRef}
          direction='vertical'
          style={{
            width: '275px'
          }}
        >
          <Row justify='space-between' align='middle'>
            <Col>
              <Title level={4} style={{ margin: 0, width: '225px' }} ellipsis={{ rows: 1 }}>
                Backlog
              </Title>
            </Col>
          </Row>
          <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 250px)' }} className='scrollbar'>
            {tasksNode}
            {placeholder}
          </div>
          <AddNewItem onAdd={text => handleTaskCreated(text)} toggleButtonText='Add Task' />
        </Space>
      )}
    </StrictModeDroppable>
  );
};
