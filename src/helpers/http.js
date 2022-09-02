import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {backendUrl} from '../config/env';

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

export const http = token => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return axios.create({
    headers,
    baseURL: 'http://192.168.100.11:3335',
    // baseURL: backendUrl,
  });
};
