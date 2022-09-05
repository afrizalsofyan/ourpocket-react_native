import {createAsyncThunk} from '@reduxjs/toolkit';
import qs from 'qs';
import {http} from '../../helpers/http';
// "emKNXc8SSPqU8Ub8QITMY7:APA91bE3KIsDO5EXI018CTroprHum6Lfe6pOeuWpb-OZX0LSRYb9nz0U6SchKdlSRMNPov9paLmMfAcZY_lcLbarZNWwfPi37savUJCnr9aJYUAK7BrVhyH1cY2OgXbmJ024hxsBMSa3"
export const createFcmToken = createAsyncThunk('fcm/craete', async request => {
  const result = {};
  try {
    const send = qs.stringify({token: request.token});
    const {data} = await http().post('notification/fcm', send);
    result.successMsg = data.message;
    return result;
  } catch (error) {
    result.errorMsg = error.response.data.message;
    return result;
  }
});
