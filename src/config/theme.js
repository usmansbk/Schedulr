import { DefaultTheme } from 'react-native-paper';
import colors from './colors';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.primary_light,
    error: colors.red,
    text: colors.black,
  }
};