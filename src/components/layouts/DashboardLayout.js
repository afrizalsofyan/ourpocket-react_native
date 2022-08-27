import React from 'react';
import {SafeAreaView, View} from 'react-native';
import styles from '../../styles/global';

export const DashboardLayout = ({child}) => {
  return <SafeAreaView style={styles.dashboardLayout}>{child}</SafeAreaView>;
};
