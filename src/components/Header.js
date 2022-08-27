import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLOR_SECONDARY, widthResponsive} from '../styles/constant';

const HeaderCustom = ({navigation, title, back, child}) => {
  return (
    <View
      style={[
        style.headerWrapper,
        child ? style.heightHeader2 : style.heightHeader1,
      ]}>
      <View style={style.boxHeader}>
        {back ? (
          <TouchableOpacity
            style={style.iconWrapper}
            onPress={() => navigation.goBack()}>
            <Icon
              name="ios-arrow-back"
              size={widthResponsive(1.5)}
              color={'white'}
            />
          </TouchableOpacity>
        ) : null}
        <View>
          <Text style={style.textHeader}>{title}</Text>
        </View>
      </View>
      {child}
    </View>
  );
};

export const HeaderCustom2 = ({
  navigation,
  title,
  back,
  child,
  centerHeader,
}) => {
  return (
    <View
      style={[
        style.headerWrapper2,
        child ? style.heightHeader3 : style.heightHeader1,
      ]}>
      {centerHeader ? (
        <View style={style.headerCenter}>
          <Text style={style.textHeader}>{title}</Text>
        </View>
      ) : (
        <View style={style.boxHeader}>
          {back ? (
            <TouchableOpacity
              style={style.iconWrapper}
              onPress={() => navigation.goBack()}>
              <Icon
                name="ios-arrow-back"
                size={widthResponsive(1.5)}
                color={'white'}
              />
            </TouchableOpacity>
          ) : null}
          <View>
            <Text style={style.textHeader}>{title}</Text>
          </View>
        </View>
      )}
      {child}
    </View>
  );
};

const style = StyleSheet.create({
  headerWrapper: {
    backgroundColor: COLOR_SECONDARY,
    justifyContent: 'space-around',
    borderBottomLeftRadius: widthResponsive(1),
    borderBottomRightRadius: widthResponsive(1),
  },
  headerWrapper2: {
    backgroundColor: COLOR_SECONDARY,
    justifyContent: 'space-evenly',
    borderBottomLeftRadius: widthResponsive(1),
    borderBottomRightRadius: widthResponsive(1),
  },
  heightHeader1: {
    height: widthResponsive(6),
  },
  heightHeader2: {
    height: widthResponsive(10),
  },
  heightHeader3: {
    height: widthResponsive(11),
  },
  boxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthResponsive(1),
    // width: widthResponsive(7),
  },
  textHeader: {
    fontSize: widthResponsive(1),
    color: 'white',
    fontWeight: '700',
  },
  iconWrapper: {
    marginRight: widthResponsive(0.5),
  },
  headerCenter: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: widthResponsive(1.5),
  },
});

export default HeaderCustom;
