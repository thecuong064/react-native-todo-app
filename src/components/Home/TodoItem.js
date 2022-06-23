import React, {useState} from 'react';
import {TodoEditableItem} from './TodoEditableItem';
import {TodoDefaultItem} from './TodoDefaultItem';

export const TodoItem = props => {
  const {item, saveAction, removeAction} = props;
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <TodoEditableItem
          item={item}
          setIsEditing={setIsEditing}
          onSaveButtonPress={saveAction}
          onRemoveButtonPress={removeAction}
        />
      ) : (
        <TodoDefaultItem item={item} setIsEditing={setIsEditing} />
      )}
    </>
  );
};
