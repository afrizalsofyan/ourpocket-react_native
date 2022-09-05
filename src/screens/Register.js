import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AuthLayout from '../components/layouts/AuthLayout';
import HeaderAuthContent from '../components/HeaderAuthContent';
import InputField from '../components/InputField';
import {COLOR_PRIMARY, widthResponsive} from '../styles/constant';
import Button from '../components/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../redux/asyncActions/auth';
import styles from '../styles/global';
import {ErrorCard} from '../components/Card';
import {store} from '../redux/store';

const loginSchema = Yup.object().shape({
  username: Yup.string().min(6, 'Username must be 6 characters').required(),
  email: Yup.string().email('Email format invalid').required(),
  password: Yup.string().min(8, 'Password must be 8 characters.').required(),
});

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const errorMsg = useSelector(() => store.getState().auth.errorMsg);
  const onRegister = async val => {
    val.username = val.username.toLowerCase();
    val.email = val.email.toLowerCase();
    await dispatch(register(val));
    if (errorMsg != null || errorMsg !== undefined) {
      navigation.replace('Login');
    }
  };

  return (
    <AuthLayout
      content={
        <>
          <HeaderAuthContent
            title={'Sign Up'}
            subtitle={'Create your account to access Our Pocket.'}
          />
          {errorMsg ? <ErrorCard text={errorMsg} /> : null}
          <Formik
            initialValues={{username: '', email: '', password: ''}}
            validationSchema={loginSchema}
            onSubmit={onRegister}>
            {({handleChange, handleSubmit, values, errors, isValid}) => (
              <View>
                <View style={style.inputWrapper}>
                  <InputField
                    icon={'ios-person-outline'}
                    placeholder={'Enter your username'}
                    value={values.username}
                    onChange={text => handleChange('username')(text.trim())}
                  />
                </View>
                {errors.username && (
                  <Text style={styles.errorStyle}>{errors.username}</Text>
                )}
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
                  <Text style={styles.errorStyle}>{errors.email}</Text>
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
                  <Text style={styles.errorStyle}>{errors.password}</Text>
                )}
                <View style={style.marginButton}>
                  <Button
                    disable={!isValid}
                    buttonText="Sign Up"
                    onPress={handleSubmit}
                  />
                </View>
                <View style={style.textWithLink}>
                  <Text>Already have an account? Let’s</Text>
                  <View style={style.boxLinkText}>
                    <TouchableOpacity
                      onPress={() => navigation.replace('Login')}>
                      <Text style={style.colorBlue}>Login</Text>
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
  marginButton: {
    marginTop: widthResponsive(1.5),
  },
});
export default Register;
