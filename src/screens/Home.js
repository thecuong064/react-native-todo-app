import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Colors, LocalResources, Priority} from '../constants';
import {TodoItem} from '../components/Home';
import {useSelector} from 'react-redux';
import store from '../redux/configureStore';
import {
  getItemList,
  addItem,
  removeItem,
  editItem,
} from '../redux/actions/itemActions';

const DEFAULT_REMAINING_DAYS = 7;
const DEFAULT_DUE_TIME_IN_MILLI = 1000 * 60 * 60 * 24 * DEFAULT_REMAINING_DAYS;

export const Home = ({navigation}) => {
  const items = useSelector(state => state.item.data);
  const renderItem = ({item}) => (
    <TodoItem
      item={item}
      saveAction={editTodoItem}
      removeAction={removeTodoItem}
    />
  );

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    store.dispatch(
      getItemList(
        data => {},
        error => {
          console.log(error);
        },
      ),
    );
  };

  const addTodoItem = () => {
    store.dispatch(
      addItem(
        {
          id: '',
          title: 'Task name',
          priority: Priority.normal,
          dueTime: Date.now() + DEFAULT_DUE_TIME_IN_MILLI,
        },
        () => {
          loadItems();
        },
        error => {
          console.log(error);
        },
      ),
    );
  };

  const editTodoItem = item => {
    store.dispatch(
      editItem(
        item,
        () => {
          loadItems();
        },
        error => {
          console.log(error);
        },
      ),
    );
  };

  const removeTodoItem = item => {
    store.dispatch(
      removeItem(
        item,
        () => {
          loadItems();
        },
        error => {
          console.log(error);
        },
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-do list</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={styles.addButtonWrapper}
        onPress={() => addTodoItem()}>
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
