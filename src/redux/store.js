import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Most common redux states:
// 1. Auth object user
// 2. App settings (dark/light mode, language)

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(...middleware)),
// );

const store = configureStore({
    reducer:rootReducer
})
export default store;
