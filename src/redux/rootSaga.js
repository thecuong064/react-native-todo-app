import {all, fork} from 'redux-saga/effects';
import itemSagas from './sagas/itemSagas';

export default function* rootSaga() {
  yield all([fork(itemSagas)]);
}
