import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Colors, LocalResources, Priority} from '../../constants';
import {AppText} from '../../components/general';

export const TodoDefaultItem = props => {
  const {item, setIsEditing} = props;
  const {id, title, priority, remainingDays} = item;

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={styles.actionButton} onPress={null} />
        <AppText style={styles.title}>{title}</AppText>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(true)}>
          <Image
            style={styles.editIcon}
            source={LocalResources.Icons.ic_edit}
          />
        </TouchableOpacity>
      </View>

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
          <AppText style={styles.dueTimeText}>Còn {remainingDays} ngày</AppText>
        ) : (
          <AppText style={styles.dueTimeExpiredText}>
            Đã quá hạn {Math.abs(remainingDays)} ngày
          </AppText>
        )}
      </View>
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
});
