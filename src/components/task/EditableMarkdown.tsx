import { useCallback, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SimpleMdeReact from 'react-simplemde-editor';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

type EditableMarkdownProps = {
  text: string;
};

export const EditableMarkdown = ({ text }: EditableMarkdownProps) => {
  const [edit, setEdit] = useState(false);
  const [markdown, setMarkdown] = useState(text);

  const onChange = useCallback((value: string) => {
    setMarkdown(value);
  }, []);

  return (
    <>
      <h1>Editor</h1>
      {edit ? (
        <SimpleMdeReact value={markdown} onChange={onChange} />
      ) : (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          children={markdown}
        />
      )}
      <Button icon={<EditOutlined />} onClick={() => setEdit(!edit)}>
        Edit
      </Button>
    </>
  );
};
