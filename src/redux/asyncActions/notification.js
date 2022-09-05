import {createAsyncThunk} from '@reduxjs/toolkit';
import qs from 'qs';
import {http} from '../../helpers/http';

export const createFcmToken = createAsyncThunk('fcm/craete', async request => {
  const result = {};
  try {
    const send = qs.stringify({token: request.token});
    const {data} = await http().post('notification/fcm', send);
    result.successMsg = data.message;
    return result;
  } catch (error) {
    result.errorMsg = error.response.data.message;
    return result;
  }
});

export const getAllNotificationApp = createAsyncThunk(
  'notification/all',
  async request => {
    const result = {};
    try {
      const {data} = await http(request.token).get('notification/reading');
      return data;
    } catch (error) {
      result.errorMsg = error.response.data.message;
      return result;
    }
  },
);

export const updateNotification = createAsyncThunk(
  'notification/update',
  async request => {
    const result = {};
    try {
      const {data} = await http(request.token).patch(
        'notification/' + request.id,
      );
      return data;
    } catch (error) {
      result.errorMsg = error.response.data.message;
      return result;
    }
  },
);

export const getAllNotification = createAsyncThunk(
  'notification/allRead',
  async request => {
    const result = {};
    try {
      const {data} = await http(request.token).get('notification');
      return data;
    } catch (error) {
      result.errorMsg = error.response.data.message;
      return result;
    }
  },
);
