import {View, Text} from 'react-native';
import React from 'react';
import TransactionDetailLayout from '../../components/layouts/TransactionDetailLayout';

const TransactionItemDetail = ({route, navigation}) => {
  return (
    <TransactionDetailLayout data={route.params.item} navigation={navigation} />
  );
};

export default TransactionItemDetail;
