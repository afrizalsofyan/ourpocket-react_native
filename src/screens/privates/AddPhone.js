import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import styles from '../../styles/global';
import {COLOR_5, widthResponsive} from '../../styles/constant';

const AddPhone = ({route, navigation}) => {
  const dataPhone = route.params.data.phoneNumber;
  const [phone, setPhone] = React.useState(dataPhone);
  return (
    <DashboardLayout
      child={
        <View style={styles.rootFlex1}>
          <View style={[styles.rootFlex1, style.root]}>
            <View style={style.fieldWrapper}>
              <Text style={style.textHeaderStyle}>
                You must enter your current password and then type your new
                password twice.
              </Text>
            </View>
            <View style={[style.inputWrapper, styles.rootFlex1]}>
              <View style={style.fieldWrapper}>
                <InputField
                  icon={'ios-call-outline'}
                  placeholder={phone ? 'Update your phone' : 'Add your phone'}
                  type={'phone-pad'}
                  value={phone}
                  onChange={val => setPhone(val)}
                />
              </View>
            </View>
            <View style={style.wrapperButton}>
              <Button
                buttonText={phone ? 'Update' : 'Submit'}
                disable={false}
                onPress={() => navigation.popToTop()}
              />
            </View>
          </View>
        </View>
      }
    />
  );
};

const style = StyleSheet.create({
  root: {
    paddingVertical: widthResponsive(2),
    backgroundColor: 'white',
  },
  textHeaderStyle: {
    textAlign: 'center',
  },
  fieldWrapper: {
    marginTop: widthResponsive(1),
    marginHorizontal: widthResponsive(0.5),
  },
  inputWrapper: {
    marginVertical: widthResponsive(2),
  },
  wrapperButton: {
    marginTop: widthResponsive(3),
  },
});

export default AddPhone;
