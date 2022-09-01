import {
  View,
  StatusBar,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
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
const data = [1, 2, 3, 4, 5];

const Dashboard = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const transaction = useSelector(state => state.transaction.results);
  const profile = useSelector(state => state.users.profile);
  const successMsgTransaction = useSelector(
    state => state.transaction.successMsg,
  );
  const errorMsgTransaction = useSelector(state => state.transaction.errorMsg);
  const [showMsg, setShowMsg] = React.useState(false);
  React.useEffect(() => {
    if (token) {
      dispatch(getSomeTransaction({token: token}));
      // navigation.replace('Login');
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 600);
    }
  }, [dispatch, token, navigation]);
  return (
    <DashboardLayout
      child={
        <>
          <StatusBar translucent={false} backgroundColor={COLOR_SECONDARY} />
          <UserCardHeader
            image={{
              uri: profile?.photo_url,
            }}
            subtitle={`Rp. ${convertMoney(profile?.balance).split('IDR')[1]}`}
            onPress={() => console.log('notif push')}
          />
          {showMsg ? (
            <>
              {successMsgTransaction ? (
                <SuccessCard text={successMsgTransaction} />
              ) : null}
              {errorMsgTransaction ? (
                <ErrorCard text={errorMsgTransaction} />
              ) : null}
            </>
          ) : null}
          <View style={styleLocal.buttonWrapper}>
            <ButtonTransction icon={'ios-arrow-up'} buttonText="Transfer" />
            <ButtonTransction icon={'ios-add'} buttonText="TopUp" />
          </View>
          <FlatList
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
                  onPress={() => console.log('card user pushed ' + item.id)}>
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
                      item.type === 'topup' || item.type === 'accept'
                        ? item.sender
                        : item.recipient
                    }
                    type={item.type}
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
