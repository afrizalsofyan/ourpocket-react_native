import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLOR_4, COLOR_5, widthResponsive} from '../styles/constant';

export const TitleContent = ({titleText, titleLink, onPress}) => {
  return (
    <>
      <View style={styleLocal.root}>
        <Text style={styleLocal.titleText}>{titleText}</Text>
        {titleLink ? (
          <TouchableOpacity onPress={onPress}>
            <Text style={styleLocal.titleLink}>{titleLink}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};

const styleLocal = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: widthResponsive(0.8),
    paddingHorizontal: widthResponsive(0.8),
  },
  titleText: {
    fontSize: widthResponsive(0.8),
    fontWeight: 'bold',
    color: COLOR_5,
  },
  titleLink: {
    fontSize: widthResponsive(0.6),
    fontWeight: '300',
    color: COLOR_4,
  },
});
