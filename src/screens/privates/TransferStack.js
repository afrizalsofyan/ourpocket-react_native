import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Transfer from './Transfer';
import {getHeaderTitle} from '@react-navigation/elements';
import {HeaderCustom2} from '../../components/Header';
import {widthResponsive} from '../../styles/constant';
import Icon from 'react-native-vector-icons/Ionicons';
import TransferInputAmount from './TransferInputAmount';
import {UserCardContent2} from '../../components/Card';
import TransferConfirmation from './TransferConfirmation';
import PinConfirmation from './PinConfirmation';
import TransferSuccess from './TransferSuccess';
import TransferFailed from './TransferFailed';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const TransferStack = () => {
  const otherUser = useSelector(state => state.users.result);
  return (
    <Stack.Navigator initialRouteName={'Transfer'}>
      <Stack.Screen
        name="Transfer"
        component={Transfer}
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
            // const data = route.params.data.item;
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
          disableBackButtonOverride: true,
          header: ({navigation, options, route, back}) => {
            const title = getHeaderTitle(options, route.name).split(' ')[1];
            const data = route.params.sendData;
            console.log(back);
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

export default TransferStack;
