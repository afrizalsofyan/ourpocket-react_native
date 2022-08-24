import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AuthLayout from '../components/layouts/AuthLayout';
import HeaderAuthContent from '../components/HeaderAuthContent';
import InputField from '../components/InputField';
import {COLOR_PRIMARY, widthResponsive} from '../styles/constant';
import Button from '../components/Button';

const Login = () => {
  return (
    <AuthLayout
      content={
        <>
          <HeaderAuthContent
            title={'Login'}
            subtitle={
              'Login to your existing account to access all the features in Our Pocket.'
            }
          />
          <View style={style.inputWrapper}>
            <InputField icon={'envelope'} placeholder={'Enter your e-mail'} />
          </View>
          <View style={style.inputWrapper}>
            <InputField
              icon={'lock'}
              placeholder={'Enter your password'}
              secure={true}
            />
          </View>
          <View style={style.textTouchBox}>
            <TouchableOpacity>
              <Text style={style.textTouch}>Forgot password</Text>
            </TouchableOpacity>
          </View>
          <Button disable={false} buttonText="Login" />
          <View style={style.textWithLink}>
            <Text>Don’t have an account? Let’s</Text>
            <View style={style.boxLinkText}>
              <TouchableOpacity>
                <Text style={style.colorBlue}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      }
    />
  );
};

const style = StyleSheet.create({
  inputWrapper: {
    marginBottom: widthResponsive(1),
  },
  textTouchBox: {
    marginTop: widthResponsive(0.5),
    marginBottom: widthResponsive(3),
  },
  textTouch: {
    textAlign: 'right',
  },
  textWithLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: widthResponsive(2),
  },
  boxLinkText: {
    marginLeft: widthResponsive(0.2),
  },
  colorBlue: {
    color: COLOR_PRIMARY,
    fontWeight: 'bold',
  },
});
export default Login;
