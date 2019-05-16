import { observable } from 'mobx';
import { DefaultTheme } from 'react-native-paper';
import stores from 'stores';

const themeStore = observable({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    dark: stores.settingsStore.dark,
    primary: stores.settingsStore.colorTheme.primary,
    accent: stores.settingsStore.colorTheme.primary_light,
    error: stores.settingsStore.colorTheme.light_red,
    text: stores.settingsStore.colorTheme.black,
    placeholder: stores.settingsStore.colorTheme.placeholder,
    disabled: stores.settingsStore.colorTheme.disabled || DefaultTheme.colors.disabled
  }
});

export default themeStore;