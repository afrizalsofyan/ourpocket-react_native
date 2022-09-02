import {createSlice} from '@reduxjs/toolkit';
import {getAllUser, getOtherUser, getProfile} from '../asyncActions/user';

const initialState = {
  results: {},
  successMsg: null,
  errorMsg: null,
  result: {},
  profile: {},
  infoData: {},
};

const users = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: build => {
    build.addCase(getAllUser.pending, state => {
      state.successMsg = null;
      state.errorMsg = null;
    });
    build.addCase(getAllUser.fulfilled, (state, action) => {
      state.results = action.payload.result;
      state.infoData = action.payload.info;
      state.successMsg = action.payload.message;
      state.errorMsg = action.payload.errorMsg;
    });
    build.addCase(getProfile.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload.result;
      state.errorMsg = action.payload.errorMsg;
      state.successMsg = action.payload.message;
    });
    build.addCase(getOtherUser.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(getOtherUser.fulfilled, (state, action) => {
      state.result = action.payload.result;
      state.successMsg = action.payload.message;
      state.errorMsg = action.payload.errorMsg;
    });
  },
});

export {getAllUser, getProfile, getOtherUser};
export default users.reducer;
