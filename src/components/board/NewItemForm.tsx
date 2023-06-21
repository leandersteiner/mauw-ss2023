import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import { useFocus } from '../../hooks/useFocus';

type NewItemFormProps = {
  onAdd: (text: string) => void;
};

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState('');
  const inputRef = useFocus();

  const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onAdd(text);
    }
  };

  return (
    <Space direction='vertical'>
      <Input
        value={text}
        ref={inputRef}
        onChange={e => setText(e.target.value)}
        onPressEnter={handleAddText}
      />
      <Space>
        <Button onClick={() => onAdd(text)}>Create</Button>
      </Space>
    </Space>
  );
};
