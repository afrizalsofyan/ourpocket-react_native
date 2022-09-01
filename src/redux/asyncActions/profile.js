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
