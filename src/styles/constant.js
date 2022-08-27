import {Dimensions} from 'react-native';
import 'intl';

import 'intl/locale-data/jsonp/en';
//color
export const BG_COLOR_PRIMARY = '#effffd';
export const COLOR_PRIMARY = '#009fbb';
export const COLOR_SECONDARY = '#08D9D6';
export const COLOR_3 = '#85f4ff';
export const COLOR_4 = '#007c92';
export const COLOR_5 = '#066374';
export const COLOR_GRAY = '#3A3D4299';

//size
export const widthResponsive = size =>
  (Dimensions.get('screen').width * size) / 20;
export const widthPropScreen = size =>
  (Dimensions.get('screen').width * size) / 2;

export const convertMoney = number =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(number);
