import { computed } from 'mobx';
import { DefaultTheme } from 'react-native-paper';
import { dark, light } from 'config/colors';

export default class ThemeStore {
  constructor(settingsStore) {
    this.settings = settingsStore;
  }

  @computed get colors () {
    if (this.settings.dark) return dark;
    return light;
  }

  @computed get theme () {
    const colors = this.settings.dark ? dark : light;
    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        dark: this.settings.dark,
        primary: colors.primary,
        accent: colors.primary_light,
        error: colors.light_red,
        text: colors.black,
        placeholder: colors.placeholder,
        disabled: colors.disabled || DefaultTheme.colors.disabled
      }
    };
  }
}