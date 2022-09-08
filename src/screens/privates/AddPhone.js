import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import styles from '../../styles/global';
import {widthResponsive} from '../../styles/constant';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {addPhone, updatePhone} from '../../redux/asyncActions/profile';
import {getProfile} from '../../redux/asyncActions/user';

const phoneSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/[0]{0,1}[8]{1}[0-9]{10}/, 'Format phone invalid')
    .required('Field required'),
});

const AddPhone = ({route, navigation}) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.users.profile);
  const token = useSelector(state => state.auth.token);
  const onSubmitPhone = val => {
    val.token = token;
    if (profile.phone_number) {
      dispatch(updatePhone(val));
      dispatch(getProfile({token: token}));
      navigation.popToTop();
    } else {
      dispatch(addPhone(val));
      dispatch(getProfile({token: token}));
      navigation.popToTop();
    }
  };
  return (
    <DashboardLayout
      child={
        <ScrollView>
          <View style={style.rootWrapper}>
            <Formik
              initialValues={{
                phone: `${profile.phone_number ? profile.phone_number : ''}`,
              }}
              onSubmit={onSubmitPhone}
              validationSchema={phoneSchema}>
              {({errors, values, handleChange, handleSubmit, isValid}) => (
                <View style={[styles.rootFlex1, style.root]}>
                  <View style={style.fieldWrapper}>
                    <Text style={style.textHeaderStyle}>
                      You must enter your current password and then type your
                      new password twice.
                    </Text>
                  </View>
                  <View style={[style.inputWrapper, styles.rootFlex1]}>
                    <View style={style.fieldWrapper}>
                      <InputField
                        icon={'ios-call-outline'}
                        placeholder={
                          profile.phone_number
                            ? 'Update your phone'
                            : 'Add your phone'
                        }
                        type={'phone-pad'}
                        value={values.phone}
                        onChange={handleChange('phone')}
                      />
                      {errors.phone ? (
                        <Text style={style.errorStyle}>{errors.phone}</Text>
                      ) : null}
                    </View>
                  </View>
                  <View style={style.wrapperButton}>
                    <Button
                      buttonText={profile.phone_number ? 'Update' : 'Submit'}
                      disable={!isValid || values.phone == profile.phone_number}
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      }
    />
  );
};

const style = StyleSheet.create({
  root: {
    paddingVertical: widthResponsive(2),
    backgroundColor: 'white',
  },
  textHeaderStyle: {
    textAlign: 'center',
  },
  fieldWrapper: {
    marginTop: widthResponsive(1),
    marginHorizontal: widthResponsive(0.5),
  },
  inputWrapper: {
    marginVertical: widthResponsive(2),
  },
  wrapperButton: {
    marginTop: widthResponsive(3),
  },
  errorStyle: {
    color: 'red',
    marginTop: widthResponsive(0.5),
  },
  rootWrapper: {
    height: Dimensions.get('screen').height - widthResponsive(11),
  },
});

export default AddPhone;
