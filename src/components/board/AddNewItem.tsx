import { useState } from 'react';
import { AddItemButton } from './AddItemButton';
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
          onAdd(text);
          setShowForm(false);
        }}
      />
    );
  }

  return <AddItemButton onClick={() => setShowForm(true)}>{toggleButtonText}</AddItemButton>;
};
