import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Colors, LocalResources, Priority} from '../../constants';
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryWhite,
    padding: 20,
    borderRadius: 15,
    marginVertical: 8,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 22,
    height: 22,
    backgroundColor: Colors.grey,
    borderRadius: 5,
    marginRight: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    flex: 1,
  },
  editButton: {
    marginLeft: 10,
  },
  editIcon: {
    width: 37,
    height: 37,
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingLeft: 42,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.green,
    flex: 1,
  },
  dueTimeText: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.black,
  },
});
