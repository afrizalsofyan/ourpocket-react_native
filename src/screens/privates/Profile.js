import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import React from 'react';
import styles from '../../styles/global';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import {
  COLOR_5,
  COLOR_GRAY,
  COLOR_PRIMARY,
  widthResponsive,
} from '../../styles/constant';
import Icon from 'react-native-vector-icons/Ionicons';
import {CardButton} from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {logout, onLogout} from '../../redux/reducers/auth';
import {getProfile} from '../../redux/asyncActions/user';
import {getUpdate} from '../../redux/reducers/profile';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {updateProfile} from '../../redux/asyncActions/profile';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const editProfileSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
});

const Profile = ({route, navigation}) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.users.profile);
  const errorMsg = useSelector(state => state.profile.errorMsg);
  const token = useSelector(state => state.auth.token);
  const fcmToken = useSelector(state => state.notification.tokenFCM);
  const profileUpdateMsg = useSelector(state => state.profile.successMsg);
  const [active, setActive] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalPhoto, setModalPhoto] = React.useState(false);
  const [err, setErr] = React.useState();
  // const [img, setImg] = React.useState();
  const onUpdateName = val => {
    setErr();
    val.token = token;
    dispatch(updateProfile(val));
    if (errorMsg) {
      setErr(errorMsg);
    } else {
      setTimeout(() => {
        dispatch(getUpdate());
        setModalVisible(!modalVisible);
      }, 1000);
    }
  };

  const onUploudPhoto = async types => {
    const typePicked = types
      ? await launchCamera()
      : await launchImageLibrary();
    // console.log(type);
    if (typePicked) {
      const imagePick = typePicked.assets[0];
      if (imagePick.fileSize > 1 * 1024 * 1024) {
        Alert.alert('Failed!!!', 'File image is so big', [
          {
            onPress: () => {
              setModalPhoto(false);
            },
          },
        ]);
      } else {
        // setImg(imagePick.uri);
        dispatch(updateProfile({token: token, picture: imagePick}));
        if (!errorMsg) {
          Alert.alert('Success', 'You have been change your picture.', [
            {
              onPress: () => {
                dispatch(getUpdate());
                setModalPhoto(false);
              },
            },
          ]);
        } else {
          Alert.alert('Failed', 'Your upload is failed.', [
            {
              onPress: () => {
                dispatch(getUpdate());
              },
            },
          ]);
        }
      }
    }
  };

  React.useEffect(() => {
    if (profileUpdateMsg) {
      dispatch(getProfile({token: token}));
      dispatch(getUpdate());
    }
    if (errorMsg) {
      setTimeout(() => {
        setErr();
      }, 2000);
    }
  }, [dispatch, navigation, token, profileUpdateMsg, errorMsg]);
  return (
    <DashboardLayout
      child={
        <>
          {profile ? (
            <ScrollView style={[styles.rootFlex1, style.root]}>
              <View style={style.wrapper}>
                <TouchableOpacity onPress={() => setModalPhoto(true)}>
                  {profile.photo_url ? (
                    <Image
                      source={{
                        uri: profile.photo_url,
                      }}
                      style={style.imgWrapper}
                    />
                  ) : (
                    <View style={style.iconWrapperNull}>
                      <Icon
                        name="ios-person-outline"
                        size={widthResponsive(5)}
                        color={COLOR_5}
                      />
                    </View>
                  )}
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalPhoto}
                  onRequestClose={() => {
                    setModalPhoto(!modalPhoto);
                  }}>
                  <TouchableOpacity style={style.centeredView} onPress={()=> setModalPhoto(!modalPhoto)}>
                    <View style={style.modalView}>
                      <Text style={style.modalText1}>Choose photo from</Text>
                      <View style={style.btnChoosePhoto}>
                        <TouchableOpacity
                          style={style.btnImgTextStyle}
                          onPress={() => onUploudPhoto(false)}>
                          <Icon name="ios-images" size={widthResponsive(2)} />
                          <Text style={style.btnImageText}>Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={style.btnImgTextStyle}
                          onPress={() => onUploudPhoto(true)}>
                          <Icon name="ios-camera" size={widthResponsive(2)} />
                          <Text style={style.btnImageText}>Camera</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Modal>
                <TouchableOpacity
                  style={[styles.flexDirectionRow, style.editButton]}
                  onPress={() => setModalVisible(true)}>
                  <Icon
                    name="ios-pencil-sharp"
                    size={widthResponsive(1)}
                    color={COLOR_GRAY}
                  />
                  <Text>Edit</Text>
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Formik
                    initialValues={{
                      firstName: `${profile.first_name}`,
                      lastName: `${profile.last_name}`,
                    }}
                    onSubmit={onUpdateName}
                    validationSchema={editProfileSchema}>
                    {({
                      errors,
                      isValid,
                      handleChange,
                      handleSubmit,
                      values,
                    }) => (
                      <View style={style.centeredView}>
                        <View style={style.modalView}>
                          <ScrollView>
                            <Text style={style.modalText}>Edit name</Text>
                            {err ? (
                              <View style={style.successCard}>
                                <Text style={style.textCardMessage}>{err}</Text>
                              </View>
                            ) : null}
                            <View>
                              <View style={style.wrapperInput}>
                                <Text style={style.labelStyle}>First Name</Text>
                                <TextInput
                                  placeholder="first name"
                                  style={style.modalInput}
                                  value={values.firstName}
                                  onChangeText={handleChange('firstName')}
                                />
                                {errors.firstName ? (
                                  <Text style={style.errorText}>
                                    {errors.firstName}
                                  </Text>
                                ) : null}
                              </View>
                              <View style={style.wrapperInput}>
                                <Text style={style.labelStyle}>Last Name</Text>
                                <TextInput
                                  placeholder="last name"
                                  style={style.modalInput}
                                  value={values.lastName}
                                  onChangeText={handleChange('lastName')}
                                />
                                {errors.lastName ? (
                                  <Text style={style.errorText}>
                                    {errors.lastName}
                                  </Text>
                                ) : null}
                              </View>
                            </View>
                            <TouchableOpacity
                              style={[
                                style.button,
                                !isValid
                                  ? style.buttonCloseDisable
                                  : style.buttonClose,
                              ]}
                              disabled={!isValid}
                              onPress={handleSubmit}>
                              <Text style={style.textStyle}>Update Name</Text>
                            </TouchableOpacity>
                          </ScrollView>
                        </View>
                      </View>
                    )}
                  </Formik>
                </Modal>
                <View>
                  <Text style={style.nameStyle}>{profile.username}</Text>
                  <Text style={style.phoneStyle}>
                    {profile.phone_number ? profile.phone_number : '-'}
                  </Text>
                </View>
                <View style={style.btnContentPosition}>
                  <CardButton
                    btnText={'Personal Information'}
                    child={
                      <Icon
                        name="ios-arrow-forward"
                        size={widthResponsive(1.5)}
                        color={COLOR_5}
                      />
                    }
                    onPress={() => navigation.navigate('Personal Information')}
                  />
                  <CardButton
                    btnText={'Change Password'}
                    child={
                      <Icon
                        name="ios-arrow-forward"
                        size={widthResponsive(1.5)}
                        color={COLOR_5}
                      />
                    }
                    onPress={() => navigation.navigate('Change Password')}
                  />
                  <CardButton
                    btnText={'Change Pin'}
                    child={
                      <Icon
                        name="ios-arrow-forward"
                        size={widthResponsive(1.5)}
                        color={COLOR_5}
                      />
                    }
                    onPress={() => navigation.navigate('Change Pin')}
                  />
                  <CardButton
                    btnText={'Notification'}
                    child={
                      <TouchableOpacity
                        style={[
                          style.toggleButton,
                          active ? style.bgInactive : style.bgActive,
                        ]}
                        onPress={() => setActive(!active)}>
                        <View
                          style={
                            active
                              ? style.toggleContentActive
                              : style.toggleContentInactive
                          }
                        />
                        <View
                          style={
                            active
                              ? style.toggleContentInactive
                              : style.toggleContentActive
                          }
                        />
                      </TouchableOpacity>
                    }
                    onPress={() => navigation.navigate('Notification')}
                  />
                  <CardButton
                    btnText={'Logout'}
                    onPress={() => {
                      dispatch(logout({token: token, fcmToken: fcmToken}));
                      dispatch(onLogout());
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          ) : (
            <View style={[style.container, style.horizontal]}>
              <ActivityIndicator size={'large'} color={COLOR_PRIMARY} />
            </View>
          )}
        </>
      }
    />
  );
};

