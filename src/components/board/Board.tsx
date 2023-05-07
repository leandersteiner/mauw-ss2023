import { Col, Row } from 'antd';
import { BoardColumn, BoardColumnProps } from './BoardColumn';

type BoardProps = {
  id: string;
  name: string;
  boardColumns: BoardColumnProps[];
};

export const Board = (props: BoardProps) => {
  const { boardColumns } = props;
  return (
    <Row>
      {boardColumns.map(column => (
        <Col key={column.id} flex='auto'>
          <BoardColumn id={column.id} title={column.title} />
        </Col>
      ))}
    </Row>
  );
};
