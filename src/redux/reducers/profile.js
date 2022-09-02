import {createSlice} from '@reduxjs/toolkit';
import {
  addPhone,
  updatePassword,
  updatePhone,
  updatePin,
  updateProfile,
} from '../asyncActions/profile';

const initialState = {
  result: {},
  successMsg: null,
  errorMsg: null,
};

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getUpdate: (state, action) => {
      return initialState;
    },
  },
  extraReducers: build => {
    build.addCase(addPhone.pending, state => {
      state.successMsg = null;
      state.errorMsg = null;
    });
    build.addCase(addPhone.fulfilled, (state, action) => {
      state.result = action.payload;
      state.successMsg = action.payload.message;
      state.errorMsg = action.payload.errorMsg;
    });
    build.addCase(updatePhone.pending, state => {
      state.successMsg = null;
      state.errorMsg = null;
    });
    build.addCase(updatePhone.fulfilled, (state, action) => {
      state.result = action.payload;
      state.errorMsg = action.payload.errorMsg;
      state.successMsg = action.payload.message;
    });
    build.addCase(updatePassword.pending, state => {
      state.successMsg = null;
      state.errorMsg = null;
    });
    build.addCase(updatePassword.fulfilled, (state, action) => {
      state.result = action.payload;
      state.errorMsg = action.payload.errorMsg;
      state.successMsg = action.payload.message;
    });
    build.addCase(updatePin.pending, state => {
      state.successMsg = null;
      state.errorMsg = null;
    });
    build.addCase(updatePin.fulfilled, (state, action) => {
      state.result = action.payload;
      state.errorMsg = action.payload.errorMsg;
      state.successMsg = action.payload.message;
    });
    build.addCase(updateProfile.pending, state => {
      state.successMsg = null;
      state.errorMsg = null;
    });
    build.addCase(updateProfile.fulfilled, (state, action) => {
      state.result = action.payload;
      state.errorMsg = action.payload.errorMsg;
      state.successMsg = action.payload.message;
    });
  },
});

export {addPhone, updatePhone, updatePassword, updatePin};
export const {getUpdate} = profile.actions;
export default profile.reducer;
