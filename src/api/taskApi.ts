import { api } from './api';
import { BoardResponse } from './boardApi';
import { Task } from '../models/task/Task';
import { TaskState } from '../models/task/TaskState';

export type TaskResponse = Task;
export type TaskStateResponse = TaskState;
export type BacklogTasksResponse = Task[];

export type CreateTaskRequest = { columnId?: string; data: Partial<Task> };
export type CreateTaskStateRequest = Partial<TaskState>;

export const createTask =
  (projectId: string) =>
  ({ columnId, data }: CreateTaskRequest) =>
    api
      .post<TaskResponse>(
        columnId
          ? `/projects/${projectId}/board/columns/${columnId}/tasks`
          : `/projects/${projectId}/tasks`,
        data
      )
      .then(res => res.data)
      .catch(reason => reason);

export const updateTask = (projectId: string) => (data: Task) =>
  api
    .patch<BoardResponse>(`/projects/${projectId}/tasks/${data.id}`, data)
    .then(res => res.data)
    .catch(reason => reason);

export const createTaskState = (projectId: string) => (data: CreateTaskStateRequest) =>
  api
    .post<TaskStateResponse>(`/projects/${projectId}/tasks/states`, data)
    .then(res => res.data)
    .catch(reason => reason);

export const getBacklogTasks = (projectId: string) =>
  api
    .get<BacklogTasksResponse>(`/projects/${projectId}/backlog/tasks`)
    .then(res => res.data)
    .catch(reason => reason);
