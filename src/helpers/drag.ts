import { removeItemById } from './array';
import { Task } from '../models/task/Task';

type DragItem = {
  id: string;
  position: number;
};

export const reorder = <T extends DragItem>(list: T[]): T[] => {
  const result = list.sort((a, b) => a.position - b.position);
  return result.map((item, index) => {
    item.position = index + 1;
    return item;
  });
};

export const moveTaskBetweenColumns = (
  source: Task[],
  sourceId: string,
  destination: Task[],
  destinationId: string,
  item: Task,
  index: number
): { newSource: Task[]; newDestination: Task[] } => {
  if (sourceId !== destinationId) {
    source = removeItemById(source, item.id);
  }

  item.position = index;

  destination.forEach(task => {
    if (task.position >= index) task.position += 1;
  });

  destination.push(item);

  reorder(source);
  reorder(destination);

  return { newSource: source, newDestination: destination };
};

export const moveInList = <T extends DragItem>(
  list: T[],
  fromPosition: number,
  toPosition: number
): void => {
  const movedItem = list.find(item => item.position === fromPosition);
  if (!movedItem) return;
  const newList = list.filter(item => item.id !== movedItem.id);
  newList.map(item => {
    if (item.position > toPosition) {
      item.position += 1;
    } else if (item.position < toPosition) {
      item.position -= 1;
    } else if (item.position === toPosition) {
      if (item.position > fromPosition) {
        item.position -= 1;
      } else if (item.position < fromPosition) {
        item.position += 1;
      }
    }
    if (item.position > list.length) item.position = list.length;
    if (item.position < 1) item.position = 1;
    return item;
  });
  movedItem.position = toPosition;
  list = reorder(list);
};
