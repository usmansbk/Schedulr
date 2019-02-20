import { DefaultTheme } from 'react-native-paper';
import colors from './colors';

export default {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.primary_light,
    error: colors.light_red,
    text: colors.black,
    placeholder: colors.placeholder,
    blackground: colors.bg,
    disabled: colors.disabled || DefaultTheme.colors.disabled
  }
};