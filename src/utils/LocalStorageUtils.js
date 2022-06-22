import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalStorageKeys} from '../constants';

export const LocalStorageUtils = {
  getItems: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(LocalStorageKeys.ITEM_LIST);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.log('Error when getItems: ' + e);
    } finally {
    }
  },
  setItems: async items => {
    try {
      const jsonValue = JSON.stringify(items);
      await AsyncStorage.setItem(LocalStorageKeys.ITEM_LIST, jsonValue);
    } catch (e) {
      console.log('Error when setItems: ' + e);
    } finally {
    }
  },
};
