import {call, put, fork, takeLatest} from 'redux-saga/effects';
import {DataParserUtils, LocalStorageUtils} from '../../utils';
import {
  addItemFailed,
  addItemSuccess,
  editItemFailed,
  editItemSuccess,
  getItemListFailed,
  getItemListSuccess,
  removeItemFailed,
  removeItemSuccess,
} from '../actions/itemActions';
import {ItemActionTypes} from '../reducers/itemReducer';
import uuid from 'react-native-uuid';

export function* getItemListAsync(props) {
  const {onSuccess, onFailed} = props;
  try {
    let response = yield call(LocalStorageUtils.getItems);

    let items = DataParserUtils.parseDisplayedData(response);

    items.sort((a, b) => {
      if (a.priority?.order === b.priority?.order) {
        return a.dueTime - b.dueTime;
      }
      return a.priority.order - b.priority.order;
    });
    yield put(getItemListSuccess(items));
    onSuccess?.(items);
  } catch (error) {
    yield put(getItemListFailed(error));
    onFailed?.(error);
  }
}

export function* addItemAsync(props) {
  const {payload, onSuccess, onFailed} = props;
  try {
    let items = yield call(LocalStorageUtils.getItems);
    payload.id = uuid.v4();
    let newItems = [...items, payload];
    newItems.sort((a, b) => {
      return a.priority.order - b.priority.order;
    });
    yield call(LocalStorageUtils.setItems, newItems);
    yield put(addItemSuccess());
    onSuccess?.();
  } catch (error) {
    yield put(addItemFailed(error));
    onFailed?.(error);
  }
}

export function* editItemAsync(props) {
  const {payload, onSuccess, onFailed} = props;
  try {
    let items = yield call(LocalStorageUtils.getItems);
    let newItems = [...items];
    let targetIndex = items.findIndex(item => item.id === payload.id);
    newItems[targetIndex] = payload;

    yield call(LocalStorageUtils.setItems, newItems);
    yield put(editItemSuccess());
    onSuccess?.();
  } catch (error) {
    yield put(editItemFailed(error));
    onFailed?.(error);
  }
}

export function* removeItemAsync(props) {
  const {payload, onSuccess, onFailed} = props;
  try {
    let items = yield call(LocalStorageUtils.getItems);
    let newItems = [...items];
    let targetIndex = items.findIndex(item => item.id === payload.id);
    newItems.splice(targetIndex, 1);

    yield call(LocalStorageUtils.setItems, newItems);
    yield put(removeItemSuccess());
    onSuccess?.();
  } catch (error) {
    yield put(removeItemFailed(error));
    onFailed?.(error);
  }
}

function* getListCardWatch() {
  yield takeLatest(ItemActionTypes.GET_ITEM_LIST, getItemListAsync);
  yield takeLatest(ItemActionTypes.ADD_ITEM, addItemAsync);
  yield takeLatest(ItemActionTypes.EDIT_ITEM, editItemAsync);
  yield takeLatest(ItemActionTypes.REMOVE_ITEM, removeItemAsync);
}

export default function* rootChild() {
  yield fork(getListCardWatch);
}
