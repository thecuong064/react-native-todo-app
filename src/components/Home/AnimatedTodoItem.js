import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Colors, LocalResources, Priority} from '../../constants';
import {PrioritySelectionModal} from '../../modals';
import {DataParserUtils} from '../../utils';
import {AppText, AppTextInput} from '../general';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const AnimatedTodoItem = props => {
  const {
    item,
    isEditing,
    setIsEditing,
    onSaveButtonPress,
    onRemoveButtonPress,
  } = props;

  const {id, title, dueTime, priority, remainingDays} = item;
  const [newTitle, setNewTitle] = useState(title);
  const [newPriority, setNewPriority] = useState(priority);
  const [isTitleInputFocusing, setIsTitleInputFocusing] = useState(false);

  const [dueDate, setDueDate] = useState(new Date(dueTime));
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const [isPriorityModalVisible, setIsPriorityModalVisible] = useState(false);

  const toggleAnimation = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
  };

  const edit = () => {
    toggleAnimation();
    setIsEditing(true);
  };

  const save = () => {
    toggleAnimation();
    setIsEditing(false);
    item.title = newTitle;
    item.dueTime = dueDate.getTime();
    item.priority = newPriority;
    onSaveButtonPress(item);
  };

  const remove = () => {
    onRemoveButtonPress(item);
  };

  return (
    <View style={styles.container}>
      {isEditing && (
        <View style={styles.rowRemvoveWrapper}>
          <TouchableOpacity style={styles.removeButtonWrapper} onPress={remove}>
            <Image
              style={styles.removeIcon}
              source={LocalResources.Icons.ic_remove}
            />
            <AppText style={styles.removeText}>Xoá</AppText>
          </TouchableOpacity>
        </View>
      )}
      <View style={{...styles.rowWrapper, marginTop: 0}}>
        {!isEditing && (
          <TouchableOpacity style={styles.actionButton} onPress={null} />
        )}
        <AppTextInput
          value={newTitle}
          style={styles.titleInput}
          onChangeText={text => setNewTitle(text)}
          onFocus={() => setIsTitleInputFocusing(true)}
          onBlur={() => setIsTitleInputFocusing(false)}
          editable={isEditing}
        />
        {!isEditing && (
          <TouchableOpacity style={styles.editButton} onPress={edit}>
            <Image
              style={styles.editIcon}
              source={LocalResources.Icons.ic_edit}
            />
          </TouchableOpacity>
        )}
      </View>

      {!isEditing && (
        <View style={styles.infoWrapper}>
          <AppText
            style={{
              ...styles.priorityText,
              color:
                priority.value === Priority.high.value
                  ? Colors.green
                  : priority.value === Priority.normal.value
                  ? Colors.orange
                  : Colors.black,
            }}>
            Ưu tiên {priority.displayedName.toLowerCase()}
          </AppText>
          {remainingDays >= 0 ? (
            <AppText style={styles.dueTimeText}>
              Còn {remainingDays} ngày
            </AppText>
          ) : (
            <AppText style={styles.dueTimeExpiredText}>
              Đã quá hạn {Math.abs(remainingDays)} ngày
            </AppText>
          )}
        </View>
      )}

      {isEditing && (
        <>
          <View
            style={
              isTitleInputFocusing
                ? styles.highlightedSeparator
                : styles.separator
            }
          />

          <TouchableOpacity
            style={styles.rowWrapper}
            onPress={() => setDatePickerOpen(true)}>
            <AppText style={styles.rowTitle}>Thời hạn</AppText>
            <AppText style={styles.rowValue}>
              {DataParserUtils.getDisplayedDate(dueDate)}
            </AppText>
          </TouchableOpacity>
          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.rowWrapper}
            onPress={() => setIsPriorityModalVisible(true)}>
            <AppText style={styles.rowTitle}>Mức độ ưu tiên</AppText>
            <AppText
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
            </AppText>
          </TouchableOpacity>
          <View style={styles.separator} />

          <TouchableOpacity style={styles.doneButtonWrapper} onPress={save}>
            <AppText style={styles.doneText}>Xong</AppText>
          </TouchableOpacity>
        </>
      )}

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
    overflow: 'hidden',
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
  actionButton: {
    width: 22,
    height: 22,
    backgroundColor: Colors.grey,
    borderRadius: 5,
    marginRight: 20,
  },
  editButton: {
    marginLeft: 10,
  },
  editIcon: {
    width: 37,
    height: 37,
    resizeMode: 'contain',
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
  dueTimeExpiredText: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.red,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    flex: 1,
  },
});
