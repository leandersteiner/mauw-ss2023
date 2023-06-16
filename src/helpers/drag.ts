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

export const moveBetweenLists = <T extends DragItem>(
  source: T[],
  destination: T[],
  item: T,
  fromPosition: number,
  toPosition: number
): { source: T[]; destination: T[] } => {
  const sourceResult = source.filter(i => i.position !== fromPosition);
  const destinationResult = Array.from(destination);
  destinationResult.push({ ...item, position: toPosition });
  return { source: reorder(sourceResult), destination: reorder(destinationResult) };
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
};
