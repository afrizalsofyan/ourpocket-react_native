import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {
  BG_COLOR_PRIMARY,
  COLOR_PRIMARY,
  widthResponsive,
} from '../../styles/constant';

const AuthLayout = ({content}) => {
  return (
    <>
      <View style={styleLocal.parrent}>
        <View style={styleLocal.wrapper}>
          <View style={styleLocal.header}>
            <Text style={styleLocal.titleHeader}>OurPocket</Text>
          </View>
          <View style={styleLocal.content}>{content}</View>
        </View>
      </View>
    </>
  );
};

const styleLocal = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  parrent: {
    flex: 1,
    backgroundColor: BG_COLOR_PRIMARY,
  },
  header: {
    height: Dimensions.get('screen').width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleHeader: {
    color: COLOR_PRIMARY,
    fontSize: widthResponsive(1.7),
    fontWeight: '700',
  },
  content: {
    flex: 1,
    borderTopLeftRadius: widthResponsive(2),
    borderTopRightRadius: widthResponsive(2),
    elevation: 1.5,
    backgroundColor: 'white',
  },
});

export default AuthLayout;