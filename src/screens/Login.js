import {View, Text} from 'react-native';
import React from 'react';
import AuthLayout from '../components/layouts/AuthLayout';
import HeaderAuthContent from '../components/HeaderAuthContent';

const Login = () => {
  return (
    <AuthLayout
      content={
        <>
          <HeaderAuthContent
            title={'Login'}
            subtitle={
              'Login to your existing account to access all the features in Zwallet.'
            }
          />
          <View></View>
        </>
      }
    />
  );
};

export default Login;
