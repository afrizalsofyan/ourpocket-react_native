import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import {UserCardContent} from '../../components/Card';
import styles from '../../styles/global';
import {COLOR_5, widthResponsive} from '../../styles/constant';
import {dummy} from './History';
import {useDispatch, useSelector} from 'react-redux';
import {getAllUser, getOtherUser} from '../../redux/asyncActions/user';
import Icon from 'react-native-vector-icons/Ionicons';

const Transfer = ({navigation}) => {
  const users = useSelector(state => state.users.results);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  React.useEffect(() => {
    dispatch(getAllUser({token: token}));
  }, [dispatch, token]);
  return (
    <DashboardLayout
      child={
        <View style={[styles.rootFlex1]}>
          <View style={styles.rootFlex1}>
            <View style={style.contentWrapper}>
              <View style={style.titleWrapper}>
                <View style={style.textWrapper}>
                  <Text style={style.textTitle}>Contact</Text>
                </View>
                <View style={style.textWrapper}>
                  <Text style={style.subtitleText}>17 Contact Founds</Text>
                </View>
              </View>
            </View>
            <FlatList
              data={users}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={style.cardPadding}
                  onPress={() => {
                    dispatch(getOtherUser({token: token, id: item.id}));
                    navigation.navigate('Input Amount', {
                      data: {item},
                    });
                  }}>
                  <UserCardContent
                    image={{uri: item.photo_url}}
                    icon={
                      !item.photo_url ? (
                        <Icon name="ios-person" size={widthResponsive(3)} />
                      ) : null
                    }
                    name={item.username}
                    // amount={item.}
                    type={item.phone_number ?? '-'}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      }
    />
  );
};
const style = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: widthResponsive(1),
  },
  titleWrapper: {
    paddingVertical: widthResponsive(1.5),
  },
  textTitle: {
    color: COLOR_5,
    fontSize: widthResponsive(1),
    fontWeight: 'bold',
  },
  subtitleText: {
    color: COLOR_5,
    fontSize: widthResponsive(0.6),
    fontWeight: '600',
  },
  textWrapper: {
    paddingVertical: widthResponsive(0.25),
  },
  cardPadding: {
    paddingBottom: widthResponsive(1),
  },
});
export default Transfer;