const style = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: widthResponsive(2),
    paddingHorizontal: widthResponsive(0.5),
  },
  imgWrapper: {
    width: widthResponsive(7),
    height: widthResponsive(7),
    borderRadius: widthResponsive(1),
  },
  iconWrapperNull: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gainsboro',
    borderRadius: widthResponsive(1),
    width: widthResponsive(7),
    height: widthResponsive(7),
    opacity: 0.8,
  },
  nameStyle: {
    fontSize: widthResponsive(1.5),
    fontWeight: '700',
    color: COLOR_5,
    textAlign: 'center',
  },
  phoneStyle: {
    fontSize: widthResponsive(0.8),
    fontWeight: '400',
    color: COLOR_GRAY,
    textAlign: 'center',
  },
  btnContentPosition: {
    paddingTop: widthResponsive(2),
  },
  toggleButton: {
    width: widthResponsive(3),
    height: widthResponsive(1.5),
    borderRadius: widthResponsive(2),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContentActive: {
    width: widthResponsive(1.3),
    height: widthResponsive(1.3),
    borderRadius: widthResponsive(2),
    backgroundColor: 'white',
  },
  toggleContentInactive: {
    width: widthResponsive(1.3),
    height: widthResponsive(1.3),
    borderRadius: widthResponsive(2),
    backgroundColor: COLOR_PRIMARY,
  },
  bgActive: {
    backgroundColor: COLOR_PRIMARY,
  },
  bgInactive: {
    backgroundColor: COLOR_PRIMARY,
  },
  editButton: {
    marginTop: widthResponsive(0.5),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: widthResponsive(18),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 0.3,
  },
  btnChoosePhoto: {
    flexDirection: 'row',
    width: widthResponsive(8),
    height: widthResponsive(4),
    justifyContent: 'space-between',
  },
  btnImgTextStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnImageText: {
    fontSize: widthResponsive(0.8),
    color: COLOR_5,
    fontWeight: '500',
  },
  button: {
    borderRadius: widthResponsive(0.5),
    paddingHorizontal: widthResponsive(1.5),
    paddingVertical: widthResponsive(0.5),
    elevation: 2,
    marginTop: widthResponsive(2),
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: COLOR_PRIMARY,
  },
  buttonCloseDisable: {
    backgroundColor: COLOR_GRAY,
  },
  textStyle: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
  modalText: {
    fontSize: widthResponsive(1.2),
    color: COLOR_5,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalText1: {
    fontSize: widthResponsive(0.8),
    color: COLOR_5,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalInput: {
    borderBottomWidth: 0.3,
    width: widthResponsive(15),
    color: COLOR_5,
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    marginVertical: 15,
  },
  wrapperInput: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  labelStyle: {
    color: COLOR_5,
    fontWeight: '700',
    marginTop: widthResponsive(1),
  },
  successCard: {
    backgroundColor: 'lightgreen',
    paddingVertical: widthResponsive(0.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthResponsive(0.5),
    marginBottom: widthResponsive(2),
  },
  errorCard: {
    backgroundColor: 'lightcoral',
    paddingVertical: widthResponsive(0.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthResponsive(0.5),
    marginBottom: widthResponsive(2),
  },
  textCardMessage: {
    color: COLOR_5,
    fontSize: widthResponsive(0.8),
    fontWeight: 'bold',
  },
  errorCardMessage: {
    color: 'white',
    fontSize: widthResponsive(0.8),
    fontWeight: 'bold',
  },
});

export default Profile;
