import { Action, Actions } from './actions';
import { AppState } from './AppState';
import { findItemIndexById, moveItem } from '../helpers/array';

export const appStateReducer = (state: AppState, action: Action): void => {
  switch (action.type) {
    case Actions.UPDATE_STATE: {
      state = action.payload;
      break;
    }
    case Actions.ADD_LIST: {
      state.projectBoard.columns.push(action.payload);
      break;
    }
    case Actions.ADD_TASK: {
      const targetColumn = findItemIndexById(
        state.projectBoard.columns,
        action.payload.boardColumnId ?? ''
      );
      state.projectBoard.columns[targetColumn].tasks.push(action.payload);
      break;
    }
    case Actions.MOVE_LIST: {
      const { draggedId, hoverId } = action.payload;
      const dragIndex = findItemIndexById(state.projectBoard.columns, draggedId);
      const hoverIndex = findItemIndexById(state.projectBoard.columns, hoverId);
      state.projectBoard.columns = moveItem(state.projectBoard.columns, dragIndex, hoverIndex);
      break;
    }
    default:
      break;
  }
};
