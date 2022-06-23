import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Colors, LocalResources, Priority} from '../../constants';
import {PrioritySelectionModal} from '../../modals';
import {DataParserUtils} from '../../utils';

export const TodoEditableItem = props => {
  const {item, setIsEditing, onSaveButtonPress, onRemoveButtonPress} = props;

  const {id, title, dueTime, priority} = item;
  const [newTitle, setNewTitle] = useState(title);
  const [newPriority, setNewPriority] = useState(priority);
  const [isTitleInputFocusing, setIsTitleInputFocusing] = useState(false);

  const [dueDate, setDueDate] = useState(new Date(dueTime));
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const [isPriorityModalVisible, setIsPriorityModalVisible] = useState(false);

  const save = () => {
    setIsEditing(false);
    item.title = newTitle;
    item.dueTime = dueDate.getTime();
    item.priority = newPriority;
    onSaveButtonPress(item);
  };

  const remove = () => {
    setIsEditing(false);
    onRemoveButtonPress(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowRemvoveWrapper}>
        <TouchableOpacity style={styles.removeButtonWrapper} onPress={remove}>
          <Image
            style={styles.removeIcon}
            source={LocalResources.Icons.ic_remove}
          />
          <Text style={styles.removeText}>Xoá</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowWrapper}>
        <TextInput
          value={newTitle}
          style={styles.titleInput}
          onChangeText={text => setNewTitle(text)}
          onFocus={() => setIsTitleInputFocusing(true)}
          onBlur={() => setIsTitleInputFocusing(false)}
        />
      </View>
      <View
        style={
          isTitleInputFocusing ? styles.highlightedSeparator : styles.separator
        }
      />

      <TouchableOpacity
        style={styles.rowWrapper}
        onPress={() => setDatePickerOpen(true)}>
        <Text style={styles.rowTitle}>Thời hạn</Text>
        <Text style={styles.rowValue}>
          {DataParserUtils.getDisplayedDate(dueDate)}
        </Text>
      </TouchableOpacity>
      <View style={styles.separator} />

      <TouchableOpacity
        style={styles.rowWrapper}
        onPress={() => setIsPriorityModalVisible(true)}>
        <Text style={styles.rowTitle}>Mức độ ưu tiên</Text>
        <Text
          style={{
            ...styles.rowValue,
            color:
              newPriority.value === Priority.high.value
                ? Colors.green
                : newPriority.value === Priority.normal.value
                ? Colors.orange
                : Colors.black,
          }}>
          {newPriority.displayedName}
        </Text>
      </TouchableOpacity>
      <View style={styles.separator} />

      <TouchableOpacity style={styles.doneButtonWrapper} onPress={() => save()}>
        <Text style={styles.doneText}>Xong</Text>
      </TouchableOpacity>

      <DatePicker
        modal
        mode="date"
        locale="vi-vn"
        open={datePickerOpen}
        date={dueDate}
        onConfirm={date => {
          setDatePickerOpen(false);
          setDueDate(date);
        }}
        onCancel={() => {
          setDatePickerOpen(false);
        }}
      />

      <PrioritySelectionModal
        isVisible={isPriorityModalVisible}
        selectedPriority={newPriority}
        onSelected={data => {
          setNewPriority(data);
          setIsPriorityModalVisible(false);
        }}
        onCancel={() => {
          setIsPriorityModalVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryWhite,
    padding: 20,
    borderRadius: 15,
    marginVertical: 8,
  },
  rowRemvoveWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rowWrapper: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleInput: {
    flex: 1,
    padding: 0,
    margin: 0,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
  removeButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeIcon: {
    width: 14,
    height: 16,
    resizeMode: 'contain',
  },
  removeText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.black,
    marginLeft: 4,
  },
  highlightedSeparator: {
    height: 1,
    backgroundColor: Colors.primaryBlack,
    marginTop: 8,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.grey3,
    marginTop: 8,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.black,
  },
  doneButtonWrapper: {
    backgroundColor: Colors.green,
    alignSelf: 'center',
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 22,
  },
  doneText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.white,
  },
});
