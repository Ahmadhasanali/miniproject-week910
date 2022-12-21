import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import todo from './todo';
import filter from './filter';

export default combineReducers({
    auth,
    message,
    todo,
    filter,
});
