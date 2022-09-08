import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {backendUrl} from '../config/env';
import NetInfo from "@react-native-community/netinfo";

export let tokenData = null;

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    tokenData = value;
    console.log(tokenData);
  } catch (error) {}
};
export const removeToken = async () => {
  try {
    return await AsyncStorage.removeItem('token');
  } catch (error) {
    console.log(error);
  }
};
export const setToken = async token => {
  try {
    const data = await AsyncStorage.setItem('token', token);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const isNetworkConnection = () => {
  return new Promise((resolve, rejection) => {
    NetInfo.fetch().then(state => {
      console.log('Connection type: ', state.type);
      console.log('Is Connected?', state.isConnected);
      if (state.isConnected) {
        resolve();
      } else {
        rejection();
      }
    });
  });
};

export const http = token => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return axios.create({
    headers,
    // baseURL: 'https://opo-backend-v1.herokuapp.com/',
    // baseURL: 'http://192.168.100.11:3335',
    // baseURL: backendUrl,
    baseURL: 'https://fw9-backend.vercel.app/',
  });
};
