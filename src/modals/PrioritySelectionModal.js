import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Colors, Priority} from '../constants';

const Options = [
  {
    priority: Priority.high,
  },
  {
    priority: Priority.normal,
  },
  {
    priority: Priority.low,
  },
];

export const PrioritySelectionModal = props => {
  const {isVisible, selectedPriority, onSelected, onCancel} = props;

  const seletectPriority = priority => {
    onSelected(priority);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      backdropOpacity={0.7}>
      <View style={styles.modalWrapper}>
        {Options.map(({priority}) => (
          <Option
            key={priority.order}
            onPress={() => seletectPriority(priority)}
            priority={priority}
            selectedPriority={selectedPriority}
          />
        ))}
      </View>
    </Modal>
  );
};

const Option = props => {
  const {priority, onPress, selectedPriority} = props;
  return (
    <React.Fragment>
      <TouchableOpacity
        style={
          priority?.order === selectedPriority?.order
            ? styles.optionWrapperSelected
            : styles.optionWrapper
        }
        onPress={onPress}>
        <Text
          style={{
            ...styles.title,
            color:
              priority.value === Priority.high.value
                ? Colors.green
                : priority.value === Priority.normal.value
                ? Colors.orange
                : Colors.black,
          }}>
          {priority?.displayedName}
        </Text>
      </TouchableOpacity>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#eaeaea',
  },
  modalWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  optionWrapper: {
    flexDirection: 'row',
    padding: 16,
  },
  optionWrapperSelected: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.grey3,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
});
