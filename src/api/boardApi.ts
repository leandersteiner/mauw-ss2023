import { api } from './api';
import { Board } from '../models/board/Board';
import { BoardColumn } from '../models/board/BoardColumn';

export type BoardResponse = Board;
export type BoardColumnResponse = BoardColumn;

export type UpdateBoardColumnRequest = { columnId: string; data: Partial<BoardColumn> };
export type CreateBoardColumnRequest = Partial<BoardColumn>;

const getBoard = (projectId: string) =>
  api
    .get<BoardResponse>(`/projects/${projectId}/board`)
    .then(res => res.data)
    .catch(reason => reason);

const updateBoard = (projectId: string) => (data: Board) =>
  api
    .patch<BoardResponse>(`/projects/${projectId}/board`, data)
    .then(res => res.data)
    .catch(reason => reason);

const updateBoardColumn =
  (projectId: string) =>
  ({ columnId, data }: UpdateBoardColumnRequest) =>
    api
      .patch<BoardColumn>(`/projects/${projectId}/board/columns/${columnId}`, data)
      .then(res => res.data)
      .catch(reason => reason);

const deleteBoardColumn = (projectId: string) => (columnId: string) =>
  api
    .delete<void>(`/projects/${projectId}/board/columns/${columnId}`)
    .then(res => res.data)
    .catch(reason => reason);

const createBoardColumn = (projectId: string) => (data: CreateBoardColumnRequest) =>
  api
    .post<BoardColumn>(`/projects/${projectId}/board/columns/`, data)
    .then(res => res.data)
    .catch(reason => reason);

export const BoardApi = {
  get: getBoard,
  update: updateBoard
};

export const BoardColumnApi = {
  create: createBoardColumn,
  update: updateBoardColumn,
  delete: deleteBoardColumn
};
