import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import {COLOR_5, widthResponsive} from '../../styles/constant';
import {CardTransaction} from '../../components/Card';
import styles from '../../styles/global';

const PersonalInformation = ({navigation}) => {
  const data = {id: 1, phoneNumber: '081920838374'};
  return (
    <DashboardLayout
      child={
        <ScrollView style={style.root}>
          <View style={styles.rootFlex1}>
            <View>
              <Text style={style.textHeaderStyle}>
                We got your personal information from the sign up proccess. If
                you want to make changes on your information, contact our
                support.
              </Text>
            </View>
            <View style={styles.flexDirectionColumn}>
              <View style={[styles.flexDirectionRow]}>
                <CardTransaction title={'First Name'} subtitle={'Jessica'} />
              </View>
              <View style={[styles.flexDirectionRow]}>
                <CardTransaction title={'Last Name'} subtitle={'Liu'} />
              </View>
              <View style={[styles.flexDirectionRow]}>
                <CardTransaction
                  title={'Verified E-mail'}
                  subtitle={'jessicaliu@mail.com'}
                />
              </View>
              <View
                style={[
                  styles.flexDirectionRow,
                  style.cardWrapper,
                  style.contentWrapper,
                ]}>
                <View>
                  <View style={style.paddingTextCard}>
                    <Text style={style.titleCard}>Phone Number</Text>
                  </View>
                  <View style={style.paddingTextCard}>
                    <Text style={style.subtitleCard}>
                      {data.phoneNumber ?? '-'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Add Phone', {data})}>
                  <Text style={style.manageButtonStyle}>Manage</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      }
    />
  );
};

const style = StyleSheet.create({
  root: {
    marginVertical: widthResponsive(2),
  },
  textHeaderStyle: {
    textAlign: 'center',
  },
  cardWrapper: {
    backgroundColor: 'white',
    height: widthResponsive(5),
    margin: widthResponsive(0.5),
    alignItems: 'center',
    padding: widthResponsive(0.5),
    borderRadius: widthResponsive(0.5),
    elevation: 3,
  },
  titleCard: {
    fontSize: widthResponsive(0.7),
    color: COLOR_5,
    fontWeight: '400',
  },
  subtitleCard: {
    fontSize: widthResponsive(0.9),
    color: COLOR_5,
    fontWeight: '700',
  },
  paddingTextCard: {
    paddingVertical: widthResponsive(0.2),
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  manageButtonStyle: {
    color: COLOR_5,
    fontWeight: '500',
  },
});

export default PersonalInformation;
