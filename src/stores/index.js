import { action } from 'mobx';
import { create } from 'mobx-persist';
import AsyncStorage from '@react-native-community/async-storage';
import Settings from './Settings';
import RemindMe from './RemindMe';
import Theme from './Theme';
import AppStyles from './Styles';
import UserProfile from './UserProfile';
import AppState from './AppState';

const hydrate = create({
  storage: AsyncStorage
});

const settingsStore = new Settings;
const remindMeStore = new RemindMe;
const meStore = new UserProfile;
const appState = new AppState;

hydrate('settings', settingsStore);
hydrate('remindMe', remindMeStore);
hydrate('me', meStore);
hydrate('appState', appState);

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

  @action reset = () => {
    this.settingsStore.reset();
    this.remindMeStore.reset();
    this.me.reset();
    this.appState.reset();
  }
}


export default new RootStore();