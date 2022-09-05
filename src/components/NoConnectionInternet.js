import {View, Text, Alert, StyleSheet} from 'react-native';
import React from 'react';
import styles from '../styles/global';
import {COLOR_5, COLOR_GRAY, widthResponsive} from '../styles/constant';
import Icon from 'react-native-vector-icons/Entypo';

const NoConnectionInternet = () => {
  return (
    <View style={style.wrapper}>
      <Icon name="emoji-sad" size={widthResponsive(5)} color={COLOR_GRAY} />
      <Text style={style.textConnection}>No Connection Internet</Text>
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textConnection: {
    marginTop: widthResponsive(2),
    fontSize: widthResponsive(2),
    textAlign: 'center',
    color: COLOR_GRAY,
    fontWeight: 'bold',
  },
});
export default NoConnectionInternet;
