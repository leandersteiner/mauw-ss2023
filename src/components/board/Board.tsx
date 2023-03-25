type BoardProps = {
  id: string;
  title: string;
};

export const Board = (props: BoardProps) => {
  return <div>{props.title}</div>;
};
