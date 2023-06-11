import { api } from './api';
import { BoardResponse } from './boardApi';
import { Task } from '../models/task/Task';

export type TaskResponse = Task;
export const updateTask = (projectId: string) => (data: Task) =>
  api
    .patch<BoardResponse>(`/projects/${projectId}/tasks/${data.id}`, data)
    .then(res => res.data)
    .catch(reason => reason);
