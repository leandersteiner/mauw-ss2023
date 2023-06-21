import { Subtask } from './Subtask';
import { TaskComment } from './TaskComment';

export interface Task {
  id: string;
  name: string;
  description: string;
  done: boolean;
  subtasks: Subtask[];
  comments: TaskComment[];
  priority: number;
  position: number;
  assigneeId: string;
  taskStateId: string | null;
  sprintId: string;
  projectId: string;
  boardColumnId: string | null;
  creatorId: string;
}
