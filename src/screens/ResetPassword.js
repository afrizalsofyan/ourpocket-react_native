import {View, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import AuthLayout from '../components/layouts/AuthLayout';
import HeaderAuthContent from '../components/HeaderAuthContent';
import {widthResponsive} from '../styles/constant';

const ResetPassword = ({navigation}) => {
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
              <View>
                <InputField
                  icon={'ios-lock-closed-outline'}
                  placeholder={'Enter your password'}
                  secure={true}
                />
              </View>
              <View style={style.fieldWrapper}>
                <InputField
                  icon={'ios-lock-closed-outline'}
                  placeholder={'Enter your password'}
                  secure={true}
                />
              </View>
            </View>
            <View style={style.wrapperButton}>
              <Button
                buttonText={'Confirm'}
                disable={false}
                onPress={() => navigation.navigate('Login')}
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
    // flex: 1,
    // height:
    //   Dimensions.get('screen').height - Dimensions.get('screen').width / 2,
  },
  inputWrapper: {},
  wrapperButton: {},
  // fieldWrapper: {
  //   marginTop: widthResponsive(1),
  // },
});
export default ResetPassword;
