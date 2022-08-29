import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AuthLayout from '../components/layouts/AuthLayout';
import HeaderAuthContent from '../components/HeaderAuthContent';
import InputField from '../components/InputField';
import {COLOR_PRIMARY, widthResponsive} from '../styles/constant';
import Button from '../components/Button';
import {StackActions} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/asyncActions/auth';
import {ErrorCard, SuccessCard} from '../components/Card';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Email format invalid').required(),
  password: Yup.string().min(8, 'Password must be 8 characters.').required(),
});

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const errorMsg = useSelector(state => state.auth.errorMsg);
  const successMsg = useSelector(state => state.auth.successMsg);
  const [showMsg, setShowMsg] = React.useState(false);
  React.useEffect(() => {
    if (token) {
      navigation.replace('HomeTab');
    }
    setShowMsg(true);
    setTimeout(() => {
      setShowMsg(false);
    }, 1500);
  }, [token, navigation]);
  const onLogin = val => {
    dispatch(login(val));
  };
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
          {showMsg ? (
            errorMsg ? (
              <ErrorCard text={errorMsg} />
            ) : successMsg ? (
              <SuccessCard text={successMsg} />
            ) : null
          ) : null}
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={loginSchema}
            onSubmit={onLogin}>
            {({handleChange, handleSubmit, values, errors, isValid}) => (
              <View>
                <View style={style.inputWrapper}>
                  <InputField
                    icon={'ios-mail-outline'}
                    placeholder={'Enter your e-mail'}
                    type={'email-address'}
                    value={values.email}
                    onChange={handleChange('email')}
                  />
                </View>
                {errors.email && (
                  <Text style={style.errorStyle}>{errors.email}</Text>
                )}
                <View style={style.inputWrapper}>
                  <InputField
                    icon={'ios-lock-closed-outline'}
                    placeholder={'Enter your password'}
                    secure={true}
                    value={values.password}
                    onChange={handleChange('password')}
                  />
                </View>
                {errors.password && (
                  <Text style={style.errorStyle}>{errors.password}</Text>
                )}
                <View style={style.textTouchBox}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Forgot Password')}>
                    <Text style={style.textTouch}>Forgot password ?</Text>
                  </TouchableOpacity>
                </View>
                <Button
                  disable={!isValid}
                  buttonText="Login"
                  onPress={handleSubmit}
                />
                <View style={style.textWithLink}>
                  <Text>Don’t have an account? Let’s</Text>
                  <View style={style.boxLinkText}>
                    <TouchableOpacity
                      onPress={() => navigation.replace('Sign Up')}>
                      <Text style={style.colorBlue}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </Formik>
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
  errorStyle: {
    fontSize: 10,
    color: 'red',
  },
});
export default Login;
