import { Board as BoardComponent } from '../../components/board/Board';
import { BoardColumnProps } from '../../components/board/BoardColumn';

const testColumns: BoardColumnProps[] = [
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

export const ViewBoard = () => {
  return <BoardComponent id='1' name='Board 1' boardColumns={testColumns} />;
};
