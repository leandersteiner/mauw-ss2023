import { Row, Col } from 'antd';
import { BoardColumn } from './BoardColumn';

type BoardProps = {
  id: string;
  title: string;
};

const boardColumns = [
  {
    id: '1',
    title: 'Column 1'
  },
  {
    id: '2',
    title: 'Column 2'
  },
  {
    id: '3',
    title: 'Column 3'
  },
  {
    id: '4',
    title: 'Column 4'
  }
];

export const Board = (props: BoardProps) => {
  return (
    <Row>
      {boardColumns.map(column => (
        <Col key={column.id} flex={'auto'}>
          <BoardColumn id={column.id} title={column.title} />
        </Col>
      ))}
    </Row>
  );
};
