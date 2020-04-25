import MainReducer from '../reducers/main';
import { combineReducers } from 'redux';

const ReduxReducer = combineReducers({
    main: MainReducer,
})

export default ReduxReducer;