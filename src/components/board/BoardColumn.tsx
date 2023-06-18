import { Draggable } from 'react-beautiful-dnd';
import { Button, Col, Row, Space, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
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
  onTaskCreated: (title: string, columnId: string) => void;
  onTaskDeleted: (taskId: string, columnId: string) => void;
  onColumnDeleted: (columnId: string) => void;
};

export const BoardColumn = ({
  id,
  title,
  index,
  tasks,
  onTaskCreated,
  onTaskDeleted,
  onColumnDeleted
}: BoardColumnProps) => {
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
            width: '272px'
          }}
        >
          <Row justify='space-between' align='middle'>
            <Col>
              <h1>{title}</h1>
            </Col>
            <Col>
              <Tooltip title='Delete Column'>
                <Button
                  type='primary'
                  icon={<CloseOutlined />}
                  danger
                  size='small'
                  onClick={() => onColumnDeleted(id)}
                />
              </Tooltip>
            </Col>
          </Row>
          <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 250px)' }} className='scrollbar'>
            {tasksNode}
            {placeholder}
          </div>
          <AddNewItem
            onAdd={text => onTaskCreated(text, id)}
            toggleButtonText='+ Add another Task'
          />
        </Space>
      )}
    </StrictModeDroppable>
  );
};
