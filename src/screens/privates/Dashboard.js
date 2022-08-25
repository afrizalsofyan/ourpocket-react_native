import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {UserCardContent, UserCardHeader} from '../../components/Card';
import {COLOR_PRIMARY, widthResponsive} from '../../styles/constant';
import styles from '../../styles/global';
import {ButtonTransction} from '../../components/Button';
const data = [1, 2, 3, 4, 5];
// const Card1 = (
//   <UserCardContent
//     image={{
//       uri: 'https://images.unsplash.com/photo-1661395122138-6a5ad27e37a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
//     }}
//     name={'Jenifer Liou'}
//     type={'Transfer'}
//     amount={'+Rp50.000'}
//     onPress={() => console.log('card user pushed')}
//   />
// );
const Dashboard = ({navigation}) => {
  return (
    <View style={styles.dashboardLayout}>
      <StatusBar translucent backgroundColor={COLOR_PRIMARY} />
      <UserCardHeader
        image={{
          uri: 'https://images.unsplash.com/photo-1661395122138-6a5ad27e37a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        }}
        subtitle={'Rp. 120.000,00'}
        onPress={() => console.log('notif push')}
      />
      <View style={styleLocal.buttonWrapper}>
        <ButtonTransction />
        <ButtonTransction />
      </View>
      <FlatList
        data={data.map((e, i) => {
          return {
            card: (
              <>
                <View
                  style={
                    i < data.length - 1
                      ? styleLocal.marginTopCard
                      : [styleLocal.marginTopCard, styleLocal.marginBottomCard]
                  }>
                  <UserCardContent
                    image={{
                      uri: 'https://images.unsplash.com/photo-1661395122138-6a5ad27e37a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
                    }}
                    name={'Jenifer Liou'}
                    type={'Transfer'}
                    amount={'+Rp50.000'}
                    onPress={() => console.log('card user pushed')}
                  />
                </View>
              </>
            ),
            key: `item${i}`,
          };
        })}
        renderItem={({item, index, separators}) => (
          <>
            <TouchableHighlight
              key={item.key}
              onPress={() => console.log('item ' + index)}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <View>{item.card}</View>
            </TouchableHighlight>
          </>
        )}
      />
    </View>
  );
};

const styleLocal = StyleSheet.create({
  marginTopCard: {
    marginTop: widthResponsive(1),
  },
  marginBottomCard: {
    marginBottom: widthResponsive(1),
  },
  buttonWrapper: {
    height: widthResponsive(4),
    marginVertical: widthResponsive(1),
    flexDirection: 'row',
  },
});
export default Dashboard;
