import {View, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import AuthLayout from '../components/layouts/AuthLayout';
import HeaderAuthContent from '../components/HeaderAuthContent';
import InputField from '../components/InputField';
import Button from '../components/Button';

const ForgotPassword = ({navigation}) => {
  return (
    <AuthLayout
      content={
        <>
          <View style={style.wrapper}>
            <HeaderAuthContent
              title={'Reset Password'}
              subtitle={
                'Enter your Zwallet e-mail so we can send you a password reset link.'
              }
            />
            <View style={style.inputWrapper}>
              <InputField
                icon={'ios-mail-outline'}
                placeholder={'Enter your email'}
                type={'email-address'}
              />
            </View>
            <View style={style.wrapperButton}>
              <Button
                buttonText={'Confirm'}
                disable={false}
                onPress={() => navigation.navigate('Reset Password')}
              />
            </View>
          </View>
        </>
      }
    />
  );
};

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    height:
      Dimensions.get('screen').height - Dimensions.get('screen').width / 2,
  },
  inputWrapper: {
    flex: 2,
  },
  wrapperButton: {
    flex: 1,
  },
});
export default ForgotPassword;
