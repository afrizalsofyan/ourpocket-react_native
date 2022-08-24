import {Dimensions} from 'react-native';

//color
export const BG_COLOR_PRIMARY = '#FAFCFF';
export const COLOR_PRIMARY = '#6379F4';
export const TEXT_COLOR_GRAY = '#3A3D4299';

//size
export const widthResponsive = size =>
  (Dimensions.get('screen').width * size) / 20;
