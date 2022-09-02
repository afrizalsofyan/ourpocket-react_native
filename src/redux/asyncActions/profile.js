import {createAsyncThunk} from '@reduxjs/toolkit';
import qs from 'qs';
import {http} from '../../helpers/http';

export const updatePhone = createAsyncThunk(
  'profile/updatePhone',
  async request => {
    const result = {};
    try {
      const send = qs.stringify({
        phoneNumber: request.phone,
        indexPhone: 0,
      });
      const {data} = await http(request.token).patch('profile/phone', send);
      return data;
    } catch (error) {
      result.errorMsg = error.response.data.message;
      return result;
    }
  },
);

export const addPhone = createAsyncThunk('profile/addPhone', async request => {
  const result = {};
  try {
    const send = qs.stringify({phoneNumber: request.phone});
    const {data} = await http(request.token).post('profile/phone', send);
    return data;
  } catch (error) {
    result.errorMsg = error.response.data.message;
    return result;
  }
});

export const updatePassword = createAsyncThunk(
  'profile/updatePassword',
  async request => {
    const result = {};
    try {
      const send = qs.stringify({
        currentPassword: request.currentPassword,
        newPassword: request.newPassword,
        repeatPassword: request.repeatPassword,
      });
      const {data} = await http(request.token).patch(
        'user/changePassword',
        send,
      );
      return data;
    } catch (error) {
      result.errorMsg = error.response.data.message;
      return result;
    }
  },
);

export const updatePin = createAsyncThunk(
  'profile/updatePin',
  async request => {
    const result = {};
    try {
      const send = qs.stringify({
        newPin: request.newPin,
        currentPin: request.currentPin,
      });
      const {data} = await http(request.token).patch('user/changePin', send);
      return data;
    } catch (error) {
      result.errorMsg = error.response.data.message;
      return result;
    }
  },
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async request => {
    const result = {};
    try {
      const send = new FormData();
      if (request.picture) {
        send.append('picture', {
          uri: request.picture.uri,
          name: request.picture.fileName,
          type: request.picture.type,
        });
        const {data} = await http(request.token).patch('profile', send, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return data;
      } else if (request.firstName && request.lastName) {
        send.append('firstName', request.firstName);
        send.append('lastName', request.lastName);
        const {data} = await http(request.token).patch('profile', send, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return data;
      }
    } catch (error) {
      result.errorMsg = error.response.data.message;
      return result;
    }
  },
);
