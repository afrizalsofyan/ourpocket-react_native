import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
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
          <View style={style.iconWrapper}>
            <Icon
              name={showPass ? 'eye-slash' : 'eye'}
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
    width: widthResponsive(1),
    marginHorizontal: widthResponsive(1),
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default InputField;
