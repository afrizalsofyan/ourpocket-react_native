import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import styles from '../../styles/global';
import {COLOR_5, widthResponsive} from '../../styles/constant';
import {dummy} from './History';
import {UserCardContent} from '../../components/Card';

const Transaction = ({navigation}) => {
  return (
    <DashboardLayout
      child={
        <View style={[style.content]}>
          <Text style={style.textTitle}>Choose type transaction you want</Text>
          <View>
            <TouchableOpacity
              style={style.buttonWrapper}
              onPress={() => navigation.navigate('Transfer')}>
              <Text style={style.textButton}>Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.buttonWrapper}
              onPress={() => navigation.navigate('Topup')}>
              <Text style={style.textButton}>Top Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
};

const style = StyleSheet.create({
  content: {
    height: Dimensions.get('screen').height - widthResponsive(12),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonWrapper: {
    width: widthResponsive(18),
    paddingVertical: widthResponsive(0.8),
    backgroundColor: COLOR_5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthResponsive(0.5),
    marginVertical: widthResponsive(0.8),
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
  },
  textTitle: {
    color: COLOR_5,
    fontWeight: 'bold',
    fontSize: widthResponsive(1),
  },
});

export default Transaction;
