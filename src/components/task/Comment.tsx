import { Avatar, Button, Card, Col, Popconfirm, Row, Space, Tooltip, Typography } from 'antd';
import { DeleteFilled, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom';
import Paragraph from 'antd/es/typography/Paragraph';
import { TaskComment } from '../../models/task/TaskComment';
import { useAuth } from '../../context/AuthContext';
import { stringToColorCode } from '../../helpers/color';
import { EditableMarkdown } from './EditableMarkdown';

const { Text } = Typography;

type CommentProps = {
  comment: TaskComment;
  onCommentDeleted: (commentId: string) => void;
  onCommentUpdated: (commentId: string, comment: TaskComment) => void;
};

export const Comment = ({ comment, onCommentDeleted, onCommentUpdated }: CommentProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to='/login' />;

  const isCreator = user.id === comment.creator.id;
  comment.createdAt = new Date(comment.createdAt);
  return (
    <Card
      style={{ marginTop: 16 }}
      title={
        <Row justify='space-between' align='middle'>
          <Col>
            <Avatar
              style={{ backgroundColor: stringToColorCode(comment.creator.id), marginRight: '8px' }}
              icon={<UserOutlined />}
              shape='square'
            />
            <Text>{`${comment.creator.username}`}</Text>
          </Col>
          <Col>
            <Space size='middle'>
              <Text disabled>{`${comment.createdAt.toDateString()}`}</Text>
              {isCreator && (
                <Tooltip key='delete' placement='bottom' title='Delete Comment'>
                  <Popconfirm
                    title='Delete Comment'
                    description='Are you sure you want to delete this comment?'
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    okButtonProps={{ danger: true }}
                    okText='Yes'
                    cancelText='No'
                    onConfirm={() => onCommentDeleted(comment.id)}
                  >
                    <Button type='primary' icon={<DeleteFilled />} danger size='small' />
                  </Popconfirm>
                </Tooltip>
              )}
            </Space>
          </Col>
        </Row>
      }
    >
      <EditableMarkdown text={comment.comment} />
      <Paragraph
        style={{ margin: 0 }}
        editable={
          isCreator
            ? {
                triggerType: ['text'],
                onChange: text => {
                  comment.comment = text;
                },
                onEnd: () => {
                  onCommentUpdated(comment.id, comment);
                }
              }
            : false
        }
      >
        {comment.comment}
      </Paragraph>
    </Card>
  );
};
