import {createAsyncThunk} from '@reduxjs/toolkit';
import {http} from '../../helpers/http';
import qs from 'qs';

export const historyTransaction = createAsyncThunk(
  'transfer/history',
  async request => {
    const result = {};
    try {
      const {data} = await http(request.token).get(
        `transactions/getAllTransaction?search=${
          request.keywords ?? ''
        }&searchBy=${request.searchBy ?? 'recipient'}&sortBy=${
          request.sortBy ?? 'time_transaction'
        }&sortType=${request.sortType ?? '1'}&page=${
          request.page ?? '1'
        }&limit=${request.limit ?? 5}`,
      );
      return data;
    } catch (error) {
      result.errorMsg = error.response.data.message;
      return result;
    }
  },
);

export const getSomeTransaction = createAsyncThunk(
  'transaction/some',
  async request => {
    const result = {};
    try {
      const {data} = await http(request.token).get(
        'transactions/getAllTransaction?sortBy=time_transaction&sortType=1&page=1',
      );
      return data;
    } catch (error) {
      result.errorMsg = error.response.data.message;
      return result;
    }
  },
);

export const topupBalance = createAsyncThunk(
  'transaction/topup',
  async request => {
    const result = {};
    try {
      const send = qs.stringify({
        amount: request.amount,
        type_id: request.type_id,
      });
      const {data} = await http(request.token).patch(
        'transactions/topup',
        send,
      );
      return data;
    } catch (error) {
      result.errorMsg = error.response.data.message;
      return result;
    }
  },
);

export const transferTransaction = createAsyncThunk(
  'transaction/transfer',
  async ([request, cb]) => {
    const result = {};
    try {
      const dataReq = {
        notes: request.notes,
        amount: request.amount,
        type_id: 14,
        recipient_id: request.recipient_id,
        sender_id: request.sender_id,
        pin: request.pin,
      };
      const send = qs.stringify(dataReq);
      const {data} = await http(request.token).post(
        'transactions/transfer',
        send,
      );
      cb(data);
      return data;
    } catch (error) {
      result.errorMsg = error.response.data.message;
      return result;
    }
  },
);
