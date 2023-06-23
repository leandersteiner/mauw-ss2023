import { Draggable } from 'react-beautiful-dnd';
import { Button, Col, Popconfirm, Row, Space, Tooltip } from 'antd';
import { DeleteFilled, QuestionCircleOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { DroppableTypes } from '../../constants/DroppableTypes';
import { StrictModeDroppable } from '../dnd/StrictModeDroppable';
import { BoardColumnTask } from './BoardColumnTask';
import { AddNewItem } from './AddNewItem';
import { Task } from '../../models/task/Task';
import { useBoard } from '../../context/BoardContext';
import { TaskApi } from '../../api/taskApi';
import { reorder } from '../../helpers/drag';
import { BoardColumn as BoardColumnModel } from '../../models/board/BoardColumn';
import { BoardColumnApi } from '../../api/boardApi';

export type BoardColumnProps = {
  column: BoardColumnModel;
  onColumnDeleted: (columnId: string) => void;
  onColumnUpdated: (column: BoardColumnModel) => void;
};

export const BoardColumn = (props: BoardColumnProps) => {
  const [column, setColumn] = useState(props.column);
  const { id, title, tasks, taskStateId } = column;
  const { onColumnDeleted, onColumnUpdated } = props;
  const { projectId, userId } = useBoard();

  useEffect(() => {
    setColumn(props.column);
  }, [props.column]);

  const { mutate: createTask } = useMutation(TaskApi.create(projectId));
  const { mutate: updateTask } = useMutation(TaskApi.update(projectId));
  const { mutate: deleteTask } = useMutation(TaskApi.delete(projectId));
  const { mutate: updateColumn } = useMutation(BoardColumnApi.update(projectId));

  const handleTaskCreated = (title: string) => {
    createTask(
      {
        columnId: id,
        data: {
          boardColumnId: id,
          name: title,
          description: '',
          projectId,
          creatorId: userId,
          done: false,
          position: tasks.length + 1,
          taskStateId
        }
      },
      {
        onSuccess: task => {
          task.subtasks = task.subtasks ?? [];
          onColumnUpdated({ ...column, tasks: [...tasks, task] });
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
            setColumn({ ...column, tasks: [...tasks] });
            onColumnUpdated(column);
          }
        });
      }
    });
  };

  const handleTaskDeleted = (taskId: string) => {
    const deletedTask = tasks.find(task => task.id === taskId);
    if (!deletedTask) return;
    deleteTask(taskId);
    tasks.forEach(task => updateTask(task));
    onColumnUpdated({ ...column, tasks: [...reorder(tasks.filter(task => task.id !== taskId))] });
  };

  const handleColumnRenamed = (title: string) => {
    updateColumn({ columnId: id, data: { ...column, title } });
    onColumnUpdated({ ...column, title });
  };

  const tasksNode = (
    <Space direction='vertical' style={{ width: '100%' }}>
      {tasks
        .sort((a, b) => a.position - b.position)
        .map(task => {
          return (
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
          );
        })}
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
              <Title
                level={4}
                style={{ margin: 0, width: '225px' }}
                editable={{
                  triggerType: ['text'],
                  onChange: text => {
                    handleColumnRenamed(text);
                  }
                }}
                ellipsis={{ rows: 1 }}
              >
                {title}
              </Title>
            </Col>
            {id !== 'backlog' && (
              <Col>
                <Tooltip title='Delete Column' placement='left'>
                  <Popconfirm
                    title='Delete Task'
                    description='Are you sure you want to delete this task?'
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    okButtonProps={{ danger: true }}
                    okText='Yes'
                    cancelText='No'
                    onConfirm={() => onColumnDeleted(id)}
                  >
                    <Button type='primary' icon={<DeleteFilled />} danger size='small' />
                  </Popconfirm>
                </Tooltip>
              </Col>
            )}
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
