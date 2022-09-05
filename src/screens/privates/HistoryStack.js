import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderCustom from '../../components/Header';
import History from './History';
import HistoryItemDetail from './HistoryItemDetail';

const Stack = createNativeStackNavigator();

const HistoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTransparent: true,
        }}
        name="History"
        component={History}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
        }}
        name="History Detail"
        component={HistoryItemDetail}
      />
    </Stack.Navigator>
  );
};

export default HistoryStack;
