import {Dimensions} from 'react-native';

//color
export const BG_COLOR_PRIMARY = '#effffd';
export const COLOR_PRIMARY = '#009fbb';
export const COLOR_GRAY = '#3A3D4299';

//size
export const widthResponsive = size =>
  (Dimensions.get('screen').width * size) / 20;
