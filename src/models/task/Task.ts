export interface Task {
  id: string;
  name: string;
  description: string;
  done: boolean;
  priority: number;
  assigneeId: string;
  stateId: string;
  sprintId: string;
  boardColumnId: string;
  creatorId: string;
}
