import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import styles from '../styles/global';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLOR_5, widthResponsive} from '../styles/constant';

export const ButtonTransction = ({buttonText, icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.buttonTransaction} onPress={onPress}>
      <View style={styles.buttonRow}>
        <View style={styles.buttonWraperContent}>
          <Icon name={icon} size={widthResponsive(1.3)} color={'white'} />
        </View>
        <Text style={styles.textWhiteButton}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const CardButton = ({btnText, child, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.flexDirectionRow, style.buttonStyle]}
      onPress={onPress}>
      <Text style={style.textButtonStyle}>{btnText}</Text>
      {child}
    </TouchableOpacity>
  );
};

const Button = ({disable, buttonText, onPress}) => {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity disabled={disable ?? false} onPress={onPress}>
        <View style={disable ? styles.buttonDisable : styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  buttonStyle: {
    width: widthResponsive(19),
    backgroundColor: 'gainsboro',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthResponsive(1),
    // paddingVertical: widthResponsive(1),
    height: widthResponsive(4),
    borderRadius: widthResponsive(0.3),
    elevation: 2,
    marginVertical: widthResponsive(0.5),
  },
  textButtonStyle: {
    color: COLOR_5,
    fontWeight: '700',
    fontSize: widthResponsive(0.8),
  },
});

export default Button;
