import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import React from 'react';
import {COLOR_5, COLOR_PRIMARY, widthResponsive} from '../../styles/constant';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

const TransferInputAmount = ({route, navigation}) => {
  const data = route.params.data.item;
  return (
    <DashboardLayout
      child={
        <ScrollView>
          <View style={style.boxRoot}>
            <View style={style.box}>
              <TextInput
                placeholder="0.00"
                style={style.inputStyle}
                keyboardType={'number-pad'}
                maxLength={7}
              />
            </View>
            <View>
              <Text style={style.textCenterBalance}>Rp. 120.000,00</Text>
            </View>
            <View style={style.box}>
              <InputField icon={'ios-pencil'} placeholder={'Add some notes'} />
            </View>
            <View style={style.box}>
              <Button
                buttonText={'Continue'}
                disable={false}
                onPress={() =>
                  navigation.navigate('Transfer Confirmation', {data})
                }
              />
            </View>
          </View>
        </ScrollView>
      }
    />
  );
};

const style = StyleSheet.create({
  inputStyle: {
    fontSize: widthResponsive(3),
    textAlign: 'center',
    color: COLOR_PRIMARY,
  },
  textCenterBalance: {
    textAlign: 'center',
    fontSize: widthResponsive(1),
    fontWeight: 'bold',
    color: COLOR_5,
  },
  box: {
    marginHorizontal: widthResponsive(1),
    paddingVertical: widthResponsive(1.5),
  },
  boxRoot: {
    height: Dimensions.get('screen').height - widthResponsive(15),
    justifyContent: 'center',
  },
});

export default TransferInputAmount;
