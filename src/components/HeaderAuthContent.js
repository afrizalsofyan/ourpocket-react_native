import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TEXT_COLOR_GRAY, widthResponsive} from '../styles/constant';

const HeaderAuthContent = ({title, subtitle}) => {
  return (
    <View style={styleLocal.textPosition}>
      <View style={styleLocal.contentPadding}>
        <Text style={styleLocal.titleText}>{title}</Text>
      </View>
      <View style={styleLocal.contentPadding}>
        <Text style={styleLocal.subtitleText}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styleLocal = StyleSheet.create({
  textPosition: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: widthResponsive(2),
    paddingHorizontal: widthResponsive(2.5),
  },
  titleText: {
    fontSize: widthResponsive(1.3),
    color: 'black',
    fontWeight: 'bold',
  },
  subtitleText: {
    color: TEXT_COLOR_GRAY,
    fontSize: widthResponsive(0.9),
    textAlign: 'center',
  },
  contentPadding: {
    paddingVertical: widthResponsive(0.5),
  },
});

export default HeaderAuthContent;
