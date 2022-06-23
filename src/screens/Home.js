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
  RefreshControl,
} from 'react-native';

import {
  Colors,
  DEFAULT_ITEM,
  KeyboardEvents,
  LocalResources,
} from '../constants';
import {TodoItem} from '../components/Home';
import {useSelector} from 'react-redux';
import store from '../redux/configureStore';
import {
  getItemList,
  addItem,
  removeItem,
  editItem,
} from '../redux/actions/itemActions';

export const Home = ({navigation}) => {
  const items = useSelector(state => state.item.data);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

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

  const loadItems = (showRefreshing = false) => {
    setIsRefreshing(showRefreshing);
    store.dispatch(
      getItemList(
        data => {
          setIsRefreshing(false);
        },
        error => {
          setIsRefreshing(false);
          console.log(error);
        },
      ),
    );
  };

  const addTodoItem = () => {
    store.dispatch(
      addItem(
        DEFAULT_ITEM,
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

  const renderItem = ({item}) => (
    <TodoItem
      item={item}
      saveAction={editTodoItem}
      removeAction={removeTodoItem}
    />
  );

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
              refreshControl={
                <RefreshControl
                  onRefresh={() => loadItems(true)}
                  refreshing={isRefreshing}
                />
              }
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
