import {createAsyncThunk} from '@reduxjs/toolkit';
import qs from 'qs';
import {backendUrl} from '../../config/env';
import {getToken, http} from '../../helpers/http';

export const login = createAsyncThunk('auth/login', async request => {
  const results = {};
  try {
    const send = qs.stringify(request);
    const {data} = await http().post('auth/login', send);
    return data;
  } catch (error) {
    results.errorMsg = error.response.data.message;
    return results;
  }
});

export const register = createAsyncThunk('auth/register', async request => {
  const results = {};
  try {
    const send = qs.stringify(request);
    const {data} = await http().post('auth/register', send);
    results.successMsg = data.message;
    return results;
  } catch (error) {
    results.errorMsg = error.response.data.message;
    return results;
  }
});

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async request => {
    const results = {};
    try {
      const dataReq = {
        email: request.email,
        newPassword: request.newPassword,
        confirmPassword: request.confirmPassword,
      };
      const send = qs.stringify(dataReq);
      const {data} = await http().post(`${request.linkForgot}`, send);
      results.successMsg = data.message;
      return results;
    } catch (error) {
      results.errorMsg = error.response.data.message;
      return results;
    }
  },
);

export const getLinkForgetPassword = createAsyncThunk(
  'auth/getLinkForgot',
  async request => {
    const results = {};
    try {
      const send = qs.stringify(request);
      const {data} = await http().patch('auth/forgetPasswordLink', send);
      results.data = `${backendUrl}/` + data.result.split(`${backendUrl}`)[1];
      results.successMsg = data.message;
      return results;
    } catch (error) {
      results.errorMsg = error.response.data.message;
      return results;
    }
  },
);

export const createPin = createAsyncThunk('user/createPin', async request => {
  const results = {};
  try {
    const send = qs.stringify(request);
    const {data} = await http().post('auth/createPin', send);
    results.data = data.result[0];
    results.successMsg = data.message;
    return results;
  } catch (error) {
    results.errorMsg = error.response.data.message;
    return results;
  }
});

export const logout = createAsyncThunk('auth/logout', async request => {
  const result = {};
  try {
    const send = qs.stringify({fcmToken: request.fcmToken});
    const {data} = await http(request.token).patch('auth/logout', send);
    result.successMsg = data.message;
    return result;
  } catch (error) {
    result.errorMsg = error.response.data.message;
    return result;
  }
});
