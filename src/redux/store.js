import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import reducer from './reducers';

export const store = configureStore({
  reducer,
  middleware: [thunk, logger],
});

export const persistor = persistStore(store);
