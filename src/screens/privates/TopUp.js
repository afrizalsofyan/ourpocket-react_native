import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {COLOR_5, COLOR_PRIMARY, widthResponsive} from '../../styles/constant';
import {TitleContent} from '../../components/Title';
import {
  CardTopup,
  UserCardContent3,
  UserCardContent4,
} from '../../components/Card';
import {DashboardLayout} from '../../components/layouts/DashboardLayout';
import {HeaderCustom2} from '../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as Yup from 'yup';

const content = [
  {keyContent: 1, content: 'Go to the nearest ATM or you can use E-Banking.'},
  {
    keyContent: 2,
    content: 'Type your security number on the ATM or E-Banking.',
  },
  {keyContent: 3, content: 'Select “Transfer” in the menu'},
  {
    keyContent: 4,
    content: 'Type the virtual account number that we provide you at the top.',
  },
  {keyContent: 5, content: 'Type the amount of the money you want to top up.'},
  {keyContent: 6, content: 'Read the summary details'},
  {keyContent: 7, content: 'Press transfer / top up'},
  {keyContent: 8, content: 'You can see your money in Zwalletwithin 3 hours.'},
];

const topupSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError('You must input with only number.')
    .min(10000, 'Minimum topup is Rp. 10.000')
    .required(),
});

const TopUp = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <>
      <HeaderCustom2
        child={
          <UserCardContent4
            icon={
              <TouchableOpacity
                style={style.iconBoxHeader}
                onPress={() => setModalVisible(true)}>
                <Icon
                  name="ios-add"
                  size={widthResponsive(2)}
                  color={COLOR_PRIMARY}
                />
              </TouchableOpacity>
            }
            name="Virtual Account Number"
            type={'2389 0813234343523'}
          />
        }
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <Formik
          initialValues={{amount: '', type_id: 16}}
          onSubmit={val => console.log(val)}
          validationSchema={topupSchema}>
          {({errors, isValid, handleChange, handleSubmit, values}) => (
            <View style={style.centeredView}>
              <View style={style.modalView}>
                <Text style={style.modalText}>Input amount</Text>
                <TextInput
                  placeholder="Input count amount"
                  keyboardType="number-pad"
                  style={style.modalInput}
                  value={values.amount}
                  onChangeText={handleChange('amount')}
                />
                {errors.amount ? (
                  <Text style={style.errorText}>{errors.amount}</Text>
                ) : null}
                <TouchableOpacity
                  style={[style.button, style.buttonClose]}
                  disabled={!isValid}
                  onPress={handleSubmit}>
                  <Text style={style.textStyle}>Topup Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </Modal>
      <DashboardLayout
        child={
          <View style={style.root}>
            <TitleContent titleText={'How to Top-Up'} />
            <View style={style.listWrapper}>
              <FlatList
                data={content}
                renderItem={item => (
                  <CardTopup
                    number={`${item.item.keyContent}`}
                    textContent={item.item.content}
                  />
                )}
              />
            </View>
          </View>
        }
      />
    </>
  );
};

const style = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: widthResponsive(1.5),
    marginHorizontal: widthResponsive(0.5),
  },
  listWrapper: {
    paddingTop: widthResponsive(1),
    paddingBottom: widthResponsive(2),
  },
  iconBoxHeader: {
    padding: widthResponsive(0.4),
    backgroundColor: 'gainsboro',
    borderRadius: widthResponsive(0.5),
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
    height: widthResponsive(12),
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 120,
    borderColor: 'gray',
    borderWidth: 0.3,
  },
  button: {
    borderRadius: widthResponsive(0.5),
    paddingHorizontal: widthResponsive(1.5),
    paddingVertical: widthResponsive(0.5),
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: COLOR_PRIMARY,
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
  modalInput: {
    borderBottomWidth: 0.5,
    width: '100%',
    textAlign: 'center',
    color: COLOR_5,
    fontWeight: '700',
  },
  errorText: {
    color: 'red',
    marginVertical: 15,
  },
});

export default TopUp;
