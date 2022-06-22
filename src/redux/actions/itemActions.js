import {ItemActionTypes} from '../reducers/itemReducer';

export const getItemList = (onSuccess, onFailed) => ({
  type: ItemActionTypes.GET_ITEM_LIST,
  onSuccess: onSuccess,
  onFailed: onFailed,
});

export const getItemListSuccess = payload => ({
  type: ItemActionTypes.GET_ITEM_LIST_SUCCESS,
  payload: payload,
});

export const getItemListFailed = payload => ({
  type: ItemActionTypes.GET_ITEM_LIST_FAILED,
  payload: payload,
});

export const addItem = (payload, onSuccess, onFailed) => ({
  type: ItemActionTypes.ADD_ITEM,
  payload: payload,
  onSuccess: onSuccess,
  onFailed: onFailed,
});

export const addItemSuccess = payload => ({
  type: ItemActionTypes.ADD_ITEM_SUCCESS,
  payload: payload,
});

export const addItemFailed = payload => ({
  type: ItemActionTypes.ADD_ITEM_FAILED,
  payload: payload,
});

export const editItem = (payload, onSuccess, onFailed) => ({
  type: ItemActionTypes.EDIT_ITEM,
  payload: payload,
  onSuccess: onSuccess,
  onFailed: onFailed,
});

export const editItemSuccess = payload => ({
  type: ItemActionTypes.EDIT_ITEM_SUCCESS,
  payload: payload,
});

export const editItemFailed = payload => ({
  type: ItemActionTypes.EDIT_ITEM_FAILED,
  payload: payload,
});

export const removeItem = (payload, onSuccess, onFailed) => ({
  type: ItemActionTypes.REMOVE_ITEM,
  payload: payload,
  onSuccess: onSuccess,
  onFailed: onFailed,
});

export const removeItemSuccess = payload => ({
  type: ItemActionTypes.REMOVE_ITEM_SUCCESS,
  payload: payload,
});

export const removeItemFailed = payload => ({
  type: ItemActionTypes.REMOVE_ITEM_FAILED,
  payload: payload,
});
