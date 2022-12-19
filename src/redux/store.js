import { configureStore } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import authReducer from './reducers/auth';
import todo from './reducers/todo';

const middleware = [thunk];

// Most common redux states:
// 1. Auth object user
// 2. App settings (dark/light mode, language)

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(...middleware)),
// );

const store = configureStore({
    reducer:{
        todo: todo,
        auth: authReducer
    }
})
export default store;
