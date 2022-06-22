import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  FlatList,
} from 'react-native';
import {Colors, LocalResources} from '../constants';
import {TodoItem} from '../components/Home';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Task 1',
    priority: 'High',
    dueTime: '01/01/2023',
    priorityText: 'Cao',
    remainingDays: 2,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Task 2',
    priority: 'Low',
    dueTime: '01/01/2023',
    priorityText: 'Thấp',
    remainingDays: 2,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Task 3',
    priority: 'Normal',
    dueTime: '01/01/2023',
    priorityText: 'Trung bình',
    remainingDays: 2,
  },
];

export const Home = ({navigation}) => {
  const renderItem = ({item}) => <TodoItem item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-do list</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.addButtonWrapper}>
        <Text style={styles.addButtonTitle}>Tạo task mới</Text>
        <Image
          style={styles.addButtonIcon}
          source={LocalResources.Icons.ic_add}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
    paddingTop: 30,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
    alignSelf: 'center',
  },
  addButtonWrapper: {
    backgroundColor: Colors.primaryPink,
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  addButtonTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.white,
  },
  addButtonIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginLeft: 10,
  },
});
