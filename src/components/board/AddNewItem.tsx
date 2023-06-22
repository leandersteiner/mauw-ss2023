import { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { NewItemForm } from './NewItemForm';

type AddNewItemProps = {
  onAdd: (text: string) => void;
  toggleButtonText: string;
};

export const AddNewItem = (props: AddNewItemProps) => {
  const [showForm, setShowForm] = useState(false);
  const { onAdd, toggleButtonText } = props;

  if (showForm) {
    return (
      <NewItemForm
        onAdd={text => {
          if (text !== '') {
            onAdd(text);
            setShowForm(false);
          }
          setShowForm(false);
        }}
      />
    );
  }

  return (
    <Button onClick={() => setShowForm(true)} icon={<PlusOutlined />}>
      {toggleButtonText}
    </Button>
  );
};
