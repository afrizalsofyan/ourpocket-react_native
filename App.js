import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import ForgotPassword from './src/screens/ForgotPassword';
import ResetPassword from './src/screens/ResetPassword';
import CreatePin from './src/screens/CreatePin';
import CreatePinSuccess from './src/screens/CreatePinSuccess';
import Dashboard from './src/screens/privates/Dashboard';
import HomeTab from './src/screens/privates/HomeTab';
import History from './src/screens/privates/History';
import { COLOR_SECONDARY } from './src/styles/constant';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen
          options={{headerShown: false}}
          name={'Login'}
          component={Login}
        />
        <Stack.Screen name={'Sign Up'} component={Register} />
        <Stack.Screen name={'Forgot Password'} component={ForgotPassword} />
        <Stack.Screen name={'Reset Password'} component={ResetPassword} />
        <Stack.Screen
          name={'Create Pin Success'}
          component={CreatePinSuccess}
        />
        <Stack.Screen name={'Create Pin'} component={CreatePin} />
        <Stack.Screen
          options={{
            headerShown: false,
            headerBackground: COLOR_SECONDARY,
          }}
          name={'HomeTab'}
          component={HomeTab}
        />
        <Stack.Screen name={'History'} component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
