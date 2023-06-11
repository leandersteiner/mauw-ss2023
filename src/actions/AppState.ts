import { Board } from '../models/board/Board';

export interface AppState {
  userId: string;
  organisationId: string;
  teamId: string;
  projectId: string;
  projectBoard: Board;
}
