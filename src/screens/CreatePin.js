import {View, StyleSheet, Alert} from 'react-native';
import React from 'react';
import ReactNativePinView from 'react-native-pin-view';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthLayout from '../components/layouts/AuthLayout';
import HeaderAuthContent from '../components/HeaderAuthContent';

const CreatePin = ({navigation}) => {
  const pinView = React.useRef(null);
  const [showRemoveButton, setShowRemoveButton] = React.useState(false);
  const [enteredPin, setEnteredPin] = React.useState('');
  const [showCompletedButton, setShowCompletedButton] = React.useState(false);
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
    <>
      <AuthLayout
        content={
          <>
            <HeaderAuthContent
              title={'Create Security PIN'}
              subtitle={
                'Create a PIN that’s contain 6 digits number for security purpose in Our Pocket.'
              }
            />
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
                    Alert.alert(
                      'Pin: ' + enteredPin,
                      'Success Crated Pin',
                      onPress = test => {
                        navigation.navigate('Login');
                        console.log('test', test);
                      },
                    );
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
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black',
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

export default CreatePin;
