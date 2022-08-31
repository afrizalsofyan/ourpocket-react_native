import {createSlice} from '@reduxjs/toolkit';
import {
  getSomeTransaction,
  historyTransaction,
  transferTransaction,
} from '../asyncActions/transaction';

const initialState = {
  results: [],
  result: [],
  resultsTopup: {},
  errorMsg: null,
  successMsg: null,
  infoPage: {},
  resultsNextPage: [],
};

const transaction = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    onNextPage: (state, action) => {
      // state.results = ;
      // state.resultsNextPage = [...action.payload];
      state.results = [...state.results, ...action.payload];
      // state.results = state.results.push(action.payload)
      console.log(state.results)
    },
    onRefreshPage: state => {
      state.resultsNextPage = [];
    },
  },
  extraReducers: build => {
    build.addCase(getSomeTransaction.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(getSomeTransaction.fulfilled, (state, action) => {
      state.results = action.payload.result;
      state.infoPage = action.payload.info;
      state.successMsg = action.payload.message;
      state.errorMsg = action.payload.errorMsg;
    });
    build.addCase(transferTransaction.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(transferTransaction.fulfilled, (state, action) => {
      state.result = action.payload.result;
      state.successMsg = action.payload.message;
      state.errorMsg = action.payload.errorMsg;
    });
    build.addCase(historyTransaction.pending, state => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(historyTransaction.fulfilled, (state, action) => {
      state.results = action.payload.result;
      state.infoPage = action.payload.info;
      state.successMsg = action.payload.message;
      state.errorMsg = action.payload.errorMsg;
    });
  },
});

export {getSomeTransaction, transferTransaction, historyTransaction};
export const {onNextPage, onRefreshPage} = transaction.actions;
export default transaction.reducer;
