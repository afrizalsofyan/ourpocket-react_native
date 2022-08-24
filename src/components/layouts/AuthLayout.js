import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const AuthLayout = () => {
  return (
    <>
      <View style={styleLocal.parrent}>
        <View style={styleLocal.wrapper}>
          <Text>AuthLayout</Text>
        </View>
        <View style={styleLocal.wrapper}>
          <Text>AuthLayout</Text>
        </View>
      </View>
    </>
  );
};

const styleLocal = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  parrent: {
    flex: 1,
  },
});

export default AuthLayout;
