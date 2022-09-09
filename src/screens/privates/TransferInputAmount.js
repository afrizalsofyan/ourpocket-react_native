import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import React from 'react';
import {
  COLOR_5,
  COLOR_PRIMARY,
  convertMoney,
  widthResponsive,
} from '../../styles/constant';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSelector} from 'react-redux';
import {store} from '../../redux/store';

const inputSchema = Yup.object().shape({
  amount: Yup.number()
    .min(10000, `Minimum transfer is Rp. 10,000.00`)
    .required(),
  notes: Yup.string(),
});

const TransferInputAmount = ({route, navigation}) => {
  const {data} = route.params;
  const user = data.item;
  const otherUser = useSelector(state => state.users.result);
  console.log(otherUser);
  const profile = useSelector(state => state.users.profile);
  const onSubmitAmount = val => {
    if (val.amount > profile.balance) {
      Alert.alert('Invalid Input', 'Your input is more than your balance!!');
    } else {
      const sendData = {
        ...val,
        ...user,
        balanceLeft: convertMoney(profile.balance - val.amount).split('IDR')[1],
      };
      navigation.navigate('Transfer Confirmation', {sendData});
    }
  };

  return (
    <DashboardLayout
      child={
        <ScrollView>
          <View style={style.boxRoot}>
            <Formik
              validationSchema={inputSchema}
              initialValues={{amount: 0, notes: ''}}
              onSubmit={onSubmitAmount}>
              {({handleSubmit, handleChange, values, errors, isValid}) => (
                <>
                  <View style={style.box}>
                    <TextInput
                      placeholder="0.00"
                      style={style.inputStyle}
                      keyboardType={'number-pad'}
                      maxLength={7}
                      value={values.amount}
                      onChangeText={handleChange('amount')}
                    />
                    {errors.amount && (
                      <Text style={style.errorStyle}>{errors.amount}</Text>
                    )}
                  </View>
                  <View>
                    <Text style={style.textCenterBalance}>{`Rp. ${
                      convertMoney(profile.balance).split('IDR')[1]
                    }`}</Text>
                  </View>
                  <View style={style.box}>
                    <InputField
                      icon={'ios-pencil'}
                      placeholder={'Add some notes'}
                      value={values.notes}
                      onChange={handleChange('notes')}
                    />
                    {errors.notes && (
                      <Text style={style.errorStyle}>{errors.notes}</Text>
                    )}
                  </View>
                  <View style={style.box}>
                    <Button
                      buttonText={'Continue'}
                      disable={!isValid}
                      onPress={handleSubmit}
                    />
                  </View>
                </>
              )}
            </Formik>
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
  errorStyle: {
    fontSize: 10,
    color: 'red',
    textAlign: 'center',
  },
});

export default TransferInputAmount;
