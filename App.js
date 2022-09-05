import React from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import NoConnectionInternet from './src/components/NoConnectionInternet';
import AuthStack from './src/screens/AuthStack';
import RNBootSplash from 'react-native-bootsplash';

const App = () => {
  const netInfo = useNetInfo();
  const [online, setOnline] = React.useState(true);
  React.useEffect(() => {
    const init = async () => {
      NetInfo.fetch().then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if (state.isConnected) {
          setOnline(true);
        } else {
          setOnline(false);
        }
      });
    };
    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      console.log('Splash screen hidden');
    });
  }, []);

  return online ? (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthStack />
      </PersistGate>
    </Provider>
  ) : (
    <NoConnectionInternet />
  );
};

export default App;
