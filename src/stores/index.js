import { create } from 'mobx-persist';
import { AsyncStorage  } from 'react-native';
import Settings from './Settings';
import RemindMe from './RemindMe';
import Theme from './Theme';
import AppStyles from './Styles';
import UserProfile from './UserProfile';
import UIState from './UIState';

const hydrate = create({
  storage: AsyncStorage
});

const settingsStore = new Settings;
const remindMeStore = new RemindMe;
const meStore = new UserProfile;
const appState = new UIState;

hydrate('settings', settingsStore);
hydrate('remindMe', remindMeStore);
hydrate('me', meStore);

// Create theme store after hydrating the settings store
const themeStore = new Theme(settingsStore);
const appStyles = new AppStyles(settingsStore);

class RootStore {
  constructor() {
    this.settingsStore = settingsStore;
    this.remindMeStore = remindMeStore;
    this.themeStore = themeStore;
    this.me = meStore;
    this.appStyles = appStyles;
    this.appState = appState;
  }
}


export default new RootStore();