import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
};

export default App;
