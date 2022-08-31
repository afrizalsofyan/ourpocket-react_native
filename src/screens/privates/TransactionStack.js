import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useState } from 'react';
import Transfer from './Transfer';
import Transaction from './Transaction';

import {getHeaderTitle} from '@react-navigation/elements';
import HeaderCustom, {HeaderCustom2} from '../../components/Header';
import {COLOR_4, COLOR_PRIMARY, widthResponsive} from '../../styles/constant';
import Icon from 'react-native-vector-icons/Ionicons';
import TransferInputAmount from './TransferInputAmount';
import {
  UserCardContent,
  UserCardContent2,
  UserCardContent3,
} from '../../components/Card';
import TransferConfirmation from './TransferConfirmation';
import PinConfirmation from './PinConfirmation';
import TransferSuccess from './TransferSuccess';
import TransferFailed from './TransferFailed';
import TopUp from './TopUp';
import {useSelector} from 'react-redux';
import ModalTopup from '../../components/Modal';

const Stack = createNativeStackNavigator();

const TransactionStack = () => {
  const otherUser = useSelector(state => state.users.result);
  return (
    <Stack.Navigator initialRouteName={'Transaction Type'}>
      <Stack.Screen
        name="Transaction Type"
        component={Transaction}
        options={{
          headerTransparent: true,
          header: ({navigation, options, route, back}) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <HeaderCustom
                navigation={navigation}
                title={title}
                back={back}
                // child={
                //   <View style={style.inputWrapper}>
                //     <View style={style.iconBox}>
                //       <Icon name='ios-search' size={widthResponsive(1)} />
                //     </View>
                //     <TextInput placeholder='Search reciever here' onChangeText={(val)=>console.log(val)} />
                //   </View>
                // }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Transfer"
        component={Transfer}
        options={{
          headerTransparent: true,
          header: ({navigation, options, route, back}) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <HeaderCustom
                navigation={navigation}
                title={title}
                back={back}
                child={
                  <View style={style.inputWrapper}>
                    <View style={style.iconBox}>
                      <Icon name="ios-search" size={widthResponsive(1)} />
                    </View>
                    <TextInput
                      placeholder="Search reciever here"
                      onChangeText={val => console.log(val)}
                    />
                  </View>
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Topup"
        component={TopUp}
        options={{
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Input Amount"
        component={TransferInputAmount}
        options={{
          headerTransparent: true,
          header: ({navigation, options, route, back}) => {
            const title = getHeaderTitle(options, route.name);
            const data = route.params.data.item;
            return (
              <HeaderCustom2
                navigation={navigation}
                title={title}
                back={back}
                child={
                  <UserCardContent2
                    image={{uri: otherUser.photo_url}}
                    icon={
                      !otherUser.photo_url ? (
                        <Icon name="ios-person" size={widthResponsive(3)} />
                      ) : null
                    }
                    name={otherUser.username ?? 'user name'}
                    // amount={item.}
                    type={otherUser.phone_number ?? '-'}
                  />
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Transfer Confirmation"
        component={TransferConfirmation}
        options={{
          headerTransparent: true,
          header: ({navigation, options, route, back}) => {
            const title = getHeaderTitle(options, route.name).split(' ')[1];
            const data = route.params.sendData;
            console.log(data);
            return (
              <HeaderCustom2
                navigation={navigation}
                title={title}
                back={back}
                child={
                  <UserCardContent2
                    image={{uri: otherUser.photo_url}}
                    icon={
                      !otherUser.photo_url ? (
                        <Icon name="ios-person" size={widthResponsive(3)} />
                      ) : null
                    }
                    name={otherUser.username ?? 'user name'}
                    // amount={item.}
                    type={otherUser.phone_number ?? '-'}
                  />
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Pin Confirmation"
        component={PinConfirmation}
        options={{
          headerTransparent: true,
          header: ({navigation, options, route, back}) => {
            const title = 'Enter Your Pin';
            return (
              <HeaderCustom2
                navigation={navigation}
                title={title}
                back={back}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Transfer Sucess"
        component={TransferSuccess}
        options={{
          headerTransparent: true,
          header: ({navigation, options, route, back}) => {
            const title = 'Transaction Details';
            return (
              <HeaderCustom2
                navigation={navigation}
                title={title}
                centerHeader={true}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Transfer Failed"
        component={TransferFailed}
        options={{
          headerTransparent: true,
          header: ({navigation, options, route, back}) => {
            const title = 'Transaction Details';
            return (
              <HeaderCustom2
                navigation={navigation}
                title={title}
                centerHeader={true}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
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
  inputWrapper: {
    backgroundColor: 'white',
    marginHorizontal: widthResponsive(1),
    borderRadius: widthResponsive(0.5),
    flexDirection: 'row',
    height: widthResponsive(2.5),
    alignItems: 'center',
  },
  iconBox: {
    width: widthResponsive(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBoxHeader: {
    padding: widthResponsive(0.4),
    backgroundColor: 'gainsboro',
    borderRadius: widthResponsive(0.5),
  },
});

export default TransactionStack;
