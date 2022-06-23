import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {Colors, KeyboardEvents, LocalResources, Priority} from '../constants';
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

  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const renderItem = ({item}) => (
    <TodoItem
      item={item}
      saveAction={editTodoItem}
      removeAction={removeTodoItem}
    />
  );

  const keyboardShownListener = () => {
    setIsKeyboardShown(true);
  };

  const keyboardHiddenListener = () => {
    setIsKeyboardShown(false);
  };

  useEffect(() => {
    const keyboardWillShowSub = Keyboard.addListener(
      KeyboardEvents.willShow,
      keyboardShownListener,
    );
    const keyboardDidShowSub = Keyboard.addListener(
      KeyboardEvents.didShow,
      keyboardShownListener,
    );
    const keyboardDidHideSub = Keyboard.addListener(
      KeyboardEvents.didHide,
      keyboardHiddenListener,
    );

    return () => {
      keyboardWillShowSub.remove();
      keyboardDidShowSub.remove();
      keyboardDidHideSub.remove();
    };
  }, []);

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
          title: 'New task',
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.pageContainer}>
      <TouchableWithoutFeedback
        style={styles.pageContainer}
        onPress={Keyboard.dismiss}
        accessible={false}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>To-do list</Text>
          <View
            style={styles.itemListWrapper}
            onStartShouldSetResponder={() => true}>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={false}
              contentContainerStyle={styles.itemList}
            />
            {!isKeyboardShown && (
              <TouchableOpacity
                style={{...styles.addButtonWrapper}}
                onPress={() => addTodoItem()}>
                <Text style={styles.addButtonTitle}>Tạo task mới</Text>
                <Image
                  style={styles.addButtonIcon}
                  source={LocalResources.Icons.ic_add}
                />
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
    paddingTop: 30,
    paddingBottom: 24,
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
    marginTop: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    marginHorizontal: 24,
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
  itemListWrapper: {
    flex: 1,
    marginTop: 10,
  },
  itemList: {
    paddingHorizontal: 24,
  },
});
