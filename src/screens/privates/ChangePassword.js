import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import styles from '../../styles/global';
import {CardTransaction} from '../../components/Card';
import {COLOR_5, widthResponsive} from '../../styles/constant';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

const ChangePassword = ({route, navigation}) => {
  return (
    <DashboardLayout
      child={
        <ScrollView>
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
                  icon={'ios-lock-closed-outline'}
                  placeholder={'Enter your password'}
                  secure={true}
                />
              </View>
              <View style={style.fieldWrapper}>
                <InputField
                  icon={'ios-lock-closed-outline'}
                  placeholder={'Enter your password'}
                  secure={true}
                />
              </View>
              <View style={style.fieldWrapper}>
                <InputField
                  icon={'ios-lock-closed-outline'}
                  placeholder={'Enter your password'}
                  secure={true}
                />
              </View>
            </View>
            <View style={style.wrapperButton}>
              <Button
                buttonText={'Confirm'}
                disable={false}
                onPress={() => navigation.popToTop()}
              />
            </View>
          </View>
        </ScrollView>
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
  cardWrapper: {
    backgroundColor: 'white',
    height: widthResponsive(5),
    margin: widthResponsive(0.5),
    alignItems: 'center',
    padding: widthResponsive(0.5),
    borderRadius: widthResponsive(0.5),
    elevation: 3,
  },
  titleCard: {
    fontSize: widthResponsive(0.7),
    color: COLOR_5,
    fontWeight: '400',
  },
  subtitleCard: {
    fontSize: widthResponsive(0.9),
    color: COLOR_5,
    fontWeight: '700',
  },
  paddingTextCard: {
    paddingVertical: widthResponsive(0.2),
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  manageButtonStyle: {
    color: COLOR_5,
    fontWeight: '500',
  },
  inputWrapper: {
    marginVertical: widthResponsive(2),
  },
  fieldWrapper: {
    marginTop: widthResponsive(1),
    marginHorizontal: widthResponsive(0.5),
  },
  wrapperButton: {
    marginTop: widthResponsive(3),
  },
});

export default ChangePassword;
