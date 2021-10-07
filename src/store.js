/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist';
import reducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const pReducer = persistReducer(persistConfig, reducer);
// const middleware = applyMiddleware(thunk, logger);
const store = createStore(
  pReducer,
  compose(
    applyMiddleware(thunk),
    typeof window === 'object'
    && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
  ),
);
const persistor = persistStore(store);
export { persistor, store };

// const store = createStore(
//   reducer,
//   compose(
//     applyMiddleware(thunk),
//     typeof window === 'object'
//     && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
//       ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
//   ),
// );

// export default store;
