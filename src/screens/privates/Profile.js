import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from '../../styles/global';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import {
  COLOR_5,
  COLOR_GRAY,
  COLOR_PRIMARY,
  widthResponsive,
} from '../../styles/constant';
import Icon from 'react-native-vector-icons/Ionicons';
import {CardButton} from '../../components/Button';

const Profile = ({route, navigation}) => {
  const image =
    'https://images.unsplash.com/photo-1661395122138-6a5ad27e37a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';
  const [active, setActive] = React.useState(false);
  return (
    <DashboardLayout
      child={
        <ScrollView style={[styles.rootFlex1, style.root]}>
          <View style={style.wrapper}>
            <View>
              {image ? (
                <Image
                  source={{
                    uri: image,
                  }}
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
            <TouchableOpacity style={styles.flexDirectionRow}>
              <Icon
                name="ios-pencil-sharp"
                size={widthResponsive(1)}
                color={COLOR_GRAY}
              />
              <Text>Edit</Text>
            </TouchableOpacity>
            <View>
              <Text style={style.nameStyle}>Jessica Liu</Text>
              <Text style={style.phoneStyle}>081982736453</Text>
            </View>
            <View style={style.btnContentPosition}>
              <CardButton
                btnText={'Personal Information'}
                child={
                  <Icon
                    name="ios-arrow-forward"
                    size={widthResponsive(1.5)}
                    color={COLOR_5}
                  />
                }
                onPress={() => navigation.navigate('Personal Information')}
              />
              <CardButton
                btnText={'Change Password'}
                child={
                  <Icon
                    name="ios-arrow-forward"
                    size={widthResponsive(1.5)}
                    color={COLOR_5}
                  />
                }
                onPress={() => navigation.navigate('Change Password')}
              />
              <CardButton
                btnText={'Change Pin'}
                child={
                  <Icon
                    name="ios-arrow-forward"
                    size={widthResponsive(1.5)}
                    color={COLOR_5}
                  />
                }
                onPress={() => navigation.navigate('Change Pin')}
              />
              <CardButton
                btnText={'Notification'}
                child={
                  <TouchableOpacity
                    style={[
                      style.toggleButton,
                      active ? style.bgInactive : style.bgActive,
                    ]}
                    onPress={() => setActive(!active)}>
                    <View
                      style={
                        active
                          ? style.toggleContentActive
                          : style.toggleContentInactive
                      }
                    />
                    <View
                      style={
                        active
                          ? style.toggleContentInactive
                          : style.toggleContentActive
                      }
                    />
                  </TouchableOpacity>
                }
                onPress={() => navigation.navigate('Notification')}
              />
              <CardButton
                btnText={'Logout'}
                onPress={() => {
                  navigation.replace('Login');
                }}
              />
            </View>
          </View>
        </ScrollView>
      }
    />
  );
};

const style = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: widthResponsive(2),
    paddingHorizontal: widthResponsive(0.5),
  },
  imgWrapper: {
    width: widthResponsive(7),
    height: widthResponsive(7),
    borderRadius: widthResponsive(1),
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
  nameStyle: {
    fontSize: widthResponsive(1.5),
    fontWeight: '700',
    color: COLOR_5,
    textAlign: 'center',
  },
  phoneStyle: {
    fontSize: widthResponsive(0.8),
    fontWeight: '400',
    color: COLOR_GRAY,
    textAlign: 'center',
  },
  btnContentPosition: {
    paddingTop: widthResponsive(2),
  },
  toggleButton: {
    width: widthResponsive(3),
    height: widthResponsive(1.5),
    borderRadius: widthResponsive(2),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContentActive: {
    width: widthResponsive(1.3),
    height: widthResponsive(1.3),
    borderRadius: widthResponsive(2),
    backgroundColor: 'white',
  },
  toggleContentInactive: {
    width: widthResponsive(1.3),
    height: widthResponsive(1.3),
    borderRadius: widthResponsive(2),
    backgroundColor: COLOR_PRIMARY,
  },
  bgActive: {
    backgroundColor: COLOR_PRIMARY,
  },
  bgInactive: {
    backgroundColor: COLOR_PRIMARY,
  },
});

export default Profile;
