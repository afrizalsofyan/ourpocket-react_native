import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {COLOR_PRIMARY} from '../../styles/constant';
import styles from '../../styles/global';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile} from '../../redux/asyncActions/user';
import {getSomeTransaction} from '../../redux/asyncActions/transaction';

export const DashboardLayout = ({child}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const token = useSelector(state => state.auth.token);
  React.useEffect(() => {
    dispatch(getProfile({token: token}));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    if (token) {
      dispatch(getSomeTransaction({token: token}));
      // navigation.replace('Login');
    }
  }, [dispatch, token]);
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
