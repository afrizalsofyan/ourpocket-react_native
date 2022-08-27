import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {widthResponsive} from '../../styles/constant';
import {TitleContent} from '../../components/Title';
import {CardTopup} from '../../components/Card';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';

const content = [
  {keyContent: 1, content: 'Go to the nearest ATM or you can use E-Banking.'},
  {
    keyContent: 2,
    content: 'Type your security number on the ATM or E-Banking.',
  },
  {keyContent: 3, content: 'Select “Transfer” in the menu'},
  {
    keyContent: 4,
    content: 'Type the virtual account number that we provide you at the top.',
  },
  {keyContent: 5, content: 'Type the amount of the money you want to top up.'},
  {keyContent: 6, content: 'Read the summary details'},
  {keyContent: 7, content: 'Press transfer / top up'},
  {keyContent: 8, content: 'You can see your money in Zwalletwithin 3 hours.'},
];

const TopUp = () => {
  return (
    <DashboardLayout
      child={
        <View style={style.root}>
          <TitleContent titleText={'How to Top-Up'} />
          <View style={style.listWrapper}>
            <FlatList
              data={content}
              renderItem={item => (
                <CardTopup
                  number={`${item.item.keyContent}`}
                  textContent={item.item.content}
                />
              )}
            />
          </View>
        </View>
      }
    />
  );
};

const style = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: widthResponsive(1.5),
    marginHorizontal: widthResponsive(0.5),
  },
  listWrapper: {
    paddingTop: widthResponsive(1),
    paddingBottom: widthResponsive(2),
  },
});

export default TopUp;
