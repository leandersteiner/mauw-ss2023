import { Col, Row, Space, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { BoardColumn } from './BoardColumn';
import { BoardResponse, getBoard } from '../../api/boardApi';

type BoardProps = {
  projectId: string;
};

export const Board = (props: BoardProps) => {
  const { isLoading, isError, error, data } = useQuery<BoardResponse, Error>({
    queryKey: ['board', props.projectId],
    queryFn: () => getBoard(props.projectId)
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

  console.log(data.columns);

  return (
    <Row>
      {data.columns.map(column => (
        <Col key={column.id} flex='auto'>
          <BoardColumn id={column.id} title={column.title} tasks={column.tasks} />
        </Col>
      ))}
    </Row>
  );
};
