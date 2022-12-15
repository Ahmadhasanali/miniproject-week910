import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import todo from './todo';

export default combineReducers({
    auth,
    message,
    todo,
});
