import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from '../styles/global';
import {COLOR_GRAY, widthPropScreen, widthResponsive} from '../styles/constant';
import Icon from 'react-native-vector-icons/Ionicons';

export const UserCardHeader = ({image, subtitle, onPress}) => {
  return (
    <>
      <View style={styles.userCardHeader}>
        <View style={styles.userCardRow}>
          <View style={style.rowWrapper}>
            <Image
              source={
                image
                //     {
                //     uri: {image},
                //     // uri: 'https://images.unsplash.com/photo-1661395122138-6a5ad27e37a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
                //   }
              }
              style={styles.imgCardUser}
            />
            <View style={styles.userCardText}>
              <Text style={style.textTitle}>Balance</Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={style.textSubtitle}>
                {subtitle}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={onPress}>
            <Icon
              name="ios-notifications-outline"
              size={widthResponsive(1.7)}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export const UserCardContent = ({image, name, type, amount, onPress}) => {
  return (
    <>
      <View style={styles.userCardContent}>
        <View style={style.userCardRow}>
          <View style={style.rowWrapper2}>
            <Image
              source={
                image
                //     {
                //     uri: {image},
                //   }
              }
              style={styles.imgCardUser}
            />
            <View style={style.userCardText}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={style.titleContent}>
                {name}
              </Text>
              <Text style={style.subtitleContent}>{type}</Text>
            </View>
          </View>
          <View>
            <Text style={style.textGreen}>{amount}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  textTitle: {
    fontSize: widthResponsive(0.8),
    color: 'white',
  },
  textSubtitle: {
    fontSize: widthResponsive(1.1),
    color: 'white',
    fontWeight: '800',
    letterSpacing: 0.1,
  },
  rowWrapper: {
    flexDirection: 'row',
  },
  userCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: widthResponsive(1),
    paddingHorizontal: widthResponsive(1),
  },
  rowWrapper2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userCardText: {
    paddingVertical: widthResponsive(1),
    width: widthResponsive(20) - widthResponsive(5) - widthResponsive(5),
    flexDirection: 'column',
    marginLeft: widthResponsive(1),
  },
  titleContent: {
    fontSize: widthResponsive(0.8),
    color: '#4D4B57',
    fontWeight: '700',
  },
  subtitleContent: {
    color: '#7A7886',
    fontSize: widthResponsive(0.6),
    fontWeight: '300',
  },
  textGreen: {
    color: '#1EC15F',
    fontWeight: '800',
  },
  textRed: {
    color: '#FF5B37',
    fontWeight: '800',
  },
});
