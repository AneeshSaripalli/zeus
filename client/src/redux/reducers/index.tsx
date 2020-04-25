import { combineReducers } from 'redux';
import MainReducer from '../reducers/main';
import { MainReducerName } from '../types/';

const ReduxReducer = combineReducers({
    [MainReducerName]: MainReducer,
})

export default ReduxReducer;