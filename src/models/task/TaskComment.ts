export interface TaskComment {
  id: string;
  comment: string;
  creator: { id: string; email: string; username: string };
  createdAt: Date;
}
