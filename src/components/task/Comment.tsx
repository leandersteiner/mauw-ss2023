import { Avatar, Card, Col, Divider, Popconfirm, Row, Space, Tooltip, Typography } from 'antd';
import { DeleteOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import { Navigate } from 'react-router-dom';
import Paragraph from 'antd/es/typography/Paragraph';
import { TaskComment } from '../../models/task/TaskComment';
import { useAuth } from '../../context/AuthContext';

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
      actions={
        isCreator
          ? [
              <Tooltip key='delete' placement='bottom' title='Delete Task'>
                <Popconfirm
                  title='Delete Task'
                  description='Are you sure you want to delete this task?'
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  okButtonProps={{ danger: true }}
                  okText='Yes'
                  cancelText='No'
                  onConfirm={() => onCommentDeleted(comment.id)}
                >
                  <DeleteOutlined />
                </Popconfirm>
              </Tooltip>
            ]
          : []
      }
    >
      <Meta
        title={
          <Row justify='space-between'>
            <Col>
              <Avatar
                style={{ backgroundColor: '#87d068', marginRight: '8px' }}
                icon={<UserOutlined />}
              />
              <Text>{`${comment.creator.username}`}</Text>
            </Col>
            <Col>
              <Text disabled>{`${comment.createdAt.toDateString()}`}</Text>
            </Col>
          </Row>
        }
        description={
          <Space direction='vertical' style={{ width: '100%' }}>
            <Divider type='horizontal' style={{ margin: 0, backgroundColor: '#f9f9f9' }} />
            <Paragraph
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
          </Space>
        }
      />
    </Card>
  );
};
