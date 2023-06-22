import { BoardColumn } from './BoardColumn';

export interface Board {
  id: string;
  title: string;
  columns: BoardColumn[];
}
