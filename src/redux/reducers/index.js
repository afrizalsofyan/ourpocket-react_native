import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {combineReducers} from '@reduxjs/toolkit';
import auth from './auth';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(authPersistConfig, auth);

const reducer = combineReducers({
  auth: persistedReducer,
});

export default reducer;
