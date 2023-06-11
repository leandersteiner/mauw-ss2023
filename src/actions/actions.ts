import { Task } from '../models/task/Task';
import { BoardColumn } from '../models/board/BoardColumn';
import { AppState } from './AppState';

export enum Actions {
  UPDATE_STATE = 'UPDATE_STATE',
  ADD_LIST = 'ADD_LIST',
  ADD_TASK = 'ADD_TASK',
  MOVE_LIST = 'MOVE_LIST'
}

interface InitStateAction {
  type: Actions.UPDATE_STATE;
  payload: AppState;
}

interface AddBoardColumnAction {
  type: Actions.ADD_LIST;
  payload: BoardColumn;
}

interface AddTaskAction {
  type: Actions.ADD_TASK;
  payload: Task;
}

interface MoveListAction {
  type: Actions.MOVE_LIST;
  payload: {
    draggedId: string;
    hoverId: string;
  };
}

export type Action = InitStateAction | AddBoardColumnAction | AddTaskAction | MoveListAction;

export const updateState = (state: AppState): Action => ({
  type: Actions.UPDATE_STATE,
  payload: state
});
export const addTask = (task: Task): Action => ({
  type: Actions.ADD_TASK,
  payload: task
});

export const addBoardColumn = (boardColumn: BoardColumn): Action => ({
  type: Actions.ADD_LIST,
  payload: boardColumn
});

export const moveList = (draggedId: string, hoverId: string): Action => ({
  type: Actions.MOVE_LIST,
  payload: { draggedId, hoverId }
});
