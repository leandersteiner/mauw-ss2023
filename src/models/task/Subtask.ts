export interface Subtask {
  id: string;
  name: string;
  done: boolean;
  taskId: string;
  creatorId: string;
  createdAt: Date;
}
