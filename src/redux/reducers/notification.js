import {createSlice} from '@reduxjs/toolkit';
import {
  createFcmToken,
  getAllNotification,
  getAllNotificationApp,
  updateNotification,
} from '../asyncActions/notification';

const initialState = {
  resultsRead: [],
  results: [],
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
    build.addCase(getAllNotificationApp.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(getAllNotificationApp.fulfilled, (state, action) => {
      state.resultsRead = action.payload.result;
      state.errorMsg = action.payload.successMsg;
      state.successMsg = action.payload.message;
    });
    build.addCase(updateNotification.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(updateNotification.fulfilled, (state, action) => {
      state.successMsg = action.payload.message;
      state.errorMsg = action.payload.errorMsg;
    });
    build.addCase(getAllNotification.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(getAllNotification.fulfilled, (state, action) => {
      state.errorMsg = action.payload.errorMsg;
      state.successMsg = action.payload.message;
      state.results = action.payload.result;
    });
  },
});

export {
  createFcmToken,
  getAllNotificationApp,
  updateNotification,
  getAllNotification,
};
export const {saveToken} = notification.actions;
export default notification.reducer;
