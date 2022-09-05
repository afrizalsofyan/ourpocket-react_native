import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
import React from 'react';
import Dashboard from './Dashboard';
import Notification from './Notification';
import CreatePin from '../CreatePin';
import CreatePinSuccess from '../CreatePinSuccess';
import NotificationDetail from './NotificationDetail';
import TransactionItemDetail from './TransactionItemDetail';

const Stack = createNativeStackNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification Detail"
        component={NotificationDetail}
        options={{
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Transaction Item Detail"
        component={TransactionItemDetail}
        options={{
          headerTransparent: true,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default DashboardStack;
