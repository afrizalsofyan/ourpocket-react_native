import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {COLOR_4, widthResponsive} from '../../styles/constant';
import History from './History';
import HeaderCustom from '../../components/Header';
import {getHeaderTitle} from '@react-navigation/elements';
import ProfileStack from './ProfileStack';
import TopUp from './TopUp';
import TransferStack from './TransferStack';
import DashboardStack from './DashboardStack';

const BottomNavigation = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <BottomNavigation.Navigator
      initialRouteName={'Dashboard'}
      screenOptions={{
        tabBarStyle: {height: widthResponsive(4)},
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLOR_4,
        // tabBarLabelStyle: {marginBottom: 4, fontSize: widthResponsive(0.6)}
      }}>
      <BottomNavigation.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon name={'ios-home'} color={color} size={size} />
          ),
        }}
        name={'Dashboard Stack'}
        component={DashboardStack}
      />
      <BottomNavigation.Screen
        name="Topup"
        component={TopUp}
        options={{
          headerTransparent: true,
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon2 name="plus" color={color} size={size} />
          ),
        }}
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
        name="Transfer Stack"
        component={TransferStack}
        options={{
          headerTransparent: true,
          headerShown: false,
          title: 'Transfer',
          tabBarIcon: ({focused, color, size}) => (
            <Icon2 name="arrow-up" color={color} size={size} />
          ),
        }}
      />
      {/* <BottomNavigation.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="ios-cash" color={color} size={size} />
          ),
        }}
        name="Transaction"
        component={TransactionStack}
      /> */}
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
