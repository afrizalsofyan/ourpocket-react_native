import {
  View,
  StatusBar,
  FlatList,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {UserCardContent, UserCardHeader} from '../../components/Card';
import {COLOR_SECONDARY, widthResponsive} from '../../styles/constant';
import {ButtonTransction} from '../../components/Button';
import {TitleContent} from '../../components/Title';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
const data = [1, 2, 3, 4, 5];

const Dashboard = ({navigation}) => {
  return (
    <DashboardLayout
      child={
        <>
          <StatusBar translucent={false} backgroundColor={COLOR_SECONDARY} />
          <UserCardHeader
            image={{
              uri: 'https://images.unsplash.com/photo-1661395122138-6a5ad27e37a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            }}
            subtitle={'Rp. 120.000,00'}
            onPress={() => console.log('notif push')}
          />
          <View style={styleLocal.buttonWrapper}>
            <ButtonTransction icon={'ios-arrow-up'} buttonText="Transfer" />
            <ButtonTransction icon={'ios-add'} buttonText="TopUp" />
          </View>
          <TitleContent
            titleText={'Transaction History'}
            titleLink={'See all'}
            onPress={() => navigation.navigate('Transaction Detail')}
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
    marginVertical: widthResponsive(1),
    flexDirection: 'row',
  },
  containerList: {
    paddingVertical: widthResponsive(1.5),
  },
});
export default Dashboard;
