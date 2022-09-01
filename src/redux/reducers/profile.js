import {createSlice} from '@reduxjs/toolkit';
import {addPhone, updatePhone} from '../asyncActions/profile';

const initialState = {
  result: {},
  successMsg: null,
  errorMsg: null,
};

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
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
      state.successMsg = action.payload.successMsg;
    });
  },
});

export {addPhone, updatePhone};
export default profile.reducer;
