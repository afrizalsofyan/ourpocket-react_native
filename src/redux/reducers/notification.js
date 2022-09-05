import {createSlice} from '@reduxjs/toolkit';
import {createFcmToken} from '../asyncActions/notification';

const initialState = {
  result: [],
  tokenFCM: null,
  successMsg: null,
  errorMsg: null,
};

const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.tokenFCM = action.payload;
    },
  },
  extraReducers: build => {
    build.addCase(createFcmToken.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(createFcmToken.fulfilled, (state, action) => {
      state.errorMsg = action.payload.errorMsg;
      state.successMsg = action.payload.successMsg;
    });
  },
});

export {createFcmToken};
export const {saveToken} = notification.actions;
export default notification.reducer;
