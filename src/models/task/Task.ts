export interface Task {
  id: string;
  name: string;
  description: string;
  done: boolean;
  priority: number;
  position: number;
  assigneeId: string;
  taskStateId: string | null;
  sprintId: string;
  projectId: string;
  boardColumnId: string | null;
  creatorId: string;
}
