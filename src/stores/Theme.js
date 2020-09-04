import {computed} from 'mobx';
import {DefaultTheme, configureFonts} from 'react-native-paper';
import {dark, light} from 'config/colors';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Regular',
    },
  },
  medium: {
    fontFamily: 'SemiBold',
  },
  light: {
    fontFamily: 'Light',
  },
  thin: {
    fontFamily: 'Light',
  },
};

export default class theme {
  constructor(settings) {
    this.settings = settings;
  }

  @computed get colors() {
    if (this.settings.dark) return dark;
    return light;
  }

  @computed get theme() {
    const colors = this.colors;
    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        dark: this.settings.dark,
        primary: colors.primary,
        accent: colors.primary,
        error: colors.light_red,
        text: colors.black,
        placeholder: colors.placeholder,
        disabled: colors.disabled || DefaultTheme.colors.disabled,
      },
      fonts: configureFonts(fontConfig),
    };
  }
}
