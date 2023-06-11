import { Card } from 'antd';

type BoardColumnTaskProps = {
  id: string;
  title: string;
};

export const BoardColumnTask = (props: BoardColumnTaskProps) => {
  return (
    <Card title={props.title} style={{ borderRadius: 0, border: '1px solid #cfcfcf' }}>
      Test
    </Card>
  );
};
