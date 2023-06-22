import Title from 'antd/es/typography/Title';
import { Divider } from 'antd';
import { Comment } from './Comment';
import { TaskComment } from '../../models/task/TaskComment';
import { AddNewItem } from '../board/AddNewItem';

type CommentListProps = {
  comments: TaskComment[];
  onCommentCreated: (comment: string) => void;
  onCommentDeleted: (commentId: string) => void;
  onCommentUpdated: (commentId: string, comment: TaskComment) => void;
};

export const CommentList = ({
  comments,
  onCommentCreated,
  onCommentDeleted,
  onCommentUpdated
}: CommentListProps) => {
  return (
    <>
      <Title level={4}>Comments</Title>
      {comments
        ?.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            onCommentDeleted={onCommentDeleted}
            onCommentUpdated={onCommentUpdated}
          />
        ))}
      <Divider />
      <AddNewItem onAdd={onCommentCreated} toggleButtonText='Add Comment' />
      <Divider />
    </>
  );
};
