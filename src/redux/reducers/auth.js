import {createSlice} from '@reduxjs/toolkit';
import {
  createPin,
  getLinkForgetPassword,
  login,
  logout,
  register,
  resetPassword,
} from '../asyncActions/auth';

const initialState = {
  token: null,
  successMsg: null,
  errorMsg: null,
  results: {},
  linkForgot: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogout: () => {
      // async () => await removeToken();
      return initialState;
    },
  },
  extraReducers: build => {
    build.addCase(login.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(login.fulfilled, (state, action) => {
      const result = action.payload.result;
      if (result) {
        state.results = action.payload;
        state.token = action.payload.result.token;
        state.successMsg = action.payload.message;
        state.errorMsg = action.payload.errorMsg;
      } else {
        state.errorMsg = action.payload.errorMsg;
      }
    });
    build.addCase(register.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(register.fulfilled, (state, action) => {
      state.results = {};
      state.successMsg = action.payload.successMsg;
      state.errorMsg = action.payload.errorMsg;
    });
    build.addCase(getLinkForgetPassword.pending, state => {
      state.results = {};
      state.errorMsg = null;
    });
    build.addCase(getLinkForgetPassword.fulfilled, (state, action) => {
      state.linkForgot = action.payload.data;
      state.errorMsg = action.payload.errorMsg;
      state.successMsg = action.payload.successMsg;
    });
    build.addCase(resetPassword.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(resetPassword.fulfilled, (state, action) => {
      state.linkForgot = null;
      state.results = {};
      state.successMsg = action.payload.successMsg;
      state.errorMsg = action.payload.errorMsg;
    });
    build.addCase(createPin.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(createPin.fulfilled, (state, action) => {
      state.results = action.payload.data;
      state.errorMsg = action.payload.errorMsg;
      state.successMsg = action.payload.successMsg;
    });
    build.addCase(logout.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(logout.fulfilled, (state, action) => {
      // state.token = null;
      // state.successMsg = action.payload.successMsg;
      // state.errorMsg = action.payload.errorMsg;
      return initialState;
    });
  },
});

export {
  login,
  register,
  getLinkForgetPassword,
  resetPassword,
  createPin,
  logout,
};
export const {onLogout} = auth.actions;
export default auth.reducer;
