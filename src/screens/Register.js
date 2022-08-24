import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AuthLayout from '../components/layouts/AuthLayout';
import HeaderAuthContent from '../components/HeaderAuthContent';
import InputField from '../components/InputField';
import {COLOR_PRIMARY, widthResponsive} from '../styles/constant';
import Button from '../components/Button';

const Register = () => {
  return (
    <AuthLayout
      content={
        <>
          <HeaderAuthContent
            title={'Sign Up'}
            subtitle={'Create your account to access Our Pocket.'}
          />
          <View style={style.inputWrapper}>
            <InputField
              icon={'ios-person-outline'}
              placeholder={'Enter your username'}
            />
          </View>
          <View style={style.inputWrapper}>
            <InputField
              icon={'ios-mail-outline'}
              placeholder={'Enter your e-mail'}
              type={'email-address'}
            />
          </View>
          <View style={style.inputWrapper}>
            <InputField
              icon={'ios-lock-closed-outline'}
              placeholder={'Enter your password'}
              secure={true}
            />
          </View>
          <View style={style.marginButton}>
            <Button disable={false} buttonText="Sign Up" />
          </View>
          <View style={style.textWithLink}>
            <Text>Already have an account? Let’s</Text>
            <View style={style.boxLinkText}>
              <TouchableOpacity>
                <Text style={style.colorBlue}>Login</Text>
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
  marginButton: {
    marginTop: widthResponsive(1.5),
  },
});
export default Register;
