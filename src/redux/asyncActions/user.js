import {createAsyncThunk} from '@reduxjs/toolkit';
import {http} from '../../helpers/http';

export const getAllUser = createAsyncThunk('user/all', async request => {
  const result = {};
  try {
    const {data} = await http(request.token).get(
      '/user/allUser?search=&sortBy=first_name&page=1&limit=1000',
      // '/user/allUser?search=&sortBy=first_name&page=1&sortType&limit=1000',
    );
    return data;
  } catch (error) {
    result.errorMsg = error.response.data.message;
    return result;
  }
});

export const getProfile = createAsyncThunk('user/profile', async request => {
  const result = {};
  try {
    const {data} = await http(request.token).get('/user/currentUser');
    return data;
  } catch (error) {
    result.errorMsg = error.response.data.message;
    return result;
  }
});

export const getOtherUser = createAsyncThunk('user/other', async request => {
  const result = {};
  try {
    const {data} = await http(request.token).get('/user/getUser/' + request.id);
    return data;
  } catch (error) {
    result.errorMsg = error.response.data.message;
    return result;
  }
});
