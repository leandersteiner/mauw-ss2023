import { DroppableTypes } from "../../constants/DroppableTypes";
import { BoardColumnTask } from "./BoardColumnTask";
import { Droppable } from "react-beautiful-dnd";

export const TasksNode() => {
  return <Droppable droppableId={`column:${props.id}`} type={DroppableTypes.CARD}>
    {({ innerRef, droppableProps, placeholder }) => (
      <div key={task.id} style={{ paddingBottom: '8px', paddingTop: '8px' }} draggable>
        <BoardColumnTask id={task.id} title={task.name} />
      </div>
    )}
  </Droppable>
}