import { api } from './api';
import { Board } from '../models/board/Board';

export type BoardResponse = Board;

export const getBoard = (projectId: string) =>
  api
    .get<BoardResponse>(`/projects/${projectId}/board`)
    .then(res => res.data)
    .catch(reason => reason);
