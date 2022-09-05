import {createSlice} from '@reduxjs/toolkit';
import {getAllUser, getOtherUser, getProfile} from '../asyncActions/user';

const initialState = {
  results: [],
  successMsg: null,
  errorMsg: null,
  result: {},
  profile: {},
  infoData: {},
  resultNextUser: [],
};

const users = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onRefreshPage: (state, action) => {
      state.resultNextUser = [];
    },
    onGetNewProfile: (state, action) => {
      state.profile = {};
    },
  },
  extraReducers: build => {
    build.addCase(getAllUser.pending, state => {
      state.successMsg = null;
      state.errorMsg = null;
    });
    build.addCase(getAllUser.fulfilled, (state, action) => {
      state.errorMsg = action.payload.errorMsg;
      state.results = action.payload.result;
      state.infoData = action.payload.info;
      state.successMsg = action.payload.message;
      if(!state.errorMsg){
        state.resultNextUser.push(...action.payload.result);
      }
    });
    build.addCase(getProfile.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(getProfile.fulfilled, (state, action) => {
      state.errorMsg = action.payload.errorMsg;
      if(!state.errorMsg){
        state.profile = action.payload.result;
        state.successMsg = action.payload.message;
      }
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
export const {onRefreshPage, onGetNewProfile} = users.actions;
export default users.reducer;
