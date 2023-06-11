import { Task } from '../task/Task';

export interface BoardColumn {
  id: string;
  title: string;
  state: {
    id: string;
    name: string;
  };
  position: number;
  tasks: Task[];
}
