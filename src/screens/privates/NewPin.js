import {View, Text, ScrollView, Alert, StyleSheet} from 'react-native';
import React from 'react';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import HeaderAuthContent from '../../components/HeaderAuthContent';
import ReactNativePinView from 'react-native-pin-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLOR_GRAY} from '../../styles/constant';
import {useDispatch, useSelector} from 'react-redux';
import {updatePin} from '../../redux/asyncActions/profile';
import {getUpdate} from '../../redux/reducers/profile';
import {ErrorCard} from '../../components/Card';

const NewPin = ({route, navigation}) => {
  const dispatch = useDispatch();
  const pinView = React.useRef();
  const [showRemoveButton, setShowRemoveButton] = React.useState(false);
  const [enteredPin, setEnteredPin] = React.useState('');
  const [showCompletedButton, setShowCompletedButton] = React.useState(false);
  const pinUser = parseInt(route.params.enteredPin, 10);
  const errMsg = useSelector(state => state.profile.errorMsg);
  const token = useSelector(state => state.auth.token);
  const [err, setErr] = React.useState();
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
    if (errMsg) {
      setTimeout(() => {
        setErr();
      }, 2000);
    }
  }, [enteredPin, errMsg]);
  return (
    <>
      <DashboardLayout
        child={
          <>
            <ScrollView>
              <View style={style.wrapper}>
                <HeaderAuthContent
                  subtitle={
                    'Type your new 6 digits security PIN to use in OurPocket.'
                  }
                />
              </View>
              {err ? (
                <View>
                  <ErrorCard text={err} />
                </View>
              ) : null}
              <View style={style.wrapper}>
                <ReactNativePinView
                  inputSize={40}
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
                      Alert.alert('Success', 'Your pin has been updated.', [
                        {
                          onPress: () => {
                            dispatch(
                              updatePin({
                                token: token,
                                newPin: enteredPin,
                                currentPin: pinUser,
                              }),
                            );
                            if (errMsg) {
                              setErr(errMsg);
                            } else {
                              setTimeout(() => {
                                dispatch(getUpdate());
                                navigation.popToTop();
                              }, 1000);
                            }
                          },
                        },
                      ]);
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
    </>
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

export default NewPin;
