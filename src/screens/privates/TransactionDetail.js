import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import React from 'react';
import {COLOR_5, COLOR_SECONDARY, widthResponsive} from '../../styles/constant';
import {TitleContent} from '../../components/Title';
import {UserCardContent} from '../../components/Card';

const data = [1, 2, 3, 4, 5];

const TransactionDetail = ({navigation}) => {
  const day = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const dummyValue = [100, 40, 60, 70, 50, 90, 80];
  const value = 100;
  let arrValue = [];
  arrValue = dummyValue.map((e, i) => {
    return (
      <View>
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
      <ScrollView style={style.wrapper}>
        <View style={style.titleText}>
          <Text style={style.titleTextStyle}>In This Week</Text>
        </View>
        <View style={style.graphicWrapper}>{arrValue}</View>
      </ScrollView>
      <TitleContent
        titleText={'Transaction History'}
        titleLink={'See all'}
        onPress={() => navigation.navigate('History')}
      />
      <FlatList
        data={data.map((e, i) => {
          return {
            card: (
              <>
                <UserCardContent
                  image={{
                    uri: 'https://images.unsplash.com/photo-1661395122138-6a5ad27e37a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
                  }}
                  name={'Jenifer Liou'}
                  type={'Transfer'}
                  amount={'+Rp50.000'}
                  onPress={() => console.log('card user pushed')}
                />
              </>
            ),
            key: `item${i}`,
          };
        })}
        contentContainerStyle={styleLocal.containerList}
        renderItem={({item, index, separators}) => (
          <>
            <View style={styleLocal.paddingBottomCard}>
              <TouchableHighlight
                key={item.key}
                onPress={() => console.log('item ' + index)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <View>{item.card}</View>
              </TouchableHighlight>
            </View>
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
    height: Dimensions.get('screen').height,
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
});
export default TransactionDetail;
