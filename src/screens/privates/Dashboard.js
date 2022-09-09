import {
  View,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {
  ErrorCard,
  SuccessCard,
  UserCardContent,
  UserCardHeader,
} from '../../components/Card';
import {
  COLOR_SECONDARY,
  convertMoney,
  widthResponsive,
} from '../../styles/constant';
import {ButtonTransction} from '../../components/Button';
import {TitleContent} from '../../components/Title';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import {useSelector, useDispatch} from 'react-redux';
import {getSomeTransaction} from '../../redux/asyncActions/transaction';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {store} from '../../redux/store';
import {getProfile} from '../../redux/asyncActions/user';
import {getAllNotificationApp} from '../../redux/asyncActions/notification';
import {onRefreshPage} from '../../redux/reducers/user';
import RNBootSplash from "react-native-bootsplash";

const Dashboard = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const transaction = useSelector(() => store.getState().transaction.results);
  const profile = useSelector(() => store.getState().users.profile);
  const notification = useSelector(state => state.notification.resultsRead);
  const onRefreshData = () => {
    dispatch(getSomeTransaction({token: token}));
    dispatch(getProfile({token: token}));
    dispatch(onRefreshPage());
  };
  React.useEffect(() => {
    const init = async () => {
      dispatch(getAllNotificationApp({token: token}));
      if (token) {
        dispatch(getSomeTransaction({token: token}));
      }
      if (profile?.pin_number === null) {
        navigation.navigate('Create Pin');
      }
    };
    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, [dispatch, token, navigation, profile?.pin_number]);
  return (
    <DashboardLayout
      child={
        <>
          <StatusBar translucent={false} backgroundColor={COLOR_SECONDARY} />
          <Image source={{uri: null}} />
          <UserCardHeader
            image={{
              uri: profile.photo_url,
            }}
            icon={
              !profile.photo_url ? (
                <Icon2 name="ios-person" size={widthResponsive(3)} />
              ) : null
            }
            subtitle={`Rp. ${convertMoney(profile?.balance).split('IDR')[1]}`}
            onPress={() => {
              navigation.navigate('Notification');
            }}
            notifCount={notification?.length}
          />
          <View style={styleLocal.buttonWrapper}>
            <ButtonTransction
              icon={'ios-arrow-up'}
              buttonText="Transfer"
              onPress={() => navigation.navigate('Transfer Stack')}
            />
            <ButtonTransction
              icon={'ios-add'}
              buttonText="TopUp"
              onPress={() => navigation.navigate('Topup')}
            />
          </View>
          <FlatList
            onRefresh={onRefreshData}
            refreshing={false}
            ListHeaderComponent={
              <TitleContent
                titleText={'Transaction History'}
                titleLink={'See all'}
                onPress={() => navigation.navigate('Transaction Detail')}
              />
            }
            data={transaction}
            contentContainerStyle={styleLocal.containerList}
            renderItem={({item}) => (
              <>
                <TouchableOpacity
                  style={styleLocal.paddingBottomCard}
                  onPress={() =>
                    navigation.navigate('Transaction Item Detail', {item})
                  }>
                  <UserCardContent
                    image={{
                      uri: item.image_recipient,
                    }}
                    icon={
                      !item.image_recipient ? (
                        <View style={styleLocal.iconBox}>
                          <Icon
                            name="attach-money"
                            size={widthResponsive(1.5)}
                          />
                        </View>
                      ) : null
                    }
                    name={
                      item.recipient === profile.username &&
                      item.sender !== 'topup'
                        ? item.sender
                        : item.recipient
                    }
                    recipient={item.sender === profile.username ? false : true}
                    type={
                      item.type === 'payment' &&
                      item.recipient === profile.username
                        ? 'accept'
                        : item.sender === profile.username
                        ? 'send'
                        : item.type
                    }
                    amount={convertMoney(item.amount)}
                  />
                </TouchableOpacity>
              </>
            )}
          />
        </>
      }
    />
  );
};

const styleLocal = StyleSheet.create({
  marginTopCard: {
    marginTop: widthResponsive(1),
  },
  paddingBottomCard: {
    paddingBottom: widthResponsive(1),
  },
  buttonWrapper: {
    height: widthResponsive(4),
    marginTop: widthResponsive(1),
    marginBottom: widthResponsive(0.5),
    flexDirection: 'row',
  },
  containerList: {
    paddingVertical: widthResponsive(1.5),
  },
  iconBox: {
    padding: widthResponsive(0.3),
  },
});
export default Dashboard;
