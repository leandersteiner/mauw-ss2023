import { Draggable } from 'react-beautiful-dnd';
import { Button, Col, Popconfirm, Row, Space, Tooltip } from 'antd';
import { DeleteFilled, QuestionCircleOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DroppableTypes } from '../../constants/DroppableTypes';
import { StrictModeDroppable } from '../dnd/StrictModeDroppable';
import { BoardColumnTask } from './BoardColumnTask';
import { AddNewItem } from './AddNewItem';
import { Task } from '../../models/task/Task';
import { BACKLOG_ID } from '../../constants/board';
import {
  BoardColumnResponse,
  UpdateBoardColumnRequest,
  updateBoardColumn
} from '../../api/boardApi';
import { useBoard } from '../../context/BoardContext';

export type BoardColumnProps = {
  id: string;
  title: string;
  taskStateId: string;
  tasks: Task[];
  onTaskCreated: (title: string, columnId: string) => void;
  onTaskDeleted: (taskId: string, columnId: string | null) => void;
  onTaskEdited: (taskId: string, task: Task) => void;
  onColumnDeleted: (columnId: string) => void;
  onColumnRenamed: (columnId: string, newTitle: string) => void;
};

export const BoardColumn = ({
  id,
  title,
  tasks,
  onTaskCreated,
  onTaskDeleted,
  onTaskEdited,
  onColumnDeleted,
  onColumnRenamed
}: BoardColumnProps) => {
  const queryClient = useQueryClient();
  const { projectId } = useBoard();
  const updateColumnMutation = useMutation<BoardColumnResponse, Error, UpdateBoardColumnRequest>({
    mutationFn: updateBoardColumn(projectId),
    onSuccess: () => queryClient.invalidateQueries(['board'])
  });

  const isBacklog = id === BACKLOG_ID;

  const handleColumnRenamed = (newTitle: string) => {
    title = newTitle;
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
                  onTaskDeleted={onTaskDeleted}
                  onTaskEdited={onTaskEdited}
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
              <Title
                level={4}
                style={{ margin: 0, width: '225px' }}
                editable={{
                  triggerType: isBacklog ? [] : ['text'],
                  onChange: text => {
                    title = text;
                  },
                  onEnd: () => onColumnRenamed(id, title)
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
          <AddNewItem onAdd={text => onTaskCreated(text, id)} toggleButtonText='Add Task' />
        </Space>
      )}
    </StrictModeDroppable>
  );
};
