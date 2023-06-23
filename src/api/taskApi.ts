import { api } from './api';
import { BoardResponse } from './boardApi';
import { Task } from '../models/task/Task';
import { TaskState } from '../models/task/TaskState';
import { Subtask } from '../models/task/Subtask';
import { TaskComment } from '../models/task/TaskComment';

export type TaskResponse = Task;
export type TaskStateResponse = TaskState;
export type BacklogTasksResponse = Task[];
export type SubtaskResponse = Subtask;
export type CommentResponse = TaskComment;

export type CreateTaskRequest = { columnId: string | null; data: Partial<Task> };
export type CreateTaskStateRequest = Partial<TaskState>;
export type CreateSubtaskRequest = Partial<Subtask>;
export type CreateCommentRequest = Partial<TaskComment>;

const createTask =
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

const updateTask = (projectId: string) => (data: Task) =>
  api
    .patch<BoardResponse>(`/projects/${projectId}/tasks/${data.id}`, data)
    .then(res => res.data)
    .catch(reason => reason);

const deleteTask = (projectId: string) => (taskId: string) =>
  api
    .delete<void>(`/projects/${projectId}/tasks/${taskId}`)
    .then(res => res.data)
    .catch(reason => reason);

const createTaskState = (projectId: string) => (data: CreateTaskStateRequest) =>
  api
    .post<TaskStateResponse>(`/projects/${projectId}/tasks/states`, data)
    .then(res => res.data)
    .catch(reason => reason);

const getBacklogTasks = (projectId: string) =>
  api
    .get<BacklogTasksResponse>(`/projects/${projectId}/backlog/tasks`)
    .then(res => res.data)
    .catch(reason => reason);

const createSubtask = (taskId: string) => (data: CreateSubtaskRequest) =>
  api
    .post<SubtaskResponse>(`/tasks/${taskId}/subtasks`, data)
    .then(res => res.data)
    .catch(reason => reason);

const updateSubtask = (taskId: string) => (data: Partial<Subtask>) =>
  api
    .patch<SubtaskResponse>(`/tasks/${taskId}/subtasks/${data.id}`, data)
    .then(res => res.data)
    .catch(reason => reason);

const deleteSubtask = (taskId: string) => (subtaskId: string) =>
  api
    .delete<void>(`/tasks/${taskId}/subtasks/${subtaskId}`)
    .then(res => res.data)
    .catch(reason => reason);

const createComment = (taskId: string) => (data: CreateCommentRequest) =>
  api
    .post<CommentResponse>(`tasks/${taskId}/comments`, data)
    .then(res => res.data)
    .catch(reason => reason);

const updateComment = (taskId: string) => (data: CreateCommentRequest) =>
  api
    .patch<CommentResponse>(`/tasks/${taskId}/comments/${data.id}`, data)
    .then(res => res.data)
    .catch(reason => reason);

const deleteComment = (taskId: string) => (commentId: string) =>
  api
    .delete<void>(`/tasks/${taskId}/comments/${commentId}`)
    .then(res => res.data)
    .catch(reason => reason);

export const TaskApi = {
  create: createTask,
  update: updateTask,
  delete: deleteTask,
  getBacklog: getBacklogTasks
};

export const TaskStateApi = {
  create: createTaskState
};

export const SubtaskApi = {
  create: createSubtask,
  update: updateSubtask,
  delete: deleteSubtask
};

export const CommentApi = {
  create: createComment,
  update: updateComment,
  delete: deleteComment
};
