import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../styles/global';

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
