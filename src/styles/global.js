import {Dimensions, StyleSheet} from 'react-native';
import {
  BG_COLOR_PRIMARY,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  widthPropScreen,
  widthResponsive,
} from './constant';

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
  userCardHeader: {
    height: widthResponsive(8),
    backgroundColor: COLOR_SECONDARY,
    borderBottomLeftRadius: widthResponsive(1),
    borderBottomRightRadius: widthResponsive(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  userCardRow: {
    height: widthResponsive(3),
    width: widthPropScreen(2),
    marginTop: widthResponsive(1.5),
    flexDirection: 'row',
    paddingHorizontal: widthResponsive(1),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgCardUser: {
    width: widthResponsive(3),
    height: widthResponsive(3),
    borderRadius: widthResponsive(0.7),
  },
  userCardText: {
    width: widthResponsive(20) - widthResponsive(5) - widthResponsive(5),
    flexDirection: 'column',
    marginLeft: widthResponsive(1),
    justifyContent: 'space-between',
  },
  userCardContent: {
    backgroundColor: 'white',
    elevation: 0.3,
  },
  dashboardLayout: {
    backgroundColor: BG_COLOR_PRIMARY,
    height: Dimensions.get('screen').height,
  },
  buttonTransaction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: widthPropScreen(0.05),
    marginVertical: widthPropScreen(0.05),
    backgroundColor: COLOR_PRIMARY,
    borderRadius: widthResponsive(0.5),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWhiteButton: {
    color: 'white',
    fontSize: widthResponsive(0.8),
  },
  buttonWraperContent: {
    marginHorizontal: widthResponsive(0.7),
  },
});

export default styles;
