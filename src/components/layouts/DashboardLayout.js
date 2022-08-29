import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {COLOR_PRIMARY} from '../../styles/constant';
import styles from '../../styles/global';

export const DashboardLayout = ({child}) => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return loading ? (
    <View style={[style.container, style.horizontal]}>
      <ActivityIndicator size={'large'} color={COLOR_PRIMARY} />
    </View>
  ) : (
    <SafeAreaView style={styles.dashboardLayout}>{child}</SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
