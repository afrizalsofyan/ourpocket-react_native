import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import styles from '../../styles/global';
import {ErrorCard} from '../../components/Card';
import {COLOR_5, widthResponsive} from '../../styles/constant';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {updatePassword} from '../../redux/asyncActions/profile';
import {getUpdate} from '../../redux/reducers/profile';
import {store} from '../../redux/store';

const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(8, 'current password at least 8 characters')
    .required('current password is required'),
  newPassword: Yup.string()
    .min(8, 'new password at least 8 characters')
    .required('new password is required'),
  repeatPassword: Yup.string()
    .min(8, 'confirm password at least 8 characters')
    .required('confirma password is required'),
});

const ChangePassword = ({route, navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const errorMsg = useSelector(() => store.getState().profile.errorMsg);
  const [err, setErr] = React.useState();
  const onUpdatePassword = async val => {
    if (val.newPassword !== val.repeatPassword) {
      setErr('Confirmation password is invalid');
    } else {
      setErr();
      val.token = token;
      await dispatch(updatePassword(val));
      if (errorMsg) {
        setErr(errorMsg);
        dispatch(getUpdate());
        navigation.popToTop();
      }
      // else {
      //   setTimeout(() => {
      //     dispatch(getUpdate());
      //     navigation.popToTop();
      //   }, 1000);
      // }
    }
  };
  React.useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        setErr();
      }, 2000);
    }
  }, [errorMsg, dispatch]);
  return (
    <DashboardLayout
      child={
        <ScrollView>
          <Formik
            initialValues={{
              currentPassword: '',
              newPassword: '',
              repeatPassword: '',
            }}
            validationSchema={passwordSchema}
            onSubmit={onUpdatePassword}>
            {({errors, values, handleChange, handleSubmit, isValid}) => (
              <View style={[styles.rootFlex1, style.root]}>
                <View style={style.fieldWrapper}>
                  <Text style={style.textHeaderStyle}>
                    You must enter your current password and then type your new
                    password twice.
                  </Text>
                </View>
                {errorMsg ? (
                  <View style={style.fieldWrapper}>
                    <ErrorCard text={errorMsg} />
                  </View>
                ) : null}
                <View style={[style.inputWrapper, styles.rootFlex1]}>
                  <View style={style.fieldWrapper}>
                    <InputField
                      icon={'ios-lock-closed-outline'}
                      placeholder={'Enter your current password'}
                      secure={true}
                      value={values.currentPassword}
                      onChange={handleChange('currentPassword')}
                    />
                    {errors.currentPassword ? (
                      <Text style={style.errorStyle}>
                        {errors.currentPassword}
                      </Text>
                    ) : null}
                  </View>
                  <View style={style.fieldWrapper}>
                    <InputField
                      icon={'ios-lock-closed-outline'}
                      placeholder={'Enter your new password'}
                      secure={true}
                      value={values.newPassword}
                      onChange={handleChange('newPassword')}
                    />
                    {errors.newPassword ? (
                      <Text style={style.errorStyle}>{errors.newPassword}</Text>
                    ) : null}
                  </View>
                  <View style={style.fieldWrapper}>
                    <InputField
                      icon={'ios-lock-closed-outline'}
                      placeholder={'Enter your confirm password'}
                      secure={true}
                      value={values.repeatPassword}
                      onChange={handleChange('repeatPassword')}
                    />
                    {errors.repeatPassword ? (
                      <Text style={style.errorStyle}>
                        {errors.repeatPassword}
                      </Text>
                    ) : null}
                  </View>
                </View>
                <View style={style.wrapperButton}>
                  <Button
                    buttonText={'Confirm'}
                    disable={!isValid}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      }
    />
  );
};

const style = StyleSheet.create({
  root: {
    paddingVertical: widthResponsive(2),
    backgroundColor: 'white',
    height: Dimensions.get('screen').height - widthResponsive(11),
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
  inputWrapper: {
    // marginVertical: widthResponsive(2),
  },
  fieldWrapper: {
    marginTop: widthResponsive(1),
    marginHorizontal: widthResponsive(0.5),
  },
  wrapperButton: {
    marginTop: widthResponsive(3),
  },
  errorStyle: {
    color: 'red',
    marginTop: widthResponsive(0.5),
  },
});

export default ChangePassword;
