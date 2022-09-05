import PushNotification from 'react-native-push-notification';
import {createFcmToken, saveToken} from '../redux/reducers/notification';
import {store} from '../redux/store';

PushNotification.configure({
  onRegister: function (token) {
    const fcmToken = token.token;
    store.dispatch(saveToken(fcmToken));
    store.dispatch(createFcmToken({token: token.token}));
    // console.log('TOKEN:', token);
  },
  onNotification: notification => {
    console.log('NOTIFICATION:', notification);
    notification.finish('test!');
  },
});

PushNotification.createChannel(
  {
    channelId: 'login',
    channelName: 'Login Notification',
  },
  created => console.log(`createChannel returned '${created}'`),
);
