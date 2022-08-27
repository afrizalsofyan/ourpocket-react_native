import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from './Dashboard';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLOR_4, widthResponsive} from '../../styles/constant';
import History from './History';
import HeaderCustom from '../../components/Header';
import {getHeaderTitle} from '@react-navigation/elements';
import TransactionStack from './TransactionStack';
import Profile from './Profile';
import ProfileStack from './ProfileStack';

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
      <BottomNavigation.Screen
        options={{
          headerTransparent: true,
          header: ({navigation, options, route, back}) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <HeaderCustom navigation={navigation} title={title} back={back} />
            );
          },
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="ios-file-tray-full" color={color} size={size} />
          ),
        }}
        name="History"
        component={History}
      />
      <BottomNavigation.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="ios-cash" color={color} size={size} />
          ),
        }}
        name="Transaction"
        component={TransactionStack}
      />
      <BottomNavigation.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="ios-person-sharp" color={color} size={size} />
          ),
        }}
        name="Profile Stack"
        component={ProfileStack}
      />
    </BottomNavigation.Navigator>
  );
};

export default HomeTab;
