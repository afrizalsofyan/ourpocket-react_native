import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {CardTransaction} from '../../components/Card';
import styles from '../../styles/global';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import Button, {ButtonTransction} from '../../components/Button';
import {widthResponsive} from '../../styles/constant';

export const TransferContent = ({
  navigation,
  data,
  targetScreen,
  btnText,
  gotoDashboard,
  child,
}) => {
  return (
    <>
      <View style={[styles.flexDirectionColumn, styles.rootFlex1]}>
        <View style={[styles.rootFlex1, styles.flexDirectionRow]}>
          <CardTransaction title={'Amount'} subtitle={'Rp. 200.000.000,00'} />
          <CardTransaction
            title={'Balance Left'}
            subtitle={'Rp. 1.000.000.000,00'}
          />
        </View>
        <View style={[styles.rootFlex1, styles.flexDirectionRow]}>
          <CardTransaction title={'Date'} subtitle={'May 11, 2020'} />
          <CardTransaction title={'Time'} subtitle={'12.20'} />
        </View>
        <View style={[styles.rootFlex1, styles.flexDirectionRow]}>
          <CardTransaction title={'Notes'} subtitle={'For buying some socks'} />
        </View>
      </View>
      {child ?? null}
      <View style={style.marginVerticalCard}>
        <Button
          buttonText={btnText}
          disable={false}
          onPress={
            gotoDashboard
              ? gotoDashboard
              : () => navigation.navigate(targetScreen, {data})
          }
        />
      </View>
    </>
  );
};

const TransferConfirmation = ({route, navigation}) => {
  const data = route.params.data;
  console.log(data);
  const date = new Date();
  const year = date.getFullYear().toLocaleString();
  const month = date.getMonth().toLocaleString();
  const time = `${date.getHours().toLocaleString()}.${date
    .getMinutes()
    .toLocaleString()}`;
  const getDate = date.getDate().toLocaleString();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const fullDate = `${months[Number(month) + 1]} ${getDate}, ${year}`;
  const data2 = {
    amount: 100000,
    balance: 900000,
    date: fullDate,
    time: time,
    notes: 'For buying a food',
    ...data,
  };
  console.log(data);
  return (
    <DashboardLayout
      child={
        <ScrollView style={style.marginVerticalCard}>
          <TransferContent
            data={data2}
            navigation={navigation}
            targetScreen={'Pin Confirmation'}
            btnText={'Continue'}
          />
        </ScrollView>
      }
    />
  );
};

const style = StyleSheet.create({
  marginVerticalCard: {
    marginVertical: widthResponsive(2),
  },
});

export default TransferConfirmation;
