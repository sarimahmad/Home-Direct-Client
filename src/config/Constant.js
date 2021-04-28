import {Dimensions} from 'react-native';

export const SCREEN = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};

export const isIphoneXorAbove =
  SCREEN.height === 812 ||
  SCREEN.width === 812 ||
  SCREEN.height === 896 ||
  SCREEN.width === 896;
