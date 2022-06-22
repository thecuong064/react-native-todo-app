import {combineReducers} from 'redux';
import {itemReducer} from './reducers';

const rootReducer = combineReducers({
  item: itemReducer,
});

export default rootReducer;
