import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import styles from '../../styles/global';
import {COLOR_5, convertMoney, widthResponsive} from '../../styles/constant';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import {getAllNotificationApp} from '../../redux/asyncActions/notification';

const NotificationDetail = ({route, navigation}) => {
  const dispatch = useDispatch();
  const data = route.params.item;
  const token = useSelector(state => state.auth.token);
  const profile = useSelector(state => state.users.profile);
  const date = new Date(data.time_transaction);
  console.log(route.params);
  return (
    <DashboardLayout
      child={
        <View style={[styles.rootFlex1, style.root]}>
          <View style={style.wrapperHeader}>
            <Image
              source={require('../../assets/opo-logo.png')}
              style={style.logo}
            />
          </View>
          <View style={style.wrapperContent}>
            <Text style={style.headerText}>Notification Details</Text>
            <ScrollView>
              <View style={style.wrapperDetailsItem}>
                <View style={[style.content, style.photoWrapper]}>
                  {data.photo_url ? (
                    <Image
                      source={{uri: data.photo_url}}
                      style={style.imgWrapper}
                    />
                  ) : (
                    <View style={style.iconWrapperNull}>
                      <Icon
                        name="ios-person-outline"
                        size={widthResponsive(5)}
                        color={COLOR_5}
                      />
                    </View>
                  )}
                </View>
                <View style={style.content}>
                  <Text style={style.titleStyle}>Type Transaction</Text>
                  <Text style={style.subtitleStyle}>
                    {data.recipient === profile.username ? 'accept' : 'send'}
                  </Text>
                </View>
                <View style={style.content}>
                  <Text style={style.titleStyle}>Recipient</Text>
                  <Text style={style.subtitleStyle}>{data.recipient}</Text>
                </View>
                <View style={style.content}>
                  <Text style={style.titleStyle}>Phone Number</Text>
                  <Text style={style.subtitleStyle}>
                    {data.recipient_phone ?? '-'}
                  </Text>
                </View>
                <View style={style.content}>
                  <Text style={style.titleStyle}>Time Transaction</Text>
                  <Text style={style.subtitleStyle}>
                    {`${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`}
                  </Text>
                </View>
                <View style={style.content}>
                  <Text style={style.titleStyle}>Transaction Amount</Text>
                  <Text style={style.subtitleStyle}>
                    {`Rp. ${convertMoney(data.transfer_amount)
                      .split('IDR')
                      .join('')}`}
                  </Text>
                </View>
                <View style={style.buttonWrapper}>
                  <Button
                    disable={false}
                    buttonText="Back"
                    onPress={() => {
                      dispatch(getAllNotificationApp({token: token}));
                      // dispatch(getAllNotificationApp({token: token}));
                      navigation.goBack();
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      }
    />
  );
};

const style = StyleSheet.create({
  root: {
    justifyContent: 'flex-end',
  },
  iconWrapperNull: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gainsboro',
    borderRadius: widthResponsive(1),
    width: widthResponsive(7),
    height: widthResponsive(7),
    opacity: 0.8,
  },
  imgWrapper: {
    width: widthResponsive(5),
    height: widthResponsive(5),
    borderRadius: widthResponsive(20),
  },
  content: {
    marginTop: widthResponsive(1),
  },
  titleStyle: {
    fontSize: widthResponsive(0.8),
    fontWeight: '500',
    color: COLOR_5,
  },
  subtitleStyle: {
    fontSize: widthResponsive(1.2),
    fontWeight: 'bold',
    color: COLOR_5,
    marginTop: widthResponsive(0.3),
  },
  logo: {
    width: widthResponsive(5),
    height: widthResponsive(5),
  },
  wrapperHeader: {
    height: Dimensions.get('screen').height / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: widthResponsive(1.3),
    color: COLOR_5,
    fontWeight: 'bold',
    marginTop: widthResponsive(3),
    textAlign: 'center',
  },
  wrapperContent: {
    height: Dimensions.get('screen').height / 1.5,
    backgroundColor: 'white',
    borderTopLeftRadius: widthResponsive(2),
    borderTopRightRadius: widthResponsive(2),
    elevation: 3,
  },
  wrapperDetailsItem: {
    flex: 1,
    paddingHorizontal: widthResponsive(2),
    marginTop: widthResponsive(2),
  },
  buttonWrapper: {
    marginVertical: widthResponsive(3),
  },
});

export default NotificationDetail;
