import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import styles from '../../styles/global';
import {TitleContent} from '../../components/Title';
import {dummy} from './History';
import {UserCardContent3} from '../../components/Card';
import {convertMoney, widthResponsive} from '../../styles/constant';
import Icon from 'react-native-vector-icons/Ionicons';

const Notification = () => {
  return (
    <DashboardLayout
      child={
        <>
          <View style={[styles.root]}>
            {/* <StatusBar backgroundColor={COLOR_SECONDARY} /> */}
            <View>
              <TitleContent titleText={'Your Notification'} />
              <FlatList
                data={dummy}
                contentContainerStyle={style.container}
                renderItem={({item}) => (
                  <View style={style.boxCard}>
                    <UserCardContent3
                      name={item.name}
                      type={`Rp. ${convertMoney(item.amount).split('IDR')[1]}`}
                      icon={
                        <Icon
                          name={
                            item.type == 'accept'
                              ? 'ios-arrow-up'
                              : 'ios-arrow-down'
                          }
                          color={item.type == 'accept' ? 'orangered' : 'lime'}
                          size={widthResponsive(1.5)}
                        />
                      }
                    />
                  </View>
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
