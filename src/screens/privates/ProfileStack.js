import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from './Profile';
import PersonalInformation from './PersonalInformation';
import HeaderCustom from '../../components/Header';
import {getHeaderTitle} from '@react-navigation/elements';
import ChangePassword from './ChangePassword';
import ChangePin from './ChangePin';
import NewPin from './NewPin';
import AddPhone from './AddPhone';
import Notification from './Notification';
const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Pofile Stack">
      <Stack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
          header: ({navigation, options, route, back}) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <HeaderCustom navigation={navigation} title={title} back={back} />
            );
          },
        }}
        name="Personal Information"
        component={PersonalInformation}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
          header: ({navigation, options, route, back}) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <HeaderCustom navigation={navigation} title={title} back={back} />
            );
          },
        }}
        name="Change Password"
        component={ChangePassword}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
          header: ({navigation, options, route, back}) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <HeaderCustom navigation={navigation} title={title} back={back} />
            );
          },
        }}
        name="Change Pin"
        component={ChangePin}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
          header: ({navigation, options, route, back}) => {
            const title = 'Change Pin';
            return (
              <HeaderCustom navigation={navigation} title={title} back={back} />
            );
          },
        }}
        name="New Pin"
        component={NewPin}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
          header: ({navigation, options, route, back}) => {
            const dataPhone = route.params.data.phoneNumber;
            const title = dataPhone
              ? 'Manage Phone Number'
              : 'Add Phone Number';
            return (
              <HeaderCustom navigation={navigation} title={title} back={back} />
            );
          },
        }}
        name="Add Phone"
        component={AddPhone}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
          header: ({navigation, options, route, back}) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <HeaderCustom navigation={navigation} title={title} back={back} />
            );
          },
        }}
        name="Notification"
        component={Notification}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
