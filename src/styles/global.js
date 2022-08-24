import {Dimensions, StyleSheet} from 'react-native';
import {COLOR_GRAY, COLOR_PRIMARY, widthResponsive} from './constant';

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: COLOR_PRIMARY,
    paddingVertical: widthResponsive(0.7),
    width: Dimensions.get('screen').width - widthResponsive(1.2),
    borderRadius: widthResponsive(0.5),
  },
  buttonDisable: {
    backgroundColor: COLOR_GRAY,
    paddingVertical: widthResponsive(0.7),
    width: Dimensions.get('screen').width - widthResponsive(1.2),
    borderRadius: widthResponsive(0.5),
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: widthResponsive(0.8),
    fontWeight: 'bold',
  },
});

export default styles;
