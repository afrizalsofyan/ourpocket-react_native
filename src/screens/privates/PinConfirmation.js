import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import React from 'react';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import Icon from 'react-native-vector-icons/Ionicons';
import ReactNativePinView from 'react-native-pin-view';
import HeaderAuthContent from '../../components/HeaderAuthContent';
import {COLOR_GRAY} from '../../styles/constant';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSomeTransaction,
  transferTransaction,
} from '../../redux/asyncActions/transaction';
import { getProfile } from '../../redux/asyncActions/user';

const PinConfirmation = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {data} = route.params;
  const pin = useSelector(state => state.users.profile.pin_number);
  const token = useSelector(state => state.auth.token);
  const pinView = React.useRef();
  const [showRemoveButton, setShowRemoveButton] = React.useState(false);
  const [enteredPin, setEnteredPin] = React.useState('');
  const [showCompletedButton, setShowCompletedButton] = React.useState(false);
  console.log(navigation)
  React.useEffect(() => {
    if (enteredPin.length > 0) {
      setShowRemoveButton(true);
    } else {
      setShowRemoveButton(false);
    }
    if (enteredPin.length === 6) {
      setShowCompletedButton(true);
    } else {
      setShowCompletedButton(false);
    }
  }, [enteredPin]);
  return (
    <DashboardLayout
      child={
        <>
          <ScrollView>
            <View style={style.wrapper}>
              <HeaderAuthContent
                title={'Enter PIN to Transfer'}
                subtitle={
                  'Enter your 6 digits PIN for confirmation to continue transferring money.'
                }
              />
            </View>
            <View style={style.wrapper}>
              <ReactNativePinView
                inputSize={32}
                ref={pinView}
                pinLength={6}
                buttonSize={60}
                onValueChange={value => setEnteredPin(value)}
                inputAreaStyle={style.inputArea}
                inputViewEmptyStyle={style.inputEmpty}
                inputViewFilledStyle={style.inputFill}
                buttonViewStyle={style.buttonStyle}
                buttonTextStyle={style.buttonText}
                onButtonPress={key => {
                  if (key === 'custom_left') {
                    pinView.current.clear();
                  }
                  if (key === 'custom_right') {
                    if (Number(enteredPin) !== pin) {
                      Alert.alert('Failed!!!', 'Your pin is wrong.', [
                        {
                          onPress: () =>
                            navigation.navigate('Transfer Failed', {data}),
                        },
                      ]);
                    } else {
                      Alert.alert('Success', 'Pin is matched', [
                        {
                          onPress: () => {
                            const senData = {
                              recipient_id: data.id,
                              notes: data.notes,
                              amount: data.amount,
                              type_id: 14,
                              pin: enteredPin,
                              token: token,
                            };
                            dispatch(transferTransaction(senData));
                            navigation.popToTop();
                            navigation.navigate('Transfer Sucess', {data});
                          },
                        },
                      ]);
                    }
                  }
                }}
                customLeftButton={
                  showRemoveButton ? (
                    <Icon
                      name={'ios-backspace-outline'}
                      size={42}
                      color={'black'}
                    />
                  ) : undefined
                }
                customRightButton={
                  showCompletedButton ? (
                    <Icon
                      name={'ios-checkmark-circle-outline'}
                      size={42}
                      color={'black'}
                    />
                  ) : undefined
                }
              />
            </View>
          </ScrollView>
        </>
      }
    />
  );
};

const style = StyleSheet.create({
  wrapper: {
    marginBottom: 25,
  },
  inputEmpty: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLOR_GRAY,
  },
  inputFill: {
    backgroundColor: 'black',
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonText: {
    color: 'black',
  },
  inputArea: {
    marginBottom: 24,
  },
});
export default PinConfirmation;
