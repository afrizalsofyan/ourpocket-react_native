import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLOR_5, convertMoney, widthResponsive} from '../../styles/constant';
import {TitleContent} from '../../components/Title';
import {UserCardContent} from '../../components/Card';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TransactionDetail = ({navigation}) => {
  const transaction = useSelector(state => state.transaction.results);
  const profile = useSelector(state => state.users.profile);
  const day = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const dummyValue = [100, 40, 60, 70, 50, 90, 80];
  // const value = 100;
  let arrValue = [];
  arrValue = dummyValue.map((e, i) => {
    return (
      <View key={i}>
        <View
          style={
            i === 0 || i === 1 || i === 5
              ? styleHeight(e).valueHeightPrimary
              : styleHeight(e).valueHeightSecondary
          }
        />
        <View style={style.textGraphicWrapper}>
          <Text style={style.textPrimary}>{day[i]}</Text>
        </View>
      </View>
    );
  });
  return (
    <>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={style.wrapper}>
              <View style={style.titleText}>
                <Text style={style.titleTextStyle}>In This Week</Text>
              </View>
              <View style={style.graphicWrapper}>{arrValue}</View>
            </View>
            <TitleContent
              titleText={'Transaction History'}
              titleLink={'See all'}
              onPress={() => navigation.navigate('History')}
            />
          </>
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
                      <Icon name="attach-money" size={widthResponsive(1.5)} />
                    </View>
                  ) : null
                }
                name={
                  item.recipient === profile.username && item.sender !== 'topup'
                    ? item.sender
                    : item.recipient
                  // item.type === 'topup' || item.type === 'accept'
                  //   ? item.sender
                  //   : item.recipient
                }
                recipient={item.sender === profile.username ? false : true}
                type={
                  item.type === 'payment' && item.recipient === profile.username
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
  );
};

const styleHeight = value =>
  StyleSheet.create({
    valueHeightPrimary: {
      height: ((Dimensions.get('screen').height / 5) * value) / 100,
      width: widthResponsive(0.8),
      backgroundColor: COLOR_5,
      borderRadius: widthResponsive(2),
    },
    valueHeightSecondary: {
      height: ((Dimensions.get('screen').height / 5) * value) / 100,
      width: widthResponsive(0.8),
      backgroundColor: 'gray',
      borderRadius: widthResponsive(2),
    },
  });
const style = StyleSheet.create({
  graphicWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  wrapper: {
    paddingHorizontal: widthResponsive(1),
    height: Dimensions.get('screen').height / 2.5,
  },
  titleText: {
    paddingVertical: widthResponsive(1),
  },
  titleTextStyle: {
    color: COLOR_5,
    fontWeight: 'bold',
    fontSize: widthResponsive(0.8),
  },
  textGraphicWrapper: {
    marginVertical: widthResponsive(0.7),
  },
  textPrimary: {
    color: COLOR_5,
  },
});

const styleLocal = StyleSheet.create({
  marginTopCard: {
    marginTop: widthResponsive(1),
  },
  paddingBottomCard: {
    paddingBottom: widthResponsive(1),
  },
  buttonWrapper: {
    height: widthResponsive(4),
    marginVertical: widthResponsive(1),
    flexDirection: 'row',
  },
  containerList: {
    paddingVertical: widthResponsive(1),
  },
  iconBox: {
    padding: widthResponsive(0.3),
  },
});
export default TransactionDetail;
