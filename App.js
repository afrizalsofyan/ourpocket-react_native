import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import ForgotPassword from './src/screens/ForgotPassword';
import ResetPassword from './src/screens/ResetPassword';
import CreatePin from './src/screens/CreatePin';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Auth'}>
        <Stack.Screen name={'Create Pin'} component={CreatePin} />
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Sign Up'} component={Register} />
        <Stack.Screen name={'Forgot Password'} component={ForgotPassword} />
        <Stack.Screen name={'Reset Password'} component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
