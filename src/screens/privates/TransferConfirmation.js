import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {CardTransaction} from '../../components/Card';
import styles from '../../styles/global';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import Button from '../../components/Button';
import {convertMoney, widthResponsive} from '../../styles/constant';

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
          <CardTransaction
            title={'Amount'}
            subtitle={`Rp. ${convertMoney(data.amount).split('IDR')[1]}`}
          />
          <CardTransaction
            title={'Balance Left'}
            subtitle={`Rp. ${data.balanceLeft}`}
          />
        </View>
        <View style={[styles.rootFlex1, styles.flexDirectionRow]}>
          <CardTransaction title={'Date'} subtitle={data.date_transaction} />
          <CardTransaction title={'Time'} subtitle={data.time_transaction} />
        </View>
        <View style={[styles.rootFlex1, styles.flexDirectionRow]}>
          <CardTransaction title={'Notes'} subtitle={data.notes ?? '-'} />
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
  const data = route.params.sendData;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth().toLocaleString();
  const time = `${date.getHours().toLocaleString()}.${date
    .getMinutes()
    .toLocaleString()}`;
  const getDate = date.getDate().toLocaleString();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const fullDate = `${months[Number(month) + 1]} ${getDate}, ${year}`;
  data.date_transaction = fullDate;
  data.time_transaction = time;
  return (
    <DashboardLayout
      child={
        <ScrollView style={style.marginVerticalCard}>
          <TransferContent
            data={data}
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
