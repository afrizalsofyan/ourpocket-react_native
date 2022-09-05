import {View, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthResponsive} from '../styles/constant';
import HeaderAuthContent from '../components/HeaderAuthContent';
import AuthLayout from '../components/layouts/AuthLayout';
import Button from '../components/Button';

const CreatePinSuccess = ({navigation}) => {
  return (
    <>
      <AuthLayout
        content={
          <>
            <View style={style.wrapper}>
              <View style={style.iconWrapper}>
                <Icon
                  name={'ios-checkmark-circle'}
                  size={widthResponsive(3.5)}
                  color={'mediumseagreen'}
                />
              </View>
              <HeaderAuthContent
                title={'PIN Successfully Created'}
                subtitle={
                  'Your PIN was successfully created and you can now access all the features in Zwallet. Login to your new account and start exploring!'
                }
              />
              <View style={style.buttonWrapper}>
                <Button
                  buttonText={'Go to Dashboard'}
                  onPress={() => navigation.replace('HomeTab')}
                />
              </View>
            </View>
          </>
        }
      />
    </>
  );
};

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    height:
      Dimensions.get('screen').height - Dimensions.get('screen').width / 2,
  },
  iconWrapper: {
    paddingTop: widthResponsive(2),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonWrapper: {
    flex: 2,
  },
});

export default CreatePinSuccess;
