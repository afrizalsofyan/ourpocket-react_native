import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import styles from '../../styles/global';
import {TitleContent} from '../../components/Title';
import {dummy} from './History';
import {UserCardContent3} from '../../components/Card';
import {convertMoney, widthResponsive} from '../../styles/constant';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {updateNotification} from '../../redux/asyncActions/notification';

const Notification = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const notification = useSelector(state => state.notification.resultsRead);
  const profile = useSelector(state => state.users.profile);
  return (
    <DashboardLayout
      child={
        <>
          <View style={[styles.root]}>
            {/* <StatusBar backgroundColor={COLOR_SECONDARY} /> */}
            <View>
              <FlatList
                data={notification}
                ListHeaderComponent={
                  <TitleContent titleText={'Your Notification'} />
                }
                contentContainerStyle={style.container}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={style.boxCard}
                    onPress={() => {
                      dispatch(updateNotification({token: token, id: item.id}));
                      navigation.navigate('Notification Detail', {item});
                    }}>
                    <UserCardContent3
                      name={item.recipient}
                      type={`Rp. ${
                        convertMoney(item.transfer_amount).split('IDR')[1]
                      }`}
                      icon={
                        <Icon
                          name={
                            item.recipient !== profile.username
                              ? 'ios-arrow-up'
                              : 'ios-arrow-down'
                          }
                          color={
                            item.recipient !== profile.username
                              ? 'orangered'
                              : 'lime'
                          }
                          size={widthResponsive(1.5)}
                        />
                      }
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </>
      }
    />
  );
};

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
  marginContent: {
    marginTop: widthResponsive(6),
  },
  container: {
    paddingVertical: widthResponsive(1),
  },
  boxCard: {
    marginBottom: widthResponsive(1),
  },
});

export default Notification;
