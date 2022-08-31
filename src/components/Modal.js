import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {HeaderCustom2} from './Header';
import {UserCardContent3} from './Card';
import {COLOR_PRIMARY, widthResponsive} from '../styles/constant';
import Icon from 'react-native-vector-icons/Ionicons';

const ModalTopup = ({navigation, title, back}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <HeaderCustom2
          navigation={navigation}
          title={title}
          back={back}
          child={
            <UserCardContent3
              icon={
                <TouchableOpacity
                  style={styles.iconBoxHeader}
                  onPress={() => setModalVisible}>
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  iconBoxHeader: {
    padding: widthResponsive(0.4),
    backgroundColor: 'gainsboro',
    borderRadius: widthResponsive(0.5),
  },
});

export default ModalTopup;
