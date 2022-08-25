import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../styles/global';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthResponsive} from '../styles/constant';

export const ButtonTransction = () => {
  return (
    <TouchableOpacity style={styles.buttonTransaction}>
      <View style={styles.buttonRow}>
        <View style={styles.buttonWraperContent}>
          <Icon
            name={'ios-arrow-up'}
            size={widthResponsive(1.3)}
            color={'white'}
          />
        </View>
        <Text style={styles.textWhiteButton}>Transfer</Text>
      </View>
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

export default Button;
