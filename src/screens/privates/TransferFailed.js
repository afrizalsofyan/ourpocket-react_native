import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {TransferContent} from './TransferConfirmation';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLOR_5, widthResponsive} from '../../styles/constant';
import {UserCardContent2} from '../../components/Card';
import {useSelector} from 'react-redux';

const TransferFailed = ({route, navigation}) => {
  const data = route.params.data;
  const profile = useSelector(state => state.users.profile);
  const otherUser = useSelector(state => state.users.result);
  return (
    <DashboardLayout
      child={
        <ScrollView style={style.root}>
          <View style={style.wrapper}>
            <View style={style.wrapperTitle}>
              <Icon
                name={'ios-close-circle'}
                size={widthResponsive(3.5)}
                color={'orangered'}
              />
            </View>
            <View style={style.wrapperTitle}>
              <Text style={style.titleStyle}>Transfer Failed</Text>
            </View>
          </View>
          <View>
            <TransferContent
              data={data}
              navigation={navigation}
              // targetScreen={'Dashboard'}
              btnText={'Try Again'}
              gotoDashboard={() => {
                navigation.pop(2);
              }}
              child={
                <>
                  <View style={style.wrapperTitle}>
                    <View style={style.paddingTextHoriz}>
                      <Text style={style.titleStyle}>From</Text>
                    </View>
                    <View>
                      <UserCardContent2
                        name={profile.username}
                        type={profile.phone_number ? profile.phone_number : '-'}
                        image={{uri: profile.photo_url}}
                        icon={
                          !profile.photo_url ? (
                            <Icon name="ios-person" size={widthResponsive(3)} />
                          ) : null
                        }
                      />
                    </View>
                  </View>
                  <View style={style.wrapperTitle}>
                    <View style={style.paddingTextHoriz}>
                      <Text style={style.titleStyle}>To</Text>
                    </View>
                    <View>
                      <UserCardContent2
                        name={otherUser.username ?? 'user recipient'}
                        type={
                          otherUser.phone_number ? otherUser.phone_number : '-'
                        }
                        image={{uri: otherUser.photo_url}}
                        icon={
                          !otherUser.photo_url ? (
                            <Icon name="ios-person" size={widthResponsive(3)} />
                          ) : null
                        }
                      />
                    </View>
                  </View>
                </>
              }
            />
          </View>
        </ScrollView>
      }
    />
  );
};

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: widthResponsive(1),
  },
  wrapperTitle: {
    marginVertical: widthResponsive(0.5),
  },
  titleStyle: {
    color: COLOR_5,
    fontWeight: 'bold',
    fontSize: widthResponsive(1),
  },
  paddingTextHoriz: {
    paddingHorizontal: widthResponsive(1),
    marginBottom: 20,
  },
});

export default TransferFailed;
