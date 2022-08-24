import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLOR_GRAY, widthResponsive} from '../styles/constant';

const InputField = ({icon, onChange, placeholder, secure, type, value}) => {
  const [showPass, setShowPass] = React.useState(false);
  return (
    <View style={style.wrapper}>
      <View style={style.iconWrapper}>
        <Icon name={icon} size={20} color={COLOR_GRAY} />
      </View>
      <View style={style.inputWrapper}>
        <TextInput
          placeholder={placeholder}
          keyboardType={type}
          value={value}
          onChangeText={onChange}
          secureTextEntry={!showPass}
        />
      </View>
      {secure && (
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <View style={style.iconWrapper2}>
            <Icon
              name={showPass ? 'ios-eye-off-outline' : 'ios-eye-outline'}
              size={20}
              color={COLOR_GRAY}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    height: widthResponsive(3),
    borderBottomWidth: widthResponsive(0.1),
    borderColor: COLOR_GRAY,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: widthResponsive(3),
    width: widthResponsive(1.5),
    marginLeft: widthResponsive(0.1),
  },
  iconWrapper2: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: widthResponsive(3),
    width: widthResponsive(1.5),
    marginRight: widthResponsive(0.1),
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: widthResponsive(1),
  },
});

export default InputField;
