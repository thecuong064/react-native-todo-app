import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {Colors, LocalResources, Priority} from '../../constants';

export const TodoEditableItem = props => {
  const {item, setIsEditing} = props;
  const {id, title, dueTime, priority, priorityText} = item;
  const [newTitle, setNewTitle] = useState(title);
  const [isTitleInputFocusing, setIsTitleInputFocusing] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.rowRemvoveWrapper}>
        <TouchableOpacity style={styles.removeButtonWrapper}>
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

      <View style={styles.rowWrapper}>
        <Text style={styles.rowTitle}>Thời hạn</Text>
        <Text style={styles.rowValue}>{dueTime}</Text>
      </View>
      <View style={styles.separator} />

      <View style={styles.rowWrapper}>
        <Text style={styles.rowTitle}>Mức độ ưu tiên</Text>
        <Text style={styles.rowValue}>{priorityText}</Text>
      </View>
      <View style={styles.separator} />

      <TouchableOpacity
        style={styles.doneButtonWrapper}
        onPress={() => setIsEditing(false)}>
        <Text style={styles.doneText}>Xong</Text>
      </TouchableOpacity>
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
    alignSelf: 'flex-end',
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
