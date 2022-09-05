import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {combineReducers} from '@reduxjs/toolkit';
import auth from './auth';
import transaction from './transaction';
import users from './user';
import profile from './profile';
import notification from './notification';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(authPersistConfig, auth);

const reducer = combineReducers({
  auth: persistedReducer,
  transaction,
  users,
  profile,
  notification,
});

export default reducer;
