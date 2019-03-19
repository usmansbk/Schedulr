import { DefaultTheme } from 'react-native-paper';
import colors from './colors';
// import { isDayTime } from '../lib/time';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // dark: !isDayTime(),
    primary: colors.primary,
    accent: colors.primary_light,
    error: colors.light_red,
    text: colors.black,
    placeholder: colors.placeholder,
    disabled: colors.disabled || DefaultTheme.colors.disabled
  }
};