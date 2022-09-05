import React from 'react';
import TransactionDetailLayout from '../../components/layouts/TransactionDetailLayout';

const HistoryItemDetail = ({route, navigation}) => {
  return (
    <TransactionDetailLayout data={route.params.item} navigation={navigation} />
  );
};

export default HistoryItemDetail;
