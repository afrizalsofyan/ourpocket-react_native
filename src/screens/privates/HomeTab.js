import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from './Dashboard';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLOR_4, widthResponsive} from '../../styles/constant';
import Transfer from './Transfer';
import History from './History';

const BottomNavigation = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <BottomNavigation.Navigator
      initialRouteName={'Dashboard'}
      screenOptions={{
        tabBarStyle: {height: widthResponsive(4)},
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLOR_4,
      }}>
      <BottomNavigation.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon name={'ios-home'} color={color} size={size} />
          ),
        }}
        name={'Dashboard'}
        component={Dashboard}
      />
      {/* <BottomNavigation.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="ios-file-tray-full" color={color} size={size} />
          ),
        }}
        name="History"
        component={History}
      /> */}
    </BottomNavigation.Navigator>
  );
};

const style = StyleSheet.create({
  tabLabel: {
    color: COLOR_4,
    fontSize: widthResponsive(0.7),
  },
  boxActive: {
    borderBottomWidth: 2,
    borderColor: COLOR_4,
    paddingTop: widthResponsive(0.1),
  },
  boxInActive: {
    borderBottomWidth: 2,
    borderColor: 'transparent',
    paddingTop: widthResponsive(0.1),
  },
});

export default HomeTab;
