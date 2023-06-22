import { useCallback, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SimpleMdeReact from 'react-simplemde-editor';
import { Button } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

type EditableMarkdownProps = {
  text: string;
  onSave: (markdown: string) => void;
};

export const EditableMarkdown = ({ text, onSave }: EditableMarkdownProps) => {
  const [edit, setEdit] = useState(false);
  const [markdown, setMarkdown] = useState(text);

  const onChange = useCallback((value: string) => {
    setMarkdown(value);
  }, []);

  return (
    <>
      {edit ? (
        <SimpleMdeReact value={markdown} onChange={onChange} />
      ) : (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          children={markdown}
        />
      )}
      <Button
        icon={edit ? <SaveOutlined /> : <EditOutlined />}
        onClick={() => {
          setEdit(!edit);
          onSave(markdown);
        }}
      >
        {edit ? 'Save' : 'Edit'}
      </Button>
    </>
  );
};
