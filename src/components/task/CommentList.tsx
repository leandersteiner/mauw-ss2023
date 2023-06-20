import Title from 'antd/es/typography/Title';
import { Comment } from './Comment';

export const CommentList = () => {
  return (
    <>
      <Title level={4} style={{ marginTop: 0 }}>
        CommentList
      </Title>
      <Comment />
      <Comment />
      <Comment />
    </>
  );
};
